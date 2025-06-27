
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';
import { Task } from '@/types/weekView';
import { getPlatformColor } from '@/utils/weekViewUtils';

interface WeekViewDayCardProps {
  day: number;
  task: Task | undefined;
  isSelected: boolean;
  onSelect: (day: number) => void;
  onContentTip: (day: number) => void;
}

const WeekViewDayCard = ({ 
  day, 
  task, 
  isSelected, 
  onSelect, 
  onContentTip 
}: WeekViewDayCardProps) => {
  return (
    <Card 
      className={`cursor-pointer hover-lift-subtle smooth-transition border-2 relative group animate-fade-in ${
        isSelected 
          ? 'bg-blue-50/80 border-blue-400 shadow-elevated ring-2 ring-blue-200/50' 
          : 'card-primary hover:border-blue-300/60'
      }`}
      onClick={() => onSelect(day)}
    >
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <span className={`font-bold text-sm sm:text-base drop-shadow-sm smooth-transition ${
            isSelected ? 'text-blue-700' : 'text-gray-900'
          }`}>
            Dia {day}
          </span>
          {task?.platform && (
            <Badge className={`text-xs text-white smooth-transition shadow-soft ${getPlatformColor(task.platform)}`}>
              {task.platform}
            </Badge>
          )}
        </div>
        
        {task ? (
          <div className={`text-xs sm:text-sm mb-4 font-medium smooth-transition leading-relaxed ${
            isSelected ? 'text-blue-600' : 'text-gray-700'
          }`}>
            {task.title}
          </div>
        ) : (
          <div className="text-xs sm:text-sm text-gray-500 mb-4 italic leading-relaxed">
            Nenhuma atividade disponível
          </div>
        )}
        
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onContentTip(day);
            }}
            className="text-xs interactive-element focus-shadow bg-white/80 border-gray-200 text-gray-700 hover:bg-blue-50/80 hover:border-blue-300/60 hover:text-blue-700"
          >
            <Lightbulb className="h-3 w-3 mr-1.5" />
            <span className="hidden sm:inline">Dica de Conteúdo</span>
            <span className="sm:hidden">Dica</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeekViewDayCard;
