
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Globe, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [language, setLanguage] = useState('ar');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });
  const navigate = useNavigate();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const content = {
    ar: {
      title: "مركز إقامة الكتاب",
      loginTitle: "تسجيل الدخول",
      loginSubtitle: "أهلاً بك مرة أخرى",
      emailOrPhone: "البريد الإلكتروني أو رقم الهاتف",
      password: "كلمة السر",
      forgotPassword: "هل نسيت كلمة السر؟",
      loginButton: "تسجيل الدخول",
      noAccount: "ليس لديك حساب؟",
      createAccount: "إنشاء حساب جديد",
      backToHome: "العودة للرئيسية"
    },
    en: {
      title: "Iqamat Al-Kitab Center", 
      loginTitle: "Sign In",
      loginSubtitle: "Welcome back",
      emailOrPhone: "Email or Phone Number",
      password: "Password",
      forgotPassword: "Forgot Password?",
      loginButton: "Sign In",
      noAccount: "Don't have an account?",
      createAccount: "Create New Account",
      backToHome: "Back to Home"
    }
  };

  const currentContent = content[language as keyof typeof content];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the login logic
    console.log('Login attempt:', formData);
    // For now, just navigate to dashboard (placeholder)
    navigate('/dashboard');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 ${language === 'ar' ? 'font-arabic' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{currentContent.title}</h1>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center space-x-2 rtl:space-x-reverse mb-4"
          >
            <Globe className="h-4 w-4" />
            <span>{language === 'ar' ? 'English' : 'عربي'}</span>
          </Button>
        </div>

        {/* Login Card */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {currentContent.loginTitle}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {currentContent.loginSubtitle}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="emailOrPhone" className="text-sm font-medium text-gray-700 mb-2 block">
                  {currentContent.emailOrPhone}
                </Label>
                <Input
                  id="emailOrPhone"
                  type="text"
                  value={formData.emailOrPhone}
                  onChange={(e) => setFormData({...formData, emailOrPhone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2 block">
                  {currentContent.password}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 rtl:pr-4 rtl:pl-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-4 rtl:right-auto rtl:left-4 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="text-right rtl:text-left">
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {currentContent.forgotPassword}
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 py-3 text-white font-medium rounded-lg transition-all"
              >
                {currentContent.loginButton}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {currentContent.noAccount}{' '}
                <a
                  href="/register"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  {currentContent.createAccount}
                </a>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-800"
              >
                {currentContent.backToHome}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
