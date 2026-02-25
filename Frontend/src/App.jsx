import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useUIStore } from './stores/uiStore';
import { useAuthStore } from './stores/authStore';
import { ToastProvider } from './components/ui/Toast';
import ErrorBoundary from './components/shared/ErrorBoundary';
import AppLayout from './components/layout/AppLayout';
import { Skeleton } from './components/ui/Skeleton';

// Lazy-loaded pages (code splitting per route)
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const SignupPage = lazy(() => import('./pages/auth/SignupPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPasswordPage'));
const VerifyEmailPage = lazy(() => import('./pages/auth/VerifyEmailPage'));
const TwoFactorPage = lazy(() => import('./pages/auth/TwoFactorPage'));
const SessionExpiredPage = lazy(() => import('./pages/auth/SessionExpiredPage'));
const UnauthorizedPage = lazy(() => import('./pages/auth/UnauthorizedPage'));
const NotFoundPage = lazy(() => import('./pages/auth/NotFoundPage'));

const ProfileSetupPage = lazy(() => import('./pages/student/ProfileSetupPage'));
const DashboardPage = lazy(() => import('./pages/student/DashboardPage'));
const ProfilePage = lazy(() => import('./pages/student/ProfilePage'));
const SkillIntelligencePage = lazy(() => import('./pages/student/SkillIntelligencePage'));
const JobMatchingPage = lazy(() => import('./pages/student/JobMatchingPage'));
const ApplicationTrackerPage = lazy(() => import('./pages/student/ApplicationTrackerPage'));
const ApplicationDetailPage = lazy(() => import('./pages/student/ApplicationDetailPage'));
const AssessmentPage = lazy(() => import('./pages/student/AssessmentPage'));
const CodingAssessmentPage = lazy(() => import('./pages/student/CodingAssessmentPage'));
const TestPlayerPage = lazy(() => import('./pages/student/TestPlayerPage'));

const RecruiterPortalPage = lazy(() => import('./pages/recruiter/RecruiterPortalPage'));
const CandidateDetailPage = lazy(() => import('./pages/recruiter/CandidateDetailPage'));

const GovernanceDashboardPage = lazy(() => import('./pages/admin/GovernanceDashboardPage'));
const PolicyEnginePage = lazy(() => import('./pages/admin/PolicyEnginePage'));
const AnalyticsPage = lazy(() => import('./pages/analytics/AnalyticsPage'));
const NotificationCenterPage = lazy(() => import('./pages/notifications/NotificationCenterPage'));
const SettingsPage = lazy(() => import('./pages/settings/SettingsPage'));

const LandingPage = lazy(() => import('./pages/LandingPage'));

function PageLoader() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
      </div>
      <Skeleton className="h-64 rounded-xl mt-4" />
    </div>
  );
}

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuthStore();
  // If allowedRoles is specified, enforce role-based access
  if (allowedRoles && allowedRoles.length > 0) {
    if (!user || !allowedRoles.includes(user.role)) {
      return <Navigate to="/dashboard" replace />;
    }
  }
  return children;
}

export default function App() {
  const { initTheme } = useUIStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <ErrorBoundary>
      <ToastProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Landing Page */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* Public Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/2fa" element={<TwoFactorPage />} />
              <Route path="/session-expired" element={<SessionExpiredPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />

              {/* Onboarding */}
              <Route path="/onboarding" element={<ProtectedRoute><ProfileSetupPage /></ProtectedRoute>} />

              {/* Assessment Players (Fullscreen Mode) */}
              <Route path="/assessments/coding/:id" element={<ProtectedRoute><CodingAssessmentPage /></ProtectedRoute>} />
              <Route path="/assessments/player/:id" element={<ProtectedRoute><TestPlayerPage /></ProtectedRoute>} />

              {/* Main App Shell */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="skills" element={<SkillIntelligencePage />} />
                <Route path="job-matching" element={<JobMatchingPage />} />
                <Route path="applications" element={<ApplicationTrackerPage />} />
                <Route path="applications/:id" element={<ApplicationDetailPage />} />
                <Route path="assessments" element={<AssessmentPage />} />

                {/* Recruiter specific */}
                <Route path="recruiter" element={<ProtectedRoute allowedRoles={['recruiter', 'admin']}><RecruiterPortalPage /></ProtectedRoute>} />
                <Route path="recruiter/candidate/:id" element={<ProtectedRoute allowedRoles={['recruiter', 'admin']}><CandidateDetailPage /></ProtectedRoute>} />

                {/* Admin specific */}
                <Route path="admin" element={<ProtectedRoute allowedRoles={['admin']}><GovernanceDashboardPage /></ProtectedRoute>} />
                <Route path="policy" element={<ProtectedRoute allowedRoles={['admin']}><PolicyEnginePage /></ProtectedRoute>} />

                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="notifications" element={<NotificationCenterPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  );
}
