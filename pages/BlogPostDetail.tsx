
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowRight, Tag, Share2, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { blogPosts } from '../data/blogData';

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl text-white font-bold mb-4">مقاله مورد نظر یافت نشد.</h2>
        <button 
          onClick={() => navigate('/blog')}
          className="bg-[#FFD400] text-slate-900 px-6 py-2 rounded-lg font-bold"
        >
          بازگشت به لیست مقالات
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative h-[400px] md:h-[500px]">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 pb-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-[#FFD400] text-sm font-bold mb-6 hover:translate-x-2 transition-transform"
          >
            <ArrowRight className="ml-2 h-4 w-4" />
            بازگشت به بلاگ
          </Link>
          <div className="bg-[#FFD400] text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full inline-block mb-4 shadow-lg shadow-yellow-900/40">
            {post.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 ml-2 text-[#FFD400]" />
              {post.date}
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 ml-2 text-[#FFD400]" />
              {post.author}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-slate-900/50 p-8 md:p-12 rounded-3xl border border-slate-800 shadow-xl">
            {/* Lead Excerpt */}
            <p className="text-xl text-[#FFD400] font-medium leading-relaxed italic border-r-4 border-[#FFD400] pr-6 mb-10">
              {post.excerpt}
            </p>

            {/* Rendered Body Content */}
            <div className="text-gray-300 text-lg leading-loose space-y-6 text-justify">
              {post.content.split('\n').map((paragraph, idx) => {
                if (paragraph.startsWith('###')) {
                  return <h3 key={idx} className="text-2xl font-bold text-white mt-10 mb-4">{paragraph.replace('###', '').trim()}</h3>;
                }
                if (paragraph.startsWith('-')) {
                  return (
                    <li key={idx} className="list-disc list-inside mr-4 text-gray-400">
                      {paragraph.replace('-', '').trim()}
                    </li>
                  );
                }
                if (paragraph.match(/^\d\./)) {
                  return (
                    <div key={idx} className="flex items-start mr-4 mb-2">
                      <span className="text-[#FFD400] font-bold ml-2">{paragraph.split('.')[0]}.</span>
                      <p className="text-gray-400">{paragraph.split('.').slice(1).join('.')}</p>
                    </div>
                  );
                }
                return paragraph.trim() ? <p key={idx}>{paragraph}</p> : <br key={idx} />;
              })}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-slate-800">
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="flex items-center bg-slate-950 text-gray-400 px-3 py-1 rounded-lg text-sm border border-slate-800">
                    <Tag className="h-3 w-3 ml-2 text-[#FFD400]" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-gradient-to-r from-yellow-600/20 to-slate-900 p-8 rounded-3xl border border-yellow-500/20 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">نیاز به جریب‌کشی دقیق دارید؟</h3>
              <p className="text-gray-400 text-sm">همین حالا مشاوره رایگان دریافت کنید.</p>
            </div>
            <Link 
              to="/request-quote" 
              className="bg-[#FFD400] text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-yellow-500 transition-all whitespace-nowrap"
            >
              ثبت درخواست آنلاین
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Share */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h4 className="text-white font-bold mb-4 flex items-center">
              <Share2 className="h-4 w-4 ml-2 text-[#FFD400]" />
              اشتراک‌گذاری
            </h4>
            <div className="flex justify-between">
              <button className="p-2 bg-slate-800 rounded-lg hover:text-[#FFD400] transition-colors"><Facebook className="h-5 w-5" /></button>
              <button className="p-2 bg-slate-800 rounded-lg hover:text-[#FFD400] transition-colors"><Twitter className="h-5 w-5" /></button>
              <button className="p-2 bg-slate-800 rounded-lg hover:text-[#FFD400] transition-colors"><MessageCircle className="h-5 w-5" /></button>
            </div>
          </div>

          {/* About Author Snippet */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <div className="w-10 h-10 bg-[#FFD400] rounded-full flex items-center justify-center font-bold text-slate-900">
                {post.author.charAt(0)}
              </div>
              <div>
                <h4 className="text-white text-sm font-bold">{post.author}</h4>
                <p className="text-gray-500 text-[10px]">کارشناس مهندسی دقیق</p>
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              متخصص در امور کاداستر و نقشه‌برداری با بیش از ۸ سال سابقه در پروژه‌های ملی افغانستان.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
