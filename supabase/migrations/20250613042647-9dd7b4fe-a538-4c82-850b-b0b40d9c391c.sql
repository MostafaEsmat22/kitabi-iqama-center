
-- First, let's see what user IDs we have available
-- Update one existing student to be a teacher
UPDATE public.profiles 
SET role = 'teacher', full_name = 'د. أحمد محمد الأستاذ', phone = '+966501234567'
WHERE role = 'student' 
AND id = (SELECT id FROM public.profiles WHERE role = 'student' ORDER BY created_at LIMIT 1);

-- Update another student to be a teacher
UPDATE public.profiles 
SET role = 'teacher', full_name = 'الشيخ محمد التجويد', phone = '+966501234568'
WHERE role = 'student' 
AND id = (SELECT id FROM public.profiles WHERE role = 'student' ORDER BY created_at LIMIT 1 OFFSET 1);

-- Update another student to be admin
UPDATE public.profiles 
SET role = 'admin', full_name = 'أ. فاطمة الإدارية', phone = '+966501234569'
WHERE role = 'student' 
AND id = (SELECT id FROM public.profiles WHERE role = 'student' ORDER BY created_at LIMIT 1 OFFSET 2);

-- Add test courses using real instructor IDs
INSERT INTO public.courses (id, title, description, instructor_id, start_date, end_date, duration_weeks, max_students, price, status, requirements, syllabus)
VALUES 
  (
    '10000000-0000-0000-0000-000000000001',
    'تحفيظ القرآن الكريم - المستوى الأول',
    'دورة مكثفة لتحفيظ أجزاء من القرآن الكريم مع التركيز على التجويد الصحيح',
    (SELECT id FROM public.profiles WHERE role = 'teacher' ORDER BY created_at LIMIT 1),
    '2024-07-01',
    '2024-12-31',
    24,
    25,
    500.00,
    'active',
    ARRAY['معرفة أساسيات القراءة', 'الرغبة في التعلم'],
    'المنهج يشمل حفظ الجزء الأول من القرآن مع دراسة أحكام التجويد الأساسية'
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    'أحكام التجويد',
    'دراسة شاملة لأحكام التجويد وتطبيقها العملي في التلاوة',
    (SELECT id FROM public.profiles WHERE role = 'teacher' ORDER BY created_at LIMIT 1 OFFSET 1),
    '2024-08-01',
    '2025-01-31',
    20,
    30,
    350.00,
    'active',
    ARRAY['القدرة على القراءة', 'معرفة أساسيات التجويد'],
    'دراسة مفصلة لأحكام النون الساكنة والتنوين، المدود، والوقف والابتداء'
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    'السيرة النبوية',
    'دراسة شاملة لسيرة النبي محمد صلى الله عليه وسلم من الولادة حتى الوفاة',
    (SELECT id FROM public.profiles WHERE role = 'teacher' ORDER BY created_at LIMIT 1),
    '2024-09-01',
    '2025-02-28',
    24,
    40,
    400.00,
    'active',
    ARRAY['معرفة أساسيات التاريخ الإسلامي'],
    'دراسة المراحل المختلفة من حياة الرسول مع التركيز على الدروس والعبر'
  );

