import { SidebarProvider, useSidebar } from "@context/SidebarContext";
import { Outlet } from "react-router";
import { AppHeader, AppSidebar, Backdrop } from "./common";
import { NavItem } from "@lib/types";

interface LayoutContentProps {
  navItems: NavItem[] | [];
  othersItems?: NavItem[] | [];
}

const LayoutContent: React.FC<LayoutContentProps> = ({
  navItems = [],
  othersItems = [],
}) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar navItems={navItems} othersItems={othersItems} />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC<LayoutContentProps> = ({
  navItems = [],
  othersItems = [],
}) => {
  return (
    <SidebarProvider>
      <LayoutContent navItems={navItems} othersItems={othersItems} />
    </SidebarProvider>
  );
};

export default AppLayout;
