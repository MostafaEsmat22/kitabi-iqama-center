
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  BookOpen, 
  User, 
  Wallet, 
  MessageCircle, 
  Bell, 
  Award, 
  HelpCircle, 
  LogOut,
  FileText,
  GraduationCap,
  BarChart3
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import LogoutConfirmation from './LogoutConfirmation';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, signOut } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const menuItems = [
    {
      title: "الملخص",
      icon: LayoutDashboard,
      path: "/summary",
      roles: ["admin", "teacher", "student"]
    },
    {
      title: "دوراتي الحالية", 
      icon: BookOpen,
      path: "/courses",
      roles: ["admin", "teacher", "student"]
    },
    {
      title: "التسجيل في الدورات",
      icon: GraduationCap,
      path: "/apply-course",
      roles: ["student"]
    },
    {
      title: "الأداء",
      icon: BarChart3,
      path: "/performance", 
      roles: ["admin", "teacher", "student"]
    },
    {
      title: "الدورات المكتملة",
      icon: Award,
      path: "/completed-courses",
      roles: ["admin", "teacher", "student"] 
    },
    {
      title: "المحفظة",
      icon: Wallet,
      path: "/wallet",
      roles: ["admin", "teacher", "student"]
    },
    {
      title: "الرسائل", 
      icon: MessageCircle,
      path: "/messages",
      roles: ["admin", "teacher", "student"]
    },
    {
      title: "الإشعارات",
      icon: Bell,
      path: "/notifications", 
      roles: ["admin", "teacher", "student"]
    },
    {
      title: "الملف الشخصي",
      icon: User,
      path: "/profile",
      roles: ["admin", "teacher", "student"]
    },
    {
      title: "تواصل معنا",
      icon: HelpCircle, 
      path: "/support",
      roles: ["admin", "teacher", "student"]
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    !profile?.role || item.roles.includes(profile.role)
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className="w-64 bg-white shadow-sm border-r border-gray-200 h-full flex flex-col">
        {/* Profile Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Avatar className="h-12 w-12">
              <AvatarImage src={profile?.avatar_url || ''} />
              <AvatarFallback className="bg-blue-600 text-white">
                {profile?.full_name?.split(' ').map(n => n[0]).join('') || 'ط'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {profile?.full_name || 'مستخدم'}
              </h3>
              <p className="text-xs text-gray-500">
                {profile?.role === 'student' && 'طالب'}
                {profile?.role === 'teacher' && 'معلم'}
                {profile?.role === 'admin' && 'مدير'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-2">
            {filteredMenuItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "ghost"}
                className={`w-full justify-start text-right h-10 ${
                  isActive(item.path) 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="ml-3 h-4 w-4" />
                {item.title}
              </Button>
            ))}
          </nav>
        </ScrollArea>

        <Separator />
        
        {/* Logout Button */}
        <div className="p-3">
          <Button
            variant="ghost"
            className="w-full justify-start text-right h-10 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => setShowLogoutDialog(true)}
          >
            <LogOut className="ml-3 h-4 w-4" />
            تسجيل الخروج
          </Button>
        </div>
      </div>

      <LogoutConfirmation
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Sidebar;
