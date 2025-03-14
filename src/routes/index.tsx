import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import ProtectedRoute from "../components/layout/ProtectedRoute";
import { useTranslation } from "@hooks";

// Layouts
const CustomerLayout = lazy(() => import("@layouts/CustomerLayout"));
const WorkerLayout = lazy(() => import("@layouts/WorkerLayout"));
const AdminLayout = lazy(() => import("@layouts/AdminLayout"));

// Common Pages
const LandingPage = lazy(() => import("@pages/common/LandingPage"));
const NotFoundPage = lazy(() => import("@pages/common/NotFoundPage"));

// Auth Pages
const LoginPage = lazy(() => import("@pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("@pages/auth/ForgotPasswordPage"));

// Customer Pages
const FindServicePage = lazy(() => import("@pages/customer/FindServicePage"));
const BookingPage = lazy(() => import("@pages/customer/BookingPage"));
const PaymentsPage = lazy(() => import("@pages/customer/PaymentsPage"));
const CustomerDashboardPage = lazy(
  () => import("@pages/customer/DashboardPage")
);
const CustomerProfilePage = lazy(() => import("@pages/customer/ProfilePage"));

// Worker Pages
const JobsPage = lazy(() => import("@pages/worker/JobsPage"));
const EarningsPage = lazy(() => import("@pages/worker/EarningsPage"));
const WorkerDashboardPage = lazy(() => import("@pages/worker/DashboardPage"));
const WorkerProfilePage = lazy(() => import("@pages/worker/ProfilePage"));

// Admin Pages
const AdminDashboardPage = lazy(() => import("@pages/admin/DashboardPage"));
const UsersPage = lazy(() => import("@pages/admin/UsersPage"));
const WorkersPage = lazy(() => import("@pages/admin/WorkersPage"));
const AdminBookingsPage = lazy(() => import("@pages/admin/BookingsPage"));
const AdminPaymentsPage = lazy(() => import("@pages/admin/PaymentsPage"));
const DisputesPage = lazy(() => import("@pages/admin/DashboardPage"));

// Loading Component
const LoadingSpinner = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      <p className="ml-2">{t("common.loading")}</p>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Customer Routes */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route
            index
            element={<Navigate to="/customer/dashboard" replace />}
          />
          <Route path="dashboard" element={<CustomerDashboardPage />} />
          <Route path="find-service" element={<FindServicePage />} />
          <Route path="bookings" element={<BookingPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="profile" element={<CustomerProfilePage />} />
        </Route>

        {/* Worker Routes */}
        <Route path="/worker" element={<WorkerLayout />}>
          <Route index element={<Navigate to="/worker/dashboard" replace />} />
          <Route path="dashboard" element={<WorkerDashboardPage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="earnings" element={<EarningsPage />} />
          <Route path="profile" element={<WorkerProfilePage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="workers" element={<WorkersPage />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
          <Route path="payments" element={<AdminPaymentsPage />} />
          <Route path="disputes" element={<DisputesPage />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
