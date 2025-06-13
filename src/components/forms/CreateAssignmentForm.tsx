
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
import { FileText, PlusIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const assignmentSchema = z.object({
  course_id: z.string().min(1, 'اختر الدورة'),
  title: z.string().min(1, 'عنوان الواجب مطلوب'),
  description: z.string().optional(),
  due_date: z.string().min(1, 'تاريخ التسليم مطلوب'),
  max_score: z.number().min(0, 'الدرجة العظمى لا يمكن أن تكون سالبة'),
  instructions: z.string().min(10, 'تعليمات الواجب مطلوبة'),
  attachments: z.string().optional(),
});

type AssignmentFormData = z.infer<typeof assignmentSchema>;

interface CreateAssignmentFormProps {
  courseId?: string;
  onSuccess?: () => void;
}

const CreateAssignmentForm = ({ courseId, onSuccess }: CreateAssignmentFormProps) => {
  const { user } = useAuth();
  const { courses } = useCourses();

  const form = useForm<AssignmentFormData>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      course_id: courseId || '',
      title: '',
      description: '',
      due_date: '',
      max_score: 100,
      instructions: '',
      attachments: '',
    },
  });

  const onSubmit = async (data: AssignmentFormData) => {
    if (!user?.id) {
      toast.error('يجب تسجيل الدخول لإنشاء واجب');
      return;
    }

    try {
      const assignmentData = {
        ...data,
        due_date: new Date(data.due_date).toISOString(),
        attachments: data.attachments ? data.attachments.split('\n').filter(a => a.trim()) : [],
      };

      const { error } = await supabase
        .from('assignments')
        .insert(assignmentData);

      if (error) throw error;

      toast.success('تم إنشاء الواجب بنجاح');
      form.reset();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating assignment:', error);
      toast.error('فشل في إنشاء الواجب');
    }
  };

  // Filter courses to show only those taught by the current user
  const userCourses = courses?.filter(course => course.instructor_id === user?.id) || [];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <FileText className="h-5 w-5" />
          <span>إنشاء واجب جديد</span>
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
                  <FormLabel>عنوان الواجب</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: حفظ سورة الفاتحة" {...field} />
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
                  <FormLabel>وصف الواجب (اختياري)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="وصف مختصر للواجب..."
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
                name="due_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تاريخ ووقت التسليم</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="max_score"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الدرجة العظمى</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0"
                        {...field} 
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 100)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تعليمات الواجب</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="تعليمات مفصلة للطلاب حول كيفية أداء الواجب..."
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attachments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المرفقات (اختيارية)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="اكتب اسم كل ملف مرفق في سطر منفصل..."
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              إنشاء الواجب
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateAssignmentForm;
