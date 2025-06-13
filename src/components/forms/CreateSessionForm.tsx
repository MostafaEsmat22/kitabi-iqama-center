
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCourses } from '@/hooks/useCourses';
import { useAuth } from '@/hooks/useAuth';
import { Video } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const sessionSchema = z.object({
  course_id: z.string().min(1, 'اختر الدورة'),
  title: z.string().min(1, 'عنوان الجلسة مطلوب'),
  description: z.string().optional(),
  session_date: z.string().min(1, 'تاريخ ووقت الجلسة مطلوب'),
  duration_minutes: z.number().min(15, 'مدة الجلسة يجب أن تكون 15 دقيقة على الأقل'),
  meeting_link: z.string().url('رابط الاجتماع غير صحيح').optional().or(z.literal('')),
  materials: z.string().optional(),
});

type SessionFormData = z.infer<typeof sessionSchema>;

interface CreateSessionFormProps {
  courseId?: string;
  onSuccess?: () => void;
}

const CreateSessionForm = ({ courseId, onSuccess }: CreateSessionFormProps) => {
  const { user } = useAuth();
  const { courses } = useCourses();

  const form = useForm<SessionFormData>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      course_id: courseId || '',
      title: '',
      description: '',
      session_date: '',
      duration_minutes: 60,
      meeting_link: '',
      materials: '',
    },
  });

  const onSubmit = async (data: SessionFormData) => {
    if (!user?.id) {
      toast.error('يجب تسجيل الدخول لإنشاء جلسة');
      return;
    }

    try {
      console.log('Submitting session data:', data);
      
      const sessionData = {
        course_id: data.course_id,
        title: data.title,
        description: data.description || null,
        session_date: new Date(data.session_date).toISOString(),
        duration_minutes: data.duration_minutes,
        meeting_link: data.meeting_link || null,
        materials: data.materials ? data.materials.split('\n').filter(m => m.trim()) : [],
      };

      console.log('Processed session data:', sessionData);

      const { error } = await supabase
        .from('sessions')
        .insert(sessionData);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      toast.success('تم إنشاء الجلسة بنجاح');
      form.reset();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating session:', error);
      toast.error('فشل في إنشاء الجلسة');
    }
  };

  // Filter courses to show only those taught by the current user
  const userCourses = courses?.filter(course => course.instructor_id === user?.id) || [];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Video className="h-5 w-5" />
          <span>إنشاء جلسة جديدة</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="course_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الدورة</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الدورة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {userCourses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان الجلسة</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: الجلسة الأولى - مقدمة" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>وصف الجلسة (اختياري)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="وصف محتوى الجلسة والمواضيع التي ستغطى..."
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="session_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تاريخ ووقت الجلسة</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration_minutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مدة الجلسة (دقيقة)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="15"
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 60)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="meeting_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رابط الاجتماع (اختياري)</FormLabel>
                  <FormControl>
                    <Input 
                      type="url"
                      placeholder="https://meet.google.com/..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="materials"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المواد التعليمية (اختيارية)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="اكتب اسم كل ملف في سطر منفصل..."
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              إنشاء الجلسة
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateSessionForm;
