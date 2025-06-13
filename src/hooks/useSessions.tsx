
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Session = Database['public']['Tables']['sessions']['Row'];

export const useSessions = (courseId?: string) => {
  const { data: sessions, isLoading, error } = useQuery({
    queryKey: ['sessions', courseId],
    queryFn: async () => {
      if (!courseId) {
        console.log('No course ID provided to useSessions');
        return [];
      }

      console.log('Fetching sessions for course:', courseId);
      
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('course_id', courseId)
        .order('session_date', { ascending: true });

      if (error) {
        console.error('Supabase error fetching sessions:', error);
        throw error;
      }
      
      console.log('Sessions fetched successfully:', data);
      return data as Session[];
    },
    enabled: !!courseId,
    retry: 2,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000,
  });

  return {
    sessions: sessions || [],
    isLoading,
    error,
  };
};
