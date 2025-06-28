
import { Badge } from '@/components/ui/badge';
import { Play, Users, Target, Lightbulb } from 'lucide-react';
import { ContentCard } from '@/types/weekView';
import PersonalizationButton from './PersonalizationButton';
import { DailyContent } from '@/types/weekView';

interface ContentSectionProps {
  contentCard: ContentCard;
}

interface VideoStructureSectionProps extends ContentSectionProps {
  day?: number;
  onContentUpdate?: (newContent: DailyContent) => void;
  currentGenerationLevel?: number;
}

export const ContentFormat = ({ contentCard }: ContentSectionProps) => {
  if (!contentCard.format) return null;

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-2xl border border-slate-200/60 shadow-soft">
      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
        <Play className="h-5 w-5 mr-3 text-blue-600" />
        Formato do Conteúdo
      </h4>
      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-xl border border-blue-200/60">
        <p className="text-blue-800 font-medium text-center">{contentCard.format}</p>
      </div>
    </div>
  );
};

export const MainContent = ({ contentCard }: ContentSectionProps) => {
  if (!contentCard.main_content) return null;

  return (
    <div className="bg-gradient-to-br from-white to-blue-50/30 p-6 rounded-2xl border border-slate-200/60 shadow-soft">
      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
        <Target className="h-5 w-5 mr-3 text-blue-600" />
        Conceito Principal
      </h4>
      <p className="text-slate-700 leading-relaxed">{contentCard.main_content}</p>
    </div>
  );
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
}: ContentSectionProps & {
  fieldName: string;
  title: string;
  icon: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  itemIcon: string;
}) => {
  const fieldValue = (contentCard as any)[fieldName];
  
  if (!fieldValue || !Array.isArray(fieldValue) || fieldValue.length === 0) return null;

  return (
    <div className={`${bgColor} p-6 rounded-2xl border ${borderColor} shadow-soft`}>
      <h4 className={`text-lg font-bold ${textColor} mb-4 flex items-center`}>
        <span className="mr-3 text-lg">{icon}</span>
        {title}
      </h4>
      <div className="space-y-3">
        {fieldValue.map((item: string, index: number) => (
          <div key={index} className="flex items-start space-x-3 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/60 shadow-sm">
            <span className="flex-shrink-0 mt-0.5">{itemIcon}</span>
            <span className={`${textColor} text-sm font-medium leading-tight`}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const HowToStructure = ({ contentCard }: ContentSectionProps) => {
  if (!contentCard.how_to_structure) return null;

  const structure = contentCard.how_to_structure;
  const steps = Object.entries(structure).filter(([key]) => key.startsWith('step_'));

  if (steps.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200/60 shadow-soft">
      <h4 className="text-lg font-bold text-green-900 mb-4 flex items-center">
        <Lightbulb className="h-5 w-5 mr-3 text-green-600" />
        Como Estruturar
      </h4>
      <div className="space-y-4">
        {steps.map(([key, value], index) => (
          <div key={key} className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
              {index + 1}
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl flex-1 border border-green-200/60 shadow-sm">
              <p className="text-green-800 font-medium leading-relaxed">{value as string}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const VideoStructure = ({ 
  contentCard, 
  day, 
  onContentUpdate, 
  currentGenerationLevel = 0 
}: VideoStructureSectionProps) => {
  if (!contentCard.video_structure) return null;

  const structure = contentCard.video_structure;
  const sections = Object.entries(structure);

  if (sections.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Personalization Button */}
      {day && onContentUpdate && (
        <PersonalizationButton
          day={day}
          onContentUpdate={onContentUpdate}
          currentGenerationLevel={currentGenerationLevel}
        />
      )}

      {/* Video Structure Content */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-200/60 shadow-soft">
        <h4 className="text-lg font-bold text-purple-900 mb-4 flex items-center">
          <Play className="h-5 w-5 mr-3 text-purple-600" />
          Estrutura do Vídeo
        </h4>
        <div className="space-y-4">
          {sections.map(([key, value], index) => {
            const sectionTitle = key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ');
            
            return (
              <div key={key} className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-purple-200/60 shadow-sm">
                <div className="flex items-center mb-2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white mr-3">
                    {index + 1}
                  </Badge>
                  <h5 className="font-semibold text-purple-900">{sectionTitle}</h5>
                </div>
                <p className="text-purple-800 leading-relaxed">{value as string}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const NarrativeStructure = ({ contentCard }: ContentSectionProps) => {
  // This component handles other narrative structures that aren't video_structure
  // You can expand this for other structure types if needed
  return null;
};
