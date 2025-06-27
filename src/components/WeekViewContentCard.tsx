
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Target, Lightbulb, Play, Users } from 'lucide-react';
import { ContentCard } from '@/types/weekView';
import { getIntentionColor } from '@/utils/weekViewUtils';

interface WeekViewContentCardProps {
  contentCard: ContentCard;
  expandedExamples: boolean;
  onExpandExamples: (expanded: boolean) => void;
}

const WeekViewContentCard = ({ 
  contentCard, 
  expandedExamples, 
  onExpandExamples 
}: WeekViewContentCardProps) => {
  return (
    <div className="space-y-6">
      {/* Format Section */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Play className="h-5 w-5 mr-2 text-blue-600" />
          Formato de Conteúdo
        </h4>
        <Badge className="bg-blue-600 text-white text-sm px-3 py-1">
          {contentCard.format}
        </Badge>
      </div>

      {/* Main Content Section */}
      {contentCard.main_content && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
            Conteúdo Principal
          </h4>
          <p className="text-gray-700 leading-relaxed">{contentCard.main_content}</p>
        </div>
      )}

      {/* Examples Section */}
      {contentCard.examples && Object.keys(contentCard.examples).length > 0 && (
        <Collapsible open={expandedExamples} onOpenChange={onExpandExamples}>
          <Card className="bg-white border-gray-200">
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50 transition-colors">
                <CardTitle className="text-gray-900 text-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-green-600" />
                    Exemplos por Categoria
                  </div>
                  {expandedExamples ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4">
                {contentCard.examples.saude && (
                  <div>
                    <Badge className="bg-green-600 text-white mb-2">Saúde</Badge>
                    <p className="text-gray-700 text-sm">{contentCard.examples.saude}</p>
                  </div>
                )}
                {contentCard.examples.financas && (
                  <div>
                    <Badge className="bg-yellow-600 text-white mb-2">Finanças</Badge>
                    <p className="text-gray-700 text-sm">{contentCard.examples.financas}</p>
                  </div>
                )}
                {contentCard.examples.marketing && (
                  <div>
                    <Badge className="bg-purple-600 text-white mb-2">Marketing</Badge>
                    <p className="text-gray-700 text-sm">{contentCard.examples.marketing}</p>
                  </div>
                )}
                {contentCard.examples.relacionamentos && (
                  <div>
                    <Badge className="bg-pink-600 text-white mb-2">Relacionamentos</Badge>
                    <p className="text-gray-700 text-sm">{contentCard.examples.relacionamentos}</p>
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Intentions Section */}
      {contentCard.intentions && Array.isArray(contentCard.intentions) && contentCard.intentions.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <Users className="h-5 w-5 mr-2 text-orange-600" />
            Objetivos do Conteúdo
          </h4>
          <div className="flex flex-wrap gap-2">
            {contentCard.intentions.map((intention, index) => (
              <Badge key={index} className={`${getIntentionColor(intention)} text-sm px-3 py-1`}>
                {intention}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Platforms Section */}
      {contentCard.platforms && Array.isArray(contentCard.platforms) && contentCard.platforms.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Plataformas Recomendadas</h4>
          <div className="space-y-2">
            {contentCard.platforms.map((platform, index) => (
              <Badge key={index} className="bg-indigo-600 text-white text-sm px-3 py-1 mr-2">
                {platform}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Practical Steps Section */}
      {contentCard.practical_steps && Array.isArray(contentCard.practical_steps) && contentCard.practical_steps.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Passos Práticos</h4>
          <ol className="list-decimal list-inside space-y-2">
            {contentCard.practical_steps.map((step, index) => (
              <li key={index} className="text-gray-700 text-sm">{step}</li>
            ))}
          </ol>
        </div>
      )}

      {/* Observations Section */}
      {contentCard.observations && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Observações Importantes</h4>
          <p className="text-gray-700 leading-relaxed">{contentCard.observations}</p>
        </div>
      )}

      {/* CTA Section */}
      {contentCard.cta_text && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Call to Action</h4>
          <p className="text-orange-600 font-medium">{contentCard.cta_text}</p>
        </div>
      )}
    </div>
  );
};

export default WeekViewContentCard;
