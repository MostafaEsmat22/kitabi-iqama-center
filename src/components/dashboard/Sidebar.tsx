
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  User, 
  CreditCard, 
  MessageSquare, 
  Bell, 
  Settings, 
  LogOut,
  Home,
  GraduationCap,
  FileText,
  BarChart3,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  language: string;
  user: {
    name: string;
    role: string;
    avatar: string;
    notifications: number;
    messages: number;
  };
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ language, user, isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();

  const content = {
    ar: {
      dashboard: "الرئيسية",
      courses: "دوراتي",
      newCourse: "دورة جديدة",
      profile: "ملفي الشخصي",
      performance: "التقييم والأداء",
      wallet: "المحفظة",
      messages: "الرسائل",
      notifications: "الإشعارات",
      settings: "الإعدادات",
      support: "تواصل معنا",
      logout: "تسجيل الخروج",
      completedCourses: "الدورات المكتملة"
    },
    en: {
      dashboard: "Dashboard",
      courses: "My Courses",
      newCourse: "New Course",
      profile: "Profile",
      performance: "Performance",
      wallet: "Wallet",
      messages: "Messages",
      notifications: "Notifications",
      settings: "Settings",
      support: "Support",
      logout: "Logout",
      completedCourses: "Completed Courses"
    }
  };

  const currentContent = content[language as keyof typeof content];

  const menuItems = [
    { icon: Home, label: currentContent.dashboard, path: '/dashboard', notifications: 0 },
    { icon: BookOpen, label: currentContent.courses, path: '/courses', notifications: 0 },
    { icon: GraduationCap, label: currentContent.newCourse, path: '/apply-course', notifications: 0 },
    { icon: User, label: currentContent.profile, path: '/profile', notifications: 0 },
    { icon: BarChart3, label: currentContent.performance, path: '/performance', notifications: 0 },
    { icon: CreditCard, label: currentContent.wallet, path: '/wallet', notifications: 0 },
    { icon: MessageSquare, label: currentContent.messages, path: '/messages', notifications: user.messages },
    { icon: Bell, label: currentContent.notifications, path: '/notifications', notifications: user.notifications },
    { icon: FileText, label: currentContent.completedCourses, path: '/completed-courses', notifications: 0 },
  ];

  const handleLogout = () => {
    // في التطبيق الحقيقي، سيتم مسح بيانات المستخدم من التخزين المحلي
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose(); // Close sidebar on mobile after navigation
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${language === 'ar' ? 'right-0 left-auto' : 'left-0 right-auto'}
        ${language === 'ar' && isOpen ? 'translate-x-0' : ''}
        ${language === 'ar' && !isOpen ? 'translate-x-full lg:translate-x-0' : ''}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg">مركز إقامة الكتاب</h2>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User profile */}
          <div className="p-6 border-b bg-gray-50">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start text-right rtl:text-right"
                onClick={() => handleNavigation(item.path)}
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse w-full">
                  <item.icon className="h-5 w-5" />
                  <span className="flex-1">{item.label}</span>
                  {item.notifications > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {item.notifications}
                    </Badge>
                  )}
                </div>
              </Button>
            ))}
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-right rtl:text-right"
              onClick={() => handleNavigation('/support')}
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse w-full">
                <MessageSquare className="h-5 w-5" />
                <span>{currentContent.support}</span>
              </div>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-right rtl:text-right text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse w-full">
                <LogOut className="h-5 w-5" />
                <span>{currentContent.logout}</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
