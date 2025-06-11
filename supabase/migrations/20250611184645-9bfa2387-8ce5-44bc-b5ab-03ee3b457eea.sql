
-- إنشاء enum للأدوار
CREATE TYPE public.user_role AS ENUM ('admin', 'teacher', 'student');

-- إنشاء enum لحالة الدورة
CREATE TYPE public.course_status AS ENUM ('active', 'completed', 'cancelled');

-- إنشاء enum لحالة التسجيل في الدورة
CREATE TYPE public.enrollment_status AS ENUM ('pending', 'approved', 'rejected', 'completed');

-- إنشاء enum لنوع المعاملة المالية
CREATE TYPE public.transaction_type AS ENUM ('payment', 'refund', 'scholarship');

-- إنشاء enum لحالة المعاملة المالية
CREATE TYPE public.transaction_status AS ENUM ('pending', 'completed', 'failed');

-- إنشاء enum لحالة الحضور
CREATE TYPE public.attendance_status AS ENUM ('present', 'absent', 'late');

-- جدول الملفات الشخصية للمستخدمين
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  date_of_birth DATE,
  address TEXT,
  role user_role NOT NULL DEFAULT 'student',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الدورات
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  instructor_id UUID REFERENCES public.profiles(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  duration_weeks INTEGER NOT NULL,
  max_students INTEGER DEFAULT 30,
  price DECIMAL(10,2) DEFAULT 0,
  status course_status DEFAULT 'active',
  requirements TEXT[],
  syllabus TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول التسجيل في الدورات
CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status enrollment_status DEFAULT 'pending',
  completion_date TIMESTAMP WITH TIME ZONE,
  grade DECIMAL(5,2),
  notes TEXT,
  UNIQUE(student_id, course_id)
);

-- جدول الجلسات
CREATE TABLE public.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  session_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  meeting_link TEXT,
  recording_link TEXT,
  materials TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الحضور
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status attendance_status DEFAULT 'absent',
  attended_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  UNIQUE(session_id, student_id)
);

-- جدول المهام والواجبات
CREATE TABLE public.assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  max_score DECIMAL(5,2) DEFAULT 100,
  instructions TEXT,
  attachments TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول تسليم المهام
CREATE TABLE public.assignment_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  submission_text TEXT,
  attachments TEXT[],
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  score DECIMAL(5,2),
  feedback TEXT,
  graded_at TIMESTAMP WITH TIME ZONE,
  graded_by UUID REFERENCES public.profiles(id),
  UNIQUE(assignment_id, student_id)
);

-- جدول المعاملات المالية
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id),
  amount DECIMAL(10,2) NOT NULL,
  type transaction_type NOT NULL,
  status transaction_status DEFAULT 'pending',
  payment_method TEXT,
  transaction_reference TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- جدول الرسائل
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  parent_message_id UUID REFERENCES public.messages(id),
  attachments TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الإشعارات
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الشهادات
CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  certificate_number TEXT UNIQUE NOT NULL,
  issued_date DATE DEFAULT CURRENT_DATE,
  grade DECIMAL(5,2),
  certificate_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- تفعيل RLS على جميع الجداول
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- وظيفة للتحقق من الأدوار
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = _user_id AND role = _role
  )
$$;

-- سياسات RLS للملفات الشخصية
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- سياسات RLS للدورات
CREATE POLICY "Everyone can view active courses" ON public.courses
  FOR SELECT USING (status = 'active');

CREATE POLICY "Teachers can manage their courses" ON public.courses
  FOR ALL USING (instructor_id = auth.uid());

