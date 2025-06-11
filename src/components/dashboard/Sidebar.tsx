
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LogoutConfirmation from './LogoutConfirmation';
import { 
  BookOpen, 
  User, 
  CreditCard, 
  MessageSquare, 
  Bell, 
  LogOut,
  Home,
  GraduationCap,
  FileText,
  BarChart3,
  PieChart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuItems = [
    { icon: PieChart, label: 'الملخص', path: '/summary', notifications: 0 },
    { icon: Home, label: 'الرئيسية', path: '/dashboard', notifications: 0 },
    { icon: BookOpen, label: 'دوراتي', path: '/courses', notifications: 0 },
    { icon: GraduationCap, label: 'دورة جديدة', path: '/apply-course', notifications: 0 },
    { icon: User, label: 'ملفي الشخصي', path: '/profile', notifications: 0 },
    { icon: BarChart3, label: 'التقييم والأداء', path: '/performance', notifications: 0 },
    { icon: CreditCard, label: 'المحفظة', path: '/wallet', notifications: 0 },
    { icon: MessageSquare, label: 'الرسائل', path: '/messages', notifications: 2 },
    { icon: Bell, label: 'الإشعارات', path: '/notifications', notifications: 3 },
    { icon: FileText, label: 'الدورات المكتملة', path: '/completed-courses', notifications: 0 },
  ];

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    await logout();
    setShowLogoutConfirm(false);
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <div className="w-64 bg-white shadow-lg h-full">
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
          </div>

          {/* User profile */}
          <div className="p-6 border-b bg-gray-50">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">المستخدم</h3>
                <p className="text-sm text-gray-600">طالب</p>
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
                <span>تواصل معنا</span>
              </div>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-right rtl:text-right text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse w-full">
                <LogOut className="h-5 w-5" />
                <span>تسجيل الخروج</span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      <LogoutConfirmation 
        open={showLogoutConfirm}
        onOpenChange={setShowLogoutConfirm}
        onConfirm={confirmLogout}
      />
    </>
  );
};

export default Sidebar;
