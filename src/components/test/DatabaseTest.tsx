
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const DatabaseTest = () => {
  const { data: testResults, isLoading } = useQuery({
    queryKey: ['database-test'],
    queryFn: async () => {
      const results = {
        profiles: { count: 0, status: 'error' },
        courses: { count: 0, status: 'error' },
        sessions: { count: 0, status: 'error' },
        assignments: { count: 0, status: 'error' },
        enrollments: { count: 0, status: 'error' },
      };

      try {
        // Test profiles
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*');
        if (!profilesError) {
          results.profiles = { count: profiles?.length || 0, status: 'success' };
        }

        // Test courses
        const { data: courses, error: coursesError } = await supabase
          .from('courses')
          .select('*');
        if (!coursesError) {
          results.courses = { count: courses?.length || 0, status: 'success' };
        }

        // Test sessions
        const { data: sessions, error: sessionsError } = await supabase
          .from('sessions')
          .select('*');
        if (!sessionsError) {
          results.sessions = { count: sessions?.length || 0, status: 'success' };
        }

        // Test assignments
        const { data: assignments, error: assignmentsError } = await supabase
          .from('assignments')
          .select('*');
        if (!assignmentsError) {
          results.assignments = { count: assignments?.length || 0, status: 'success' };
        }

        // Test enrollments
        const { data: enrollments, error: enrollmentsError } = await supabase
          .from('enrollments')
          .select('*');
        if (!enrollmentsError) {
          results.enrollments = { count: enrollments?.length || 0, status: 'success' };
        }

        return results;
      } catch (error) {
        console.error('Database test error:', error);
        return results;
      }
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>اختبار قاعدة البيانات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">جاري اختبار الاتصال...</div>
        </CardContent>
      </Card>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="default" className="bg-green-100 text-green-800">متصل</Badge>;
      case 'error':
        return <Badge variant="destructive">خطأ</Badge>;
      default:
        return <Badge variant="secondary">غير محدد</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تقرير حالة قاعدة البيانات</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {testResults && Object.entries(testResults).map(([table, result]) => (
            <div key={table} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                {getStatusIcon(result.status)}
                <div>
                  <p className="font-medium">
                    {table === 'profiles' && 'الملفات الشخصية'}
                    {table === 'courses' && 'الدورات'}
                    {table === 'sessions' && 'الجلسات'}
                    {table === 'assignments' && 'الواجبات'}
                    {table === 'enrollments' && 'التسجيلات'}
                  </p>
                  <p className="text-sm text-gray-600">عدد السجلات: {result.count}</p>
                </div>
              </div>
              {getStatusBadge(result.status)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseTest;
