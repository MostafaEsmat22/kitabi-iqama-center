
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, FileText, AlertCircle } from 'lucide-react';

const UpcomingAssignments = () => {
  // Mock assignments data
  const assignments = [
    {
      id: 1,
      title: 'تلخيص سورة البقرة',
      course: 'دورة التفسير',
      dueDate: '2024-06-15',
      dueTime: '23:59',
      priority: 'high',
      status: 'pending',
    },
    {
      id: 2,
      title: 'حفظ 10 أحاديث',
      course: 'دورة الحديث',
      dueDate: '2024-06-18',
      dueTime: '18:00',
      priority: 'medium',
      status: 'in-progress',
    },
    {
      id: 3,
      title: 'بحث في أحكام الصلاة',
      course: 'دورة الفقه',
      dueDate: '2024-06-22',
      dueTime: '12:00',
      priority: 'low',
      status: 'pending',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'عاجل';
      case 'medium': return 'متوسط';
      case 'low': return 'عادي';
      default: return 'غير محدد';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>الواجبات القادمة</span>
          <Badge variant="secondary" className="text-xs">
            {assignments.length} واجب
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignments.map((assignment) => {
            const daysLeft = getDaysUntilDue(assignment.dueDate);
            return (
              <div key={assignment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{assignment.title}</h4>
                    <p className="text-sm text-gray-600">{assignment.course}</p>
                  </div>
                  <Badge className={getPriorityColor(assignment.priority)}>
                    {getPriorityText(assignment.priority)}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Calendar className="h-4 w-4" />
                      <span>{assignment.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Clock className="h-4 w-4" />
                      <span>{assignment.dueTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    {daysLeft <= 2 && (
                      <div className="flex items-center text-red-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span className="text-xs">
                          {daysLeft === 0 ? 'اليوم' : daysLeft === 1 ? 'غداً' : `${daysLeft} أيام`}
                        </span>
                      </div>
                    )}
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-1" />
                      عرض
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <Button variant="ghost" className="w-full text-center text-blue-600 hover:text-blue-800">
            عرض جميع الواجبات
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingAssignments;
