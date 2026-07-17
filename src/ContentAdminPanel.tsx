import React, { useState } from 'react';
import { FilePlus, Search, Book } from 'lucide-react';
import { useLanguage } from './LanguageContext';

type ContentCategory = 'Knowledge' | 'Pathology' | 'Physiology & Anatomy' | 'Surgery' | 'Pharmacy';

export function ContentAdminPanel() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ContentCategory>('Knowledge');
  const [searchTerm, setSearchTerm] = useState('');

  const categories: ContentCategory[] = ['Knowledge', 'Pathology', 'Physiology & Anatomy', 'Surgery', 'Pharmacy'];

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-50 pb-6">
        <div>
          <h3 className="font-black text-lg text-slate-900">
            {language === 'bn' ? 'কন্টেন্ট ম্যানেজার' : 'Content Manager'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Manage data for {activeCategory} section.</p>
        </div>
        <button 
          className="px-4 py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-black rounded-xl text-xs flex items-center gap-1.5 transition-all"
        >
          <FilePlus size={14} />+ New Entry
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === cat 
                ? 'bg-[#038aa6]/10 text-[#038aa6] border border-[#038aa6]/30' 
                : 'bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search ${activeCategory}...`}
          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:ring-1 focus:ring-[#038aa6] focus:outline-none focus:bg-white text-slate-800"
        />
      </div>

      <div className="border border-slate-100 rounded-2xl p-8 text-center text-slate-400 text-xs">
        <Book size={32} className="mx-auto mb-2 text-slate-300" />
        <p>This section is under construction for {activeCategory} management.</p>
      </div>
    </div>
  );
}
