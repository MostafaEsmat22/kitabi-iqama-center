
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { toast } from 'sonner';

type Course = Database['public']['Tables']['courses']['Row'] & {
  instructor: { full_name: string } | null;
};
type CourseInsert = Database['public']['Tables']['courses']['Insert'];

export const useCourses = () => {
  const queryClient = useQueryClient();

  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          instructor:profiles!courses_instructor_id_fkey(full_name)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Course[];
    },
  });

  const createCourseMutation = useMutation({
    mutationFn: async (courseData: CourseInsert) => {
      const { data, error } = await supabase
        .from('courses')
        .insert(courseData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('تم إنشاء الدورة بنجاح');
    },
    onError: (error) => {
      console.error('Error creating course:', error);
      toast.error('فشل في إنشاء الدورة');
    },
  });

  return {
    courses,
    isLoading,
    createCourse: createCourseMutation.mutate,
    isCreating: createCourseMutation.isPending,
  };
};
