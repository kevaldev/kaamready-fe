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
import AppLayout from "./AppLayout";
import { NavItem } from "@lib/types";

const CustomerLayout = () => {
  const { t } = useTranslation();
  const userProfile = useSelector(selectUserProfile);

  // const navItems: NavItem[] = [
  //   {
  //     icon: <GridIcon />,
  //     name: "Dashboard",
  //     subItems: [{ name: "Ecommerce", path: "/", pro: false }],
  //   },
  //   {
  //     icon: <CalenderIcon />,
  //     name: "Calendar",
  //     path: "/calendar",
  //   },
  //   {
  //     icon: <UserCircleIcon />,
  //     name: "User Profile",
  //     path: "/profile",
  //   },
  //   {
  //     name: "Forms",
  //     icon: <ListIcon />,
  //     subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
  //   },
  //   {
  //     name: "Tables",
  //     icon: <TableIcon />,
  //     subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
  //   },
  //   {
  //     name: "Pages",
  //     icon: <PageIcon />,
  //     subItems: [
  //       { name: "Blank Page", path: "/blank", pro: false },
  //       { name: "404 Error", path: "/error-404", pro: false },
  //     ],
  //   },
  // ];

  // const othersItems: NavItem[] = [
  //   {
  //     icon: <PieChartIcon />,
  //     name: "Charts",
  //     subItems: [
  //       { name: "Line Chart", path: "/line-chart", pro: false },
  //       { name: "Bar Chart", path: "/bar-chart", pro: false },
  //     ],
  //   },
  //   {
  //     icon: <BoxCubeIcon />,
  //     name: "UI Elements",
  //     subItems: [
  //       { name: "Alerts", path: "/alerts", pro: false },
  //       { name: "Avatar", path: "/avatars", pro: false },
  //       { name: "Badge", path: "/badge", pro: false },
  //       { name: "Buttons", path: "/buttons", pro: false },
  //       { name: "Images", path: "/images", pro: false },
  //       { name: "Videos", path: "/videos", pro: false },
  //     ],
  //   },
  //   {
  //     icon: <PlugInIcon />,
  //     name: "Authentication",
  //     subItems: [
  //       { name: "Sign In", path: "/signin", pro: false },
  //       { name: "Sign Up", path: "/signup", pro: false },
  //     ],
  //   },
  // ];

  const navItems: NavItem[] = [
    {
      path: "/customer/dashboard",
      name: t("customer.dashboard"),
      icon: <FiHome size={20} />,
    },
    {
      path: "/customer/find-service",
      name: t("customer.findService"),
      icon: <FiSearch size={20} />,
    },
    {
      path: "/customer/bookings",
      name: t("customer.bookings"),
      icon: <FiCalendar size={20} />,
    },
    {
      path: "/customer/payments",
      name: t("customer.payments"),
      icon: <FiCreditCard size={20} />,
    },
    {
      path: "/customer/profile",
      name: t("customer.profile"),
      icon: <FiUser size={20} />,
    },
  ];

  return <AppLayout navItems={navItems} />;
};

export default CustomerLayout;