CREATE POLICY "Admins can manage all courses" ON public.courses
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- سياسات RLS للتسجيل في الدورات
CREATE POLICY "Students can view their enrollments" ON public.enrollments
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can create enrollments" ON public.enrollments
  FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Teachers can view course enrollments" ON public.enrollments
  FOR SELECT USING (EXISTS(
    SELECT 1 FROM public.courses 
    WHERE id = course_id AND instructor_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all enrollments" ON public.enrollments
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- سياسات RLS للجلسات
CREATE POLICY "Enrolled students can view sessions" ON public.sessions
  FOR SELECT USING (EXISTS(
    SELECT 1 FROM public.enrollments 
    WHERE course_id = sessions.course_id AND student_id = auth.uid()
  ));

CREATE POLICY "Teachers can manage course sessions" ON public.sessions
  FOR ALL USING (EXISTS(
    SELECT 1 FROM public.courses 
    WHERE id = course_id AND instructor_id = auth.uid()
  ));

-- سياسات RLS للحضور
CREATE POLICY "Students can view their attendance" ON public.attendance
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Teachers can manage attendance" ON public.attendance
  FOR ALL USING (EXISTS(
    SELECT 1 FROM public.sessions s
    JOIN public.courses c ON s.course_id = c.id
    WHERE s.id = session_id AND c.instructor_id = auth.uid()
  ));

-- سياسات RLS للمهام
CREATE POLICY "Enrolled students can view assignments" ON public.assignments
  FOR SELECT USING (EXISTS(
    SELECT 1 FROM public.enrollments 
    WHERE course_id = assignments.course_id AND student_id = auth.uid()
  ));

CREATE POLICY "Teachers can manage course assignments" ON public.assignments
  FOR ALL USING (EXISTS(
    SELECT 1 FROM public.courses 
    WHERE id = course_id AND instructor_id = auth.uid()
  ));

-- سياسات RLS لتسليم المهام
CREATE POLICY "Students can manage their submissions" ON public.assignment_submissions
  FOR ALL USING (student_id = auth.uid());

CREATE POLICY "Teachers can view course submissions" ON public.assignment_submissions
  FOR SELECT USING (EXISTS(
    SELECT 1 FROM public.assignments a
    JOIN public.courses c ON a.course_id = c.id
    WHERE a.id = assignment_id AND c.instructor_id = auth.uid()
  ));

-- سياسات RLS للمعاملات المالية
CREATE POLICY "Users can view their transactions" ON public.transactions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can view all transactions" ON public.transactions
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- سياسات RLS للرسائل
CREATE POLICY "Users can view their messages" ON public.messages
  FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can update their received messages" ON public.messages
  FOR UPDATE USING (receiver_id = auth.uid());

-- سياسات RLS للإشعارات
CREATE POLICY "Users can view their notifications" ON public.notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their notifications" ON public.notifications
  FOR UPDATE USING (user_id = auth.uid());

-- سياسات RLS للشهادات
CREATE POLICY "Students can view their certificates" ON public.certificates
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Teachers can view course certificates" ON public.certificates
  FOR SELECT USING (EXISTS(
    SELECT 1 FROM public.courses 
    WHERE id = course_id AND instructor_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all certificates" ON public.certificates
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- وظيفة لإنشاء ملف شخصي جديد عند التسجيل
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'مستخدم جديد'),
    'student'
  );
  RETURN new;
END;
$$;

-- تشغيل الوظيفة عند إنشاء مستخدم جديد
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- وظائف مساعدة لإحصائيات الطلاب
CREATE OR REPLACE FUNCTION public.get_student_stats(student_uuid UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_courses', COUNT(DISTINCT e.course_id),
    'completed_courses', COUNT(DISTINCT CASE WHEN e.status = 'completed' THEN e.course_id END),
    'active_courses', COUNT(DISTINCT CASE WHEN e.status = 'approved' THEN e.course_id END),
    'average_grade', ROUND(AVG(e.grade), 2),
    'total_attendance', COUNT(DISTINCT a.id),
    'present_attendance', COUNT(DISTINCT CASE WHEN a.status = 'present' THEN a.id END)
  ) INTO result
  FROM public.enrollments e
  LEFT JOIN public.attendance a ON a.student_id = e.student_id
  WHERE e.student_id = student_uuid;
  
  RETURN result;
END;
$$;
