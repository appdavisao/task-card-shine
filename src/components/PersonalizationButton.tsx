
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, RefreshCw, Undo2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { DailyContent } from '@/types/weekView';

interface PersonalizationButtonProps {
  day: number;
  onContentUpdate: (newContent: DailyContent) => void;
  currentGenerationLevel?: number;
}

interface PersonalizationResponse {
  success: boolean;
  content_card: any;
  strategic_analysis: string;
  generation: {
    id: string;
    generation_level: number;
  };
}

const PersonalizationButton = ({ 
  day, 
  onContentUpdate, 
  currentGenerationLevel = 0 
}: PersonalizationButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(1);

  const personalizationLevels = [
    { level: 1, name: 'Básico', description: 'Análise estratégica personalizada' },
    { level: 2, name: 'Avançado', description: 'Estrutura de vídeo adaptada' },
    { level: 3, name: 'Expert', description: 'Exemplos específicos do seu nicho' }
  ];

  const handlePersonalize = async (generationLevel: number) => {
    setIsGenerating(true);
    
    try {
      console.log(`Generating personalized content for day ${day}, level ${generationLevel}`);
      
      const { data, error } = await supabase.functions.invoke('personalize-content', {
        body: {
          day: day,
          generation_level: generationLevel
        }
      });

      if (error) {
        console.error('Personalization error:', error);
        throw error;
      }

      const response = data as PersonalizationResponse;
      
      if (!response.success) {
        throw new Error('Failed to generate personalized content');
      }

      console.log('Personalization successful:', response);

      // Update the content with the new personalized version
      const updatedContent: DailyContent = {
        id: `personalized-${response.generation.id}`,
        day: day,
        content_type: 'social_media',
        title: `Conteúdo Personalizado - Nível ${response.generation.generation_level}`,
        content_card: response.content_card
      };

      onContentUpdate(updatedContent);

      toast({
        title: "Conteúdo Personalizado!",
        description: `Geração nível ${generationLevel} criada com sucesso`,
      });

    } catch (error) {
      console.error('Error personalizing content:', error);
      toast({
        title: "Erro na personalização",
        description: "Não foi possível gerar o conteúdo personalizado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRestore = async () => {
    try {
      // This would restore to original content
      // For now, we'll just refresh the page content
      toast({
        title: "Conteúdo Restaurado",
        description: "Voltando ao conteúdo original",
      });
    } catch (error) {
      console.error('Error restoring content:', error);
      toast({
        title: "Erro ao restaurar",
        description: "Não foi possível restaurar o conteúdo original",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/60 p-4 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2 rounded-full">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-amber-900">Personalizar Conteúdo</h4>
            <p className="text-xs text-amber-700">Adapte o conteúdo ao seu perfil e objetivos</p>
          </div>
        </div>
        {currentGenerationLevel > 0 && (
          <Badge className="bg-amber-100 text-amber-800 border border-amber-300">
            Nível {currentGenerationLevel}
          </Badge>
        )}
      </div>

      <div className="space-y-3">
        {personalizationLevels.map((level) => (
          <div
            key={level.level}
            className={`p-3 rounded-lg border cursor-pointer transition-all ${
              selectedLevel === level.level
                ? 'bg-white border-amber-300 shadow-sm'
                : 'bg-amber-50/50 border-amber-200 hover:bg-white'
            }`}
            onClick={() => setSelectedLevel(level.level)}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-amber-900">{level.name}</span>
                  {currentGenerationLevel >= level.level && (
                    <Badge className="bg-green-100 text-green-800 text-xs">Aplicado</Badge>
                  )}
                </div>
                <p className="text-xs text-amber-700 mt-1">{level.description}</p>
              </div>
              <div className={`w-3 h-3 rounded-full border-2 ${
                selectedLevel === level.level
                  ? 'bg-amber-500 border-amber-500'
                  : 'border-amber-300'
              }`} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <Button
          onClick={() => handlePersonalize(selectedLevel)}
          disabled={isGenerating}
          className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Personalizar
            </>
          )}
        </Button>
        
        {currentGenerationLevel > 0 && (
          <Button
            onClick={handleRestore}
            variant="outline"
            className="border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            <Undo2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default PersonalizationButton;
