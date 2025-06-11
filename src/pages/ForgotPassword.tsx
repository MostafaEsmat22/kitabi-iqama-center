
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Globe, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [language, setLanguage] = useState('ar');
  const [formData, setFormData] = useState({
    emailOrPhone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const content = {
    ar: {
      title: "مركز إقامة الكتاب",
      pageTitle: "إعادة تعيين كلمة السر",
      subtitle: "أدخل بياناتك لإعادة تعيين كلمة السر",
      emailOrPhone: "البريد الإلكتروني أو رقم الهاتف",
      resetButton: "إرسال رابط الإعادة",
      backToLogin: "العودة لتسجيل الدخول",
      successTitle: "تم إرسال الرابط",
      successMessage: "تم إرسال رابط إعادة تعيين كلمة السر إلى البريد الإلكتروني أو رقم الهاتف المسجل",
      checkInbox: "يرجى مراجعة صندوق الوارد أو الرسائل النصية",
      tryAgain: "إرسال مرة أخرى"
    },
    en: {
      title: "Iqamat Al-Kitab Center",
      pageTitle: "Reset Password",
      subtitle: "Enter your details to reset your password",
      emailOrPhone: "Email or Phone Number",
      resetButton: "Send Reset Link",
      backToLogin: "Back to Login",
      successTitle: "Link Sent",
      successMessage: "A password reset link has been sent to your registered email or phone number",
      checkInbox: "Please check your inbox or text messages",
      tryAgain: "Send Again"
    }
  };

  const currentContent = content[language as keyof typeof content];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا سيتم إرسال طلب إعادة تعيين كلمة السر
    console.log('Reset password request:', formData);
    setIsSubmitted(true);
  };

  const ArrowIcon = language === 'ar' ? ArrowRight : ArrowLeft;

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

        {/* Reset Password Card */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {currentContent.pageTitle}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {isSubmitted ? currentContent.successMessage : currentContent.subtitle}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {!isSubmitted ? (
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

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 py-3 text-white font-medium rounded-lg transition-all"
                >
                  {currentContent.resetButton}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {currentContent.successTitle}
                </h3>
                <p className="text-gray-600 mb-6">
                  {currentContent.checkInbox}
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="w-full"
                >
                  {currentContent.tryAgain}
                </Button>
              </div>
            )}

            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
                className="text-gray-600 hover:text-gray-800 flex items-center space-x-2 rtl:space-x-reverse mx-auto"
              >
                <ArrowIcon className="h-4 w-4" />
                <span>{currentContent.backToLogin}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
