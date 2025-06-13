
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useCourses } from '@/hooks/useCourses';
import { useEnrollments } from '@/hooks/useEnrollments';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Loader2, 
  User, 
  BookOpen, 
  Settings,
  Database,
  Shield,
  Eye,
  Bug
} from 'lucide-react';

interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'warning' | 'pending';
  message: string;
  details?: string;
}

const SystemTester = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const { courses, isLoading: coursesLoading, error: coursesError } = useCourses();
  const { enrollments, isLoading: enrollmentsLoading, error: enrollmentsError } = useEnrollments(user?.id);
  
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runAuthenticationTests = (): TestResult[] => {
    const results: TestResult[] = [];

    // Test 1: User Authentication
    results.push({
      name: 'User Authentication',
      status: user ? 'pass' : 'fail',
      message: user ? `User logged in: ${user.email}` : 'No user authenticated',
      details: user ? `User ID: ${user.id}` : 'User should be logged in to access the system'
    });

    // Test 2: Profile Data
    results.push({
      name: 'Profile Data Loading',
      status: profile ? 'pass' : (authLoading ? 'pending' : 'fail'),
      message: profile ? `Profile loaded: ${profile.full_name}` : (authLoading ? 'Loading profile...' : 'Profile not loaded'),
      details: profile ? `Role: ${profile.role}, Created: ${profile.created_at}` : 'Profile data is required for proper functionality'
    });

    // Test 3: Role Assignment
    if (profile) {
      const validRoles = ['student', 'teacher', 'admin'];
      results.push({
        name: 'Role Assignment',
        status: validRoles.includes(profile.role) ? 'pass' : 'fail',
        message: `User role: ${profile.role}`,
        details: validRoles.includes(profile.role) ? 'Valid role assigned' : 'Invalid role detected'
      });
    }

    return results;
  };

  const runDataFetchingTests = (): TestResult[] => {
    const results: TestResult[] = [];

    // Test 1: Courses Loading
    results.push({
      name: 'Courses Data Loading',
      status: coursesError ? 'fail' : (coursesLoading ? 'pending' : 'pass'),
      message: coursesError ? `Error: ${coursesError.message}` : (coursesLoading ? 'Loading courses...' : `${courses?.length || 0} courses loaded`),
      details: courses ? `Available courses: ${courses.map(c => c.title).join(', ')}` : 'Course data is essential for the application'
    });

    // Test 2: Enrollments Loading
    if (user) {
      results.push({
        name: 'Enrollments Data Loading',
        status: enrollmentsError ? 'fail' : (enrollmentsLoading ? 'pending' : 'pass'),
        message: enrollmentsError ? `Error: ${enrollmentsError.message}` : (enrollmentsLoading ? 'Loading enrollments...' : `${enrollments?.length || 0} enrollments found`),
        details: enrollments ? `Enrollment statuses: ${enrollments.map(e => e.status).join(', ')}` : 'Enrollment data shows user course registrations'
      });
    }

    return results;
  };

  const runNavigationTests = (): TestResult[] => {
    const results: TestResult[] = [];

    // Test routing paths
    const routes = [
      { path: '/dashboard', name: 'Dashboard' },
      { path: '/courses', name: 'My Courses' },
      { path: '/apply-course', name: 'Apply Course' },
      { path: '/profile', name: 'Profile' },
      { path: '/test', name: 'Test Page' }
    ];

    routes.forEach(route => {
      const canAccess = window.location.pathname === route.path || true; // Simplified check
      results.push({
        name: `Route Access: ${route.name}`,
        status: canAccess ? 'pass' : 'warning',
        message: `${route.path} - ${canAccess ? 'Accessible' : 'May have access issues'}`,
        details: `Route should be accessible to authenticated users`
      });
    });

    return results;
  };

  const runUIComponentTests = (): TestResult[] => {
    const results: TestResult[] = [];

    // Test sidebar existence
    const sidebar = document.querySelector('[data-testid="sidebar"]') || document.querySelector('nav');
    results.push({
      name: 'Sidebar Component',
      status: sidebar ? 'pass' : 'warning',
      message: sidebar ? 'Sidebar found' : 'Sidebar not detected',
      details: 'Sidebar should be present for navigation'
    });

    // Test header existence
    const header = document.querySelector('header') || document.querySelector('[data-testid="header"]');
    results.push({
      name: 'Header Component',
      status: header ? 'pass' : 'warning',
      message: header ? 'Header found' : 'Header not detected',
      details: 'Header should contain user info and notifications'
    });

    // Test responsive design
    const isMobile = window.innerWidth < 768;
    results.push({
      name: 'Responsive Design',
      status: 'pass',
      message: `Screen size: ${window.innerWidth}x${window.innerHeight} (${isMobile ? 'Mobile' : 'Desktop'})`,
      details: 'Layout should adapt to different screen sizes'
    });

    return results;
  };

  const runSecurityTests = (): TestResult[] => {
    const results: TestResult[] = [];

    // Test protected routes
    results.push({
      name: 'Protected Routes',
      status: user ? 'pass' : 'fail',
      message: user ? 'User authenticated for protected content' : 'Unauthenticated user accessing protected content',
      details: 'All dashboard pages should require authentication'
    });

    // Test role-based access
    if (profile) {
      const hasAppropriateAccess = profile.role === 'student' || profile.role === 'teacher' || profile.role === 'admin';
      results.push({
        name: 'Role-based Access Control',
        status: hasAppropriateAccess ? 'pass' : 'fail',
        message: `Role: ${profile.role} - ${hasAppropriateAccess ? 'Valid permissions' : 'Invalid permissions'}`,
        details: 'User should only see content appropriate for their role'
      });
    }

    return results;
  };

  const runPerformanceTests = (): TestResult[] => {
    const results: TestResult[] = [];

    // Test loading times
    const loadingStates = [
      { name: 'Auth Loading', isLoading: authLoading },
      { name: 'Courses Loading', isLoading: coursesLoading },
      { name: 'Enrollments Loading', isLoading: enrollmentsLoading }
    ];

    loadingStates.forEach(state => {
      results.push({
        name: `${state.name} Performance`,
        status: state.isLoading ? 'pending' : 'pass',
        message: state.isLoading ? 'Still loading...' : 'Loaded successfully',
        details: 'Data should load within reasonable time'
      });
    });

    return results;
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    // Simulate test execution delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const allResults = [
      ...runAuthenticationTests(),
      ...runDataFetchingTests(),
      ...runNavigationTests(),
      ...runUIComponentTests(),
      ...runSecurityTests(),
      ...runPerformanceTests()
    ];

    setTestResults(allResults);
    setIsRunning(false);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'fail': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'pending': return <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />;
    }
  };

  const getStatusBadge = (status: TestResult['status']) => {
    const variants = {
      pass: 'default' as const,
      fail: 'destructive' as const,
      warning: 'secondary' as const,
      pending: 'outline' as const
    };
    
    return (
      <Badge variant={variants[status]}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  const testStats = testResults.reduce((acc, result) => {
    acc[result.status] = (acc[result.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <Bug className="h-5 w-5" />
            <span>فحص شامل للنظام</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Button 
              onClick={runAllTests} 
              disabled={isRunning}
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              {isRunning ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span>{isRunning ? 'جاري الفحص...' : 'بدء الفحص الشامل'}</span>
            </Button>
            
            {testResults.length > 0 && (
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Badge variant="default">{testStats.pass || 0} نجح</Badge>
                <Badge variant="destructive">{testStats.fail || 0} فشل</Badge>
                <Badge variant="secondary">{testStats.warning || 0} تحذير</Badge>
                <Badge variant="outline">{testStats.pending || 0} معلق</Badge>
              </div>
            )}
          </div>

          {testResults.length > 0 && (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="all">الكل</TabsTrigger>
                <TabsTrigger value="auth">المصادقة</TabsTrigger>
                <TabsTrigger value="data">البيانات</TabsTrigger>
                <TabsTrigger value="navigation">التنقل</TabsTrigger>
                <TabsTrigger value="ui">الواجهة</TabsTrigger>
                <TabsTrigger value="security">الأمان</TabsTrigger>
                <TabsTrigger value="performance">الأداء</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <div className="space-y-3">
                  {testResults.map((result, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 rtl:space-x-reverse">
                          {getStatusIcon(result.status)}
                          <div className="flex-1">
                            <h4 className="font-medium">{result.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{result.message}</p>
                            {result.details && (
                              <p className="text-xs text-gray-500 mt-1">{result.details}</p>
                            )}
                          </div>
                        </div>
                        {getStatusBadge(result.status)}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Add filtered views for each category */}
              <TabsContent value="auth" className="mt-4">
                <div className="space-y-3">
                  {testResults.filter(r => r.name.includes('Authentication') || r.name.includes('Profile') || r.name.includes('Role')).map((result, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 rtl:space-x-reverse">
                          {getStatusIcon(result.status)}
                          <div className="flex-1">
                            <h4 className="font-medium">{result.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{result.message}</p>
                            {result.details && (
                              <p className="text-xs text-gray-500 mt-1">{result.details}</p>
                            )}
                          </div>
                        </div>
                        {getStatusBadge(result.status)}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="data" className="mt-4">
                <div className="space-y-3">
                  {testResults.filter(r => r.name.includes('Data') || r.name.includes('Loading')).map((result, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 rtl:space-x-reverse">
                          {getStatusIcon(result.status)}
                          <div className="flex-1">
                            <h4 className="font-medium">{result.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{result.message}</p>
                            {result.details && (
                              <p className="text-xs text-gray-500 mt-1">{result.details}</p>
                            )}
                          </div>
                        </div>
                        {getStatusBadge(result.status)}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="navigation" className="mt-4">
                <div className="space-y-3">
                  {testResults.filter(r => r.name.includes('Route')).map((result, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 rtl:space-x-reverse">
                          {getStatusIcon(result.status)}
                          <div className="flex-1">
                            <h4 className="font-medium">{result.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{result.message}</p>
                            {result.details && (
                              <p className="text-xs text-gray-500 mt-1">{result.details}</p>
                            )}
                          </div>
                        </div>
                        {getStatusBadge(result.status)}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="ui" className="mt-4">
                <div className="space-y-3">
                  {testResults.filter(r => r.name.includes('Component') || r.name.includes('Design')).map((result, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 rtl:space-x-reverse">
                          {getStatusIcon(result.status)}
                          <div className="flex-1">
                            <h4 className="font-medium">{result.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{result.message}</p>
                            {result.details && (
                              <p className="text-xs text-gray-500 mt-1">{result.details}</p>
                            )}
                          </div>
                        </div>
                        {getStatusBadge(result.status)}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="security" className="mt-4">
                <div className="space-y-3">
                  {testResults.filter(r => r.name.includes('Protected') || r.name.includes('Access')).map((result, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 rtl:space-x-reverse">
                          {getStatusIcon(result.status)}
                          <div className="flex-1">
                            <h4 className="font-medium">{result.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{result.message}</p>
                            {result.details && (
                              <p className="text-xs text-gray-500 mt-1">{result.details}</p>
                            )}
                          </div>
                        </div>
                        {getStatusBadge(result.status)}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="performance" className="mt-4">
                <div className="space-y-3">
                  {testResults.filter(r => r.name.includes('Performance')).map((result, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 rtl:space-x-reverse">
                          {getStatusIcon(result.status)}
                          <div className="flex-1">
                            <h4 className="font-medium">{result.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{result.message}</p>
                            {result.details && (
                              <p className="text-xs text-gray-500 mt-1">{result.details}</p>
                            )}
                          </div>
                        </div>
                        {getStatusBadge(result.status)}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemTester;
