
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  BookOpen, 
  Clock, 
  Users, 
  CreditCard,
  Star,
  Play,
  Calendar,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

const ApplyCourse = () => {
  const [language, setLanguage] = useState('ar');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const user = {
    name: "أحمد محمد",
    role: "طالب",
    avatar: "",
    notifications: 3,
    messages: 2
  };

  const availableCourses = [
    {
      id: 1,
      name: "دورة تعليم القرآن الكريم - المستوى المتقدم",
      description: "دورة شاملة لتعليم القرآن الكريم مع التجويد للمستوى المتقدم",
      price: 350,
      duration: "4 أشهر",
      schedule: ["الأحد والثلاثاء - 8:00 م", "الإثنين والأربعاء - 7:00 م"],
      availableSeats: 12,
      totalSeats: 15,
      rating: 4.9,
      bookingFee: 300,
      features: ["شهادة معتمدة", "متابعة فردية", "مواد تعليمية", "تسجيلات الدروس"],
      requirements: ["إتمام المستوى الأساسي", "اجتياز اختبار المستوى"],
      status: "available"
    },
    {
      id: 2,
      name: "دورة تدريب المعلمين",
      description: "برنامج تأهيلي شامل للمعلمين الجدد في تدريس القرآن والعلوم الشرعية",
      price: 150,
      duration: "6 أشهر",
      schedule: ["السبت - 10:00 ص"],
      availableSeats: 8,
      totalSeats: 20,
      rating: 4.8,
      bookingFee: 100,
      features: ["تدريب عملي", "ورش تفاعلية", "شهادة مدرب معتمد", "متابعة مستمرة"],
      requirements: ["خبرة تعليمية سابقة", "إجادة التلاوة"],
      status: "available"
    },
    {
      id: 3,
      name: "دورة الخطابة والدعوة",
      description: "تطوير مهارات الخطابة والدعوة والتواصل الفعال",
      price: 200,
      duration: "3 أشهر",
      schedule: ["الخميس - 7:30 م"],
      availableSeats: 0,
      totalSeats: 25,
      rating: 4.7,
      bookingFee: 150,
      features: ["تطبيق عملي", "تقييم مستمر", "شهادة معتمدة"],
      requirements: ["إتمام دورة أساسيات الدعوة"],
      status: "full"
    }
  ];

  const unavailableCourses = [
    {
      name: "دورة تحفيظ القرآن للأطفال",
      requirement: "مخصصة للأعمار 6-12 سنة"
    },
    {
      name: "دورة الإجازة في القراءات",
      requirement: "يتطلب إتمام دورة التجويد المتقدم وحفظ القرآن كاملاً"
    }
  ];

  const content = {
    ar: {
      title: "التقديم لدورة جديدة",
      availableCourses: "الدورات المتاحة",
      unavailableCourses: "دورات غير متاحة لك حالياً",
      price: "السعر",
      duration: "المدة",
      schedule: "المواعيد المتاحة",
      availableSeats: "المقاعد المتاحة",
      rating: "التقييم",
      features: "المميزات",
      requirements: "المتطلبات",
      bookingFee: "جدية الحجز",
      viewDetails: "تفاصيل وتقديم",
      apply: "تقديم الطلب",
      selectSchedule: "اختر الموعد المناسب",
      paymentProof: "إثبات الدفع",
      paymentDate: "تاريخ الدفع",
      paymentTime: "وقت الدفع",
      transferNumber: "رقم التحويل",
      uploadProof: "رفع صورة الإثبات",
      submitApplication: "إرسال الطلب",
      courseFull: "اكتمل العدد",
      monthly: "شهرياً",
      egp: "ج.م",
      seats: "مقعد",
      of: "من"
    }
  };

  const currentContent = content[language as keyof typeof content];

  const handleApply = (courseId: number) => {
    setSelectedCourse(courseId);
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
            
            {/* الدورات المتاحة */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">{currentContent.availableCourses}</h2>
              
              <div className="grid lg:grid-cols-2 gap-6">
                {availableCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-gray-900 mb-2">{course.name}</CardTitle>
                          <CardDescription className="text-gray-600">{course.description}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-600">{course.rating}</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">{currentContent.price}</div>
                          <div className="text-lg font-bold text-blue-600">
                            {course.price} {currentContent.egp} {currentContent.monthly}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">{currentContent.duration}</div>
                          <div className="text-lg font-semibold text-gray-900">{course.duration}</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-2">{currentContent.availableSeats}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {course.availableSeats} {currentContent.of} {course.totalSeats} {currentContent.seats}
                          </span>
                          <Badge variant={course.status === 'available' ? 'default' : 'destructive'}>
                            {course.status === 'available' ? 'متاح' : currentContent.courseFull}
                          </Badge>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${((course.totalSeats - course.availableSeats) / course.totalSeats) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-900 mb-2">{currentContent.features}</div>
                        <div className="flex flex-wrap gap-1">
                          {course.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button 
                        className="w-full" 
                        disabled={course.status === 'full'}
                        onClick={() => handleApply(course.id)}
                      >
                        {course.status === 'full' ? currentContent.courseFull : currentContent.viewDetails}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* الدورات غير المتاحة */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">{currentContent.unavailableCourses}</h2>
              
              <div className="grid lg:grid-cols-2 gap-4">
                {unavailableCourses.map((course, index) => (
                  <Card key={index} className="opacity-60">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{course.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{course.requirement}</p>
                        </div>
                        <XCircle className="h-5 w-5 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* نموذج التقديم */}
            {selectedCourse && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <CardHeader>
                    <CardTitle>تقديم طلب انضمام</CardTitle>
                    <CardDescription>
                      {availableCourses.find(c => c.id === selectedCourse)?.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>{currentContent.selectSchedule}</Label>
                      <div className="space-y-2 mt-2">
                        {availableCourses.find(c => c.id === selectedCourse)?.schedule.map((time, index) => (
                          <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                            <input type="radio" name="schedule" id={`schedule-${index}`} />
                            <label htmlFor={`schedule-${index}`} className="text-sm">{time}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>{currentContent.bookingFee}: {availableCourses.find(c => c.id === selectedCourse)?.bookingFee} {currentContent.egp}</Label>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="payment-date">{currentContent.paymentDate}</Label>
                        <Input type="date" id="payment-date" />
                      </div>
                      <div>
                        <Label htmlFor="payment-time">{currentContent.paymentTime}</Label>
                        <Input type="time" id="payment-time" />
                      </div>
                      <div>
                        <Label htmlFor="transfer-number">{currentContent.transferNumber}</Label>
                        <Input type="text" id="transfer-number" />
                      </div>
                      <div>
                        <Label htmlFor="payment-proof">{currentContent.uploadProof}</Label>
                        <Input type="file" id="payment-proof" accept="image/*" />
                      </div>
                    </div>

                    <div className="flex space-x-3 rtl:space-x-reverse">
                      <Button className="flex-1">{currentContent.submitApplication}</Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedCourse(null)}
                      >
                        إلغاء
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ApplyCourse;
