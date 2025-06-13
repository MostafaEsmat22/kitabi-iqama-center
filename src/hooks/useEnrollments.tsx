
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { toast } from 'sonner';

type Enrollment = Database['public']['Tables']['enrollments']['Row'] & {
  course: Database['public']['Tables']['courses']['Row'] & {
    instructor: { full_name: string } | null;
  } | null;
};

export const useEnrollments = (studentId?: string) => {
  const queryClient = useQueryClient();

  const { data: enrollments, isLoading, error } = useQuery({
    queryKey: ['enrollments', studentId],
    queryFn: async () => {
      if (!studentId) {
        console.log('No student ID provided to useEnrollments');
        return [];
      }

      console.log('Fetching enrollments for student:', studentId);
      
      try {
        const { data, error } = await supabase
          .from('enrollments')
          .select(`
            *,
            course:courses(
              *,
              instructor:profiles!courses_instructor_id_fkey(full_name)
            )
          `)
          .eq('student_id', studentId)
          .order('enrollment_date', { ascending: false });

        if (error) {
          console.error('Supabase error fetching enrollments:', error);
          throw error;
        }
        
        console.log('Enrollments fetched successfully:', data);
        return data as Enrollment[];
      } catch (err) {
        console.error('Error in useEnrollments queryFn:', err);
        throw err;
      }
    },
    enabled: !!studentId,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const enrollInCourseMutation = useMutation({
    mutationFn: async ({ courseId, studentId }: { courseId: string; studentId: string }) => {
      const { data, error } = await supabase
        .from('enrollments')
        .insert({
          course_id: courseId,
          student_id: studentId,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      toast.success('تم التسجيل في الدورة بنجاح، في انتظار الموافقة');
    },
    onError: (error) => {
      console.error('Error enrolling in course:', error);
      toast.error('فشل في التسجيل في الدورة');
    },
  });

  if (error) {
    console.error('useEnrollments hook error:', error);
  }

  return {
    enrollments: enrollments || [],
    isLoading,
    error,
    enrollInCourse: enrollInCourseMutation.mutate,
    isEnrolling: enrollInCourseMutation.isPending,
  };
};
