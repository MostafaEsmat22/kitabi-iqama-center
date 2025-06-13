
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, GraduationCap, Clock, Trophy, TrendingUp, Users } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    totalCourses: number;
    activeCourses: number;
    completedCourses: number;
    pendingCourses: number;
  };
  userRole?: string;
}

const StatsCards = ({ stats, userRole }: StatsCardsProps) => {
  const studentCards = [
    {
      title: "إجمالي الدورات",
      value: stats.totalCourses,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "الدورات النشطة",
      value: stats.activeCourses,
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "الدورات المكتملة",
      value: stats.completedCourses,
      icon: GraduationCap,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "في انتظار الموافقة",
      value: stats.pendingCourses,
      icon: Trophy,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const teacherCards = [
    {
      title: "الدورات التي أدرسها",
      value: stats.totalCourses,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "الطلاب النشطين",
      value: stats.activeCourses * 15, // Mock calculation
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "معدل الإنجاز",
      value: `${Math.round((stats.completedCourses / (stats.totalCourses || 1)) * 100)}%`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "الدورات المكتملة",
      value: stats.completedCourses,
      icon: Trophy,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const cards = userRole === 'teacher' ? teacherCards : studentCards;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {card.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{card.value}</div>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span>+2.5% من الشهر الماضي</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
