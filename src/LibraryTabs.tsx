import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Book, Bookmark, Brain, X, FileText, Activity, ChevronLeft, GraduationCap, ArrowRight, Database, User, Calendar, Upload, Eye, ChevronRight, Type, Plus, ClipboardList, Leaf, FlaskConical } from 'lucide-react';
import { ORGANON_DATA, PREFACES_DATA, Aphorism, Preface } from './organonData';
import { PATHOLOGY_DATA, KNOWLEDGE_DATA, CLASSIC_BOOKS, KNOWLEDGE_CATEGORIES, RECENT_ARTICLES, PHYSIOLOGY_ANATOMY_DATA, KnowledgeTopic } from './medicalData';
import { DIAGNOSES_DATA, ClinicalDiagnosis } from './practiceMedicineData';
import { PATHOLOGY_SYSTEMS, PATHOLOGY_CONDITIONS } from './pathologyData';
import { useLanguage } from './LanguageContext';

export const OrganonTab = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real-time Firestore or fallback data states
  const [aphorisms, setAphorisms] = useState<Aphorism[]>(ORGANON_DATA);
  const [prefaces, setPrefaces] = useState<Preface[]>(PREFACES_DATA);
  const [loadingFromCloud, setLoadingFromCloud] = useState(false);

  const [selectedAphorism, setSelectedAphorism] = useState<Aphorism | null>(ORGANON_DATA[0]);
  const [selectedPreface, setSelectedPreface] = useState<Preface | null>(null);
  const [organonSubTab, setOrganonSubTab] = useState<'aphorisms' | 'prefaces'>('aphorisms');
  const [activeFilter, setActiveFilter] = useState<'all' | 'food' | 'dr_choice' | 'case_taking'>('all');
  const [fontSize, setFontSize] = useState(100);
  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    const saved = localStorage.getItem('organon_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [expandedCoreGroups, setExpandedCoreGroups] = useState<string[]>([]);
  const toggleCoreGroup = (id: string) => {
    setExpandedCoreGroups(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);
  };
  const CORE_PRINCIPLE_GROUPS = [
    { id: 'mission', label: "The Physician's Mission", bn: 'চিকিৎসকের লক্ষ্য', range: [1, 2],
      intro: "Defines the physician's single true purpose: restoring the sick to health, quickly, gently, and permanently.",
      banglaIntro: "চিকিৎসকের একমাত্র প্রকৃত লক্ষ্য কী তা নির্ধারণ করে — দ্রুত, মৃদুভাবে এবং স্থায়ীভাবে রোগীকে সুস্থ করে তোলা।" },
    { id: 'requisites', label: 'Requisites for a Rational Cure', bn: 'যুক্তিসঙ্গত আরোগ্যের শর্ত', range: [3, 4],
      intro: "What a physician must know and do before treatment begins: understand the disease, know the remedy's action, and remove obstacles to cure.",
      banglaIntro: "চিকিৎসা শুরুর আগে একজন চিকিৎসকের যা জানা ও করা প্রয়োজন — রোগ বোঝা, ওষুধের ক্রিয়া জানা এবং আরোগ্যের পথে বাধা দূর করা।" },
    { id: 'obstacles', label: 'Removing Obstacles to Cure', bn: 'আরোগ্যের অন্তরায় দূরীকরণ', range: [5, 8],
      intro: "Covers gathering the patient's history, circumstances, and habits, and clearing away factors that keep a disease going.",
      banglaIntro: "রোগীর ইতিহাস, পারিপার্শ্বিকতা ও অভ্যাস জানা এবং রোগ টিকিয়ে রাখা এমন কারণ দূর করার বিষয়ে আলোচনা।" },
    { id: 'vital_force', label: 'The Vital Force & Nature of Disease', bn: 'জীবনীশক্তি ও রোগের প্রকৃতি', range: [9, 18],
      intro: "Explains disease as a disturbance of the invisible vital force, which expresses itself through symptoms rather than through a fixed material lesion.",
      banglaIntro: "রোগকে অদৃশ্য জীবনীশক্তির বিশৃঙ্খলা হিসেবে ব্যাখ্যা করে, যা কোনো স্থায়ী বস্তুগত ক্ষতের বদলে লক্ষণের মাধ্যমে প্রকাশ পায়।" },
    { id: 'symptom_totality', label: 'The Totality of Symptoms', bn: 'লক্ষণসমষ্টি', range: [19, 27],
      intro: "The complete set of a patient's symptoms — not a diagnostic label — is the true target of homeopathic treatment.",
      banglaIntro: "রোগীর সম্পূর্ণ লক্ষণসমষ্টিই — কোনো রোগ-নাম নয় — হোমিওপ্যাথিক চিকিৎসার আসল লক্ষ্যবস্তু।" },
    { id: 'law_of_similars', label: 'The Law of Similars', bn: 'সদৃশ বিধান', range: [24, 27],
      intro: "States and defends the central homeopathic principle: a substance that can produce a set of symptoms in a healthy person can cure a similar set in a sick one.",
      banglaIntro: "হোমিওপ্যাথির মূল নীতি প্রতিষ্ঠা করে — সুস্থ মানুষে যে পদার্থ যে লক্ষণ তৈরি করতে পারে, রোগীর একই ধরনের লক্ষণ তা আরোগ্য করতে পারে।" },
    { id: 'drug_provings', label: 'Drug Provings', bn: 'ঔষধ পরীক্ষা (প্রুভিং)', range: [105, 145],
      intro: "How remedies are tested on healthy subjects to record their true symptom-producing power, forming the basis of the Materia Medica.",
      banglaIntro: "সুস্থ মানুষের উপর পরীক্ষা করে ওষুধের প্রকৃত লক্ষণ-উৎপাদন ক্ষমতা রেকর্ড করার পদ্ধতি, যা মেটেরিয়া মেডিকার ভিত্তি।" },
    { id: 'case_taking', label: 'Case Taking & Examining the Patient', bn: 'কেস টেকিং', range: [83, 104],
      intro: "Guidance on observing and questioning the patient without leading them, to record symptoms exactly as they naturally occur.",
      banglaIntro: "রোগীকে প্রভাবিত না করে পর্যবেক্ষণ ও প্রশ্ন করার নির্দেশনা, যাতে লক্ষণ যেমন স্বাভাবিকভাবে দেখা দেয় ঠিক সেভাবেই লিপিবদ্ধ হয়।" },
    { id: 'remedy_selection', label: 'Selecting the Remedy', bn: 'ওষুধ নির্বাচন', range: [146, 171],
      intro: "How to match the recorded symptom-picture of the patient against proven remedy-pictures to find the most similar match.",
      banglaIntro: "রোগীর লিপিবদ্ধ লক্ষণচিত্রকে পরীক্ষিত ওষুধ-চিত্রের সাথে মিলিয়ে সবচেয়ে সদৃশ ওষুধ খুঁজে বের করার পদ্ধতি।" },
    { id: 'chronic_disease', label: 'Chronic Diseases', bn: 'পুরাতন রোগ', range: [72, 82],
      intro: "Distinguishes acute from chronic disease and introduces the deeper, underlying causes behind long-standing complaints.",
      banglaIntro: "তীব্র ও পুরাতন রোগের পার্থক্য এবং দীর্ঘস্থায়ী রোগের গভীর অন্তর্নিহিত কারণ সম্পর্কে ধারণা দেয়।" },
    { id: 'one_sided', label: 'One-Sided & Difficult Diseases', bn: 'একপার্শ্বিক ও জটিল রোগ', range: [231, 244],
      intro: "How to manage cases where few symptoms are visible, or a strong local symptom dominates the picture.",
      banglaIntro: "যেসব ক্ষেত্রে লক্ষণ কম দেখা যায় বা একটি প্রবল স্থানিক লক্ষণ সমগ্র চিত্রে প্রাধান্য পায়, তা সামলানোর উপায়।" },
    { id: 'mental_disease', label: 'Mental & Emotional Diseases', bn: 'মানসিক রোগ', range: [210, 230],
      intro: "Mental and emotional symptoms are treated as an integral part of the disease picture, not a separate category.",
      banglaIntro: "মানসিক ও আবেগগত লক্ষণকে রোগচিত্রের একটি অবিচ্ছেদ্য অংশ হিসেবে বিবেচনা করা হয়, আলাদা বিভাগ হিসেবে নয়।" },
    { id: 'dosage', label: 'Dosage & Administration', bn: 'মাত্রা ও প্রয়োগ', range: [245, 263],
      intro: "Practical directions on potency, repetition, and administering the smallest effective dose.",
      banglaIntro: "শক্তি নির্বাচন, পুনরাবৃত্তি এবং সর্বনিম্ন কার্যকর মাত্রা প্রয়োগের ব্যবহারিক নির্দেশনা।" },
    { id: 'regimen', label: 'Diet & Regimen', bn: 'খাদ্য ও দিনচর্যা', range: [259, 263],
      intro: "Advice on diet and lifestyle during treatment, so nothing interferes with the remedy's action.",
      banglaIntro: "চিকিৎসাকালীন খাদ্য ও জীবনযাত্রা সংক্রান্ত পরামর্শ, যাতে ওষুধের কাজে কোনো বাধা না আসে।" },
    { id: 'other_methods', label: 'Auxiliary & Other Methods of Treatment', bn: 'সহায়ক চিকিৎসা পদ্ধতি', range: [264, 291],
      intro: "Discusses mechanical and external aids alongside remedies, and closes with concluding reflections.",
      banglaIntro: "ওষুধের পাশাপাশি যান্ত্রিক ও বাহ্যিক সহায়ক ব্যবস্থার আলোচনা এবং সামগ্রিক উপসংহার।" },
  ];

  const [isReaderOpen, setIsReaderOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('organon_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    // Only using local data now
    setLoadingFromCloud(false);
  }, []);

  const toggleBookmark = (id: number) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const filteredAphorisms = useMemo(() => {
    let data = aphorisms;
    
    if (activeFilter === 'food') {
      data = data.filter(a => a.id >= 259 && a.id <= 263);
    } else if (activeFilter === 'dr_choice') {
      data = data.filter(a => (a.id >= 1 && a.id <= 4) || (a.id >= 245 && a.id <= 258));
    } else if (activeFilter === 'case_taking') {
      data = data.filter(a => a.id >= 83 && a.id <= 104);
    }

    if (showBookmarksOnly) {
      data = data.filter(a => bookmarks.includes(a.id));
    }
    if (!searchQuery) return data;
    const query = searchQuery.toLowerCase();
    return data.filter(a => 
      a.text.toLowerCase().includes(query) || 
      (a.title && a.title.toLowerCase().includes(query)) ||
      (a.banglaText && a.banglaText.toLowerCase().includes(query)) ||
      (a.banglaTitle && a.banglaTitle.toLowerCase().includes(query)) ||
      a.id.toString() === query
    );
  }, [aphorisms, searchQuery, bookmarks, showBookmarksOnly, activeFilter]);

  const filteredPrefaces = useMemo(() => {
    if (!searchQuery) return prefaces;
    const query = searchQuery.toLowerCase();
    return prefaces.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.banglaTitle.toLowerCase().includes(query) ||
      p.content.toLowerCase().includes(query) ||
      p.banglaContent.toLowerCase().includes(query)
    );
  }, [prefaces, searchQuery]);

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-surface overflow-hidden rounded-[2.5rem] border border-slate-100 shadow-sm">
      {/* Top Bar */}
      <header className="flex flex-col md:flex-row justify-between items-center w-full px-8 py-4 bg-white border-b border-slate-100 shrink-0 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">history_edu</span>
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">{t('library.organonBrowser')}</h2>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary mt-0.5">
              <span className="material-symbols-outlined text-xs">menu_book</span>
              {t('library.organonEdition')}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setOrganonSubTab('aphorisms')}
              className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${organonSubTab === 'aphorisms' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {t('library.aphorisms')}
            </button>
            <button
              onClick={() => setOrganonSubTab('prefaces')}
              className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${organonSubTab === 'prefaces' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {t('library.introductions')}
            </button>
          </div>

          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder={t('library.searchAphorisms')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Panel: List */}
        <section className={`w-full md:w-1/3 bg-slate-50/50 border-r border-slate-100 overflow-y-auto custom-scrollbar flex flex-col transition-all duration-300 ${isReaderOpen ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-6 md:p-8 pb-4">
            <h2 className="text-lg md:text-xl font-black text-slate-900 tracking-tight uppercase">{t('library.corePrinciples')}</h2>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{t('library.systematicDirectives')}</p>
          </div>

          {/* Filters */}
          <div className="px-6 md:px-8 mb-6">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All', bn: 'সব' },
                { id: 'food', label: 'Food Note', bn: 'খাদ্য নোট' },
                { id: 'dr_choice', label: 'Core Principles', bn: 'মূলনীতি' },
                { id: 'case_taking', label: 'Case Taking', bn: 'কেস টেকিং' }
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id as any)}
                  className={`px-3 md:px-4 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all border ${
                    activeFilter === filter.id 
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                      : 'bg-white text-slate-500 border-slate-200 hover:border-primary/30'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span>{filter.label}</span>
                    <span className="text-[7px] md:text-[8px] opacity-70">{filter.bn}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 md:px-6 space-y-3 pb-12">
            {organonSubTab === 'aphorisms' ? (
              activeFilter === 'dr_choice' ? (
                CORE_PRINCIPLE_GROUPS.map(group => {
                  const groupAphorisms = filteredAphorisms.filter(a => a.id >= group.range[0] && a.id <= group.range[1]);
                  const isOpen = expandedCoreGroups.includes(group.id);
                  return (
                    <div key={group.id} className="rounded-3xl border-2 border-slate-100 bg-white/60 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => toggleCoreGroup(group.id)}
                        className="w-full flex items-center justify-between gap-3 px-4 md:px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] text-primary">
                              §{group.range[0]}–{group.range[1]}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400">({groupAphorisms.length})</span>
                          </div>
                          <h4 className="text-xs md:text-sm font-black text-slate-900 mt-0.5">{group.label}</h4>
                          <p className="text-[9px] md:text-[10px] text-slate-400 font-bold mt-0.5">{group.bn}</p>
                        </div>
                        <span className={`material-symbols-outlined text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                          expand_more
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 md:px-5 pb-2 -mt-1">
                              <p className="text-[10px] md:text-[11px] text-slate-500 font-medium leading-relaxed border-t border-slate-100 pt-3">
                                {group.intro}
                              </p>
                              <p className="text-[9px] md:text-[10px] text-slate-400 font-medium leading-relaxed mt-1">
                                {group.banglaIntro}
                              </p>
                            </div>
                            <div className="px-4 md:px-5 pb-4 space-y-2">
                              {groupAphorisms.map(a => (
                                <div
                                  key={a.id}
                                  onClick={() => { setSelectedAphorism(a); setIsReaderOpen(true); }}
                                  className={`p-3 rounded-2xl cursor-pointer transition-all border ${
                                    selectedAphorism?.id === a.id
                                      ? 'bg-primary/5 border-primary'
                                      : 'bg-white border-slate-100 hover:border-slate-200'
                                  }`}
                                >
                                  <div className="flex justify-between items-start mb-1.5">
                                    <span className={`text-[9px] font-black uppercase tracking-[0.15em] ${selectedAphorism?.id === a.id ? 'text-primary' : 'text-slate-400'}`}>
                                      {t('library.aphorism')} {a.id}
                                    </span>
                                    {bookmarks.includes(a.id) && (
                                      <span className="material-symbols-outlined text-primary text-base">verified</span>
                                    )}
                                  </div>
                                  <h3 className="text-xs font-black text-slate-900 leading-tight mb-1">{a.title || `${t('library.aphorism')} ${a.id}`}</h3>
                                  <p className="text-[9px] text-slate-500 font-bold line-clamp-2 leading-relaxed">{a.text}</p>
                                </div>
                              ))}
                              {groupAphorisms.length === 0 && (
                                <p className="text-[10px] text-slate-300 font-bold italic py-2">No aphorisms loaded in this range yet.</p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              ) : (
              filteredAphorisms.map((a) => (
                <motion.div
                  key={a.id}
                  layoutId={`aphorism-card-${a.id}`}
                  onClick={() => { setSelectedAphorism(a); setIsReaderOpen(true); }}
                  className={`p-4 md:p-5 rounded-3xl cursor-pointer transition-all border-2 ${
                    selectedAphorism?.id === a.id 
                      ? 'bg-white border-primary shadow-xl shadow-primary/5' 
                      : 'bg-white/50 border-transparent hover:border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] ${selectedAphorism?.id === a.id ? 'text-primary' : 'text-slate-400'}`}>
                      {t('library.aphorism')} {a.id}
                    </span>
                    {bookmarks.includes(a.id) && (
                      <span className="material-symbols-outlined text-primary text-lg">verified</span>
                    )}
                  </div>
                  <h3 className="text-xs md:text-sm font-black text-slate-900 leading-tight mb-2">{a.title || `${t('library.aphorism')} ${a.id}`}</h3>
                  <p className="text-[9px] md:text-[10px] text-slate-500 font-bold line-clamp-2 leading-relaxed">{a.text}</p>
                </motion.div>
              ))
              )
            ) : (
              filteredPrefaces.map((p) => (
                <motion.div
                  key={p.id}
                  onClick={() => { setSelectedPreface(p); setIsReaderOpen(true); }}
                  className={`p-4 md:p-5 rounded-3xl cursor-pointer transition-all border-2 ${
                    selectedPreface?.id === p.id 
                      ? 'bg-white border-primary shadow-xl shadow-primary/5' 
                      : 'bg-white/50 border-transparent hover:border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] ${selectedPreface?.id === p.id ? 'text-primary' : 'text-slate-400'}`}>
                      {t('library.introduction')}
                    </span>
                  </div>
                  <h3 className="text-xs md:text-sm font-black text-slate-900 leading-tight mb-2">{p.title}</h3>
                  <p className="text-[9px] md:text-[10px] text-slate-500 font-bold line-clamp-2 leading-relaxed">{p.content}</p>
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* Right Panel: Reader Workspace */}
        <section className={`flex-1 flex flex-col bg-white overflow-y-auto custom-scrollbar transition-all duration-300 ${isReaderOpen ? 'flex' : 'hidden md:flex'}`}>
          <AnimatePresence mode="wait">
            {(organonSubTab === 'aphorisms' && selectedAphorism) || (organonSubTab === 'prefaces' && selectedPreface) ? (
              <motion.div
                key={organonSubTab === 'aphorisms' ? `aphorism-${selectedAphorism?.id}` : `preface-${selectedPreface?.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col h-full"
              >
                {/* Reader Actions */}
                <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-6 md:px-10 py-4 flex justify-between items-center border-b border-slate-100">
                  <div className="flex items-center gap-2 md:gap-4">
                    <button 
                      onClick={() => setIsReaderOpen(false)}
                      className="p-2 text-slate-400 hover:text-primary md:hidden"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button className="hidden sm:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:shadow-lg hover:shadow-primary/20">
                      <span className="material-symbols-outlined text-sm">auto_stories</span>
                      {t('library.readingMode')}
                    </button>
                    <div className="flex items-center bg-slate-100 px-2 md:px-3 py-1.5 rounded-2xl gap-2 md:gap-4">
                      <button 
                        onClick={() => setFontSize(prev => Math.max(70, prev - 10))}
                        className="material-symbols-outlined text-base md:text-lg text-slate-400 hover:text-primary transition-colors"
                      >
                        text_decrease
                      </button>
                      <span className="text-[9px] md:text-[10px] font-black text-slate-900 w-8 md:w-10 text-center">{fontSize}%</span>
                      <button 
                        onClick={() => setFontSize(prev => Math.min(150, prev + 10))}
                        className="material-symbols-outlined text-base md:text-lg text-slate-400 hover:text-primary transition-colors"
                      >
                        text_increase
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2">
                    <button className="p-2 md:p-3 rounded-2xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-primary">
                      <span className="material-symbols-outlined text-lg md:text-xl">share</span>
                    </button>
                    <button 
                      onClick={() => window.print()}
                      className="p-2 md:p-3 rounded-2xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-primary"
                    >
                      <span className="material-symbols-outlined text-lg md:text-xl">print</span>
                    </button>
                    {organonSubTab === 'aphorisms' && (
                      <button 
                        onClick={() => toggleBookmark(selectedAphorism!.id)}
                        className={`p-2 md:p-3 rounded-2xl transition-colors ${bookmarks.includes(selectedAphorism!.id) ? 'text-primary bg-primary/10' : 'text-slate-400 hover:bg-slate-100 hover:text-primary'}`}
                      >
                        <span className="material-symbols-outlined text-lg md:text-xl">{bookmarks.includes(selectedAphorism!.id) ? 'bookmark_added' : 'bookmark'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Content Display */}
                <div className="px-6 md:px-12 py-10 md:py-16 max-w-5xl mx-auto w-full">
                  <div className="mb-12 md:mb-20">
                    <span className="text-[9px] md:text-[10px] font-black text-primary tracking-[0.4em] uppercase block mb-4 md:mb-6">
                      {organonSubTab === 'aphorisms' ? `${t('library.aphorism')} ${selectedAphorism?.id}` : t('library.introduction')}
                    </span>
                    <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight mb-8 md:mb-12 leading-tight">
                      {organonSubTab === 'aphorisms' ? selectedAphorism?.title : selectedPreface?.title}
                    </h1>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
                      {/* English Text */}
                      <div className="space-y-6 md:space-y-8">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                            <span className="text-[9px] md:text-[10px] font-black text-primary">EN</span>
                          </div>
                          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">English Translation</span>
                        </div>
                        <p 
                          className="text-lg md:text-xl font-medium text-slate-800 leading-[1.8] italic border-l-4 border-primary/20 pl-4 md:pl-6"
                          style={{ fontSize: `${(fontSize / 100) * (window.innerWidth < 768 ? 1.1 : 1.25)}rem` }}
                        >
                          "{organonSubTab === 'aphorisms' ? selectedAphorism?.text : selectedPreface?.content}"
                        </p>
                      </div>

                      {/* Bengali Text */}
                      <div className="space-y-6 md:space-y-8">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                          <div className="w-8 h-8 rounded-xl bg-secondary/10 flex items-center justify-center">
                            <span className="text-[9px] md:text-[10px] font-black text-secondary">BN</span>
                          </div>
                          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">Bengali Translation</span>
                        </div>
                        <p 
                          className="text-xl md:text-2xl font-bold text-slate-900 leading-[1.8]"
                          style={{ fontSize: `${(fontSize / 100) * (window.innerWidth < 768 ? 1.3 : 1.5)}rem` }}
                        >
                          "{organonSubTab === 'aphorisms' ? selectedAphorism?.banglaText : selectedPreface?.banglaContent}"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Commentary Section */}
                  <div className="mt-24 pt-16 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-10">
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-4">
                        <span className="material-symbols-outlined text-primary text-2xl">comment</span>
                        {t('library.clinicalCommentary')}
                      </h3>
                      <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Add Note</button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-primary/20 transition-all">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xs shadow-lg shadow-primary/20">JT</div>
                            <div>
                              <p className="text-sm font-black text-slate-900">Dr. James T. Kent</p>
                              <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Historical Reference</p>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-400 italic font-bold">Lectures</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                          The first paragraph of the Organon is the most important for every practitioner to realize. It defines the 'mission'—not a mere job, but a high duty to the suffering humanity.
                        </p>
                      </div>

                      <div className="p-8 rounded-[2rem] bg-white border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 group hover:border-primary/40 hover:text-primary cursor-pointer transition-all">
                        <span className="material-symbols-outlined text-4xl mb-3 group-hover:scale-110 transition-transform">add_circle</span>
                        <p className="text-[10px] font-black uppercase tracking-widest">Personal Clinical Note</p>
                      </div>
                    </div>
                  </div>

                  {/* Cross References Bento Grid */}
                  <div className="mt-32 mb-20">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10">Cross References</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2 bg-slate-900 p-10 rounded-[2.5rem] group hover:bg-primary transition-all duration-500 cursor-pointer relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
                        <div className="flex justify-between items-start mb-16 relative z-10">
                          <span className="material-symbols-outlined text-4xl text-primary group-hover:text-white transition-colors">medical_information</span>
                          <span className="material-symbols-outlined text-white/30 group-hover:text-white transition-colors">north_east</span>
                        </div>
                        <h5 className="text-2xl font-black text-white mb-3 relative z-10">Constitutional Prescribing</h5>
                        <p className="text-sm text-white/60 group-hover:text-white/80 leading-relaxed max-w-md relative z-10">
                          How Aphorism 1 informs the selection of a deep-acting remedy based on the totality.
                        </p>
                      </div>

                      <div className="bg-emerald-500 p-10 rounded-[2.5rem] group hover:shadow-2xl hover:shadow-emerald-500/20 transition-all cursor-pointer text-white">
                        <span className="material-symbols-outlined text-4xl mb-16 block">vital_signs</span>
                        <h5 className="text-xl font-black leading-tight">Vitals & Miasms</h5>
                        <p className="text-[10px] font-black uppercase tracking-widest mt-4 opacity-70">Chronic Diseases Vol 1</p>
                      </div>

                      <div className="bg-amber-500 p-10 rounded-[2.5rem] group hover:shadow-2xl hover:shadow-amber-500/20 transition-all cursor-pointer text-white">
                        <span className="material-symbols-outlined text-4xl mb-16 block">science</span>
                        <h5 className="text-xl font-black leading-tight">Pharmacy Standards</h5>
                        <p className="text-[10px] font-black uppercase tracking-widest mt-4 opacity-70">Aphorism 264-271</p>
                      </div>

                      <div className="md:col-span-2 bg-slate-100 p-10 rounded-[2.5rem] group hover:bg-slate-200 transition-all cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h5 className="text-xl font-black text-slate-900">Case Analysis Hub</h5>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Apply Aphorism 1 to active case files</p>
                          </div>
                          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl">folder_shared</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-slate-50/30 p-12 text-center">
                <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center text-slate-200 mb-8 shadow-xl shadow-slate-100">
                  <span className="material-symbols-outlined text-5xl">auto_stories</span>
                </div>
                <h3 className="text-2xl font-black text-slate-400 uppercase tracking-tight">
                  {organonSubTab === 'aphorisms' ? 'Select an Aphorism' : 'Select an Introduction'}
                </h3>
                <p className="text-slate-300 text-sm max-w-xs mt-4 font-bold">
                  {organonSubTab === 'aphorisms' 
                    ? 'Choose an aphorism from the list to read the foundational principles of Homeopathy.' 
                    : 'Explore the historical prefaces and introductions to the Organon.'}
                </p>
              </div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};

const parseRubricAndRemedies = (rubricStr: string, mainRemedies: string[] = []) => {
  const parts = rubricStr.split(/[\u2013\u2014-]/);
  if (parts.length >= 2) {
    const rubricName = parts.slice(0, -1).join('–').trim();
    const remediesPart = parts[parts.length - 1].trim().replace(/\.$/, '');
    const remedies = remediesPart.split(/,\s*/).map(r => r.trim()).filter(Boolean);
    return { name: rubricName, remedies };
  }
  return { 
    name: rubricStr, 
    remedies: mainRemedies.length > 0 ? mainRemedies.slice(0, 3) : [] 
  };
};

export const PracticeMedicineTab = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<ClinicalDiagnosis | null>(DIAGNOSES_DATA.find(d => d.name === 'Dengue Fever') || DIAGNOSES_DATA[0]);
  const [activeTab, setActiveTab] = useState<'symptoms' | 'diagnosis' | 'medicine' | 'repertory' | 'complications' | 'differential' | 'keypoints' | 'summary'>('medicine');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('সব রোগ');
  const [mcqAnswered, setMcqAnswered] = useState(false);
  const [selectedMcqOption, setSelectedMcqOption] = useState<string | null>(null);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 1400) {
        setIsLeftSidebarOpen(false);
        setIsRightSidebarOpen(false);
      }
    }
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) ? prev.filter(s => s !== sectionId) : [...prev, sectionId]
    );
  };

  const filteredDiagnoses = useMemo(() => {
    return DIAGNOSES_DATA.filter(d => {
      // Check search query
      const matchesSearch = !searchQuery || 
        d.banglaName.includes(searchQuery) || 
        d.name.toLowerCase().includes(searchQuery.toLowerCase());
        
      if (!matchesSearch) return false;

      // Check active filter pill
      if (activeFilter === '🔴 জরুরি') return d.severity === 'severe';
      if (activeFilter === '🟡 মধ্যম') return d.severity === 'moderate';
      if (activeFilter === '🟢 হালকা') return d.severity === 'mild';
      if (activeFilter === 'শিশু 👶') return d.section.includes('শিশু');
      if (activeFilter === 'মহিলা 👩') return d.section.includes('স্ত্রী');
      if (activeFilter === 'হৃদরোগ 🫀') return d.section.includes('হৃদরোগ');
      if (activeFilter === 'শ্বাস 🫁') return d.section.includes('শ্বাস');
      if (activeFilter === 'স্নায়ু 🧠') return d.section.includes('স্নায়ু');
      if (activeFilter === 'পরিপাক 🍽') return d.section.includes('পরিপাক');
      if (activeFilter === 'ত্বক 🧫') return d.section.includes('ত্বক');
      if (activeFilter === 'হাড় 🦴') return d.section.includes('হাড়');
      
      return true; // 'সব রোগ'
    });
  }, [searchQuery, activeFilter]);

  const SECTIONS = useMemo(() => [
    { id: 'A', name: 'জ্বর ও সংক্রামক রোগ', count: filteredDiagnoses.filter(d => d.section === 'Section A: জ্বর ও সংক্রামক রোগ').length, emoji: '🌡️', color: '#16A34A', fullName: 'Section A: জ্বর ও সংক্রামক রোগ' },
    { id: 'B', name: 'হৃদরোগ ও সংবহনতন্ত্র', count: filteredDiagnoses.filter(d => d.section === 'Section B: হৃদরোগ ও সংবহনতন্ত্র').length, emoji: '🫀', color: '#DC2626', fullName: 'Section B: হৃদরোগ ও সংবহনতন্ত্র' },
    { id: 'C', name: 'শ্বাসতন্ত্রের রোগ', count: filteredDiagnoses.filter(d => d.section === 'Section C: শ্বাসতন্ত্রের রোগ').length, emoji: '🫁', color: '#2563EB', fullName: 'Section C: শ্বাসতন্ত্রের রোগ' },
    { id: 'D', name: 'স্নায়ুতন্ত্র ও মানসিক', count: filteredDiagnoses.filter(d => d.section === 'Section D: স্নায়ুতন্ত্র ও মানসিক').length, emoji: '🧠', color: '#7C3AED', fullName: 'Section D: স্নায়ুতন্ত্র ও মানসিক' },
    { id: 'E', name: 'পরিপাকতন্ত্র', count: filteredDiagnoses.filter(d => d.section === 'Section E: পরিপাকতন্ত্র').length, emoji: '🍽', color: '#D97706', fullName: 'Section E: পরিপাকতন্ত্র' },
    { id: 'F', name: 'হাড় ও জয়েন্ট', count: filteredDiagnoses.filter(d => d.section === 'Section F: হাড় ও জয়েন্ট').length, emoji: '🦴', color: '#92400E', fullName: 'Section F: হাড় ও জয়েন্ট' },
    { id: 'G', name: 'ত্বকের রোগ', count: filteredDiagnoses.filter(d => d.section === 'Section G: ত্বকের রোগ').length, emoji: '🧫', color: '#BE185D', fullName: 'Section G: ত্বকের রোগ' },
    { id: 'H', name: 'শিশুরোগ', count: filteredDiagnoses.filter(d => d.section === 'Section H: শিশুরোগ').length, emoji: '👶', color: '#0891B2', fullName: 'Section H: শিশুরোগ' },
    { id: 'I', name: 'স্ত্রীরোগ', count: filteredDiagnoses.filter(d => d.section === 'Section I: স্ত্রীরোগ').length, emoji: '👩', color: '#DB2777', fullName: 'Section I: স্ত্রীরোগ' },
    { id: 'J', name: 'মূত্রতন্ত্র', count: filteredDiagnoses.filter(d => d.section === 'Section J: মূত্রতন্ত্র').length, emoji: '🫘', color: '#0F766E', fullName: 'Section J: মূত্রতন্ত্র' },
    { id: 'K', name: 'দন্ত ও মুখগহ্বর', count: filteredDiagnoses.filter(d => d.section === 'Section K: দন্ত ও মুখগহ্বর').length, emoji: '🦷', color: '#1D4ED8', fullName: 'Section K: দন্ত ও মুখগহ্বর' },
    { id: 'L', name: 'চোখ ও কানের রোগ', count: filteredDiagnoses.filter(d => d.section === 'Section L: চোখ ও কানের রোগ').length, emoji: '👁', color: '#0369A1', fullName: 'Section L: চোখ ও কানের রোগ' },
    { id: 'M', name: 'ক্যান্সার ও টিউমার', count: filteredDiagnoses.filter(d => d.section === 'Section M: ক্যান্সার ও টিউমার').length, emoji: '🦠', color: '#991B1B', fullName: 'Section M: ক্যান্সার ও টিউমার' },
    { id: 'N', name: 'বিপাক ও অন্তঃস্রাবী', count: filteredDiagnoses.filter(d => d.section === 'Section N: বিপাক ও অন্তঃস্রাবী').length, emoji: '🩸', color: '#B45309', fullName: 'Section N: বিপাক ও অন্তঃস্রাবী' },
    { id: 'O', name: 'জরুরি রোগ', count: filteredDiagnoses.filter(d => d.section === 'Section O: জরুরি রোগ').length, emoji: '⚡', color: '#DC2626', fullName: 'Section O: জরুরি রোগ' },
  ], [filteredDiagnoses]);

  // Auto-expand sections having matches
  useEffect(() => {
    if (activeFilter !== 'সব রোগ' || searchQuery !== '') {
      const activeSectionNames = SECTIONS.filter(s => s.count > 0).map(s => s.fullName);
      setExpandedSections(activeSectionNames);
    }
  }, [activeFilter, searchQuery, SECTIONS]);

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-white overflow-hidden rounded-[2.5rem] border border-slate-200 shadow-xl font-hindi transition-all duration-500">
      {/* 1. TOP NAVBAR (Modern Clinical Design) */}
      <nav className="flex items-center justify-between px-4 lg:px-10 py-3 lg:py-5 bg-white border-b border-slate-100 shrink-0 z-50">
        <div className="flex items-center gap-4 lg:gap-10">
          <div className="flex items-center gap-2 lg:gap-3">
            <button 
              onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
              className={`p-2 rounded-xl transition-all ${isLeftSidebarOpen ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
            >
              <span className="material-symbols-outlined">{isLeftSidebarOpen ? 'format_indent_decrease' : 'format_indent_increase'}</span>
            </button>
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-xl lg:text-2xl">local_hospital</span>
            </div>
            <h1 className="text-sm lg:text-xl font-bold tracking-tight text-slate-900">Desk</h1>
          </div>
          
          <div className="hidden lg:flex items-center gap-2">
            {[
              { id: 'হৃদরোগ 🫀', label: '🫀 হৃদরোগ' },
              { id: 'শ্বাস 🫁', label: '🫁 শ্বাসতন্ত্র' },
              { id: 'স্নায়ু 🧠', label: '🧠 স্নায়ুতন্ত্র' },
              { id: 'পরিপাক 🍽', label: '🍽 পাকস্থলী' },
              { id: 'শিশু 👶', label: '👶 শিশুরোগ' },
              { id: 'মহিলা 👩', label: '👩 স্ত্রীরোগ' }
            ].map((cat, i) => (
              <button 
                key={i} 
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeFilter === cat.id ? 'bg-primary/5 text-primary' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-6">
          <div className="relative group hidden sm:block">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
              <Search size={16} />
            </div>
            <input 
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 lg:w-[360px] pl-10 pr-4 py-2 bg-[#F8FDF9] border border-[#D1FAE5] rounded-2xl text-[12px] font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-1.5 lg:gap-3">
            <div className="hidden sm:flex px-2 py-1 bg-[#DCFCE7] text-[#166534] text-[9px] font-black rounded-full uppercase tracking-tighter">{filteredDiagnoses.length}টি রোগ</div>
            <button 
              onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)} 
              className={`p-2 rounded-xl transition-all ${isRightSidebarOpen ? 'text-primary bg-primary/5' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
            >
              <span className="material-symbols-outlined">right_panel_open</span>
            </button>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#16A34A] to-[#86EFAC] flex items-center justify-center text-white font-black text-xs shadow-lg shadow-primary/20 cursor-pointer hover:scale-105 transition-transform">DR</div>
          </div>
        </div>
      </nav>

      {/* SEARCH AND FILTER BAR (Strip) */}
      <div className="flex items-center justify-between px-10 py-3 bg-[#F0FDF4] border-b border-[#D1FAE5] shrink-0">
         <div className="flex items-center gap-4">
            <span className="text-[11px] font-black text-[#166534] uppercase tracking-widest flex items-center gap-2">
              <Search size={14} /> সব রোগ
            </span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-[800px]">
              {['সব রোগ', '🔴 জরুরি', '🟡 মধ্যম', '🟢 হালকা', 'শিশু 👶', 'মহিলা 👩', 'হৃদরোগ 🫀', 'শ্বাস 🫁', 'স্নায়ু 🧠', 'পরিপাক 🍽', 'ত্বক 🧫', 'হাড় 🦴'].map((pill, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveFilter(pill)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black whitespace-nowrap transition-all ${activeFilter === pill ? 'bg-[#16A34A] text-white shadow-md border border-[#16A34A]' : 'bg-white text-slate-500 border border-[#D1FAE5] hover:border-primary/40'}`}
                >
                  {pill}
                </button>
              ))}
            </div>
         </div>
         <div className="flex items-center gap-3 text-[10px] font-black text-[#166534] uppercase tracking-widest cursor-pointer hover:opacity-70 transition-all">
           <span className="material-symbols-outlined text-sm">swap_vert</span>
           সাজান: পর্যালোচনা
         </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* 2. LEFT SIDEBAR (Accordion Index) */}
        <AnimatePresence initial={false}>
          {isLeftSidebarOpen && (
            <motion.aside 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="border-r border-[#D1FAE5] bg-white flex flex-col shrink-0 overflow-hidden absolute xl:relative top-0 left-0 bottom-0 h-full shadow-2xl xl:shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-60"
            >
              {/* Sticky Top Section Indicator (Selector 2) */}
              <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md px-6 py-6 border-b border-[#D1FAE5]">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#16A34A] to-[#22C55E] flex items-center justify-center text-white shadow-lg shadow-green-200">
                    <Leaf size={20} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-black text-[#166534] tracking-tight uppercase">Index</h3>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-0.5">{filteredDiagnoses.length}টি রোগ সূচিপত্র</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold text-[#16A34A]">
                    <span className="flex items-center gap-1.5"><Activity size={12} /> অগ্রগতি: ১০০%</span>
                    <span className="font-mono">{DIAGNOSES_DATA.length}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden p-0.5">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: '100%' }} 
                      className="h-full bg-gradient-to-r from-[#16A34A] to-[#22C55E] rounded-full shadow-[0_0_10px_rgba(22,163,74,0.3)]" 
                    />
                  </div>
                </div>
              </div>

              {/* Sidebar Content (Selector 3) */}
              <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#FBFDFB]">
                <div className="px-5 py-4">
                  <div className="relative group">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
                    <input 
                      type="text" 
                      placeholder="রোগ বা সেকশন খুঁজুন..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-[#D1FAE5] rounded-2xl text-[12px] font-bold shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>

            <div className="space-y-1">
              {SECTIONS.filter(s => s.count > 0).map((section) => (
                <div key={section.id} className="overflow-hidden">
                  <button 
                    onClick={() => toggleSection(section.fullName)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group ${expandedSections.includes(section.fullName) ? 'bg-[#F0FDF4]' : 'hover:bg-[#EAF7EE]'}`}
                    style={{ borderLeft: expandedSections.includes(section.fullName) ? `3px solid ${section.color}` : '3px solid transparent' }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm">{section.emoji}</span>
                      <span className="text-[12px] font-bold text-slate-800 tracking-tight">{section.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-[#DCFCE7] text-[#166534] px-2 py-0.5 rounded-full text-[9px] font-black font-mono">{section.count}</div>
                      <ChevronRight size={14} className={`text-slate-400 transition-transform ${expandedSections.includes(section.fullName) ? 'rotate-90' : ''}`} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedSections.includes(section.fullName) && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-1 pb-2">
                          {filteredDiagnoses.filter(d => 
                            d.section === section.fullName
                          ).map(diag => (
                            <button 
                              key={diag.id}
                              onClick={() => setSelectedDiagnosis(diag)}
                              className={`w-full text-left pl-10 pr-4 py-2.5 text-[11px] font-semibold transition-all flex items-center justify-between group relative ${selectedDiagnosis?.id === diag.id ? 'text-[#166534] bg-[#DCFCE7]' : 'text-slate-600 hover:text-primary hover:translate-x-1'}`}
                            >
                              <div className="flex items-center gap-3">
                                {selectedDiagnosis?.id === diag.id ? (
                                  <div className="absolute left-4 w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                                ) : (
                                  <div className="absolute left-6 w-1 h-1 rounded-full bg-slate-200" />
                                )}
                                <span className={selectedDiagnosis?.id === diag.id ? 'font-black' : ''}>{diag.banglaName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity">✓</span>
                                <span className={`w-1.5 h-1.5 rounded-full ${diag.severity === 'severe' ? 'bg-red-500' : diag.severity === 'moderate' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div className="sticky bottom-0 bg-[#F0FDF4] border-t border-[#D1FAE5] p-4 flex flex-col gap-2">
             <div className="flex gap-2">
               <button className="flex-1 py-2 bg-white border border-[#D1FAE5] rounded-xl text-[10px] font-black text-slate-600 flex items-center justify-center gap-2 hover:bg-[#16A34A] hover:text-white transition-all">
                 <span className="material-symbols-outlined text-[14px]">settings</span> সেটিংস
               </button>
               <button className="flex-1 py-2 bg-white border border-[#D1FAE5] rounded-xl text-[10px] font-black text-slate-600 flex items-center justify-center gap-2 hover:bg-[#16A34A] hover:text-white transition-all">
                 <span className="material-symbols-outlined text-[14px]">bar_chart</span> পরিসংখ্যান
               </button>
             </div>
             <p className="text-[9px] font-mono text-slate-400 text-center mt-1">v1.0 • HomeoDisease Desk</p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>

    {/* 3. MAIN CONTENT (Workspace) */}
        <main className="flex-1 flex flex-col overflow-y-auto custom-scrollbar bg-white relative">
          <AnimatePresence mode="wait">
            {selectedDiagnosis ? (
              <motion.div 
                key={selectedDiagnosis.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-8 md:p-10 pb-20 max-w-6xl mx-auto w-full"
              >
                {/* A. BREADCRUMBS */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 font-mono uppercase tracking-[0.1em]">
                    <span className="text-primary flex items-center gap-1"><Leaf size={10} /> HomeoDisease Desk</span>
                    <ChevronRight size={10} />
                    <span>{selectedDiagnosis.section}</span>
                    <ChevronRight size={10} />
                    <span className="text-slate-900">{selectedDiagnosis.banglaName}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">রোগ পর্যালোচনা: সম্পূর্ণ</span>
                    <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-full" />
                    </div>
                  </div>
                </div>

                {/* B. DISEASE HERO CARD */}
                <section className="relative rounded-[2rem] p-8 md:p-10 bg-gradient-to-br from-[#F0FDF4] via-[#ECFDF5] to-[#F8FFF9] border border-[#D1FAE5] overflow-hidden shadow-sm shadow-primary/5 group" style={{ borderLeft: selectedDiagnosis.severity === 'severe' ? '6px solid #DC2626' : selectedDiagnosis.severity === 'moderate' ? '6px solid #F59E0B' : '6px solid #16A34A' }}>
                  {/* Decorative Background Elements */}
                  <div className="absolute bottom-0 right-0 p-4 opacity-5 pointer-events-none select-none">
                    <h1 className="text-[140px] font-playfair font-black text-[#14532D] leading-none transform translate-y-1/4 translate-x-1/4">{selectedDiagnosis.banglaName}</h1>
                  </div>
                  <div className="absolute top-4 right-4 opacity-[0.03] transform rotate-12 pointer-events-none">
                    <Activity size={160} />
                  </div>

                  <div className="relative z-10">
                    <p className="text-[10px] font-black text-[#16A34A] uppercase tracking-[0.3em] mb-4 font-mono">{selectedDiagnosis.section}</p>
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
                      <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-black text-[#14532D] tracking-tight font-playfair leading-tight mb-2">{selectedDiagnosis.banglaName}</h1>
                        <p className="text-lg text-[#374151] font-mono italic flex items-center gap-3">
                          {selectedDiagnosis.name} 
                          <span className="text-[9px] bg-white/60 border border-[#D1FAE5] px-2 py-0.5 rounded text-slate-400 font-normal">ICD-10: {selectedDiagnosis.icd10 || 'N/A'}</span>
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                          <span className={`px-3 py-1 bg-white border border-red-100 text-red-600 text-[10px] font-black rounded-lg uppercase flex items-center gap-2 ${selectedDiagnosis.severity === 'severe' ? 'animate-pulse' : ''}`}>
                            <div className="w-1.5 h-1.5 rounded-full bg-red-600" /> অতি গুরুতর
                          </span>
                          
                          
                          
                          <span className="px-3 py-1 bg-slate-200/50 text-slate-500 text-[9px] font-mono rounded-lg">পৃষ্ঠা ১৫৪–১৬৮</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <div className="flex gap-2">
                           <button onClick={() => setActiveTab('summary')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all shadow-sm ${activeTab === 'summary' ? 'bg-primary text-white border-primary' : 'bg-white border border-primary/20 text-primary hover:bg-primary/5'}`}>
                             <FileText size={14} /> সংক্ষিপ্ত নোট
                           </button>
                           <button onClick={() => setActiveTab('repertory')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all shadow-lg ${activeTab === 'repertory' ? 'bg-primary text-white shadow-primary/20' : 'bg-white border border-primary/20 text-primary hover:bg-primary/5'}`}>
                             <Activity size={14} /> রেপার্টরি দেখুন
                           </button>
                        </div>
                        <div className="flex gap-2">
                           <button onClick={() => setActiveTab('keypoints')} className={`flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === 'keypoints' ? 'bg-blue-600 text-white' : 'bg-white border border-blue-200 text-blue-600 hover:bg-blue-50'}`}>
                             <GraduationCap size={14} /> MCQ পরীক্ষা
                           </button>
                           <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-primary transition-all">
                             <Bookmark size={18} />
                           </button>
                        </div>
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between items-center text-[9px] font-black text-[#14532D]">
                            <span>রোগ অধ্যয়ন: বিস্তারিত</span>
                          </div>
                          <div className="w-full h-1 bg-white/60 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} className="h-full bg-primary" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* C. DISEASE AT A GLANCE STATS REMOVED */}

                {/* D. CONTENT TABS BAR */}
                <div className="mt-12 bg-white border-b border-slate-100 sticky top-0 z-20 flex gap-1 overflow-x-auto no-scrollbar py-2">
                  {[
                    { id: 'symptoms', label: '🔍 লক্ষণ' },
                    { id: 'diagnosis', label: '🧪 রোগনির্ণয়' },
                    { id: 'medicine', label: '💊 হোমিও ওষুধ' },
                    { id: 'repertory', label: '📊 রেপার্টরি' },
                    { id: 'complications', label: '⚠ জটিলতা' },
                    { id: 'differential', label: '🏥 পার্থক্য নির্ণয়' },
                    { id: 'keypoints', label: '🏆 মূলপয়েন্ট' },
                    { id: 'summary', label: 'সারাংশ' }
                  ].map((tab) => (
                    <button 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-6 py-3 rounded-xl text-xs font-black transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-[#16A34A] text-white shadow-lg shadow-primary/20' : 'bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* E. SUB-TAB CONTENT AREA */}
                <div className="pt-10">
                  {activeTab === 'medicine' && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                       <section>
                         <div className="flex items-center gap-4 mb-8">
                           <div className="w-1.5 h-8 bg-primary rounded-full" />
                           <h2 className="text-2xl font-bold text-[#14532D]">হোমিওপ্যাথিক ওষুধ নির্বাচন (Medicine Selection)</h2>
                         </div>
                         
                         <div className="overflow-hidden rounded-2xl border border-[#D1FAE5] shadow-sm">
                           <table className="w-full text-left border-collapse">
                             <thead className="bg-[#F0FDF4]">
                               <tr>
                                 <th className="px-6 py-5 text-[11px] font-black text-[#166534] uppercase tracking-[0.2em]">ওষুধের নাম</th>
                                 <th className="px-6 py-5 text-[11px] font-black text-[#166534] uppercase tracking-[0.2em]">মূল লক্ষণ মিল</th>
                                 <th className="px-6 py-5 text-[11px] font-black text-[#166534] uppercase tracking-[0.2em] text-center">পোটেন্সি</th>
                                 <th className="px-6 py-5 text-[11px] font-black text-[#166534] uppercase tracking-[0.2em]">মাত্রা ও নির্দেশ</th>
                               </tr>
                             </thead>
                             <tbody className="bg-white divide-y divide-[#D1FAE5]">
                               {selectedDiagnosis.medicineDetails?.map((med, i) => (
                                 <tr key={i} className="hover:bg-[#F8FFF9] transition-all group">
                                   <td className="px-6 py-5" style={{ borderLeft: med.priority === '1st Choice' ? '4px solid #16A34A' : med.priority === 'Emergency' ? '4px solid #DC2626' : '4px solid #F59E0B' }}>
                                     <div className="flex items-center gap-3">
                                       <span className="text-lg font-black text-[#14532D] tracking-tight">{med.name}</span>
                                       {med.priority === '1st Choice' && (
                                         <span className="bg-emerald-500 text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest shadow-md">⭐ 1st Choice</span>
                                       )}
                                       {med.priority === 'Emergency' && (
                                         <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest shadow-md">🔴 Emergency</span>
                                       )}
                                     </div>
                                     <p className="text-[10px] text-slate-400 font-bold mt-1 italic">"{med.shortDesc}"</p>
                                   </td>
                                   <td className="px-6 py-5">
                                      <p className="text-[13px] font-bold text-[#374151] leading-relaxed max-w-sm">{med.symptoms}</p>
                                   </td>
                                   <td className="px-6 py-5 text-center">
                                      <span className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-mono font-black text-slate-700">{med.potency}</span>
                                   </td>
                                   <td className="px-6 py-5">
                                      <div className="space-y-1">
                                        <p className="text-[11px] font-black text-[#166534]">প্রতি ৩ ঘণ্টায় ৫-৬ গ্লোবিউলস</p>
                                        <div className="flex items-center gap-2">
                                          <div className={`w-2 h-2 rounded-full ${med.priority === 'Emergency' ? 'bg-red-500' : 'bg-emerald-500'}`} />
                                          <p className="text-[10px] text-slate-400 font-bold">clinical observation required</p>
                                        </div>
                                      </div>
                                   </td>
                                 </tr>
                               ))}
                             </tbody>
                           </table>
                           <div className="p-4 bg-[#F8FFF9] text-[10px] font-bold text-slate-500 border-t border-[#D1FAE5]">
                             📌 সারাংশ: {selectedDiagnosis.summary || 'রোগীর নিজস্ব লক্ষণের ওপর ভিত্তি করে ঔষধ নির্বাচন আবশ্যক।'}
                           </div>
                         </div>
                       </section>

                       {selectedDiagnosis.emergencySigns && selectedDiagnosis.emergencySigns.length > 0 && (
                       <section className="bg-gradient-to-br from-[#FFF5F5] to-[#FFF0F0] border border-[#FCA5A5] border-l-[6px] border-l-[#DC2626] rounded-3xl p-8 relative overflow-hidden group mt-6">
                          <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-3xl -mr-24 -mt-24" />
                          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
                             <div className="space-y-4 max-w-2xl w-full">
                               <div className="flex items-center gap-3">
                                  <div className="px-3 py-1 bg-red-600 text-white rounded-full text-[10px] font-black animate-pulse">🔴 জরুরি সতর্কতা</div>
                                  <h3 className="text-xl font-black text-[#991B1B]">বিপদ চিহ্ন (Emergency Signs)</h3>
                               </div>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                  <div className="space-y-3">
                                    <h4 className="text-[12px] font-black text-[#991B1B] uppercase tracking-widest flex items-center gap-2">⚠️ বিপদ লক্ষণ</h4>
                                    <ul className="space-y-2 text-[13px] font-bold text-[#7F1D1D] opacity-80">
                                      {selectedDiagnosis.emergencySigns?.map((sign, i) => (
                                        <li key={i} className="flex items-center gap-2">• {sign}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="space-y-3">
                                    <h4 className="text-[12px] font-black text-[#166534] uppercase tracking-widest flex items-center gap-2">✅ করণীয়</h4>
                                    <ul className="space-y-2 text-[12px] font-bold text-[#14532D]">
                                      <li>১. জরুরী ভিত্তিতে হাসপাতালে স্থানান্তর করার প্রস্তুতি রাখুন।</li>
                                      <li>২. অবস্থার অবনতি হলে নিকটস্থ চিকিৎসকের পরামর্শ নিন।</li>
                                    </ul>
                                  </div>
                               </div>
                             </div>
                          </div>
                          <div className="mt-8 pt-6 border-t border-red-100 flex items-center justify-center">
                            <p className="text-[11px] font-black text-red-600 italic">🔴 গুরুত্বপূর্ণ: জরুরি অবস্থায় এলোপ্যাথিক বা আধুনিক চিকিৎসা গ্রহণ করা আবশ্যক হতে পারে।</p>
                          </div>
                       </section>
                     )}
                    </div>
                  )}

                  {activeTab === 'symptoms' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                       <section>
                         <div className="flex items-center gap-4 mb-8">
                           <div className="w-1.5 h-8 bg-primary rounded-full" />
                           <h2 className="text-2xl font-bold text-[#14532D]">লক্ষণাবলী (Clinical Symptoms)</h2>
                         </div>

                         <div className="overflow-hidden rounded-2xl border border-[#D1FAE5] shadow-sm">
                           <div className="bg-[#F0FDF4] px-6 py-4 border-b border-[#D1FAE5] flex justify-between items-center text-[10px] font-black text-[#166534] uppercase tracking-widest">
                             <span>প্রধান লক্ষণসমূহ</span>
                             <span className="bg-white px-2 py-1 rounded text-primary border border-primary/20">Clinical Profile</span>
                           </div>

                           <div className="bg-white divide-y divide-[#D1FAE5]">
                             {selectedDiagnosis.banglaSymptoms?.map((sym, i) => (
                               <div key={i} className="flex flex-col md:flex-row hover:bg-[#F8FFF9] transition-all border-l-[5px] border-l-primary">
                                 <div className="w-full md:w-1/4 p-6 bg-slate-50/50 flex items-center">
                                   <p className="text-[13px] font-black text-slate-800 tracking-tight">লক্ষণ {i + 1}</p>
                                 </div>
                                 <div className="flex-1 p-6 flex items-center">
                                   <p className="text-sm font-bold text-slate-600 leading-relaxed">{sym}</p>
                                 </div>
                                 <div className="w-1/3 md:w-1/6 p-6 flex flex-col items-center justify-center border-l border-slate-50">
                                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest mb-1">{selectedDiagnosis.severity === 'severe' ? 'তীব্র' : 'সাধারণ'}</span>
                                 </div>
                               </div>
                             ))}
                           </div>
                         </div>
                       </section>
                    </div>
                  )}

                  {activeTab === 'diagnosis' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      {selectedDiagnosis.investigations?.map((inv, i) => (
                        <div key={i} className="p-8 rounded-[2rem] bg-white border border-[#D1FAE5] shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group flex flex-col items-center text-center">
                          <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${i === 0 ? 'bg-emerald-100 text-emerald-600 shadow-emerald-100' : 'bg-blue-100 text-blue-600 shadow-blue-100'}`}>
                            <span className="material-symbols-outlined text-3xl">{i === 0 ? 'biotech' : 'science'}</span>
                          </div>
                          <h4 className="text-lg font-black text-slate-900 mb-2 truncate px-2">{inv.label}</h4>
                          <p className="text-sm font-black text-primary mb-4">{inv.note}</p>
                          <div className="w-full h-px bg-slate-50 mb-4" />
                          <p className="text-[11px] text-slate-500 font-bold leading-relaxed px-2">
                             Interpret carefully with clinical history and patient symptoms. Check {selectedDiagnosis.name} protocols.
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'repertory' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                       <section>
                         <div className="flex items-center gap-4 mb-8">
                           <div className="w-1.5 h-8 bg-[#7C3AED] rounded-full" />
                           <h2 className="text-2xl font-bold text-[#4C1D95]">রেপার্টরি রুব্রিক (Repertory Rubrics)</h2>
                         </div>

                         <div className="overflow-hidden rounded-2xl border border-[#C4B5FD] shadow-sm bg-white">
                           <table className="w-full text-left">
                             <thead className="bg-[#F5F3FF]">
                               <tr>
                                 <th className="px-6 py-4 text-[11px] font-black text-[#7C3AED] uppercase tracking-[0.2em]">রুব্রিক (Rubric)</th>
                                 <th className="px-6 py-4 text-[11px] font-black text-[#7C3AED] uppercase tracking-[0.2em]">বিভাগ (Chapter)</th>
                                 <th className="px-6 py-4 text-[11px] font-black text-[#7C3AED] uppercase tracking-[0.2em]">শীর্ষ ওষুধ (Main Remedies)</th>
                               </tr>
                             </thead>
                             <tbody className="divide-y divide-[#EDE9FE]">
                               {selectedDiagnosis.repertoryRubrics.map((rubricStr, i) => {
                                 const { name, remedies } = parseRubricAndRemedies(rubricStr, selectedDiagnosis.mainRemedies);
                                 return (
                                   <tr key={i} className="hover:bg-[#F5F3FF] transition-all group">
                                     <td className="px-6 py-4 text-[13px] font-bold text-slate-800">{name}</td>
                                     <td className="px-6 py-4 text-[11px] font-black text-slate-400 italic">Kent's / Robin Murphy</td>
                                     <td className="px-6 py-4">
                                       <div className="flex flex-wrap gap-2">
                                         {remedies.map((rem, remIdx) => {
                                           const isPrimary = remIdx === 0;
                                           return (
                                             <span 
                                               key={remIdx} 
                                               className={`px-2 py-0.5 rounded text-[10px] font-black ${
                                                 isPrimary 
                                                   ? 'bg-[#C4B5FD] text-[#5B21B6]' 
                                                   : 'bg-slate-100 text-slate-600'
                                               }`}
                                             >
                                               {rem}
                                             </span>
                                           );
                                         })}
                                       </div>
                                     </td>
                                   </tr>
                                 );
                                })}
                             </tbody>
                           </table>
                         </div>
                       </section>
                    </div>
                  )}

                  
                  {activeTab === 'summary' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <section className="bg-white border border-slate-100 rounded-3xl p-10">
                        <div className="flex items-center gap-4 mb-6">
                           <span className="text-3xl">📄</span>
                           <h2 className="text-2xl font-black text-slate-800 tracking-tight">রোগের সারাংশ (Summary)</h2>
                        </div>
                        <p className="text-lg text-slate-600 font-medium leading-relaxed">
                          {selectedDiagnosis.summary || 'কোন সারাংশ পাওয়া যায়নি। লক্ষণ অনুযায়ী ঔষধ নির্বাচন করুন।'}
                        </p>
                      </section>
                    </div>
                  )}

                  {activeTab === 'complications' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <section className="bg-white border border-red-100 border-l-[6px] border-l-red-500 rounded-3xl p-10 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                           <span className="text-3xl">⚠</span>
                           <h2 className="text-2xl font-black text-slate-800 tracking-tight">জটিলতা (Complications)</h2>
                        </div>
                        {selectedDiagnosis.emergencySigns && selectedDiagnosis.emergencySigns.length > 0 ? (
                          <ul className="space-y-4">
                            {selectedDiagnosis.emergencySigns.map((comp, idx) => (
                              <li key={idx} className="flex items-center gap-3 text-red-700 font-bold bg-red-50 p-4 rounded-xl">
                                <span className="material-symbols-outlined text-red-500">error</span>
                                {comp}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-slate-500">উল্লেখযোগ্য জটিলতা পাওয়া যায়নি। লক্ষণ প্রকাশ পেলে চিকিৎসকের পরামর্শ নিন।</p>
                        )}
                      </section>
                    </div>
                  )}

                  {activeTab === 'differential' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <section className="bg-white border border-blue-100 rounded-3xl p-10 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                           <span className="text-3xl">🏥</span>
                           <h2 className="text-2xl font-black text-slate-800 tracking-tight">পার্থক্য নির্ণয় (Differential Diagnosis)</h2>
                        </div>
                        {selectedDiagnosis.differentialDiagnosis && selectedDiagnosis.differentialDiagnosis.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {selectedDiagnosis.differentialDiagnosis.map((diff, idx) => (
                               <div key={idx} className="bg-blue-50 p-6 rounded-2xl">
                                 <h4 className="text-lg font-black text-blue-900 mb-2">{diff.feature}</h4>
                                 <ul className="space-y-2 text-sm text-slate-600 font-medium">
                                   {Object.entries(diff).filter(([key]) => key !== 'feature').map(([k, v]) => (
                                     <li key={k}><strong>{k}:</strong> {v}</li>
                                   ))}
                                 </ul>
                               </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-slate-500 font-medium text-lg text-center p-8 bg-slate-50 rounded-2xl border border-slate-100">
                            এই রোগের জন্য সুনির্দিষ্ট পার্থক্য নির্ণয় যুক্ত করা হয়নি। অন্যান্য রোগের সাথে লক্ষণ মিলিয়ে দেখুন।
                          </p>
                        )}
                      </section>
                    </div>
                  )}
                  {activeTab === 'keypoints' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <section className="bg-gradient-to-br from-[#FFFBEB] to-[#FFFFF8] border border-[#FCD34D] border-l-[6px] border-l-[#D97706] rounded-3xl p-10">
                        <div className="flex items-center gap-4 mb-10">
                          <span className="text-3xl">🏆</span>
                          <h2 className="text-2xl font-black text-[#92400E]">মূল পয়েন্ট — পরীক্ষায় যা আসে (Key Examination Points)</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {[
                            { icon: '📌', text: `১. ${selectedDiagnosis.name}: ${selectedDiagnosis.summary}` },
                            { icon: '⚠️', text: `২. প্রধান ওষুধ: ${selectedDiagnosis.medicineDetails?.[0]?.name}` },
                            { icon: '🔴', text: `৩. জরুরি সংকেত: ${selectedDiagnosis.emergencySigns?.join(', ')}` },
                            { icon: '📌', text: `৪. রুব্রিক: ${selectedDiagnosis.repertoryRubrics[0]}` }
                          ].map((pt, i) => (
                            <motion.div 
                              key={i} 
                              initial={{ opacity: 0, x: -10 }} 
                              whileInView={{ opacity: 1, x: 0 }} 
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start gap-4 p-4 bg-white/60 rounded-2xl border border-[#FEF3C7] hover:border-amber-400 transition-all cursor-default"
                            >
                              <span className="text-xl shrink-0">{pt.icon}</span>
                              <p className="text-[13px] font-bold text-[#92400E] leading-relaxed">{pt.text}</p>
                            </motion.div>
                          ))}
                        </div>
                      </section>

                      {/* 4. MCQ SECTION */}
                      <section className="bg-white border-2 border-slate-100 rounded-3xl p-10 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-3 bg-primary group-hover:w-full transition-all duration-700" />
                        <div className="flex items-center justify-between mb-10">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                              <span className="material-symbols-outlined text-primary text-3xl">help_center</span>
                              MCQ অনুশীলন — {selectedDiagnosis.banglaName}
                            </h2>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest pl-10">BHMS পরীক্ষার ধরণ • ৩টি প্রশ্ন</p>
                          </div>
                          <div className="px-5 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-3">
                             <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center font-black text-primary text-xl">১</div>
                             <div className="h-8 w-px bg-slate-200" />
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">মোট প্রশ্ন</span>
                          </div>
                        </div>

                        <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100">
                           <div className="flex items-center gap-3 mb-6">
                             <span className="px-3 py-1 bg-white border border-primary/20 text-primary rounded-lg text-[9px] font-black uppercase shadow-sm">প্রশ্ন ১/১</span>
                             <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-[9px] font-black uppercase shadow-sm">★★★ কঠিন</span>
                           </div>
                           
                           <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-8 leading-relaxed">
                              "{selectedDiagnosis.banglaName} এর জন্য সর্বোত্তম হোমিওপ্যাথিক ওষুধ কোনটি?"
                           </h3>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {[
                               { id: 'A', label: selectedDiagnosis.medicineDetails?.[1]?.name || 'Bryonia Alba' },
                               { id: 'B', label: selectedDiagnosis.medicineDetails?.[2]?.name || 'Gelsemium' },
                               { id: 'C', label: selectedDiagnosis.medicineDetails?.[0]?.name || 'Arsenicum', isCorrect: true },
                               { id: 'D', label: selectedDiagnosis.medicineDetails?.[3]?.name || 'Rhus Tox' }
                             ].map((opt) => (
                               <button 
                                 key={opt.id}
                                 onClick={() => { setSelectedMcqOption(opt.id); setMcqAnswered(true); }}
                                 className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 group ${
                                   selectedMcqOption === opt.id 
                                     ? (opt.isCorrect ? 'bg-[#DCFCE7] border-[#16A34A] text-[#166534]' : 'bg-red-50 border-red-500 text-red-700')
                                     : 'bg-white border-transparent hover:border-primary/20 text-slate-700'
                                 }`}
                               >
                                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black text-sm transition-colors ${selectedMcqOption === opt.id ? (opt.isCorrect ? 'bg-[#16A34A] text-white' : 'bg-red-500 text-white') : 'bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>{opt.id}</div>
                                 <span className="text-sm font-bold tracking-tight">{opt.label}</span>
                               </button>
                             ))}
                           </div>

                           {mcqAnswered && (
                             <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-8 p-6 bg-[#DCFCE7]/40 border border-[#16A34A]/20 rounded-2xl">
                               <div className="flex items-center gap-3 mb-3">
                                 <span className="material-symbols-outlined text-[#166534]">check_circle</span>
                                 <p className="text-[13px] font-black text-[#166534] uppercase tracking-widest">ব্যাখ্যা (Explanation)</p>
                               </div>
                               <p className="text-sm font-bold text-[#166534] leading-relaxed">
                                  সঠিক উত্তর: {selectedDiagnosis.medicineDetails?.[0]?.name}. এটি {selectedDiagnosis.banglaName} রোগের তীব্র লক্ষণ প্রশমনে সহায়তা করে।
                               </p>
                             </motion.div>
                           )}
                        </div>
                      </section>
                    </div>
                  )}

                  {activeTab === 'summary' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <section className="bg-white border border-[#D1FAE5] rounded-3xl p-10 shadow-xl shadow-primary/5">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Leaf className="text-primary" size={20} />
                          </div>
                          <div>
                            <h2 className="text-xl font-black text-[#14532D]">বাংলা সারাংশ (Bengali Summary)</h2>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">সম্পূর্ণ রোগ পর্যালোচনা</p>
                          </div>
                        </div>

                        <div className="space-y-10">
                          <div className="space-y-3">
                            <h4 className="text-[12px] font-black text-[#16A34A] uppercase tracking-widest flex items-center gap-2">🌿 সংজ্ঞা</h4>
                            <p className="text-[15px] font-bold text-slate-700 leading-[1.8] pl-2">{selectedDiagnosis.summary}</p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-3">
                              <h4 className="text-[12px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-2">🔍 মূল লক্ষণ</h4>
                              <ul className="space-y-3 pl-2">
                                {selectedDiagnosis.banglaSymptoms.map((sym, i) => (
                                  <li key={i} className="flex items-start gap-2 text-[14px] font-bold text-slate-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" /> {sym}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="space-y-3">
                              <h4 className="text-[12px] font-black text-primary uppercase tracking-widest flex items-center gap-2">💊 সেরা ওষুধ</h4>
                              <p className="text-[14px] font-bold text-slate-600 leading-relaxed pl-2">
                                {selectedDiagnosis.medicineDetails?.[0]?.name} — এটি এই রোগের প্রধান ও প্রথম পছন্দের ওষুধ। তীব্র অবস্থায় এটি ৩ ঘণ্টা অন্তর ব্যবহার করা হয়।
                              </p>
                              <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/10 text-[11px] font-bold text-primary">
                                💡 পরীক্ষায় আসে: এই রোগ নিরাময়ে {selectedDiagnosis.medicineDetails?.[0]?.name}-এর ভূমিকা কী?
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  )}
                </div>

                {/* BOTTOM NAVIGATION (Disease Prev/Next) */}
                <div className="mt-16 flex items-center justify-between px-10 py-6 bg-slate-50 border border-slate-100 rounded-3xl">
                   <button className="flex items-center gap-4 text-slate-400 hover:text-primary transition-all group">
                     <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center group-hover:border-primary/40 group-hover:shadow-lg transition-all"><ArrowRight size={18} className="rotate-180" /></div>
                     <div className="text-left">
                       <p className="text-[9px] font-bold uppercase tracking-widest opacity-60">পূর্ববর্তী রোগ</p>
                       <p className="text-xs font-black">ম্যালেরিয়া</p>
                     </div>
                   </button>
                   <div className="flex flex-col items-center">
                     <p className="text-[10px] font-black text-[#16A34A] uppercase tracking-[0.2em] mb-1">{selectedDiagnosis.section.split(':')[0]}</p>
                     <p className="text-xs font-black text-slate-900">রোগ ৪/১২</p>
                   </div>
                   <button className="flex items-center gap-4 text-right text-slate-400 hover:text-primary transition-all group">
                     <div className="text-right">
                       <p className="text-[9px] font-bold uppercase tracking-widest opacity-60">পরবর্তী রোগ</p>
                       <p className="text-xs font-black">ইনফ্লুয়েঞ্জা</p>
                     </div>
                     <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center group-hover:border-primary/40 group-hover:shadow-lg transition-all"><ArrowRight size={18} /></div>
                   </button>
                </div>
              </motion.div>
            ) : (
                <div className="flex-1 flex items-center justify-center p-20 text-center">
                  <div className="max-w-md space-y-6">
                    <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200 mx-auto shadow-sm">
                      <Search size={48} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-400 uppercase tracking-tight">Select a Diagnosis</h2>
                    <p className="text-slate-300 text-sm font-bold leading-relaxed">Choose a disease from the left sidebar to begin your clinical review and homeopathic analysis.</p>
                  </div>
                </div>
            )}
          </AnimatePresence>
        </main>

        {/* 4. RIGHT SIDEBAR (Progress & Tools) (Selector 1) */}
        <AnimatePresence initial={false}>
          {isRightSidebarOpen && (
            <motion.aside 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="bg-[#FAFFFE] border-l border-[#D1FAE5] flex flex-col shrink-0 overflow-hidden absolute xl:relative top-0 right-0 bottom-0 h-full shadow-2xl xl:shadow-[-4px_0_24px_rgba(0,0,0,0.02)] z-30"
            >
              <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                <div className="mb-12 text-center">
                  <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8">Analytics & Progress</h3>
                  <div className="relative w-32 h-32 mx-auto flex items-center justify-center mb-8">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle className="text-[#EAF7EE]" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8" />
                      <circle className="text-[#166534] transition-all duration-1000" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364" strokeDashoffset="284" strokeWidth="8" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-[#166534]">২২%</span>
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1">COMPLETED</span>
                    </div>
                  </div>
            <div className="grid grid-cols-2 gap-2 text-left">
              <div className="p-3 bg-white border border-[#D1FAE5] rounded-xl">
                 <p className="text-[8px] font-black text-slate-400 uppercase mb-1">পর্যালোচিত</p>
                 <p className="text-sm font-black text-slate-800">১৯টি</p>
              </div>
              <div className="p-3 bg-white border border-[#D1FAE5] rounded-xl">
                 <p className="text-[8px] font-black text-slate-400 uppercase mb-1">চলছে</p>
                 <p className="text-sm font-black text-slate-800">৩টি</p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">📋 বিষয়সূচি</h3>
            <div className="space-y-2">
              {[
                { label: 'সংজ্ঞা ও কারণ', done: true },
                { label: 'লক্ষণ বিভাগ', current: true },
                { label: 'রোগনির্ণয়', disabled: true },
                { label: 'হোমিও ওষুধ', done: true },
                { label: 'রেপার্টরি', disabled: true }
              ].map((item, i) => (
                <div key={i} className={`p-3 rounded-xl border flex items-center justify-between transition-all ${item.current ? 'bg-primary/5 border-primary/20 text-primary scale-105' : item.done ? 'bg-white border-[#D1FAE5] text-slate-400' : 'bg-slate-50 border-slate-100 text-slate-300'}`}>
                   <span className="text-[11px] font-bold">{item.label}</span>
                   {item.done && <span className="material-symbols-outlined text-[14px]">check_circle</span>}
                   {item.current && <ArrowRight size={14} />}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">💊 দ্রুত ওষুধ তালিকা</h3>
            <div className="space-y-2">
               {selectedDiagnosis.medicineDetails?.slice(0, 3).map((med, i) => (
                 <div key={i} className="p-3 bg-white border border-[#D1FAE5] rounded-xl hover:border-primary/40 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-black text-[#14532D] tracking-tight">{med.name}</span>
                      <span className="text-[8px] bg-[#DCFCE7] text-[#166534] px-1.5 py-0.5 rounded font-black">{med.potency}</span>
                    </div>
                    <p className="text-[9px] text-slate-400 italic line-clamp-1 group-hover:text-primary transition-colors">{med.shortDesc}</p>
                 </div>
               ))}
               <button className="w-full text-center py-2 text-[9px] font-black text-[#16A34A] uppercase tracking-widest hover:underline">সব ওষুধ দেখুন →</button>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">🧠 মনে রাখুন</h3>
            <div className="p-5 bg-violet-600 rounded-3xl text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-1000" />
               <p className="text-[13px] font-bold leading-relaxed relative z-10">"ডেঙ্গু = Eupat-p (E for Eupat, E for Extreme bone pain)"</p>
               <button className="mt-4 px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all relative z-10 flex items-center gap-2">
                 <span className="material-symbols-outlined text-xs">style</span> ফ্ল্যাশকার্ড
               </button>
            </div>
          </div>

          <div className="mt-auto">
             <div className="bg-slate-900 p-6 rounded-[2rem] text-white overflow-hidden relative group">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
               <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-2">⏱ স্টাডি টাইমার</p>
               <p className="text-3xl font-mono font-black tracking-tighter mb-4 text-primary">০০:১৮:৩৪</p>
               <div className="flex gap-2">
                 <button className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all"><span className="material-symbols-outlined text-sm">pause</span></button>
                 <button className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all"><span className="material-symbols-outlined text-sm">refresh</span></button>
               </div>
               <p className="text-[8px] text-white/30 font-bold mt-4">লক্ষ্য: ৪৫ মিনিট</p>
             </div>
          </div>
           </div>
        </motion.aside>
      )}
    </AnimatePresence>
  </div>

      {/* FLOATING AI BUTTON */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#16A34A] text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all z-[100] group">
         <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">auto_awesome</span>
         <div className="absolute right-full mr-4 px-4 py-2 bg-slate-900 text-white text-[10px] font-black rounded-xl opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 pointer-events-none whitespace-nowrap">AI দিয়ে রোগ বিশ্লেষণ করুন ✨</div>
      </button>
    </div>
  );
};

export const KnowledgeTab = ({ setActiveTab }: { setActiveTab?: (tab: string) => void }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<KnowledgeTopic | null>(null);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Research' | 'Case Study' | 'Protocol'>('All');
  
  const [showAllBooks, setShowAllBooks] = useState(false);
  
  const filteredArticles = RECENT_ARTICLES.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || article.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredTopics = KNOWLEDGE_DATA.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.banglaTitle.includes(searchQuery)
  );

  const filteredBooks = CLASSIC_BOOKS.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, showAllBooks ? undefined : 3);

  return (
    <div className="px-4 py-8 lg:px-10 lg:py-12 space-y-16 overflow-y-auto h-[calc(100vh-180px)] custom-scrollbar">
      {/* Search & Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20 rotate-3">
            <GraduationCap size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{t('library.knowledgeHub')}</h2>
            <p className="text-xs text-primary font-black uppercase tracking-widest mt-1">{t('library.educationalResources')}</p>
          </div>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder={t('library.searchResources')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Quick Stats / Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Classic Books', value: CLASSIC_BOOKS.length, icon: <Book size={16} />, color: 'bg-blue-50 text-blue-600' },
          { label: 'Research Papers', value: RECENT_ARTICLES.filter(a => a.type === 'Research').length, icon: <FileText size={16} />, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Anatomy Systems', value: PHYSIOLOGY_ANATOMY_DATA.length, icon: <Activity size={16} />, color: 'bg-rose-50 text-rose-600' },
          { label: 'Clinical Topics', value: KNOWLEDGE_DATA.length, icon: <Brain size={16} />, color: 'bg-indigo-50 text-indigo-600' },
        ].map((stat, i) => (
          <div key={i} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-lg font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Core Knowledge Topics */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
            <Brain size={24} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Core Foundations</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedTopic(topic)}
              className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {topic.icon}
                </div>
                <div>
                  <h3 className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{topic.title}</h3>
                  <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest">{topic.banglaTitle}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                {topic.desc}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Learn More</span>
                <ArrowRight size={14} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hero / Featured Section */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3 block">Curated Selection</span>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Classic Texts</h2>
          </div>
          <button 
            onClick={() => setShowAllBooks(!showAllBooks)}
            className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2 group hover:opacity-80 transition-all"
          >
            {showAllBooks ? 'Show Featured' : 'Browse Full Collection'} 
            <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform ${showAllBooks ? 'rotate-90' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => {
                if (book.pdfUrl) {
                  window.open(book.pdfUrl, '_blank');
                  return;
                }
                if (setActiveTab) {
                  if (book.title.includes('Organon')) setActiveTab('organon');
                  else if (book.title.includes('Lectures on Materia Medica')) setActiveTab('materia');
                  else if (book.title.includes('Pocket Manual')) setActiveTab('materia');
                }
              }}
              className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden bg-slate-50 relative">
                <img 
                  src={book.image} 
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-black text-primary uppercase tracking-widest rounded-full shadow-sm">
                    {book.category}
                  </span>
                </div>
              </div>
              <div className="p-8 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{book.author}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-primary transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed">
                  {book.description}
                </p>
                <div className="pt-4 flex items-center justify-between">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (book.pdfUrl) {
                        window.open(book.pdfUrl, '_blank');
                        return;
                      }
                      if (setActiveTab) {
                        if (book.title.includes('Organon')) setActiveTab('organon');
                        else if (book.title.includes('Lectures on Materia Medica')) setActiveTab('materia');
                        else if (book.title.includes('Pocket Manual')) setActiveTab('materia');
                      }
                    }}
                    className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2 group/btn"
                  >
                    Read Online <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <Bookmark size={16} className="text-slate-300 hover:text-primary cursor-pointer transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Bento Grid */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Database size={24} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Resource Categories</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[160px]">
          {KNOWLEDGE_CATEGORIES.map((cat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={`${cat.span || ''} ${cat.color} rounded-[2.5rem] p-8 flex flex-col justify-between group cursor-pointer relative overflow-hidden border border-black/5 hover:shadow-xl transition-all`}
            >
              <span className="material-symbols-outlined text-6xl text-black/5 absolute -right-4 -bottom-4 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                {cat.icon}
              </span>
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{cat.title}</h3>
                <p className="text-sm text-slate-600 font-medium mt-2 max-w-[240px] opacity-80 leading-relaxed">
                  {cat.description}
                </p>
              </div>
              <div className="flex items-center justify-between relative z-10">
                {cat.count && (
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-white/50 px-3 py-1 rounded-full">
                    {cat.count}
                  </span>
                )}
                <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-slate-900 group-hover:bg-primary group-hover:text-white transition-all">
                  <ArrowRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recently Added Articles */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <FileText size={24} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Recent Publications</h2>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {['All', 'Research', 'Case Study', 'Protocol'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveFilter(tab as any)}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeFilter === tab ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row md:items-center justify-between group hover:bg-slate-50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="flex gap-6 items-center">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    article.type === 'Research' ? 'bg-blue-50 text-blue-600' : 
                    article.type === 'Case Study' ? 'bg-emerald-50 text-emerald-600' : 
                    'bg-amber-50 text-amber-600'
                  }`}>
                    <FileText size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 group-hover:text-primary transition-colors leading-tight mb-2">
                      {article.title}
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-widest">
                        <User size={12} /> {article.author}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-widest">
                        <Calendar size={12} /> {article.date}
                      </span>
                      {article.isPeerReviewed && (
                        <span className="text-[10px] font-black text-emerald-600 px-2.5 py-0.5 bg-emerald-50 rounded-full uppercase tracking-widest border border-emerald-100">
                          Peer Reviewed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                  <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                    <Upload size={20} className="rotate-180" />
                  </button>
                  <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                    <Eye size={20} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
              <p className="text-slate-400 font-bold">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Topic Detail Modal */}
      <AnimatePresence>
        {selectedTopic && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTopic(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden z-10"
            >
              <div className="p-8 bg-indigo-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl -mr-24 -mt-24 opacity-40" />
                <button 
                  onClick={() => setSelectedTopic(null)}
                  className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition shadow-sm"
                >
                  <X size={20} />
                </button>
                
                <div className="flex items-center gap-6 relative z-10">
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-5xl shadow-xl shadow-indigo-500/10 text-indigo-600">
                    {selectedTopic.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{selectedTopic.title}</h3>
                    <p className="text-sm text-indigo-600 font-black uppercase tracking-widest">{selectedTopic.banglaTitle}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Topic Description</h4>
                  <p className="text-lg text-slate-700 font-medium leading-relaxed">
                    {selectedTopic.desc}
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Bengali Explanation</h4>
                  <p className="text-lg text-indigo-600 font-bold leading-relaxed">
                    {selectedTopic.banglaDesc}
                  </p>
                </div>

                {selectedTopic.details && (
                  <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {selectedTopic.details.map((section, sIdx) => (
                      <div key={sIdx} className="space-y-3">
                        <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">{section.title}</h4>
                        <ul className="grid grid-cols-1 gap-2">
                          {section.items.map((item, iIdx) => (
                            <li key={iIdx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-700">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Related Resources</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-indigo-500 transition-all group">
                      <Book size={16} className="text-indigo-600" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-indigo-600">Classic Texts</span>
                    </button>
                    <button className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-indigo-500 transition-all group">
                      <FileText size={16} className="text-indigo-600" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-indigo-600">Case Studies</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setSelectedTopic(null)}
                  className="px-8 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition shadow-lg shadow-slate-200"
                >
                  CLOSE TOPIC
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const PathologyTab = () => {
  const { t } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<'clinical' | 'diagnostic'>('clinical');
  const [selectedSystem, setSelectedSystem] = useState<string>('respiratory');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConditions = PATHOLOGY_CONDITIONS.filter(c => 
    c.system === selectedSystem && 
    (c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     c.banglaName.includes(searchQuery))
  );

  const [selectedConditionId, setSelectedConditionId] = useState<string>(filteredConditions[0]?.id || '');

  // Update selected condition when system changes if current selection is not in the new system
  useEffect(() => {
    if (filteredConditions.length > 0 && !filteredConditions.find(c => c.id === selectedConditionId)) {
      setSelectedConditionId(filteredConditions[0].id);
    }
  }, [selectedSystem, filteredConditions, selectedConditionId]);

  const selectedCondition = PATHOLOGY_CONDITIONS.find(c => c.id === selectedConditionId) || filteredConditions[0] || PATHOLOGY_CONDITIONS[0];

  const getSystemCount = (systemId: string) => {
    return PATHOLOGY_CONDITIONS.filter(c => c.system === systemId).length;
  };

  const filteredTests = PATHOLOGY_DATA.filter(test => 
    test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.banglaName.includes(searchQuery) ||
    test.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.banglaCategory.includes(searchQuery)
  );

  const groupedTests = useMemo(() => {
    const groups: Record<string, { tests: typeof PATHOLOGY_DATA, banglaCategory: string }> = {};
    filteredTests.forEach(test => {
      if (!groups[test.category]) {
        groups[test.category] = { tests: [], banglaCategory: test.banglaCategory };
      }
      groups[test.category].tests.push(test);
    });
    return groups;
  }, [filteredTests]);

  return (
    <div className="space-y-6">
      {/* Sub-Tab Toggle */}
      <div className="flex justify-center px-4">
        <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1 shadow-inner w-full max-w-md overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSubTab('clinical')}
            className={`flex-1 px-4 sm:px-8 py-2.5 rounded-xl text-[10px] sm:text-xs font-black transition-all whitespace-nowrap ${
              activeSubTab === 'clinical' 
                ? 'bg-white text-emerald-600 shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {t('library.clinicalBrowser')}
          </button>
          <button
            onClick={() => setActiveSubTab('diagnostic')}
            className={`flex-1 px-4 sm:px-8 py-2.5 rounded-xl text-[10px] sm:text-xs font-black transition-all whitespace-nowrap ${
              activeSubTab === 'diagnostic' 
                ? 'bg-white text-rose-600 shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {t('library.diagnosticTests')}
          </button>
        </div>
      </div>

      {activeSubTab === 'clinical' ? (
        <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-240px)] gap-6 overflow-hidden">
          {/* Sidebar: Systems & Conditions */}
          <aside className="w-full lg:w-80 flex flex-col gap-6 lg:overflow-y-auto lg:pr-2 custom-scrollbar">
            {/* Systems Selection */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">{t('library.systems')}</h3>
              <div className="flex lg:grid lg:grid-cols-1 gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 no-scrollbar">
                {PATHOLOGY_SYSTEMS.map((system) => {
                  const count = getSystemCount(system.id);
                  return (
                    <button
                      key={system.id}
                      onClick={() => setSelectedSystem(system.id)}
                      className={`flex items-center justify-between p-4 rounded-2xl transition-all group shrink-0 lg:shrink ${
                        selectedSystem === system.id 
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                          : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined ${selectedSystem === system.id ? 'text-white' : 'text-emerald-600'}`}>
                          {system.icon}
                        </span>
                        <span className="text-sm font-black tracking-tight whitespace-nowrap">{system.name}</span>
                      </div>
                      <span className={`hidden lg:block text-[10px] font-black px-2 py-0.5 rounded-full ${
                        selectedSystem === system.id ? 'bg-white/20' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Conditions List */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('library.conditions')}</h3>
                <div className="relative">
                  <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-6 pr-2 py-1 bg-slate-100 border-none rounded-lg text-[10px] font-bold focus:ring-1 focus:ring-emerald-500/20 outline-none w-32"
                  />
                </div>
              </div>
              <div className="space-y-1">
                {filteredConditions.map((condition) => (
                  <button
                    key={condition.id}
                    onClick={() => setSelectedConditionId(condition.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left ${
                      selectedConditionId === condition.id 
                        ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600' 
                        : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{condition.name}</span>
                      <span className="text-[10px] opacity-60 font-medium">{condition.banglaName}</span>
                    </div>
                    <ChevronRight size={14} className={selectedConditionId === condition.id ? 'opacity-100' : 'opacity-0'} />
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Detail View */}
          <main className="flex-1 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-y-auto custom-scrollbar p-8 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCondition.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                        Clinical Review
                      </span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        ICD-10: {selectedCondition.icd10}
                      </span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
                      {selectedCondition.name}
                    </h1>
                    <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl">
                      {selectedCondition.description}
                    </p>
                    
                    {/* Bengali Translation Card */}
                    <div className="mt-8 p-6 bg-slate-50 rounded-3xl border border-slate-100 flex gap-4 items-start">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                        <Type size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Bengali Translation</p>
                        <p className="text-sm font-bold text-slate-700 leading-relaxed">
                          {selectedCondition.banglaDescription}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-4 shrink-0">
                    <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition shadow-xl shadow-slate-200">
                      <Plus size={16} /> ADD TO CASE
                    </button>
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black border-4 border-white shadow-sm" title="Systemic">S</div>
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black border-4 border-white shadow-sm" title="Acute">A</div>
                    </div>
                  </div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                  {/* Diagnostic Indicators */}
                  <div className="lg:col-span-7 bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                    <h3 className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                      <ClipboardList size={16} /> Diagnostic Indicators
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedCondition.diagnosticIndicators.map((indicator, idx) => (
                        <div key={idx} className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm group hover:border-emerald-200 transition-colors">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">{indicator.label}</span>
                          <p className="text-xs font-bold text-slate-700 leading-relaxed">{indicator.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual Context */}
                  <div className="lg:col-span-5 rounded-[2rem] overflow-hidden relative min-h-[300px] shadow-xl">
                    <img 
                      src={selectedCondition.visualContext.image} 
                      alt={selectedCondition.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-8">
                      <p className="text-white text-xs font-bold leading-relaxed opacity-90">
                        {selectedCondition.visualContext.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Homeopathic Correlation */}
                <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-slate-100 shadow-sm">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                        <Leaf size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Homeopathic Correlation</h3>
                        <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Suggested Remedies & Potencies</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">
                        Filtered: {selectedSystem} Focus
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {selectedCondition.homeopathicRemedies.map((remedy, idx) => (
                      <div key={idx} className="group cursor-pointer">
                        <div className="p-6 rounded-3xl bg-slate-50 group-hover:bg-emerald-50 transition-all duration-500 border-l-4 border-emerald-600 mb-4">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-lg font-black text-emerald-700 group-hover:scale-105 transition-transform origin-left">
                              {remedy.name}
                            </h4>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{remedy.potency}</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4">
                            {remedy.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {remedy.keySymptoms.map((symptom, sIdx) => (
                              <span key={sIdx} className="px-2 py-0.5 bg-white text-[9px] font-bold text-slate-500 rounded-md border border-slate-100">
                                {symptom}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center px-2">
                          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600/60">Miasm: {remedy.miasm}</span>
                          <button className="p-2 text-slate-300 hover:text-emerald-600 transition-colors">
                            <Bookmark size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      ) : (
        <div className="space-y-8 pb-12 h-[calc(100vh-240px)] overflow-y-auto custom-scrollbar pr-2">
          {/* Header Section */}
          <div className="relative overflow-hidden bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-60" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-rose-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-rose-200 rotate-6">
                  <FlaskConical size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{t('library.pathologyMenu')}</h2>
                  <p className="text-xs text-rose-600 font-black uppercase tracking-widest mt-1">{t('library.diagnosticTests')}</p>
                </div>
              </div>

              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search tests / খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-10">
            {Object.entries(groupedTests).map(([category, group], i) => {
              const g = group as { tests: typeof PATHOLOGY_DATA, banglaCategory: string };
              return (
                <motion.div 
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-8 bg-rose-500 rounded-full" />
                      <div>
                        <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">
                          {category}
                        </h4>
                        <p className="text-[10px] text-rose-600 font-black uppercase tracking-widest">{g.banglaCategory}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
                      {g.tests.length} Tests
                    </span>
                  </div>

                  <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50/50">
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest w-1/2">{t('library.testName')}</th>
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('library.normalRange')}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {g.tests.map((test, idx) => (
                            <tr key={idx} className="hover:bg-rose-50/30 transition-colors group">
                              <td className="p-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-rose-600 font-black text-xs group-hover:bg-rose-600 group-hover:text-white transition-all">
                                    {idx + 1}
                                  </div>
                                  <div>
                                    <div className="font-black text-slate-800 text-sm">{test.name}</div>
                                    <div className="text-xs text-slate-400 font-bold">{test.banglaName}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-700 rounded-xl text-xs font-black border border-rose-100">
                                  <Activity size={14} className="opacity-50" />
                                  {test.normal}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {Object.keys(groupedTests).length === 0 && (
              <div className="py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200">
                <FlaskConical size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-400 font-bold">No diagnostic tests found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

