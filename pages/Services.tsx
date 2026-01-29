
import React, { useEffect, useState } from 'react';
import { Ruler, Map, Mountain, LayoutGrid, Scale, HardHat } from 'lucide-react';
import { db } from '../lib/db';

const iconMap: Record<string, any> = {
  Ruler, Map, Mountain, LayoutGrid, Scale, HardHat
};

const Services: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    setServices(db.get('services'));
  }, []);

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
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Ruler;
            return (
              <div key={index} className="bg-slate-900 rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:shadow-[#FFD400]/10 transition-shadow duration-300 flex flex-col border border-slate-800">
                <div className="p-8 flex-grow">
                  <div className="w-16 h-16 bg-[#FFD400]/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Icon className="h-8 w-8 text-[#FFD400]" />
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
