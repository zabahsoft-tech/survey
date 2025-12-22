import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, Map, Compass, CheckCircle2, ArrowLeft, Scan, Satellite, 
  Globe2, Wifi, Crosshair, Ruler, LayoutGrid, Zap, Target, Construction, Landmark 
} from 'lucide-react';

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
                <Ruler className="h-8 w-8 text-[#FFD400] group-hover:text-slate-900" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">جریب‌کشی و تعیین حدود</h4>
              <p className="text-gray-400 leading-relaxed text-justify">
                اندازه‌گیری دقیق اراضی زراعتی و مسکونی جهت تثبیت مالکیت و رفع اختلافات ملکی با دقت میلی‌متری.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-800 hover:shadow-lg hover:border-[#FFD400]/50 transition-all group">
              <div className="w-14 h-14 bg-[#FFD400]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#FFD400] transition-colors">
                <Compass className="h-8 w-8 text-[#FFD400] group-hover:text-slate-900" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">نقشه‌برداری توپوگرافی</h4>
              <p className="text-gray-400 leading-relaxed text-justify">
                تهیه نقشه‌های توپوگرافی دقیق و نمایش عوارض زمین جهت مطالعات اولیه طرح‌های عمرانی و شهرسازی.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-800 hover:shadow-lg hover:border-[#FFD400]/50 transition-all group">
              <div className="w-14 h-14 bg-[#FFD400]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#FFD400] transition-colors">
                <LayoutGrid className="h-8 w-8 text-[#FFD400] group-hover:text-slate-900" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">تفکیک و تقسیمات زمین</h4>
              <p className="text-gray-400 leading-relaxed text-justify">
                افراز و قطعه‌بندی اصولی اراضی بزرگ بر اساس استانداردهای مهندسی و ضوابط قانونی.
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link to="/services" className="text-[#FFD400] font-bold hover:underline">مشاهده همه خدمات ما ...</Link>
          </div>
        </div>
      </div>

      {/* DGPS/GNSS Deep Dive Section - EXPANDED */}
      <div className="py-24 bg-slate-900 border-y border-slate-800 relative overflow-hidden">
        {/* Abstract Tech Background */}
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#FFD400] blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-flex items-center space-x-2 space-x-reverse bg-[#FFD400]/10 border border-[#FFD400]/20 rounded-full px-4 py-1">
                <Satellite className="w-4 h-4 text-[#FFD400]" />
                <span className="text-[#FFD400] text-sm font-bold">تکنولوژی تعیین موقعیت ماهواره‌ای</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                دقت فوق‌مهندسی با <br/>
                <span className="text-[#FFD400]">DGPS Multi-Frequency</span>
              </h2>
              
              <p className="text-gray-400 text-lg leading-relaxed text-justify">
                سیستم DGPS (جی‌پی‌اس تفاضلی) فراتر از یک تعیین موقعیت ساده است. ما با استفاده از ایستگاه‌های مبنا (Base) و متحرک (Rover)، خطاهای اتمسفری و مداری را در لحظه اصلاح می‌کنیم. این یعنی دستیابی به مختصات دقیق در سیستم تصویر UTM با خطای کمتر از ۱۰ میلی‌متر، که برای پروژه‌های حساس زیربنایی حیاتی است.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Target, title: "تثبیت آنی (RTK)", desc: "برداشت نقاط با سرعت ۱ ثانیه در هر نقطه." },
                  { icon: Zap, title: "اتصال به شمیم", desc: "هماهنگی کامل با شبکه یکپارچه کشوری." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3 space-x-reverse p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                    <item.icon className="w-6 h-6 text-[#FFD400] flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-bold text-sm">{item.title}</h4>
                      <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#FFD400] to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img 
                  src="https://images.unsplash.com/photo-1574689049597-7e6df3db18b4?q=80&w=1000&auto=format&fit=crop" 
                  alt="GNSS Application" 
                  className="relative rounded-2xl shadow-2xl border border-slate-700 object-cover h-[450px] w-full" 
                />
                <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-lg border border-slate-700">
                   <div className="flex items-center space-x-2 space-x-reverse">
                     <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                     <span className="text-[10px] text-gray-300 font-mono">DGPS FIXED: H: 0.008m / V: 0.012m</span>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">کاربردهای عملیاتی در پروژه‌ها</h3>
              <div className="h-1 w-20 bg-[#FFD400] mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Use Case 1 */}
              <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-[#FFD400]/40 transition-all group">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                  <Construction className="w-6 h-6 text-blue-500 group-hover:text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">طراحی و اجرای مسیر</h4>
                <p className="text-gray-400 text-sm leading-relaxed text-justify">
                  در پروژه‌های سرک‌سازی و کانال‌سازی، DGPS امکان تعیین دقیق قوس‌ها، شیب‌بندی‌های حساس و حجم عملیات خاکی را در فواصل طولانی بدون نیاز به پیمایش‌های سنتی فراهم می‌کند.
                </p>
              </div>

              {/* Use Case 2 */}
              <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-[#FFD400]/40 transition-all group">
                <div className="w-12 h-12 bg-[#FFD400]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#FFD400] transition-colors">
                  <Landmark className="w-6 h-6 text-[#FFD400] group-hover:text-slate-900" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">کاداستر و تثبیت اراضی</h4>
                <p className="text-gray-400 text-sm leading-relaxed text-justify">
                  برای جلوگیری از تداخل املاک، ما با استفاده از GNSS مولتی‌فرکانس، پلاک‌های ثبتی را در سیستم UTM پیاده می‌کنیم تا حدود ملک از نظر حقوقی در سطح جهانی غیرقابل انکار باشد.
                </p>
              </div>

              {/* Use Case 3 */}
              <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-[#FFD400]/40 transition-all group">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors">
                  <Globe2 className="w-6 h-6 text-green-500 group-hover:text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">ایجاد شبکه‌های ژئودتیک</h4>
                <p className="text-gray-400 text-sm leading-relaxed text-justify">
                  نصب و قرائت بنچ‌مارک‌های اصلی پروژه با متد Static (قرائت طولانی مدت) جهت ایجاد شبکه مختصات مادر برای پروژه‌های سدسازی، پل‌سازی و مجتمع‌های صنعتی.
                </p>
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