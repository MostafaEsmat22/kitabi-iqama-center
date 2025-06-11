
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  CreditCard,
  BookOpen,
  MessageSquare,
  Award
} from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

const Notifications = () => {
  const [language, setLanguage] = useState('ar');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const user = {
    name: "أحمد محمد",
    role: "طالب",
    avatar: "",
    notifications: 3,
    messages: 2
  };

  const notifications = [
    {
      id: 1,
      type: "task",
      title: "مهمة جديدة: حفظ سورة الكهف",
      description: "تم إضافة مهمة جديدة في دورة القرآن الكريم",
      timestamp: "منذ ساعة",
      read: false,
      priority: "high",
      course: "دورة القرآن الكريم"
    },
    {
      id: 2,
      type: "payment",
      title: "تذكير بالدفع",
      description: "رسوم شهر يوليو مستحقة خلال 3 أيام",
      timestamp: "منذ 3 ساعات",
      read: false,
      priority: "high",
      amount: 300
    },
    {
      id: 3,
      type: "meeting",
      title: "موعد اللقاء الأونلاين",
      description: "لقاء دورة القرآن سيبدأ خلال ساعتين",
      timestamp: "منذ 5 ساعات",
      read: true,
      priority: "medium",
      course: "دورة القرآن الكريم"
    },
    {
      id: 4,
      type: "course",
      title: "دورة جديدة متاحة",
      description: "تم فتح التسجيل في دورة الخطابة والدعوة",
      timestamp: "أمس",
      read: true,
      priority: "low"
    },
    {
      id: 5,
      type: "achievement",
      title: "إنجاز جديد",
      description: "تهانينا! حققت نسبة حضور 95% هذا الشهر",
      timestamp: "منذ يومين",
      read: true,
      priority: "medium"
    },
    {
      id: 6,
      type: "message",
      title: "رسالة جديدة",
      description: "رسالة من د. عبدالله الحسن",
      timestamp: "منذ 3 أيام",
      read: true,
      priority: "medium"
    }
  ];

  const content = {
    ar: {
      title: "الإشعارات",
      all: "الكل",
      unread: "غير مقروءة",
      tasks: "المهام",
      payments: "المدفوعات",
      meetings: "اللقاءات",
      courses: "الدورات",
      markAllRead: "تحديد الكل كمقروء",
      markAsRead: "تحديد كمقروء",
      noNotifications: "لا توجد إشعارات",
      high: "عالي",
      medium: "متوسط",
      low: "منخفض"
    }
  };

  const currentContent = content[language as keyof typeof content];

  const getNotificationIcon = (type: string) => {
    const icons = {
      task: BookOpen,
      payment: CreditCard,
      meeting: Clock,
      course: BookOpen,
      achievement: Award,
      message: MessageSquare,
      info: Info
    };
    const IconComponent = icons[type as keyof typeof icons] || Info;
    return <IconComponent className="h-5 w-5" />;
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') return 'text-red-500';
    if (priority === 'medium') return 'text-yellow-500';
    return 'text-blue-500';
  };

  const getNotificationBg = (type: string, priority: string) => {
    if (priority === 'high') return 'bg-red-50';
    if (priority === 'medium') return 'bg-yellow-50';
    return 'bg-blue-50';
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

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
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">{currentContent.title}</h1>
              <Button variant="outline" size="sm">
                <CheckCircle className="h-4 w-4 ml-1" />
                {currentContent.markAllRead}
              </Button>
            </div>
            
            {/* فلاتر */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                {currentContent.all}
              </Button>
              <Button
                variant={filter === 'unread' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('unread')}
                className="relative"
              >
                {currentContent.unread}
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 text-xs w-5 h-5 flex items-center justify-center p-0">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
              <Button
                variant={filter === 'task' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('task')}
              >
                {currentContent.tasks}
              </Button>
              <Button
                variant={filter === 'payment' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('payment')}
              >
                {currentContent.payments}
              </Button>
              <Button
                variant={filter === 'meeting' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('meeting')}
              >
                {currentContent.meetings}
              </Button>
              <Button
                variant={filter === 'course' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('course')}
              >
                {currentContent.courses}
              </Button>
            </div>

            {/* قائمة الإشعارات */}
            <div className="space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`${!notification.read ? 'border-r-4 border-r-blue-500' : ''} hover:shadow-md transition-shadow`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4 rtl:space-x-reverse">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationBg(notification.type, notification.priority)}`}>
                          <div className={getNotificationColor(notification.type, notification.priority)}>
                            {getNotificationIcon(notification.type)}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                {notification.title}
                              </h3>
                              <p className="text-gray-600 text-sm mt-1">
                                {notification.description}
                              </p>
                              {notification.course && (
                                <Badge variant="secondary" className="mt-2 text-xs">
                                  {notification.course}
                                </Badge>
                              )}
                              {notification.amount && (
                                <div className="text-sm font-medium text-red-600 mt-2">
                                  المبلغ: {notification.amount} ج.م
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <Badge 
                                variant={notification.priority === 'high' ? 'destructive' : 
                                        notification.priority === 'medium' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {notification.priority === 'high' ? currentContent.high :
                                 notification.priority === 'medium' ? currentContent.medium : currentContent.low}
                              </Badge>
                              {!notification.read && (
                                <Button variant="ghost" size="sm">
                                  {currentContent.markAsRead}
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center text-xs text-gray-500 mt-3">
                            <Clock className="h-3 w-3 ml-1" />
                            {notification.timestamp}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Bell className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">{currentContent.noNotifications}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;
