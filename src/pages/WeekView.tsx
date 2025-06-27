
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { Task, DailyContent } from '@/types/weekView';
import { useWeekViewData } from '@/hooks/useWeekViewData';
import WeekViewHeader from '@/components/WeekViewHeader';
import WeekViewDayCard from '@/components/WeekViewDayCard';
import WeekViewTaskDetails from '@/components/WeekViewTaskDetails';
import WeekViewContentTip from '@/components/WeekViewContentTip';

const WeekView = () => {
  const { weekNumber } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [contentTipOpen, setContentTipOpen] = useState(false);
  const [dailyContent, setDailyContent] = useState<DailyContent | null>(null);
  const [contentLoading, setContentLoading] = useState(false);
  const [expandedExamples, setExpandedExamples] = useState(false);

  const { tasks, loading, fetchDailyContent } = useWeekViewData(weekNumber || '1');

  const handleDaySelect = async (day: number) => {
    setSelectedDay(day);
    // Always fetch content when a day is selected
    setContentLoading(true);
    const content = await fetchDailyContent(day);
    setDailyContent(content);
    setContentLoading(false);
  };

  const handleContentTipToggle = async (open: boolean) => {
    setContentTipOpen(open);
    if (open && selectedDay && !dailyContent) {
      setContentLoading(true);
      const content = await fetchDailyContent(selectedDay);
      setDailyContent(content);
      setContentLoading(false);
    }
  };

  const handleContentTip = async (day: number) => {
    // Select the day and show content inline
    setSelectedDay(day);
    setContentLoading(true);
    const content = await fetchDailyContent(day);
    setDailyContent(content);
    setContentLoading(false);
    setContentTipOpen(true);
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  const selectedTask = selectedDay ? tasks.find(task => task.day === selectedDay) : null;
  const week = parseInt(weekNumber || '1');
  const weekDays = Array.from({ length: 7 }, (_, i) => (week - 1) * 7 + i + 1);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">Carregando atividades da semana...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <WeekViewHeader weekNumber={weekNumber || '1'} />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        <p className="text-gray-600 mb-4 sm:mb-8 text-sm sm:text-base font-medium text-center sm:text-left">
          Passe o mouse sobre uma carta para ver o resumo. Clique para ver a atividade completa.
        </p>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          {/* Left Sidebar - Days */}
          <div className="w-full lg:w-80 order-2 lg:order-1">
            <div className="space-y-3">
              {weekDays.map((day) => {
                const task = tasks.find(t => t.day === day);
                const isSelected = selectedDay === day;
                
                return (
                  <WeekViewDayCard
                    key={day}
                    day={day}
                    task={task}
                    isSelected={isSelected}
                    onSelect={handleDaySelect}
                    onContentTip={handleContentTip}
                  />
                );
              })}
            </div>
          </div>

          {/* Right Content - Task Details */}
          <div className="flex-1 order-1 lg:order-2 space-y-4">
            {selectedTask ? (
              <>
                <WeekViewTaskDetails task={selectedTask} />
                <WeekViewContentTip
                  contentTipOpen={contentTipOpen}
                  onContentTipToggle={handleContentTipToggle}
                  selectedDay={selectedTask.day}
                  dailyContent={dailyContent}
                  contentLoading={contentLoading}
                  expandedExamples={expandedExamples}
                  onExpandExamples={setExpandedExamples}
                />
              </>
            ) : (
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardContent className="p-8 sm:p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Lightbulb className="h-12 w-12 sm:h-16 sm:w-16 mx-auto opacity-50" />
                  </div>
                  <p className="text-gray-600 text-base sm:text-lg font-medium">
                    Selecione um dia para ver os detalhes da atividade
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekView;
