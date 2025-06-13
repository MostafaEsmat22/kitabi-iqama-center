
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen, Award, Bell, CheckCircle, AlertTriangle } from 'lucide-react';

interface RecentActivityProps {
  enrollments: any[];
}

const RecentActivity = ({ enrollments }: RecentActivityProps) => {
  // Generate activities from real enrollments data
  const generateActivities = () => {
    const activities = [];
    
    if (enrollments && enrollments.length > 0) {
      // Add enrollment activities
      enrollments.slice(0, 3).forEach((enrollment, index) => {
        const course = enrollment.course;
        const enrollmentDate = new Date(enrollment.enrollment_date);
        const timeAgo = getTimeAgo(enrollmentDate);
        
        if (enrollment.status === 'approved') {
          activities.push({
            id: `enrollment-${enrollment.id}`,
            type: 'enrollment',
            title: `تم قبولك في دورة ${course?.title || 'غير محددة'}`,
            time: timeAgo,
            icon: CheckCircle,
            color: 'bg-green-100 text-green-600',
          });
        } else if (enrollment.status === 'pending') {
          activities.push({
            id: `pending-${enrollment.id}`,
            type: 'pending',
            title: `في انتظار الموافقة على دورة ${course?.title || 'غير محددة'}`,
            time: timeAgo,
            icon: Clock,
            color: 'bg-yellow-100 text-yellow-600',
          });
        } else if (enrollment.status === 'completed') {
          activities.push({
            id: `completed-${enrollment.id}`,
            type: 'completion',
            title: `تم إكمال دورة ${course?.title || 'غير محددة'}`,
            time: timeAgo,
            icon: Award,
            color: 'bg-purple-100 text-purple-600',
          });
        }
      });
    }
    
    // Add some default activities if no enrollments
    if (activities.length === 0) {
      activities.push(
        {
          id: 'welcome',
          type: 'info',
          title: 'مرحباً بك في مركز إقامة الكتاب',
          time: 'اليوم',
          icon: BookOpen,
          color: 'bg-blue-100 text-blue-600',
        },
        {
          id: 'getting-started',
          type: 'reminder',
          title: 'ابدأ رحلتك التعليمية بالتسجيل في دورة',
          time: 'الآن',
          icon: Bell,
          color: 'bg-orange-100 text-orange-600',
        }
      );
    }
    
    return activities.slice(0, 4); // Limit to 4 activities
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffDays > 0) {
      return diffDays === 1 ? 'أمس' : `منذ ${diffDays} أيام`;
    } else if (diffHours > 0) {
      return diffHours === 1 ? 'منذ ساعة' : `منذ ${diffHours} ساعات`;
    } else if (diffMinutes > 0) {
      return diffMinutes === 1 ? 'منذ دقيقة' : `منذ ${diffMinutes} دقائق`;
    } else {
      return 'الآن';
    }
  };

  const activities = generateActivities();

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
        {enrollments && enrollments.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              عرض جميع الأنشطة
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
