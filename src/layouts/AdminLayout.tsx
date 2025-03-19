import { useSelector } from "react-redux";
import {
  FiHome,
  FiUsers,
  FiBriefcase,
  FiDollarSign,
  FiAlertTriangle,
} from "react-icons/fi";

import { selectUserProfile } from "@redux/slices/userSlice";
import { useTranslation } from "@hooks";
import AppLayout from "./AppLayout";
import { NavItem } from "@lib/types";

const AdminLayout = () => {
  const { t } = useTranslation();
  const userProfile = useSelector(selectUserProfile);

  const navItems: NavItem[] = [
    {
      path: "/admin/dashboard",
      name: t("admin.dashboard"),
      icon: <FiHome size={20} />,
    },
    {
      path: "/admin/users",
      name: t("admin.users"),
      icon: <FiUsers size={20} />,
    },
    {
      path: "/admin/workers",
      name: t("admin.workers"),
      icon: <FiBriefcase size={20} />,
    },
    {
      path: "/admin/bookings",
      name: t("admin.bookings"),
      icon: <FiBriefcase size={20} />,
    },
    {
      path: "/admin/payments",
      name: t("admin.payments"),
      icon: <FiDollarSign size={20} />,
    },
    {
      path: "/admin/disputes",
      name: t("admin.disputes"),
      icon: <FiAlertTriangle size={20} />,
    },
  ];

  return <AppLayout navItems={navItems} />;
};

export default AdminLayout;
