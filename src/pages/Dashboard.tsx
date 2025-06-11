
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Calendar, MessageSquare, Bell, CreditCard, User, LogOut, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

const Dashboard = () => {
  const [language, setLanguage] = useState('ar');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Mock user data - في التطبيق الحقيقي سيأتي من قاعدة البيانات
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
      welcome: "مرحباً بك",
      dashboard: "لوحة التحكم",
      currentCourses: "دوراتي الحالية",
      urgentTasks: "مهام عاجلة",
      dailyCommitment: "التعاهد اليومي",
      prayers: "الصلوات",
      remembrance: "الأذكار",
      recitation: "ورد التلاوة",
      review: "ورد المراجعة",
      upcomingClasses: "اللقاءات القادمة",
      today: "اليوم",
      tomorrow: "غداً",
      recentNotifications: "آخر الإشعارات",
      viewAll: "عرض الكل",
      quickStats: "إحصائيات سريعة",
      coursesCount: "الدورات",
      attendanceRate: "نسبة الحضور",
      overallRating: "التقييم العام",
      completedTasks: "المهام المكتملة"
    },
    en: {
      welcome: "Welcome",
      dashboard: "Dashboard",
      currentCourses: "My Current Courses",
      urgentTasks: "Urgent Tasks",
      dailyCommitment: "Daily Commitment",
      prayers: "Prayers",
      remembrance: "Remembrance",
      recitation: "Recitation",
      review: "Review",
      upcomingClasses: "Upcoming Classes",
      today: "Today",
      tomorrow: "Tomorrow",
      recentNotifications: "Recent Notifications",
      viewAll: "View All",
      quickStats: "Quick Stats",
      coursesCount: "Courses",
      attendanceRate: "Attendance Rate",
      overallRating: "Overall Rating",
      completedTasks: "Completed Tasks"
    }
  };

  const currentContent = content[language as keyof typeof content];

  const mockCourses = [
    {
      id: 1,
      name: "حلقة تحفيظ القرآن الكريم",
      instructor: "الشيخ محمد أحمد",
      nextClass: "اليوم 7:00 م",
      progress: 75,
      status: "active"
    },
    {
      id: 2,
      name: "دورة التزكية والسلوك",
      instructor: "الدكتور عبد الرحمن",
      nextClass: "غداً 6:00 م",
      progress: 60,
      status: "active"
    }
  ];

  const mockTasks = [
    { id: 1, task: "حفظ سورة البقرة آية 1-10", due: "اليوم", completed: false },
    { id: 2, task: "مراجعة درس الوضوء", due: "غداً", completed: false },
    { id: 3, task: "تسليم واجب التفسير", due: "بعد غد", completed: true }
  ];

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

          {/* Dashboard content */}
          <main className="flex-1 overflow-y-auto p-6">
            {/* Welcome section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentContent.welcome}، {user.name}
              </h1>
              <p className="text-gray-600">
                مرحباً بك في لوحة التحكم الخاصة بك
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">{currentContent.coursesCount}</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">{currentContent.attendanceRate}</p>
                      <p className="text-2xl font-bold">85%</p>
                    </div>
                    <Calendar className="h-8 w-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">{currentContent.overallRating}</p>
                      <p className="text-2xl font-bold">4.5/5</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">{currentContent.completedTasks}</p>
                      <p className="text-2xl font-bold">12/15</p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current courses */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                      <BookOpen className="h-5 w-5" />
                      <span>{currentContent.currentCourses}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockCourses.map((course) => (
                        <div key={course.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{course.name}</h3>
                            <Badge variant="secondary">{course.status === 'active' ? 'نشط' : 'معلق'}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">المعلم: {course.instructor}</p>
                          <p className="text-sm text-blue-600 mb-3">اللقاء القادم: {course.nextClass}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">التقدم: {course.progress}%</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar content */}
              <div className="space-y-6">
                {/* Urgent tasks */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">{currentContent.urgentTasks}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockTasks.filter(task => !task.completed).map((task) => (
                        <div key={task.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                          <input type="checkbox" className="rounded" />
                          <div className="flex-1">
                            <p className="text-sm">{task.task}</p>
                            <p className="text-xs text-gray-500">{task.due}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Daily commitment */}
                <Card>
                  <CardHeader>
                    <CardTitle>{currentContent.dailyCommitment}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{currentContent.prayers}</span>
                        <input type="checkbox" className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{currentContent.remembrance}</span>
                        <input type="checkbox" className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{currentContent.recitation}</span>
                        <input type="checkbox" className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{currentContent.review}</span>
                        <input type="checkbox" className="rounded" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{currentContent.recentNotifications}</span>
                      <Button variant="ghost" size="sm">{currentContent.viewAll}</Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <p className="font-medium">تذكير بموعد الحصة</p>
                        <p className="text-gray-500">منذ ساعة</p>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">تم إضافة واجب جديد</p>
                        <p className="text-gray-500">منذ 3 ساعات</p>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">موعد دفع المصروفات</p>
                        <p className="text-gray-500">منذ يوم</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
