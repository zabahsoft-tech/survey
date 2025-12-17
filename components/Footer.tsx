import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white border-r-4 border-[#FFD400] pr-3">مهندسی دقیق</h3>
            <p className="text-sm leading-relaxed text-gray-400 text-justify">
              ارائه دهنده خدمات تخصصی جریب‌کشی، نقشه‌برداری و طراحی مهندسی با استفاده از پیشرفته‌ترین تجهیزات روز دنیا. دقت ما، تضمین سرمایه شماست.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">دسترسی سریع</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="hover:text-[#FFD400] transition-colors">خدمات ما</Link></li>
              <li><Link to="/projects" className="hover:text-[#FFD400] transition-colors">پروژه‌های انجام شده</Link></li>
              <li><Link to="/about" className="hover:text-[#FFD400] transition-colors">درباره شرکت</Link></li>
              <li><Link to="/request-quote" className="hover:text-[#FFD400] transition-colors">ثبت درخواست سروی</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">خدمات اصلی</h3>
            <ul className="space-y-2">
              <li className="text-sm">جریب‌کشی و توپوگرافی</li>
              <li className="text-sm">تفکیک و افراز اراضی</li>
              <li className="text-sm">تهیه نقشه‌های ثبتی</li>
              <li className="text-sm">نظارت بر ساخت‌وساز</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">تماس با ما</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPin className="h-5 w-5 text-[#FFD400]" />
                <span className="text-sm">کابل، افغانستان، خیابان شهید مزاری، ساختمان مهندسین</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="h-5 w-5 text-[#FFD400]" />
                <span className="text-sm" dir="ltr">+93 799 123 456</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="h-5 w-5 text-[#FFD400]" />
                <span className="text-sm" dir="ltr">info@daqiqsurvey.af</span>
              </div>
            </div>
            
            <div className="flex space-x-4 space-x-reverse pt-4">
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-[#FFD400] hover:text-slate-900 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-[#FFD400] hover:text-slate-900 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-[#FFD400] hover:text-slate-900 transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} شرکت مهندسی دقیق. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;