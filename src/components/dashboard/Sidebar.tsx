
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import {
  Home,
  BookOpen,
  Calendar,
  MessageSquare,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  BarChart3,
  CreditCard,
  Award,
  FileText,
  Video,
  Users,
  PlusCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { profile } = useAuth();

  const isTeacher = profile?.role === 'teacher';
  const isAdmin = profile?.role === 'admin';

  const studentNavItems = [
    { icon: Home, label: 'الرئيسية', href: '/dashboard' },
    { icon: BookOpen, label: 'دوراتي', href: '/courses' },
    { icon: PlusCircle, label: 'التسجيل في دورة', href: '/apply-course' },
    { icon: BarChart3, label: 'الأداء', href: '/performance' },
    { icon: Award, label: 'الدورات المكتملة', href: '/completed' },
    { icon: MessageSquare, label: 'الرسائل', href: '/messages' },
    { icon: Bell, label: 'الإشعارات', href: '/notifications' },
    { icon: CreditCard, label: 'المحفظة', href: '/wallet' },
    { icon: User, label: 'الملف الشخصي', href: '/profile' },
    { icon: HelpCircle, label: 'الدعم', href: '/support' },
  ];

  const teacherNavItems = [
    { icon: Home, label: 'لوحة المدرب', href: '/teacher-dashboard' },
    { icon: BookOpen, label: 'دوراتي', href: '/courses' },
    { icon: Video, label: 'الجلسات', href: '/sessions' },
    { icon: FileText, label: 'الواجبات', href: '/assignments' },
    { icon: Users, label: 'الطلاب', href: '/students' },
    { icon: BarChart3, label: 'التقارير', href: '/performance' },
    { icon: MessageSquare, label: 'الرسائل', href: '/messages' },
    { icon: Bell, label: 'الإشعارات', href: '/notifications' },
    { icon: User, label: 'الملف الشخصي', href: '/profile' },
    { icon: HelpCircle, label: 'الدعم', href: '/support' },
  ];

  const adminNavItems = [
    { icon: Home, label: 'لوحة الإدارة', href: '/admin-dashboard' },
    { icon: Users, label: 'إدارة المستخدمين', href: '/admin/users' },
    { icon: BookOpen, label: 'إدارة الدورات', href: '/admin/courses' },
    { icon: BarChart3, label: 'التقارير', href: '/admin/reports' },
    { icon: Settings, label: 'الإعدادات', href: '/admin/settings' },
    { icon: MessageSquare, label: 'الرسائل', href: '/messages' },
    { icon: Bell, label: 'الإشعارات', href: '/notifications' },
    { icon: User, label: 'الملف الشخصي', href: '/profile' },
    { icon: HelpCircle, label: 'الدعم', href: '/support' },
  ];

  const getNavItems = () => {
    if (isAdmin) return adminNavItems;
    if (isTeacher) return teacherNavItems;
    return studentNavItems;
  };

  const navItems = getNavItems();

  return (
    <div className={cn(
      'bg-white border-l border-gray-200 transition-all duration-300 flex flex-col',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900">مركز إقامة الكتاب</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 p-0"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Role Badge */}
      {!collapsed && profile?.role && (
        <div className="px-4 py-2">
          <Badge 
            variant={
              profile.role === 'admin' ? 'destructive' : 
              profile.role === 'teacher' ? 'default' : 
              'secondary'
            }
            className="w-full justify-center"
          >
            {profile.role === 'admin' && 'مدير'}
            {profile.role === 'teacher' && 'مدرب'}
            {profile.role === 'student' && 'طالب'}
          </Badge>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 rounded-lg transition-colors',
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {profile?.full_name || 'مستخدم'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {profile?.role === 'admin' && 'مدير النظام'}
                {profile?.role === 'teacher' && 'مدرب'}
                {profile?.role === 'student' && 'طالب'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
