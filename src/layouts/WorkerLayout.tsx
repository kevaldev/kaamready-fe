import { useSelector } from "react-redux";
import { FiHome, FiBriefcase, FiDollarSign, FiUser } from "react-icons/fi";

import { selectUserProfile } from "@redux/slices/userSlice";
import { useTranslation } from "@hooks";
import { NavItem } from "@lib/types";
import AppLayout from "./AppLayout";

const WorkerLayout = () => {
  const { t } = useTranslation();
  const userProfile = useSelector(selectUserProfile);

  const navItems: NavItem[] = [
    {
      path: "/worker/dashboard",
      name: t("worker.dashboard"),
      icon: <FiHome size={20} />,
    },
    {
      path: "/worker/jobs",
      name: t("worker.jobs"),
      icon: <FiBriefcase size={20} />,
    },
    {
      path: "/worker/earnings",
      name: t("worker.earnings"),
      icon: <FiDollarSign size={20} />,
    },
    {
      path: "/worker/profile",
      name: t("worker.profile"),
      icon: <FiUser size={20} />,
    },
  ];

  return <AppLayout navItems={navItems} />;
};

export default WorkerLayout;
