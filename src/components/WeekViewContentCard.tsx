import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Target, Lightbulb, Play, Users, Briefcase, CheckCircle, TrendingUp, Eye } from 'lucide-react';
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
  
  // Debug logging to see what data we're receiving
  console.log('WeekViewContentCard received contentCard:', contentCard);
  console.log('Content type detected:', (contentCard as any).content_type);
  
  // Check if this is a case study content type
  const isCaseStudy = (contentCard as any).content_type === 'case_study';
  const caseDetails = isCaseStudy ? (contentCard as any).case_details : null;
  
  console.log('Is case study:', isCaseStudy);
  console.log('Case details:', caseDetails);
  
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
        {isCaseStudy && (
          <Badge className="bg-purple-600 text-white text-sm px-3 py-1 ml-2">
            Estudo de Caso
          </Badge>
        )}
      </div>

      {/* Enhanced Case Study Specific Content */}
      {isCaseStudy && caseDetails && (
        <div className="case-study-container space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-l-blue-500">
            <h4 className="text-blue-700 font-semibold text-lg mb-2 flex items-center">
              🎯 Desafio do Cliente
            </h4>
            <p className="text-blue-800 leading-relaxed">{caseDetails.client_request}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-l-green-500">
            <h4 className="text-green-700 font-semibold text-lg mb-2 flex items-center">
              ⚙️ Processo de Solução
            </h4>
            <p className="text-green-800 leading-relaxed">{caseDetails.solution_process}</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-l-yellow-500">
            <h4 className="text-yellow-700 font-semibold text-lg mb-2 flex items-center">
              📈 Resultado Prático
            </h4>
            <p className="text-yellow-800 leading-relaxed font-medium">{caseDetails.practical_result}</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-l-purple-500">
            <h4 className="text-purple-700 font-semibold text-lg mb-2 flex items-center">
              💡 Insight Chave
            </h4>
            <p className="text-purple-800 leading-relaxed font-medium">{caseDetails.key_insight}</p>
          </div>
        </div>
      )}

      {/* Standard Content Sections - Only show if NOT case study OR if case study has these fields */}
      {(!isCaseStudy || contentCard.main_content) && contentCard.main_content && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
            Conteúdo Principal
          </h4>
          <p className="text-gray-700 leading-relaxed">{contentCard.main_content}</p>
        </div>
      )}

      {/* How to Structure Section */}
      {(contentCard as any).how_to_structure && (
        <div className="section-container">
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <span className="text-lg mr-2">📋</span>
            Como Criar o Conteúdo
          </h4>
          <div className="steps-container bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="step-item flex mb-3 items-start">
              <span className="step-number bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0 mt-0.5">1</span>
              <span className="step-text text-gray-700 leading-relaxed">{(contentCard as any).how_to_structure.step_1}</span>
            </div>
            <div className="step-item flex mb-3 items-start">
              <span className="step-number bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0 mt-0.5">2</span>
              <span className="step-text text-gray-700 leading-relaxed">{(contentCard as any).how_to_structure.step_2}</span>
            </div>
            <div className="step-item flex mb-0 items-start">
              <span className="step-number bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0 mt-0.5">3</span>
              <span className="step-text text-gray-700 leading-relaxed">{(contentCard as any).how_to_structure.step_3}</span>
            </div>
          </div>
        </div>
      )}

      {/* Video Structure Section */}
      {(contentCard as any).video_structure && (
        <div className="section-container">
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <span className="text-lg mr-2">🎬</span>
            Estrutura do Vídeo
          </h4>
          <div className="video-structure-container bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-5 text-white">
            <div className="video-step bg-white bg-opacity-15 p-3 rounded-lg mb-3 border-l-4 border-yellow-400">
              <strong className="block text-yellow-200 text-sm uppercase tracking-wide mb-1">1. Hook</strong>
              <span className="text-white">{(contentCard as any).video_structure.hook}</span>
            </div>
            
            <div className="video-step bg-white bg-opacity-15 p-3 rounded-lg mb-3 border-l-4 border-green-400">
              <strong className="block text-green-200 text-sm uppercase tracking-wide mb-1">2. Apresentação</strong>
              <span className="text-white">{(contentCard as any).video_structure.apresentacao}</span>
            </div>
            
            <div className="video-step bg-white bg-opacity-15 p-3 rounded-lg mb-3 border-l-4 border-blue-400">
              <strong className="block text-blue-200 text-sm uppercase tracking-wide mb-1">3. Desafio</strong>
              <span className="text-white">{(contentCard as any).video_structure.desafio}</span>
            </div>
            
            <div className="video-step bg-white bg-opacity-15 p-3 rounded-lg mb-3 border-l-4 border-purple-400">
              <strong className="block text-purple-200 text-sm uppercase tracking-wide mb-1">4. Revelação</strong>
              <span className="text-white">{(contentCard as any).video_structure.revelacao}</span>
            </div>
            
            <div className="video-step bg-white bg-opacity-15 p-3 rounded-lg border-l-4 border-red-400">
              <strong className="block text-red-200 text-sm uppercase tracking-wide mb-1">5. Educação</strong>
              <span className="text-white">{(contentCard as any).video_structure.educacao}</span>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Examples Section */}
      {contentCard.examples && Object.keys(contentCard.examples).length > 0 && (
        <Collapsible open={expandedExamples} onOpenChange={onExpandExamples}>
          <Card className="bg-white border-gray-200">
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50 transition-colors">
                <CardTitle className="text-gray-900 text-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">💡</span>
                    Exemplos por Nicho
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
              <CardContent>
                <div className="examples-grid grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                  {Object.entries(contentCard.examples).map(([niche, types]: [string, any]) => (
                    <div key={niche} className="example-niche-card bg-green-50 border border-green-200 rounded-lg p-4 border-l-4 border-l-green-500">
                      <h4 className="niche-title text-green-700 font-semibold text-sm uppercase tracking-wide mb-3 text-center">
                        {niche}
                      </h4>
                      <div className="types-list space-y-2">
                        <div className="type-item flex items-start p-2 bg-white rounded border-b border-green-100">
                          <span className="type-number bg-green-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold mr-2 flex-shrink-0 mt-0.5">1</span>
                          <span className="type-description text-green-800 text-sm leading-tight">{types.tipo_1}</span>
                        </div>
                        <div className="type-item flex items-start p-2 bg-white rounded border-b border-green-100">
                          <span className="type-number bg-green-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold mr-2 flex-shrink-0 mt-0.5">2</span>
                          <span className="type-description text-green-800 text-sm leading-tight">{types.tipo_2}</span>
                        </div>
                        <div className="type-item flex items-start p-2 bg-white rounded">
                          <span className="type-number bg-green-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold mr-2 flex-shrink-0 mt-0.5">3</span>
                          <span className="type-description text-green-800 text-sm leading-tight">{types.tipo_3}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Psychological Triggers Section */}
      {(contentCard as any).psychological_triggers && Array.isArray((contentCard as any).psychological_triggers) && (contentCard as any).psychological_triggers.length > 0 && (
        <div className="section-container">
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <span className="text-lg mr-2">🧠</span>
            Gatilhos Psicológicos
          </h4>
          <div className="psychological-triggers-container bg-purple-50 border border-purple-200 rounded-lg p-4">
            {(contentCard as any).psychological_triggers.map((trigger: string, index: number) => (
              <div key={index} className="trigger-item flex items-start mb-3 last:mb-0 p-3 bg-white rounded-lg border-l-4 border-l-purple-500">
                <span className="trigger-icon text-lg mr-3 flex-shrink-0">🎯</span>
                <span className="trigger-text text-purple-800 text-sm leading-relaxed font-medium">{trigger}</span>
              </div>
            ))}
          </div>
        </div>
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

      {/* Viral Tips Section */}
      {(contentCard as any).viral_tips && Array.isArray((contentCard as any).viral_tips) && (contentCard as any).viral_tips.length > 0 && (
        <div className="section-container">
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <span className="text-lg mr-2">🚀</span>
            Elementos Virais
          </h4>
          <div className="viral-tips-container bg-orange-50 border border-orange-200 rounded-lg p-4">
            {(contentCard as any).viral_tips.map((tip: string, index: number) => (
              <div key={index} className="viral-tip-item flex items-start mb-3 last:mb-0 p-3 bg-white rounded-lg border-l-4 border-l-orange-500">
                <span className="tip-icon text-lg mr-2 flex-shrink-0">💥</span>
                <span className="tip-text text-orange-800 text-sm leading-relaxed font-medium">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NEW: Practical Steps Section */}
      {contentCard.practical_steps && Array.isArray(contentCard.practical_steps) && contentCard.practical_steps.length > 0 && (
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-l-green-500">
          <h4 className="text-green-700 font-semibold text-lg mb-3 flex items-center">
            📋 Passos Práticos
          </h4>
          <ol className="list-decimal list-inside space-y-2">
            {contentCard.practical_steps.map((step, index) => (
              <li key={index} className="text-green-800 text-sm leading-relaxed">{step}</li>
            ))}
          </ol>
        </div>
      )}

      {/* NEW: Content Variations Section */}
      {(contentCard as any).content_variations && Array.isArray((contentCard as any).content_variations) && (contentCard as any).content_variations.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            🎭 Variações do Formato
          </h4>
          <div className="space-y-3">
            {(contentCard as any).content_variations.map((variation: string, index: number) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-indigo-50 rounded-lg border-l-4 border-l-indigo-500">
                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-indigo-800 text-sm leading-relaxed">{variation}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Observations Section */}
      {contentCard.observations && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Observações Importantes</h4>
          <p className="text-gray-700 leading-relaxed">{contentCard.observations}</p>
        </div>
      )}

      {/* Engagement Benefits Section */}
      {(contentCard as any).engagement_benefits && Array.isArray((contentCard as any).engagement_benefits) && (contentCard as any).engagement_benefits.length > 0 && (
        <div className="section-container">
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <span className="text-lg mr-2">📈</span>
            Predição de Engajamento
          </h4>
          <div className="benefits-container">
            <div className="benefits-grid grid gap-3 md:grid-cols-1">
              {(contentCard as any).engagement_benefits.map((benefit: string, index: number) => (
                <div key={index} className="benefit-item flex items-center bg-green-50 p-3 rounded-lg border border-green-200">
                  <span className="check-icon text-green-600 mr-2 flex-shrink-0">✅</span>
                  <span className="benefit-text text-green-800 text-sm font-medium leading-tight">{benefit}</span>
                </div>
              ))}
            </div>
            
            {(contentCard as any).viral_potential && (
              <div className="viral-potential-badge bg-red-600 text-white p-3 rounded-lg text-center font-semibold mt-4">
                <strong>Potencial Viral:</strong> {(contentCard as any).viral_potential}
              </div>
            )}
          </div>
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
