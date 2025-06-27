import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Image, File, Calendar, Trophy, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { NavBar } from '@/components/ui/tubelight-navbar';

const ActionPlan = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState<Record<number, boolean>>({});

  if (!user) {
    navigate('/auth');
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const navItems = [
    { name: 'Dashboard', url: '/dashboard', icon: Calendar, action: () => navigate('/dashboard') },
    { name: 'Semanas', url: '/week/1', icon: Calendar, action: () => navigate('/week/1') },
    { name: 'Ranking', url: '#', icon: Trophy, action: () => toast({ title: "Ranking", description: "Feature coming soon!" }) },
    { name: 'Sair', url: '#', icon: LogOut, action: handleSignOut },
  ];

  const questions = [
    {
      id: 1,
      day: 1,
      title: "Escreva mais um momento em que a dor lhe ensinou algo que nenhuma vitória ensinaria (7 a 10 linhas)",
      description: "Como fazer? Descreva um momento real de dor que te transformou."
    },
    {
      id: 2,
      day: 2,
      title: "Defina a transformação que seu livro entrega",
      description: "Como fazer? Escreva em 2 a 3 frases o que o leitor vai conquistar ao final da leitura."
    },
    {
      id: 3,
      day: 3,
      title: "Mapeie o leitor ideal: idade, dores, crenças e sonhos",
      description: "Como fazer? Crie um perfil detalhado do seu público-alvo. Imagine uma pessoa específica."
    },
    {
      id: 4,
      day: 4,
      title: "Visite uma livraria, fotografe 5 capas e fontes marcantes",
      description: "Como fazer? Vá até uma livraria física, observe capas que chamam atenção e registre com fotos e envie para o nosso time."
    },
    {
      id: 5,
      day: 5,
      title: "Leia 1 capítulo de um livro do Paulo Vieira e anote suas percepções estruturais",
      description: "Como fazer? Escolha um livro e anote como ele começa, como prende o leitor, estilo e lições."
    },
    {
      id: 6,
      day: 6,
      title: "Preencha o Briefing do Livro completo",
      description: "Como fazer? Use o modelo oficial e preencha título, promessa, público e tema geral."
    },
    {
      id: 7,
      day: 7,
      title: "Complete a ferramenta \"3 Pilares da Sua História\"",
      description: "Como fazer? Responda cada passo da ferramenta com uma história sua real e marcante."
    },
    {
      id: 8,
      day: 8,
      title: "Estruture os 10 capítulos com nome e objetivo",
      description: "Como fazer? Crie um roteiro do seu livro: nome de cada capítulo (mesmo que não seja definitivo) e seu papel na jornada do leitor."
    },
    {
      id: 9,
      day: 9,
      title: "Defina 2 a 3 subtemas para cada capítulo",
      description: "Como fazer? Desdobre o conteúdo de cada capítulo em tópicos claros e práticos."
    },
    {
      id: 10,
      day: 10,
      title: "Valide a estrutura com mentor ou leitor-alvo",
      description: "Como fazer? Apresente a estrutura e ouça o que gera dúvida, empolgação ou confusão."
    },
    {
      id: 11,
      day: 11,
      title: "Escolha 2 livros referência e anote elementos-chave",
      description: "Como fazer? Leia com olhar analítico: abertura, títulos, estrutura, linguagem, ritmo."
    },
    {
      id: 12,
      day: 12,
      title: "Crie uma frase de 1 linha que resuma a promessa",
      description: "Como fazer? Resuma o valor do seu livro em uma única frase poderosa e memorável."
    },
    {
      id: 13,
      day: 13,
      title: "Grave um vídeo: \"Por que esse livro existe?\"",
      description: "Como fazer? Fale por 2 minutos com paixão sobre a missão por trás da sua escrita e envie na comunidade de mentores."
    },
    {
      id: 14,
      day: 14,
      title: "Pomodoro – Início do Capítulo 1 (3 blocos)",
      description: "Como fazer? Escreva 3 blocos de 25 minutos com 5 min de pausa (busque a quantidade de linhas sugerida - 15 a 20 linhas por bloco de 25 minutos)."
    },
    {
      id: 15,
      day: 15,
      title: "Pomodoro – Continuação do Capítulo 1",
      description: "Como fazer? Continue com 3 blocos. Foque no desenvolvimento e conexão emocional."
    },
    {
      id: 16,
      day: 16,
      title: "Pomodoro – Conclusão + revisão e leitura em voz alta",
      description: "Como fazer? Finalize o capítulo e revise lendo em voz alta. Corte o que não toca ou transforma."
    },
    {
      id: 17,
      day: 17,
      title: "Compartilhe com mentor/leitor e reescreva com base no feedback",
      description: "Como fazer? Mostre a alguém do público-alvo e melhore com base no retorno (você pode enviar na comunidade de mentores)."
    },
    {
      id: 18,
      day: 18,
      title: "Pomodoro – Capítulo 2 (3 blocos)",
      description: "Como fazer? Escreva o capítulo inteiro em 3 sessões com foco em evolução narrativa."
    },
    {
      id: 19,
      day: 19,
      title: "Pomodoro – Revisão e ajustes do Capítulo 2",
      description: "Como fazer? Leia em voz alta e ajuste linguagem, ritmo e clareza. Foque em transformação."
    },
    {
      id: 20,
      day: 20,
      title: "Grave vídeo: \"Quem me tornei como escritor nestes 20 dias?\"",
      description: "Como fazer? Fale de forma autêntica sobre o que mudou em você após esse processo e publique nos seus stories e na comunidade."
    }
  ];

  const handleFileUpload = async (file: File, questionNumber: number) => {
    if (!user) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'text/plain', 'image/png', 'image/jpeg'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Erro",
        description: "Apenas arquivos PDF, TXT e PNG são permitidos",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Erro",
        description: "O arquivo deve ter no máximo 10MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(prev => ({ ...prev, [questionNumber]: true }));

    try {
      // Generate unique filename
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `${user.id}/${questionNumber}/${timestamp}_${sanitizedName}`;

      // Upload to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('cards')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Save metadata to database
      const { error: dbError } = await supabase
        .from('action_plan_uploads')
        .insert({
          user_id: user.id,
          file_name: file.name,
          file_path: uploadData.path,
          file_type: file.type,
          file_size: file.size,
          question_number: questionNumber,
        });

      if (dbError) throw dbError;

      toast({
        title: "Sucesso!",
        description: `Arquivo "${file.name}" enviado com sucesso`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Erro no upload",
        description: "Não foi possível enviar o arquivo. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setUploading(prev => ({ ...prev, [questionNumber]: false }));
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return <FileText className="w-4 h-4" />;
    if (fileType.includes('image')) return <Image className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar items={navItems} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
            Plano de Ação
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Escritor Best-Seller
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question) => (
            <Card key={question.id} className="bg-white shadow-sm border border-slate-200/60 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-start gap-4 text-base">
                  <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-12 h-10 flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-soft">
                    {question.day}
                  </span>
                  <div className="flex-1 space-y-2">
                    <div className="text-sm text-blue-600 font-semibold">
                      Dia {question.day}
                    </div>
                    <div className="text-slate-800 leading-relaxed font-medium">
                      {question.title}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="pl-16 space-y-4">
                  <p className="text-slate-600 leading-relaxed">
                    {question.description}
                  </p>
                  
                  {/* Small Upload Button */}
                  <div className="flex justify-start">
                    <input
                      type="file"
                      id={`file-${question.id}`}
                      accept=".pdf,.txt,.png,.jpg,.jpeg"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileUpload(file, question.id);
                        }
                      }}
                      className="hidden"
                    />
                    <label 
                      htmlFor={`file-${question.id}`}
                      className="cursor-pointer"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-2 text-sm bg-white hover:bg-blue-50 border-blue-200 hover:border-blue-300 text-blue-700 hover:text-blue-800 shadow-soft hover:shadow-medium transition-all duration-200"
                        disabled={uploading[question.id]}
                        asChild
                      >
                        <span>
                          {uploading[question.id] ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                          ) : (
                            <Upload className="w-4 h-4" />
                          )}
                          <span>Enviar arquivo</span>
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200/50 shadow-soft rounded-xl overflow-hidden">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">📚</span>
                Resultado Esperado:
              </h3>
              <ul className="text-blue-800 space-y-2 text-sm leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  Capítulo 1 e 2 escritos
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  Estrutura validada e alinhada com público
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  Clareza de identidade e propósito autoral
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ActionPlan;
