
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  User, 
  MessageSquare, 
  Video, 
  FileText, 
  CreditCard,
  Calendar,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

const MyCourses = () => {
  const [language, setLanguage] = useState('ar');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = {
    name: "أحمد محمد",
    role: "طالب",
    avatar: "",
    notifications: 3,
    messages: 2
  };

  const currentCourses = [
    {
      id: 1,
      name: "دورة تعليم القرآن الكريم",
      status: "جارية",
      teacher: "الشيخ محمد أحمد",
      supervisor: "د. عبدالله الحسن",
      schedule: "الأحد والثلاثاء - 8:00 م",
      sessionsCompleted: 8,
      totalSessions: 24,
      monthlyFee: 300,
      paymentStatus: "paid",
      nextPaymentDue: "2024-07-01",
      meetingLink: "https://meet.example.com/quran-class",
      dailyTasks: [
        { task: "تلاوة الورد اليومي", completed: true },
        { task: "مراجعة السورة المحفوظة", completed: false },
        { task: "الأذكار الصباحية والمسائية", completed: true }
      ],
      homework: "حفظ الآيات 1-10 من سورة البقرة",
      nextTest: "اختبار التجويد - 2024-06-15"
    },
    {
      id: 2,
      name: "دورة التعاهد التزكوي",
      status: "جارية",
      teacher: "الشيخ عمر سالم",
      supervisor: "د. فاطمة العلي",
      schedule: "يومياً - 6:00 ص",
      sessionsCompleted: 30,
      totalSessions: 90,
      monthlyFee: 0,
      paymentStatus: "free",
      meetingLink: "https://meet.example.com/tazkiya",
      dailyTasks: [
        { task: "صلاة الفجر في وقتها", completed: true },
        { task: "الأذكار بعد الصلاة", completed: true },
        { task: "قراءة الورد اليومي", completed: false }
      ]
    }
  ];

  const content = {
    ar: {
      title: "دوراتي الحالية",
      status: "الحالة",
      teacher: "المعلم",
      supervisor: "المشرف",
      schedule: "الجدول",
      progress: "التقدم",
      payment: "المدفوعات",
      dailyTasks: "المهام اليومية",
      homework: "الواجب المنزلي",
      nextTest: "الاختبار القادم",
      joinMeeting: "انضمام للقاء",
      contactTeacher: "تواصل مع المعلم",
      contactSupervisor: "تواصل مع المشرف",
      payFees: "دفع المصروفات",
      completed: "مكتمل",
      pending: "معلق",
      paid: "مدفوع",
      unpaid: "غير مدفوع",
      free: "مجاني",
      sessionsOf: "من",
      sessions: "جلسة",
      monthly: "شهرياً",
      egp: "ج.م"
    }
  };

  const currentContent = content[language as keyof typeof content];

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
            
            <div className="grid gap-6">
              {currentCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl text-gray-900">{course.name}</CardTitle>
                        <CardDescription className="text-gray-600 mt-2">
                          <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 ml-1" />
                              {course.schedule}
                            </span>
                            <Badge variant={course.status === 'جارية' ? 'default' : 'secondary'}>
                              {course.status}
                            </Badge>
                          </div>
                        </CardDescription>
                      </div>
                      <div className="text-left rtl:text-right">
                        <div className="text-sm text-gray-500">{currentContent.progress}</div>
                        <div className="text-lg font-semibold text-blue-600">
                          {course.sessionsCompleted} {currentContent.sessionsOf} {course.totalSessions} {currentContent.sessions}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* معلومات الدورة */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">معلومات الدورة</h3>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <User className="h-4 w-4 text-gray-400 ml-2" />
                              <span className="text-sm text-gray-600">{currentContent.teacher}:</span>
                              <span className="text-sm font-medium text-gray-900 mr-2">{course.teacher}</span>
                            </div>
                            <div className="flex items-center">
                              <User className="h-4 w-4 text-gray-400 ml-2" />
                              <span className="text-sm text-gray-600">{currentContent.supervisor}:</span>
                              <span className="text-sm font-medium text-gray-900 mr-2">{course.supervisor}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <Button size="sm" className="flex items-center">
                            <Video className="h-4 w-4 ml-1" />
                            {currentContent.joinMeeting}
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 ml-1" />
                            {currentContent.contactSupervisor}
                          </Button>
                        </div>
                      </div>

                      {/* المهام والتكاليف */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">{currentContent.dailyTasks}</h3>
                          <div className="space-y-2">
                            {course.dailyTasks?.map((task, index) => (
                              <div key={index} className="flex items-center">
                                {task.completed ? (
                                  <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                                ) : (
                                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full ml-2"></div>
                                )}
                                <span className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                  {task.task}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {course.homework && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                              <FileText className="h-4 w-4 ml-1" />
                              {currentContent.homework}
                            </h4>
                            <p className="text-sm text-gray-600 bg-yellow-50 p-2 rounded">
                              {course.homework}
                            </p>
                          </div>
                        )}

                        {course.nextTest && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                              <AlertTriangle className="h-4 w-4 ml-1 text-orange-500" />
                              {currentContent.nextTest}
                            </h4>
                            <p className="text-sm text-gray-600 bg-orange-50 p-2 rounded">
                              {course.nextTest}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* المدفوعات */}
                    {course.monthlyFee > 0 && (
                      <div className="mt-6 pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{currentContent.payment}</h4>
                            <p className="text-sm text-gray-600">
                              {course.monthlyFee} {currentContent.egp} {currentContent.monthly}
                            </p>
                          </div>
                          <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <Badge variant={course.paymentStatus === 'paid' ? 'default' : 'destructive'}>
                              {course.paymentStatus === 'paid' ? currentContent.paid : currentContent.unpaid}
                            </Badge>
                            {course.paymentStatus !== 'paid' && (
                              <Button size="sm" variant="outline">
                                <CreditCard className="h-4 w-4 ml-1" />
                                {currentContent.payFees}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyCourses;
