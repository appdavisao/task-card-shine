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
  is_initial_message?: boolean;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user_id, message, thread_id, context, is_initial_message }: ChatRequest = await req.json();
    
    console.log('Chatbot request:', { user_id, message, thread_id, context, is_initial_message });

    const userVariables = await getUserVariables(user_id);
    const currentThreadId = thread_id || await createThread();
    
    // For initial message, send comprehensive context
    if (is_initial_message) {
      const contextMessage = buildEnhancedContextMessage(userVariables, context);
      await addMessageToThread(currentThreadId, contextMessage, 'user');
      
      // Add instruction for natural response format
      const instructionMessage = `
IMPORTANTE: Responda SEMPRE em texto natural e conversacional em português brasileiro. 
NUNCA use formato JSON, estruturas técnicas ou listas formatadas.
Seja um copywriter brasileiro experiente conversando naturalmente com o usuário.
Use parágrafos fluidos, linguagem acessível e tom consultivo.
Transforme insights técnicos em conselhos práticos e diretos.
      `;
      await addMessageToThread(currentThreadId, instructionMessage, 'user');
    } else if (!thread_id) {
      const contextMessage = buildEnhancedContextMessage(userVariables, context);
      await addMessageToThread(currentThreadId, contextMessage, 'user');
    }
    
    if (!is_initial_message) {
      await addMessageToThread(currentThreadId, message, 'user');
    }
    
    const response = await runAssistant(currentThreadId);
    
    await saveConversation(user_id, is_initial_message ? 'Contexto inicial' : message, response, currentThreadId, context);
    
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

function buildEnhancedContextMessage(userVariables: any, context: any) {
  const { profile, dashboard } = userVariables;
  
  const safeGet = (obj: any, path: string, defaultValue: any = 'Não informado') => {
    const keys = path.split('.');
    let current = obj;
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return defaultValue;
      }
    }
    return current || defaultValue;
  };

  let contextMessage = `Oi, eu sou o ${profile.display_name || 'usuário'}, preciso de ajuda com a criação desse conteúdo:

📊 ESTRATÉGIA DE CONTEÚDO - DIA ${context?.day || 'ATUAL'}`;

  if (context?.content_card) {
    const card = context.content_card;
    contextMessage += `

🎯 CONTENT CARD ATUAL:
${card.title}
${card.format}
${card.main_content || ''}

📋 ESTRUTURA DO CONTEÚDO:
${JSON.stringify(card.video_structure || card.content_variations || {}, null, 2)}

🎯 OBJETIVOS: ${(card.intentions || []).join(', ')}
📱 PLATAFORMAS: ${(card.platforms || []).join(', ')}
🚀 DICAS VIRAIS: ${(card.viral_tips || []).join(' • ')}

💡 EXEMPLOS POR NICHO:
${JSON.stringify(card.examples || {}, null, 2)}`;
  }

  contextMessage += `

🎯 PERFIL ESTRATÉGICO COMPLETO:

👤 IDENTIDADE:
- Nome: ${profile.display_name || 'Não informado'}
- Título: ${profile.title || 'Não informado'}
- Subtitle: ${profile.subtitle || 'Não informado'}
- Arquétipo: ${profile.archetype || 'Não informado'}
- Segmento: ${safeGet(dashboard, 'key_data.segment')}
- Foco: ${profile.focus || 'Não informado'}

💼 BACKGROUND PROFISSIONAL:
- Experiência: ${safeGet(dashboard, 'key_data.experience')}
- Trabalho Atual: ${safeGet(dashboard, 'key_data.current_work')}
- Conquistas: ${safeGet(dashboard, 'key_data.major_achievements')}
- Ponto de Virada: ${safeGet(dashboard, 'key_data.turning_point')}
- Legado Desejado: ${safeGet(dashboard, 'key_data.legacy')}

📊 ESTRATÉGIA DE PLATAFORMAS:
- Prioritária: ${safeGet(dashboard, 'platform_strategy.priority')}
- Instagram: ${safeGet(dashboard, 'platform_strategy.instagram', 0)}%
- LinkedIn: ${safeGet(dashboard, 'platform_strategy.linkedin', 0)}%
- YouTube: ${safeGet(dashboard, 'platform_strategy.youtube', 0)}%

🎯 ESTRATÉGIA PERSONALIZADA:
${dashboard.strategy_text || 'Não definida'}

📋 CONTEXTO ATUAL:
${dashboard.context_text || 'Não definido'}`;

  if (dashboard.profile_highlights && Array.isArray(dashboard.profile_highlights)) {
    contextMessage += `\n\n🏆 DESTAQUES DO PERFIL:`;
    dashboard.profile_highlights.forEach((highlight: any) => {
      contextMessage += `\n${highlight.icon || '•'} ${highlight.title || 'Item'}: ${highlight.content || 'Não especificado'}`;
    });
  }

  if (dashboard.scores) {
    contextMessage += `\n\n📈 SCORES DE AUTORIDADE:
- Digital: ${dashboard.scores.digital || 0}/10
- Speaking: ${dashboard.scores.speaking || 0}/10  
- Mentoring: ${dashboard.scores.mentoring || 0}/10
- Book: ${dashboard.scores.book || 0}/10`;
  }

  if (dashboard.motivation_quote) {
    contextMessage += `\n\n💡 QUOTE MOTIVACIONAL:
"${dashboard.motivation_quote}"`;
  }

  contextMessage += `

---
CONTEXTO DA SESSÃO:
- Página Atual: ${context?.page || 'Não especificada'}
- Dia do Conteúdo: ${context?.day || 'N/A'}
- Template Ativo: ${context?.content_card?.roteiro_number ? `Roteiro #${context.content_card.roteiro_number}` : 'N/A'}

🎯 MISSÃO: Use TODOS esses dados para dar conselhos ultra-específicos de copywriting para ${profile.display_name || 'o usuário'} no segmento ${safeGet(dashboard, 'key_data.segment')}.

E tudo o que posso te dizer sobre mim é:
"${JSON.stringify({ profile, dashboard }, null, 2)}"

Como você consegue me ajudar?`;

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
