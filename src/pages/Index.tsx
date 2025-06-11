
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Globe, Phone, Mail, MapPin, BookOpen, Users, Award, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [language, setLanguage] = useState('ar');
  const navigate = useNavigate();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const content = {
    ar: {
      title: "مركز إقامة الكتاب",
      subtitle: "منصة تعليمية متكاملة لإدارة المهام التعليمية ومتابعة الأداء",
      description: "نقدم دورات تدريبية وتأهيلية شاملة مع نظام متابعة متطور لجميع المستخدمين",
      navigation: {
        about: "من نحن",
        activities: "أنشطتنا", 
        faq: "الأسئلة الشائعة",
        contact: "تواصل معنا"
      },
      buttons: {
        login: "تسجيل الدخول",
        register: "إنشاء حساب",
        joinCourse: "انضم للدورة"
      },
      sections: {
        about: {
          title: "من نحن",
          description: "مركز إقامة الكتاب هو مؤسسة تعليمية رائدة تهدف إلى تقديم تعليم متميز وتدريب شامل لجميع الفئات. نحن نسعى لبناء شخصيات متوازنة من خلال برامجنا التعليمية والتزكوية المتطورة."
        },
        activities: {
          title: "أنشطتنا الرئيسية",
          items: [
            {
              title: "حلقات التعليم",
              description: "برامج تعليمية شاملة للطلاب من جميع الأعمار",
              icon: BookOpen
            },
            {
              title: "التدريب والتأهيل",
              description: "دورات تدريبية متخصصة لإعداد المعلمين والمدربين",
              icon: Users
            },
            {
              title: "التعاهد التزكوي",
              description: "برامج تزكوية يومية لتعزيز الجانب الروحي والأخلاقي",
              icon: Award
            }
          ]
        },
        courses: {
          title: "أبرز دوراتنا",
          subtitle: "اكتشف مجموعة متنوعة من الدورات المصممة لتلبية احتياجاتك التعليمية"
        },
        faq: {
          title: "الأسئلة الشائعة",
          items: [
            {
              question: "كيف يمكنني التسجيل في المنصة؟",
              answer: "يمكنك التسجيل بسهولة من خلال النقر على زر 'إنشاء حساب' وملء البيانات المطلوبة."
            },
            {
              question: "هل توجد رسوم للتسجيل؟",
              answer: "التسجيل في المنصة مجاني، لكن بعض الدورات قد تتطلب رسوماً دراسية."
            },
            {
              question: "كيف يتم متابعة الأداء؟",
              answer: "نوفر نظام متابعة شامل يتضمن تقييمات دورية وتقارير مفصلة عن الأداء."
            }
          ]
        },
        contact: {
          title: "تواصل معنا",
          subtitle: "نحن هنا للإجابة على استفساراتكم ومساعدتكم",
          form: {
            name: "الاسم",
            email: "البريد الإلكتروني", 
            message: "الرسالة",
            send: "إرسال الرسالة"
          },
          info: {
            phone: "+20 123 456 7890",
            email: "info@iqamatalkitab.com",
            address: "القاهرة، مصر"
          }
        }
      }
    },
    en: {
      title: "Iqamat Al-Kitab Center",
      subtitle: "Integrated educational platform for managing educational tasks and performance monitoring",
      description: "We provide comprehensive training and qualification courses with an advanced monitoring system for all users",
      navigation: {
        about: "About Us",
        activities: "Our Activities",
        faq: "FAQ", 
        contact: "Contact Us"
      },
      buttons: {
        login: "Sign In",
        register: "Create Account",
        joinCourse: "Join Course"
      },
      sections: {
        about: {
          title: "About Us",
          description: "Iqamat Al-Kitab Center is a leading educational institution that aims to provide excellent education and comprehensive training for all groups. We strive to build balanced personalities through our advanced educational and spiritual programs."
        },
        activities: {
          title: "Our Main Activities",
          items: [
            {
              title: "Educational Circles",
              description: "Comprehensive educational programs for students of all ages",
              icon: BookOpen
            },
            {
              title: "Training & Qualification",
              description: "Specialized training courses for preparing teachers and trainers",
              icon: Users
            },
            {
              title: "Spiritual Commitment",
              description: "Daily spiritual programs to enhance spiritual and moral aspects",
              icon: Award
            }
          ]
        },
        courses: {
          title: "Featured Courses",
          subtitle: "Discover a variety of courses designed to meet your educational needs"
        },
        faq: {
          title: "Frequently Asked Questions",
          items: [
            {
              question: "How can I register on the platform?",
              answer: "You can easily register by clicking the 'Create Account' button and filling out the required information."
            },
            {
              question: "Are there registration fees?",
              answer: "Registration on the platform is free, but some courses may require tuition fees."
            },
            {
              question: "How is performance monitored?",
              answer: "We provide a comprehensive monitoring system that includes periodic assessments and detailed performance reports."
            }
          ]
        },
        contact: {
          title: "Contact Us",
          subtitle: "We're here to answer your questions and help you",
          form: {
            name: "Name",
            email: "Email",
            message: "Message", 
            send: "Send Message"
          },
          info: {
            phone: "+20 123 456 7890",
            email: "info@iqamatalkitab.com",
            address: "Cairo, Egypt"
          }
        }
      }
    }
  };

  const currentContent = content[language as keyof typeof content];

  const featuredCourses = [
    {
      title: language === 'ar' ? "دورة تعليم القرآن الكريم" : "Quran Education Course",
      description: language === 'ar' ? "دورة شاملة لتعليم القرآن الكريم مع التجويد" : "Comprehensive course for Quran education with Tajweed",
      price: language === 'ar' ? "300 ج.م شهرياً" : "300 EGP/month",
      duration: language === 'ar' ? "3 أشهر" : "3 months",
      students: 25,
      rating: 4.8
    },
    {
      title: language === 'ar' ? "دورة تدريب المعلمين" : "Teacher Training Course", 
      description: language === 'ar' ? "برنامج تأهيلي شامل للمعلمين الجدد" : "Comprehensive qualification program for new teachers",
      price: language === 'ar' ? "100 ج.م شهرياً" : "100 EGP/month",
      duration: language === 'ar' ? "6 أشهر" : "6 months", 
      students: 15,
      rating: 4.9
    },
    {
      title: language === 'ar' ? "دورة التعاهد التزكوي" : "Spiritual Commitment Course",
      description: language === 'ar' ? "برنامج يومي للتزكية والنمو الروحي" : "Daily program for spiritual purification and growth",
      price: language === 'ar' ? "مجاناً" : "Free",
      duration: language === 'ar' ? "مستمر" : "Ongoing",
      students: 150,
      rating: 5.0
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ${language === 'ar' ? 'font-arabic' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{currentContent.title}</h1>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                {currentContent.navigation.about}
              </a>
              <a href="#activities" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                {currentContent.navigation.activities}
              </a>
              <a href="#faq" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                {currentContent.navigation.faq}
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                {currentContent.navigation.contact}
              </a>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Globe className="h-4 w-4" />
                <span>{language === 'ar' ? 'English' : 'عربي'}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/login')}
              >
                {currentContent.buttons.login}
              </Button>
              <Button 
                size="sm"
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
              >
                {currentContent.buttons.register}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            {currentContent.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {currentContent.subtitle}
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            {currentContent.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-lg px-8 py-4"
            >
              {currentContent.buttons.register}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/login')}
              className="text-lg px-8 py-4 border-2"
            >
              {currentContent.buttons.login}
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold text-gray-800 mb-8">
              {currentContent.sections.about.title}
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              {currentContent.sections.about.description}
            </p>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              {currentContent.sections.activities.title}
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {currentContent.sections.activities.items.map((activity, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-0">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <activity.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    {activity.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed">
                    {activity.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section id="courses" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              {currentContent.sections.courses.title}
            </h3>
            <p className="text-lg text-gray-600">
              {currentContent.sections.courses.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-600">{course.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{course.students} {language === 'ar' ? 'طالب' : 'students'}</span>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-blue-600">{course.price}</span>
                    <span className="text-sm text-gray-500">{course.duration}</span>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                    onClick={() => navigate('/login')}
                  >
                    {currentContent.buttons.joinCourse}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl font-bold text-gray-800 text-center mb-16">
              {currentContent.sections.faq.title}
            </h3>
            <div className="space-y-6">
              {currentContent.sections.faq.items.map((item, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-0">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800 flex items-center justify-between">
                      {item.question}
                      <ChevronDown className="h-5 w-5" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-gray-800 mb-4">
                {currentContent.sections.contact.title}
              </h3>
              <p className="text-lg text-gray-600">
                {currentContent.sections.contact.subtitle}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-100">
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {currentContent.sections.contact.form.name}
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {currentContent.sections.contact.form.email}
                      </label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {currentContent.sections.contact.form.message}
                      </label>
                      <textarea 
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      ></textarea>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 py-3"
                    >
                      {currentContent.sections.contact.form.send}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{language === 'ar' ? 'الهاتف' : 'Phone'}</h4>
                    <p className="text-gray-600">{currentContent.sections.contact.info.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</h4>
                    <p className="text-gray-600">{currentContent.sections.contact.info.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{language === 'ar' ? 'العنوان' : 'Address'}</h4>
                    <p className="text-gray-600">{currentContent.sections.contact.info.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-lg font-bold">{currentContent.title}</h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {currentContent.description}
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">{language === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">{currentContent.navigation.about}</a></li>
                <li><a href="#activities" className="text-gray-400 hover:text-white transition-colors">{currentContent.navigation.activities}</a></li>
                <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">{currentContent.navigation.faq}</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">{currentContent.navigation.contact}</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">{language === 'ar' ? 'الدورات' : 'Courses'}</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>{language === 'ar' ? 'حلقات التعليم' : 'Educational Circles'}</li>
                <li>{language === 'ar' ? 'تدريب المعلمين' : 'Teacher Training'}</li>
                <li>{language === 'ar' ? 'التعاهد التزكوي' : 'Spiritual Commitment'}</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">{language === 'ar' ? 'تواصل معنا' : 'Contact Info'}</h5>
              <div className="space-y-2 text-sm text-gray-400">
                <p>{currentContent.sections.contact.info.phone}</p>
                <p>{currentContent.sections.contact.info.email}</p>
                <p>{currentContent.sections.contact.info.address}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 {currentContent.title}. {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
