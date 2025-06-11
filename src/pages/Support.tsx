
import { Helmet } from "react-helmet-async";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { MessageSquare, Send, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const Support = () => {
  const [formData, setFormData] = useState({
    type: '',
    subject: '',
    message: '',
    attachment: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.subject || !formData.message) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    // Here you would typically send the form data to your backend
    toast.success('تم إرسال رسالتك بنجاح. سنتواصل معك قريباً');
    
    // Reset form
    setFormData({
      type: '',
      subject: '',
      message: '',
      attachment: null
    });
  };

  return (
    <ProtectedRoute>
      <Helmet>
        <title>تواصل معنا - مركز إقامة الكتاب</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  تواصل معنا
                </h1>
                <p className="text-gray-600">
                  نحن في مركز إقامة الكتاب نرحب بجميع اقتراحاتكم واستفساراتكم وشكاويكم
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Contact Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                      <MessageSquare className="h-5 w-5" />
                      <span>معلومات التواصل</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Phone className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">الهاتف</p>
                          <p className="text-sm text-gray-600">+966 12 345 6789</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">البريد الإلكتروني</p>
                          <p className="text-sm text-gray-600">support@iqamah-center.com</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Form */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>إرسال رسالة</CardTitle>
                    <CardDescription>
                      نسعى دائماً لتحسين خدماتنا وتقديم أفضل تجربة للمستخدمين
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="type">نوع الرسالة *</Label>
                        <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر نوع الرسالة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="suggestion">اقتراح</SelectItem>
                            <SelectItem value="complaint">شكوى</SelectItem>
                            <SelectItem value="technical">طلب دعم فني</SelectItem>
                            <SelectItem value="inquiry">استفسار عام</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">الموضوع (العنوان) *</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          placeholder="اكتب عنوان الرسالة"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">نص الرسالة *</Label>
                        <Textarea
                          id="message"
                          rows={6}
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="اكتب رسالتك هنا..."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="attachment">إرفاق ملفات (اختياري)</Label>
                        <Input
                          id="attachment"
                          type="file"
                          onChange={(e) => setFormData({...formData, attachment: e.target.files?.[0] || null})}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                        <p className="text-xs text-gray-600">
                          الملفات المدعومة: PDF, DOC, DOCX, JPG, PNG (حتى 5 ميجابايت)
                        </p>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">ملاحظات:</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• سيتم التواصل معك عبر البريد الإلكتروني أو الهاتف (في حال توفره)</li>
                          <li>• نؤكد على سرية جميع الرسائل التي تردنا</li>
                          <li>• سيتم التعامل مع رسالتك بكل مهنية واهتمام</li>
                        </ul>
                      </div>

                      <Button type="submit" className="w-full">
                        <Send className="h-4 w-4 mr-2" />
                        إرسال الرسالة
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Support;
