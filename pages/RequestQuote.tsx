
import React, { useState } from 'react';
import { ProjectType } from '../types';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { db } from '../lib/db';

/**
 * RequestQuote Page
 * User-facing form to collect surveying project details.
 */
const RequestQuote: React.FC = () => {
  // State for tracking submission status
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Controlled form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    projectType: '',
    area: '',
    location: '',
    description: ''
  });

  /**
   * Generic input change handler
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Form Submission Logic
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API network latency
    setTimeout(() => {
      try {
        // Save to our persistent mock database
        db.insert('quotes', {
          ...formData,
          status: 'pending' // Initial status for all new requests
        });
        
        setSubmitted(true);
      } catch (err) {
        alert('خطایی در ثبت درخواست رخ داد. لطفاً دوباره تلاش کنید.');
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  // Success View after submission
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900 p-8 rounded-2xl shadow-2xl text-center border border-slate-800 animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-[#FFD400]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-[#FFD400]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">درخواست شما با موفقیت ثبت شد!</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            اطلاعات شما در پنل مدیریت مهندسی دقیق قرار گرفت. کارشناسان ما تا ۲۴ ساعت آینده با شما تماس خواهند گرفت.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full bg-[#FFD400] text-slate-900 font-bold py-3 rounded-lg hover:bg-yellow-500 transition-all"
          >
            ثبت درخواست جدید
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
          {/* Form Header */}
          <div className="bg-slate-800 py-10 px-8 text-center border-b border-slate-700">
            <h1 className="text-3xl font-bold text-white mb-3">درخواست جریب‌کشی آنلاین</h1>
            <p className="text-[#FFD400] text-lg font-medium opacity-90">مهندسی دقیق در خدمت پروژه‌های شما</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* User Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label htmlFor="name" className="text-sm font-medium text-gray-400">نام و تخلص کامل</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-[#FFD400] outline-none transition-all"
                  placeholder="مثال: انجنییر امان الله"
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="phone" className="text-sm font-medium text-gray-400">شماره تماس (واتساپ فعال)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-[#FFD400] outline-none transition-all placeholder-gray-600"
                  placeholder="07XX XXX XXX"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label htmlFor="projectType" className="text-sm font-medium text-gray-400">نوع اراضی / پروژه</label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-[#FFD400] outline-none transition-all"
                >
                  <option value="">انتخاب نوع پروژه...</option>
                  {Object.values(ProjectType).map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="area" className="text-sm font-medium text-gray-400">مساحت تقریبی</label>
                <input
                  type="text"
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-[#FFD400] outline-none transition-all"
                  placeholder="مثال: ۵ جریب یا ۲۰۰ متر"
                />
              </div>
            </div>

            {/* Location & Meta */}
            <div className="space-y-1">
              <label htmlFor="location" className="text-sm font-medium text-gray-400">موقعیت دقیق پروژه</label>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-[#FFD400] outline-none transition-all"
                placeholder="ولایت، ولسوالی، ساحه..."
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="description" className="text-sm font-medium text-gray-400">توضیحات تکمیلی (چالش‌ها یا نیازهای خاص)</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-[#FFD400] outline-none transition-all"
                placeholder="مثال: زمین دارای شیب تند است و نیاز به نقشه توپوگرافی دارد..."
              ></textarea>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FFD400] text-slate-900 font-black text-lg py-4 rounded-xl hover:bg-yellow-500 transition-all shadow-xl hover:shadow-[#FFD400]/20 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin ml-2 h-6 w-6" />
                    در حال پردازش...
                  </>
                ) : (
                  <>
                    ارسال نهایی درخواست
                    <Send className="mr-3 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestQuote;
