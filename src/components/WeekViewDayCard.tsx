
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
      className={`cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg border-2 relative group ${
        isSelected 
          ? 'bg-blue-50 border-blue-400 shadow-lg ring-2 ring-blue-200' 
          : 'bg-white border-gray-200 hover:border-blue-300 shadow-sm'
      }`}
      onClick={() => onSelect(day)}
    >
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`font-bold text-sm sm:text-base drop-shadow-sm ${
            isSelected ? 'text-blue-700' : 'text-gray-900'
          }`}>
            Dia {day}
          </span>
          {task?.platform && (
            <Badge className={`text-xs text-white transition-colors ${getPlatformColor(task.platform)}`}>
              {task.platform}
            </Badge>
          )}
        </div>
        {task ? (
          <div className={`text-xs sm:text-sm mb-3 font-medium ${
            isSelected ? 'text-blue-600' : 'text-gray-700'
          }`}>
            {task.title}
          </div>
        ) : (
          <div className="text-xs sm:text-sm text-gray-500 mb-3 italic">
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
            className="text-xs bg-gray-50 border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors shadow-sm"
          >
            <Lightbulb className="h-3 w-3 mr-1" />
            <span className="hidden sm:inline">Dica de Conteúdo</span>
            <span className="sm:hidden">Dica</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeekViewDayCard;
