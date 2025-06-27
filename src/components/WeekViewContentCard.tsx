
import { Badge } from '@/components/ui/badge';
import { Play, Users } from 'lucide-react';
import { ContentCard } from '@/types/weekView';
import { getIntentionColor } from '@/utils/weekViewUtils';
import { Roteiro181Section1, Roteiro181Section2, Roteiro181Section3, Roteiro181Section4 } from './WeekViewRoteiro181Sections';
import { ContentFormat, MainContent, ArraySection, HowToStructure, VideoStructure, NarrativeStructure } from './WeekViewContentSections';
import WeekViewCaseStudy from './WeekViewCaseStudy';
import WeekViewExamples from './WeekViewExamples';

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
  
  console.log('WeekViewContentCard received contentCard:', contentCard);
  console.log('Content type detected:', (contentCard as any).content_type);
  
  return (
    <div className="space-y-6">
      {/* Format Section */}
      <ContentFormat contentCard={contentCard} />

      {/* Enhanced Case Study Specific Content */}
      <WeekViewCaseStudy contentCard={contentCard} />

      {/* Standard Content Sections */}
      <MainContent contentCard={contentCard} />

      {/* Tipos de Pedidos Interessantes Section */}
      <ArraySection 
        contentCard={contentCard}
        fieldName="tipos_pedidos_interessantes"
        title="Tipos de Pedidos Interessantes"
        icon="💬"
        bgColor="bg-cyan-50"
        borderColor="border-cyan-200"
        textColor="text-cyan-800"
        itemIcon="🗣️"
      />

      {/* Elementos que Tornam Crível Section */}
      <ArraySection 
        contentCard={contentCard}
        fieldName="elementos_que_tornam_crivel"
        title="Elementos que Tornam Crível"
        icon="🏆"
        bgColor="bg-emerald-50"
        borderColor="border-emerald-200"
        textColor="text-emerald-800"
        itemIcon="✅"
      />

      {/* Estrutura Narrativa Detalhada Section */}
      <NarrativeStructure contentCard={contentCard} />

      {/* Dicas para Execução Section */}
      <ArraySection 
        contentCard={contentCard}
        fieldName="dicas_para_execucao"
        title="Dicas para Execução"
        icon="🎯"
        bgColor="bg-indigo-50"
        borderColor="border-indigo-200"
        textColor="text-indigo-800"
        itemIcon="💡"
      />

      {/* Call to Actions Eficazes Section */}
      <ArraySection 
        contentCard={contentCard}
        fieldName="call_to_actions_eficazes"
        title="Call to Actions Eficazes"
        icon="📢"
        bgColor="bg-red-50"
        borderColor="border-red-200"
        textColor="text-red-800"
        itemIcon="📣"
      />

      {/* How to Structure Section */}
      <HowToStructure contentCard={contentCard} />

      {/* Day 1 (Roteiro 181) Specific Section 1: Tipos de situações negativas eficazes */}
      <Roteiro181Section1 contentCard={contentCard} />

      {/* Video Structure Section */}
      <VideoStructure contentCard={contentCard} />

      {/* Enhanced Examples Section */}
      <WeekViewExamples 
        contentCard={contentCard}
        expandedExamples={expandedExamples}
        onExpandExamples={onExpandExamples}
      />

      {/* Psychological Triggers Section */}
      <ArraySection 
        contentCard={contentCard}
        fieldName="psychological_triggers"
        title="Gatilhos Psicológicos"
        icon="🧠"
        bgColor="bg-purple-50"
        borderColor="border-purple-200"
        textColor="text-purple-800"
        itemIcon="🎯"
      />

      {/* Day 1 (Roteiro 181) Specific Section 2: Elementos que tornam autêntico */}
      <Roteiro181Section2 contentCard={contentCard} />

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
      <ArraySection 
        contentCard={contentCard}
        fieldName="viral_tips"
        title="Elementos Virais"
        icon="🚀"
        bgColor="bg-orange-50"
        borderColor="border-orange-200"
        textColor="text-orange-800"
        itemIcon="💥"
      />

      {/* Practical Steps Section */}
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

      {/* Content Variations Section */}
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

      {/* Day 1 (Roteiro 181) Specific Section 3: Lições valiosas comuns */}
      <Roteiro181Section3 contentCard={contentCard} />

      {/* Day 1 (Roteiro 181) Specific Section 4: Cuidados importantes */}
      <Roteiro181Section4 contentCard={contentCard} />

      {/* CTA Section */}
      {contentCard.cta_text && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Call to Action</h4>
          <p className="text-orange-600 font-medium">
            {contentCard.roteiro_number === 181 
              ? "Já passaram por algo parecido? Comenta aí!" 
              : contentCard.cta_text
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default WeekViewContentCard;
