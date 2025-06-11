
import { Helmet } from "react-helmet-async";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { useEnrollments } from '@/hooks/useEnrollments';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { BookOpen, GraduationCap, Clock, Trophy } from 'lucide-react';

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const { enrollments, loading: enrollmentsLoading } = useEnrollments(user?.id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
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
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  مرحباً، {profile?.full_name || 'مستخدم'}
                </h1>
                <p className="text-gray-600">
                  نظرة عامة على نشاطك التعليمي
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      إجمالي الدورات
                    </CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalCourses}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      الدورات النشطة
                    </CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.activeCourses}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      الدورات المكتملة
                    </CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.completedCourses}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      في انتظار الموافقة
                    </CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.pendingCourses}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>الدورات الحديثة</CardTitle>
                    <CardDescription>آخر الدورات المسجل بها</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {enrollmentsLoading ? (
                      <div className="flex items-center justify-center p-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                    ) : enrollments && enrollments.length > 0 ? (
                      <div className="space-y-4">
                        {enrollments.slice(0, 3).map((enrollment) => (
                          <div key={enrollment.id} className="border-b pb-3 last:border-b-0">
                            <h4 className="font-medium">{enrollment.course?.title || 'دورة غير محددة'}</h4>
                            <p className="text-sm text-gray-600">
                              {enrollment.status === 'approved' && 'مقبول'}
                              {enrollment.status === 'pending' && 'في انتظار الموافقة'}
                              {enrollment.status === 'completed' && 'مكتمل'}
                              {enrollment.status === 'rejected' && 'مرفوض'}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">لا توجد دورات مسجل بها</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>نصائح تعليمية</CardTitle>
                    <CardDescription>نصائح لتحسين تجربتك التعليمية</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-b pb-3">
                        <h4 className="font-medium">حافظ على التفاعل</h4>
                        <p className="text-sm text-gray-600">
                          شارك في المناقشات والأنشطة التفاعلية
                        </p>
                      </div>
                      <div className="border-b pb-3">
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
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
