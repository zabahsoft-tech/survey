
import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { db } from '../lib/db';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    setProjects(db.get('projects'));
  }, []);

  return (
    <div className="bg-slate-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-white mb-4">پروژه‌های اخیر</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            نمونه‌هایی از پروژه‌های موفق اجرا شده توسط تیم مهندسی دقیق
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group relative bg-slate-900 rounded-xl shadow-lg overflow-hidden border border-slate-800">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-4 right-4 bg-[#FFD400] text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                  {project.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <div className="flex items-center text-gray-400 text-sm">
                  <MapPin className="h-4 w-4 ml-1 text-[#FFD400]" />
                  <span>{project.location}</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-slate-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="bg-[#FFD400] text-slate-900 px-6 py-2 rounded-lg font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  مشاهده جزئیات
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