-- Add sessions for the courses
INSERT INTO public.sessions (id, course_id, title, description, session_date, duration_minutes, meeting_link, materials)
VALUES 
  -- Sessions for Quran memorization course
  (
    '20000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'الجلسة الأولى - مقدمة في التحفيظ',
    'التعريف بالدورة ومنهجية التحفيظ',
    '2024-07-07 19:00:00+03',
    90,
    'https://meet.google.com/abc-defg-hij',
    ARRAY['دليل_التحفيظ.pdf', 'تسجيل_صوتي_الفاتحة.mp3']
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    'حفظ سورة الفاتحة',
    'تحفيظ وتجويد سورة الفاتحة',
    '2024-07-14 19:00:00+03',
    90,
    'https://meet.google.com/abc-defg-hij',
    ARRAY['تفسير_الفاتحة.pdf', 'أحكام_تجويد_الفاتحة.pdf']
  ),
  (
    '20000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000001',
    'حفظ سورة البقرة - الآيات 1-20',
    'بداية حفظ سورة البقرة',
    '2024-07-21 19:00:00+03',
    90,
    'https://meet.google.com/abc-defg-hij',
    ARRAY['تسجيل_البقرة_1-20.mp3']
  ),
  -- Sessions for Tajweed course
  (
    '20000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000002',
    'مقدمة في علم التجويد',
    'تعريف التجويد وأهميته وحكمه',
    '2024-08-05 20:00:00+03',
    60,
    'https://zoom.us/j/123456789',
    ARRAY['مقدمة_التجويد.pdf', 'أهمية_التجويد.docx']
  ),
  (
    '20000000-0000-0000-0000-000000000005',
    '10000000-0000-0000-0000-000000000002',
    'أحكام النون الساكنة والتنوين',
    'دراسة الإظهار والإدغام والإقلاب والإخفاء',
    '2024-08-12 20:00:00+03',
    60,
    'https://zoom.us/j/123456789',
    ARRAY['أحكام_النون_الساكنة.pdf', 'تمارين_عملية.pdf']
  ),
  -- Sessions for Seerah course
  (
    '20000000-0000-0000-0000-000000000006',
    '10000000-0000-0000-0000-000000000003',
    'ولادة الرسول ونشأته',
    'دراسة الظروف التاريخية لولادة النبي صلى الله عليه وسلم',
    '2024-09-08 18:00:00+03',
    75,
    'https://teams.microsoft.com/l/meetup-join/19%3a...',
    ARRAY['السيرة_الولادة_والنشأة.pdf', 'خريطة_مكة_القديمة.jpg']
  );

-- Add assignments
INSERT INTO public.assignments (id, course_id, title, description, due_date, max_score, instructions, attachments)
VALUES 
  (
    '30000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'حفظ سورة الفاتحة',
    'حفظ سورة الفاتحة مع تطبيق أحكام التجويد',
    '2024-07-20 23:59:00+03',
    100.00,
    'يرجى تسجيل تلاوتك لسورة الفاتحة وإرسال الملف الصوتي. سيتم تقييمك على الحفظ والتجويد.',
    ARRAY['معايير_التقييم.pdf', 'نموذج_التسجيل.mp3']
  ),
  (
    '30000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    'حفظ الآيات 1-20 من سورة البقرة',
    'حفظ الآيات العشرين الأولى من سورة البقرة',
    '2024-07-28 23:59:00+03',
    100.00,
    'حفظ الآيات المطلوبة مع التركيز على النطق الصحيح والتجويد',
    ARRAY['نص_الآيات.pdf']
  ),
  (
    '30000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000002',
    'تطبيق أحكام النون الساكنة',
    'إيجاد أمثلة على أحكام النون الساكنة في القرآن',
    '2024-08-18 23:59:00+03',
    80.00,
    'ابحث عن 5 أمثلة لكل حكم من أحكام النون الساكنة واكتب الحكم المطبق',
    ARRAY['ورقة_العمل.pdf']
  ),
  (
    '30000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000003',
    'تلخيص أحداث السنة الأولى من البعثة',
    'كتابة تلخيص شامل لأحداث السنة الأولى من بعثة النبي',
    '2024-09-15 23:59:00+03',
    90.00,
    'اكتب تلخيصاً لا يقل عن 1000 كلمة عن أحداث السنة الأولى من البعثة',
    ARRAY['مصادر_مرجعية.pdf']
  );

-- Enroll remaining students in courses
INSERT INTO public.enrollments (id, student_id, course_id, enrollment_date, status)
SELECT 
  gen_random_uuid(),
  p.id,
  '10000000-0000-0000-0000-000000000001',
  '2024-06-25 10:00:00+03',
  'approved'
FROM public.profiles p
WHERE p.role = 'student';

INSERT INTO public.enrollments (id, student_id, course_id, enrollment_date, status)
SELECT 
  gen_random_uuid(),
  p.id,
  '10000000-0000-0000-0000-000000000002',
  '2024-07-15 14:00:00+03',
  'approved'
FROM public.profiles p
WHERE p.role = 'student'
LIMIT 1;

INSERT INTO public.enrollments (id, student_id, course_id, enrollment_date, status)
SELECT 
  gen_random_uuid(),
  p.id,
  '10000000-0000-0000-0000-000000000003',
  '2024-08-20 16:00:00+03',
  'pending'
FROM public.profiles p
WHERE p.role = 'student'
LIMIT 1;
