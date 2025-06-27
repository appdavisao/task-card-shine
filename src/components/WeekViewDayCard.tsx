
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types/weekView';

interface WeekViewDayCardProps {
  day: number;
  task: Task | undefined;
  isSelected: boolean;
  onSelect: (day: number) => void;
}

const WeekViewDayCard = ({ 
  day, 
  task, 
  isSelected, 
  onSelect
}: WeekViewDayCardProps) => {
  // Show locked message for days beyond 20
  if (day > 20) {
    return (
      <Card className="cursor-not-allowed opacity-60 bg-gray-100 border-gray-300">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-sm sm:text-base text-gray-600">
              Dia {day}
            </span>
            <Badge className="bg-gray-400 text-white text-xs">
              Bloqueado
            </Badge>
          </div>
          <div className="text-xs sm:text-sm text-gray-500 italic">
            Desbloqueie ao chegar no dia 20
          </div>
        </CardContent>
      </Card>
    );
  }

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
          {task?.completed && (
            <Badge className="bg-green-500 text-white text-xs">
              Concluído
            </Badge>
          )}
        </div>
        {task ? (
          <div className={`text-xs sm:text-sm mb-3 font-medium line-clamp-3 ${
            isSelected ? 'text-blue-600' : 'text-gray-700'
          }`}>
            {task.title}
          </div>
        ) : (
          <div className="text-xs sm:text-sm text-gray-500 mb-3 italic">
            Nenhuma atividade disponível
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeekViewDayCard;
