
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User } from 'lucide-react';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError('رمز عبور اشتباه است. (راهنما: admin123)');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-slate-900 p-10 rounded-2xl border border-slate-800 shadow-2xl">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-[#FFD400] rounded-lg flex items-center justify-center text-slate-900">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">ورود به پنل مدیریت</h2>
          <p className="mt-2 text-sm text-gray-400">فقط برای پرسونل مهندسی دقیق</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-1 block">نام کاربری</label>
              <div className="relative">
                <User className="absolute right-3 top-3 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  disabled
                  value="مدیریت (admin)"
                  className="bg-slate-800 border border-slate-700 text-gray-400 block w-full pr-10 py-3 rounded-lg sm:text-sm cursor-not-allowed"
                />
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">رمز عبور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-white block w-full pr-10 py-3 rounded-lg focus:ring-[#FFD400] focus:border-[#FFD400] sm:text-sm placeholder-gray-600"
                  placeholder="********"
                />
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-slate-900 bg-[#FFD400] hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD400] transition-colors"
            >
              ورود به سیستم
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
