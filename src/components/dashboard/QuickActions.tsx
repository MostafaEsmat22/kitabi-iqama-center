
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  GraduationCap, 
  MessageSquare, 
  User, 
  Bell,
  Wallet,
  Calendar,
  FileText
} from 'lucide-react';

interface QuickActionsProps {
  userRole?: string;
}

const QuickActions = ({ userRole }: QuickActionsProps) => {
  const navigate = useNavigate();

  const studentActions = [
    {
      title: 'التسجيل في دورة',
      description: 'استكشف وسجل في دورات جديدة',
      icon: GraduationCap,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => navigate('/apply-course'),
    },
    {
      title: 'دوراتي',
      description: 'عرض الدورات المسجل بها',
      icon: BookOpen,
      color: 'bg-green-600 hover:bg-green-700',
      action: () => navigate('/courses'),
    },
    {
      title: 'الرسائل',
      description: 'تواصل مع المدربين',
      icon: MessageSquare,
      color: 'bg-purple-600 hover:bg-purple-700',
      action: () => navigate('/messages'),
    },
    {
      title: 'المحفظة',
      description: 'إدارة المدفوعات',
      icon: Wallet,
      color: 'bg-orange-600 hover:bg-orange-700',
      action: () => navigate('/wallet'),
    },
  ];

  const teacherActions = [
    {
      title: 'إدارة الدورات',
      description: 'عرض وإدارة دوراتي',
      icon: BookOpen,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => navigate('/courses'),
    },
    {
      title: 'الجدول الدراسي',
      description: 'عرض المواعيد والجلسات',
      icon: Calendar,
      color: 'bg-green-600 hover:bg-green-700',
      action: () => navigate('/schedule'),
    },
    {
      title: 'تقييم الطلاب',
      description: 'مراجعة الواجبات والدرجات',
      icon: FileText,
      color: 'bg-purple-600 hover:bg-purple-700',
      action: () => navigate('/grading'),
    },
    {
      title: 'الرسائل',
      description: 'التواصل مع الطلاب',
      icon: MessageSquare,
      color: 'bg-orange-600 hover:bg-orange-700',
      action: () => navigate('/messages'),
    },
  ];

  const commonActions = [
    {
      title: 'الملف الشخصي',
      description: 'تحديث البيانات الشخصية',
      icon: User,
      color: 'bg-gray-600 hover:bg-gray-700',
      action: () => navigate('/profile'),
    },
    {
      title: 'الإشعارات',
      description: 'عرض آخر الإشعارات',
      icon: Bell,
      color: 'bg-red-600 hover:bg-red-700',
      action: () => navigate('/notifications'),
    },
  ];

  const actions = userRole === 'teacher' ? teacherActions : studentActions;
  const allActions = [...actions, ...commonActions];

  return (
    <Card>
      <CardHeader>
        <CardTitle>الإجراءات السريعة</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className={`h-auto p-4 flex-col items-start text-left ${action.color} text-white border-none hover:text-white`}
              onClick={action.action}
            >
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                <action.icon className="h-5 w-5" />
                <span className="font-medium">{action.title}</span>
              </div>
              <p className="text-sm opacity-90">{action.description}</p>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
