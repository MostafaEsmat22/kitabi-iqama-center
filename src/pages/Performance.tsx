
import { Helmet } from "react-helmet-async";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { BarChart3, TrendingUp, Award, Target } from 'lucide-react';

const Performance = () => {
  // Dummy performance data
  const performanceData = {
    overallGrade: 88,
    attendanceRate: 95,
    assignmentsCompleted: 12,
    totalAssignments: 15,
    currentStreak: 7
  };

  return (
    <ProtectedRoute>
      <Helmet>
        <title>التقييم والأداء - مركز إقامة الكتاب</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  التقييم والأداء
                </h1>
                <p className="text-gray-600">
                  متابعة تقدمك الأكاديمي وأدائك في الدورات
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      المعدل العام
                    </CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{performanceData.overallGrade}%</div>
                    <p className="text-xs text-muted-foreground">
                      +2% من الشهر الماضي
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      معدل الحضور
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{performanceData.attendanceRate}%</div>
                    <p className="text-xs text-muted-foreground">
                      ممتاز
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      الواجبات المكتملة
                    </CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{performanceData.assignmentsCompleted}/{performanceData.totalAssignments}</div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((performanceData.assignmentsCompleted / performanceData.totalAssignments) * 100)}% مكتمل
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      سلسلة النجاح
                    </CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{performanceData.currentStreak}</div>
                    <p className="text-xs text-muted-foreground">
                      أيام متتالية
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>أداء الدورات</CardTitle>
                    <CardDescription>تقييمك في كل دورة</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">دورة التجويد</span>
                        <span className="text-sm font-bold text-green-600">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">دورة السيرة النبوية</span>
                        <span className="text-sm font-bold text-blue-600">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>الإنجازات الأخيرة</CardTitle>
                    <CardDescription>آخر النجاحات التي حققتها</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Award className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">أكمل 10 واجبات متتالية</p>
                          <p className="text-xs text-gray-600">منذ 3 أيام</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">حصل على 95% في اختبار التجويد</p>
                          <p className="text-xs text-gray-600">منذ أسبوع</p>
                        </div>
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

export default Performance;
