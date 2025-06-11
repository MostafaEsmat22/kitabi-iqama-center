
import { Helmet } from "react-helmet-async";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { Bell, Clock, CheckCircle } from 'lucide-react';

const Notifications = () => {
  // Dummy data for notifications
  const notifications = [
    {
      id: '1',
      title: 'موعد جلسة جديدة',
      content: 'ستبدأ جلسة دورة التجويد غداً في تمام الساعة 8:00 مساءً',
      timestamp: '2024-06-10 16:00',
      isRead: false,
      type: 'session'
    },
    {
      id: '2',
      title: 'تم تقييم الواجب',
      content: 'تم تقييم واجبكم الأسبوعي لدورة السيرة النبوية',
      timestamp: '2024-06-10 14:30',
      isRead: false,
      type: 'assignment'
    },
    {
      id: '3',
      title: 'رسالة جديدة',
      content: 'لديك رسالة جديدة من الشيخ أحمد محمد',
      timestamp: '2024-06-09 12:15',
      isRead: true,
      type: 'message'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'session':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'assignment':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'message':
        return <Bell className="h-5 w-5 text-purple-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <ProtectedRoute>
      <Helmet>
        <title>الإشعارات - مركز إقامة الكتاب</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  الإشعارات
                </h1>
                <p className="text-gray-600">
                  آخر التحديثات والتنبيهات المهمة
                </p>
              </div>

              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Card key={notification.id} className={`cursor-pointer hover:shadow-md transition-shadow ${!notification.isRead ? 'border-blue-200 bg-blue-50' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-3 rtl:space-x-reverse text-base">
                          {getNotificationIcon(notification.type)}
                          <span>{notification.title}</span>
                        </CardTitle>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          {!notification.isRead && (
                            <Badge variant="default" className="bg-blue-600">
                              جديد
                            </Badge>
                          )}
                          <span className="text-sm text-gray-500">{notification.timestamp}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{notification.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {notifications.length === 0 && (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    لا توجد إشعارات
                  </h3>
                  <p className="text-gray-600">
                    ستظهر هنا الإشعارات والتنبيهات المهمة
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Notifications;
