import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import RoleSelection from "./pages/Auth/RoleSelection";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import ResearcherDashboard from "./pages/Dashboard/ResearcherDashboard";
import StudentDashboard from "./pages/Dashboard/StudentDashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import Projects from "./pages/Projects/Projects";
import ProjectOverview from "./pages/Projects/ProjectOverview";
import ProjectDetails from "./pages/Projects/ProjectDetails";
import Tasks from "./pages/Tasks/Tasks";
import Messages from "./pages/Messages/Messages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/role-selection" element={
            <ProtectedRoute>
              <RoleSelection />
            </ProtectedRoute>
          } />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Protected Routes - Researcher */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['researcher', 'admin']}>
                <ResearcherDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected Routes - Admin */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/analytics" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected Routes - Student */}
          <Route 
            path="/student/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected Routes - All authenticated users */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/projects" 
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <ProjectDetails />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/my-projects" 
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tasks" 
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/messages" 
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            } 
          />
          
          {/* Placeholder routes */}
          <Route path="/resources" element={<NotFound />} />
          <Route path="/learning" element={<NotFound />} />
          <Route path="/progress" element={<NotFound />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
