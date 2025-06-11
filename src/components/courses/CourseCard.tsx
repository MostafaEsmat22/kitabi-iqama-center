
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';

type Course = Database['public']['Tables']['courses']['Row'] & {
  instructor: { full_name: string } | null;
};

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
  isEnrolling?: boolean;
}

export const CourseCard = ({ course, onEnroll, isEnrolling }: CourseCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{course.title}</CardTitle>
          <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
            {course.status === 'active' ? 'نشطة' : course.status === 'completed' ? 'مكتملة' : 'ملغية'}
          </Badge>
        </div>
        <CardDescription className="text-right">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>من {formatDate(course.start_date)} إلى {formatDate(course.end_date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{course.duration_weeks} أسبوع</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>المدرب: {course.instructor?.full_name || 'غير محدد'}</span>
          </div>
          {course.max_students && (
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>الحد الأقصى: {course.max_students} طالب</span>
            </div>
          )}
          {course.price && course.price > 0 && (
            <div className="text-lg font-semibold text-green-600">
              {course.price} ريال
            </div>
          )}
        </div>
        
        {onEnroll && (
          <Button 
            onClick={() => onEnroll(course.id)} 
            className="w-full"
            disabled={isEnrolling}
          >
            {isEnrolling ? 'جاري التسجيل...' : 'التسجيل في الدورة'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
