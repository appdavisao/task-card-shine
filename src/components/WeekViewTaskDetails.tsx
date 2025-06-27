
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types/weekView';
import { BookOpen, CheckCircle } from 'lucide-react';

interface WeekViewTaskDetailsProps {
  task: Task;
}

const WeekViewTaskDetails = ({ task }: WeekViewTaskDetailsProps) => {
  return (
    <Card className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 border-slate-200/60 shadow-elevated rounded-2xl overflow-hidden">
      <CardHeader className="pb-4 sm:pb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <CardTitle className="text-white text-xl sm:text-2xl font-bold leading-tight flex items-center">
            <BookOpen className="h-6 w-6 mr-3 flex-shrink-0" />
            <span>Dia {task.day}</span>
          </CardTitle>
          <div className="flex gap-3 flex-wrap">
            {task.completed && (
              <Badge className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-4 py-2 rounded-full shadow-sm flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Concluído
              </Badge>
            )}
            <Badge className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-4 py-2 rounded-full shadow-sm">
              Escrita de Livro
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 sm:p-8">
        {/* Task Title */}
        <div className="mb-6">
          <h3 className="text-slate-900 text-lg sm:text-xl font-bold mb-3 leading-tight">
            {task.title}
          </h3>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
        </div>

        {/* Task Description */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-slate-200/60 shadow-sm mb-6">
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-medium">
            {task.description}
          </p>
        </div>

        {/* Completion Status */}
        {task.completed && (
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/60 p-4 rounded-xl">
            <div className="flex items-center gap-3 text-emerald-700">
              <div className="h-8 w-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-base">Tarefa concluída com sucesso!</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeekViewTaskDetails;
