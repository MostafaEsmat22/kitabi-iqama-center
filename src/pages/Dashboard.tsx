
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
import QuickActions from '@/components/dashboard/QuickActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const { enrollments, isLoading: enrollmentsLoading, error: enrollmentsError } = useEnrollments(user?.id);

  console.log('Dashboard render - User:', user?.id, 'Profile:', profile?.full_name, 'Loading:', loading);
  console.log('Enrollments:', enrollments, 'Loading:', enrollmentsLoading, 'Error:', enrollmentsError);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    console.log('No user found, should redirect to auth');
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

              {/* Charts Section */}
              {enrollments && enrollments.length > 0 && (
                <ProgressChart enrollments={enrollments} userRole={profile?.role} />
              )}

              {/* Quick Actions */}
              <div className="mb-8">
                <QuickActions userRole={profile?.role} />
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
                        </div>
                      ) : enrollmentsError ? (
                        <div className="text-center p-8">
                          <p className="text-red-500">حدث خطأ في تحميل البيانات</p>
                          <p className="text-sm text-gray-500 mt-2">يرجى إعادة تحميل الصفحة</p>
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
                                <div className="text-right">
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
                          <p className="text-gray-500">لا توجد دورات مسجل بها</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar Content */}
                <div className="space-y-6">
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
