
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Calendar, 
  BookOpen, 
  Clock, 
  Target,
  Award,
  BarChart3
} from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

const Performance = () => {
  const [language, setLanguage] = useState('ar');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = {
    name: "أحمد محمد",
    role: "طالب",
    avatar: "",
    notifications: 3,
    messages: 2
  };

  const performanceData = {
    overall: {
      currentGrade: 85,
      cumulativeGrade: 88,
      rank: 3,
      totalStudents: 25
    },
    categories: [
      { name: "الحضور", score: 95, maxScore: 100, color: "green" },
      { name: "الامتحانات", score: 82, maxScore: 100, color: "blue" },
      { name: "التعاهد اليومي", score: 90, maxScore: 100, color: "purple" },
      { name: "المشاركة", score: 78, maxScore: 100, color: "orange" },
      { name: "الواجبات", score: 88, maxScore: 100, color: "red" }
    ],
    monthlyTrend: [
      { month: "يناير", score: 82 },
      { month: "فبراير", score: 85 },
      { month: "مارس", score: 87 },
      { month: "أبريل", score: 85 },
      { month: "مايو", score: 88 },
      { month: "يونيو", score: 85 }
    ],
    achievements: [
      { title: "طالب الشهر", date: "مايو 2024", icon: Award },
      { title: "أفضل حضور", date: "أبريل 2024", icon: Calendar },
      { title: "تميز في التعاهد", date: "مارس 2024", icon: Target }
    ],
    recommendations: [
      "زيادة المشاركة في النقاشات الصفية",
      "مراجعة المواضيع الصعبة مع المعلم",
      "المحافظة على الحضور المتميز",
      "تطوير مهارات التلاوة والتجويد"
    ]
  };

  const content = {
    ar: {
      title: "التقييم والأداء",
      currentGrade: "التقييم الحالي",
      cumulativeGrade: "التقييم التراكمي",
      rank: "الترتيب",
      of: "من",
      students: "طالب",
      categories: "تفصيل التقييم",
      monthlyTrend: "الاتجاه الشهري",
      achievements: "الإنجازات",
      recommendations: "توصيات لتحسين الأداء",
      score: "النقاط",
      excellent: "ممتاز",
      good: "جيد",
      average: "متوسط",
      needsImprovement: "يحتاج تحسين"
    }
  };

  const currentContent = content[language as keyof typeof content];

  const getGradeLabel = (score: number) => {
    if (score >= 90) return { label: currentContent.excellent, color: "text-green-600" };
    if (score >= 80) return { label: currentContent.good, color: "text-blue-600" };
    if (score >= 70) return { label: currentContent.average, color: "text-yellow-600" };
    return { label: currentContent.needsImprovement, color: "text-red-600" };
  };

  const getColorClass = (color: string) => {
    const colors = {
      green: "bg-green-500",
      blue: "bg-blue-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500",
      red: "bg-red-500"
    };
    return colors[color as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      <Sidebar 
        language={language} 
        user={user} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          language={language}
          onLanguageToggle={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
          onMenuClick={() => setSidebarOpen(true)}
          user={user}
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">{currentContent.title}</h1>
            
            {/* نظرة عامة */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{currentContent.currentGrade}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {performanceData.overall.currentGrade}%
                  </div>
                  <Badge className={getGradeLabel(performanceData.overall.currentGrade).color}>
                    {getGradeLabel(performanceData.overall.currentGrade).label}
                  </Badge>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">{currentContent.cumulativeGrade}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {performanceData.overall.cumulativeGrade}%
                  </div>
                  <Badge className={getGradeLabel(performanceData.overall.cumulativeGrade).color}>
                    {getGradeLabel(performanceData.overall.cumulativeGrade).label}
                  </Badge>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">{currentContent.rank}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    #{performanceData.overall.rank}
                  </div>
                  <p className="text-sm text-gray-600">
                    {currentContent.of} {performanceData.overall.totalStudents} {currentContent.students}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* تفصيل التقييم */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 ml-2" />
                    {currentContent.categories}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {performanceData.categories.map((category, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{category.name}</span>
                        <span className="text-sm font-semibold">
                          {category.score}/{category.maxScore}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${getColorClass(category.color)}`}
                          style={{ width: `${(category.score / category.maxScore) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* الاتجاه الشهري */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 ml-2" />
                    {currentContent.monthlyTrend}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceData.monthlyTrend.map((month, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{month.month}</span>
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${month.score}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold text-blue-600 w-8">
                            {month.score}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* الإنجازات */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 ml-2" />
                    {currentContent.achievements}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceData.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                          <achievement.icon className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{achievement.title}</div>
                          <div className="text-sm text-gray-600">{achievement.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* التوصيات */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 ml-2" />
                    {currentContent.recommendations}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {performanceData.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start space-x-3 rtl:space-x-reverse">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Performance;
