
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  ShieldCheck, 
  UserPlus, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('admin@survey-af.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay for premium feel
    setTimeout(() => {
      if (login(email, password)) {
        navigate('/admin');
      } else {
        setError('اعتبارنامه وارد شده نامعتبر است. لطفاً ایمیل و رمز عبور را بررسی کنید.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-['Vazirmatn']">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FFD400]/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px]"></div>
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 bg-slate-900/40 backdrop-blur-2xl rounded-[40px] border border-slate-800 shadow-2xl overflow-hidden relative z-10 animate-in fade-in zoom-in duration-700">
        
        {/* Left Side: Branding/Visuals */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-slate-900 to-slate-950 border-l border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
             <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000" alt="Engineering" className="w-full h-full object-cover grayscale" />
          </div>
          
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3 text-white group">
              <div className="bg-[#FFD400] p-2 rounded-xl text-slate-900 group-hover:rotate-12 transition-transform">
                <ShieldCheck size={28} />
              </div>
              <span className="text-2xl font-black tracking-tight">مهندسی دقیق</span>
            </Link>
            
            <div className="mt-20 space-y-6">
              <h2 className="text-4xl font-black text-white leading-tight">
                پورتال اختصاصی <br /> 
                <span className="text-[#FFD400]">مدیریت پروژه‌ها</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                به پلتفرم متمرکز مهندسی دقیق خوش آمدید. برای دسترسی به ابزارهای نقشه‌برداری و مدیریت درخواست‌ها وارد شوید.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-4 text-gray-500 text-sm">
            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> سرور عملیاتی</span>
            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#FFD400]"></div> نسخه ۲.۵</span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 lg:p-16 flex flex-col justify-center">
          <div className="mb-10 flex gap-4">
            <button 
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 pb-4 text-sm font-black transition-all border-b-2 ${isLogin ? 'text-[#FFD400] border-[#FFD400]' : 'text-gray-600 border-transparent hover:text-gray-400'}`}
            >
              ورود مدیریت
            </button>
            <button 
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 pb-4 text-sm font-black transition-all border-b-2 ${!isLogin ? 'text-[#FFD400] border-[#FFD400]' : 'text-gray-600 border-transparent hover:text-gray-400'}`}
            >
              درخواست دسترسی
            </button>
          </div>

          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-6 animate-in slide-in-from-right-8 duration-500">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest mr-2">ایمیل سازمانی</label>
                <div className="relative group">
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#FFD400] transition-colors" size={20} />
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-slate-950/50 border border-slate-800 p-4 pr-12 rounded-2xl text-white text-sm outline-none focus:ring-1 focus:ring-[#FFD400] focus:border-[#FFD400]/50 transition-all"
                    placeholder="name@survey-af.com"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest">رمز عبور</label>
                  <button type="button" className="text-[10px] text-gray-600 hover:text-[#FFD400] transition-colors font-bold">فراموشی رمز عبور؟</button>
                </div>
                <div className="relative group">
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#FFD400] transition-colors" size={20} />
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-slate-950/50 border border-slate-800 p-4 pr-12 pl-12 rounded-2xl text-white text-sm outline-none focus:ring-1 focus:ring-[#FFD400] focus:border-[#FFD400]/50 transition-all"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-400 animate-in shake duration-300">
                  <AlertCircle size={18} className="shrink-0" />
                  <p className="text-xs font-bold leading-relaxed">{error}</p>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#FFD400] text-slate-900 font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-yellow-500 transition-all shadow-xl shadow-yellow-500/10 active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div> : (
                  <>
                    ورود به سیستم
                    <ChevronRight size={20} />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-left-8 duration-500">
              <div className="bg-slate-950/30 p-8 rounded-3xl border border-dashed border-slate-800 text-center space-y-4">
                <div className="w-16 h-16 bg-[#FFD400]/10 rounded-full flex items-center justify-center mx-auto text-[#FFD400]">
                  <UserPlus size={32} />
                </div>
                <h3 className="text-white font-black text-lg">درخواست الحاق به تیم</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  اگر شما از پرسونل جدید مهندسی دقیق هستید، لطفاً جهت دریافت دسترسی با واحد IT یا مدیریت تماس بگیرید.
                </p>
                <div className="pt-4">
                  <a href="mailto:admin@survey-af.com" className="text-[#FFD400] font-bold text-sm border-b border-[#FFD400]/30 hover:border-[#FFD400] transition-all">ارسال ایمیل به مدیریت</a>
                </div>
              </div>
              <button 
                onClick={() => setIsLogin(true)}
                className="w-full bg-slate-800 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-700 transition-all"
              >
                بازگشت به فرم ورود
                <ArrowRight size={20} />
              </button>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to="/" className="text-gray-600 text-xs hover:text-white transition-colors flex items-center justify-center gap-2 group">
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              بازگشت به وب‌سایت اصلی
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
