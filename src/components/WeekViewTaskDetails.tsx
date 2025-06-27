
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types/weekView';
import { getPlatformColor, getDifficultyColor } from '@/utils/weekViewUtils';

interface WeekViewTaskDetailsProps {
  task: Task;
}

const WeekViewTaskDetails = ({ task }: WeekViewTaskDetailsProps) => {
  return (
    <Card className="bg-white border-gray-200 shadow-lg">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
          <CardTitle className="text-gray-900 text-lg sm:text-xl font-bold drop-shadow-sm leading-tight">
            {task.title} - Dia {task.day}
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            {task.platform && (
              <Badge 
                className={`text-white transition-colors shadow-sm ${getPlatformColor(task.platform)}`}
              >
                {task.platform}
              </Badge>
            )}
            {task.difficulty && (
              <Badge 
                className={`text-white transition-colors shadow-sm ${getDifficultyColor(task.difficulty)}`}
              >
                {task.difficulty}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-gray-700">
        <p className="mb-4 text-sm sm:text-lg leading-relaxed font-medium">
          {task.description}
        </p>
        <div className="flex items-center gap-4 text-xs sm:text-sm">
          {task.time && (
            <span className="flex items-center bg-gray-100 px-2 py-1 rounded-md">
              ⏱️ {task.time}
            </span>
          )}
          {task.completed && (
            <span className="text-green-600 bg-green-100 px-2 py-1 rounded-md font-medium">
              ✅ Concluído
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeekViewTaskDetails;
