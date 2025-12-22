import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../lib/db';
import { 
  Trash2, CheckCircle, Clock, Search, MessageSquareCode, 
  Loader2, AlertCircle, Globe, Sparkles, BookOpen 
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const AdminDashboard: React.FC = () => {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'quotes' | 'seo'>('quotes');
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<Record<string, string>>({});

  // SEO Tool States
  const [seoTopic, setSeoTopic] = useState('');
  const [seoLoading, setSeoLoading] = useState(false);
  const [seoResult, setSeoResult] = useState<any>(null);

  const loadQuotes = useCallback(() => {
    const data = db.get('quotes').reverse();
    setQuotes(data);
  }, []);

  useEffect(() => {
    loadQuotes();
  }, [loadQuotes]);

  const handleDelete = (id: string) => {
    if (window.confirm('آیا از حذف این درخواست اطمینان دارید؟')) {
      db.delete('quotes', id);
      loadQuotes();
    }
  };

  const toggleStatus = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    db.update('quotes', id, { status: nextStatus });
    loadQuotes();
  };

  /**
   * Gemini SEO Assistant with SINGLE SEARCH
   * Uses googleSearch tool to find trending info and generate SEO content.
   */
  const generateSeoContent = async () => {
    if (!seoTopic) return;
    setSeoLoading(true);
    setSeoResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Research this topic and provide a professional SEO blog outline for survey-af.com: "${seoTopic}" in Afghanistan. 
        Include: 1. Catchy Title, 2. Meta Description, 3. H1/H2 Structure, 4. Keywords to target.`,
        config: {
          tools: [{ googleSearch: {} }], // ENABLE GOOGLE SEARCH GROUNDING
          systemInstruction: "You are a professional SEO content strategist specializing in civil engineering and surveying in Afghanistan. Respond in Persian (Farsi).",
        },
      });

      // Extract text and search references
      const text = response.text;
      const references = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      
      setSeoResult({ text, references });
    } catch (error) {
      console.error('SEO Generation failed:', error);
      alert('خطا در برقراری ارتباط با هوش مصنوعی.');
    } finally {
      setSeoLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-800 pb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">پنل مدیریت هوشمند</h1>
            <p className="text-gray-400 mt-1">مدیریت پروژه‌ها و تولید محتوای سئو</p>
          </div>
          
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button 
              onClick={() => setActiveTab('quotes')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'quotes' ? 'bg-[#FFD400] text-slate-900 shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <Clock className="h-4 w-4" />
              درخواست‌ها
            </button>
            <button 
              onClick={() => setActiveTab('seo')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'seo' ? 'bg-[#FFD400] text-slate-900 shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <Sparkles className="h-4 w-4" />
              تولید محتوا (SEO)
            </button>
          </div>
        </header>

        {activeTab === 'quotes' ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto shadow-2xl">
            <table className="w-full text-right min-w-[800px]">
              <thead className="bg-slate-800 text-gray-400 text-xs uppercase">
                <tr>
                  <th className="px-6 py-4">نام مشتری</th>
                  <th className="px-6 py-4">نوع پروژه</th>
                  <th className="px-6 py-4">وضعیت</th>
                  <th className="px-6 py-4">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-slate-800/40">
                    <td className="px-6 py-5 text-white font-bold">{quote.name}</td>
                    <td className="px-6 py-5">
                      <span className="bg-slate-950 text-[#FFD400] text-xs px-3 py-1 rounded-full border border-[#FFD400]/20">
                        {quote.projectType}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm">
                      <button 
                        onClick={() => toggleStatus(quote.id, quote.status)}
                        className={`text-xs px-3 py-1 rounded-full border ${quote.status === 'completed' ? 'text-green-400 border-green-500/20' : 'text-yellow-500 border-yellow-500/20'}`}
                      >
                        {quote.status === 'completed' ? 'تکمیل شده' : 'در انتظار'}
                      </button>
                    </td>
                    <td className="px-6 py-5">
                      <button onClick={() => handleDelete(quote.id)} className="text-red-400 hover:bg-red-500/10 p-2 rounded-lg"><Trash2 className="h-5 w-5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Globe className="text-[#FFD400] h-6 w-6" />
                تحقیق کلمات کلیدی و تولید ساختار بلاگ (Smart Search)
              </h3>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={seoTopic}
                  onChange={(e) => setSeoTopic(e.target.value)}
                  placeholder="مثال: تاثیر DGPS در شهرسازی مدرن کابل"
                  className="flex-grow bg-slate-950 border border-slate-700 rounded-xl px-5 py-3 text-white focus:ring-2 focus:ring-[#FFD400] outline-none"
                />
                <button 
                  onClick={generateSeoContent}
                  disabled={seoLoading}
                  className="bg-[#FFD400] text-slate-900 font-black px-8 py-3 rounded-xl hover:bg-yellow-500 disabled:opacity-50 flex items-center gap-2"
                >
                  {seoLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                  تولید محتوا
                </button>
              </div>
            </div>

            {seoResult && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-slate-900 p-8 rounded-2xl border border-slate-800 prose prose-invert max-w-none">
                   <h4 className="text-[#FFD400] font-bold text-lg mb-4 flex items-center gap-2">
                     <BookOpen className="h-5 w-5" />
                     پیش‌نویس تولید شده:
                   </h4>
                   <div className="text-gray-300 leading-relaxed whitespace-pre-line text-justify">
                     {seoResult.text}
                   </div>
                </div>
                
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-blue-400" />
                    منابع و مراجع جستجو شده:
                  </h4>
                  <div className="space-y-4">
                    {seoResult.references.map((ref: any, idx: number) => (
                      <div key={idx} className="p-3 bg-slate-900 rounded-lg border border-slate-800 hover:border-blue-500/50 transition-colors">
                        <a 
                          href={ref.web?.uri} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-xs text-blue-400 hover:underline line-clamp-2"
                        >
                          {ref.web?.title || 'منبع خارجی'}
                        </a>
                      </div>
                    ))}
                    {seoResult.references.length === 0 && <p className="text-gray-600 text-xs italic">منابع خارجی مستقیمی یافت نشد.</p>}
                  </div>
                  <div className="mt-8 p-4 bg-yellow-900/10 border border-[#FFD400]/20 rounded-lg">
                    <p className="text-[10px] text-[#FFD400] leading-relaxed">
                      نکته سئو: برای رتبه بهتر در گوگل افغانستان، از کلمات کلیدی "نقشه‌برداری در کابل" و "جریب‌کشی دقیق" در پاراگراف‌های اول استفاده کنید.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;