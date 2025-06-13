
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { toast } from 'sonner';

type Assignment = Database['public']['Tables']['assignments']['Row'];
type AssignmentSubmission = Database['public']['Tables']['assignment_submissions']['Row'];

export const useAssignments = (courseId?: string) => {
  const queryClient = useQueryClient();

  const { data: assignments, isLoading, error } = useQuery({
    queryKey: ['assignments', courseId],
    queryFn: async () => {
      if (!courseId) {
        console.log('No course ID provided to useAssignments');
        return [];
      }

      console.log('Fetching assignments for course:', courseId);
      
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('course_id', courseId)
        .order('due_date', { ascending: true });

      if (error) {
        console.error('Supabase error fetching assignments:', error);
        throw error;
      }
      
      console.log('Assignments fetched successfully:', data);
      return data as Assignment[];
    },
    enabled: !!courseId,
    retry: 2,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000,
  });

  const submitAssignmentMutation = useMutation({
    mutationFn: async ({ assignmentId, studentId, submissionText, attachments }: {
      assignmentId: string;
      studentId: string;
      submissionText?: string;
      attachments?: string[];
    }) => {
      const { data, error } = await supabase
        .from('assignment_submissions')
        .insert({
          assignment_id: assignmentId,
          student_id: studentId,
          submission_text: submissionText,
          attachments: attachments,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignment_submissions'] });
      toast.success('تم تسليم الواجب بنجاح');
    },
    onError: (error) => {
      console.error('Error submitting assignment:', error);
      toast.error('فشل في تسليم الواجب');
    },
  });

  return {
    assignments: assignments || [],
    isLoading,
    error,
    submitAssignment: submitAssignmentMutation.mutate,
    isSubmitting: submitAssignmentMutation.isPending,
  };
};
