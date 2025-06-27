
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ContentSectionsProps {
  contentCard: any;
}

export const ContentFormat = ({ contentCard }: ContentSectionsProps) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
    <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
      <span className="text-lg mr-3">🎬</span>
      Formato de Conteúdo
    </h4>
    <div className="flex flex-wrap gap-3">
      <Badge className="bg-gradient-to-r from-slate-700 to-slate-800 text-white text-sm px-4 py-2 shadow-sm">
        {contentCard.format}
      </Badge>
      {(contentCard as any).content_type === 'case_study' && (
        <Badge className="bg-gradient-to-r from-slate-600 to-slate-700 text-white text-sm px-4 py-2 shadow-sm">
          Estudo de Caso
        </Badge>
      )}
    </div>
  </div>
);

export const MainContent = ({ contentCard }: ContentSectionsProps) => {
  const isCaseStudy = (contentCard as any).content_type === 'case_study';
  
  if ((!isCaseStudy || contentCard.main_content) && contentCard.main_content) {
    return (
      <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
        <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <span className="text-lg mr-3">💡</span>
          Conteúdo Principal
        </h4>
        <p className="text-slate-700 leading-relaxed">{contentCard.main_content}</p>
      </div>
    );
  }
  return null;
};

export const ArraySection = ({ 
  contentCard, 
  fieldName, 
  title, 
  icon, 
  bgColor, 
  borderColor, 
  textColor,
  itemIcon 
}: ContentSectionsProps & {
  fieldName: string;
  title: string;
  icon: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  itemIcon: string;
}) => {
  const items = (contentCard as any)[fieldName];
  
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
      <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
        <span className="text-lg mr-3">{icon}</span>
        {title}
      </h4>
      <div className={`${bgColor} border ${borderColor} rounded-lg p-4`}>
        {items.map((item: string, index: number) => (
          <div key={index} className={`flex items-start mb-3 last:mb-0 p-4 bg-white rounded-lg border-l-4 ${borderColor.replace('border-', 'border-l-')} shadow-sm`}>
            <span className="text-lg mr-3 flex-shrink-0">{itemIcon}</span>
            <span className={`${textColor} text-sm leading-relaxed font-medium`}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const HowToStructure = ({ contentCard }: ContentSectionsProps) => {
  const howToStructure = (contentCard as any).how_to_structure;
  
  if (!howToStructure) return null;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
      <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
        <span className="text-lg mr-3">📋</span>
        Como Criar o Conteúdo
      </h4>
      <div className="bg-gradient-to-r from-slate-50 to-zinc-50 border border-slate-200 rounded-lg p-5">
        <div className="step-item flex mb-4 items-start">
          <span className="bg-gradient-to-r from-slate-700 to-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0 mt-0.5 shadow-sm">1</span>
          <span className="text-slate-700 leading-relaxed">{howToStructure.step_1}</span>
        </div>
        <div className="step-item flex mb-4 items-start">
          <span className="bg-gradient-to-r from-slate-700 to-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0 mt-0.5 shadow-sm">2</span>
          <span className="text-slate-700 leading-relaxed">{howToStructure.step_2}</span>
        </div>
        <div className="step-item flex mb-0 items-start">
          <span className="bg-gradient-to-r from-slate-700 to-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0 mt-0.5 shadow-sm">3</span>
          <span className="text-slate-700 leading-relaxed">{howToStructure.step_3}</span>
        </div>
      </div>
    </div>
  );
};

export const VideoStructure = ({ contentCard }: ContentSectionsProps) => {
  const videoStructure = (contentCard as any).video_structure;
  
  if (!videoStructure) return null;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
      <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
        <span className="text-lg mr-3">🎬</span>
        Estrutura do Vídeo
      </h4>
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white shadow-lg">
        <div className="bg-white bg-opacity-10 p-4 rounded-lg mb-4 border-l-4 border-amber-400 backdrop-blur-sm">
          <strong className="block text-amber-200 text-sm uppercase tracking-wide mb-2">1. Hook</strong>
          <span className="text-white text-sm leading-relaxed">{videoStructure.hook}</span>
        </div>
        
        <div className="bg-white bg-opacity-10 p-4 rounded-lg mb-4 border-l-4 border-emerald-400 backdrop-blur-sm">
          <strong className="block text-emerald-200 text-sm uppercase tracking-wide mb-2">2. Apresentação</strong>
          <span className="text-white text-sm leading-relaxed">{videoStructure.apresentacao}</span>
        </div>
        
        <div className="bg-white bg-opacity-10 p-4 rounded-lg mb-4 border-l-4 border-blue-400 backdrop-blur-sm">
          <strong className="block text-blue-200 text-sm uppercase tracking-wide mb-2">3. Desafio</strong>
          <span className="text-white text-sm leading-relaxed">{videoStructure.desafio}</span>
        </div>
        
        <div className="bg-white bg-opacity-10 p-4 rounded-lg mb-4 border-l-4 border-purple-400 backdrop-blur-sm">
          <strong className="block text-purple-200 text-sm uppercase tracking-wide mb-2">4. Revelação</strong>
          <span className="text-white text-sm leading-relaxed">{videoStructure.revelacao}</span>
        </div>
        
        <div className="bg-white bg-opacity-10 p-4 rounded-lg border-l-4 border-rose-400 backdrop-blur-sm">
          <strong className="block text-rose-200 text-sm uppercase tracking-wide mb-2">5. Educação</strong>
          <span className="text-white text-sm leading-relaxed">{videoStructure.educacao}</span>
        </div>
      </div>
    </div>
  );
};

export const NarrativeStructure = ({ contentCard }: ContentSectionsProps) => {
  const narrativeStructure = (contentCard as any).estrutura_narrativa_detalhada;
  
  if (!narrativeStructure) return null;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
      <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
        <span className="text-lg mr-3">📖</span>
        Estrutura Narrativa Detalhada
      </h4>
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white shadow-lg">
        {narrativeStructure.abertura && (
          <div className="bg-white bg-opacity-10 p-4 rounded-lg mb-4 border-l-4 border-amber-400 backdrop-blur-sm">
            <strong className="block text-amber-200 text-sm uppercase tracking-wide mb-2">1. Abertura</strong>
            <span className="text-white text-sm leading-relaxed">{narrativeStructure.abertura}</span>
          </div>
        )}
        
        {narrativeStructure.desenvolvimento && (
          <div className="bg-white bg-opacity-10 p-4 rounded-lg mb-4 border-l-4 border-emerald-400 backdrop-blur-sm">
            <strong className="block text-emerald-200 text-sm uppercase tracking-wide mb-2">2. Desenvolvimento</strong>
            <span className="text-white text-sm leading-relaxed">{narrativeStructure.desenvolvimento}</span>
          </div>
        )}
        
        {narrativeStructure.climax && (
          <div className="bg-white bg-opacity-10 p-4 rounded-lg mb-4 border-l-4 border-blue-400 backdrop-blur-sm">
            <strong className="block text-blue-200 text-sm uppercase tracking-wide mb-2">3. Clímax</strong>
            <span className="text-white text-sm leading-relaxed">{narrativeStructure.climax}</span>
          </div>
        )}
        
        {narrativeStructure.resolucao && (
          <div className="bg-white bg-opacity-10 p-4 rounded-lg border-l-4 border-purple-400 backdrop-blur-sm">
            <strong className="block text-purple-200 text-sm uppercase tracking-wide mb-2">4. Resolução</strong>
            <span className="text-white text-sm leading-relaxed">{narrativeStructure.resolucao}</span>
          </div>
        )}
      </div>
    </div>
  );
};
