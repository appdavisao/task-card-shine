import { Badge } from '@/components/ui/badge';
import { Play, Users, Sparkles, Target, Lightbulb } from 'lucide-react';
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
      {/* Premium Header with Roteiro Number */}
      {(contentCard as any).roteiro_number && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 sm:p-8 rounded-2xl shadow-elevated">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Sparkles className="h-8 w-8 mr-4 text-blue-200" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">{contentCard.title}</h2>
                <p className="text-blue-100 text-sm sm:text-base opacity-90">Conteúdo estratégico para redes sociais</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-white/30">
              Roteiro #{(contentCard as any).roteiro_number}
            </div>
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
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 p-6 rounded-2xl border border-slate-200/60 shadow-soft">
          <h4 className="text-slate-800 font-bold text-lg mb-4 flex items-center">
            <Target className="h-5 w-5 mr-3 text-blue-600" />
            Análise Estratégica
          </h4>
          <p className="text-slate-700 text-sm leading-relaxed bg-white/60 p-4 rounded-xl">{(contentCard as any).strategic_analysis}</p>
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
        bgColor="bg-gradient-to-br from-purple-50 to-indigo-50"
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

      {/* Enhanced Intentions Section */}
      {contentCard.intentions && Array.isArray(contentCard.intentions) && contentCard.intentions.length > 0 && (
        <div className="bg-gradient-to-br from-white to-blue-50/30 p-6 rounded-2xl border border-slate-200/60 shadow-soft">
          <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-3 text-blue-600" />
            Objetivos do Conteúdo
          </h4>
          <div className="flex flex-wrap gap-3">
            {contentCard.intentions.map((intention, index) => (
              <Badge key={index} className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200 text-sm px-4 py-2 hover:from-blue-200 hover:to-indigo-200 transition-all rounded-full shadow-sm">
                {intention}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Platforms Section */}
      {contentCard.platforms && Array.isArray(contentCard.platforms) && contentCard.platforms.length > 0 && (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-2xl shadow-elevated">
          <h4 className="text-lg font-bold mb-4 flex items-center">
            <Play className="h-5 w-5 mr-3" />
            Plataformas Recomendadas
          </h4>
          <div className="flex flex-wrap gap-3">
            {contentCard.platforms.map((platform, index) => (
              <Badge key={index} className="bg-white/20 backdrop-blur-sm text-white border border-white/30 text-sm px-4 py-2 hover:bg-white/30 transition-all rounded-full shadow-sm">
                {platform}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Viral Tips Section */}
      <ArraySection 
        contentCard={contentCard}
        fieldName="viral_tips"
        title="Elementos Virais"
        icon="🚀"
        bgColor="bg-gradient-to-br from-amber-50 to-orange-50"
        borderColor="border-amber-200"
        textColor="text-amber-900"
        itemIcon="💥"
      />

      {/* Enhanced Engagement Benefits Section */}
      {(contentCard as any).engagement_benefits && Array.isArray((contentCard as any).engagement_benefits) && (contentCard as any).engagement_benefits.length > 0 && (
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-200/60 shadow-soft">
          <h4 className="text-lg font-bold text-emerald-900 mb-4 flex items-center">
            <Sparkles className="h-5 w-5 mr-3 text-emerald-600" />
            Predição de Engajamento
          </h4>
          <div className="space-y-3">
            {(contentCard as any).engagement_benefits.map((benefit: string, index: number) => (
              <div key={index} className="flex items-center bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-emerald-200/60 shadow-sm">
                <span className="text-emerald-600 mr-3 flex-shrink-0">✅</span>
                <span className="text-emerald-800 text-sm font-medium leading-tight">{benefit}</span>
              </div>
            ))}
          </div>
          
          {(contentCard as any).viral_potential && (
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-4 rounded-xl text-center font-bold mt-4 shadow-sm">
              <strong>Potencial Viral:</strong> {(contentCard as any).viral_potential}
            </div>
          )}
        </div>
      )}

      {/* Enhanced Content Variations Section */}
      {(contentCard as any).content_variations && Array.isArray((contentCard as any).content_variations) && (contentCard as any).content_variations.length > 0 && (
        <div className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-2xl border border-slate-200/60 shadow-soft">
          <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
            <Lightbulb className="h-5 w-5 mr-3 text-blue-600" />
            Variações do Formato
          </h4>
          <div className="space-y-3">
            {(contentCard as any).content_variations.map((variation: string, index: number) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/60">
                <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">{index + 1}</span>
                <span className="text-slate-700 text-sm leading-relaxed font-medium">{variation}</span>
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

      {/* Enhanced CTA Section */}
      {contentCard.cta_text && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-elevated">
          <h4 className="text-lg font-bold mb-3 flex items-center">
            <Target className="h-5 w-5 mr-3" />
            Call to Action
          </h4>
          <p className="font-medium bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
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

      {/* Enhanced Observations Section */}
      {contentCard.observations && (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 p-6 rounded-2xl border border-slate-200/60 shadow-soft">
          <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center">
            <Lightbulb className="h-5 w-5 mr-3 text-amber-600" />
            Observações Importantes
          </h4>
          <p className="text-slate-700 leading-relaxed bg-white/60 p-4 rounded-xl">{contentCard.observations}</p>
        </div>
      )}
    </div>
  );
};

export default WeekViewContentCard;
