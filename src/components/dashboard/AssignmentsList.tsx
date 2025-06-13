
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { FileText, Calendar, Upload, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useAssignments } from '@/hooks/useAssignments';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

interface AssignmentsListProps {
  courseId: string;
  userRole?: string;
}

const AssignmentsList = ({ courseId, userRole }: AssignmentsListProps) => {
  const { assignments, isLoading, error, submitAssignment, isSubmitting } = useAssignments(courseId);
  const { user } = useAuth();
  const [submissionTexts, setSubmissionTexts] = useState<Record<string, string>>({});
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File[]>>({});

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>الواجبات والتكاليف</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="mr-3 text-gray-600">جاري تحميل الواجبات...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>الواجبات والتكاليف</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8">
            <p className="text-red-500 mb-2">حدث خطأ في تحميل الواجبات</p>
            <p className="text-sm text-gray-500">يرجى إعادة تحميل الصفحة</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const now = new Date();

  const handleSubmitAssignment = (assignmentId: string) => {
    if (!user?.id) return;

    const submissionText = submissionTexts[assignmentId];
    const files = selectedFiles[assignmentId] || [];
    const attachments = files.map(file => file.name);

    submitAssignment({
      assignmentId,
      studentId: user.id,
      submissionText,
      attachments,
    });

    // Clear form
    setSubmissionTexts(prev => ({ ...prev, [assignmentId]: '' }));
    setSelectedFiles(prev => ({ ...prev, [assignmentId]: [] }));
  };

  const handleFileChange = (assignmentId: string, files: FileList | null) => {
    if (files) {
      setSelectedFiles(prev => ({ ...prev, [assignmentId]: Array.from(files) }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <FileText className="h-5 w-5" />
          <span>الواجبات والتكاليف ({assignments.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {assignments.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-gray-500">لا توجد واجبات مطلوبة حالياً</p>
          </div>
        ) : (
          <div className="space-y-6">
            {assignments.map((assignment) => {
              const dueDate = new Date(assignment.due_date);
              const isOverdue = dueDate < now;
              const isDueSoon = dueDate.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000; // 7 days
              
              return (
                <div key={assignment.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{assignment.title}</h4>
                      {assignment.description && (
                        <p className="text-sm text-gray-600 mb-2">{assignment.description}</p>
                      )}
                      {assignment.instructions && (
                        <div className="bg-blue-50 p-3 rounded-lg mb-3">
                          <p className="text-sm text-blue-800">
                            <strong>التعليمات:</strong> {assignment.instructions}
                          </p>
                        </div>
                      )}
                      <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <Calendar className="h-4 w-4" />
                          <span>موعد التسليم: {dueDate.toLocaleDateString('ar-SA')}</span>
                        </div>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <span>الدرجة الكاملة: {assignment.max_score}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {isOverdue ? (
                        <Badge variant="destructive" className="bg-red-100 text-red-800">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          متأخر
                        </Badge>
                      ) : isDueSoon ? (
                        <Badge variant="default" className="bg-yellow-100 text-yellow-800">
                          <Clock className="h-3 w-3 mr-1" />
                          مطلوب قريباً
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          متاح
                        </Badge>
                      )}
                    </div>
                  </div>

                  {assignment.attachments && assignment.attachments.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">مرفقات الواجب:</p>
                      <div className="flex flex-wrap gap-2">
                        {assignment.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center space-x-1 rtl:space-x-reverse text-sm bg-gray-50 px-2 py-1 rounded">
                            <FileText className="h-3 w-3 text-blue-600" />
                            <span>{attachment}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {userRole === 'student' && !isOverdue && (
                    <div className="border-t pt-4 space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          إجابة الواجب:
                        </label>
                        <Textarea
                          placeholder="اكتب إجابتك هنا..."
                          value={submissionTexts[assignment.id] || ''}
                          onChange={(e) => setSubmissionTexts(prev => ({ 
                            ...prev, 
                            [assignment.id]: e.target.value 
                          }))}
                          className="min-h-[100px]"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          إرفاق ملفات (اختياري):
                        </label>
                        <Input
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                          onChange={(e) => handleFileChange(assignment.id, e.target.files)}
                          className="mb-2"
                        />
                        {selectedFiles[assignment.id] && selectedFiles[assignment.id].length > 0 && (
                          <p className="text-xs text-gray-600">
                            تم اختيار {selectedFiles[assignment.id].length} ملف(ات)
                          </p>
                        )}
                      </div>

                      <Button 
                        onClick={() => handleSubmitAssignment(assignment.id)}
                        disabled={isSubmitting || !submissionTexts[assignment.id]?.trim()}
                        className="flex items-center space-x-2 rtl:space-x-reverse"
                      >
                        <Upload className="h-4 w-4" />
                        <span>{isSubmitting ? 'جاري التسليم...' : 'تسليم الواجب'}</span>
                      </Button>
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

export default AssignmentsList;
