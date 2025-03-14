import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FiHome,
  FiUsers,
  FiBriefcase,
  FiDollarSign,
  FiAlertTriangle,
  FiMenu,
  FiX,
} from "react-icons/fi";

import { selectUserProfile } from "@redux/slices/userSlice";
import { useTranslation } from "@hooks";
import { Footer, Header, Sidebar } from "./common";

const AdminLayout = () => {
  const { t } = useTranslation();
  const userProfile = useSelector(selectUserProfile);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    {
      path: "/admin/dashboard",
      label: t("admin.dashboard"),
      icon: <FiHome size={20} />,
    },
    {
      path: "/admin/users",
      label: t("admin.users"),
      icon: <FiUsers size={20} />,
    },
    {
      path: "/admin/workers",
      label: t("admin.workers"),
      icon: <FiBriefcase size={20} />,
    },
    {
      path: "/admin/bookings",
      label: t("admin.bookings"),
      icon: <FiBriefcase size={20} />,
    },
    {
      path: "/admin/payments",
      label: t("admin.payments"),
      icon: <FiDollarSign size={20} />,
    },
    {
      path: "/admin/disputes",
      label: t("admin.disputes"),
      icon: <FiAlertTriangle size={20} />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-light">
      {/* Header */}
      <Header profile={userProfile} navItems={navItems} />

      <div className="flex flex-1">
        {/* Sidebar Navigation - Desktop */}
        <Sidebar navItems={navItems} />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminLayout;
