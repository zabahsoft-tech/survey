
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, ArrowLeft, Satellite, 
  Ruler, LayoutGrid, Zap, Target, MessageCircle,
  ShieldCheck, HardHat, Map, ChevronLeft, Star, PhoneCall,
  CheckCircle2, Users, Briefcase
} from 'lucide-react';
import { db } from '../lib/db';
import { blogPosts as seedBlog } from '../data/blogData';

const Home: React.FC = () => {
  const [dynamicServices, setDynamicServices] = useState<any[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    // Initial Seeding
    db.seed('blogPosts', seedBlog);
    db.seed('services', [
      { id: 's1', title: 'جریب‌کشی و تعیین حدود', description: 'اندازه‌گیری دقیق اراضی زراعتی و مسکونی جهت تثبیت مالکیت و رفع اختلافات ملکی با دقت میلی‌متری.', icon: 'Ruler' },
      { id: 's2', title: 'نقشه‌برداری توپوگرافی', description: 'تهیه نقشه‌های توپوگرافی دقیق و نمایش عوارض زمین جهت مطالعات اولیه طرح‌های عمرانی و شهرسازی.', icon: 'Compass' },
      { id: 's3', title: 'تفکیک و تقسیمات زمین', description: 'افراز و قطعه‌بندی اصولی اراضی بزرگ بر اساس استانداردهای مهندسی و ضوابط قانونی.', icon: 'LayoutGrid' },
      { id: 's4', title: 'سیستم‌های کاداستر', description: 'ثبت و دیجیتال‌سازی اطلاعات املاک در سیستم‌های نوین مدیریتی.', icon: 'Map' }
    ]);
    db.seed('projects', [
      { id: 'p1', title: 'توپوگرافی شهرک مسکونی امید', category: 'مسکونی', location: 'غرب کابل', imageUrl: 'https://images.unsplash.com/photo-1590060417666-424917539420?q=80&w=800' },
      { id: 'p2', title: 'جریب‌کشی اراضی زراعتی گل‌تپه', category: 'زراعتی', location: 'پروان', imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800' },
      { id: 'p3', title: 'نقشه‌برداری مسیر کانال آبیاری', category: 'زیربنایی', location: 'لوگر', imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800' }
    ]);
    
    db.seedSingle('settings', {
      heroTitle: 'جریب‌کشی دقیق، پایه ساخت‌وساز مطمئن در افغانستان',
      heroSubtitle: 'تیم مهندسی دقیق با بیش از ۱۰ سال تجربه، خدمات نقشه‌برداری زمینی، توپوگرافی و کاداستر را با مدرن‌ترین تجهیزات توتال استیشن و GPS در کابل و تمام ولایات ارائه می‌دهد.',
      phone: '+93 73 066 6694',
      email: 'info@survey-af.com',
      address: 'کابل، کارته نو، بهارستان',
      whatsapp: 'https://wa.me/message/OR5LWN2YSATYK1?src=qr',
      facebook: 'https://www.facebook.com/share/1BxCTocSYH/',
      instagram: 'https://www.instagram.com/jribcashi?igsh=bmFqb3YzaXhqaTNq',
      statProjects: '+500',
      statYears: '+10',
      statSatisfaction: '%100',
      statEquipment: '+50',
      adminEmail: 'admin@survey-af.com',
      adminPassword: 'survey-af.com'
    });

    setDynamicServices(db.get('services'));
    setFeaturedProjects(db.get('projects').slice(0, 3));
    setSettings(db.getSingle('settings'));
  }, []);

  if (!settings) return null;

  return (
    <div className="w-full relative">
      {/* Floating WhatsApp Button - Enhanced for conversion */}
      <a 
        href={settings.whatsapp} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 z-50 flex items-center gap-3 bg-green-500 text-white pl-6 pr-4 py-3 rounded-full shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 group animate-bounce-slow"
      >
        <span className="text-sm font-bold hidden md:block">مشاوره رایگان در واتساپ</span>
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* Hero Section - Optimized for SEO & Visual Impact */}
      <section className="relative min-h-[90vh] flex items-center bg-slate-900 text-white overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1920&auto=format&fit=crop" 
            alt="Surveying team working in Afghanistan" 
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-right">
              <div className="inline-flex items-center space-x-2 space-x-reverse bg-[#FFD400]/10 border border-[#FFD400]/20 rounded-full px-4 py-2 backdrop-blur-sm animate-in fade-in slide-in-from-right duration-700">
                <span className="w-2 h-2 rounded-full bg-[#FFD400] animate-pulse"></span>
                <span className="text-[#FFD400] text-sm font-black tracking-widest uppercase">تیم تخصصی مهندسی دقیق</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black leading-[1.15] animate-in fade-in slide-in-from-right duration-700 delay-150">
                <span className="gradient-text">جریب‌کشی تخصصی</span><br />
                و نقشه‌برداری <span className="text-[#FFD400]">مدرن</span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-xl text-justify animate-in fade-in slide-in-from-right duration-700 delay-300">
                {settings.heroSubtitle} از تعیین حدود زمین‌های زراعتی تا نقشه‌برداری توپوگرافی برای پروژه‌های انکشافی، ما همراه شما هستیم.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 pt-4 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
                <Link to="/request-quote" className="group flex justify-center items-center bg-[#FFD400] text-slate-900 px-10 py-5 rounded-2xl font-black text-lg hover:bg-yellow-500 transition-all hover:shadow-[0_0_30px_rgba(255,212,0,0.3)] active:scale-95">
                  ثبت سفارش آنلاین
                  <ArrowLeft className="mr-3 h-5 w-5 group-hover:translate-x-[-5px] transition-transform" />
                </Link>
                <a 
                  href={`tel:${settings.phone}`}
                  className="flex justify-center items-center bg-slate-800/50 backdrop-blur-md text-white border border-slate-700 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-700 transition-all active:scale-95"
                >
                  <PhoneCall className="ml-3 h-5 w-5 text-[#FFD400]" />
                  تماس مستقیم
                </a>
              </div>
              
              <div className="flex items-center gap-8 pt-6 border-t border-slate-800 animate-in fade-in duration-1000 delay-700">
                <div className="flex -space-x-3 space-x-reverse">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="Customer" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex text-[#FFD400] mb-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-gray-400 font-medium">+۵۰۰ مشتری راضی در افغانستان</p>
                </div>
              </div>
            </div>

            {/* Visual Element - Surveying Tool */}
            <div className="hidden lg:block relative">
              <div className="absolute -inset-10 bg-[#FFD400]/10 rounded-full blur-[100px] animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800" 
                alt="Total Station" 
                className="relative rounded-[40px] shadow-2xl border border-slate-800 rotate-2 hover:rotate-0 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Models/Services - Grid Layout */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-[#FFD400] font-black tracking-widest uppercase mb-4">خدمات تخصصی</h2>
              <h3 className="text-4xl md:text-5xl font-black text-white">راه‌حل‌های مهندسی برای هر ابعاد</h3>
            </div>
            <Link to="/services" className="text-[#FFD400] font-bold flex items-center gap-2 hover:underline">
              مشاهده تمام خدمات
              <ChevronLeft size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dynamicServices.map((service, idx) => (
              <div key={idx} className="bg-slate-900/40 p-10 rounded-[32px] border border-slate-800 hover:border-[#FFD400]/30 transition-all group hover:-translate-y-2 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-slate-950 rounded-3xl flex items-center justify-center mb-8 border border-slate-800 group-hover:bg-[#FFD400] transition-colors duration-500 shadow-xl">
                   {service.icon === 'Ruler' ? <Ruler size={36} className="text-[#FFD400] group-hover:text-slate-900" /> : 
                    service.icon === 'Compass' ? <Compass size={36} className="text-[#FFD400] group-hover:text-slate-900" /> :
                    service.icon === 'LayoutGrid' ? <LayoutGrid size={36} className="text-[#FFD400] group-hover:text-slate-900" /> :
                    <Map size={36} className="text-[#FFD400] group-hover:text-slate-900" />}
                </div>
                <h4 className="text-2xl font-black text-white mb-4">{service.title}</h4>
                <p className="text-gray-500 leading-relaxed text-sm mb-8">{service.description}</p>
                <div className="mt-auto pt-4 border-t border-slate-800 w-full">
                  <span className="text-[#FFD400] text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">دقت میلی‌متری</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD400]/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                چرا شرکت مهندسی <span className="text-[#FFD400]">دقیق</span> را انتخاب کنید؟
              </h2>
              <div className="space-y-6">
                <TrustItem icon={CheckCircle2} title="تجهیزات مدرن جهانی" desc="استفاده از جی‌پی‌اس‌های دو فرکانسه و توتال استیشن‌های برند Leica و Trimble." />
                <TrustItem icon={ShieldCheck} title="تضمین قانونی و شرعی" desc="محاسبه دقیق مساحت برای جلوگیری از اختلافات ملکی و شرعی در تقسیم میراث." />
                <TrustItem icon={Zap} title="سرعت در اجرا" desc="تحویل نقشه‌ها در کمترین زمان ممکن با حفظ کیفیت مهندسی." />
                <TrustItem icon={Users} title="تیم مجرب داخلی" desc="مهندسین با تجربه که با توپوگرافی و شرایط ولایات افغانستان کاملاً آشنا هستند." />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <StatCard value={settings.statProjects} label="پروژه در افغانستان" color="bg-blue-500" />
              <StatCard value={settings.statYears} label="سال تجربه کاری" color="bg-[#FFD400]" />
              <StatCard value={settings.statSatisfaction} label="رضایت مشتری" color="bg-green-500" />
              <StatCard value={settings.statEquipment} label="تجهیزات مدرن" color="bg-purple-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects - Home View */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[#FFD400] font-black uppercase tracking-widest mb-4">پروژه‌های اخیر</h2>
          <h3 className="text-4xl font-black text-white mb-16">نمونه‌هایی از تخصص ما در ساحه</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredProjects.map((project) => (
              <div key={project.id} className="group relative bg-slate-900 rounded-[40px] overflow-hidden border border-slate-800 shadow-2xl">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                  />
                  <div className="absolute top-6 right-6 bg-[#FFD400] text-slate-900 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    {project.category}
                  </div>
                </div>
                <div className="p-8 text-right">
                  <h4 className="text-xl font-black text-white mb-2">{project.title}</h4>
                  <p className="text-gray-500 text-sm flex items-center justify-end gap-2">
                    {project.location}
                    <Map size={14} className="text-[#FFD400]" />
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16">
            <Link to="/projects" className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 text-white px-10 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all">
              مشاهده تمام پروژه‌ها
              <ChevronLeft size={20} className="text-[#FFD400]" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - Get Customer Focus */}
      <section className="py-24 bg-slate-950 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-16 rounded-[60px] border border-slate-800 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD400]/5 rounded-full blur-[100px]"></div>
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                آماده شروع پروژه خود هستید؟
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                همین حالا برای دریافت مشاوره رایگان و برآورد هزینه جریب‌کشی زمین خود با ما تماس بگیرید. کارشناسان ما آماده پاسخگویی هستند.
              </p>
              <div className="flex flex-wrap justify-center gap-6 pt-4">
                <Link to="/request-quote" className="bg-[#FFD400] text-slate-900 px-12 py-5 rounded-2xl font-black text-xl hover:bg-yellow-500 transition-all shadow-xl shadow-yellow-500/10">
                  درخواست آنلاین هزینه
                </Link>
                <a href={settings.whatsapp} className="bg-slate-800 text-white border border-slate-700 px-12 py-5 rounded-2xl font-black text-xl hover:bg-slate-700 transition-all">
                  واتساپ مدیریت
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

// Sub-components for better organization
const TrustItem = ({ icon: Icon, title, desc }: any) => (
  <div className="flex items-start gap-6 group">
    <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-[#FFD400] transition-colors duration-300">
      <Icon className="h-6 w-6 text-[#FFD400] group-hover:text-slate-900" />
    </div>
    <div>
      <h4 className="text-lg font-black text-white mb-1">{title}</h4>
      <p className="text-gray-500 text-sm">{desc}</p>
    </div>
  </div>
);

const StatCard = ({ value, label, color }: any) => (
  <div className="bg-slate-950/50 p-8 rounded-[32px] border border-slate-800 flex flex-col items-center text-center group hover:border-[#FFD400]/20 transition-all">
    <div className={`text-3xl font-black text-white mb-2`}>{value}</div>
    <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{label}</div>
    <div className={`w-8 h-1 ${color} mt-4 rounded-full group-hover:w-16 transition-all`}></div>
  </div>
);

export default Home;
