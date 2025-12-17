import React from 'react';
import { Ruler, Map, Building2, Mountain, FileText, Globe } from 'lucide-react';

const services = [
  {
    title: 'جریب‌کشی و توپوگرافی',
    description: 'تهیه نقشه‌های توپوگرافی در مقیاس‌های مختلف (۱:۵۰۰ تا ۱:۲۰۰۰) جهت مطالعات فاز یک و دو پروژه‌های عمرانی، محاسبه احجام عملیات خاکی (Cut & Fill) و پروفیل‌های طولی و عرضی.',
    icon: Mountain
  },
  {
    title: 'کاداستر و ثبت املاک',
    description: 'تهیه نقشه‌های کاداستر شهری و زراعتی، تعیین حدود و مساحت دقیق املاک، جانمایی پلاک‌های ثبتی و همکاری با ادارات ثبت اسناد جهت صدور سند تک‌برگ.',
    icon: FileText
  },
  {
    title: 'نقشه‌برداری ساختمانی (As-Built)',
    description: 'کنترل شاقولی ستون‌ها، پیاده‌سازی آکس ستون‌ها و فونداسیون، کنترل تراز طبقات و تهیه نقشه‌های چون‌ساخت (As-Built) پس از اتمام پروژه.',
    icon: Building2
  },
  {
    title: 'پایش و مانیتورینگ',
    description: 'بررسی نشست سازه‌های بلندمرتبه، گودبرداری‌های عمیق و دیوارهای حائل، و کنترل جابجایی‌های پوسته زمین در پروژه‌های حساس.',
    icon: Globe
  },
  {
    title: 'تفکیک و افراز اراضی',
    description: 'طراحی طرح‌های تفکیکی برای زمین‌های بزرگ، قطعه‌بندی زمین‌های زراعتی و باغ‌شهری با رعایت ضوابط شهرسازی و شهرداری.',
    icon: Ruler
  },
  {
    title: 'GIS و سیستم‌های اطلاعات مکانی',
    description: 'طراحی و پیاده‌سازی پایگاه داده‌های مکانی، تحلیل‌های فضایی و تهیه نقشه‌های موضوعی برای سازمان‌ها و ارگان‌های دولتی.',
    icon: Map
  }
];

const Services: React.FC = () => {
  return (
    <div className="bg-slate-950 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-white mb-4">خدمات تخصصی ما</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            ارائه طیف گسترده‌ای از خدمات مهندسی نقشه‌برداری با بالاترین دقت و کیفیت
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
                  درخواست مشاوره
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