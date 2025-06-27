
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
      <Card className="cursor-not-allowed opacity-60 bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300 rounded-2xl shadow-soft">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-base sm:text-lg text-gray-600 bg-white/70 px-3 py-1 rounded-full">
              Dia {day}
            </span>
            <Badge className="bg-gray-500 text-white text-xs px-3 py-1 rounded-full shadow-sm">
              Bloqueado
            </Badge>
          </div>
          <div className="text-sm sm:text-base text-gray-600 italic font-medium bg-white/50 p-3 rounded-xl">
            Desbloqueie ao chegar no dia 20
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-elevated border-2 rounded-2xl relative group ${
        isSelected 
          ? 'bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-100 border-blue-300 shadow-elevated ring-2 ring-blue-200' 
          : 'bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:border-blue-200 shadow-soft hover:shadow-medium'
      }`}
      onClick={() => onSelect(day)}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`font-bold text-base sm:text-lg px-4 py-2 rounded-full shadow-sm ${
            isSelected 
              ? 'text-blue-800 bg-white/80 border border-blue-200' 
              : 'text-slate-800 bg-white/90 border border-slate-200'
          }`}>
            Dia {day}
          </div>
          {task?.completed && (
            <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs px-3 py-1 rounded-full shadow-sm">
              Concluído
            </Badge>
          )}
        </div>
        {task ? (
          <div className={`text-sm sm:text-base mb-4 font-medium leading-relaxed line-clamp-3 ${
            isSelected ? 'text-blue-700' : 'text-slate-700'
          }`}>
            {task.title}
          </div>
        ) : (
          <div className="text-sm sm:text-base text-slate-500 mb-4 italic font-medium bg-slate-100/60 p-3 rounded-xl">
            Nenhuma atividade disponível
          </div>
        )}
        
        {/* Elegant bottom accent */}
        <div className={`h-1 rounded-full transition-all duration-300 ${
          isSelected 
            ? 'bg-gradient-to-r from-blue-400 to-indigo-500' 
            : 'bg-gradient-to-r from-slate-300 to-slate-400 group-hover:from-blue-300 group-hover:to-blue-400'
        }`} />
      </CardContent>
    </Card>
  );
};

export default WeekViewDayCard;
