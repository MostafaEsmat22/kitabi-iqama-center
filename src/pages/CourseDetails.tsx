
import { Helmet } from "react-helmet-async";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
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
  CheckCircle,
  Users,
  Target,
  TrendingUp
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCourseDetails } from '@/hooks/useCourseDetails';
import { useEnrollments } from '@/hooks/useEnrollments';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

const CourseDetails = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const { profile } = useAuth();
  const { courseDetails, isLoading, error } = useCourseDetails(courseId!);
  const { enrollInCourse, isEnrolling } = useEnrollments(profile?.id);

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex">
          <Sidebar />
          <div className="flex-1">
            <Header />
            <main className="p-6">
              <div className="max-w-6xl mx-auto space-y-6">
                <Skeleton className="h-8 w-96" />
                <Skeleton className="h-4 w-full" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Skeleton className="h-96 lg:col-span-2" />
                  <Skeleton className="h-96" />
                </div>
              </div>
            </main>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error || !courseDetails) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex">
          <Sidebar />
          <div className="flex-1">
            <Header />
            <main className="p-6">
              <div className="max-w-6xl mx-auto">
                <Card>
                  <CardContent className="p-8 text-center">
                    <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      خطأ في تحميل تفاصيل الدورة
                    </h3>
                    <p className="text-gray-600">
                      {error?.message || 'لم يتم العثور على الدورة المطلوبة'}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </main>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const { course, enrollment, stats, instructor, progress } = courseDetails;
  const isEnrolled = !!enrollment;
  const isApproved = enrollment?.status === 'approved';
  const isTeacher = profile?.role === 'teacher' && course.instructor_id === profile.id;
  const isAdmin = profile?.role === 'admin';
  const canAccessContent = isApproved || isTeacher || isAdmin;

  const progressPercentage = stats.total_sessions > 0 
    ? (stats.completed_sessions / stats.total_sessions) * 100 
    : 0;

  const handleEnrollment = () => {
    if (profile?.id && courseId) {
      enrollInCourse({ courseId, studentId: profile.id });
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <Calendar className="h-5 w-5 text-gray-600" />
                          <div>
                            <p className="text-sm font-medium">تاريخ البداية</p>
                            <p className="text-sm text-gray-600">
                              {format(new Date(course.start_date), 'PPP', { locale: ar })}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <Calendar className="h-5 w-5 text-gray-600" />
                          <div>
                            <p className="text-sm font-medium">تاريخ النهاية</p>
                            <p className="text-sm text-gray-600">
                              {format(new Date(course.end_date), 'PPP', { locale: ar })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <Clock className="h-5 w-5 text-gray-600" />
                          <div>
                            <p className="text-sm font-medium">مدة الدورة</p>
                            <p className="text-sm text-gray-600">{course.duration_weeks} أسبوع</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <Users className="h-5 w-5 text-gray-600" />
                          <div>
                            <p className="text-sm font-medium">عدد الطلاب</p>
                            <p className="text-sm text-gray-600">
                              {stats.approved_students} / {course.max_students}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <User className="h-5 w-5 text-gray-600" />
                        <span className="text-sm">المعلم: {instructor?.full_name || 'غير محدد'}</span>
                        {instructor?.phone && (
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            تواصل
                          </Button>
                        )}
                      </div>
                      
                      {canAccessContent && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">التقدم في الدورة</span>
                            <span className="text-sm text-blue-600">
                              {stats.completed_sessions}/{stats.total_sessions} جلسة
                            </span>
                          </div>
                          <div className="w-full bg-blue-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${progressPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {!isEnrolled && profile?.role === 'student' && (
                        <div className="bg-green-50 p-4 rounded-lg">
                          <Button 
                            className="w-full" 
                            onClick={handleEnrollment}
                            disabled={isEnrolling}
                          >
                            {isEnrolling ? 'جاري التسجيل...' : 'سجل في الدورة'}
                          </Button>
                        </div>
                      )}

                      {isEnrolled && !isApproved && (
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Clock className="h-4 w-4 text-yellow-600" />
                            <p className="text-sm text-yellow-700">
                              تم التسجيل في الدورة، في انتظار موافقة المدرب
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Stats & Payment Section */}
                <div className="space-y-6">
                  {/* Price Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                        <DollarSign className="h-5 w-5" />
                        <span>الرسوم</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {course.price} ريال
                        </div>
                        <p className="text-sm text-gray-600">رسوم الدورة</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Course Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Target className="h-5 w-5" />
                        <span>إحصائيات الدورة</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">الجلسات</span>
                          <span className="text-sm font-medium">{stats.total_sessions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">الواجبات</span>
                          <span className="text-sm font-medium">{stats.total_assignments}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">الطلاب المسجلين</span>
                          <span className="text-sm font-medium">{stats.approved_students}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Student Progress */}
                  {progress && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                          <TrendingUp className="h-5 w-5" />
                          <span>تقدمك</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">معدل الحضور</span>
                            <span className="text-sm font-medium">{progress.attendance_rate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">الواجبات المكتملة</span>
                            <span className="text-sm font-medium">
                              {progress.assignments_completed}/{progress.assignments_total}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">متوسط الدرجات</span>
                            <span className="text-sm font-medium">{progress.average_score}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* Course Content Tabs */}
              {canAccessContent ? (
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
                    <CourseMaterials materials={[]} userRole={profile?.role} />
                  </TabsContent>
                  
                  <TabsContent value="progress" className="mt-6">
                    {progress ? (
                      <Card>
                        <CardHeader>
                          <CardTitle>تقرير التقدم التفصيلي</CardTitle>
                          <CardDescription>تفاصيل أدائك في الدورة</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">
                                  {progress.sessions_attended}
                                </div>
                                <p className="text-sm text-gray-600">جلسات حضرتها</p>
                              </div>
                              <div className="text-center p-4 bg-green-50 rounded-lg">
                                <div className="text-2xl font-bold text-green-600">
                                  {progress.attendance_rate}%
                                </div>
                                <p className="text-sm text-gray-600">معدل الحضور</p>
                              </div>
                              <div className="text-center p-4 bg-orange-50 rounded-lg">
                                <div className="text-2xl font-bold text-orange-600">
                                  {progress.average_score}
                                </div>
                                <p className="text-sm text-gray-600">متوسط الدرجات</p>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <h4 className="font-medium">إنجازات الدورة</h4>
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                  <span className="text-sm">
                                    حضر {progress.sessions_attended} جلسة من أصل {progress.sessions_total}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                  <span className="text-sm">
                                    أكمل {progress.assignments_completed} واجب من أصل {progress.assignments_total}
                                  </span>
                                </div>
                                {progress.assignments_completed < progress.assignments_total && (
                                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <Clock className="h-4 w-4 text-yellow-600" />
                                    <span className="text-sm">
                                      يحتاج لتسليم {progress.assignments_total - progress.assignments_completed} واجب
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card>
                        <CardContent className="p-8 text-center">
                          <p className="text-gray-500">لا توجد بيانات تقدم متاحة</p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      يتطلب التسجيل في الدورة
                    </h3>
                    <p className="text-gray-600 mb-4">
                      يجب التسجيل في الدورة والحصول على موافقة المدرب لعرض المحتوى
                    </p>
                    {!isEnrolled && profile?.role === 'student' && (
                      <Button onClick={handleEnrollment} disabled={isEnrolling}>
                        {isEnrolling ? 'جاري التسجيل...' : 'سجل في الدورة الآن'}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CourseDetails;
