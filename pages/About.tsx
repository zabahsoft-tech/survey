import React from 'react';
import { Award, Users, Target } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="w-full bg-slate-950">
      {/* Hero for About */}
      <div className="bg-slate-900 text-white py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">درباره شرکت مهندسی دقیق</h1>
          <p className="text-xl text-[#FFD400]">تعهد به کیفیت، دقت در اجرا</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white relative after:content-[''] after:block after:w-20 after:h-1 after:bg-[#FFD400] after:mt-2">
              ما کی هستیم؟
            </h2>
            <p className="text-gray-400 leading-relaxed text-justify">
              شرکت مهندسی دقیق یکی از پیشگامان صنعت نقشه‌برداری و جریب‌کشی در کشور است. ما با سال‌ها تجربه در اجرای پروژه‌های بزرگ ملی و خصوصی، توانسته‌ایم اعتماد کارفرمایان خود را جلب کنیم. هدف ما ارائه خدمات مهندسی با بالاترین استانداردهای بین‌المللی و استفاده از تکنولوژی‌های روز برای کاهش خطا و افزایش بهره‌وری است.
            </p>
            <p className="text-gray-400 leading-relaxed text-justify">
              تیم ما متشکل از فارغ‌التحصیلان ممتاز دانشگاه‌های معتبر در رشته‌های مهندسی عمران و نقشه‌برداری است که دوره‌های تخصصی کار با تجهیزات مدرن را گذرانده‌اند.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-[#FFD400]/20 rounded-xl transform rotate-3"></div>
            <img 
              src="https://picsum.photos/id/338/600/400" 
              alt="Team meeting" 
              className="relative rounded-xl shadow-lg w-full border border-slate-800"
            />
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-slate-900 rounded-xl border border-slate-800">
            <div className="w-16 h-16 bg-slate-800 shadow-md rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
              <Target className="h-8 w-8 text-[#FFD400]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">ماموریت ما</h3>
            <p className="text-gray-400 text-sm">
              ارائه دقیق‌ترین اطلاعات مکانی برای تسهیل در امر ساخت‌وساز و توسعه پایدار شهری و روستایی.
            </p>
          </div>
          <div className="text-center p-8 bg-slate-900 rounded-xl border border-slate-800">
            <div className="w-16 h-16 bg-slate-800 shadow-md rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
              <Users className="h-8 w-8 text-[#FFD400]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">تیم متخصص</h3>
            <p className="text-gray-400 text-sm">
              بهره‌گیری از مهندسین مجرب و متعهد که دقت را سرلوحه کار خود قرار داده‌اند.
            </p>
          </div>
          <div className="text-center p-8 bg-slate-900 rounded-xl border border-slate-800">
            <div className="w-16 h-16 bg-slate-800 shadow-md rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
              <Award className="h-8 w-8 text-[#FFD400]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">تضمین کیفیت</h3>
            <p className="text-gray-400 text-sm">
              تضمین صحت داده‌های برداشت شده و ارائه خدمات پشتیبانی فنی تا انتهای پروژه.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;