
import React from 'react';
import { Helmet } from "react-helmet-async";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import DatabaseTest from '@/components/test/DatabaseTest';
import SystemTester from '@/components/test/SystemTester';
import CreateCourseForm from '@/components/forms/CreateCourseForm';
import CreateSessionForm from '@/components/forms/CreateSessionForm';
import CreateAssignmentForm from '@/components/forms/CreateAssignmentForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';

const TestPage = () => {
  const { profile } = useAuth();
  
  return (
    <ProtectedRoute>
      <Helmet>
        <title>صفحة الاختبار - مركز إقامة الكتاب</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">صفحة اختبار شامل للموقع</h1>
              
              <Tabs defaultValue="system-test" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="system-test">اختبار النظام</TabsTrigger>
                  <TabsTrigger value="database">قاعدة البيانات</TabsTrigger>
                  <TabsTrigger value="courses">إنشاء دورة</TabsTrigger>
                  <TabsTrigger value="sessions">إنشاء جلسة</TabsTrigger>
                  <TabsTrigger value="assignments">إنشاء واجب</TabsTrigger>
                </TabsList>

                <TabsContent value="system-test">
                  <SystemTester />
                </TabsContent>

                <TabsContent value="database">
                  <DatabaseTest />
                </TabsContent>

                <TabsContent value="courses">
                  {profile?.role === 'teacher' || profile?.role === 'admin' ? (
                    <CreateCourseForm />
                  ) : (
                    <div className="text-center p-8">
                      <p className="text-gray-500">هذه الميزة متاحة للمدربين والإداريين فقط</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="sessions">
                  {profile?.role === 'teacher' || profile?.role === 'admin' ? (
                    <CreateSessionForm />
                  ) : (
                    <div className="text-center p-8">
                      <p className="text-gray-500">هذه الميزة متاحة للمدربين والإداريين فقط</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="assignments">
                  {profile?.role === 'teacher' || profile?.role === 'admin' ? (
                    <CreateAssignmentForm />
                  ) : (
                    <div className="text-center p-8">
                      <p className="text-gray-500">هذه الميزة متاحة للمدربين والإداريين فقط</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default TestPage;
