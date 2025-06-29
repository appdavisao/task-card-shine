import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Trophy, Home, FileText, Calendar, LogOut } from 'lucide-react';
import { Case } from '@/components/ui/cases-with-infinite-scroll';
import { NavBar } from '@/components/ui/tubelight-navbar';
import ContentChatbot from '@/components/ContentChatbot';
import ContactIcons from '@/components/ContactIcons';

interface Profile {
  id: string;
  student_name: string;
  display_name: string;
  title?: string;
  subtitle?: string;
  archetype?: string;
  focus?: string;
  avatar_url?: string;
  email?: string;
  phone?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  website?: string;
  tiktok?: string;
  facebook?: string;
  location?: string;
}

interface DashboardData {
  colors?: Record<string, any>;
  platform_strategy?: Record<string, any>;
  scores?: Record<string, any>;
  profile_highlights?: Array<{
    icon: string;
    title: string;
    content: string;
  }>;
  motivation_quote?: string;
  strategy_text?: string;
  instructions_text?: string;
  context_text?: string;
  sample_activities?: Array<any>;
  key_data?: Record<string, any>;
}

interface Task {
  id: string;
  day: number;
  title: string;
  description?: string;
  time?: string;
  difficulty?: string;
  platform?: string;
  type?: string;
  completed: boolean;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetchUserData();
  }, [user, navigate]);

  const analyzeProfileHighlightsPatterns = async () => {
    try {
      console.log('=== ANALYZING PROFILE HIGHLIGHTS PATTERNS ===');
      
      // Fetch Andrea's data
      const { data: andreaProfiles } = await supabase
        .from('profiles')
        .select('*')
        .ilike('display_name', '%Andrea%');
      
      if (andreaProfiles && andreaProfiles.length > 0) {
        console.log('Andrea profiles found:', andreaProfiles);
        
        const { data: andreaDashboard } = await supabase
          .from('user_dashboard')
          .select('profile_highlights')
          .eq('user_id', andreaProfiles[0].user_id)
          .single();
        
        console.log('Andrea profile_highlights structure:', andreaDashboard?.profile_highlights);
        console.log('Andrea profile_highlights type:', typeof andreaDashboard?.profile_highlights);
        console.log('Andrea profile_highlights array check:', Array.isArray(andreaDashboard?.profile_highlights));
      }
      
      // Fetch Rolim's data
      const { data: rolimProfiles } = await supabase
        .from('profiles')
        .select('*')
        .ilike('display_name', '%Rolim%');
      
      if (rolimProfiles && rolimProfiles.length > 0) {
        console.log('Rolim profiles found:', rolimProfiles);
        
        const { data: rolimDashboard } = await supabase
          .from('user_dashboard')
          .select('profile_highlights')
          .eq('user_id', rolimProfiles[0].user_id)
          .single();
        
        console.log('Rolim profile_highlights structure:', rolimDashboard?.profile_highlights);
        console.log('Rolim profile_highlights type:', typeof rolimDashboard?.profile_highlights);
        console.log('Rolim profile_highlights array check:', Array.isArray(rolimDashboard?.profile_highlights));
      }
      
      // Compare with current user (Elisabete)
      console.log('=== CURRENT USER DATA COMPARISON ===');
      console.log('Current user ID:', user?.id);
      
    } catch (error) {
      console.error('Error analyzing patterns:', error);
    }
  };

  const parseProfileHighlights = (rawHighlights: any): Array<{icon: string; title: string; content: string}> => {
    console.log('Raw profile_highlights from database:', rawHighlights);
    console.log('Type of raw highlights:', typeof rawHighlights);
    console.log('Is array:', Array.isArray(rawHighlights));
    
    // If it's already in the correct format (array of objects with icon, title, content)
    if (Array.isArray(rawHighlights) && rawHighlights.length > 0) {
      const firstItem = rawHighlights[0];
      
      // Check if it's already in object format with icon, title, content
      if (typeof firstItem === 'object' && firstItem.icon && firstItem.title && firstItem.content) {
        console.log('Profile highlights already in correct format');
        // Limit to 4 cards to match Andrea and Rolim pattern
        return rawHighlights.slice(0, 4);
      }
      
      // If it's an array of strings, convert to structured format
      if (typeof firstItem === 'string') {
        console.log('Converting string array to structured format');
        return rawHighlights.slice(0, 4).map((item: string, index: number) => {
          const icons = ['🎯', '📋', '⚡', '💖'];
          const titles = [
            'Seu Objetivo Principal',
            'Sua Expertise', 
            'Seus Pontos Fortes',
            'Sua Motivação'
          ];
          
          return {
            icon: icons[index] || '✨',
            title: titles[index] || `Destaque ${index + 1}`,
            content: item
          };
        });
      }
      
      // If it's an array of objects but with different structure, try to adapt
      if (typeof firstItem === 'object') {
        console.log('Converting object array to structured format');
        return rawHighlights.slice(0, 4).map((item: any, index: number) => {
          // Handle different possible object structures
          const content = item.content || item.text || item.description || item.value || JSON.stringify(item);
          const title = item.title || item.name || item.label || `Destaque ${index + 1}`;
          const icon = item.icon || item.emoji || ['🎯', '📋', '⚡', '💖'][index] || '✨';
          
          return {
            icon,
            title,
            content
          };
        });
      }
    }
    
    console.log('Using default profile highlights');
    return [];
  };

  const fetchUserData = async () => {
    try {
      if (!user) return;

      console.log('Fetching data for user:', user.id);
      
      // First analyze patterns from other users
      await analyzeProfileHighlightsPatterns();

      // Fetch profile with new contact fields
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select(`
          *,
          email,
          phone,
          instagram,
          linkedin,
          youtube,
          website,
          tiktok,
          facebook,
          location
        `)
        .eq('user_id', user.id)
        .single();

      if (profileError) {
        console.error('Profile error:', profileError);
      } else {
        console.log('Profile data with contacts:', profileData);
        setProfile(profileData);
      }

      // Fetch dashboard data
      const { data: dashboardDataRaw, error: dashboardError } = await supabase
        .from('user_dashboard')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (dashboardError) {
        console.error('Dashboard error:', dashboardError);
        setDashboardData({});
      } else {
        console.log('Raw dashboard data:', dashboardDataRaw);
        
        // Parse the JSON data properly with enhanced profile highlights parsing
        const parsedDashboardData: DashboardData = {
          colors: dashboardDataRaw?.colors as Record<string, any> || {},
          platform_strategy: dashboardDataRaw?.platform_strategy as Record<string, any> || {},
          scores: dashboardDataRaw?.scores as Record<string, any> || {},
          profile_highlights: parseProfileHighlights(dashboardDataRaw?.profile_highlights),
          motivation_quote: dashboardDataRaw?.motivation_quote || '',
          strategy_text: dashboardDataRaw?.strategy_text || '',
          instructions_text: dashboardDataRaw?.instructions_text || '',
          context_text: dashboardDataRaw?.context_text || '',
          sample_activities: (dashboardDataRaw?.sample_activities as Array<any>) || [],
          key_data: dashboardDataRaw?.key_data as Record<string, any> || {}
        };
        
        console.log('Parsed dashboard data:', parsedDashboardData);
        setDashboardData(parsedDashboardData);
      }

      // Fetch tasks
      const { data: tasksData, error: tasksError } = await supabase
        .from('user_tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('day', { ascending: true });

      if (tasksError) {
        console.error('Tasks error:', tasksError);
      } else {
        console.log('Tasks data:', tasksData);
        setTasks(tasksData || []);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Error",
        description: "Failed to load user data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const getWeekProgress = (weekNumber: number) => {
    const weekTasks = tasks.filter(task => 
      task.day >= (weekNumber - 1) * 7 + 1 && task.day <= weekNumber * 7
    );
    const completedTasks = weekTasks.filter(task => task.completed).length;
    return weekTasks.length > 0 ? (completedTasks / weekTasks.length) * 100 : 0;
  };

  const getWeekActivitiesCount = (weekNumber: number) => {
    const weekTasks = tasks.filter(task => 
      task.day >= (weekNumber - 1) * 7 + 1 && task.day <= weekNumber * 7
    );
    return weekTasks.length;
  };

  const handleWeekClick = (week: number) => {
    navigate(`/week/${week}`);
  };

  // Default profile highlights when no data exists - standardized to 4 cards
  const defaultProfileHighlights = [
    {
      icon: "🎯",
      title: "Seu Objetivo Principal",
      content: "Adicionando dados do formulário..."
    },
    {
      icon: "📋",
      title: "Sua Expertise", 
      content: "Adicionando dados do formulário..."
    },
    {
      icon: "⚡",
      title: "Seus Pontos Fortes",
      content: "Adicionando dados do formulário..."
    },
    {
      icon: "💖",
      title: "Sua Motivação",
      content: "Adicionando dados do formulário..."
    }
  ];

  const getPersonalizedStrategyText = () => {
    // Priority 1: Use pre-built strategy_text
    if (dashboardData?.strategy_text) {
      return dashboardData.strategy_text;
    }
    
    // Priority 2: Combine context_text with key_data
    if (dashboardData?.context_text && dashboardData?.key_data) {
      return `Este plano considera ${dashboardData.context_text}`;
    }
    
    // Priority 3: Use context_text alone
    if (dashboardData?.context_text) {
      return `Este plano foi personalizado considerando ${dashboardData.context_text}`;
    }
    
    // Priority 4: Build from key_data fields
    const keyData = dashboardData?.key_data;
    if (keyData?.current_work && keyData?.legacy) {
      return `Este plano foi adaptado para sua evolução como ${keyData.current_work}, focando em ${keyData.legacy}`;
    }
    
    // Final fallback
    return "Este plano foi personalizado especificamente para seu crescimento digital e profissional.";
  };

  const handleActionPlanClick = () => {
    navigate('/action-plan');
  };

  const navItems = [
    { name: 'Semanas', url: '/week/1', icon: Calendar, action: () => navigate('/week/1') },
    { name: 'Plano', url: '/action-plan', icon: FileText, action: () => navigate('/action-plan') },
    { name: 'Ranking', url: '#', icon: Trophy, action: () => toast({ title: "Ranking", description: "Feature coming soon!" }) },
    { name: 'Sair', url: '#', icon: LogOut, action: handleSignOut },
  ];

  const chatbotContext = {
    page: 'dashboard',
    content_card: null
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-b-2 border-slate-400 mx-auto"></div>
          <p className="mt-4 text-slate-600 text-sm sm:text-base">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Use profile highlights from database or default ones - limit to 4 cards
  const profileHighlights = dashboardData?.profile_highlights && dashboardData.profile_highlights.length > 0 
    ? parseProfileHighlights(dashboardData.profile_highlights)
    : defaultProfileHighlights;

  console.log('Final profile highlights to render:', profileHighlights);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* New Tubelight Navbar */}
      <NavBar items={navItems} />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 pt-24 pb-20 sm:pb-8">
        {/* Profile Section with Enhanced Content */}
        <div className="mb-6 sm:mb-8">
          <Card className="bg-white shadow-sm border border-slate-200/60 rounded-2xl overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start space-x-4 sm:space-x-5">
                <Avatar className="h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 ring-1 ring-slate-200">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="text-lg sm:text-xl bg-slate-100 text-slate-600 font-medium">
                    {profile?.display_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-2 leading-tight">
                    {profile?.display_name || 'Usuário'}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                    {getPersonalizedStrategyText()}
                  </p>
                  <div className="flex items-center justify-between">
                    <Button 
                      className="bg-amber-600 hover:bg-amber-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center space-x-2 text-xs sm:text-sm font-medium shadow-sm border-0"
                      onClick={() => toast({ title: "Ranking", description: "Feature coming soon!" })}
                    >
                      <Trophy size={14} className="sm:w-4 sm:h-4" />
                      <span>1808 pts</span>
                    </Button>
                    
                    {/* Contact Icons - positioned in the bottom right area */}
                    <div className="ml-4">
                      <ContactIcons
                        email={profile?.email}
                        phone={profile?.phone}
                        instagram={profile?.instagram}
                        linkedin={profile?.linkedin}
                        youtube={profile?.youtube}
                        website={profile?.website}
                        tiktok={profile?.tiktok}
                        facebook={profile?.facebook}
                        location={profile?.location}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Highlights Grid - Standardized to 4 cards */}
        <div className="mb-8 sm:mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {profileHighlights.map((highlight, index) => (
              <Card key={index} className="bg-white shadow-sm border border-slate-200/60 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200">
                <CardContent className="p-5 sm:p-6">
                  <h3 className="font-medium text-slate-800 mb-3 flex items-center text-sm sm:text-base">
                    <span className="mr-3 text-lg">{highlight.icon}</span>
                    {highlight.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {highlight.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Plan Button */}
        <div className="mb-8 sm:mb-10">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/70 border border-blue-200/60 rounded-xl overflow-hidden">
            <CardContent className="p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 mr-4">
                  <h3 className="text-base sm:text-lg font-medium text-blue-900 mb-2 flex items-center">
                    <span className="mr-3">📖</span>
                    Plano de Ação Escritor Best-Seller
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
                    Responda 20 questões estratégicas e anexe documentos para pegar sua estrutura de livro Best-Seller validada.
                  </p>
                </div>
                <Button 
                  onClick={handleActionPlanClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center space-x-2 text-sm font-medium shadow-sm border-0 flex-shrink-0"
                >
                  <span>Começar</span>
                  <span>→</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Week Cards - Fixed Mobile Layout */}
        <div className="mb-8 sm:mb-10">
          <Card className="bg-gradient-to-br from-blue-50/30 to-blue-100/40 border border-blue-200/40 rounded-xl overflow-hidden">
            <CardContent className="p-4 sm:p-6 lg:p-7">
              <h3 className="text-lg sm:text-xl font-medium text-slate-800 mb-4 sm:mb-6 text-center sm:text-left">
                Idéias de Conteúdos
              </h3>
              
              {/* Mobile: Vertical Stack */}
              <div className="block sm:hidden space-y-3">
                {[1, 2, 3, 4, 5, 6, 7].map((week) => {
                  const activities = getWeekActivitiesCount(week);
                  const progress = getWeekProgress(week);
                  
                  return (
                    <div
                      key={week}
                      className="cursor-pointer bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm
                        transition-all duration-300 ease-out
                        hover:shadow-md hover:scale-[1.02] hover:border-slate-300
                        hover:bg-gradient-to-br hover:from-white hover:to-slate-50/50
                        active:scale-95"
                      onClick={() => handleWeekClick(week)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-xl font-semibold text-slate-700">
                          S{week}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                          {progress.toFixed(0)}% concluído
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-3 font-medium">
                        {activities} atividades
                      </p>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-slate-400 to-slate-500 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop: Grid Layout */}
              <div className="hidden sm:grid grid-cols-7 gap-3 sm:gap-4">
                {[1, 2, 3, 4, 5, 6, 7].map((week) => {
                  const activities = getWeekActivitiesCount(week);
                  const progress = getWeekProgress(week);
                  
                  return (
                    <div
                      key={week}
                      className="cursor-pointer bg-white border border-slate-200/60 rounded-xl p-3 sm:p-4 text-center shadow-sm
                        transition-all duration-300 ease-out
                        hover:shadow-md hover:scale-[1.02] hover:border-slate-300 hover:-translate-y-0.5
                        hover:bg-gradient-to-br hover:from-white hover:to-slate-50/50
                        active:scale-95"
                      onClick={() => handleWeekClick(week)}
                    >
                      <div className="text-xl sm:text-2xl font-semibold text-slate-700 mb-2 sm:mb-3">
                        S{week}
                      </div>
                      <p className="text-xs text-slate-500 mb-2 sm:mb-3 font-medium">
                        {activities} atividades
                      </p>
                      <div className="w-full h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden mb-2 sm:mb-3">
                        <div 
                          className="h-full bg-gradient-to-r from-slate-400 to-slate-500 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        {progress.toFixed(0)}% concluído
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Motivation Quote */}
        <div className="mb-8 sm:mb-10">
          <Card className="bg-gradient-to-br from-slate-50 to-slate-100/70 border border-slate-200/60 rounded-xl overflow-hidden">
            <CardContent className="p-6 sm:p-7">
              <blockquote className="text-sm sm:text-base italic text-slate-700 font-medium leading-relaxed">
                {dashboardData?.motivation_quote || `"${profile?.display_name?.split(' ')[0] || 'Usuário'}, sua jornada de transformação será a base para construir uma autoridade digital que impacta vidas." 💙`}
              </blockquote>
            </CardContent>
          </Card>
        </div>

        {/* How to Use Guide */}
        <div className="mb-8 sm:mb-10">
          <Card className="bg-white shadow-sm border border-slate-200/60 rounded-xl overflow-hidden">
            <CardContent className="p-6 sm:p-7">
              <h3 className="text-base sm:text-lg font-medium text-slate-800 mb-4 flex items-center">
                <span className="mr-3">💡</span>
                Como Usar Este Guia Personalizado
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {dashboardData?.instructions_text || "Adicionando dados do formulário..."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <div className="mb-8 sm:mb-10">
          <Card className="bg-white shadow-sm border border-slate-200/60 rounded-xl overflow-hidden">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg font-medium text-slate-800">Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between text-xs sm:text-sm text-slate-600">
                  <span>Tasks Completed</span>
                  <span className="font-medium text-slate-800">{completedTasks} of {totalTasks}</span>
                </div>
                <Progress value={progressPercentage} className="h-2 sm:h-2.5 bg-slate-100" />
                <p className="text-xs sm:text-sm text-slate-600">
                  {progressPercentage.toFixed(0)}% complete
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content Chatbot */}
      <ContentChatbot context={chatbotContext} />
    </div>
  );
};

export default Dashboard;
