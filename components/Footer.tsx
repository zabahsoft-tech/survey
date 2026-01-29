
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram, MessageCircle, Lock } from 'lucide-react';
import { db } from '../lib/db';

const Footer: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    setSettings(db.getSingle('settings'));
  }, []);

  if (!settings) return null;

  return (
    <footer className="bg-slate-900 text-gray-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white border-r-4 border-[#FFD400] pr-3">مهندسی دقیق</h3>
            <p className="text-sm leading-relaxed text-gray-400 text-justify">
              ارائه دهنده خدمات تخصصی جریب‌کشی، نقشه‌برداری و طراحی مهندسی با استفاده از پیشرفته‌ترین تجهیزات روز دنیا. دقت ما، تضمین سرمایه شماست.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">دسترسی سریع</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="hover:text-[#FFD400] transition-colors">خدمات ما</Link></li>
              <li><Link to="/projects" className="hover:text-[#FFD400] transition-colors">پروژه‌های انجام شده</Link></li>
              <li><Link to="/blog" className="hover:text-[#FFD400] transition-colors">بلاگ مهندسی</Link></li>
              <li><Link to="/contact" className="hover:text-[#FFD400] transition-colors">تماس با ما</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">خبرنامه</h3>
            <p className="text-xs text-gray-500 leading-relaxed">برای اطلاع از جدیدترین تکنولوژی‌های نقشه‌برداری در افغانستان، عضو شوید.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="ایمیل شما" className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs w-full focus:ring-1 focus:ring-[#FFD400] outline-none" />
              <button className="bg-[#FFD400] text-slate-900 px-3 py-2 rounded-lg text-xs font-bold">عضویت</button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">تماس با ما</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPin className="h-5 w-5 text-[#FFD400]" />
                <span className="text-sm">{settings.address}</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="h-5 w-5 text-[#FFD400]" />
                <span className="text-sm" dir="ltr">{settings.phone}</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="h-5 w-5 text-[#FFD400]" />
                <span className="text-sm" dir="ltr">{settings.email}</span>
              </div>
            </div>
            
            <div className="flex space-x-4 space-x-reverse pt-4">
              <a href={settings.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-2 rounded-full hover:bg-green-500 hover:text-white transition-colors"><MessageCircle className="h-5 w-5" /></a>
              <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-2 rounded-full hover:bg-[#FFD400] hover:text-slate-900 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-2 rounded-full hover:bg-[#FFD400] hover:text-slate-900 transition-colors"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p>&copy; {new Date().getFullYear()} شرکت مهندسی دقیق (survey-af.com). تمامی حقوق محفوظ است.</p>
            <p className="text-[10px] uppercase tracking-widest opacity-60">
              Developed by <a href="https://zabahsoft.com" target="_blank" rel="noopener noreferrer" className="text-[#FFD400] hover:underline font-bold">zabahsoft.com</a>
            </p>
          </div>
          <Link to="/auth" className="flex items-center gap-2 hover:text-[#FFD400] transition-colors group">
            <Lock size={12} />
            <span>پورتال کارمندان</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
