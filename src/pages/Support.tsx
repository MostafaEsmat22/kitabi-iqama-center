
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  FileText,
  Send,
  Clock,
  CheckCircle
} from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

const Support = () => {
  const [language, setLanguage] = useState('ar');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messageType, setMessageType] = useState('suggestion');
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    attachment: null as File | null
  });

  const user = {
    name: "أحمد محمد",
    role: "طالب",
    avatar: "",
    notifications: 3,
    messages: 2
  };

  const previousTickets = [
    {
      id: 1,
      subject: "مشكلة في تشغيل الفيديو",
      type: "technical",
      status: "resolved",
      date: "2024-06-10",
      response: "تم حل المشكلة بتحديث المتصفح"
    },
    {
      id: 2,
      subject: "استفسار عن المواعيد",
      type: "inquiry",
      status: "pending",
      date: "2024-06-12",
      response: null
    }
  ];

  const content = {
    ar: {
      title: "تواصل معنا",
      intro: "نحن في مركز إقامة الكتاب نرحب بجميع اقتراحاتكم واستفساراتكم وشكاويكم. نسعى دائماً لتحسين خدماتنا وتقديم أفضل تجربة للمستخدمين.",
      messageType: "نوع الرسالة",
      suggestion: "اقتراح",
      complaint: "شكوى",
      technical: "طلب دعم فني",
      subject: "الموضوع (العنوان)",
      message: "نص الرسالة",
      attachment: "إرفاق ملفات (إن وجدت)",
      send: "إرسال الرسالة",
      notes: "ملاحظات",
      notesText: "سيتم التواصل معك عبر البريد الإلكتروني أو الهاتف (في حال توفره). نؤكد على سرية جميع الرسائل التي تردنا، وسيتم التعامل معها بكل مهنية واهتمام.",
      contactInfo: "معلومات التواصل",
      previousTickets: "طلباتك السابقة",
      status: "الحالة",
      resolved: "تم الحل",
      pending: "قيد المراجعة",
      inProgress: "قيد التنفيذ",
      response: "الرد"
    }
  };

  const currentContent = content[language as keyof typeof content];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // في التطبيق الحقيقي سيتم إرسال البيانات للخادم
    console.log('Form submitted:', { messageType, ...formData });
    alert('تم إرسال رسالتك بنجاح. سيتم التواصل معك قريباً.');
    setFormData({ subject: '', message: '', attachment: null });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      resolved: { label: currentContent.resolved, color: 'bg-green-100 text-green-800' },
      pending: { label: currentContent.pending, color: 'bg-yellow-100 text-yellow-800' },
      inProgress: { label: currentContent.inProgress, color: 'bg-blue-100 text-blue-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">{currentContent.title}</h1>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* نموذج التواصل */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 ml-2" />
                    إرسال رسالة جديدة
                  </CardTitle>
                  <CardDescription>
                    {currentContent.intro}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="message-type">{currentContent.messageType}</Label>
                      <select
                        id="message-type"
                        value={messageType}
                        onChange={(e) => setMessageType(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md mt-1"
                      >
                        <option value="suggestion">{currentContent.suggestion}</option>
                        <option value="complaint">{currentContent.complaint}</option>
                        <option value="technical">{currentContent.technical}</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="subject">{currentContent.subject}</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">{currentContent.message}</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={6}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="attachment">{currentContent.attachment}</Label>
                      <Input
                        id="attachment"
                        type="file"
                        onChange={(e) => setFormData({ ...formData, attachment: e.target.files?.[0] || null })}
                        className="mt-1"
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <Send className="h-4 w-4 ml-1" />
                      {currentContent.send}
                    </Button>
                  </form>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">{currentContent.notes}</h4>
                    <p className="text-sm text-blue-800">{currentContent.notesText}</p>
                  </div>
                </CardContent>
              </Card>

              {/* معلومات التواصل والطلبات السابقة */}
              <div className="space-y-6">
                {/* معلومات التواصل */}
                <Card>
                  <CardHeader>
                    <CardTitle>{currentContent.contactInfo}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Phone className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">الهاتف</div>
                        <div className="text-gray-600">+20 123 456 7890</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Mail className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">البريد الإلكتروني</div>
                        <div className="text-gray-600">support@iqamatalkitab.com</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Clock className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">ساعات العمل</div>
                        <div className="text-gray-600">9:00 ص - 5:00 م (الأحد - الخميس)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* الطلبات السابقة */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 ml-2" />
                      {currentContent.previousTickets}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {previousTickets.map((ticket) => (
                        <div key={ticket.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="font-medium text-gray-900">{ticket.subject}</div>
                              <div className="text-sm text-gray-600">{ticket.date}</div>
                            </div>
                            {getStatusBadge(ticket.status)}
                          </div>
                          {ticket.response && (
                            <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                              <div className="flex items-center mb-1">
                                <CheckCircle className="h-4 w-4 text-green-500 ml-1" />
                                <span className="font-medium">{currentContent.response}:</span>
                              </div>
                              <p className="text-gray-700">{ticket.response}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Support;
