import { ReactNode } from 'react';
import ThemeToggle from '@components/ThemeToggle';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-light dark:bg-dark text-dark dark:text-light transition-colors duration-200">
      <header className="sticky top-0 z-10 bg-white dark:bg-dark-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary dark:text-primary-300">KaamReady</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {/* Add other header elements like navigation, user menu, etc. */}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-primary-900 dark:bg-primary-950 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">KaamReady</h3>
              <p className="text-primary-100">Connecting customers with skilled workers.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-primary-100 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-primary-100 hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="text-primary-100 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-primary-100 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className="text-primary-100">Email: info@kaamready.com</p>
              <p className="text-primary-100">Phone: +91 1234567890</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-primary-700 text-center text-primary-300">
            <p>© {new Date().getFullYear()} KaamReady. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;