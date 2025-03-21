import React, { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX, FiPower } from "react-icons/fi";
import { useTranslation } from "@hooks";
import { LanguageSwitcher, ThemeToggle } from "@components";

const Header = ({
  profile = null,
  navItems = null,
  fromLandingPage = false,
}) => {
  const { t } = useTranslation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Fragment>
      <header className="sticky top-0 z-10 bg-white dark:bg-dark-800 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl font-bold text-primary">
              KaamReady
            </NavLink>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {profile && (
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {profile?.name ? (
                  <span>
                    {t("common.welcome")}, {profile.name}
                  </span>
                ) : (
                  <span>{t("common.welcome")}</span>
                )}
              </div>
            )}
            <div className="relative flex justify-center items-center gap-2.5">
              {profile && (
                <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                    {profile?.name ? profile.name.charAt(0).toUpperCase() : "U"}
                  </div>
                </button>
              )}
              <LanguageSwitcher />
              {!fromLandingPage && <ThemeToggle />}
              {profile ? (
                <button
                  // className="md:hidden"
                  onClick={() => console.log("Logout")}
                >
                  {<FiPower size={24} />}
                </button>
              ) : (
                <Fragment>
                  <div className="hidden md:flex items-center space-x-4">
                    <Link
                      to="/login"
                      className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400"
                    >
                      {t("auth.login")}
                    </Link>
                    <Link to="/register" className="btn-primary">
                      {t("auth.register")}
                    </Link>
                  </div>

                  <div className="md:hidden flex items-center">
                    <Link
                      to="/login"
                      className="text-gray-700 hover:text-primary mr-2"
                    >
                      {t("auth.login")}
                    </Link>
                    <Link
                      to="/register"
                      className="btn-primary text-sm py-1 px-2"
                    >
                      {t("auth.register")}
                    </Link>
                  </div>
                </Fragment>
              )}
            </div>
          </div>

          {!fromLandingPage && (
            <button className="md:hidden" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          )}
        </div>
      </header>
      {/* Mobile Navigation Menu */}
      {fromLandingPage && isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-20 bg-black bg-opacity-50"
          onClick={toggleMobileMenu}
        >
          <div
            className="bg-white dark:bg-dark-800 w-64 h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                  {profile?.name ? profile.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <p className="font-medium">
                    {profile?.name || t("common.guest")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {profile?.email || ""}
                  </p>
                </div>
              </div>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                {navItems &&
                  navItems.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 p-3 rounded-md transition-colors ${
                            isActive
                              ? "bg-primary text-white"
                              : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`
                        }
                        onClick={toggleMobileMenu}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Header;
