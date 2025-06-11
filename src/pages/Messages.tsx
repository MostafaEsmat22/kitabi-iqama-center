
import { Helmet } from "react-helmet-async";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { MessageSquare, Send, User } from 'lucide-react';

const Messages = () => {
  // Dummy data for messages
  const messages = [
    {
      id: '1',
      sender: 'الشيخ أحمد محمد',
      subject: 'تقييم الواجب الأسبوعي',
      content: 'السلام عليكم، تم تقييم واجبكم الأسبوعي وحصلتم على درجة ممتازة...',
      timestamp: '2024-06-10 14:30',
      isRead: false,
      type: 'teacher'
    },
    {
      id: '2',
      sender: 'إدارة المركز',
      subject: 'موعد الاختبار الشهري',
      content: 'نود إعلامكم بأن الاختبار الشهري لدورة التجويد سيكون يوم...',
      timestamp: '2024-06-09 10:15',
      isRead: true,
      type: 'admin'
    }
  ];

  return (
    <ProtectedRoute>
      <Helmet>
        <title>الرسائل - مركز إقامة الكتاب</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    الرسائل
                  </h1>
                  <p className="text-gray-600">
                    تواصل مع المدربين والإدارة
                  </p>
                </div>
                <Button className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Send className="h-4 w-4" />
                  <span>رسالة جديدة</span>
                </Button>
              </div>

              <div className="space-y-4">
                {messages.map((message) => (
                  <Card key={message.id} className={`cursor-pointer hover:shadow-md transition-shadow ${!message.isRead ? 'border-blue-200 bg-blue-50' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-base">{message.sender}</CardTitle>
                            <p className="text-sm text-gray-600">{message.timestamp}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          {!message.isRead && (
                            <Badge variant="default" className="bg-blue-600">
                              جديد
                            </Badge>
                          )}
                          {message.type === 'admin' && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              إدارة
                            </Badge>
                          )}
                          {message.type === 'teacher' && (
                            <Badge variant="outline" className="text-purple-600 border-purple-600">
                              مدرب
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-medium mb-2">{message.subject}</h4>
                      <p className="text-gray-700 text-sm line-clamp-2">
                        {message.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {messages.length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    لا توجد رسائل
                  </h3>
                  <p className="text-gray-600">
                    ستظهر هنا الرسائل من المدربين والإدارة
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

export default Messages;
