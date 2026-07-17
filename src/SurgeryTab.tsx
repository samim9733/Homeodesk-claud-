import React, { useState } from 'react';
import { Search, ChevronRight, Star, Bookmark, LayoutGrid, AlertCircle, Zap, MessageSquare, ArrowRight, Activity, BookOpen, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { SURGERY_DATA } from './surgeryData';

export const SurgeryTab = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('TABLES');
  const [activeChapterId, setActiveChapterId] = useState(2);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const activeChapter = SURGERY_DATA.find(c => c.id === activeChapterId) || SURGERY_DATA[0];

  const chapters = SURGERY_DATA.map(c => ({
    id: c.id,
    title: language === 'en' ? c.title : c.banglaTitle,
    part: c.part
  }));

  return (
    <div className="flex h-full bg-[#f1f6f2] overflow-hidden font-sans text-[#1a2e24] relative">
      {/* Sidebar - Left */}
      <AnimatePresence mode="wait">
        {isLeftSidebarOpen && (
          <motion.aside 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 256, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-64 bg-white border-r border-[#e0e9e4] flex flex-col shrink-0 overflow-hidden"
          >
            <div className="p-6 min-w-[256px]">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#1e612a] rounded-lg flex items-center justify-center">
                    <Activity size={20} className="text-white" />
                  </div>
                  <h1 className="text-xl font-bold tracking-tight text-[#1e612a]">{t('surgery.title')}</h1>
                </div>
                <button 
                  onClick={() => setIsLeftSidebarOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
                  title="Close Sidebar"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder={t('surgery.searchPlaceholder')} 
              className="w-full bg-[#f8faf9] border border-[#e8eeea] rounded-xl py-2.5 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#1e612a]/10"
            />
          </div>

          <div className="bg-[#f8faf9] rounded-2xl p-4 border border-[#e8eeea] mb-8">
            <div className="flex items-start gap-3">
              <div className="w-10 h-14 bg-[#1e612a] rounded flex flex-col items-center justify-center text-[10px] text-white font-bold shrink-0 shadow-sm leading-tight">
                <span>B&L</span>
                <span>27th</span>
              </div>
              <div>
                <h3 className="text-xs font-bold leading-snug">Bailey & Love's Short Practice</h3>
                <p className="text-[10px] text-slate-500 mt-1 uppercase"> {t('surgery.edition')} • 64% {t('surgery.complete')}</p>
                <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
                  <div className="w-[64%] h-full bg-[#1e612a]"></div>
                </div>
              </div>
            </div>
          </div>

          <nav className="space-y-6">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{t('surgery.part1')}</p>
              <div className="space-y-1">
                {chapters.filter(c => c.part === 1).map(chapter => (
                  <button 
                    key={chapter.id}
                    onClick={() => setActiveChapterId(chapter.id)}
                    className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-between ${activeChapterId === chapter.id ? 'bg-emerald-50 text-emerald-800 border border-emerald-100 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center gap-2">
                       <Zap size={14} className={activeChapterId === chapter.id ? 'text-emerald-600' : 'text-slate-400'} />
                       <span>Ch {chapter.id}: {chapter.title}</span>
                    </div>
                    {activeChapterId === chapter.id && <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{t('surgery.part2')}</p>
              <div className="space-y-1">
                {chapters.filter(c => c.part === 2).map(chapter => (
                  <button 
                    key={chapter.id}
                    onClick={() => setActiveChapterId(chapter.id)}
                    className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-between ${activeChapterId === chapter.id ? 'bg-emerald-50 text-emerald-800 border border-emerald-100 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center gap-2">
                       <Zap size={14} className={activeChapterId === chapter.id ? 'text-emerald-600' : 'text-slate-400'} />
                       <span>Ch {chapter.id}: {chapter.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>

        <div className="mt-auto p-6">
          <button className="w-full bg-[#f8faf9] border border-[#e8eeea] text-emerald-800 px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors">
            <MessageSquare size={16} /> {t('surgery.aiAssistant')}
          </button>
        </div>
      </motion.aside>
    )}
  </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Toggle Buttons for Mobile/Collapsed States */}
        {!isLeftSidebarOpen && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setIsLeftSidebarOpen(true)}
            className="absolute top-6 left-6 z-[10] w-10 h-10 bg-white border border-[#e0e9e4] rounded-xl flex items-center justify-center text-[#1e612a] shadow-sm hover:shadow-md transition-all group"
            title="Open Sidebar"
          >
            <Menu size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          </motion.button>
        )}
        
        {!isRightSidebarOpen && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setIsRightSidebarOpen(true)}
            className="absolute top-6 right-6 z-[10] w-10 h-10 bg-white border border-[#e0e9e4] rounded-xl flex items-center justify-center text-[#1e612a] shadow-sm hover:shadow-md transition-all group"
            title="Open Status"
          >
            <Activity size={20} className="group-hover:scale-110 transition-transform duration-300" />
          </motion.button>
        )}

        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#f8faf8] p-8">
          <header className="flex justify-between items-start mb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span>{activeChapter.part === 1 ? t('surgery.part1') : t('surgery.part2')}</span>
                <ChevronRight size={14} />
                <span className="text-[#1e612a]">Chapter {activeChapter.id}</span>
              </div>
              <div className="space-y-1">
                <h2 className="text-4xl font-extrabold tracking-tight text-[#1a2e24]">{activeChapter.title}</h2>
                <p className="text-lg font-bold text-slate-500">{activeChapter.banglaTitle}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-6">
              <div className="flex items-center gap-2">
                {activeChapter.critical && <span className="px-3 py-1 bg-[#dcfce7] text-[#166534] text-[10px] font-black uppercase tracking-widest rounded-lg border border-[#bbf7d0]">{t('surgery.critical')}</span>}
                {activeChapter.highYield && <span className="px-3 py-1 bg-[#f0fdf4] text-[#166534] text-[10px] font-black uppercase tracking-widest rounded-lg border border-[#dcfce7]">{t('surgery.highYield')}</span>}
                <div className="flex items-center gap-0.5 ml-2">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-emerald-600 fill-emerald-600" />)}
                </div>
              </div>
              <button className="bg-[#1e612a] text-white px-8 py-3 rounded-2xl text-sm font-black shadow-lg shadow-emerald-900/10 hover:bg-[#164a20] transition-all transform hover:-translate-y-0.5 active:translate-y-0 uppercase tracking-widest">
                {t('surgery.markComplete')}
              </button>
            </div>
          </header>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-4 gap-6 mb-10">
            {(activeChapter.stats || []).map((card, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-[#e8eeea] shadow-sm relative overflow-hidden group hover:border-emerald-200 transition-all text-left">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-600"></div>
                <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-4">{card.title}</p>
                <h4 className="text-xl font-extrabold text-slate-800 mb-2">{card.value}</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Main Tabs */}
          <div className="mb-8 border-b border-[#e0e9e4]">
            <div className="flex gap-10">
              {['NOTES', 'TABLES', 'EMERGENCIES', 'DRUGS', 'MCQS', 'SUMMARY (BENGALI)'].map(tab => {
                let label = tab;
                if (tab === 'NOTES') label = t('surgery.notes');
                if (tab === 'TABLES') label = t('surgery.tables');
                if (tab === 'EMERGENCIES') label = t('surgery.emergencies');
                if (tab === 'DRUGS') label = t('surgery.drugs');
                if (tab === 'MCQS') label = t('surgery.mcqs');
                if (tab === 'SUMMARY (BENGALI)') label = t('surgery.summary');
                
                return (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-[11px] font-black tracking-widest uppercase transition-all relative ${activeTab === tab ? 'text-[#1e612a]' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {label}
                    {activeTab === tab && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1e612a]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tabbed Content */}
          <div className="bg-[#f0f7f3] rounded-3xl border border-[#e0e9e4] p-8 shadow-sm">
            {activeTab === 'NOTES' && (
              <div className="prose max-w-none">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-extrabold text-[#1a2e24]">{t('surgery.notes')}</h3>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-[#e0e9e4] text-slate-700 leading-relaxed font-serif whitespace-pre-wrap">
                  {activeChapter.notes}
                </div>
              </div>
            )}

            {activeTab === 'TABLES' && (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-extrabold text-[#1a2e24]">{activeChapter.tables[0]?.title}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bailey & Love Clinical Guide</p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-[#e0e9e4]">
                        {activeChapter.tables[0]?.headers.map((header, i) => (
                          <th key={i} className={`pb-4 font-black ${i === 0 ? 'text-left' : 'text-center'}`}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e0e9e4]">
                      {activeChapter.tables[0]?.rows.map((row, idx) => (
                        <tr key={idx} className="group transition-all hover:bg-white/50">
                          {row.map((cell: any, cellIdx: number) => (
                            <td key={cellIdx} className={`py-6 ${cellIdx === 0 ? 'pl-4 font-extrabold text-sm text-slate-800' : 'text-center text-xs text-slate-600'}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {(activeTab === 'EMERGENCIES' || activeTab === 'MCQS' || activeTab === 'DRUGS') && (
              <div className="flex flex-col items-center justify-center p-20 text-center space-y-4">
                <BookOpen size={48} className="text-emerald-200" />
                <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest">Section under development</h3>
                <p className="text-xs text-slate-400">Detailed surgical protocols for this chapter are being digitized from the 27th Edition.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Right */}
        <AnimatePresence>
          {isRightSidebarOpen && (
            <motion.aside 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-80 bg-white border-l border-[#e0e9e4] flex flex-col shrink-0 overflow-hidden"
            >
              <div className="p-8 pb-20 min-w-[320px] overflow-y-auto custom-scrollbar flex-1">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-sm font-extrabold text-[#1a2e24]">{t('surgery.status')}</h3>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setIsRightSidebarOpen(false)}
                      className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
                      title="Hide Status"
                    >
                      <X size={16} />
                    </button>
                    <div className="w-10 h-10 relative">
                       <svg className="w-full h-full transform -rotate-90">
                         <circle cx="20" cy="20" r="17" fill="transparent" stroke="#e2e8f0" strokeWidth="3" />
                         <circle cx="20" cy="20" r="17" fill="transparent" stroke="#1e612a" strokeWidth="3" strokeDasharray="106.8" strokeDashoffset="90" strokeLinecap="round" />
                       </svg>
                       <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold">15%</span>
                    </div>
                  </div>
                </div>

          <div className="mb-10">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{t('surgery.timer')}</p>
            <div className="text-2xl font-black text-emerald-800 tabular-nums">00:47:23</div>
          </div>

          <div className="mb-10">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{t('surgery.outline')}</p>
            <div className="space-y-4">
              {activeChapter.sections.map((item, idx) => (
                <div key={idx} className={`flex items-center gap-3 p-2.5 rounded-xl transition-all cursor-pointer ${idx === 0 ? 'bg-[#f0fdf4] text-emerald-800 font-bold border border-emerald-100 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-emerald-600' : 'bg-slate-300'}`}></div>
                  <span className="text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#f0f7f4] rounded-2xl p-6 border border-[#e0e9e4] mb-10">
            <div className="flex items-center gap-2 mb-3">
               <AlertCircle size={14} className="text-emerald-700" />
               <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">{t('surgery.clinicalRef')}</p>
            </div>
            <p className="text-xs font-bold text-emerald-900 italic leading-relaxed">
              "Recognition of shock must be clinical. Do not wait for BP to drop."
            </p>
          </div>

          <div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{t('surgery.related')}</p>
             <div className="space-y-3">
               {[
                 { title: 'Fluid Balance', icon: LayoutGrid },
                 { title: 'Fast Scan in Trauma', icon: Bookmark }
               ].map((chap, idx) => (
                 <button key={idx} className="w-full bg-[#f8faf9] border border-[#e8eeea] p-4 rounded-xl flex items-center justify-between group hover:bg-[#f2f7f4] transition-all">
                    <div className="flex items-center gap-3">
                       <chap.icon size={16} className="text-slate-400 group-hover:text-emerald-600" />
                       <span className="text-xs font-bold text-slate-700">{chap.title}</span>
                    </div>
                    <ArrowRight size={14} className="text-slate-300 group-hover:text-emerald-600 transition-all opacity-0 group-hover:opacity-100" />
                 </button>
               ))}
             </div>
          </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  </main>
</div>
);
};

const TrendingUp = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
