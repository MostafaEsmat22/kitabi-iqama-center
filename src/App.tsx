
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import MyCourses from "./pages/MyCourses";
import ApplyCourse from "./pages/ApplyCourse";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Support from "./pages/Support";
import Summary from "./pages/Summary";
import Performance from "./pages/Performance";
import Wallet from "./pages/Wallet";
import CompletedCourses from "./pages/CompletedCourses";
import CourseDetails from "./pages/CourseDetails";
import TermsPrivacy from "./pages/TermsPrivacy";
import AdminRegister from "./pages/AdminRegister";
import TeacherRegister from "./pages/TeacherRegister";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: (failureCount, error: any) => {
        if (error?.status === 404) return false;
        return failureCount < 2;
      },
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Helmet>
          <title>مركز إقامة الكتاب</title>
          <meta name="description" content="منصة تعليمية لتحفيظ القرآن الكريم وتعليم العلوم الشرعية" />
          <meta name="keywords" content="تحفيظ القرآن, تعليم القرآن, العلوم الشرعية, مركز إقامة الكتاب" />
        </Helmet>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
              <Route path="/courses" element={<MyCourses />} />
              <Route path="/apply-course" element={<ApplyCourse />} />
              <Route path="/course/:id" element={<CourseDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/support" element={<Support />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/completed" element={<CompletedCourses />} />
              <Route path="/terms" element={<TermsPrivacy />} />
              <Route path="/admin-register" element={<AdminRegister />} />
              <Route path="/teacher-register" element={<TeacherRegister />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
