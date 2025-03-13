import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserProfile } from "@redux/slices/userSlice";
import {
  FiHome,
  FiSearch,
  FiCalendar,
  FiCreditCard,
  FiUser,
} from "react-icons/fi";

import { useTranslation } from "@hooks";
import { Header, Footer, Sidebar } from "./common";

const CustomerLayout = () => {
  const { t } = useTranslation();
  const userProfile = useSelector(selectUserProfile);

  const navItems = [
    {
      path: "/customer/dashboard",
      label: t("customer.dashboard"),
      icon: <FiHome size={20} />,
    },
    {
      path: "/customer/find-service",
      label: t("customer.findService"),
      icon: <FiSearch size={20} />,
    },
    {
      path: "/customer/bookings",
      label: t("customer.bookings"),
      icon: <FiCalendar size={20} />,
    },
    {
      path: "/customer/payments",
      label: t("customer.payments"),
      icon: <FiCreditCard size={20} />,
    },
    {
      path: "/customer/profile",
      label: t("customer.profile"),
      icon: <FiUser size={20} />,
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

export default CustomerLayout;
