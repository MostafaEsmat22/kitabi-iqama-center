
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Video, FileText, Download, Clock, CheckCircle } from 'lucide-react';
import { useSessions } from '@/hooks/useSessions';

interface SessionsListProps {
  courseId: string;
  userRole?: string;
}

const SessionsList = ({ courseId, userRole }: SessionsListProps) => {
  const { sessions, isLoading, error } = useSessions(courseId);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>جلسات الدورة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="mr-3 text-gray-600">جاري تحميل الجلسات...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>جلسات الدورة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8">
            <p className="text-red-500 mb-2">حدث خطأ في تحميل الجلسات</p>
            <p className="text-sm text-gray-500">يرجى إعادة تحميل الصفحة</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const now = new Date();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Video className="h-5 w-5" />
          <span>جلسات الدورة ({sessions.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sessions.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-gray-500">لا توجد جلسات مجدولة حالياً</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => {
              const sessionDate = new Date(session.session_date);
              const isPast = sessionDate < now;
              const isToday = sessionDate.toDateString() === now.toDateString();
              
              return (
                <div key={session.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{session.title}</h4>
                      {session.description && (
                        <p className="text-sm text-gray-600 mb-2">{session.description}</p>
                      )}
                      <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
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
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <span>{session.duration_minutes} دقيقة</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {isPast ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          مكتملة
                        </Badge>
                      ) : isToday ? (
                        <Badge variant="default" className="bg-blue-100 text-blue-800">
                          اليوم
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          قادمة
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    {session.meeting_link && !isPast && (
                      <Button 
                        size="sm" 
                        className="flex items-center space-x-1 rtl:space-x-reverse"
                        onClick={() => window.open(session.meeting_link!, '_blank')}
                      >
                        <Video className="h-4 w-4" />
                        <span>دخول القاعة</span>
                      </Button>
                    )}
                    
                    {session.recording_link && isPast && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center space-x-1 rtl:space-x-reverse"
                        onClick={() => window.open(session.recording_link!, '_blank')}
                      >
                        <Video className="h-4 w-4" />
                        <span>مشاهدة التسجيل</span>
                      </Button>
                    )}

                    {session.materials && session.materials.length > 0 && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center space-x-1 rtl:space-x-reverse"
                      >
                        <FileText className="h-4 w-4" />
                        <span>المواد ({session.materials.length})</span>
                      </Button>
                    )}
                  </div>

                  {session.materials && session.materials.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm font-medium text-gray-700 mb-2">المواد التعليمية:</p>
                      <div className="flex flex-wrap gap-2">
                        {session.materials.map((material, index) => (
                          <div key={index} className="flex items-center space-x-1 rtl:space-x-reverse text-sm bg-gray-50 px-2 py-1 rounded">
                            <FileText className="h-3 w-3 text-blue-600" />
                            <span>{material}</span>
                            <Button variant="ghost" size="sm" className="h-auto p-0 ml-1">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SessionsList;
