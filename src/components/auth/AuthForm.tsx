import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Eye, EyeOff, BookOpen } from 'lucide-react';

const authSchema = z.object({
  fullName: z.string().min(2, 'الاسم يجب أن يكون أكثر من حرفين').optional(),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

type AuthFormData = z.infer<typeof authSchema>;

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    try {
      if (isLogin) {
        const { error } = await signIn(data.email, data.password);
        if (error) {
          toast.error(error.message || 'حدث خطأ أثناء تسجيل الدخول');
          return;
        }
        toast.success('تم تسجيل الدخول بنجاح');
        navigate('/dashboard');
      } else {
        const { error } = await signUp(data.email, data.password, data.fullName || '');
        if (error) {
          toast.error(error.message || 'حدث خطأ أثناء التسجيل');
          return;
        }
        toast.success('تم إرسال رسالة تأكيد إلى بريدك الإلكتروني');
        navigate('/login');
      }
    } catch (error) {
      toast.error('حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-full">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {isLogin 
              ? 'أدخل بياناتك للوصول إلى حسابك' 
              : 'انضم إلى مركز إقامة الكتاب كطالب'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">الاسم الكامل</Label>
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
            )}

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
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
              <Label htmlFor="password">كلمة المرور</Label>
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

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading 
                ? (isLogin ? 'جاري تسجيل الدخول...' : 'جاري إنشاء الحساب...') 
                : (isLogin ? 'تسجيل الدخول' : 'إنشاء حساب')
              }
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <p className="text-sm text-gray-600">
              {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}{' '}
              <Button
                variant="link"
                className="p-0 h-auto font-normal text-blue-600 hover:text-blue-800"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
              </Button>
            </p>

            {!isLogin && (
              <div className="border-t pt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">التسجيل بصفة أخرى:</p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/teacher-register')}
                  >
                    تسجيل كمدرب
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/admin-register')}
                  >
                    تسجيل كموظف إداري
                  </Button>
                </div>
              </div>
            )}

            {isLogin && (
              <Button
                variant="link"
                className="text-sm text-gray-600 hover:text-gray-800"
                onClick={() => navigate('/forgot-password')}
              >
                هل نسيت كلمة المرور؟
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
