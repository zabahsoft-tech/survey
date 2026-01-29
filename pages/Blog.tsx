
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { db } from '../lib/db';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    setPosts(db.get('blogPosts'));
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">بلاگ تخصصی مهندسی و نقشه‌برداری</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            آخرین مقالات، آموزش‌ها و اخبار تکنولوژی‌های ژئوماتیک در افغانستان و جهان.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <article key={post.id} className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-[#FFD400]/50 transition-all group flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute top-4 right-4 bg-[#FFD400] text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                  {post.category}
                </div>
              </div>
              
              <div className="p-8 flex-grow space-y-4">
                <div className="flex items-center text-xs text-gray-500 space-x-4 space-x-reverse">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 ml-1 text-[#FFD400]" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <User className="h-3 w-3 ml-1 text-[#FFD400]" />
                    {post.author}
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-white group-hover:text-[#FFD400] transition-colors leading-tight">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="p-8 pt-0 border-t border-slate-800 mt-auto">
                <div className="flex justify-between items-center">
                   <div className="flex gap-2">
                     {post.tags?.slice(0, 2).map((tag: string) => (
                       <span key={tag} className="text-[10px] text-gray-500 bg-slate-800 px-2 py-0.5 rounded italic">#{tag}</span>
                     ))}
                   </div>
                   <Link to={`/blog/${post.id}`} className="text-[#FFD400] text-sm font-bold flex items-center hover:translate-x-[-4px] transition-transform">
                     ادامه مطلب
                     <ArrowLeft className="mr-2 h-4 w-4" />
                   </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
