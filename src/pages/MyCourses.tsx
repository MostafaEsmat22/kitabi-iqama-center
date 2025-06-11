
import { Helmet } from "react-helmet-async";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useEnrollments } from '@/hooks/useEnrollments';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {
  const { user } = useAuth();
  const { enrollments, isLoading } = useEnrollments(user?.id);
  const navigate = useNavigate();

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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  دوراتي
                </h1>
                <p className="text-gray-600">
                  عرض جميع الدورات المسجل بها
                </p>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                      <div className="h-6 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : enrollments && enrollments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrollments.map((enrollment) => {
                    const course = enrollment.course;
                    const statusInfo = getStatusBadge(enrollment.status || 'pending');
                    
                    return (
                      <Card key={enrollment.id} className="h-full hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{course?.title}</CardTitle>
                            <Badge variant={statusInfo.variant}>
                              {statusInfo.label}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-600 text-sm">
                            {course?.description}
                          </p>
                          
                          <div className="space-y-2 text-sm text-gray-600">
                            {course?.start_date && (
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  من {new Date(course.start_date).toLocaleDateString('ar-SA')} 
                                  إلى {new Date(course.end_date).toLocaleDateString('ar-SA')}
                                </span>
                              </div>
                            )}
                            {course?.duration_weeks && (
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{course.duration_weeks} أسبوع</span>
                              </div>
                            )}
                            {course?.instructor && (
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
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

                          {enrollment.status === 'approved' && (
                            <Button 
                              className="w-full"
                              onClick={() => handleCourseClick(course?.id || '')}
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
                  <p className="text-gray-500 text-lg">
                    لم تقم بالتسجيل في أي دورة بعد
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

export default MyCourses;
