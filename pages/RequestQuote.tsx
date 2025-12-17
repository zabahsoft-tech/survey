import React, { useState } from 'react';
import { ProjectType } from '../types';
import { Send, CheckCircle } from 'lucide-react';

const RequestQuote: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    projectType: '',
    area: '',
    location: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log('Form Submitted:', formData);
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900 p-8 rounded-xl shadow-lg text-center border border-slate-800">
          <div className="w-20 h-20 bg-[#FFD400]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-[#FFD400]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">درخواست شما ثبت شد!</h2>
          <p className="text-gray-400 mb-6">
            کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت تا جزئیات پروژه را بررسی کنند.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-[#FFD400] font-bold hover:underline"
          >
            بازگشت به فرم
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800">
          <div className="bg-slate-800 py-8 px-8 text-center border-b border-slate-700">
            <h1 className="text-3xl font-bold text-white mb-2">درخواست جریب‌کشی آنلاین</h1>
            <p className="text-[#FFD400]">فرم زیر را پر کنید تا هزینه و زمان پروژه را برآورد کنیم</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">نام و تخلص</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-[#FFD400] focus:border-[#FFD400] outline-none transition-all placeholder-gray-500"
                  placeholder="مثال: احمد احمدی"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">شماره تماس</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-[#FFD400] focus:border-[#FFD400] outline-none transition-all placeholder-gray-500"
                  placeholder="0799123456"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-1">نوع زمین/پروژه</label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-[#FFD400] focus:border-[#FFD400] outline-none transition-all"
                >
                  <option value="" className="text-gray-500">انتخاب کنید...</option>
                  {Object.values(ProjectType).map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-300 mb-1">متراژ تقریبی (متر مربع یا جریب)</label>
                <input
                  type="text"
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-[#FFD400] focus:border-[#FFD400] outline-none transition-all placeholder-gray-500"
                  placeholder="مثال: 500 متر یا 2 جریب"
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">موقعیت پروژه</label>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-[#FFD400] focus:border-[#FFD400] outline-none transition-all placeholder-gray-500"
                placeholder="مثال: کابل، دشت برچی، کوچه..."
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">توضیحات تکمیلی</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-[#FFD400] focus:border-[#FFD400] outline-none transition-all placeholder-gray-500"
                placeholder="توضیحات خاصی اگر دارید بنویسید (مثلاً: نیاز به تعیین حدود دقیق دارم)"
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#FFD400] text-slate-900 font-bold py-4 rounded-lg hover:bg-yellow-500 transition-all shadow-lg hover:shadow-yellow-900/20 flex justify-center items-center"
              >
                ارسال درخواست
                <Send className="mr-2 h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestQuote;