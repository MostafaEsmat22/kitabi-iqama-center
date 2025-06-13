
import { Helmet } from "react-helmet-async";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import SessionsList from '@/components/dashboard/SessionsList';
import AssignmentsList from '@/components/dashboard/AssignmentsList';
import CourseMaterials from '@/components/dashboard/CourseMaterials';
import { 
  BookOpen, 
  Calendar, 
  User, 
  MessageSquare, 
  DollarSign, 
  Video,
  AlertTriangle,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const CourseDetails = () => {
  const { courseId } = useParams();
  const { profile } = useAuth();

  // Mock course data - في التطبيق الحقيقي، ستجلب هذه البيانات من قاعدة البيانات
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
    isPaymentOverdue: false,
    description: 'دورة شاملة في أساسيات علم التجويد وتطبيقاته العملية',
    materials: [
      'كتاب أساسيات التجويد.pdf',
      'ملخص الأحكام.docx',
      'تسجيلات الأمثلة.mp3',
      'خريطة الأحكام.jpg'
    ]
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
                  {course.description}
                </p>
              </div>

              {/* Course Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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
                        <Button className="w-full">
                          دفع المصروفات
                        </Button>
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

              {/* Course Content Tabs */}
              <Tabs defaultValue="sessions" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="sessions">الجلسات</TabsTrigger>
                  <TabsTrigger value="assignments">الواجبات</TabsTrigger>
                  <TabsTrigger value="materials">المواد</TabsTrigger>
                  <TabsTrigger value="progress">التقدم</TabsTrigger>
                </TabsList>
                
                <TabsContent value="sessions" className="mt-6">
                  <SessionsList courseId={courseId!} userRole={profile?.role} />
                </TabsContent>
                
                <TabsContent value="assignments" className="mt-6">
                  <AssignmentsList courseId={courseId!} userRole={profile?.role} />
                </TabsContent>
                
                <TabsContent value="materials" className="mt-6">
                  <CourseMaterials materials={course.materials} userRole={profile?.role} />
                </TabsContent>
                
                <TabsContent value="progress" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>تقرير التقدم</CardTitle>
                      <CardDescription>تفاصيل أدائك في الدورة</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{course.sessionsCompleted}</div>
                            <p className="text-sm text-gray-600">جلسات مكتملة</p>
                          </div>
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">85%</div>
                            <p className="text-sm text-gray-600">معدل الحضور</p>
                          </div>
                          <div className="text-center p-4 bg-orange-50 rounded-lg">
                            <div className="text-2xl font-bold text-orange-600">92</div>
                            <p className="text-sm text-gray-600">متوسط الدرجات</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-medium">إنجازات الدورة</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm">أكمل 8 جلسات من أصل 12</span>
                            </div>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm">سلم 5 واجبات من أصل 6</span>
                            </div>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <Clock className="h-4 w-4 text-yellow-600" />
                              <span className="text-sm">يحتاج لتسليم واجب واحد</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CourseDetails;
