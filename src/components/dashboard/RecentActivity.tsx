
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen, Award, Bell } from 'lucide-react';

interface RecentActivityProps {
  enrollments: any[];
}

const RecentActivity = ({ enrollments }: RecentActivityProps) => {
  // Mock recent activities
  const activities = [
    {
      id: 1,
      type: 'enrollment',
      title: 'تم قبولك في دورة القرآن الكريم',
      time: 'منذ ساعتين',
      icon: BookOpen,
      color: 'bg-green-100 text-green-600',
    },
    {
      id: 2,
      type: 'assignment',
      title: 'واجب جديد في دورة التفسير',
      time: 'منذ 4 ساعات',
      icon: Bell,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      id: 3,
      type: 'completion',
      title: 'تم إكمال دورة الحديث الشريف',
      time: 'أمس',
      icon: Award,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      id: 4,
      type: 'reminder',
      title: 'تذكير: جلسة مباشرة في دورة الفقه',
      time: 'منذ يومين',
      icon: Clock,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>الأنشطة الحديثة</span>
          <Badge variant="secondary" className="text-xs">
            {activities.length} نشاط
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 rtl:space-x-reverse">
              <div className={`p-2 rounded-full ${activity.color} flex-shrink-0`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            عرض جميع الأنشطة
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
