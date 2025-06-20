
import { Helmet } from "react-helmet-async";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { useEnrollments } from '@/hooks/useEnrollments';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import StatsCards from '@/components/dashboard/StatsCards';
import ProgressChart from '@/components/dashboard/ProgressChart';
import RecentActivity from '@/components/dashboard/RecentActivity';
import UpcomingAssignments from '@/components/dashboard/UpcomingAssignments';
import UpcomingSessions from '@/components/dashboard/UpcomingSessions';
import QuickActions from '@/components/dashboard/QuickActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Video, FileText, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const { enrollments, isLoading: enrollmentsLoading, error: enrollmentsError } = useEnrollments(user?.id);
  const navigate = useNavigate();

  console.log('Dashboard render - User:', user?.id, 'Profile:', profile?.full_name, 'Loading:', loading);
  console.log('Enrollments:', enrollments, 'Loading:', enrollmentsLoading, 'Error:', enrollmentsError);

  // Show loading spinner while authentication is loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if no user (this will be handled by ProtectedRoute)
  if (!user) {
    console.log('No user found, ProtectedRoute should handle redirect');
    return null;
  }

  const stats = {
    totalCourses: enrollments?.length || 0,
    activeCourses: enrollments?.filter(e => e.status === 'approved').length || 0,
    completedCourses: enrollments?.filter(e => e.status === 'completed').length || 0,
    pendingCourses: enrollments?.filter(e => e.status === 'pending').length || 0,
  };

  return (
    <ProtectedRoute>
      <Helmet>
        <title>لوحة التحكم - مركز إقامة الكتاب</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              {/* Welcome Section */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  مرحباً، {profile?.full_name || 'مستخدم'}
                </h1>
                <p className="text-gray-600">
                  نظرة عامة على نشاطك التعليمي في مركز إقامة الكتاب
                </p>
              </div>

              {/* Stats Cards */}
              <StatsCards stats={stats} userRole={profile?.role} />

              {/* Charts Section - Only show if we have data */}
              {enrollments && enrollments.length > 0 && (
                <ProgressChart enrollments={enrollments} userRole={profile?.role} />
              )}

              {/* Quick Actions */}
              <div className="mb-8">
                <QuickActions userRole={profile?.role} />
              </div>

              {/* Content Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/courses')}>
                  <CardContent className="p-6 text-center">
                    <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-1">الدورات</h3>
                    <p className="text-sm text-gray-600">عرض جميع دوراتك</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/courses')}>
                  <CardContent className="p-6 text-center">
                    <Video className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-1">الجلسات</h3>
                    <p className="text-sm text-gray-600">جلسات مباشرة ومسجلة</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/courses')}>
                  <CardContent className="p-6 text-center">
                    <FileText className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-1">الواجبات</h3>
                    <p className="text-sm text-gray-600">تسليم وتقييم الواجبات</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/performance')}>
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-1">الأداء</h3>
                    <p className="text-sm text-gray-600">تقارير وإحصائيات</p>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Courses - Spans 2 columns */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>الدورات الحديثة</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {enrollmentsLoading ? (
                        <div className="flex items-center justify-center p-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          <span className="mr-3 text-gray-600">جاري تحميل الدورات...</span>
                        </div>
                      ) : enrollmentsError ? (
                        <div className="text-center p-8">
                          <p className="text-red-500 mb-2">حدث خطأ في تحميل البيانات</p>
                          <p className="text-sm text-gray-500">يرجى إعادة تحميل الصفحة</p>
                          <button 
                            onClick={() => window.location.reload()} 
                            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            إعادة التحميل
                          </button>
                        </div>
                      ) : enrollments && enrollments.length > 0 ? (
                        <div className="space-y-4">
                          {enrollments.slice(0, 5).map((enrollment) => (
                            <div key={enrollment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900">{enrollment.course?.title || 'دورة غير محددة'}</h4>
                                  <p className="text-sm text-gray-600 mt-1">
                                    المدرب: {enrollment.course?.instructor?.full_name || 'غير محدد'}
                                  </p>
                                </div>
                                <div className="text-right flex flex-col items-end space-y-2">
                                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                    enrollment.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    enrollment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    enrollment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {enrollment.status === 'approved' && 'مقبول'}
                                    {enrollment.status === 'pending' && 'قيد الانتظار'}
                                    {enrollment.status === 'completed' && 'مكتمل'}
                                    {enrollment.status === 'rejected' && 'مرفوض'}
                                  </span>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => navigate(`/course/${enrollment.course_id}`)}
                                  >
                                    عرض التفاصيل
                                  </Button>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {new Date(enrollment.enrollment_date).toLocaleDateString('ar-SA')}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center p-8">
                          <p className="text-gray-500 mb-3">لا توجد دورات مسجل بها حالياً</p>
                          <button 
                            onClick={() => navigate('/apply-course')} 
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            تسجيل في دورة جديدة
                          </button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar Content */}
                <div className="space-y-6">
                  {/* Upcoming Sessions */}
                  <UpcomingSessions />
                  
                  {/* Recent Activity */}
                  <RecentActivity enrollments={enrollments || []} />
                  
                  {profile?.role === 'student' && (
                    <UpcomingAssignments />
                  )}

                  {/* Learning Tips */}
                  <Card>
                    <CardHeader>
                      <CardTitle>نصائح تعليمية</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-b pb-3 last:border-b-0">
                          <h4 className="font-medium">حافظ على التفاعل</h4>
                          <p className="text-sm text-gray-600">
                            شارك في المناقشات والأنشطة التفاعلية
                          </p>
                        </div>
                        <div className="border-b pb-3 last:border-b-0">
                          <h4 className="font-medium">راجع المواد بانتظام</h4>
                          <p className="text-sm text-gray-600">
                            خصص وقتاً يومياً لمراجعة ما تعلمته
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium">اطلب المساعدة</h4>
                          <p className="text-sm text-gray-600">
                            لا تتردد في طرح الأسئلة على المدربين
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
