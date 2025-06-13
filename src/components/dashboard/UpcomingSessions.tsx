
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, Users } from 'lucide-react';
import { useEnrollments } from '@/hooks/useEnrollments';
import { useSessions } from '@/hooks/useSessions';
import { useAuth } from '@/hooks/useAuth';

const UpcomingSessions = () => {
  const { user } = useAuth();
  const { enrollments } = useEnrollments(user?.id);

  // Get all course IDs from enrollments
  const courseIds = enrollments
    ?.filter(enrollment => enrollment.status === 'approved')
    ?.map(enrollment => enrollment.course_id) || [];

  // For demo purposes, we'll show upcoming sessions from the first enrolled course
  const firstCourseId = courseIds[0];
  const { sessions } = useSessions(firstCourseId);

  const now = new Date();
  const upcomingSessions = sessions
    ?.filter(session => new Date(session.session_date) > now)
    ?.slice(0, 3) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Calendar className="h-5 w-5" />
          <span>الجلسات القادمة</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingSessions.length === 0 ? (
          <div className="text-center p-6">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 mb-2">لا توجد جلسات قادمة</p>
            <p className="text-sm text-gray-400">ستظهر هنا الجلسات المجدولة القادمة</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingSessions.map((session) => {
              const sessionDate = new Date(session.session_date);
              const isToday = sessionDate.toDateString() === now.toDateString();
              const isTomorrow = sessionDate.toDateString() === new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString();
              
              return (
                <div key={session.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{session.title}</h4>
                      <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm text-gray-600">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <Calendar className="h-4 w-4" />
                          <span>{sessionDate.toLocaleDateString('ar-SA')}</span>
                        </div>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <Clock className="h-4 w-4" />
                          <span>{sessionDate.toLocaleTimeString('ar-SA', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      {isToday ? (
                        <Badge className="bg-green-100 text-green-800">
                          اليوم
                        </Badge>
                      ) : isTomorrow ? (
                        <Badge className="bg-blue-100 text-blue-800">
                          غداً
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          {Math.ceil((sessionDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000))} أيام
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{session.duration_minutes} دقيقة</span>
                    </div>
                    
                    {session.meeting_link && isToday && (
                      <Button 
                        size="sm" 
                        className="flex items-center space-x-1 rtl:space-x-reverse"
                        onClick={() => window.open(session.meeting_link!, '_blank')}
                      >
                        <Video className="h-4 w-4" />
                        <span>دخول الآن</span>
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingSessions;
