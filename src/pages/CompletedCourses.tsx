
import { Helmet } from "react-helmet-async";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { GraduationCap, Calendar, Award } from 'lucide-react';

const CompletedCourses = () => {
  // Dummy data for completed courses
  const completedCourses = [
    {
      id: '1',
      title: 'دورة أساسيات التجويد',
      completionDate: '2024-05-15',
      grade: 95,
      certificate: 'available',
      instructor: 'الشيخ أحمد محمد'
    },
    {
      id: '2',
      title: 'دورة السيرة النبوية',
      completionDate: '2024-04-20',
      grade: 88,
      certificate: 'available',
      instructor: 'الدكتور محمد علي'
    }
  ];

  return (
    <ProtectedRoute>
      <Helmet>
        <title>الدورات المكتملة - مركز إقامة الكتاب</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  الدورات المكتملة
                </h1>
                <p className="text-gray-600">
                  مراجعة الدورات التي أكملتها وتحميل الشهادات
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {completedCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                          <GraduationCap className="h-5 w-5" />
                          <span>{course.title}</span>
                        </CardTitle>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          مكتملة
                        </Badge>
                      </div>
                      <CardDescription>
                        المدرب: {course.instructor}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>تاريخ الإكمال: {course.completionDate}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Award className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">الدرجة: {course.grade}%</span>
                          </div>
                          {course.certificate === 'available' && (
                            <Badge variant="outline" className="text-blue-600 border-blue-600">
                              الشهادة متاحة
                            </Badge>
                          )}
                        </div>
                        
                        <div className="pt-4 border-t">
                          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                            تحميل الشهادة
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {completedCourses.length === 0 && (
                <div className="text-center py-12">
                  <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    لا توجد دورات مكتملة
                  </h3>
                  <p className="text-gray-600">
                    ستظهر هنا الدورات التي أكملتها بنجاح
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

export default CompletedCourses;
