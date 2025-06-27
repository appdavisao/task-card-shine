
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
    <div className="space-y-8">
      {/* Header with Day and Roteiro Number */}
      {(contentCard as any).roteiro_number && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{contentCard.title}</h2>
          <div className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-slate-200">
            Roteiro #{(contentCard as any).roteiro_number}
          </div>
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
        <div className="bg-gradient-to-r from-slate-50 to-stone-50 p-6 rounded-xl border border-slate-200/60 shadow-sm">
          <h4 className="text-slate-800 font-semibold text-lg mb-4 flex items-center">
            <span className="text-lg mr-3">📊</span>
            Análise Estratégica
          </h4>
          <p className="text-slate-700 text-sm leading-relaxed">{(contentCard as any).strategic_analysis}</p>
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
        bgColor="bg-gradient-to-r from-slate-50 to-zinc-50"
        borderColor="border-slate-200"
        textColor="text-slate-800"
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
        <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
          <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-3 text-slate-600" />
            Objetivos do Conteúdo
          </h4>
          <div className="flex flex-wrap gap-3">
            {contentCard.intentions.map((intention, index) => (
              <Badge key={index} className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 border border-slate-300 text-sm px-4 py-2 hover:from-slate-200 hover:to-slate-300 transition-all">
                {intention}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Platforms Section */}
      {contentCard.platforms && Array.isArray(contentCard.platforms) && contentCard.platforms.length > 0 && (
        <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
          <h4 className="text-lg font-semibold text-slate-900 mb-4">Plataformas Recomendadas</h4>
          <div className="flex flex-wrap gap-3">
            {contentCard.platforms.map((platform, index) => (
              <Badge key={index} className="bg-gradient-to-r from-slate-700 to-slate-800 text-white text-sm px-4 py-2 hover:from-slate-800 hover:to-slate-900 transition-all shadow-sm">
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
        bgColor="bg-gradient-to-r from-amber-50 to-yellow-50"
        borderColor="border-amber-200"
        textColor="text-amber-900"
        itemIcon="💥"
      />

      {/* Engagement Benefits Section */}
      {(contentCard as any).engagement_benefits && Array.isArray((contentCard as any).engagement_benefits) && (contentCard as any).engagement_benefits.length > 0 && (
        <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
          <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <span className="text-lg mr-3">📈</span>
            Predição de Engajamento
          </h4>
          <div className="space-y-3">
            {(contentCard as any).engagement_benefits.map((benefit: string, index: number) => (
              <div key={index} className="flex items-center bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-lg border border-emerald-200/60">
                <span className="text-emerald-600 mr-3 flex-shrink-0">✅</span>
                <span className="text-emerald-800 text-sm font-medium leading-tight">{benefit}</span>
              </div>
            ))}
          </div>
          
          {(contentCard as any).viral_potential && (
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-4 rounded-lg text-center font-semibold mt-4 shadow-sm">
              <strong>Potencial Viral:</strong> {(contentCard as any).viral_potential}
            </div>
          )}
        </div>
      )}

      {/* Content Variations Section */}
      {(contentCard as any).content_variations && Array.isArray((contentCard as any).content_variations) && (contentCard as any).content_variations.length > 0 && (
        <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
          <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            🎭 Variações do Formato
          </h4>
          <div className="space-y-3">
            {(contentCard as any).content_variations.map((variation: string, index: number) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-slate-50 to-zinc-50 rounded-lg border-l-4 border-l-slate-400">
                <span className="w-2 h-2 bg-slate-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-700 text-sm leading-relaxed">{variation}</span>
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
        <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
          <h4 className="text-lg font-semibold text-slate-900 mb-3">Call to Action</h4>
          <p className="text-slate-700 font-medium bg-gradient-to-r from-slate-50 to-zinc-50 p-4 rounded-lg border border-slate-200">
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
        <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
          <h4 className="text-lg font-semibold text-slate-900 mb-3">Observações Importantes</h4>
          <p className="text-slate-700 leading-relaxed">{contentCard.observations}</p>
        </div>
      )}
    </div>
  );
};

export default WeekViewContentCard;
