
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { db } from '../lib/db';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Trash2, Search, Loader2, Sparkles, Plus, Edit, Settings as SettingsIcon, Save, Key, 
  LayoutDashboard, Users, FileText, Briefcase, ChevronLeft, Clock, MessageSquare, 
  Mail, Bell, LogOut, Menu, X, BarChart3, ExternalLink, Filter, CheckCircle2, AlertCircle,
  Upload, Image as ImageIcon, XCircle, ArrowRight, ArrowLeft
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

type Tab = 'overview' | 'quotes' | 'services' | 'projects' | 'blog' | 'settings' | 'seo';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [data, setData] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  // SEO States
  const [seoTopic, setSeoTopic] = useState('');
  const [seoLoading, setSeoLoading] = useState(false);
  const [seoResult, setSeoResult] = useState<any>(null);

  // CRUD States
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stats = useMemo(() => ({
    totalQuotes: db.get('quotes').length,
    totalServices: db.get('services').length,
    totalProjects: db.get('projects').length,
    totalBlog: db.get('blogPosts').length,
    pendingQuotes: db.get('quotes').filter(q => q.status === 'pending').length
  }), [data]);

  const loadData = useCallback(() => {
    setSettings(db.getSingle('settings'));
    
    let table = '';
    if (activeTab === 'quotes') table = 'quotes';
    else if (activeTab === 'services') table = 'services';
    else if (activeTab === 'projects') table = 'projects';
    else if (activeTab === 'blog') table = 'blogPosts';
    
    if (table) {
      const items = db.get(table);
      setData(items.reverse());
    }
  }, [activeTab]);

  useEffect(() => {
    loadData();
    if (isEditing && editItem) {
      if (activeTab === 'projects') {
        setPreviewImages(editItem.images || (editItem.imageUrl ? [editItem.imageUrl] : []));
      } else if (activeTab === 'blog') {
        setPreviewImages(editItem.image ? [editItem.image] : []);
      }
    } else {
      setPreviewImages([]);
    }
  }, [loadData, editItem, isEditing, activeTab]);

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter(item => 
      (item.title || item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.location || item.projectType || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  // Fix: Explicitly type 'file' as 'File' to resolve 'unknown' assignment to 'Blob'
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const readers = Array.from(files).map((file: File) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then(newImages => {
        if (activeTab === 'blog') {
          // Blog usually has only one main image
          setPreviewImages([newImages[0]]);
        } else {
          setPreviewImages(prev => [...prev, ...newImages]);
        }
      });
    }
  };

  const moveImage = (index: number, direction: 'left' | 'right') => {
    const newImages = [...previewImages];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newImages.length) return;
    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
    setPreviewImages(newImages);
  };

  const removeImage = (index: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('آیا از حذف این مورد اطمینان دارید؟')) return;
    let table = '';
    if (activeTab === 'quotes') table = 'quotes';
    else if (activeTab === 'services') table = 'services';
    else if (activeTab === 'projects') table = 'projects';
    else if (activeTab === 'blog') table = 'blogPosts';
    
    if (table) {
      db.delete(table, id);
      loadData();
    }
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const newItem: any = {};
    formData.forEach((value, key) => { 
      if (key !== 'imageFile') newItem[key] = value; 
    });
    
    if (activeTab === 'projects') {
      newItem.images = previewImages;
      newItem.imageUrl = previewImages.length > 0 ? previewImages[0] : '';
    } else if (activeTab === 'blog') {
      newItem.image = previewImages.length > 0 ? previewImages[0] : '';
    }
    
    let table = '';
    if (activeTab === 'services') table = 'services';
    else if (activeTab === 'projects') table = 'projects';
    else if (activeTab === 'blog') table = 'blogPosts';

    if (table) {
      if (editItem) {
        db.update(table, editItem.id, newItem);
      } else {
        db.insert(table, newItem);
      }
      setIsEditing(false);
      setEditItem(null);
      setPreviewImages([]);
      loadData();
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const updates: any = {};
    formData.forEach((value, key) => { updates[key] = value; });
    db.updateSingle('settings', updates);
    setSettings(db.getSingle('settings'));
    alert('تنظیمات با موفقیت ذخیره شد.');
  };

  const generateSeoContent = async () => {
    if (!seoTopic) return;
    setSeoLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Produce a professional SEO outline and blog content draft for: "${seoTopic}". Targeted at construction and engineering industry in Afghanistan. Language: Persian (Farsi).`,
        config: { tools: [{ googleSearch: {} }] },
      });
      setSeoResult({ text: response.text });
    } catch (e) { alert('خطا در تولید محتوا توسط هوش مصنوعی'); }
    finally { setSeoLoading(false); }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-['Vazirmatn']">
      
      {/* SIDEBAR */}
      <aside className={`bg-slate-900 border-l border-slate-800 transition-all duration-300 flex flex-col z-50 ${isSidebarOpen ? 'w-72' : 'w-20'}`}>
        <div className="p-6 flex items-center gap-4 border-b border-slate-800 h-20">
          <div className="bg-[#FFD400] p-2 rounded-xl text-slate-900 shrink-0">
            <LayoutDashboard size={24} />
          </div>
          {isSidebarOpen && (
            <div className="overflow-hidden">
              <h1 className="text-white font-black text-lg whitespace-nowrap">پنل مدیریت</h1>
              <p className="text-[#FFD400] text-[10px] font-bold tracking-widest uppercase">Precise Engineering</p>
            </div>
          )}
        </div>

        <nav className="flex-grow p-4 space-y-2 overflow-y-auto no-scrollbar">
          <SidebarLink icon={BarChart3} label="داشبورد" active={activeTab === 'overview'} onClick={() => { setActiveTab('overview'); setIsEditing(false); }} collapsed={!isSidebarOpen} />
          <div className="pt-4 pb-2">
            {isSidebarOpen && <p className="px-4 text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">عملیات پروژه</p>}
            <SidebarLink icon={MessageSquare} label="درخواست‌ها" active={activeTab === 'quotes'} onClick={() => { setActiveTab('quotes'); setIsEditing(false); }} count={stats.pendingQuotes} collapsed={!isSidebarOpen} />
            <SidebarLink icon={Briefcase} label="پروژه‌ها" active={activeTab === 'projects'} onClick={() => { setActiveTab('projects'); setIsEditing(false); }} collapsed={!isSidebarOpen} />
            <SidebarLink icon={Users} label="خدمات" active={activeTab === 'services'} onClick={() => { setActiveTab('services'); setIsEditing(false); }} collapsed={!isSidebarOpen} />
          </div>
          <div className="pt-4 pb-2">
            {isSidebarOpen && <p className="px-4 text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">محتوا و سئو</p>}
            <SidebarLink icon={FileText} label="بلاگ" active={activeTab === 'blog'} onClick={() => { setActiveTab('blog'); setIsEditing(false); }} collapsed={!isSidebarOpen} />
            <SidebarLink icon={Sparkles} label="هوش مصنوعی" active={activeTab === 'seo'} onClick={() => { setActiveTab('seo'); setIsEditing(false); }} collapsed={!isSidebarOpen} />
          </div>
          <div className="pt-4 pb-2">
            {isSidebarOpen && <p className="px-4 text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">پیکربندی</p>}
            <SidebarLink icon={SettingsIcon} label="تنظیمات سایت" active={activeTab === 'settings'} onClick={() => { setActiveTab('settings'); setIsEditing(false); }} collapsed={!isSidebarOpen} />
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all group overflow-hidden">
            <LogOut size={20} className="shrink-0" />
            {isSidebarOpen && <span className="text-sm font-bold whitespace-nowrap">خروج از سیستم</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow flex flex-col min-w-0">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between px-8 z-40">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-400 hover:text-white transition-colors">
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="hidden md:flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 w-96 group focus-within:border-[#FFD400]/50 transition-all">
              <Search size={18} className="text-gray-500 group-focus-within:text-[#FFD400]" />
              <input 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="جستجو در لیست‌ها..." 
                className="bg-transparent border-none outline-none text-sm text-white w-full" 
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-bold text-white">مدیر سیستم</span>
              <span className="text-[10px] text-gray-500 font-mono" dir="ltr">{settings?.adminEmail}</span>
            </div>
            <div className="w-10 h-10 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center overflow-hidden">
              <Users size={20} className="text-gray-400" />
            </div>
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FFD400] rounded-full border-2 border-slate-950"></span>
            </button>
          </div>
        </header>

        {/* PAGE BODY */}
        <div className="flex-grow overflow-y-auto p-8 no-scrollbar bg-slate-950">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
            
            {/* TABS ENGINE */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard icon={MessageSquare} label="درخواست‌های جدید" value={stats.pendingQuotes} sub={`${stats.totalQuotes} کل درخواست‌ها`} trend="+12%" color="yellow" />
                  <StatCard icon={Briefcase} label="پروژه‌ها" value={stats.totalProjects} sub="پروژه‌های مهندسی" trend="+5%" color="blue" />
                  <StatCard icon={FileText} label="مقالات بلاگ" value={stats.totalBlog} sub="محتوای آموزشی" trend="+2" color="green" />
                  <StatCard icon={Users} label="خدمات" value={stats.totalServices} sub="دسته‌بندی‌های فعال" color="purple" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h2 className="text-xl font-black text-white">آخرین درخواست‌ها</h2>
                        <p className="text-xs text-gray-500 mt-1">تعداد {stats.pendingQuotes} درخواست نیاز به بررسی دارد.</p>
                      </div>
                      <button onClick={() => setActiveTab('quotes')} className="bg-slate-800 text-xs font-bold px-4 py-2 rounded-xl text-gray-300 hover:bg-slate-700 transition-all">مشاهده همه</button>
                    </div>
                    <div className="space-y-4">
                      {db.get('quotes').reverse().slice(0, 4).map((q: any) => (
                        <div key={q.id} className="flex items-center justify-between p-4 bg-slate-950/40 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all group">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-white font-black text-lg group-hover:bg-[#FFD400] group-hover:text-slate-900 transition-all">
                              {q.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-black text-white">{q.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] bg-slate-800 text-[#FFD400] px-2 py-0.5 rounded-full font-bold">{q.projectType}</span>
                                <span className="text-[10px] text-gray-500">{q.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-mono text-gray-400" dir="ltr">{q.phone}</p>
                            <p className="text-[10px] text-gray-600 mt-1">{new Date(q.createdAt).toLocaleDateString('fa-IR')}</p>
                          </div>
                        </div>
                      ))}
                      {stats.totalQuotes === 0 && <p className="text-center py-10 text-gray-600 italic">هیچ درخواستی ثبت نشده است.</p>}
                    </div>
                  </div>

                  <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm space-y-8">
                    <h2 className="text-xl font-black text-white">وضعیت پلتفرم</h2>
                    <div className="space-y-6">
                      <ProgressItem label="تکمیل ظرفیت پروژه‌ها" progress={75} color="#FFD400" />
                      <ProgressItem label="پاسخگویی به درخواست‌ها" progress={92} color="#3b82f6" />
                      <ProgressItem label="بهینه‌سازی محتوا" progress={60} color="#10b981" />
                    </div>
                    <div className="pt-6 border-t border-slate-800">
                      <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-widest">میانبرهای سریع</h3>
                      <div className="grid grid-cols-1 gap-2">
                        <QuickLink onClick={() => { setActiveTab('projects'); setIsEditing(true); }} icon={Plus} label="ثبت پروژه جدید" />
                        <QuickLink onClick={() => { setActiveTab('blog'); setIsEditing(true); }} icon={Edit} label="نوشتن مقاله جدید" />
                        <QuickLink onClick={() => { setActiveTab('settings'); }} icon={SettingsIcon} label="تغییر اطلاعات تماس" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quotes' && (
              <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-slate-800 flex justify-between items-center">
                  <h2 className="text-xl font-black text-white flex items-center gap-3"><MessageSquare className="text-[#FFD400]" /> مدیریت درخواست‌های جریب‌کشی</h2>
                  <div className="flex gap-2">
                    <button className="p-2 bg-slate-800 rounded-xl text-gray-400 hover:text-white"><Filter size={18}/></button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-white">
                    <thead className="bg-slate-800/30 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                      <tr><th className="p-6">مشتری</th><th className="p-6">پروژه و لوکیشن</th><th className="p-6">اطلاعات تماس</th><th className="p-6">وضعیت</th><th className="p-6 text-left">عملیات</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredData.map(q => (
                        <tr key={q.id} className="hover:bg-slate-800/20 transition-all group">
                          <td className="p-6">
                            <div className="font-black text-white">{q.name}</div>
                            <div className="text-[10px] text-gray-600 mt-1">{new Date(q.createdAt).toLocaleString('fa-IR')}</div>
                          </td>
                          <td className="p-6">
                            <span className="text-xs text-[#FFD400] font-bold">{q.projectType}</span>
                            <div className="text-[10px] text-gray-500 mt-1">{q.location} - {q.area}</div>
                          </td>
                          <td className="p-6">
                            <div className="text-xs font-mono" dir="ltr">{q.phone}</div>
                            {q.email && <div className="text-[10px] text-gray-600 mt-1" dir="ltr">{q.email}</div>}
                          </td>
                          <td className="p-6">
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black ${q.status === 'pending' ? 'bg-yellow-400/10 text-yellow-400' : 'bg-green-400/10 text-green-400'}`}>
                              {q.status === 'pending' ? <AlertCircle size={10}/> : <CheckCircle2 size={10}/>}
                              {q.status === 'pending' ? 'در انتظار بررسی' : 'تماس گرفته شد'}
                            </div>
                          </td>
                          <td className="p-6 text-left">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => handleDelete(q.id)} className="p-2.5 bg-red-400/5 text-red-400 rounded-xl hover:bg-red-400 hover:text-white transition-all"><Trash2 size={16}/></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredData.length === 0 && <div className="text-center py-20 text-gray-600 italic">موردی برای نمایش یافت نشد.</div>}
                </div>
              </div>
            )}

            {(activeTab === 'services' || activeTab === 'projects' || activeTab === 'blog') && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black text-white">مدیریت {activeTab === 'blog' ? 'مقالات بلاگ' : activeTab === 'services' ? 'خدمات مهندسی' : 'پروژه‌های انجام شده'}</h2>
                  {!isEditing && (
                    <button onClick={() => { setIsEditing(true); setEditItem(null); setPreviewImages([]); }} className="bg-[#FFD400] text-slate-900 px-8 py-3 rounded-2xl font-black flex items-center gap-2 shadow-xl shadow-yellow-500/20 hover:scale-105 transition-transform">
                      <Plus size={20}/> افزودن مورد جدید
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleSaveItem} className="bg-slate-900 p-10 rounded-3xl border border-slate-800 space-y-8 max-w-5xl mx-auto shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest mr-2">عنوان اصلی</label>
                        <input name="title" defaultValue={editItem?.title} placeholder="مثال: نقشه‌برداری توپوگرافی شهرک مسکونی" required className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white outline-none focus:ring-1 focus:ring-[#FFD400]" />
                      </div>
                      
                      {activeTab === 'projects' && (
                        <>
                          <div className="space-y-2">
                            <label className="text-xs font-black text-gray-500 mr-2">دسته‌بندی</label>
                            <input name="category" defaultValue={editItem?.category} placeholder="مسکونی، زراعتی و..." required className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white outline-none focus:ring-1 focus:ring-[#FFD400]"/>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black text-gray-500 mr-2">موقعیت</label>
                            <input name="location" defaultValue={editItem?.location} placeholder="کابل، غرب..." className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white outline-none focus:ring-1 focus:ring-[#FFD400]"/>
                          </div>
                        </>
                      )}

                      {activeTab === 'blog' && (
                        <>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-xs font-black text-gray-500 mr-2">خلاصه مقاله</label>
                            <textarea name="excerpt" defaultValue={editItem?.excerpt} placeholder="خلاصه کوتاه..." className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white h-20 outline-none focus:ring-1 focus:ring-[#FFD400]"/>
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-xs font-black text-gray-500 mr-2">محتوای کامل</label>
                            <textarea name="content" defaultValue={editItem?.content} placeholder="متن کامل (Markdown پشتیبانی می‌شود)..." required className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white h-96 outline-none focus:ring-1 focus:ring-[#FFD400]"/>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black text-gray-500 mr-2">نویسنده</label>
                            <input name="author" defaultValue={editItem?.author || 'مدیریت'} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white outline-none focus:ring-1 focus:ring-[#FFD400]"/>
                          </div>
                        </>
                      )}

                      {/* Multiple Image Upload Area for Projects */}
                      {(activeTab === 'projects' || activeTab === 'blog') && (
                        <div className="md:col-span-2 space-y-4">
                          <label className="text-xs font-black text-gray-500 mr-2">
                            {activeTab === 'projects' ? 'تصاویر پروژه (امکان انتخاب چندین فایل و جابجایی)' : 'تصویر شاخص'}
                          </label>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {previewImages.map((img, idx) => (
                              <div key={idx} className="relative aspect-square bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden group">
                                <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-2">
                                  <div className="flex gap-1">
                                    {idx > 0 && (
                                      <button type="button" onClick={() => moveImage(idx, 'left')} className="p-1.5 bg-slate-800 text-white rounded-lg hover:bg-[#FFD400] hover:text-slate-900 transition-all">
                                        <ArrowRight size={14} />
                                      </button>
                                    )}
                                    {idx < previewImages.length - 1 && (
                                      <button type="button" onClick={() => moveImage(idx, 'right')} className="p-1.5 bg-slate-800 text-white rounded-lg hover:bg-[#FFD400] hover:text-slate-900 transition-all">
                                        <ArrowLeft size={14} />
                                      </button>
                                    )}
                                  </div>
                                  <button type="button" onClick={() => removeImage(idx)} className="p-1.5 bg-red-500/80 text-white rounded-lg hover:bg-red-500 transition-all">
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                                {idx === 0 && (
                                  <div className="absolute bottom-2 right-2 bg-[#FFD400] text-slate-900 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                                    Main
                                  </div>
                                )}
                              </div>
                            ))}
                            
                            <button 
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="aspect-square bg-slate-950 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-600 hover:border-[#FFD400]/40 hover:text-gray-400 transition-all"
                            >
                              <Plus size={24} />
                              <span className="text-[10px] font-bold">افزودن عکس</span>
                            </button>
                          </div>
                          <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileChange} 
                            multiple={activeTab === 'projects'} 
                            accept="image/*" 
                            className="hidden" 
                          />
                        </div>
                      )}

                      {activeTab === 'services' && (
                        <>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-xs font-black text-gray-500 mr-2">توضیحات خدمت</label>
                            <textarea name="description" defaultValue={editItem?.description} placeholder="توضیحات کامل..." required className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white h-32 outline-none focus:ring-1 focus:ring-[#FFD400]"/>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black text-gray-500 mr-2">آیکون نمایش</label>
                            <select name="icon" defaultValue={editItem?.icon || 'Ruler'} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white outline-none focus:ring-1 focus:ring-[#FFD400]">
                              <option value="Ruler">خط‌کش (Ruler)</option>
                              <option value="Compass">قطب‌نما (Compass)</option>
                              <option value="LayoutGrid">شبکه (LayoutGrid)</option>
                            </select>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex gap-4 pt-6 border-t border-slate-800">
                      <button type="submit" className="bg-[#FFD400] text-slate-900 px-10 py-4 rounded-2xl font-black shadow-xl shadow-yellow-500/10 hover:scale-105 transition-all">ذخیره اطلاعات نهایی</button>
                      <button type="button" onClick={() => { setIsEditing(false); setPreviewImages([]); }} className="bg-slate-800 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-700">انصراف</button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredData.map(item => (
                      <div key={item.id} className="bg-slate-900/60 backdrop-blur-sm rounded-3xl border border-slate-800 overflow-hidden group hover:border-[#FFD400]/40 transition-all flex flex-col shadow-lg shadow-black/20">
                        {(item.imageUrl || item.image) && (
                          <div className="h-48 overflow-hidden relative">
                             <img src={item.imageUrl || item.image} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                             {item.images && item.images.length > 1 && (
                               <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-[#FFD400] text-[10px] font-black px-2 py-1 rounded-lg">
                                 +{item.images.length - 1} عکس
                               </div>
                             )}
                             <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                          </div>
                        )}
                        <div className="p-8 flex-grow">
                          <h3 className="text-white font-black text-lg mb-3 leading-snug">{item.title}</h3>
                          <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed text-justify">{item.description || item.excerpt || item.location}</p>
                        </div>
                        <div className="p-6 bg-slate-950/40 border-t border-slate-800/50 flex justify-between items-center">
                          <span className="text-[10px] text-gray-700 font-mono tracking-tighter">REF: {item.id}</span>
                          <div className="flex gap-2">
                            <button onClick={() => { setEditItem(item); setIsEditing(true); }} className="text-blue-400 p-3 bg-blue-400/5 hover:bg-blue-400 hover:text-white rounded-xl transition-all"><Edit size={16}/></button>
                            <button onClick={() => handleDelete(item.id)} className="text-red-400 p-3 bg-red-400/5 hover:bg-red-400 hover:text-white rounded-xl transition-all"><Trash2 size={16}/></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && settings && (
              <form onSubmit={handleSaveSettings} className="bg-slate-900/40 backdrop-blur-sm p-10 rounded-3xl border border-slate-800 shadow-2xl space-y-12 animate-in fade-in duration-500">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-black text-[#FFD400] flex items-center gap-3"><SettingsIcon size={28} /> پیکربندی سیستم مهندسی دقیق</h2>
                    <p className="text-gray-500 mt-1 text-sm">تغییر اطلاعات هویتی، تماس و امنیت پلتفرم</p>
                  </div>
                  <button type="submit" className="w-full sm:w-auto bg-[#FFD400] text-slate-900 px-10 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-yellow-500 transition-all shadow-xl shadow-yellow-500/20">
                     <Save size={20} /> ذخیره نهایی تنظیمات
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <div className="space-y-8">
                    <SectionTitle title="هویت بصری و هدر سایت" />
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-600 mr-2 uppercase">عنوان اصلی هدر (Home)</label>
                        <input name="heroTitle" defaultValue={settings.heroTitle} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white text-sm outline-none focus:ring-1 focus:ring-[#FFD400]" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-600 mr-2 uppercase">زیرعنوان هدر</label>
                        <textarea name="heroSubtitle" defaultValue={settings.heroSubtitle} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white text-sm h-32 outline-none focus:ring-1 focus:ring-[#FFD400]" />
                      </div>
                    </div>

                    <SectionTitle title="اطلاوات تماس رسمی" />
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-600 mr-2">شماره تماس</label>
                          <input name="phone" defaultValue={settings.phone} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white text-sm" dir="ltr" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-600 mr-2">ایمیل سایت</label>
                          <input name="email" defaultValue={settings.email} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white text-sm" dir="ltr" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-600 mr-2">آدرس فیزیکی</label>
                        <input name="address" defaultValue={settings.address} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white text-sm" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <SectionTitle title="آمار و ارقام عمومی (Counters)" />
                    <div className="grid grid-cols-2 gap-6">
                      <StatInput name="statProjects" label="تعداد کل پروژه‌ها" value={settings.statProjects} />
                      <StatInput name="statYears" label="سال‌های تجربه" value={settings.statYears} />
                      <StatInput name="statSatisfaction" label="درصد رضایت" value={settings.statSatisfaction} />
                      <StatInput name="statEquipment" label="تجهیزات مدرن" value={settings.statEquipment} />
                    </div>

                    <SectionTitle title="امنیت و شبکه‌های اجتماعی" />
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-600 mr-2">ایمیل ورود مدیریت</label>
                          <div className="relative">
                            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" />
                            <input name="adminEmail" type="email" defaultValue={settings.adminEmail} className="w-full bg-slate-950 border border-slate-800 p-4 pl-12 rounded-2xl text-white text-sm outline-none focus:ring-1 focus:ring-[#FFD400]" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-600 mr-2">رمز عبور ورود</label>
                          <div className="relative">
                            <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" />
                            <input name="adminPassword" type="password" defaultValue={settings.adminPassword} className="w-full bg-slate-950 border border-slate-800 p-4 pl-12 rounded-2xl text-white text-sm outline-none focus:ring-1 focus:ring-[#FFD400]" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <SocialInput name="whatsapp" label="WhatsApp Link" value={settings.whatsapp} />
                        <SocialInput name="facebook" label="Facebook URL" value={settings.facebook} />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-10 animate-in zoom-in-95 duration-500">
                 <div className="bg-slate-900/60 backdrop-blur-md p-16 rounded-[40px] border border-slate-800 text-center space-y-8 shadow-2xl">
                  <div className="w-24 h-24 bg-[#FFD400]/10 rounded-3xl flex items-center justify-center mx-auto border border-[#FFD400]/20 animate-pulse">
                    <Sparkles size={48} className="text-[#FFD400]" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black text-white">دستیار هوشمند سئو و محتوا</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed font-medium italic">Gemini Pro به شما کمک می‌کند تا مقالات فنی، توضیحات پروژه‌ها و استراتژی‌های سئو را در چند ثانیه تولید کنید.</p>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto pt-6">
                    <input 
                      value={seoTopic} 
                      onChange={e => setSeoTopic(e.target.value)} 
                      placeholder="موضوع مورد نظر خود را توصیف کنید... (مثال: مزایای نقشه‌برداری هوایی)" 
                      className="flex-grow bg-slate-950 border border-slate-800 rounded-2xl px-8 py-5 text-white outline-none focus:ring-2 focus:ring-[#FFD400] text-lg font-bold placeholder-gray-700"
                    />
                    <button onClick={generateSeoContent} disabled={seoLoading} className="bg-[#FFD400] text-slate-900 font-black px-12 py-5 rounded-2xl hover:bg-yellow-500 flex items-center justify-center gap-3 transition-all shadow-xl shadow-yellow-500/10 active:scale-95">
                      {seoLoading ? <Loader2 className="animate-spin" size={24}/> : <Sparkles size={24}/>}
                      تولید محتوا
                    </button>
                  </div>
                </div>

                {seoResult && (
                  <div className="bg-slate-900/40 backdrop-blur-sm p-12 text-white rounded-[40px] border border-slate-800 shadow-2xl relative animate-in slide-in-from-top-8 duration-700">
                    <div className="absolute -top-4 -right-4 bg-slate-950 border border-slate-800 px-6 py-2 rounded-2xl text-[#FFD400] text-[10px] font-black tracking-widest uppercase">Content Generated by AI</div>
                    <div className="prose prose-invert max-w-none whitespace-pre-line text-gray-300 leading-[2.2] text-lg text-justify font-medium">
                      {seoResult.text}
                    </div>
                    <div className="mt-12 flex justify-end gap-4">
                       <button className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-white transition-all"><ExternalLink size={14}/> کپی در کلیپ‌بورد</button>
                       <button onClick={() => { setActiveTab('blog'); setIsEditing(true); setEditItem({ content: seoResult.text }); }} className="flex items-center gap-2 px-6 py-3 bg-[#FFD400] hover:bg-yellow-500 rounded-xl text-xs font-black text-slate-900 transition-all">ایجاد پیش‌نویس بلاگ</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const SidebarLink = ({ icon: Icon, label, active, onClick, count, collapsed }: any) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 relative group ${active ? 'bg-[#FFD400] text-slate-900 shadow-lg shadow-yellow-500/20' : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'}`}
  >
    <div className="flex items-center gap-4">
      <Icon size={22} className={`shrink-0 transition-transform ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
      {!collapsed && <span className="text-sm font-black whitespace-nowrap">{label}</span>}
    </div>
    {!collapsed && count !== undefined && count > 0 && (
      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${active ? 'bg-slate-900 text-[#FFD400]' : 'bg-[#FFD400] text-slate-900'}`}>{count}</span>
    )}
    {active && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-slate-900 rounded-l-full"></div>}
    
    {collapsed && (
      <div className="absolute right-full mr-4 px-3 py-1.5 bg-slate-800 text-white text-[10px] font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
        {label}
      </div>
    )}
  </button>
);

const StatCard = ({ icon: Icon, label, value, sub, trend, color }: any) => {
  const colors: any = {
    yellow: 'text-[#FFD400] bg-[#FFD400]/5 border-[#FFD400]/10',
    blue: 'text-blue-400 bg-blue-400/5 border-blue-400/10',
    green: 'text-green-400 bg-green-400/5 border-green-400/10',
    purple: 'text-purple-400 bg-purple-400/5 border-purple-400/10'
  };

  return (
    <div className={`p-8 rounded-[32px] border ${colors[color]} backdrop-blur-sm group hover:scale-[1.02] transition-all duration-500`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`p-4 rounded-2xl bg-slate-900/50 ${colors[color].split(' ')[0]}`}>
          <Icon size={24} />
        </div>
        {trend && <span className="text-[10px] font-black bg-slate-950/40 px-2 py-1 rounded-full">{trend}</span>}
      </div>
      <div>
        <p className="text-2xl font-black text-white mb-1">{value}</p>
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{label}</p>
        <p className="text-[10px] text-gray-600 mt-2 italic">{sub}</p>
      </div>
    </div>
  );
};

const ProgressItem = ({ label, progress, color }: any) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
      <span className="text-gray-500">{label}</span>
      <span style={{ color }}>{progress}%</span>
    </div>
    <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
      <div 
        className="h-full transition-all duration-1000 ease-out rounded-full" 
        style={{ width: `${progress}%`, backgroundColor: color }}
      ></div>
    </div>
  </div>
);

const QuickLink = ({ onClick, label, icon: Icon }: any) => (
  <button onClick={onClick} className="flex items-center gap-3 w-full p-4 bg-slate-950/30 border border-slate-800/50 rounded-2xl text-gray-500 hover:text-white hover:bg-slate-800 transition-all group">
    <Icon size={18} className="text-[#FFD400]" />
    <span className="text-xs font-black">{label}</span>
  </button>
);

const SectionTitle = ({ title }: { title: string }) => (
  <h3 className="text-[11px] font-black text-gray-600 border-r-2 border-[#FFD400] pr-3 uppercase tracking-[0.3em] mb-4">{title}</h3>
);

const StatInput = ({ name, label, value }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] text-gray-500 block mr-2 font-black uppercase">{label}</label>
    <input name={name} defaultValue={value} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white text-sm focus:ring-1 focus:ring-[#FFD400] outline-none transition-all" />
  </div>
);

const SocialInput = ({ name, label, value }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] text-gray-500 block mr-2 font-black uppercase">{label}</label>
    <div className="relative">
      <input name={name} defaultValue={value} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-blue-400 text-sm focus:ring-1 focus:ring-[#FFD400] outline-none transition-all" dir="ltr" />
    </div>
  </div>
);

export default AdminDashboard;
