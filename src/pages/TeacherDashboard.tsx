
import { Helmet } from "react-helmet-async";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Video, FileText, Users, BarChart3 } from 'lucide-react';
import CreateCourseForm from '@/components/forms/CreateCourseForm';
import CreateSessionForm from '@/components/forms/CreateSessionForm';
import CreateAssignmentForm from '@/components/forms/CreateAssignmentForm';
import { useCourses } from '@/hooks/useCourses';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const { user, profile, loading } = useAuth();
  const { courses } = useCourses();
  const navigate = useNavigate();

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

  // Redirect if not a teacher
  if (profile?.role !== 'teacher') {
    navigate('/dashboard');
    return null;
  }

  const teacherCourses = courses?.filter(course => course.instructor_id === user?.id) || [];
  const totalStudents = teacherCourses.reduce((sum, course) => sum + (course.max_students || 0), 0);

  return (
    <ProtectedRoute>
      <Helmet>
        <title>لوحة تحكم المدرب - مركز إقامة الكتاب</title>
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
                  مرحباً، {profile?.full_name || 'مدرب'}
                </h1>
                <p className="text-gray-600">
                  إدارة دوراتك وجلساتك التعليمية
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <BookOpen className="h-8 w-8 text-blue-600" />
                      <div className="mr-4">
                        <p className="text-2xl font-bold text-gray-900">{teacherCourses.length}</p>
                        <p className="text-sm text-gray-600">دوراتي</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Users className="h-8 w-8 text-green-600" />
                      <div className="mr-4">
                        <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
                        <p className="text-sm text-gray-600">إجمالي الطلاب</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Video className="h-8 w-8 text-purple-600" />
                      <div className="mr-4">
                        <p className="text-2xl font-bold text-gray-900">0</p>
                        <p className="text-sm text-gray-600">جلسات اليوم</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-orange-600" />
                      <div className="mr-4">
                        <p className="text-2xl font-bold text-gray-900">0</p>
                        <p className="text-sm text-gray-600">واجبات معلقة</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content Tabs */}
              <Tabs defaultValue="courses" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="courses">إدارة الدورات</TabsTrigger>
                  <TabsTrigger value="sessions">إدارة الجلسات</TabsTrigger>
                  <TabsTrigger value="assignments">إدارة الواجبات</TabsTrigger>
                  <TabsTrigger value="students">إدارة الطلاب</TabsTrigger>
                </TabsList>

                <TabsContent value="courses" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <CreateCourseForm />
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>دوراتي الحالية</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {teacherCourses.length === 0 ? (
                          <div className="text-center p-6">
                            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-500">لا توجد دورات حالياً</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {teacherCourses.map((course) => (
                              <div key={course.id} className="border rounded-lg p-4">
                                <h4 className="font-medium text-gray-900">{course.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                                <div className="flex items-center justify-between mt-3">
                                  <span className="text-sm text-gray-500">
                                    {course.duration_weeks} أسابيع
                                  </span>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => navigate(`/course/${course.id}`)}
                                  >
                                    عرض التفاصيل
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="sessions">
                  <CreateSessionForm />
                </TabsContent>

                <TabsContent value="assignments">
                  <CreateAssignmentForm />
                </TabsContent>

                <TabsContent value="students">
                  <Card>
                    <CardHeader>
                      <CardTitle>إدارة الطلاب</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center p-8">
                        <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">سيتم إضافة إدارة الطلاب قريباً</p>
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

export default TeacherDashboard;
