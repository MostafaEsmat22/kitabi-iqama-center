
import { Helmet } from "react-helmet-async";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useEnrollments } from '@/hooks/useEnrollments';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { Calendar, Clock, User, ArrowLeft, BookOpen, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {
  const { user, loading: authLoading } = useAuth();
  const { enrollments, isLoading, error } = useEnrollments(user?.id);
  const navigate = useNavigate();

  console.log('MyCourses - user:', user?.id, 'authLoading:', authLoading, 'enrollments:', enrollments, 'isLoading:', isLoading);

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: 'في انتظار الموافقة', variant: 'secondary' as const },
      approved: { label: 'مقبول', variant: 'default' as const },
      rejected: { label: 'مرفوض', variant: 'destructive' as const },
      completed: { label: 'مكتمل', variant: 'outline' as const },
    };
    
    return statusMap[status as keyof typeof statusMap] || statusMap.pending;
  };

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  // Show loading spinner while authentication is loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل بيانات المستخدم...</p>
        </div>
      </div>
    );
  }

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="h-full">
          <CardHeader>
            <div className="flex justify-between items-start">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-16" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <ProtectedRoute>
      <Helmet>
        <title>دوراتي - مركز إقامة الكتاب</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  دوراتي
                </h1>
                <p className="text-gray-600">
                  عرض جميع الدورات المسجل بها
                </p>
              </div>

              {/* Error State */}
              {error && (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    حدث خطأ في تحميل البيانات
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {error instanceof Error ? error.message : 'خطأ غير معروف'}
                  </p>
                  <Button 
                    onClick={() => window.location.reload()} 
                    className="mx-auto"
                  >
                    إعادة المحاولة
                  </Button>
                </div>
              )}

              {/* Loading State */}
              {isLoading && !error && <LoadingSkeleton />}

              {/* Content */}
              {!isLoading && !error && (
                <>
                  {enrollments && enrollments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {enrollments.map((enrollment) => {
                        const course = enrollment.course;
                        const statusInfo = getStatusBadge(enrollment.status || 'pending');
                        
                        return (
                          <Card key={enrollment.id} className="h-full hover:shadow-md transition-shadow">
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">
                                  {course?.title || 'دورة غير محددة'}
                                </CardTitle>
                                <Badge variant={statusInfo.variant}>
                                  {statusInfo.label}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <p className="text-gray-600 text-sm">
                                {course?.description || 'لا يوجد وصف متاح'}
                              </p>
                              
                              <div className="space-y-2 text-sm text-gray-600">
                                {course?.start_date && course?.end_date && (
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 flex-shrink-0" />
                                    <span>
                                      من {new Date(course.start_date).toLocaleDateString('ar-SA')} 
                                      إلى {new Date(course.end_date).toLocaleDateString('ar-SA')}
                                    </span>
                                  </div>
                                )}
                                {course?.duration_weeks && (
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 flex-shrink-0" />
                                    <span>{course.duration_weeks} أسبوع</span>
                                  </div>
                                )}
                                {course?.instructor && (
                                  <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 flex-shrink-0" />
                                    <span>المدرب: {course.instructor.full_name}</span>
                                  </div>
                                )}
                              </div>

                              {enrollment.grade && (
                                <div className="bg-green-50 p-3 rounded-lg">
                                  <p className="text-green-800 font-semibold">
                                    الدرجة: {enrollment.grade}%
                                  </p>
                                </div>
                              )}
                              
                              <div className="text-xs text-gray-500">
                                تاريخ التسجيل: {new Date(enrollment.enrollment_date || '').toLocaleDateString('ar-SA')}
                              </div>

                              {enrollment.status === 'approved' && course?.id && (
                                <Button 
                                  className="w-full"
                                  onClick={() => handleCourseClick(course.id)}
                                >
                                  <span>عرض تفاصيل الدورة</span>
                                  <ArrowLeft className="h-4 w-4 mr-2" />
                                </Button>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        لم تقم بالتسجيل في أي دورة بعد
                      </h3>
                      <p className="text-gray-600 mb-4">
                        ابدأ رحلتك التعليمية بالتسجيل في دورة جديدة
                      </p>
                      <Button 
                        onClick={() => navigate('/apply-course')}
                        className="mx-auto"
                      >
                        تسجيل في دورة جديدة
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default MyCourses;
