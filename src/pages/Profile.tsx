
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Globe, Calendar, MapPin, Edit, Save, X } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

const Profile = () => {
  const [language, setLanguage] = useState('ar');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "أحمد محمد علي السيد",
    email: "ahmed.ali@example.com",
    phone: "+201234567890",
    nationality: "مصري",
    country: "مصر",
    birthDate: "1995-05-15",
    gender: "ذكر",
    preferredLanguage: "عربي",
    role: "طالب"
  });

  // Mock user data
  const user = {
    name: "أحمد محمد علي",
    role: "طالب",
    avatar: "/placeholder.svg",
    rating: 4.5,
    notifications: 3,
    messages: 2
  };

  const content = {
    ar: {
      profile: "الملف الشخصي",
      personalInfo: "المعلومات الشخصية",
      edit: "تعديل",
      save: "حفظ",
      cancel: "إلغاء",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني", 
      phone: "رقم الهاتف",
      nationality: "الجنسية",
      country: "البلد",
      birthDate: "تاريخ الميلاد",
      gender: "الجنس",
      preferredLanguage: "اللغة المفضلة",
      role: "الدور",
      male: "ذكر",
      female: "أنثى",
      requestChange: "طلب تغيير البيانات",
      changeNote: "بعض البيانات تتطلب موافقة إدارية للتغيير",
      accountSettings: "إعدادات الحساب",
      changePassword: "تغيير كلمة المرور",
      twoFactor: "المصادقة الثنائية",
      privacy: "إعدادات الخصوصية"
    },
    en: {
      profile: "Profile",
      personalInfo: "Personal Information",
      edit: "Edit",
      save: "Save", 
      cancel: "Cancel",
      name: "Full Name",
      email: "Email",
      phone: "Phone Number",
      nationality: "Nationality",
      country: "Country",
      birthDate: "Birth Date",
      gender: "Gender",
      preferredLanguage: "Preferred Language",
      role: "Role",
      male: "Male",
      female: "Female",
      requestChange: "Request Data Change",
      changeNote: "Some data requires administrative approval to change",
      accountSettings: "Account Settings",
      changePassword: "Change Password",
      twoFactor: "Two-Factor Authentication",
      privacy: "Privacy Settings"
    }
  };

  const currentContent = content[language as keyof typeof content];

  const handleSave = () => {
    // هنا سيتم حفظ البيانات
    console.log('Saving profile data:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // استعادة البيانات الأصلية
    setIsEditing(false);
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${language === 'ar' ? 'font-arabic' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar 
          language={language} 
          user={user}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header 
            language={language}
            onLanguageToggle={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            onMenuClick={() => setSidebarOpen(true)}
            user={user}
          />

          {/* Profile content */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              {/* Page header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {currentContent.profile}
                </h1>
                <p className="text-gray-600">
                  إدارة معلوماتك الشخصية وإعدادات الحساب
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile card */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                          <User className="h-5 w-5" />
                          <span>{currentContent.personalInfo}</span>
                        </CardTitle>
                        {!isEditing ? (
                          <Button onClick={() => setIsEditing(true)} size="sm">
                            <Edit className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                            {currentContent.edit}
                          </Button>
                        ) : (
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button onClick={handleSave} size="sm">
                              <Save className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                              {currentContent.save}
                            </Button>
                            <Button onClick={handleCancel} variant="outline" size="sm">
                              <X className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                              {currentContent.cancel}
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name">{currentContent.name}</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="email">{currentContent.email}</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone">{currentContent.phone}</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="nationality">{currentContent.nationality}</Label>
                          <Input
                            id="nationality"
                            value={formData.nationality}
                            disabled={true}
                            className="mt-1 bg-gray-50"
                          />
                        </div>

                        <div>
                          <Label htmlFor="country">{currentContent.country}</Label>
                          <Input
                            id="country"
                            value={formData.country}
                            disabled={true}
                            className="mt-1 bg-gray-50"
                          />
                        </div>

                        <div>
                          <Label htmlFor="birthDate">{currentContent.birthDate}</Label>
                          <Input
                            id="birthDate"
                            type="date"
                            value={formData.birthDate}
                            disabled={true}
                            className="mt-1 bg-gray-50"
                          />
                        </div>

                        <div>
                          <Label htmlFor="gender">{currentContent.gender}</Label>
                          <Input
                            id="gender"
                            value={formData.gender}
                            disabled={true}
                            className="mt-1 bg-gray-50"
                          />
                        </div>

                        <div>
                          <Label htmlFor="role">{currentContent.role}</Label>
                          <div className="mt-1">
                            <Badge variant="secondary" className="text-sm">
                              {formData.role}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {!isEditing && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>ملاحظة:</strong> {currentContent.changeNote}
                          </p>
                          <Button className="mt-2" variant="outline" size="sm">
                            {currentContent.requestChange}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Account settings sidebar */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{currentContent.accountSettings}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <User className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                        {currentContent.changePassword}
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Mail className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                        {currentContent.twoFactor}
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Globe className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                        {currentContent.privacy}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Profile stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle>إحصائيات الملف</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">تاريخ التسجيل</span>
                        <span className="text-sm font-medium">يناير 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">آخر تسجيل دخول</span>
                        <span className="text-sm font-medium">اليوم</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">حالة الحساب</span>
                        <Badge variant="secondary">نشط</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
