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
          <Route path="dashboard" element={<div>Admin Dashboard</div>} />
          <Route path="users" element={<div>User Management</div>} />
          <Route path="workers" element={<div>Worker Management</div>} />
          <Route path="bookings" element={<div>Booking Management</div>} />
          <Route path="payments" element={<div>Payment Management</div>} />
          <Route path="disputes" element={<div>Dispute Management</div>} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
