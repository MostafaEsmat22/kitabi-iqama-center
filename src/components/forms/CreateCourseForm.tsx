
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
import { CalendarIcon, PlusIcon } from 'lucide-react';
import { toast } from 'sonner';

const courseSchema = z.object({
  title: z.string().min(1, 'عنوان الدورة مطلوب'),
  description: z.string().min(10, 'وصف الدورة يجب أن يكون 10 أحرف على الأقل'),
  start_date: z.string().min(1, 'تاريخ البداية مطلوب'),
  end_date: z.string().min(1, 'تاريخ النهاية مطلوب'),
  duration_weeks: z.number().min(1, 'مدة الدورة يجب أن تكون أسبوع واحد على الأقل'),
  max_students: z.number().min(1, 'عدد الطلاب يجب أن يكون 1 على الأقل'),
  price: z.number().min(0, 'السعر لا يمكن أن يكون سالباً'),
  requirements: z.string().optional(),
  syllabus: z.string().optional(),
});

type CourseFormData = z.infer<typeof courseSchema>;

interface CreateCourseFormProps {
  onSuccess?: () => void;
}

const CreateCourseForm = ({ onSuccess }: CreateCourseFormProps) => {
  const { user } = useAuth();
  const { createCourse, isCreating } = useCourses();

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      description: '',
      start_date: '',
      end_date: '',
      duration_weeks: 8,
      max_students: 30,
      price: 0,
      requirements: '',
      syllabus: '',
    },
  });

  const onSubmit = (data: CourseFormData) => {
    if (!user?.id) {
      toast.error('يجب تسجيل الدخول لإنشاء دورة');
      return;
    }

    const courseData = {
      ...data,
      instructor_id: user.id,
      requirements: data.requirements ? data.requirements.split('\n').filter(req => req.trim()) : [],
      status: 'active' as const,
    };

    createCourse(courseData);
    
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <PlusIcon className="h-5 w-5" />
          <span>إنشاء دورة جديدة</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان الدورة</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: تحفيظ القرآن الكريم" {...field} />
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
                  <FormLabel>وصف الدورة</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="وصف مفصل عن محتوى الدورة وأهدافها..."
                      className="min-h-[100px]"
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
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تاريخ البداية</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تاريخ النهاية</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="duration_weeks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المدة (أسابيع)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1"
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="max_students"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عدد الطلاب الأقصى</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1"
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>السعر (ريال)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0"
                        step="0.01"
                        {...field} 
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>متطلبات الدورة (اختيارية)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="اكتب كل متطلب في سطر منفصل..."
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="syllabus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>منهج الدورة (اختياري)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="وصف مفصل لمنهج الدورة والمواضيع التي ستغطى..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isCreating}
            >
              {isCreating ? 'جاري الإنشاء...' : 'إنشاء الدورة'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateCourseForm;
