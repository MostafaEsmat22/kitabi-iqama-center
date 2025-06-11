
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Globe, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsPrivacy = () => {
  const [language, setLanguage] = useState('ar');
  const navigate = useNavigate();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const content = {
    ar: {
      title: "مركز إقامة الكتاب",
      pageTitle: "شروط الاستخدام وسياسة الخصوصية",
      backButton: "العودة",
      termsTitle: "شروط الاستخدام",
      privacyTitle: "سياسة الخصوصية",
      termsContent: {
        intro: "مرحباً بك في منصة مركز إقامة الكتاب. باستخدامك للمنصة، فإنك توافق على الالتزام بالشروط والأحكام التالية. يُرجى قراءة هذه الشروط بعناية قبل استخدام خدماتنا.",
        sections: [
          {
            title: "1. التعريف بالمنصة",
            content: "مركز إقامة الكتاب هو منصة تعليمية تهدف إلى تحديد المهام التعليمية والتدريبية لجميع المستخدمين (طلاب، أولياء أمور، معلمين، عاملين، مشرفين، إداريين) مع متابعة أدائهم بشكل مستمر."
          },
          {
            title: "2. القبول بالشروط", 
            content: "باستخدامك لهذه المنصة أو التسجيل فيها، فإنك توافق صراحة على الالتزام بهذه الشروط والأحكام."
          },
          {
            title: "3. إنشاء الحساب واستخدامه",
            content: "يتعين على جميع المستخدمين تقديم بيانات صحيحة وكاملة عند التسجيل. يُمنع مشاركة حسابك مع الآخرين أو منح صلاحيات الدخول إلى أطراف أخرى. يتحمل المستخدم المسؤولية الكاملة عن جميع الأنشطة التي تتم عبر حسابه."
          },
          {
            title: "4. المحتوى والملكية الفكرية",
            content: "جميع المواد المعروضة على المنصة (النصوص، الصور، الفيديوهات، الملفات، التقارير) هي ملك لمركز إقامة الكتاب أو لأصحاب الحقوق المرخصين. يمنع نسخ أو إعادة نشر أو توزيع أي محتوى دون إذن خطي مسبق من إدارة المنصة."
          },
          {
            title: "5. السلوك المقبول",
            content: "يُمنع إرسال أي محتوى مسيء أو غير لائق عبر المنصة. يمنع تبادل معلومات الاتصال الخاصة (مثل أرقام الهواتف أو حسابات التواصل الاجتماعي) بين المستخدمين عبر المنصة، حفاظاً على بيئة تعليمية آمنة. يتم مراقبة الرسائل من قِبل مشرفي الحلقات والإدارة العليا."
          },
          {
            title: "6. إنهاء الحساب",
            content: "يحق لإدارة المنصة تعليق أو إنهاء حساب أي مستخدم في حالة مخالفة هذه الشروط أو إساءة استخدام المنصة."
          },
          {
            title: "7. التعديلات",
            content: "يحق لإدارة المنصة تعديل هذه الشروط في أي وقت. سيتم إخطار المستخدمين بالتعديلات من خلال إشعار داخل المنصة."
          }
        ]
      },
      privacyContent: {
        intro: "خصوصيتك تهمنا. تشرح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية على منصة مركز إقامة الكتاب.",
        sections: [
          {
            title: "1. المعلومات التي نجمعها",
            content: "عند استخدامك للمنصة، قد نقوم بجمع الأنواع التالية من المعلومات: البيانات الشخصية (الاسم، الجنس، تاريخ الميلاد، الهاتف، البريد الإلكتروني، الجنسية، الدولة، اللغات). تقييمات الأداء، التكاليف التعليمية، السجلات الأكاديمية، معلومات الدفع. ملاحظات الأداء والتواصل الداخلي."
          },
          {
            title: "2. استخدام المعلومات",
            content: "نستخدم المعلومات التي نجمعها للأغراض التالية: تقديم خدمات التعليم والتدريب المخصصة لكل مستخدم. متابعة الأداء الأكاديمي والإداري. إدارة الاشتراكات والمدفوعات. إرسال الإشعارات الإدارية والتنبيهات المتعلقة بالدورات."
          },
          {
            title: "3. مشاركة المعلومات",
            content: "لا يتم مشاركة معلوماتك الشخصية مع أي طرف خارجي، باستثناء الحالات التي تقتضيها القوانين المعمول بها، أو لتحسين خدمات المنصة. قد يتم عرض بعض المعلومات بشكل داخلي لمشرفي الحلقات أو الإدارة العليا ضمن الأدوار الإدارية المحددة."
          },
          {
            title: "4. حماية البيانات",
            content: "نلتزم بحماية بياناتك باستخدام أحدث التقنيات وإجراءات الأمان المناسبة. يقتصر الوصول إلى البيانات الحساسة على الموظفين المخولين فقط."
          },
          {
            title: "5. حقوق المستخدم",
            content: "يمكنك طلب تحديث أو تصحيح بياناتك الشخصية. يمكنك طلب حذف حسابك، مع العلم أنه قد يتم الاحتفاظ ببعض السجلات لتلبية الالتزامات القانونية أو الإدارية."
          },
          {
            title: "6. استخدام ملفات تعريف الارتباط (Cookies)",
            content: "قد تستخدم المنصة ملفات تعريف الارتباط لتحسين تجربة الاستخدام وتحليل الأداء."
          },
          {
            title: "7. التعديلات",
            content: "تحتفظ المنصة بالحق في تعديل سياسة الخصوصية في أي وقت. سيتم إشعار المستخدمين بالتغييرات عبر إشعارات داخلية."
          }
        ]
      }
    },
    en: {
      title: "Iqamat Al-Kitab Center",
      pageTitle: "Terms of Use and Privacy Policy",
      backButton: "Back",
      termsTitle: "Terms of Use",
      privacyTitle: "Privacy Policy",
      termsContent: {
        intro: "Welcome to the Iqamat Al-Kitab Center platform. By using the platform, you agree to comply with the following terms and conditions. Please read these terms carefully before using our services.",
        sections: [
          {
            title: "1. Platform Definition",
            content: "Iqamat Al-Kitab Center is an educational platform that aims to define educational and training tasks for all users (students, parents, teachers, employees, supervisors, administrators) while continuously monitoring their performance."
          },
          {
            title: "2. Acceptance of Terms",
            content: "By using or registering on this platform, you expressly agree to comply with these terms and conditions."
          },
          {
            title: "3. Account Creation and Usage",
            content: "All users must provide accurate and complete information when registering. It is prohibited to share your account with others or grant access rights to other parties. The user bears full responsibility for all activities conducted through their account."
          },
          {
            title: "4. Content and Intellectual Property",
            content: "All materials displayed on the platform (texts, images, videos, files, reports) are owned by Iqamat Al-Kitab Center or licensed rights holders. Copying, republishing, or distributing any content without prior written permission from platform management is prohibited."
          },
          {
            title: "5. Acceptable Behavior",
            content: "Sending any offensive or inappropriate content through the platform is prohibited. Exchange of private contact information (such as phone numbers or social media accounts) between users through the platform is prohibited to maintain a safe educational environment. Messages are monitored by circle supervisors and top management."
          },
          {
            title: "6. Account Termination",
            content: "Platform management reserves the right to suspend or terminate any user's account in case of violation of these terms or misuse of the platform."
          },
          {
            title: "7. Modifications",
            content: "Platform management reserves the right to modify these terms at any time. Users will be notified of modifications through in-platform notifications."
          }
        ]
      },
      privacyContent: {
        intro: "Your privacy matters to us. This policy explains how we collect, use, and protect your personal information on the Iqamat Al-Kitab Center platform.",
        sections: [
          {
            title: "1. Information We Collect",
            content: "When using the platform, we may collect the following types of information: Personal data (name, gender, birth date, phone, email, nationality, country, languages). Performance evaluations, educational costs, academic records, payment information. Performance notes and internal communication."
          },
          {
            title: "2. Use of Information",
            content: "We use the information we collect for the following purposes: Providing customized education and training services for each user. Monitoring academic and administrative performance. Managing subscriptions and payments. Sending administrative notifications and course-related alerts."
          },
          {
            title: "3. Information Sharing",
            content: "Your personal information is not shared with any external party, except in cases required by applicable laws or to improve platform services. Some information may be displayed internally to circle supervisors or top management within defined administrative roles."
          },
          {
            title: "4. Data Protection",
            content: "We are committed to protecting your data using the latest technologies and appropriate security measures. Access to sensitive data is limited to authorized personnel only."
          },
          {
            title: "5. User Rights",
            content: "You can request to update or correct your personal data. You can request account deletion, noting that some records may be retained to meet legal or administrative obligations."
          },
          {
            title: "6. Use of Cookies",
            content: "The platform may use cookies to improve user experience and analyze performance."
          },
          {
            title: "7. Modifications",
            content: "The platform reserves the right to modify the privacy policy at any time. Users will be notified of changes through internal notifications."
          }
        ]
      }
    }
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 ${language === 'ar' ? 'font-arabic' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{currentContent.title}</h1>
          </div>
          
          <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              {language === 'ar' ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
              <span>{currentContent.backButton}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <Globe className="h-4 w-4" />
              <span>{language === 'ar' ? 'English' : 'عربي'}</span>
            </Button>
          </div>

          <h2 className="text-3xl font-bold text-gray-800">{currentContent.pageTitle}</h2>
        </div>

        {/* Terms of Use */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
              <BookOpen className="h-6 w-6 mr-3 rtl:mr-0 rtl:ml-3" />
              {currentContent.termsTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              {currentContent.termsContent.intro}
            </p>
            
            {currentContent.termsContent.sections.map((section, index) => (
              <div key={index} className="border-l-4 rtl:border-l-0 rtl:border-r-4 border-blue-500 pl-4 rtl:pl-0 rtl:pr-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {section.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Privacy Policy */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
              <BookOpen className="h-6 w-6 mr-3 rtl:mr-0 rtl:ml-3" />
              {currentContent.privacyTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              {currentContent.privacyContent.intro}
            </p>
            
            {currentContent.privacyContent.sections.map((section, index) => (
              <div key={index} className="border-l-4 rtl:border-l-0 rtl:border-r-4 border-indigo-500 pl-4 rtl:pl-0 rtl:pr-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {section.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsPrivacy;
