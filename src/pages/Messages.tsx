
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Send, 
  User, 
  Clock,
  Search,
  Filter
} from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

const Messages = () => {
  const [language, setLanguage] = useState('ar');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');

  const user = {
    name: "أحمد محمد",
    role: "طالب",
    avatar: "",
    notifications: 3,
    messages: 2
  };

  const conversations = [
    {
      id: 1,
      participant: "د. عبدالله الحسن",
      role: "مشرف دورة القرآن",
      lastMessage: "تم استلام الواجب بنجاح",
      timestamp: "منذ ساعتين",
      unread: 1,
      messages: [
        {
          id: 1,
          sender: "د. عبدالله الحسن",
          content: "السلام عليكم ورحمة الله وبركاته، كيف حالك يا أحمد؟",
          timestamp: "10:30 ص",
          isOwn: false
        },
        {
          id: 2,
          sender: "أحمد محمد",
          content: "وعليكم السلام ورحمة الله وبركاته، الحمد لله بخير دكتور",
          timestamp: "10:35 ص",
          isOwn: true
        },
        {
          id: 3,
          sender: "د. عبدالله الحسن",
          content: "تم استلام الواجب بنجاح، بارك الله فيك",
          timestamp: "11:00 ص",
          isOwn: false
        }
      ]
    },
    {
      id: 2,
      participant: "الشيخ محمد أحمد",
      role: "معلم القرآن",
      lastMessage: "موعد الحصة القادمة غداً",
      timestamp: "أمس",
      unread: 0,
      messages: [
        {
          id: 1,
          sender: "الشيخ محمد أحمد",
          content: "موعد الحصة القادمة غداً إن شاء الله الساعة 8 مساءً",
          timestamp: "أمس 3:00 م",
          isOwn: false
        },
        {
          id: 2,
          sender: "أحمد محمد",
          content: "بارك الله فيكم شيخنا، سأكون حاضراً إن شاء الله",
          timestamp: "أمس 3:15 م",
          isOwn: true
        }
      ]
    },
    {
      id: 3,
      participant: "إدارة المنصة",
      role: "إشعارات عامة",
      lastMessage: "تحديث في نظام المنصة",
      timestamp: "منذ 3 أيام",
      unread: 0,
      messages: [
        {
          id: 1,
          sender: "إدارة المنصة",
          content: "تم تحديث نظام المنصة بميزات جديدة، يرجى مراجعة التحديثات",
          timestamp: "منذ 3 أيام",
          isOwn: false
        }
      ]
    }
  ];

  const content = {
    ar: {
      title: "الرسائل",
      search: "البحث في الرسائل",
      filter: "تصفية",
      typeMessage: "اكتب رسالتك هنا...",
      send: "إرسال",
      noConversation: "اختر محادثة لعرض الرسائل",
      unread: "غير مقروءة",
      online: "متصل",
      offline: "غير متصل"
    }
  };

  const currentContent = content[language as keyof typeof content];

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // إضافة الرسالة الجديدة (في التطبيق الحقيقي سيتم إرسالها للخادم)
    if (selectedConv) {
      selectedConv.messages.push({
        id: selectedConv.messages.length + 1,
        sender: user.name,
        content: newMessage,
        timestamp: "الآن",
        isOwn: true
      });
      setNewMessage('');
    }
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
          <div className="max-w-7xl mx-auto h-[calc(100vh-200px)]">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{currentContent.title}</h1>
            
            <div className="grid grid-cols-12 gap-6 h-full">
              {/* قائمة المحادثات */}
              <div className="col-span-4 bg-white rounded-lg shadow-sm border">
                <div className="p-4 border-b">
                  <div className="relative mb-4">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      placeholder={currentContent.search}
                      className="pr-10"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Filter className="h-4 w-4 ml-1" />
                    {currentContent.filter}
                  </Button>
                </div>
                
                <div className="overflow-y-auto max-h-[calc(100%-120px)]">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedConversation === conversation.id ? 'bg-blue-50 border-r-4 border-r-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{conversation.participant}</div>
                            <div className="text-xs text-gray-500">{conversation.role}</div>
                          </div>
                        </div>
                        {conversation.unread > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 truncate mb-1">
                        {conversation.lastMessage}
                      </div>
                      <div className="text-xs text-gray-400 flex items-center">
                        <Clock className="h-3 w-3 ml-1" />
                        {conversation.timestamp}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* نافذة المحادثة */}
              <div className="col-span-8 bg-white rounded-lg shadow-sm border flex flex-col">
                {selectedConv ? (
                  <>
                    {/* رأس المحادثة */}
                    <div className="p-4 border-b bg-gray-50">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{selectedConv.participant}</div>
                          <div className="text-sm text-gray-500">{selectedConv.role}</div>
                        </div>
                      </div>
                    </div>

                    {/* الرسائل */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                      {selectedConv.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.isOwn
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <div className="text-sm">{message.content}</div>
                            <div className={`text-xs mt-1 ${
                              message.isOwn ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {message.timestamp}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* مربع كتابة الرسالة */}
                    <div className="p-4 border-t bg-gray-50">
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder={currentContent.typeMessage}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="flex-1"
                        />
                        <Button onClick={handleSendMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <p>{currentContent.noConversation}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Messages;
