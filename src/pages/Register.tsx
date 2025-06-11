
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpen, Globe, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [language, setLanguage] = useState('ar');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    userType: '',
    firstName: '',
    secondName: '',
    thirdName: '',
    lastName: '',
    gender: '',
    birthDate: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    nationality: '',
    country: '',
    otherCountry: '',
    language: 'ar',
    parentContact: '',
    agreeToTerms: false
  });
  const navigate = useNavigate();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const content = {
    ar: {
      title: "مركز إقامة الكتاب",
      registerTitle: "إنشاء حساب جديد",
      registerSubtitle: "انضم إلى منصة التعليم المتميزة",
      basicInfo: "البيانات الأساسية",
      userType: "التقديم كـ",
      student: "طالب",
      parent: "ولي أمر", 
      employee: "عامل",
      firstName: "الاسم الأول",
      secondName: "الاسم الثاني",
      thirdName: "الاسم الثالث",
      lastName: "الاسم الأخير",
      gender: "الجنس",
      male: "ذكر",
      female: "أنثى",
      birthDate: "تاريخ الميالد",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني",
      password: "كلمة السر",
      confirmPassword: "تأكيد كلمة السر",
      nationality: "الجنسية",
      country: "الدولة المقيم بها",
      egypt: "مصر",
      other: "أخرى",
      otherCountry: "اسم الدولة",
      preferredLanguage: "اللغة المفضلة",
      arabic: "عربي",
      english: "English",
      additionalInfo: "بيانات إضافية",
      parentContact: "بريد/هاتف ولي الأمر",
      parentNote: "يمكنك إضافة حسابات لألطفال بعد التسجيل",
      specializations: "التخصصات المفضلة (اختياري)",
      teacher: "معلم",
      trainer: "مدرب", 
      supervisor: "مشرف حلقة",
      studentDataManager: "مسؤول بيانات الطالب",
      employeeDataManager: "مسؤول بيانات العاملين",
      marketingDesigner: "مصمم تسويقي",
      bookDesigner: "مصمم كتاب علمي",
      scientificProducer: "منتج علمي",
      scientificResearcher: "باحث علمي",
      financialManager: "مدير مالي",
      economicManager: "مدير اقتصادي",
      librarySupport: "دعم المكتبة",
      customerService: "خدمة عملاء",
      programmer: "مبرمج",
      departmentHead: "رئيس قسم",
      topManagement: "إدارة عليا",
      agreeToTerms: "أوافق على شروط الاستخدام وسياسة الخصوصية",
      termsAndPrivacy: "شروط الاستخدام وسياسة الخصوصية",
      createAccount: "إتمام إنشاء الحساب",
      haveAccount: "لديك حساب؟",
      signIn: "تسجيل الدخول",
      backToHome: "العودة للرئيسية"
    },
    en: {
      title: "Iqamat Al-Kitab Center",
      registerTitle: "Create New Account", 
      registerSubtitle: "Join our distinguished educational platform",
      basicInfo: "Basic Information",
      userType: "Register as",
      student: "Student",
      parent: "Parent",
      employee: "Employee", 
      firstName: "First Name",
      secondName: "Second Name",
      thirdName: "Third Name",
      lastName: "Last Name",
      gender: "Gender",
      male: "Male",
      female: "Female",
      birthDate: "Birth Date",
      phone: "Phone Number",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      nationality: "Nationality",
      country: "Country of Residence",
      egypt: "Egypt",
      other: "Other",
      otherCountry: "Country Name",
      preferredLanguage: "Preferred Language",
      arabic: "عربي",
      english: "English",
      additionalInfo: "Additional Information",
      parentContact: "Parent Email/Phone",
      parentNote: "You can add children accounts after registration",
      specializations: "Preferred Specializations (Optional)",
      teacher: "Teacher",
      trainer: "Trainer",
      supervisor: "Circle Supervisor", 
      studentDataManager: "Student Data Manager",
      employeeDataManager: "Employee Data Manager",
      marketingDesigner: "Marketing Designer",
      bookDesigner: "Scientific Book Designer",
      scientificProducer: "Scientific Producer",
      scientificResearcher: "Scientific Researcher",
      financialManager: "Financial Manager",
      economicManager: "Economic Manager",
      librarySupport: "Library Support",
      customerService: "Customer Service",
      programmer: "Programmer",
      departmentHead: "Department Head",
      topManagement: "Top Management",
      agreeToTerms: "I agree to the Terms of Use and Privacy Policy",
      termsAndPrivacy: "Terms of Use and Privacy Policy",
      createAccount: "Complete Account Creation",
      haveAccount: "Have an account?",
      signIn: "Sign In",
      backToHome: "Back to Home"
    }
  };

  const currentContent = content[language as keyof typeof content];

  const specializations = [
    'teacher', 'trainer', 'supervisor', 'studentDataManager', 'employeeDataManager',
    'marketingDesigner', 'bookDesigner', 'scientificProducer', 'scientificResearcher',
    'financialManager', 'economicManager', 'librarySupport', 'customerService',
    'programmer', 'departmentHead', 'topManagement'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert(language === 'ar' ? 'كلمة السر غير متطابقة' : 'Passwords do not match');
      return;
    }
    if (!formData.agreeToTerms) {
      alert(language === 'ar' ? 'يجب الموافقة على الشروط والأحكام' : 'You must agree to the terms and conditions');
      return;
    }
    console.log('Registration data:', formData);
    // Here you would handle the registration logic
    navigate('/dashboard');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 ${language === 'ar' ? 'font-arabic' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-2xl mx-auto">
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

        {/* Registration Card */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {currentContent.registerTitle}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {currentContent.registerSubtitle}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{currentContent.basicInfo}</h3>
                
                {/* User Type */}
                <div className="mb-6">
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    {currentContent.userType}
                  </Label>
                  <RadioGroup
                    value={formData.userType}
                    onValueChange={(value) => setFormData({...formData, userType: value})}
                    className="flex space-x-6 rtl:space-x-reverse"
                  >
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student">{currentContent.student}</Label>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <RadioGroupItem value="parent" id="parent" />
                      <Label htmlFor="parent">{currentContent.parent}</Label>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <RadioGroupItem value="employee" id="employee" />
                      <Label htmlFor="employee">{currentContent.employee}</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-2 block">
                      {currentContent.firstName}
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="secondName" className="text-sm font-medium text-gray-700 mb-2 block">
                      {currentContent.secondName}
                    </Label>
                    <Input
                      id="secondName"
                      value={formData.secondName}
                      onChange={(e) => setFormData({...formData, secondName: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="thirdName" className="text-sm font-medium text-gray-700 mb-2 block">
                      {currentContent.thirdName}
                    </Label>
                    <Input
                      id="thirdName"
                      value={formData.thirdName}
                      onChange={(e) => setFormData({...formData, thirdName: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-2 block">
                      {currentContent.lastName}
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Gender and Birth Date */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      {currentContent.gender}
                    </Label>
                    <Select onValueChange={(value) => setFormData({...formData, gender: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">{currentContent.male}</SelectItem>
                        <SelectItem value="female">{currentContent.female}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="birthDate" className="text-sm font-medium text-gray-700 mb-2 block">
                      {currentContent.birthDate}
                    </Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
                      {currentContent.phone}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                      {currentContent.email}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-2 gap-4 mb-4">
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
                        className="pr-12 rtl:pr-4 rtl:pl-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-4 rtl:right-auto rtl:left-4 transform -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 mb-2 block">
                      {currentContent.confirmPassword}
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className="pr-12 rtl:pr-4 rtl:pl-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute top-1/2 right-4 rtl:right-auto rtl:left-4 transform -translate-y-1/2 text-gray-400"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="nationality" className="text-sm font-medium text-gray-700 mb-2 block">
                      {currentContent.nationality}
                    </Label>
                    <Input
                      id="nationality"
                      value={formData.nationality}
                      onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      {currentContent.country}
                    </Label>
                    <Select onValueChange={(value) => setFormData({...formData, country: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="egypt">{currentContent.egypt}</SelectItem>
                        <SelectItem value="other">{currentContent.other}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {formData.country === 'other' && (
                  <div className="mb-4">
                    <Label htmlFor="otherCountry" className="text-sm font-medium text-gray-700 mb-2 block">
                      {currentContent.otherCountry}
                    </Label>
                    <Input
                      id="otherCountry"
                      value={formData.otherCountry}
                      onChange={(e) => setFormData({...formData, otherCountry: e.target.value})}
                      required
                    />
                  </div>
                )}

                {/* Preferred Language */}
                <div className="mb-6">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    {currentContent.preferredLanguage}
                  </Label>
                  <Select onValueChange={(value) => setFormData({...formData, language: value})} defaultValue="ar">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">{currentContent.arabic}</SelectItem>
                      <SelectItem value="en">{currentContent.english}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Information based on user type */}
              {formData.userType && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">{currentContent.additionalInfo}</h3>
                  
                  {formData.userType === 'student' && (
                    <div className="mb-4">
                      <Label htmlFor="parentContact" className="text-sm font-medium text-gray-700 mb-2 block">
                        {currentContent.parentContact}
                      </Label>
                      <Input
                        id="parentContact"
                        value={formData.parentContact}
                        onChange={(e) => setFormData({...formData, parentContact: e.target.value})}
                        placeholder={language === 'ar' ? 'إجباري للطالب تحت سن 10 سنوات' : 'Required for students under 10 years'}
                      />
                    </div>
                  )}

                  {formData.userType === 'parent' && (
                    <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">{currentContent.parentNote}</p>
                    </div>
                  )}

                  {formData.userType === 'employee' && (
                    <div className="mb-4">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">
                        {currentContent.specializations}
                      </Label>
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                        {specializations.map((spec) => (
                          <div key={spec} className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Checkbox id={spec} />
                            <Label htmlFor={spec} className="text-sm">
                              {currentContent[spec as keyof typeof currentContent]}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {language === 'ar' 
                          ? 'هذه فقط كرغبات ولن يتم اعتماد شيء إلا بعد اكتمال التدريب وتأكيد المدرب'
                          : 'These are only preferences and nothing will be approved until training is completed and trainer confirmation'
                        }
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Terms Agreement */}
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData({...formData, agreeToTerms: checked as boolean})}
                  className="mt-1"
                />
                <Label htmlFor="agreeToTerms" className="text-sm text-gray-600 leading-relaxed">
                  {currentContent.agreeToTerms}{' '}
                  <a 
                    href="/terms-privacy" 
                    className="text-blue-600 hover:text-blue-800 underline"
                    target="_blank"
                  >
                    {currentContent.termsAndPrivacy}
                  </a>
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 py-3 text-white font-medium rounded-lg transition-all"
              >
                {currentContent.createAccount}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {currentContent.haveAccount}{' '}
                <a
                  href="/login"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  {currentContent.signIn}
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

export default Register;
