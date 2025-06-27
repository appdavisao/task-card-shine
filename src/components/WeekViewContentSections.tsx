
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ContentSectionsProps {
  contentCard: any;
}

export const ContentFormat = ({ contentCard }: ContentSectionsProps) => (
  <div>
    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
      <span className="text-lg mr-2">🎬</span>
      Formato de Conteúdo
    </h4>
    <Badge className="bg-blue-600 text-white text-sm px-3 py-1">
      {contentCard.format}
    </Badge>
    {(contentCard as any).content_type === 'case_study' && (
      <Badge className="bg-purple-600 text-white text-sm px-3 py-1 ml-2">
        Estudo de Caso
      </Badge>
    )}
  </div>
);

export const MainContent = ({ contentCard }: ContentSectionsProps) => {
  const isCaseStudy = (contentCard as any).content_type === 'case_study';
  
  if ((!isCaseStudy || contentCard.main_content) && contentCard.main_content) {
    return (
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <span className="text-lg mr-2">💡</span>
          Conteúdo Principal
        </h4>
        <p className="text-gray-700 leading-relaxed">{contentCard.main_content}</p>
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
    <div className="section-container">
      <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
        <span className="text-lg mr-2">{icon}</span>
        {title}
      </h4>
      <div className={`${bgColor} border ${borderColor} rounded-lg p-4`}>
        {items.map((item: string, index: number) => (
          <div key={index} className={`flex items-start mb-3 last:mb-0 p-3 bg-white rounded-lg border-l-4 ${borderColor.replace('border-', 'border-l-')}`}>
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
    <div className="section-container">
      <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
        <span className="text-lg mr-2">📋</span>
        Como Criar o Conteúdo
      </h4>
      <div className="steps-container bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="step-item flex mb-3 items-start">
          <span className="step-number bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0 mt-0.5">1</span>
          <span className="step-text text-gray-700 leading-relaxed">{howToStructure.step_1}</span>
        </div>
        <div className="step-item flex mb-3 items-start">
          <span className="step-number bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0 mt-0.5">2</span>
          <span className="step-text text-gray-700 leading-relaxed">{howToStructure.step_2}</span>
        </div>
        <div className="step-item flex mb-0 items-start">
          <span className="step-number bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0 mt-0.5">3</span>
          <span className="step-text text-gray-700 leading-relaxed">{howToStructure.step_3}</span>
        </div>
      </div>
    </div>
  );
};

export const VideoStructure = ({ contentCard }: ContentSectionsProps) => {
  const videoStructure = (contentCard as any).video_structure;
  
  if (!videoStructure) return null;

  return (
    <div className="section-container">
      <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
        <span className="text-lg mr-2">🎬</span>
        Estrutura do Vídeo
      </h4>
      <div className="video-structure-container bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-5 text-white">
        <div className="video-step bg-white bg-opacity-15 p-3 rounded-lg mb-3 border-l-4 border-yellow-400">
          <strong className="block text-yellow-200 text-sm uppercase tracking-wide mb-1">1. Hook</strong>
          <span className="text-white">{videoStructure.hook}</span>
        </div>
        
        <div className="video-step bg-white bg-opacity-15 p-3 rounded-lg mb-3 border-l-4 border-green-400">
          <strong className="block text-green-200 text-sm uppercase tracking-wide mb-1">2. Apresentação</strong>
          <span className="text-white">{videoStructure.apresentacao}</span>
        </div>
        
        <div className="video-step bg-white bg-opacity-15 p-3 rounded-lg mb-3 border-l-4 border-blue-400">
          <strong className="block text-blue-200 text-sm uppercase tracking-wide mb-1">3. Desafio</strong>
          <span className="text-white">{videoStructure.desafio}</span>
        </div>
        
        <div className="video-step bg-white bg-opacity-15 p-3 rounded-lg mb-3 border-l-4 border-purple-400">
          <strong className="block text-purple-200 text-sm uppercase tracking-wide mb-1">4. Revelação</strong>
          <span className="text-white">{videoStructure.revelacao}</span>
        </div>
        
        <div className="video-step bg-white bg-opacity-15 p-3 rounded-lg border-l-4 border-red-400">
          <strong className="block text-red-200 text-sm uppercase tracking-wide mb-1">5. Educação</strong>
          <span className="text-white">{videoStructure.educacao}</span>
        </div>
      </div>
    </div>
  );
};

export const NarrativeStructure = ({ contentCard }: ContentSectionsProps) => {
  const narrativeStructure = (contentCard as any).estrutura_narrativa_detalhada;
  
  if (!narrativeStructure) return null;

  return (
    <div className="section-container">
      <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
        <span className="text-lg mr-2">📖</span>
        Estrutura Narrativa Detalhada
      </h4>
      <div className="narrativa-container bg-gradient-to-br from-rose-400 to-pink-600 rounded-lg p-5 text-white">
        {narrativeStructure.abertura && (
          <div className="narrativa-step bg-white bg-opacity-15 p-3 rounded-lg mb-3 border-l-4 border-yellow-400">
            <strong className="block text-yellow-200 text-sm uppercase tracking-wide mb-1">1. Abertura</strong>
            <span className="text-white">{narrativeStructure.abertura}</span>
          </div>
        )}
        
        {narrativeStructure.desenvolvimento && (
          <div className="narrativa-step bg-white bg-opacity-15 p-3 rounded-lg mb-3 border-l-4 border-green-400">
            <strong className="block text-green-200 text-sm uppercase tracking-wide mb-1">2. Desenvolvimento</strong>
            <span className="text-white">{narrativeStructure.desenvolvimento}</span>
          </div>
        )}
        
        {narrativeStructure.climax && (
          <div className="narrativa-step bg-white bg-opacity-15 p-3 rounded-lg mb-3 border-l-4 border-blue-400">
            <strong className="block text-blue-200 text-sm uppercase tracking-wide mb-1">3. Clímax</strong>
            <span className="text-white">{narrativeStructure.climax}</span>
          </div>
        )}
        
        {narrativeStructure.resolucao && (
          <div className="narrativa-step bg-white bg-opacity-15 p-3 rounded-lg border-l-4 border-purple-400">
            <strong className="block text-purple-200 text-sm uppercase tracking-wide mb-1">4. Resolução</strong>
            <span className="text-white">{narrativeStructure.resolucao}</span>
          </div>
        )}
      </div>
    </div>
  );
};
