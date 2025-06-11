
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, MessageSquare, Globe, Menu, User } from 'lucide-react';

interface HeaderProps {
  language: string;
  onLanguageToggle: () => void;
  onMenuClick: () => void;
  user: {
    name: string;
    notifications: number;
    messages: number;
  };
}

const Header = ({ language, onLanguageToggle, onMenuClick, user }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Left side - empty for now, could add breadcrumbs */}
        <div className="flex-1 lg:flex-none">
          <h1 className="text-xl font-semibold text-gray-900 hidden lg:block">
            لوحة التحكم
          </h1>
        </div>

        {/* Right side - actions */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* Language toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onLanguageToggle}
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            <Globe className="h-4 w-4" />
            <span>{language === 'ar' ? 'English' : 'عربي'}</span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {user.notifications > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 text-xs w-5 h-5 flex items-center justify-center p-0"
              >
                {user.notifications}
              </Badge>
            )}
          </Button>

          {/* Messages */}
          <Button variant="ghost" size="icon" className="relative">
            <MessageSquare className="h-5 w-5" />
            {user.messages > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 text-xs w-5 h-5 flex items-center justify-center p-0"
              >
                {user.messages}
              </Badge>
            )}
          </Button>

          {/* User profile */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden md:block">
              {user.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
