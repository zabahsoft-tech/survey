
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowRight, Tag, Share2, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { db } from '../lib/db';

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const posts = db.get('blogPosts');
    const found = posts.find(p => p.id === id);
    setPost(found);
  }, [id]);

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

            {/* Body */}
            <div className="text-gray-300 text-lg leading-loose space-y-6 text-justify">
              {post.content?.split('\n').map((paragraph: string, idx: number) => {
                if (paragraph.startsWith('###')) {
                  return <h3 key={idx} className="text-2xl font-bold text-white mt-10 mb-4">{paragraph.replace('###', '').trim()}</h3>;
                }
                return paragraph.trim() ? <p key={idx}>{paragraph}</p> : <br key={idx} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
