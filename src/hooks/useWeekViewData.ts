
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Task, DailyContent } from '@/types/weekView';

export const useWeekViewData = (weekNumber: string) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWeekTasks = async () => {
    try {
      if (!user || !weekNumber) return;

      const week = parseInt(weekNumber);
      const startDay = (week - 1) * 7 + 1;
      const endDay = week * 7;

      console.log(`Fetching tasks for week ${week}, days ${startDay}-${endDay}`);

      const { data: tasksData, error } = await supabase
        .from('user_tasks')
        .select('*')
        .eq('user_id', user.id)
        .gte('day', startDay)
        .lte('day', endDay)
        .order('day', { ascending: true });

      if (error) {
        console.error('Tasks error:', error);
      } else {
        console.log('Fetched tasks:', tasksData);
        setTasks(tasksData || []);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDailyContent = async (day: number): Promise<DailyContent | null> => {
    try {
      console.log('Fetching daily content for day:', day);
      
      const { data, error: fetchError } = await supabase
        .from('user_daily_content')
        .select('*')
        .eq('user_id', user!.id)
        .eq('day', day)
        .single();

      if (fetchError) {
        console.error('Error fetching daily content:', fetchError);
        return null;
      } else {
        console.log('Raw daily content data:', data);
        console.log('Content card data:', data.content_card);
        
        // Debug specific fields that should be present
        if (data.content_card) {
          console.log('Content card how_to_structure:', data.content_card.how_to_structure);
          console.log('Content card video_structure:', data.content_card.video_structure);
          console.log('Content card viral_tips:', data.content_card.viral_tips);
          console.log('Content card examples:', data.content_card.examples);
          console.log('Content card engagement_benefits:', data.content_card.engagement_benefits);
        }
        
        const dailyContent: DailyContent = {
          id: data.id,
          day: data.day,
          content_type: data.content_type,
          title: data.title,
          content_card: data.content_card ? (data.content_card as any) : undefined
        };
        
        console.log('Processed daily content:', dailyContent);
        return dailyContent;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  useEffect(() => {
    if (user) {
      fetchWeekTasks();
    }
  }, [user, weekNumber]);

  return {
    tasks,
    loading,
    fetchDailyContent
  };
};
