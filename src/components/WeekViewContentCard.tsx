
import { Badge } from '@/components/ui/badge';
import { Play, Users } from 'lucide-react';
import { ContentCard } from '@/types/weekView';
import { getIntentionColor } from '@/utils/weekViewUtils';
import { Roteiro181Section1, Roteiro181Section2, Roteiro181Section3, Roteiro181Section4 } from './WeekViewRoteiro181Sections';
import { Roteiro32Section1, Roteiro32Section2, Roteiro32Section3, Roteiro32Section4 } from './WeekViewRoteiro32Sections';
import { Roteiro180Section1, Roteiro180Section2, Roteiro180Section3 } from './WeekViewRoteiro180Sections';
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
      {/* Header with Day and Roteiro Number */}
      {(contentCard as any).roteiro_number && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">{contentCard.title}</h2>
          <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            Roteiro #{(contentCard as any).roteiro_number}
          </div>
        </div>
      )}

      {/* Reference Link */}
      {(contentCard as any).reference_link && (
        <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-l-gray-400">
          <h4 className="text-gray-700 font-semibold text-sm mb-2 flex items-center">
            <span className="text-sm mr-2">🔗</span>
            Link de Referência
          </h4>
          <a 
            href={(contentCard as any).reference_link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Acessar Notion
          </a>
        </div>
      )}

      {/* Format Section */}
      <ContentFormat contentCard={contentCard} />

      {/* Enhanced Case Study Specific Content */}
      <WeekViewCaseStudy contentCard={contentCard} />

      {/* Standard Content Sections */}
      <MainContent contentCard={contentCard} />

      {/* Strategic Analysis */}
      {(contentCard as any).strategic_analysis && (
        <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-l-indigo-500">
          <h4 className="text-indigo-700 font-semibold text-lg mb-3 flex items-center">
            <span className="text-lg mr-2">📊</span>
            Análise Estratégica
          </h4>
          <p className="text-indigo-800 text-sm leading-relaxed">{(contentCard as any).strategic_analysis}</p>
        </div>
      )}

      {/* How to Structure Section */}
      <HowToStructure contentCard={contentCard} />

      {/* Day 2 (Roteiro 180) Specific Section 1: Por que as cópias falham */}
      <Roteiro180Section1 contentCard={contentCard} />

      {/* Day 1 (Roteiro 181) Specific Section 1: Tipos de situações negativas eficazes */}
      <Roteiro181Section1 contentCard={contentCard} />

      {/* Day 2 (Roteiro 32) Specific Section 1: Fatores de Decisão Essenciais */}
      <Roteiro32Section1 contentCard={contentCard} />

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

      {/* Day 2 (Roteiro 180) Specific Section 2: Como adaptar corretamente */}
      <Roteiro180Section2 contentCard={contentCard} />

      {/* Day 1 (Roteiro 181) Specific Section 2: Elementos que tornam autêntico */}      
      <Roteiro181Section2 contentCard={contentCard} />

      {/* Day 2 (Roteiro 32) Specific Section 2: Framework de Análise */}
      <Roteiro32Section2 contentCard={contentCard} />

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

      {/* Day 2 (Roteiro 180) Specific Section 3: Elementos fundamentais para o sucesso */}
      <Roteiro180Section3 contentCard={contentCard} />

      {/* Day 1 (Roteiro 181) Specific Section 3: Lições valiosas comuns */}
      <Roteiro181Section3 contentCard={contentCard} />

      {/* Day 2 (Roteiro 32) Specific Section 3: Armadilhas Mentais Comuns */}
      <Roteiro32Section3 contentCard={contentCard} />

      {/* Day 1 (Roteiro 181) Specific Section 4: Cuidados importantes */}
      <Roteiro181Section4 contentCard={contentCard} />

      {/* Day 2 (Roteiro 32) Specific Section 4: Sinais de que É Hora de Decidir */}
      <Roteiro32Section4 contentCard={contentCard} />

      {/* CTA Section */}
      {contentCard.cta_text && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Call to Action</h4>
          <p className="text-orange-600 font-medium">
            {contentCard.roteiro_number === 181 
              ? "Já passaram por algo parecido? Comenta aí!" 
              : contentCard.roteiro_number === 32
              ? "Qual dessas decisões vocês mais têm dificuldade? Comenta aí!"
              : contentCard.roteiro_number === 180
              ? "Qual estratégia vocês mais têm dificuldade para adaptar? Comenta aí!"
              : contentCard.cta_text
            }
          </p>
        </div>
      )}

      {/* Observations Section */}
      {contentCard.observations && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Observações Importantes</h4>
          <p className="text-gray-700 leading-relaxed">{contentCard.observations}</p>
        </div>
      )}
    </div>
  );
};

export default WeekViewContentCard;
