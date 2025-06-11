
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, MessageSquare, Globe, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { profile } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-gray-900">
            لوحة التحكم
          </h1>
        </div>

        {/* Right side - actions */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* Language toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            <Globe className="h-4 w-4" />
            <span>عربي</span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 text-xs w-5 h-5 flex items-center justify-center p-0"
            >
              3
            </Badge>
          </Button>

          {/* Messages */}
          <Button variant="ghost" size="icon" className="relative">
            <MessageSquare className="h-5 w-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 text-xs w-5 h-5 flex items-center justify-center p-0"
            >
              2
            </Badge>
          </Button>

          {/* User profile */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden md:block">
              {profile?.full_name || 'المستخدم'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
