
import { Helmet } from "react-helmet-async";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { 
  BookOpen, 
  Calendar, 
  User, 
  MessageSquare, 
  FileText, 
  DollarSign, 
  Video,
  Download,
  Upload,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [paymentProof, setPaymentProof] = useState<File | null>(null);

  // Mock course data
  const course = {
    id: courseId,
    title: 'دورة أساسيات التجويد',
    instructor: 'الشيخ أحمد محمد',
    supervisor: 'الأستاذ محمد علي',
    schedule: 'الأحد والثلاثاء 8:00 مساءً',
    sessionsCompleted: 8,
    totalSessions: 12,
    paymentStatus: 'pending',
    paymentAmount: 150,
    paymentDueDate: '2024-06-15',
    meetingLink: 'https://meet.example.com/room/123',
    isPaymentOverdue: false
  };

  // Mock sessions data
  const sessions = [
    {
      id: '1',
      title: 'مقدمة في علم التجويد',
      date: '2024-06-01',
      completed: true,
      summary: 'تم شرح أساسيات علم التجويد وأهميته',
      materials: ['ملف المحاضرة.pdf', 'تسجيل الجلسة.mp4']
    },
    {
      id: '2',
      title: 'أحكام النون الساكنة والتنوين',
      date: '2024-06-03',
      completed: true,
      summary: 'شرح تفصيلي لأحكام النون الساكنة والتنوين',
      materials: ['شرح الأحكام.pdf']
    },
    {
      id: '3',
      title: 'أحكام الميم الساكنة',
      date: '2024-06-08',
      completed: false,
      summary: '',
      materials: []
    }
  ];

  // Mock assignments
  const assignments = [
    {
      id: '1',
      title: 'واجب أسبوعي - الأحكام الأساسية',
      dueDate: '2024-06-15',
      status: 'pending',
      grade: null,
      feedback: null
    },
    {
      id: '2',
      title: 'اختبار شهري',
      dueDate: '2024-06-20',
      status: 'completed',
      grade: 92,
      feedback: 'أداء ممتاز، مع ملاحظة بسيطة على النطق'
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPaymentProof(file);
    }
  };

  return (
    <ProtectedRoute>
      <Helmet>
        <title>{course.title} - مركز إقامة الكتاب</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {course.title}
                </h1>
                <p className="text-gray-600">
                  تفاصيل الدورة والتقدم الحالي
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Course Info */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                      <BookOpen className="h-5 w-5" />
                      <span>معلومات الدورة</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Calendar className="h-5 w-5 text-gray-600" />
                        <span className="text-sm">الموعد الأسبوعي: {course.schedule}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <User className="h-5 w-5 text-gray-600" />
                        <span className="text-sm">المعلم: {course.instructor}</span>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          تواصل
                        </Button>
                      </div>
                      
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <User className="h-5 w-5 text-gray-600" />
                        <span className="text-sm">مشرف الدورة: {course.supervisor}</span>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          تواصل مع المشرف
                        </Button>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">التقدم في الدورة</span>
                          <span className="text-sm text-blue-600">
                            {course.sessionsCompleted}/{course.totalSessions} جلسة
                          </span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(course.sessionsCompleted / course.totalSessions) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      {!course.isPaymentOverdue && (
                        <div className="bg-green-50 p-4 rounded-lg">
                          <Button className="w-full flex items-center space-x-2 rtl:space-x-reverse">
                            <Video className="h-4 w-4" />
                            <span>الانضمام للقاء الأونلاين</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                      <DollarSign className="h-5 w-5" />
                      <span>الماليات</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {course.paymentAmount} ريال
                        </div>
                        <p className="text-sm text-gray-600">المبلغ المطلوب</p>
                      </div>
                      
                      <div className="text-center">
                        <Badge 
                          variant={course.paymentStatus === 'completed' ? 'default' : 'destructive'}
                          className="mb-2"
                        >
                          {course.paymentStatus === 'completed' ? 'تم الدفع' : 'لم يتم الدفع'}
                        </Badge>
                        <p className="text-xs text-gray-600">
                          موعد الاستحقاق: {course.paymentDueDate}
                        </p>
                      </div>

                      {course.paymentStatus !== 'completed' && (
                        <div className="space-y-3">
                          <Button className="w-full">
                            دفع المصروفات
                          </Button>
                          
                          <div className="border-t pt-3">
                            <label className="block text-sm font-medium mb-2">
                              إرفاق إثبات الدفع
                            </label>
                            <Input
                              type="file"
                              accept="image/*,.pdf"
                              onChange={handleFileUpload}
                              className="mb-2"
                            />
                            {paymentProof && (
                              <p className="text-xs text-green-600">
                                تم اختيار: {paymentProof.name}
                              </p>
                            )}
                            <Button variant="outline" size="sm" className="w-full">
                              <Upload className="h-4 w-4 mr-2" />
                              إرسال الإثبات
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="bg-red-50 p-3 rounded-lg">
                        <div className="flex items-start space-x-2 rtl:space-x-reverse">
                          <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                          <p className="text-xs text-red-700">
                            عدم دفع المصروفات حتى يوم 10 في الشهر يحجب كل ما في المنصة 
                            باستثناء قسم الدفع والتواصل مع مشرف الدورة.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sessions */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>ملخصات الجلسات</CardTitle>
                  <CardDescription>
                    عرض الجلسات السابقة والمواد التعليمية
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div key={session.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{session.title}</h4>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            {session.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <Clock className="h-4 w-4 text-yellow-600" />
                            )}
                            <span className="text-sm text-gray-600">{session.date}</span>
                          </div>
                        </div>
                        
                        {session.summary && (
                          <p className="text-sm text-gray-700 mb-3">{session.summary}</p>
                        )}
                        
                        {session.materials.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium">المواد التعليمية:</p>
                            {session.materials.map((material, index) => (
                              <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                                <FileText className="h-4 w-4 text-blue-600" />
                                <span className="text-sm">{material}</span>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Assignments */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>التكاليف والتقييمات</CardTitle>
                  <CardDescription>
                    الواجبات والاختبارات المطلوبة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignments.map((assignment) => (
                      <div key={assignment.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{assignment.title}</h4>
                          <Badge 
                            variant={assignment.status === 'completed' ? 'default' : 'secondary'}
                          >
                            {assignment.status === 'completed' ? 'مكتمل' : 'مطلوب'}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">
                          موعد التسليم: {assignment.dueDate}
                        </p>
                        
                        {assignment.grade && (
                          <div className="bg-green-50 p-3 rounded-lg mb-3">
                            <p className="text-sm font-medium text-green-800">
                              الدرجة: {assignment.grade}%
                            </p>
                            {assignment.feedback && (
                              <p className="text-sm text-green-700 mt-1">
                                التعليق: {assignment.feedback}
                              </p>
                            )}
                          </div>
                        )}
                        
                        {assignment.status === 'pending' && (
                          <div className="space-y-3">
                            <Textarea placeholder="اكتب إجابتك هنا..." />
                            <div className="flex space-x-2 rtl:space-x-reverse">
                              <Button size="sm">تسليم الواجب</Button>
                              <Button variant="outline" size="sm">
                                <Upload className="h-4 w-4 mr-2" />
                                إرفاق ملف
                              </Button>
                            </div>
                          </div>
                        )}
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

export default CourseDetails;
