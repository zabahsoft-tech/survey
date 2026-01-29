
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, AlertCircle, Eye, EyeOff, Mail } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('admin@survey-af.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/admin');
    } else {
      setError('اطلاعات ورود اشتباه است. لطفاً ایمیل و رمز عبور را بررسی کنید.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#FFD400]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#FFD400]/5 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full space-y-8 bg-slate-900/80 backdrop-blur-xl p-10 rounded-3xl border border-slate-800 shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-[#FFD400] rounded-2xl flex items-center justify-center text-slate-900 shadow-lg shadow-yellow-500/20 transform -rotate-6">
            <Lock className="h-8 w-8" />
          </div>
          <h2 className="mt-8 text-3xl font-black text-white tracking-tight">ورود به پنل مدیریت</h2>
          <p className="mt-2 text-sm text-gray-400">دسترسی محدود به پرسونل مهندسی دقیق</p>
        </div>
        
        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label className="text-gray-400 text-xs font-bold mb-2 block uppercase tracking-wider">ایمیل کاربری</label>
              <div className="relative group">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-[#FFD400] transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  className="bg-slate-950 border border-slate-700 text-white block w-full pr-12 py-4 rounded-xl focus:ring-1 focus:ring-[#FFD400] focus:border-[#FFD400] text-sm placeholder-gray-700 outline-none transition-all"
                  placeholder="admin@survey-af.com"
                />
              </div>
            </div>
            
            <div>
              <label className="text-gray-400 text-xs font-bold mb-2 block uppercase tracking-wider">رمز عبور</label>
              <div className="relative group">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-[#FFD400] transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="bg-slate-950 border border-slate-700 text-white block w-full pr-12 pl-12 py-4 rounded-xl focus:ring-1 focus:ring-[#FFD400] focus:border-[#FFD400] text-sm placeholder-gray-700 outline-none transition-all"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-start gap-3 animate-in shake duration-300">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed font-medium">{error}</p>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black rounded-xl text-slate-900 bg-[#FFD400] hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD400] transition-all shadow-lg shadow-yellow-500/10 active:scale-95"
            >
              ورود به سیستم مدیریت
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-[10px] text-gray-600 leading-relaxed uppercase tracking-widest">
            تمام فعالیت‌ها در این پنل ثبت و مانیتور می‌شود.
            <br/>
            اگر رمز عبور خود را فراموش کرده‌اید، با واحد IT تماس بگیرید.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
