import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiHome, FiBriefcase, FiDollarSign, FiUser } from "react-icons/fi";

import { selectUserProfile } from "@redux/slices/userSlice";
import { useTranslation } from "@hooks";
import { Header, Footer, Sidebar } from "./common";

const WorkerLayout = () => {
  const { t } = useTranslation();
  const userProfile = useSelector(selectUserProfile);

  const navItems = [
    {
      path: "/worker/dashboard",
      label: t("worker.dashboard"),
      icon: <FiHome size={20} />,
    },
    {
      path: "/worker/jobs",
      label: t("worker.jobs"),
      icon: <FiBriefcase size={20} />,
    },
    {
      path: "/worker/earnings",
      label: t("worker.earnings"),
      icon: <FiDollarSign size={20} />,
    },
    {
      path: "/worker/profile",
      label: t("worker.profile"),
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

export default WorkerLayout;
