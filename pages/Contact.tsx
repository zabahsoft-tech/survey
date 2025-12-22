
import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-slate-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-white mb-4">تماس با ما</h1>
          <p className="text-lg text-gray-400">
            برای مشاوره رایگان یا هماهنگی پروژه، از راه‌های زیر با ما در ارتباط باشید
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4 space-x-reverse bg-slate-900 p-6 rounded-xl border border-slate-800">
              <div className="bg-[#FFD400]/10 p-3 rounded-lg">
                <Phone className="h-6 w-6 text-[#FFD400]" />
              </div>
              <div className="w-full">
                <h3 className="text-xl font-bold text-white mb-2">شماره‌های تماس</h3>
                <div className="flex flex-col space-y-1">
                  <p className="text-gray-400 dir-ltr text-right">+93 73 066 6694</p>
                </div>
                <div className="mt-4">
                  <a 
                    href="https://wa.me/message/OR5LWN2YSATYK1?src=qr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                  >
                    <MessageSquare className="h-4 w-4 ml-2" />
                    ارتباط در واتساپ
                  </a>
                </div>
                <p className="text-sm text-[#FFD400] mt-3">(پاسخگویی ۸ صبح تا ۸ شب)</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 space-x-reverse bg-slate-900 p-6 rounded-xl border border-slate-800">
              <div className="bg-[#FFD400]/10 p-3 rounded-lg">
                <MapPin className="h-6 w-6 text-[#FFD400]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">آدرس دفتر</h3>
                <p className="text-gray-400">
                  کابل، کارته نو، بهارستان
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 space-x-reverse bg-slate-900 p-6 rounded-xl border border-slate-800">
              <div className="bg-[#FFD400]/10 p-3 rounded-lg">
                <Mail className="h-6 w-6 text-[#FFD400]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">ایمیل رسمی</h3>
                <p className="text-gray-400 font-mono">info@survey-af.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 space-x-reverse bg-slate-900 p-6 rounded-xl border border-slate-800">
              <div className="bg-[#FFD400]/10 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-[#FFD400]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">ساعات کاری</h3>
                <p className="text-gray-400">شنبه تا پنج‌شنبه: ۸:۰۰ صبح - ۵:۰۰ عصر</p>
                <p className="text-gray-400">جمعه‌ها: پاسخگویی از طریق واتساپ و تماس</p>
              </div>
            </div>
          </div>

          {/* Map (Placeholder) */}
          <div className="bg-slate-800 rounded-2xl overflow-hidden h-full min-h-[400px] relative border border-slate-700">
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1000&auto=format&fit=crop" 
              alt="Map location" 
              className="w-full h-full object-cover grayscale opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-slate-900/90 backdrop-blur px-6 py-4 rounded-xl shadow-lg flex flex-col items-center border border-slate-700">
                <MapPin className="h-10 w-10 text-[#FFD400] mb-2 animate-bounce" />
                <span className="font-bold text-white">موقعیت: کابل، کارته نو</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
