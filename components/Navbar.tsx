import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Ruler, LogOut, LayoutDashboard } from 'lucide-react';
import { NavItem } from '../types';
import { useAuth } from '../context/AuthContext';

const navItems: NavItem[] = [
  { label: 'صفحه اصلی', path: '/' },
  { label: 'درباره ما', path: '/about' },
  { label: 'خدمات', path: '/services' },
  { label: 'پروژه‌ها', path: '/projects' },
  { label: 'بلاگ مهندسی', path: '/blog' },
  { label: 'تماس با ما', path: '/contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg border-b-4 border-[#FFD400]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 space-x-reverse">
              <div className="bg-[#FFD400] p-2 rounded-lg text-slate-900">
                <Ruler className="h-8 w-8" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-wide text-white">مهندسی دقیق</span>
                <span className="text-xs text-[#FFD400]">survey-af.com</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors duration-200 font-medium ${
                  isActive(item.path)
                    ? 'text-[#FFD400]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4 space-x-reverse">
                <Link
                  to="/admin"
                  className="bg-slate-800 text-white border border-slate-700 px-4 py-2 rounded-md font-bold flex items-center space-x-2 space-x-reverse hover:bg-slate-700"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>مدیریت</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-red-400"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/request-quote"
                className="bg-[#FFD400] hover:bg-yellow-500 text-slate-900 px-5 py-2 rounded-md font-bold transition-all shadow-md transform hover:scale-105"
              >
                درخواست جریب‌کشی
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-300">
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path) ? 'bg-slate-900 text-[#FFD400]' : 'text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;