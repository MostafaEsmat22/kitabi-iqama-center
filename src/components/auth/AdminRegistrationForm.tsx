
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
import { Eye, EyeOff, Settings } from 'lucide-react';

const adminSchema = z.object({
  fullName: z.string().min(2, 'الاسم يجب أن يكون أكثر من حرفين'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  confirmPassword: z.string(),
  phone: z.string().min(10, 'رقم الهاتف غير صحيح'),
  department: z.string().min(2, 'القسم مطلوب'),
  position: z.string().min(2, 'المنصب مطلوب'),
  responsibilities: z.string().min(10, 'المسؤوليات مطلوبة'),
  adminCode: z.string().min(1, 'كود المدير مطلوب'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "كلمة المرور غير متطابقة",
  path: ["confirmPassword"],
});

type AdminFormData = z.infer<typeof adminSchema>;

const AdminRegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminFormData>({
    resolver: zodResolver(adminSchema),
  });

  const onSubmit = async (data: AdminFormData) => {
    // Check admin code (in real app, this should be validated on server)
    if (data.adminCode !== 'ADMIN2024') {
      toast.error('كود المدير غير صحيح');
      return;
    }

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-gray-800 p-3 rounded-full">
              <Settings className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            تسجيل موظف إداري
          </CardTitle>
          <CardDescription className="text-gray-600">
            انضم إلى الفريق الإداري في مركز إقامة الكتاب
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">القسم *</Label>
                <Input
                  id="department"
                  type="text"
                  placeholder="مثال: الشؤون الأكاديمية، الشؤون المالية"
                  {...register('department')}
                  disabled={isLoading}
                />
                {errors.department && (
                  <p className="text-sm text-red-600">{errors.department.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">المنصب *</Label>
                <Input
                  id="position"
                  type="text"
                  placeholder="مثال: مدير، منسق، موظف"
                  {...register('position')}
                  disabled={isLoading}
                />
                {errors.position && (
                  <p className="text-sm text-red-600">{errors.position.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsibilities">المسؤوليات والصلاحيات *</Label>
              <Textarea
                id="responsibilities"
                placeholder="اذكر المسؤوليات والصلاحيات المطلوبة لهذا المنصب"
                {...register('responsibilities')}
                disabled={isLoading}
                rows={3}
              />
              {errors.responsibilities && (
                <p className="text-sm text-red-600">{errors.responsibilities.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminCode">كود المدير *</Label>
              <Input
                id="adminCode"
                type="password"
                placeholder="أدخل كود المدير"
                {...register('adminCode')}
                disabled={isLoading}
              />
              {errors.adminCode && (
                <p className="text-sm text-red-600">{errors.adminCode.message}</p>
              )}
              <p className="text-xs text-gray-500">
                يجب الحصول على كود المدير من الإدارة العليا
              </p>
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

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">
                <strong>تحذير:</strong> التسجيل كموظف إداري يتطلب موافقة من الإدارة العليا. 
                تأكد من الحصول على كود المدير الصحيح قبل المتابعة.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-900"
              disabled={isLoading}
            >
              {isLoading ? 'جاري التسجيل...' : 'تسجيل كموظف إداري'}
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

export default AdminRegistrationForm;
