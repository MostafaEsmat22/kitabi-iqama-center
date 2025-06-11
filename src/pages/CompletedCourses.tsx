
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Calendar, 
  Award, 
  BookOpen,
  Star,
  CheckCircle
} from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

const CompletedCourses = () => {
  const [language, setLanguage] = useState('ar');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = {
    name: "أحمد محمد",
    role: "طالب",
    avatar: "",
    notifications: 3,
    messages: 2
  };

  const completedCourses = [
    {
      id: 1,
      name: "دورة تعليم القرآن الكريم - المستوى الأساسي",
      description: "دورة شاملة لتعليم القرآن الكريم مع أساسيات التجويد",
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      duration: "3 أشهر",
      finalGrade: 92,
      attendance: 95,
      instructor: "الشيخ محمد أحمد",
      certificate: true,
      certificateUrl: "/certificates/quran-basic.pdf",
      achievements: [
        "حفظ 5 سور من القرآن",
        "إتقان أحكام التجويد الأساسية",
        "أفضل طالب في الشهر الأخير"
      ]
    },
    {
      id: 2,
      name: "دورة الأخلاق والآداب الإسلامية",
      description: "دورة تركز على الأخلاق والآداب في الإسلام",
      startDate: "2023-10-01",
      endDate: "2023-12-01",
      duration: "شهرين",
      finalGrade: 88,
      attendance: 90,
      instructor: "د. فاطمة العلي",
      certificate: true,
      certificateUrl: "/certificates/akhlaq.pdf",
      achievements: [
        "فهم أساسيات الأخلاق الإسلامية",
        "تطبيق الآداب في الحياة اليومية"
      ]
    },
    {
      id: 3,
      name: "دورة السيرة النبوية",
      description: "دراسة شاملة لسيرة النبي محمد صلى الله عليه وسلم",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      duration: "3 أشهر",
      finalGrade: 85,
      attendance: 88,
      instructor: "الشيخ عمر سالم",
      certificate: false,
      achievements: [
        "فهم أحداث السيرة النبوية",
        "استخلاص الدروس والعبر"
      ]
    }
  ];

  const content = {
    ar: {
      title: "الدورات المكتملة",
      finalGrade: "التقييم النهائي",
      attendance: "نسبة الحضور",
      duration: "المدة",
      instructor: "المدرس",
      startDate: "تاريخ البداية",
      endDate: "تاريخ الانتهاء",
      achievements: "الإنجازات",
      certificate: "الشهادة",
      downloadCertificate: "تحميل الشهادة",
      noCertificate: "لم تصدر شهادة",
      excellent: "ممتاز",
      good: "جيد",
      average: "متوسط",
      coursesCompleted: "دورة مكتملة",
      totalCourses: "إجمالي الدورات"
    }
  };

  const currentContent = content[language as keyof typeof content];

  const getGradeLabel = (grade: number) => {
    if (grade >= 90) return { label: currentContent.excellent, color: "text-green-600", bgColor: "bg-green-100" };
    if (grade >= 80) return { label: currentContent.good, color: "text-blue-600", bgColor: "bg-blue-100" };
    return { label: currentContent.average, color: "text-yellow-600", bgColor: "bg-yellow-100" };
  };

  const totalCourses = completedCourses.length;
  const averageGrade = Math.round(completedCourses.reduce((sum, course) => sum + course.finalGrade, 0) / totalCourses);
  const certificatesEarned = completedCourses.filter(course => course.certificate).length;

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      <Sidebar 
        language={language} 
        user={user} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          language={language}
          onLanguageToggle={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
          onMenuClick={() => setSidebarOpen(true)}
          user={user}
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">{currentContent.title}</h1>
            
            {/* إحصائيات عامة */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">{totalCourses}</div>
                  <div className="text-sm text-gray-600">{currentContent.coursesCompleted}</div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-2">{averageGrade}%</div>
                  <div className="text-sm text-gray-600">المعدل العام</div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="text-2xl font-bold text-yellow-600 mb-2">{certificatesEarned}</div>
                  <div className="text-sm text-gray-600">شهادات محققة</div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-2">100%</div>
                  <div className="text-sm text-gray-600">معدل الإكمال</div>
                </CardContent>
              </Card>
            </div>

            {/* قائمة الدورات المكتملة */}
            <div className="grid lg:grid-cols-2 gap-6">
              {completedCourses.map((course) => {
                const gradeInfo = getGradeLabel(course.finalGrade);
                
                return (
                  <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-gray-900 mb-2">
                            {course.name}
                          </CardTitle>
                          <CardDescription className="text-gray-600">
                            {course.description}
                          </CardDescription>
                        </div>
                        <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      {/* معلومات الدورة */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">{currentContent.finalGrade}</div>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-2xl font-bold text-gray-900">{course.finalGrade}%</span>
                            <Badge className={`${gradeInfo.bgColor} ${gradeInfo.color} border-0`}>
                              {gradeInfo.label}
                            </Badge>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-500 mb-1">{currentContent.attendance}</div>
                          <div className="text-2xl font-bold text-gray-900">{course.attendance}%</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-500 mb-1">{currentContent.duration}</div>
                          <div className="font-medium text-gray-900">{course.duration}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-500 mb-1">{currentContent.instructor}</div>
                          <div className="font-medium text-gray-900">{course.instructor}</div>
                        </div>
                      </div>

                      {/* التواريخ */}
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 ml-1" />
                          {course.startDate}
                        </div>
                        <span>إلى</span>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 ml-1" />
                          {course.endDate}
                        </div>
                      </div>

                      {/* الإنجازات */}
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-3">{currentContent.achievements}</h4>
                        <div className="space-y-2">
                          {course.achievements.map((achievement, index) => (
                            <div key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* الشهادة */}
                      <div className="pt-4 border-t">
                        {course.certificate ? (
                          <Button className="w-full" onClick={() => window.open(course.certificateUrl, '_blank')}>
                            <Download className="h-4 w-4 ml-1" />
                            {currentContent.downloadCertificate}
                          </Button>
                        ) : (
                          <div className="text-center py-2 text-gray-500 text-sm">
                            {currentContent.noCertificate}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CompletedCourses;
