import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

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
              <div>
                <h3 className="text-xl font-bold text-white mb-2">شماره‌های تماس</h3>
                <p className="text-gray-400 dir-ltr text-right">+93 799 123 456</p>
                <p className="text-gray-400 dir-ltr text-right">+93 777 987 654</p>
                <p className="text-sm text-[#FFD400] mt-2">(پاسخگویی ۸ صبح تا ۸ شب)</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 space-x-reverse bg-slate-900 p-6 rounded-xl border border-slate-800">
              <div className="bg-[#FFD400]/10 p-3 rounded-lg">
                <MapPin className="h-6 w-6 text-[#FFD400]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">آدرس دفتر</h3>
                <p className="text-gray-400">
                  افغانستان، کابل، جاده شهید مزاری، ایستگاه مهندسین، ساختمان نگین، طبقه ۳
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 space-x-reverse bg-slate-900 p-6 rounded-xl border border-slate-800">
              <div className="bg-[#FFD400]/10 p-3 rounded-lg">
                <Mail className="h-6 w-6 text-[#FFD400]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">ایمیل و واتساپ</h3>
                <p className="text-gray-400 font-mono">info@daqiqsurvey.af</p>
                <p className="text-gray-400 font-mono">eng.daqiq@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 space-x-reverse bg-slate-900 p-6 rounded-xl border border-slate-800">
              <div className="bg-[#FFD400]/10 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-[#FFD400]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">ساعات کاری</h3>
                <p className="text-gray-400">شنبه تا پنج‌شنبه: ۸:۰۰ صبح - ۵:۰۰ عصر</p>
                <p className="text-gray-400">جمعه‌ها: تعطیل (پاسخگویی تلفنی فعال است)</p>
              </div>
            </div>
          </div>

          {/* Map (Placeholder) */}
          <div className="bg-slate-800 rounded-2xl overflow-hidden h-full min-h-[400px] relative border border-slate-700">
            <img 
              src="https://picsum.photos/id/1016/800/800" 
              alt="Map location" 
              className="w-full h-full object-cover grayscale opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-slate-900/90 backdrop-blur px-6 py-4 rounded-xl shadow-lg flex flex-col items-center border border-slate-700">
                <MapPin className="h-10 w-10 text-[#FFD400] mb-2 animate-bounce" />
                <span className="font-bold text-white">موقعیت دفتر ما</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;