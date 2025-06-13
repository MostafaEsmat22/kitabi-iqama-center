
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface CourseDetailsData {
  course: {
    id: string;
    title: string;
    description: string;
    instructor_id: string;
    start_date: string;
    end_date: string;
    duration_weeks: number;
    max_students: number;
    price: number;
    status: string;
    requirements: string[];
    syllabus: string;
    created_at: string;
    updated_at: string;
  };
  enrollment: {
    id: string;
    student_id: string;
    course_id: string;
    enrollment_date: string;
    status: string;
    completion_date: string | null;
    grade: number | null;
    notes: string | null;
  } | null;
  stats: {
    total_sessions: number;
    completed_sessions: number;
    total_assignments: number;
    due_assignments: number;
    total_students: number;
    approved_students: number;
  };
  instructor: {
    full_name: string;
    phone: string | null;
  } | null;
  progress: {
    attendance_rate: number;
    assignments_completed: number;
    assignments_total: number;
    average_score: number;
    sessions_attended: number;
    sessions_total: number;
  } | null;
}

export const useCourseDetails = (courseId: string) => {
  const { profile } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['course-details', courseId, profile?.id],
    queryFn: async () => {
      if (!courseId || !profile?.id) {
        throw new Error('Course ID or user ID is required');
      }

      console.log('Fetching course details for:', courseId, 'user:', profile.id);

      // جلب تفاصيل الدورة مع الإحصائيات
      const { data: courseData, error: courseError } = await supabase
        .rpc('get_course_details_with_stats', {
          course_uuid: courseId,
          user_uuid: profile.id
        });

      if (courseError) {
        console.error('Error fetching course details:', courseError);
        throw courseError;
      }

      if (courseData?.error) {
        throw new Error(courseData.error);
      }

      // جلب معلومات المدرب
      const { data: instructorData, error: instructorError } = await supabase
        .from('profiles')
        .select('full_name, phone')
        .eq('id', courseData.course.instructor_id)
        .single();

      if (instructorError) {
        console.error('Error fetching instructor data:', instructorError);
      }

      // جلب تقدم الطالب إذا كان مسجلاً
      let progressData = null;
      if (courseData.enrollment && profile.role === 'student') {
        const { data: progress, error: progressError } = await supabase
          .rpc('get_student_course_progress', {
            course_uuid: courseId,
            student_uuid: profile.id
          });

        if (progressError) {
          console.error('Error fetching progress data:', progressError);
        } else {
          progressData = progress;
        }
      }

      const result: CourseDetailsData = {
        course: courseData.course,
        enrollment: courseData.enrollment,
        stats: courseData.stats,
        instructor: instructorData,
        progress: progressData
      };

      console.log('Course details fetched successfully:', result);
      return result;
    },
    enabled: !!courseId && !!profile?.id,
    retry: 2,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    courseDetails: data,
    isLoading,
    error,
  };
};
