import { Outlet, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectUserProfile } from '@redux/slices/userSlice';
import { FiHome, FiUsers, FiBriefcase, FiDollarSign, FiAlertTriangle, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

const AdminLayout = () => {
  const { t } = useTranslation();
  const userProfile = useSelector(selectUserProfile);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { path: '/admin/dashboard', label: t('admin.dashboard'), icon: <FiHome size={20} /> },
    { path: '/admin/users', label: t('admin.users'), icon: <FiUsers size={20} /> },
    { path: '/admin/workers', label: t('admin.workers'), icon: <FiBriefcase size={20} /> },
    { path: '/admin/bookings', label: t('admin.bookings'), icon: <FiBriefcase size={20} /> },
    { path: '/admin/payments', label: t('admin.payments'), icon: <FiDollarSign size={20} /> },
    { path: '/admin/disputes', label: t('admin.disputes'), icon: <FiAlertTriangle size={20} /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-light">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl font-bold text-primary">
              KaamReady <span className="text-sm font-normal text-gray-500">Admin</span>
            </NavLink>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              {userProfile?.name ? (
                <span>{t('common.welcome')}, {userProfile.name}</span>
              ) : (
                <span>{t('common.welcome')}</span>
              )}
            </div>
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                  {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'A'}
                </div>
              </button>
            </div>
          </div>
          
          <button className="md:hidden" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Navigation - Desktop */}
        <aside className="hidden md:block w-64 bg-white shadow-sm">
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 p-3 rounded-md transition-colors ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-20 bg-black bg-opacity-50" onClick={toggleMobileMenu}>
            <div className="bg-white w-64 h-full" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                    {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <div>
                    <p className="font-medium">{userProfile?.name || t('common.admin')}</p>
                    <p className="text-sm text-gray-500">{userProfile?.email || ''}</p>
                  </div>
                </div>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 p-3 rounded-md transition-colors ${
                            isActive
                              ? 'bg-primary text-white'
                              : 'text-gray-700 hover:bg-gray-100'
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

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-sm py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} KaamReady. {t('common.allRightsReserved')}</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;