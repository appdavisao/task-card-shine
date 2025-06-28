import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Sparkles, Play } from 'lucide-react';
import { DailyContent } from '@/types/weekView';
import { getContentTypeColor, getContentTypeDisplay, getPlatformIcons } from '@/utils/weekViewUtils';
import WeekViewContentCard from './WeekViewContentCard';

interface WeekViewContentTipProps {
  contentTipOpen: boolean;
  onContentTipToggle: (open: boolean) => void;
  selectedDay: number;
  dailyContent: DailyContent | null;
  contentLoading: boolean;
  expandedExamples: boolean;
  onExpandExamples: (expanded: boolean) => void;
}

const WeekViewContentTip = ({
  contentTipOpen,
  onContentTipToggle,
  selectedDay,
  dailyContent,
  contentLoading,
  expandedExamples,
  onExpandExamples
}: WeekViewContentTipProps) => {
  const [currentContent, setCurrentContent] = useState<DailyContent | null>(dailyContent);
  const [currentGenerationLevel, setCurrentGenerationLevel] = useState(0);

  // Update current content when dailyContent changes
  useEffect(() => {
    setCurrentContent(dailyContent);
  }, [dailyContent]);

  const handleContentUpdate = (newContent: DailyContent) => {
    console.log('Updating content with personalized version:', newContent);
    setCurrentContent(newContent);
    
    // Extract generation level from the content if available
    const generationLevel = newContent.id?.includes('personalized') ? 
      parseInt(newContent.title?.match(/Nível (\d+)/)?.[1] || '1') : 0;
    setCurrentGenerationLevel(generationLevel);
  };

  return (
    <Collapsible open={contentTipOpen} onOpenChange={onContentTipToggle}>
      <CollapsibleTrigger asChild>
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400 shadow-elevated cursor-pointer hover:shadow-dramatic transition-all duration-300 rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Estratégia de Conteúdo - Dia {selectedDay}
                  </h3>
                  {currentContent && currentContent.content_card && (
                    <div className="flex items-center gap-3 mt-2">
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full px-3 py-1">
                        {getContentTypeDisplay(currentContent.content_type)}
                      </Badge>
                      {currentGenerationLevel > 0 && (
                        <Badge className="bg-green-500/80 backdrop-blur-sm text-white border border-green-400/30 rounded-full px-3 py-1">
                          Personalizado Nv.{currentGenerationLevel}
                        </Badge>
                      )}
                      <div className="flex gap-2">
                        {getPlatformIcons(currentContent.content_type).map((platform, index) => (
                          <Badge 
                            key={index}
                            className="bg-white/20 backdrop-blur-sm text-white border border-white/30 text-xs px-2 py-1 rounded-full"
                          >
                            {platform.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                {contentTipOpen ? (
                  <ChevronUp className="h-5 w-5 text-white" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-white" />
                )}
              </div>
            </div>
            {!contentTipOpen && (
              <p className="text-blue-100 mt-3 text-sm font-medium opacity-90">
                {currentGenerationLevel > 0 
                  ? `Conteúdo personalizado (Nível ${currentGenerationLevel}) - Clique para ver detalhes`
                  : 'Clique para ver o roteiro completo e opções de personalização'
                }
              </p>
            )}
          </CardContent>
        </Card>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200/60 shadow-elevated mt-4 rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            {contentLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="text-slate-600 font-medium">Carregando estratégias de conteúdo...</span>
                </div>
              </div>
            ) : currentContent && currentContent.content_card ? (
              <WeekViewContentCard 
                contentCard={currentContent.content_card}
                expandedExamples={expandedExamples}
                onExpandExamples={onExpandExamples}
                day={selectedDay}
                onContentUpdate={handleContentUpdate}
                currentGenerationLevel={currentGenerationLevel}
              />
            ) : (
              <div className="text-center py-12">
                <div className="bg-slate-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Play className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-slate-600 font-medium text-lg">
                  Conteúdo em desenvolvimento
                </p>
                <p className="text-slate-500 text-sm mt-2">
                  Estratégias personalizadas serão disponibilizadas em breve
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default WeekViewContentTip;
