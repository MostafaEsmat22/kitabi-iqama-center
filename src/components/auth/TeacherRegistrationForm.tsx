
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Eye, EyeOff, BookOpen } from 'lucide-react';

const teacherSchema = z.object({
  fullName: z.string().min(2, 'الاسم يجب أن يكون أكثر من حرفين'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  confirmPassword: z.string(),
  phone: z.string().min(10, 'رقم الهاتف غير صحيح'),
  specialization: z.string().min(2, 'التخصص مطلوب'),
  experience: z.string().min(10, 'الخبرة المهنية مطلوبة'),
  qualifications: z.string().min(10, 'المؤهلات العلمية مطلوبة'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "كلمة المرور غير متطابقة",
  path: ["confirmPassword"],
});

type TeacherFormData = z.infer<typeof teacherSchema>;

const TeacherRegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherFormData>({
    resolver: zodResolver(teacherSchema),
  });

  const onSubmit = async (data: TeacherFormData) => {
    setIsLoading(true);
    try {
      const { error } = await signUp(data.email, data.password, data.fullName);
      
      if (error) {
        toast.error(error.message || 'حدث خطأ أثناء التسجيل');
        return;
      }

      toast.success('تم إرسال رسالة تأكيد إلى بريدك الإلكتروني');
      navigate('/login');
    } catch (error) {
      toast.error('حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-full">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            تسجيل مدرب جديد
          </CardTitle>
          <CardDescription className="text-gray-600">
            انضم إلى فريق المدربين في مركز إقامة الكتاب
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">الاسم الكامل *</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="أدخل اسمك الكامل"
                  {...register('fullName')}
                  disabled={isLoading}
                />
                {errors.fullName && (
                  <p className="text-sm text-red-600">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="05xxxxxxxx"
                  {...register('phone')}
                  disabled={isLoading}
                />
                {errors.phone && (
                  <p className="text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني *</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                {...register('email')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization">التخصص *</Label>
              <Input
                id="specialization"
                type="text"
                placeholder="مثال: تجويد القرآن، الفقه، العقيدة"
                {...register('specialization')}
                disabled={isLoading}
              />
              {errors.specialization && (
                <p className="text-sm text-red-600">{errors.specialization.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualifications">المؤهلات العلمية *</Label>
              <Textarea
                id="qualifications"
                placeholder="اذكر مؤهلاتك العلمية والشهادات التي حصلت عليها"
                {...register('qualifications')}
                disabled={isLoading}
                rows={3}
              />
              {errors.qualifications && (
                <p className="text-sm text-red-600">{errors.qualifications.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">الخبرة المهنية *</Label>
              <Textarea
                id="experience"
                placeholder="اذكر خبرتك في التدريس والمجالات التي درست فيها"
                {...register('experience')}
                disabled={isLoading}
                rows={3}
              />
              {errors.experience && (
                <p className="text-sm text-red-600">{errors.experience.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="أدخل كلمة المرور"
                    {...register('password')}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">تأكيد كلمة المرور *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="أعد إدخال كلمة المرور"
                    {...register('confirmPassword')}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>ملاحظة:</strong> سيتم مراجعة طلب التسجيل من قبل الإدارة قبل الموافقة عليه. 
                ستصلك رسالة تأكيد عند الموافقة على طلبك.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? 'جاري التسجيل...' : 'تسجيل كمدرب'}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                لديك حساب بالفعل؟{' '}
                <Button
                  variant="link"
                  className="p-0 h-auto font-normal text-blue-600 hover:text-blue-800"
                  onClick={() => navigate('/login')}
                >
                  تسجيل الدخول
                </Button>
              </p>
              <p className="text-sm text-gray-600">
                تسجيل كطالب؟{' '}
                <Button
                  variant="link"
                  className="p-0 h-auto font-normal text-blue-600 hover:text-blue-800"
                  onClick={() => navigate('/register')}
                >
                  انقر هنا
                </Button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherRegistrationForm;
