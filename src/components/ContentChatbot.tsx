
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isStreaming?: boolean;
}

interface ContentChatbotProps {
  context?: {
    page: string;
    day?: number;
    content_card?: any;
  };
}

const ContentChatbot = ({ context }: ContentChatbotProps) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [initialMessageSent, setInitialMessageSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !initialMessageSent && user) {
      handleInitialMessage();
    }
  }, [isOpen, initialMessageSent, user]);

  const simulateTyping = (text: string, messageId: string) => {
    const words = text.split(' ');
    let currentText = '';
    let wordIndex = 0;

    const typeNextWord = () => {
      if (wordIndex < words.length) {
        currentText += (wordIndex > 0 ? ' ' : '') + words[wordIndex];
        
        setMessages(prev => prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, content: currentText, isStreaming: true }
            : msg
        ));

        wordIndex++;
        setTimeout(typeNextWord, 50 + Math.random() * 50); // Variable speed for natural feel
      } else {
        // Finish streaming
        setMessages(prev => prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, isStreaming: false }
            : msg
        ));
      }
    };

    typeNextWord();
  };

  const handleInitialMessage = async () => {
    if (!user) return;

    setIsLoading(true);
    setInitialMessageSent(true);

    const loadingMessage: Message = {
      id: 'loading',
      content: 'Analisando seu perfil estratégico completo...',
      role: 'assistant',
      timestamp: new Date(),
      isStreaming: true
    };
    setMessages([loadingMessage]);

    try {
      const { data, error } = await supabase.functions.invoke('content-chatbot', {
        body: {
          user_id: user.id,
          message: 'Contexto inicial',
          context,
          is_initial_message: true
        }
      });

      if (error) throw error;

      // Remove loading message and add streaming response
      const assistantMessageId = Date.now().toString();
      const assistantMessage: Message = {
        id: assistantMessageId,
        content: '',
        role: 'assistant',
        timestamp: new Date(),
        isStreaming: true
      };

      setMessages([assistantMessage]);
      setThreadId(data.thread_id);
      setSuggestions(data.suggestions || []);

      // Start typing animation
      simulateTyping(data.message, assistantMessageId);

    } catch (error) {
      console.error('Initial chat error:', error);
      setMessages([{
        id: 'error',
        content: 'Erro ao carregar o assistente. Tente novamente mais tarde.',
        role: 'assistant',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (messageText?: string) => {
    const message = messageText || inputMessage.trim();
    if (!message || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('content-chatbot', {
        body: {
          user_id: user.id,
          message,
          thread_id: threadId,
          context,
          is_initial_message: false
        }
      });

      if (error) throw error;

      const assistantMessageId = (Date.now() + 1).toString();
      const assistantMessage: Message = {
        id: assistantMessageId,
        content: '',
        role: 'assistant',
        timestamp: new Date(),
        isStreaming: true
      };

      setMessages(prev => [...prev, assistantMessage]);
      setThreadId(data.thread_id);
      setSuggestions(data.suggestions || []);

      // Start typing animation
      simulateTyping(data.message, assistantMessageId);

    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Erro no Chat",
        description: "Não foi possível enviar a mensagem. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`bg-white shadow-2xl border-slate-200 transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-[420px] h-[650px]'
      }`}>
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              Assistente de Conteúdo
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 p-1 h-8 w-8"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1 h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {context?.day && !isMinimized && (
            <div className="text-sm opacity-90">
              Analisando: Dia {context.day} - {context.content_card?.title || 'Conteúdo'}
            </div>
          )}
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[calc(650px-80px)]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`flex flex-col max-w-[280px] ${
                    message.role === 'user' ? 'items-end' : 'items-start'
                  }`}>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    }`}>
                      <div className="whitespace-pre-wrap break-words">
                        {message.content}
                        {message.isStreaming && (
                          <span className="inline-block w-2 h-4 bg-current ml-1 animate-pulse" />
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 px-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && !messages.some(m => m.isStreaming) && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-gray-700" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                <div className="text-xs text-gray-600 mb-2 font-medium">Sugestões:</div>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-blue-100 hover:text-blue-700 text-xs px-3 py-1 transition-colors"
                      onClick={() => sendMessage(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  disabled={isLoading}
                  className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <Button
                  onClick={() => sendMessage()}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ContentChatbot;
