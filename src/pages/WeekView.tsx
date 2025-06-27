
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Calendar, FileText, Trophy, LogOut, ArrowLeft } from 'lucide-react';
import { Task, DailyContent } from '@/types/weekView';
import { useWeekViewData } from '@/hooks/useWeekViewData';
import WeekViewDayCard from '@/components/WeekViewDayCard';
import WeekViewTaskDetails from '@/components/WeekViewTaskDetails';
import WeekViewContentTip from '@/components/WeekViewContentTip';
import ContentChatbot from '@/components/ContentChatbot';
import { NavBar } from '@/components/ui/tubelight-navbar';
import { toast } from '@/components/ui/use-toast';
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern';
import { cn } from '@/lib/utils';

const WeekView = () => {
  const { weekNumber } = useParams();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [contentTipOpen, setContentTipOpen] = useState(false);
  const [dailyContent, setDailyContent] = useState<DailyContent | null>(null);
  const [contentLoading, setContentLoading] = useState(false);
  const [expandedExamples, setExpandedExamples] = useState(false);
  const [dailyContentList, setDailyContentList] = useState<DailyContent[]>([]);

  const { tasks, loading, fetchDailyContent } = useWeekViewData(weekNumber || '1');

  // Route protection - redirect if trying to access weeks 2-5
  useEffect(() => {
    const week = parseInt(weekNumber || '1');
    if (week >= 2 && week <= 5) {
      toast({
        title: "Acesso Restrito",
        description: "Esta semana estará disponível em breve!",
        variant: "destructive"
      });
      navigate('/dashboard');
    }
  }, [weekNumber, navigate]);

  // Fetch all daily content for the week
  useEffect(() => {
    const fetchAllDailyContent = async () => {
      if (!user) return;
      
      const week = parseInt(weekNumber || '1');
      const weekDays = Array.from({ length: 7 }, (_, i) => (week - 1) * 7 + i + 1);
      
      const contentPromises = weekDays.map(async (day) => {
        try {
          const content = await fetchDailyContent(day);
          return content;
        } catch (error) {
          console.error(`Error fetching content for day ${day}:`, error);
          return null;
        }
      });

      const contents = await Promise.all(contentPromises);
      setDailyContentList(contents.filter(content => content !== null) as DailyContent[]);
    };

    if (user) {
      fetchAllDailyContent();
    }
  }, [user, weekNumber, fetchDailyContent]);

  const handleDaySelect = async (day: number) => {
    // Don't allow selection of locked days
    if (day > 20) return;
    
    setSelectedDay(day);
    
    // Fetch daily content for selected day
    if (day <= 7) { // Only fetch social media content for days 1-7
      setContentLoading(true);
      try {
        const content = await fetchDailyContent(day);
        setDailyContent(content);
        console.log('Daily content loaded for day', day, ':', content);
      } catch (error) {
        console.error('Error fetching daily content:', error);
        setDailyContent(null);
      } finally {
        setContentLoading(false);
      }
    } else {
      setDailyContent(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const navItems = [
    { name: 'Dashboard', url: '/dashboard', icon: Calendar, action: () => navigate('/dashboard') },
    { name: 'Plano', url: '/action-plan', icon: FileText, action: () => navigate('/action-plan') },
    { name: 'Ranking', url: '#', icon: Trophy, action: () => toast({ title: "Ranking", description: "Feature coming soon!" }) },
    { name: 'Sair', url: '#', icon: LogOut, action: handleSignOut },
  ];

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

  // Build chatbot context
  const chatbotContext = {
    page: 'week-view',
    day: selectedDay || undefined,
    content_card: dailyContent?.content_card || undefined
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Animated Grid Background */}
      <AnimatedGridPattern
        numSquares={15}
        maxOpacity={0.04}
        duration={8}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] fill-slate-200/30 stroke-slate-200/30",
        )}
      />
      
      <NavBar items={navItems} />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8 pt-24 pb-20 sm:pb-8 relative z-10">
        <div className="mb-6 sm:mb-8">
          <Card className="bg-white/80 backdrop-blur-sm shadow-sm border border-slate-200/60 rounded-xl overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                    Semana {weekNumber} - Modelos de Conteúdo
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base font-medium">
                    Clique em um dia para ver os detalhes do modelo de conteúdo.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleSignOut}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          {/* Left Sidebar - Days */}
          <div className="w-full lg:w-80 order-2 lg:order-1">
            <div className="space-y-3">
              {weekDays.map((day) => {
                // Use daily content instead of tasks for the card display
                const dayContent = dailyContentList.find(content => content.day === day);
                const isSelected = selectedDay === day;
                
                // Create a fake task object using daily content data
                const displayTask = dayContent ? {
                  id: dayContent.id,  
                  day: dayContent.day,
                  title: dayContent.title,
                  description: dayContent.content_card?.format || 'Modelo de Conteúdo',
                  completed: false,
                  user_id: user.id,
                  created_at: dayContent.created_at || new Date().toISOString(),
                  updated_at: dayContent.updated_at || new Date().toISOString()
                } : undefined;
                
                return (
                  <WeekViewDayCard
                    key={day}
                    day={day}
                    task={displayTask}
                    isSelected={isSelected}
                    onSelect={handleDaySelect}
                  />
                );
              })}
            </div>
          </div>

          {/* Right Content - Task Details */}
          <div className="flex-1 order-1 lg:order-2 space-y-4">
            {selectedDay && dailyContent ? (
              <>
                {/* Create a task object from daily content for display */}
                <WeekViewTaskDetails task={{
                  id: dailyContent.id,
                  day: dailyContent.day,
                  title: dailyContent.title,
                  description: dailyContent.content_card?.format || 'Modelo de Conteúdo',
                  completed: false,
                  user_id: user.id,
                  created_at: dailyContent.created_at || new Date().toISOString(),
                  updated_at: dailyContent.updated_at || new Date().toISOString()
                }} />
                
                {/* Social Media Content Tip - Only show for days 1-7 */}
                {selectedDay && selectedDay <= 7 && (
                  <WeekViewContentTip
                    contentTipOpen={contentTipOpen}
                    onContentTipToggle={setContentTipOpen}
                    selectedDay={selectedDay}
                    dailyContent={dailyContent}
                    contentLoading={contentLoading}
                    expandedExamples={expandedExamples}
                    onExpandExamples={setExpandedExamples}
                  />
                )}
              </>
            ) : (
              <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-sm border border-slate-200/60 rounded-xl overflow-hidden">
                <CardContent className="p-8 sm:p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Lightbulb className="h-12 w-12 sm:h-16 sm:w-16 mx-auto opacity-50" />
                  </div>
                  <p className="text-gray-600 text-base sm:text-lg font-medium">
                    Selecione um dia para ver os detalhes do modelo de conteúdo
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Content Chatbot */}
      <ContentChatbot context={chatbotContext} />
    </div>
  );
};

export default WeekView;
