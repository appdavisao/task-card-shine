
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Image, File } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const ActionPlan = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState<Record<number, boolean>>({});

  if (!user) {
    navigate('/auth');
    return null;
  }

  const questions = [
    {
      id: 1,
      title: "Qual é o seu objetivo principal?",
      description: "Descreva seu objetivo principal e anexe documentos relacionados (planejamento, metas, etc.)"
    },
    {
      id: 2,
      title: "Qual é sua área de expertise?",
      description: "Compartilhe sobre sua área de conhecimento e anexe materiais relevantes"
    },
    {
      id: 3,
      title: "Quais são seus principais desafios?",
      description: "Identifique os obstáculos que você enfrenta e anexe análises ou estudos"
    },
    {
      id: 4,
      title: "Qual é seu público-alvo?",
      description: "Defina quem é sua audiência e anexe pesquisas ou personas"
    },
    {
      id: 5,
      title: "Quais recursos você tem disponível?",
      description: "Liste seus recursos atuais e anexe inventários ou planilhas"
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
      {/* Header */}
      <div className="bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Button 
                onClick={() => navigate('/dashboard')} 
                variant="outline" 
                className="text-white border-white hover:bg-white hover:text-slate-800 text-xs sm:text-sm"
              >
                ← Voltar
              </Button>
              <h1 className="text-lg sm:text-xl font-semibold">Plano de Ação</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        {/* Introduction */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-3">
                📋 Construa seu Plano de Ação Personalizado
              </h2>
              <p className="text-blue-800 leading-relaxed">
                Responda as questões abaixo e anexe documentos relevantes. 
                Isso nos ajudará a criar estratégias personalizadas para seu crescimento.
              </p>
              <p className="text-sm text-blue-700 mt-2">
                <strong>Formatos aceitos:</strong> PDF, TXT, PNG (máximo 10MB por arquivo)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question) => (
            <Card key={question.id} className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-gray-900">
                  <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    {question.id}
                  </span>
                  {question.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {question.description}
                </p>
                
                {/* File Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
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
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    {uploading[question.id] ? (
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    ) : (
                      <Upload className="w-8 h-8 text-gray-400" />
                    )}
                    <div className="text-sm">
                      <span className="font-medium text-blue-600 hover:text-blue-500">
                        Clique para enviar arquivo
                      </span>
                      <p className="text-gray-500">ou arraste e solte aqui</p>
                    </div>
                    <p className="text-xs text-gray-400">
                      PDF, TXT, PNG (máx. 10MB)
                    </p>
                  </label>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8">
          <Card className="bg-gray-50 border border-gray-200">
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 text-center">
                💡 <strong>Dica:</strong> Quanto mais detalhadas forem suas respostas e documentos, 
                mais personalizado será seu plano de crescimento digital.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ActionPlan;
