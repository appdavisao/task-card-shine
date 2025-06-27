
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const ASSISTANT_ID = 'asst_AUA9S4yfQFGM8xE7LrugS8re';

interface ChatRequest {
  user_id: string;
  message: string;
  thread_id?: string;
  context?: {
    page: string;
    day?: number;
    content_card?: any;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user_id, message, thread_id, context }: ChatRequest = await req.json();
    
    console.log('Chatbot request:', { user_id, message, thread_id, context });

    // Get user variables
    const userVariables = await getUserVariables(user_id);
    
    // Create or use existing thread
    const currentThreadId = thread_id || await createThread();
    
    // Build context message with user data and current content
    const contextMessage = buildContextMessage(userVariables, context);
    
    // Add context message to thread (only if it's a new thread or context changed)
    if (!thread_id) {
      await addMessageToThread(currentThreadId, contextMessage, 'user');
    }
    
    // Add user message to thread
    await addMessageToThread(currentThreadId, message, 'user');
    
    // Run assistant
    const response = await runAssistant(currentThreadId);
    
    // Save conversation to database
    await saveConversation(user_id, message, response, currentThreadId, context);
    
    return new Response(JSON.stringify({
      message: response,
      thread_id: currentThreadId,
      suggestions: generateSuggestions(context)
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in content-chatbot function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function getUserVariables(user_id: string) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user_id)
    .single();

  const { data: dashboard } = await supabase
    .from('user_dashboard')
    .select('*')
    .eq('user_id', user_id)
    .single();

  return {
    profile: profile || {},
    dashboard: dashboard || {},
  };
}

function buildContextMessage(userVariables: any, context: any) {
  const { profile, dashboard } = userVariables;
  
  let contextMessage = `INFORMAÇÕES DO USUÁRIO:
- Nome: ${profile.display_name || 'Não informado'}
- Título: ${profile.title || 'Não informado'}
- Nicho: ${profile.archetype || 'Não informado'}
- Foco: ${profile.focus || 'Não informado'}`;

  if (dashboard.profile_highlights && dashboard.profile_highlights.length > 0) {
    contextMessage += `\n- Objetivos: ${dashboard.profile_highlights[0]?.content || 'Não definido'}`;
  }

  if (context?.day && context?.content_card) {
    contextMessage += `\n\nCONTEÚDO ATUAL EM ANÁLISE (Dia ${context.day}):
- Título: ${context.content_card.title || 'Não informado'}
- Formato: ${context.content_card.format || 'Não informado'}`;
    
    if (context.content_card.examples) {
      contextMessage += `\n- Exemplos disponíveis: ${Object.keys(context.content_card.examples).join(', ')}`;
    }
    
    if (context.content_card.viral_tips) {
      contextMessage += `\n- Dicas virais: ${context.content_card.viral_tips.length} disponíveis`;
    }
  }

  contextMessage += `\n\nVocê é um assistente especializado em criação de conteúdo. Responda sempre em português brasileiro, de forma clara e prática, focando em sugestões específicas baseadas no perfil do usuário.`;

  return contextMessage;
}

async function createThread() {
  const response = await fetch('https://api.openai.com/v1/threads', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v2'
    },
  });

  const data = await response.json();
  return data.id;
}

async function addMessageToThread(threadId: string, content: string, role: string) {
  await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v2'
    },
    body: JSON.stringify({
      role: role,
      content: content
    })
  });
}

async function runAssistant(threadId: string) {
  // Create run
  const runResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v2'
    },
    body: JSON.stringify({
      assistant_id: ASSISTANT_ID
    })
  });

  const run = await runResponse.json();
  
  // Poll for completion
  let runStatus = run;
  while (runStatus.status === 'queued' || runStatus.status === 'in_progress') {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const statusResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${run.id}`, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'OpenAI-Beta': 'assistants=v2'
      }
    });
    
    runStatus = await statusResponse.json();
  }

  // Get messages
  const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'OpenAI-Beta': 'assistants=v2'
    }
  });

  const messages = await messagesResponse.json();
  const lastMessage = messages.data[0];
  
  return lastMessage.content[0].text.value;
}

async function saveConversation(
  user_id: string, 
  userMessage: string, 
  assistantResponse: string, 
  conversation_id: string,
  context: any
) {
  await supabase.from('chat_conversations').insert({
    user_id,
    conversation_id,
    user_message: userMessage,
    assistant_response: assistantResponse,
    context: context || null
  });
}

function generateSuggestions(context: any): string[] {
  const baseSuggestions = [
    "Como posso melhorar este conteúdo?",
    "Crie uma variação para LinkedIn",
    "Sugira hashtags para este post"
  ];

  if (context?.content_card) {
    return [
      "Como adaptar este formato para stories?",
      "Gere um hook mais impactante",
      "Quais gatilhos psicológicos usar?"
    ];
  }

  return baseSuggestions;
}
