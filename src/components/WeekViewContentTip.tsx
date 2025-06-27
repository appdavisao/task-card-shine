
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
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
  return (
    <Collapsible open={contentTipOpen} onOpenChange={onContentTipToggle}>
      <CollapsibleTrigger asChild>
        <Card className="bg-white border-gray-200 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lightbulb className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Dica de Conteúdo - Dia {selectedDay}
                </h3>
                {dailyContent && dailyContent.content_card && (
                  <div className="flex items-center gap-2">
                    <Badge className={`${getContentTypeColor(dailyContent.content_type)} text-white`}>
                      {getContentTypeDisplay(dailyContent.content_type)}
                    </Badge>
                    <div className="flex gap-1">
                      {getPlatformIcons(dailyContent.content_type).map((platform, index) => (
                        <Badge 
                          key={index}
                          className={`${platform.color} ${platform.textColor} text-xs px-1.5 py-0.5`}
                        >
                          {platform.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {contentTipOpen ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
            {!contentTipOpen && (
              <p className="text-sm text-gray-600 mt-2">
                Clique para ver detalhes do conteúdo sugerido
              </p>
            )}
          </CardContent>
        </Card>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <Card className="bg-white border-gray-200 shadow-lg mt-2">
          <CardContent className="p-4 sm:p-6">
            {contentLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Carregando conteúdo...</span>
              </div>
            ) : dailyContent && dailyContent.content_card ? (
              <WeekViewContentCard 
                contentCard={dailyContent.content_card}
                expandedExamples={expandedExamples}
                onExpandExamples={onExpandExamples}
              />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">
                  Nenhum conteúdo estruturado foi encontrado para este dia ainda.
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
