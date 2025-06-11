
import { Helmet } from "react-helmet-async";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { useEnrollments } from '@/hooks/useEnrollments';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { CheckCircle, Clock, AlertTriangle, BookOpen, Calendar, Bell } from 'lucide-react';
import { useState } from 'react';

const Summary = () => {
  const { user, profile } = useAuth();
  const { enrollments } = useEnrollments(user?.id);

  // Daily commitments state
  const [dailyCommitments, setDailyCommitments] = useState({
    prayers: false,
    adhkar: false,
    recitation: false,
    study: false
  });

  // Mock data for pending tasks
  const pendingTasks = [
    {
      id: '1',
      title: 'واجب أسبوعي - دورة التجويد',
      type: 'assignment',
      dueDate: '2024-06-15',
      priority: 'high'
    },
    {
      id: '2',
      title: 'اختبار شهري - السيرة النبوية',
      type: 'exam',
      dueDate: '2024-06-20',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'تأكيد الحضور للجلسة القادمة',
      type: 'confirmation',
      dueDate: '2024-06-12',
      priority: 'high'
    }
  ];

  // Mock notifications
  const recentNotifications = [
    {
      id: '1',
      title: 'موعد جلسة جديدة',
      content: 'ستبدأ جلسة دورة التجويد غداً',
      timestamp: '2024-06-10 16:00',
      isRead: false
    },
    {
      id: '2',
      title: 'تم تقييم الواجب',
      content: 'تم تقييم واجبكم الأسبوعي',
      timestamp: '2024-06-10 14:30',
      isRead: false
    }
  ];

  const handleCommitmentChange = (commitment: string, checked: boolean) => {
    setDailyCommitments(prev => ({
      ...prev,
      [commitment]: checked
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'assignment': return <BookOpen className="h-4 w-4" />;
      case 'exam': return <AlertTriangle className="h-4 w-4" />;
      case 'confirmation': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <ProtectedRoute>
      <Helmet>
        <title>الملخص - مركز إقامة الكتاب</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  مرحباً، {profile?.full_name}
                </h1>
                <p className="text-gray-600">
                  ملخص يومك ومهامك المطلوبة
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Daily Commitments */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                      <CheckCircle className="h-5 w-5" />
                      <span>التعاهد اليومي</span>
                    </CardTitle>
                    <CardDescription>
                      دورة التعاهد التزكوي الإلزامية لجميع المنضمين
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Checkbox
                          id="prayers"
                          checked={dailyCommitments.prayers}
                          onCheckedChange={(checked) => handleCommitmentChange('prayers', checked as boolean)}
                        />
                        <label htmlFor="prayers" className="text-sm font-medium">
                          الصلوات الخمس في وقتها
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Checkbox
                          id="adhkar"
                          checked={dailyCommitments.adhkar}
                          onCheckedChange={(checked) => handleCommitmentChange('adhkar', checked as boolean)}
                        />
                        <label htmlFor="adhkar" className="text-sm font-medium">
                          أذكار الصباح والمساء
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Checkbox
                          id="recitation"
                          checked={dailyCommitments.recitation}
                          onCheckedChange={(checked) => handleCommitmentChange('recitation', checked as boolean)}
                        />
                        <label htmlFor="recitation" className="text-sm font-medium">
                          ورد التلاوة اليومي
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Checkbox
                          id="study"
                          checked={dailyCommitments.study}
                          onCheckedChange={(checked) => handleCommitmentChange('study', checked as boolean)}
                        />
                        <label htmlFor="study" className="text-sm font-medium">
                          ورد التدارس/التسميع
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Current Grade Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>التقييم الحالي</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">88%</div>
                        <p className="text-sm text-gray-600">المعدل التراكمي</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>دورة التجويد</span>
                          <span className="font-semibold">92%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>السيرة النبوية</span>
                          <span className="font-semibold">85%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Urgent Tasks */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <span>عاجل - مهام مطلوبة</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingTasks.map((task) => (
                        <div key={task.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              {getTaskIcon(task.type)}
                              <h4 className="font-medium text-sm">{task.title}</h4>
                            </div>
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority === 'high' && 'عاجل'}
                              {task.priority === 'medium' && 'متوسط'}
                              {task.priority === 'low' && 'منخفض'}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-3">
                            موعد التسليم: {task.dueDate}
                          </p>
                          <Button size="sm" className="w-full">
                            إنجاز المهمة
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Current Courses Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                      <BookOpen className="h-5 w-5" />
                      <span>نظرة عامة على الدورات الحالية</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {enrollments && enrollments.slice(0, 3).map((enrollment) => (
                        <div key={enrollment.id} className="border rounded-lg p-3">
                          <h4 className="font-medium text-sm mb-1">
                            {enrollment.course?.title}
                          </h4>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-gray-600 mb-2">
                            <Calendar className="h-3 w-3" />
                            <span>الأحد والثلاثاء 8:00 مساءً</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {enrollment.status === 'approved' && 'نشط'}
                            {enrollment.status === 'pending' && 'في انتظار الموافقة'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Notifications */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Bell className="h-5 w-5" />
                    <span>آخر الإشعارات والرسائل</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentNotifications.map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-3 rtl:space-x-reverse p-3 border rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <h5 className="font-medium text-sm">{notification.title}</h5>
                          <p className="text-xs text-gray-600 mt-1">{notification.content}</p>
                          <span className="text-xs text-gray-500">{notification.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Summary;
