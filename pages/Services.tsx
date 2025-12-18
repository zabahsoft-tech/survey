import React from 'react';
import { Ruler, Map, Mountain, LayoutGrid, Scale, HardHat } from 'lucide-react';

const services = [
  {
    title: 'جریب‌کشی تخصصی و تثبیت حدود',
    description: 'اندازه‌گیری دقیق اراضی زراعتی و مسکونی با استفاده از تجهیزات مدرن جهت تثبیت مالکیت، رفع اختلافات ملکی و تعیین مرزهای دقیق ملک مطابق با اسناد قانونی.',
    icon: Ruler
  },
  {
    title: 'نقشه‌برداری توپوگرافی',
    description: 'تهیه نقشه‌های سه‌بعدی از عوارض طبیعی و مصنوعی زمین، نمایش منحنی‌های تراز و تهیه داده‌های لازم برای طراحی پروژه‌های عمرانی، سرک‌سازی و کانال‌سازی.',
    icon: Mountain
  },
  {
    title: 'تفکیک، افراز و تقسیمات اراضی',
    description: 'طراحی و اجرای طرح‌های تفکیکی برای قطعه‌بندی اصولی زمین‌های بزرگ به قطعات کوچک‌تر، با رعایت ضوابط شهرسازی و استانداردهای مهندسی.',
    icon: LayoutGrid
  },
  {
    title: 'خدمات جامع نقشه‌برداری مهندسی',
    description: 'ارائه کلیه خدمات نقشه‌برداری در حین اجرا (As-Built)، کنترل شاقولی ستون‌ها، پیاده‌سازی آکس‌ها و مانیتورینگ دقیق پروژه‌های ساختمانی و زیربنایی.',
    icon: HardHat
  },
  {
    title: 'محاسبه دقیق مساحت و ابعاد ثبتی',
    description: 'استخراج مساحت واقعی و دقیق املاک با دقت میلی‌متری جهت ارائه به شهرداری، ادارات ثبت اسناد و تهیه نقشه‌های کاداستر با استانداردهای جهانی.',
    icon: Scale
  },
  {
    title: 'سروی و نقشه‌برداری کاداستر',
    description: 'تهیه نقشه‌های ثبتی و حقوقی برای املاک شهری و روستایی جهت تسهیل در روند صدور قباله و اسناد رسمی مالکیت.',
    icon: Map
  }
];

const Services: React.FC = () => {
  return (
    <div className="bg-slate-950 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-white mb-4">خدمات تخصصی مهندسی دقیق</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            ما با بهره‌گیری از تکنولوژی‌های پیشرفته، دقیق‌ترین خروجی‌ها را برای پروژه‌های شما فراهم می‌کنیم.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-slate-900 rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:shadow-[#FFD400]/10 transition-shadow duration-300 flex flex-col border border-slate-800">
              <div className="p-8 flex-grow">
                <div className="w-16 h-16 bg-[#FFD400]/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <service.icon className="h-8 w-8 text-[#FFD400]" />
                </div>
                <h3 className="text-xl font-bold text-center text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 text-justify leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="bg-slate-800 p-4 border-t border-slate-700 text-center">
                <button className="text-[#FFD400] font-bold hover:text-yellow-300 transition-colors text-sm">
                  جزئیات بیشتر و مشاوره
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;