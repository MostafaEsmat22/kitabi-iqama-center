
-- إضافة RLS Policies للجداول المفقودة وتحسين الموجودة

-- تحسين سياسات الدورات
DROP POLICY IF EXISTS "Everyone can view active courses" ON public.courses;
DROP POLICY IF EXISTS "Teachers can manage their courses" ON public.courses;
DROP POLICY IF EXISTS "Admins can manage all courses" ON public.courses;

CREATE POLICY "Authenticated users can view active courses" ON public.courses
  FOR SELECT TO authenticated USING (status = 'active');

CREATE POLICY "Teachers can view their courses" ON public.courses
  FOR SELECT TO authenticated USING (instructor_id = auth.uid() OR status = 'active');

CREATE POLICY "Teachers can create courses" ON public.courses
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Teachers can update their courses" ON public.courses
  FOR UPDATE TO authenticated USING (instructor_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all courses" ON public.courses
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- إضافة سياسات للتسجيل في الدورات
DROP POLICY IF EXISTS "Students can view their enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Students can create enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Teachers can view course enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Admins can manage all enrollments" ON public.enrollments;

CREATE POLICY "Students can view their enrollments" ON public.enrollments
  FOR SELECT TO authenticated USING (student_id = auth.uid());

CREATE POLICY "Students can create enrollments" ON public.enrollments
  FOR INSERT TO authenticated WITH CHECK (student_id = auth.uid() AND public.has_role(auth.uid(), 'student'));

CREATE POLICY "Teachers can view course enrollments" ON public.enrollments
  FOR SELECT TO authenticated USING (
    EXISTS(SELECT 1 FROM public.courses WHERE id = course_id AND instructor_id = auth.uid())
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Teachers can update enrollments" ON public.enrollments
  FOR UPDATE TO authenticated USING (
    EXISTS(SELECT 1 FROM public.courses WHERE id = course_id AND instructor_id = auth.uid())
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can manage all enrollments" ON public.enrollments
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- إضافة سياسات للجلسات
DROP POLICY IF EXISTS "Enrolled students can view sessions" ON public.sessions;
DROP POLICY IF EXISTS "Teachers can manage course sessions" ON public.sessions;

CREATE POLICY "Enrolled students can view sessions" ON public.sessions
  FOR SELECT TO authenticated USING (
    EXISTS(
      SELECT 1 FROM public.enrollments 
      WHERE course_id = sessions.course_id 
      AND student_id = auth.uid() 
      AND status = 'approved'
    )
    OR EXISTS(
      SELECT 1 FROM public.courses 
      WHERE id = sessions.course_id 
      AND instructor_id = auth.uid()
    )
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Teachers can create sessions" ON public.sessions
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS(SELECT 1 FROM public.courses WHERE id = course_id AND instructor_id = auth.uid())
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Teachers can update sessions" ON public.sessions
  FOR UPDATE TO authenticated USING (
    EXISTS(SELECT 1 FROM public.courses WHERE id = course_id AND instructor_id = auth.uid())
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Teachers can delete sessions" ON public.sessions
  FOR DELETE TO authenticated USING (
    EXISTS(SELECT 1 FROM public.courses WHERE id = course_id AND instructor_id = auth.uid())
    OR public.has_role(auth.uid(), 'admin')
  );

-- إضافة سياسات للواجبات
DROP POLICY IF EXISTS "Enrolled students can view assignments" ON public.assignments;
DROP POLICY IF EXISTS "Teachers can manage course assignments" ON public.assignments;

CREATE POLICY "Enrolled students can view assignments" ON public.assignments
  FOR SELECT TO authenticated USING (
    EXISTS(
      SELECT 1 FROM public.enrollments 
      WHERE course_id = assignments.course_id 
      AND student_id = auth.uid() 
      AND status = 'approved'
    )
    OR EXISTS(
      SELECT 1 FROM public.courses 
      WHERE id = assignments.course_id 
      AND instructor_id = auth.uid()
    )
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Teachers can create assignments" ON public.assignments
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS(SELECT 1 FROM public.courses WHERE id = course_id AND instructor_id = auth.uid())
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Teachers can update assignments" ON public.assignments
  FOR UPDATE TO authenticated USING (
    EXISTS(SELECT 1 FROM public.courses WHERE id = course_id AND instructor_id = auth.uid())
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Teachers can delete assignments" ON public.assignments
  FOR DELETE TO authenticated USING (
    EXISTS(SELECT 1 FROM public.courses WHERE id = course_id AND instructor_id = auth.uid())
    OR public.has_role(auth.uid(), 'admin')
  );

-- إضافة سياسات لتسليم الواجبات
DROP POLICY IF EXISTS "Students can manage their submissions" ON public.assignment_submissions;
DROP POLICY IF EXISTS "Teachers can view course submissions" ON public.assignment_submissions;

CREATE POLICY "Students can view their submissions" ON public.assignment_submissions
  FOR SELECT TO authenticated USING (student_id = auth.uid());

CREATE POLICY "Students can create submissions" ON public.assignment_submissions
  FOR INSERT TO authenticated WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update their submissions" ON public.assignment_submissions
  FOR UPDATE TO authenticated USING (student_id = auth.uid() AND graded_at IS NULL);

CREATE POLICY "Teachers can view course submissions" ON public.assignment_submissions
  FOR SELECT TO authenticated USING (
    EXISTS(
      SELECT 1 FROM public.assignments a
      JOIN public.courses c ON a.course_id = c.id
      WHERE a.id = assignment_id 
      AND (c.instructor_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
    )
  );

CREATE POLICY "Teachers can grade submissions" ON public.assignment_submissions
  FOR UPDATE TO authenticated USING (
    EXISTS(
      SELECT 1 FROM public.assignments a
      JOIN public.courses c ON a.course_id = c.id
      WHERE a.id = assignment_id 
      AND (c.instructor_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
    )
  );

-- إضافة سياسات للحضور
DROP POLICY IF EXISTS "Students can view their attendance" ON public.attendance;
DROP POLICY IF EXISTS "Teachers can manage attendance" ON public.attendance;

CREATE POLICY "Students can view their attendance" ON public.attendance
  FOR SELECT TO authenticated USING (student_id = auth.uid());

CREATE POLICY "Teachers can manage attendance" ON public.attendance
  FOR ALL TO authenticated USING (
    EXISTS(
      SELECT 1 FROM public.sessions s
      JOIN public.courses c ON s.course_id = c.id
      WHERE s.id = session_id 
      AND (c.instructor_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
    )
  );

-- إضافة indexes لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_courses_instructor_id ON public.courses(instructor_id);
CREATE INDEX IF NOT EXISTS idx_courses_status ON public.courses(status);
CREATE INDEX IF NOT EXISTS idx_enrollments_student_course ON public.enrollments(student_id, course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON public.enrollments(status);
CREATE INDEX IF NOT EXISTS idx_sessions_course_date ON public.sessions(course_id, session_date);
CREATE INDEX IF NOT EXISTS idx_assignments_course_due ON public.assignments(course_id, due_date);
CREATE INDEX IF NOT EXISTS idx_assignment_submissions_assignment_student ON public.assignment_submissions(assignment_id, student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_session_student ON public.attendance(session_id, student_id);

-- إضافة وظيفة للحصول على تفاصيل الدورة مع إحصائيات
CREATE OR REPLACE FUNCTION public.get_course_details_with_stats(course_uuid UUID, user_uuid UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
  course_record RECORD;
  enrollment_record RECORD;
  stats_record RECORD;
BEGIN
  -- جلب تفاصيل الدورة
  SELECT * INTO course_record
  FROM public.courses 
  WHERE id = course_uuid;
  
  IF NOT FOUND THEN
    RETURN json_build_object('error', 'Course not found');
  END IF;
  
  -- جلب تفاصيل التسجيل إذا كان المستخدم طالب
  SELECT * INTO enrollment_record
  FROM public.enrollments 
  WHERE course_id = course_uuid AND student_id = user_uuid;
  
  -- جلب الإحصائيات
  SELECT 
    COUNT(DISTINCT s.id) as total_sessions,
    COUNT(DISTINCT CASE WHEN s.session_date <= NOW() THEN s.id END) as completed_sessions,
    COUNT(DISTINCT a.id) as total_assignments,
    COUNT(DISTINCT CASE WHEN a.due_date <= NOW() THEN a.id END) as due_assignments,
    COUNT(DISTINCT e.id) as total_students,
    COUNT(DISTINCT CASE WHEN e.status = 'approved' THEN e.id END) as approved_students
  INTO stats_record
  FROM public.courses c
  LEFT JOIN public.sessions s ON c.id = s.course_id
  LEFT JOIN public.assignments a ON c.id = a.course_id
  LEFT JOIN public.enrollments e ON c.id = e.course_id
  WHERE c.id = course_uuid;
  
  -- بناء النتيجة
  SELECT json_build_object(
    'course', row_to_json(course_record),
    'enrollment', row_to_json(enrollment_record),
    'stats', row_to_json(stats_record)
  ) INTO result;
  
  RETURN result;
END;
$$;

-- إضافة وظيفة للحصول على تقدم الطالب في دورة محددة
CREATE OR REPLACE FUNCTION public.get_student_course_progress(course_uuid UUID, student_uuid UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'attendance_rate', COALESCE(
      ROUND(
        (COUNT(DISTINCT CASE WHEN att.status = 'present' THEN att.session_id END)::DECIMAL / 
         NULLIF(COUNT(DISTINCT s.id), 0)) * 100, 2
      ), 0
    ),
    'assignments_completed', COUNT(DISTINCT sub.assignment_id),
    'assignments_total', COUNT(DISTINCT a.id),
    'average_score', COALESCE(ROUND(AVG(sub.score), 2), 0),
    'sessions_attended', COUNT(DISTINCT CASE WHEN att.status = 'present' THEN att.session_id END),
    'sessions_total', COUNT(DISTINCT s.id)
  ) INTO result
  FROM public.courses c
  LEFT JOIN public.sessions s ON c.id = s.course_id
  LEFT JOIN public.assignments a ON c.id = a.course_id
  LEFT JOIN public.attendance att ON s.id = att.session_id AND att.student_id = student_uuid
  LEFT JOIN public.assignment_submissions sub ON a.id = sub.assignment_id AND sub.student_id = student_uuid
  WHERE c.id = course_uuid;
  
  RETURN result;
END;
$$;
