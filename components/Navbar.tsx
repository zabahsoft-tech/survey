import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Ruler, Map as MapIcon } from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'صفحه اصلی', path: '/' },
  { label: 'درباره ما', path: '/about' },
  { label: 'خدمات', path: '/services' },
  { label: 'پروژه‌ها', path: '/projects' },
  { label: 'تماس با ما', path: '/contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg border-b-4 border-[#FFD400]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 space-x-reverse">
              <div className="bg-[#FFD400] p-2 rounded-lg text-slate-900">
                <Ruler className="h-8 w-8" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-wide text-white">مهندسی دقیق</span>
                <span className="text-xs text-[#FFD400]">خدمات جریب‌کشی و نقشه‌برداری</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
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
            <Link
              to="/request-quote"
              className="bg-[#FFD400] hover:bg-yellow-500 text-slate-900 px-5 py-2 rounded-md font-bold transition-all shadow-md transform hover:scale-105"
            >
              درخواست جریب‌کشی
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'bg-slate-900 text-[#FFD400]'
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/request-quote"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-4 bg-[#FFD400] text-slate-900 px-3 py-3 rounded-md font-bold hover:bg-yellow-500"
            >
              درخواست سروی آنلاین
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;