import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Map, Compass, CheckCircle2, ArrowLeft, Scan, Satellite, Globe2, Wifi, Crosshair } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920&auto=format&fit=crop" 
            alt="Surveying site background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3 lg:w-1/2 space-y-8">
            <div className="inline-flex items-center space-x-2 space-x-reverse bg-yellow-900/30 border border-[#FFD400]/30 rounded-full px-4 py-1.5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#FFD400] animate-pulse"></span>
              <span className="text-[#FFD400] text-sm font-medium">پیشرو در خدمات مهندسی</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              <span className="text-[#FFD400]">جریب‌کشی دقیق،</span> <br />
              پایه ساخت‌وساز مطمئن
            </h1>
            
            <p className="text-lg text-gray-300 leading-relaxed max-w-xl text-justify">
              ما با بهره‌گیری از تکنولوژی‌های روز دنیا مانند توتال استیشن، GPS‌های دوفرکانسه و پهپادهای نقشه‌برداری، دقیق‌ترین اطلاعات مکانی را برای پروژه‌های عمرانی شما فراهم می‌کنیم.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/request-quote" className="inline-flex justify-center items-center bg-[#FFD400] text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-all hover:shadow-lg hover:shadow-yellow-900/50">
                درخواست جریب‌کشی
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Link>
              <Link to="/projects" className="inline-flex justify-center items-center bg-slate-800 text-white border border-slate-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-700 transition-all hover:border-[#FFD400]/50">
                مشاهده نمونه کارها
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services Snippet */}
      <div className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#FFD400] font-bold tracking-wide uppercase mb-2">خدمات ما</h2>
            <h3 className="text-3xl font-extrabold text-white sm:text-4xl">راه‌حل‌های جامع مهندسی و نقشه‌برداری</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-800 hover:shadow-lg hover:border-[#FFD400]/50 transition-all group">
              <div className="w-14 h-14 bg-[#FFD400]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#FFD400] transition-colors">
                <Compass className="h-8 w-8 text-[#FFD400] group-hover:text-slate-900" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">سروی و توپوگرافی</h4>
              <p className="text-gray-400 leading-relaxed text-justify">
                تهیه نقشه‌های توپوگرافی دقیق با مقیاس‌های مختلف جهت مطالعات اولیه طرح‌های عمرانی و شهرسازی.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-800 hover:shadow-lg hover:border-[#FFD400]/50 transition-all group">
              <div className="w-14 h-14 bg-[#FFD400]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#FFD400] transition-colors">
                <Map className="h-8 w-8 text-[#FFD400] group-hover:text-slate-900" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">تفکیک اراضی (Boundary)</h4>
              <p className="text-gray-400 leading-relaxed text-justify">
                تعیین حدود دقیق املاک، پیاده‌سازی پلاک‌های ثبتی و حل اختلافات ملکی با دقت سانتی‌متر.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-800 hover:shadow-lg hover:border-[#FFD400]/50 transition-all group">
              <div className="w-14 h-14 bg-[#FFD400]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#FFD400] transition-colors">
                <Layers className="h-8 w-8 text-[#FFD400] group-hover:text-slate-900" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">طراحی مهندسی</h4>
              <p className="text-gray-400 leading-relaxed text-justify">
                طراحی پلان‌های معماری و مهندسی بر اساس داده‌های دقیق نقشه‌برداری برای بهینه‌سازی ساخت.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Showcase Section */}
      <div className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-[#FFD400] font-bold tracking-wide uppercase mb-2">تکنولوژی و تجهیزات</h2>
            <h3 className="text-3xl font-extrabold text-white sm:text-4xl">دقت میلی‌متری با ابزار روز دنیا</h3>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              ما از جدیدترین نسل تجهیزات نقشه‌برداری برای تضمین سرعت و دقت در پروژه‌های شما استفاده می‌کنیم.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Total Station */}
            <div className="relative group overflow-hidden rounded-2xl shadow-xl border border-slate-700 h-[400px]">
               <img 
                 src="https://images.unsplash.com/photo-1617621453264-b0d367831f99?q=80&w=1000&auto=format&fit=crop" 
                 alt="Total Station Equipment" 
                 className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-8">
                  <div className="flex items-center space-x-3 space-x-reverse mb-2">
                    <div className="bg-[#FFD400] p-2 rounded-lg text-slate-900">
                      <Scan className="h-6 w-6" />
                    </div>
                    <h4 className="text-2xl font-bold text-white">Total Station (توتال استیشن)</h4>
                  </div>
                  <p className="text-gray-200 text-justify">
                    بهره‌گیری از توتال استیشن‌های لیزری پیشرفته جهت برداشت جزئیات با دقت میلی‌متر، پیاده‌سازی اکس‌ها و کنترل شاقولی ستون‌ها در پروژه‌های ساختمانی بلندمرتبه.
                  </p>
               </div>
            </div>

            {/* DGPS */}
            <div className="relative group overflow-hidden rounded-2xl shadow-xl border border-slate-700 h-[400px]">
               <img 
                 src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop" 
                 alt="DGPS GNSS Equipment" 
                 className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-8">
                  <div className="flex items-center space-x-3 space-x-reverse mb-2">
                    <div className="bg-[#FFD400] p-2 rounded-lg text-slate-900">
                      <Satellite className="h-6 w-6" />
                    </div>
                    <h4 className="text-2xl font-bold text-white">DGPS / GNSS (جی‌پی‌اس دو فرکانسه)</h4>
                  </div>
                  <p className="text-gray-200 text-justify">
                    استفاده از گیرنده‌های مولتی‌فرکانس GNSS برای تعیین موقعیت آنی (RTK) و استاتیک، اتصال به سامانه شمیم و تهیه نقشه‌های UTM با سرعت و دقت فوق‌العاده در سطوح وسیع.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* DGPS/GNSS Deep Dive Section */}
      <div className="py-24 bg-slate-950 border-t border-slate-800 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#FFD400]/5 -skew-x-12 transform origin-top-right"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-flex items-center space-x-2 space-x-reverse bg-[#FFD400]/10 border border-[#FFD400]/20 rounded-full px-4 py-1">
                <Satellite className="w-4 h-4 text-[#FFD400]" />
                <span className="text-[#FFD400] text-sm font-bold">تکنولوژی برتر</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                قدرت <span className="text-[#FFD400]">DGPS و GNSS</span> <br/>
                در دستان مهندسین ما
              </h2>
              
              <p className="text-gray-400 text-lg leading-relaxed text-justify">
                سیستم تعیین موقعیت جهانی تفاضلی (DGPS) و سامانه‌های ماهواره‌ای ناوبری جهانی (GNSS)، ستون فقرات نقشه‌برداری مدرن هستند. ما با استفاده از گیرنده‌های چندفرکانسه، موقعیت دقیق عوارض زمین را با خطای کمتر از یک سانتی‌متر محاسبه می‌کنیم. این فناوری به ما امکان می‌دهد در هر شرایط آب و هوایی و در مناطق صعب‌العبور، اطلاعات مکانی قابل اعتمادی ارائه دهیم.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 hover:border-[#FFD400]/30 transition-colors group">
                  <Globe2 className="w-10 h-10 text-[#FFD400] mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-bold mb-1">پوشش جهانی</h4>
                  <p className="text-sm text-gray-400">اتصال همزمان به GPS, GLONASS, Galileo, BeiDou برای پایداری سیگنال.</p>
                </div>
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 hover:border-[#FFD400]/30 transition-colors group">
                  <Wifi className="w-10 h-10 text-[#FFD400] mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-bold mb-1">RTK آنی</h4>
                  <p className="text-sm text-gray-400">برداشت و پیاده‌سازی مختصات به‌صورت لحظه‌ای (Real-Time) با سرعت بالا.</p>
                </div>
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 hover:border-[#FFD400]/30 transition-colors group">
                  <Crosshair className="w-10 h-10 text-[#FFD400] mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-bold mb-1">دقت میلی‌متری</h4>
                  <p className="text-sm text-gray-400">ایده‌آل برای پروژه‌های حساس، بیس پلیت‌ها و شبکه‌های کنترل ژئودزی.</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FFD400]/20 to-transparent rounded-2xl blur-lg"></div>
                <img 
                  src="https://images.unsplash.com/photo-1574689049597-7e6df3db18b4?q=80&w=1000&auto=format&fit=crop" 
                  alt="Engineer using GNSS Receiver" 
                  className="relative rounded-2xl shadow-2xl border border-slate-700 w-full" 
                />
                {/* Floating Stats Card */}
                <div className="absolute -bottom-6 -right-6 bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-700 hidden md:block">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-white font-mono text-sm" dir="ltr">Signal Locked: 32 Sats</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse mt-2">
                    <div className="w-3 h-3 bg-[#FFD400] rounded-full"></div>
                    <span className="text-white font-mono text-sm" dir="ltr">Accuracy: 8mm</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Stats/Trust Section */}
      <div className="bg-slate-900 py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div className="p-4">
              <div className="text-4xl font-black text-[#FFD400] mb-2">+500</div>
              <div className="text-gray-400">پروژه موفق</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-black text-[#FFD400] mb-2">+10</div>
              <div className="text-gray-400">سال تجربه</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-black text-[#FFD400] mb-2">%100</div>
              <div className="text-gray-400">رضایت مشتریان</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-black text-[#FFD400] mb-2">+50</div>
              <div className="text-gray-400">تجهیزات مدرن</div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop" 
              alt="Engineering team working" 
              className="rounded-lg shadow-2xl border-2 border-[#FFD400]/20"
            />
          </div>
          <div className="md:w-1/2 space-y-6">
            <h3 className="text-3xl font-extrabold text-white">چرا مهندسی دقیق را انتخاب کنید؟</h3>
            <p className="text-gray-400 leading-relaxed text-justify">
              تیم ما متشکل از مهندسین باتجربه و نقشه‌برداران حرفه‌ای است که با استفاده از جدیدترین نرم‌افزارها و سخت‌افزارهای روز، خدماتی با بالاترین استانداردهای جهانی ارائه می‌دهند.
            </p>
            <ul className="space-y-4">
              {[
                'تجهیزات پیشرفته Total Station و GPS',
                'تحویل سریع و آنکال',
                'دقت میلی‌متری در اندازه‌گیری‌ها',
                'مشاوره رایگان قبل از شروع پروژه',
                'ارائه خروجی‌های استاندارد (AutoCAD, GIS)'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center space-x-3 space-x-reverse">
                  <CheckCircle2 className="h-6 w-6 text-[#FFD400] flex-shrink-0" />
                  <span className="text-gray-300 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;