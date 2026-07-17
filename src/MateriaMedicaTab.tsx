import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, TrendingUp, BookOpen, Star, X, Activity, ArrowRightLeft, ArrowLeft, Bell, HelpCircle, RotateCcw, Zap, TrendingDown, Brain, Clock, Utensils, FlaskConical, Plus, User, Leaf, Shield, Link2} from 'lucide-react';
import { MATERIA_MEDICA_DATA, Remedy as MateriaRemedy } from './materiaMedicaData';
import { QuickDetailsModal } from './QuickDetailsModal';
import { useLanguage } from './LanguageContext';

export const MateriaMedicaTab = ({ initialComparison, onQuickPrescribe }: { initialComparison?: string[], onQuickPrescribe?: (remedyName: string) => void }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRemedy, setSelectedRemedy] = useState<MateriaRemedy | null>(MATERIA_MEDICA_DATA[0] || null);
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const [quickDetailsRemedy, setQuickDetailsRemedy] = useState<MateriaRemedy | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [compareMode, setCompareMode] = useState(initialComparison && initialComparison.length > 0 ? true : false);
  const resolveRemedies = (names: string[]) => {
    return names.map(name => {
      const cleanName = name.toLowerCase().replace(/\./g, '').trim();
      const parts = cleanName.split('-');
      
      return MATERIA_MEDICA_DATA.find(r => {
        const rName = r.name.toLowerCase();
        const rAbbr = r.abbreviation?.toLowerCase().replace(/\./g, '').trim() || '';
        const rId = r.id.toLowerCase();
        
        if (rAbbr === cleanName || rId === cleanName || rId.includes(cleanName) || rName.startsWith(cleanName)) {
          return true;
        }
        
        if (parts.length > 1) {
          // match "rhus-t", "calc-c" etc.
          const isMatch = parts.every(part => rName.includes(part) || rId.includes(part));
          if (isMatch) return true;
        }
        
        // Match just by ignoring dashes and spaces
        const noDashClean = cleanName.replace(/-/g, '');
        const noDashId = rId.replace(/-/g, '');
        if (noDashId.startsWith(noDashClean) || rName.replace(/ /g, '').startsWith(noDashClean)) {
            return true;
        }

        return false;
      });
    }).filter(Boolean) as MateriaRemedy[];
  };

  const [comparisonList, setComparisonList] = useState<MateriaRemedy[]>(() => {
    if (initialComparison && initialComparison.length > 0) {
      return resolveRemedies(initialComparison).slice(0, 3);
    }
    return [];
  });

  useEffect(() => {
    if (initialComparison && initialComparison.length > 0) {
      const remediesToCompare = resolveRemedies(initialComparison).slice(0, 3);
      
      if (remediesToCompare.length > 0) {
        setCompareMode(true);
        setComparisonList(remediesToCompare);
        setShowMobileDetails(true);
      }
    }
  }, [initialComparison]);

  const filteredRemedies = MATERIA_MEDICA_DATA.filter(remedy => {
    const matchesSearch = remedy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      remedy.banglaName.includes(searchQuery) ||
      remedy.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      remedy.abbreviation?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Polychrest') return remedy.isPolychrest;
    if (activeCategory === 'Plant') return remedy.kingdom?.toLowerCase().includes('plant');
    if (activeCategory === 'Animal') return remedy.kingdom?.toLowerCase().includes('animal');
    if (activeCategory === 'Mineral') return remedy.kingdom?.toLowerCase().includes('mineral');
    
    return true;
  }).sort((a, b) => a.name.localeCompare(b.name));

  const handleSelectRemedy = (remedy: MateriaRemedy) => {
    if (compareMode) {
      if (comparisonList.find(r => r.id === remedy.id)) {
        setComparisonList(comparisonList.filter(r => r.id !== remedy.id));
      } else if (comparisonList.length < 3) {
        setComparisonList([...comparisonList, remedy]);
      }
    } else {
      setSelectedRemedy(remedy);
      setShowMobileDetails(true);
    }
  };

  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    if (!compareMode && selectedRemedy) {
      setComparisonList([selectedRemedy]);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-background font-inter overflow-hidden">
      {/* Top App Bar */}
      <header className="flex justify-between items-center px-8 py-4 w-full bg-background sticky top-0 z-40 border-b border-outline-variant/10">
        <div className="flex items-center gap-4">
          <h2 className="font-manrope font-bold text-lg text-primary">{t('materia.browserTitle')}</h2>
          <span className="px-2 py-0.5 rounded-full bg-tertiary-container/10 text-tertiary text-[10px] font-bold uppercase tracking-widest">En / Bn</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center bg-surface-container-low px-4 py-2 rounded-full w-72">
            <Search className="text-outline text-lg mr-2" size={18} />
            <input 
              type="text" 
              placeholder={t('materia.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-sm w-full font-body placeholder:text-outline/50 outline-none"
            />
          </div>
          <div className="flex items-center gap-4 text-primary">
            <Bell className="cursor-pointer hover:opacity-70 transition-all" size={20} />
            <HelpCircle className="cursor-pointer hover:opacity-70 transition-all" size={20} />
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-container/20">
              <img 
                className="w-full h-full object-cover" 
                src="https://picsum.photos/seed/doctor/100/100" 
                alt="Profile"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Remedy List Panel */}
        <section className={`w-full md:w-80 bg-surface-container-low flex flex-col border-r border-outline-variant/10 ${showMobileDetails && !compareMode ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-manrope font-bold text-on-surface text-sm uppercase tracking-widest opacity-60">{t('materia.directory')}</h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleCompareMode}
                  className={`p-1.5 rounded-lg transition-all ${compareMode ? 'bg-primary text-white' : 'bg-white text-primary hover:bg-primary/10'}`}
                  title={compareMode ? t('materia.exitComparison') : t('materia.compareRemedies')}
                >
                  <ArrowRightLeft size={16} />
                </button>
                <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary-fixed rounded-md">{MATERIA_MEDICA_DATA.length}</span>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {[
                { id: 'All', label: t('materia.categories.all') },
                { id: 'Polychrest', label: t('materia.categories.polychrest') },
                { id: 'Plant', label: t('materia.categories.plant') },
                { id: 'Animal', label: t('materia.categories.animal') },
                { id: 'Mineral', label: t('materia.categories.mineral') }
              ].map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`${activeCategory === cat.id ? 'bg-primary text-white' : 'bg-white text-on-surface-variant hover:bg-white/80'} px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-2 custom-scrollbar">
            {filteredRemedies.map((remedy) => {
              const isSelected = compareMode 
                ? comparisonList.some(r => r.id === remedy.id)
                : selectedRemedy?.id === remedy.id;
                
              return (
                <button
                  key={remedy.id}
                  onClick={() => handleSelectRemedy(remedy)}
                  className={`w-full text-left p-4 rounded-xl transition-all relative ${
                    isSelected 
                      ? compareMode ? 'bg-primary/10 border-l-4 border-primary' : 'bg-surface-container-lowest shadow-sm border-l-4 border-primary' 
                      : 'hover:bg-surface-container-high'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`font-manrope font-extrabold text-base ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                      {remedy.name}
                    </span>
                    <span className="text-[10px] font-label text-outline uppercase tracking-wider">{remedy.abbreviation || remedy.name.substring(0, 4)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-xs text-on-surface-variant italic">{remedy.banglaName}</p>
                      <p className="text-[10px] text-outline italic mt-0.5">{remedy.commonName}</p>
                    </div>
                    {compareMode && isSelected && (
                      <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                        {comparisonList.findIndex(r => r.id === remedy.id) + 1}
                      </div>
                    )}
                    {!compareMode && isSelected && (
                      <Star className="text-tertiary" size={12} fill="currentColor" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {compareMode && comparisonList.length >= 2 && (
            <div className="p-4 border-t border-outline-variant/10">
              <button 
                onClick={() => setShowMobileDetails(true)}
                className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20"
              >
                {t('materia.compareSelected', { count: comparisonList.length.toString() })}
              </button>
            </div>
          )}
        </section>

        {/* Reading Pane / Comparison Pane */}
        <section className={`flex-1 overflow-y-auto bg-surface-container-lowest p-6 md:p-10 custom-scrollbar ${!showMobileDetails && !compareMode ? 'hidden md:block' : 'block'}`}>
          <AnimatePresence mode="wait">
            {compareMode ? (
              <motion.div
                key="comparison"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="max-w-6xl mx-auto"
              >
                {/* Mobile Back Button */}
                <button 
                  onClick={() => setShowMobileDetails(false)}
                  className="md:hidden mb-6 flex items-center gap-2 text-primary font-bold"
                >
                  <ArrowLeft size={20} />
                  {t('materia.backToSelection')}
                </button>

                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-manrope font-extrabold text-2xl text-on-surface">{t('materia.comparisonTitle')}</h2>
                  <button 
                    onClick={() => setComparisonList([])}
                    className="flex items-center gap-2 text-error text-sm font-bold hover:opacity-70"
                  >
                    <RotateCcw size={16} />
                    {t('materia.clearAll')}
                  </button>
                </div>

                {comparisonList.length === 0 ? (
                  <div className="py-20 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center text-primary/20 mb-6">
                      <ArrowRightLeft size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-on-surface opacity-40">{t('materia.selectToCompare')}</h3>
                    <p className="text-on-surface-variant text-sm mt-2 max-w-xs">{t('materia.selectToCompareDesc')}</p>
                  </div>
                ) : (
                  <div className="space-y-12">
                    {/* Headers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {comparisonList.map((remedy) => (
                        <div key={remedy.id} className="bg-surface-container-low p-6 rounded-[2rem] relative border border-outline-variant/10">
                          <button 
                            onClick={() => setComparisonList(comparisonList.filter(r => r.id !== remedy.id))}
                            className="absolute top-4 right-4 p-1.5 bg-white rounded-full text-outline hover:text-error shadow-sm"
                          >
                            <X size={14} />
                          </button>
                          <h3 className="font-manrope font-extrabold text-xl text-primary">{remedy.name}</h3>
                          <p className="text-on-surface font-bold mt-1">{remedy.banglaName}</p>
                          <p className="text-on-surface-variant text-xs mt-1 italic">{remedy.commonName}</p>
                        </div>
                      ))}
                    </div>

                    {/* Comparison Sections */}
                    <div className="space-y-10">
                      <ComparisonSection 
                        title={`${t('materia.mainSymptoms')} (${t('materia.categories.all')})`} 
                        icon={<Star size={18} />}
                        data={comparisonList.map(r => ({
                          text: r.keyIndications?.join(', ') || 'N/A',
                          bangla: r.banglaIndications?.join(', ') || 'N/A'
                        }))}
                      />

                      <ComparisonSection 
                        title={t('materia.keynotes')} 
                        icon={<Zap size={18} />}
                        data={comparisonList.map(r => ({
                          text: r.description,
                          bangla: r.banglaDescription
                        }))}
                      />

                      <ComparisonSection 
                        title={t('materia.guidingSymptoms')} 
                        icon={<Shield size={18} />}
                        data={comparisonList.map(r => ({
                          text: r.guidingSymptoms?.join('\n• ') || 'N/A',
                          bangla: r.banglaGuidingSymptoms?.join('\n• ') || 'N/A'
                        }))}
                      />

                      <ComparisonSection 
                        title={t('materia.clinicalIndications')} 
                        icon={<Activity size={18} />}
                        data={comparisonList.map(r => ({
                          text: r.clinicalIndications?.join(', ') || 'N/A',
                          bangla: r.banglaClinicalIndications?.join(', ') || 'N/A'
                        }))}
                      />
                      
                      <ComparisonSection 
                        title={t('materia.relationships')} 
                        icon={<Link2 size={18} />}
                        data={comparisonList.map(r => ({
                          text: `${t('materia.complementary')}: ${r.relationships?.complementary || 'N/A'}\n${t('materia.antidote')}: ${r.relationships?.antidote || 'N/A'}\n${t('materia.inimical')}: ${r.relationships?.inimical || 'N/A'}\n${t('materia.followsWell')}: ${r.relationships?.followsWell || 'N/A'}`,
                          bangla: `${t('materia.complementary')}: ${r.relationships?.banglaComplementary || 'N/A'}\n${t('materia.antidote')}: ${r.relationships?.banglaAntidote || 'N/A'}\n${t('materia.inimical')}: ${r.relationships?.banglaInimical || 'N/A'}\n${t('materia.followsWell')}: ${r.relationships?.banglaFollowsWell || 'N/A'}`
                        }))}
                      />

                      <ComparisonSection 
                        title={t('materia.causation')} 
                        icon={<HelpCircle size={18} />}
                        data={comparisonList.map(r => ({
                          text: r.causation || 'N/A',
                          bangla: r.banglaCausation || 'N/A'
                        }))}
                      />
                      
                      <ComparisonSection 
                        title={t('materia.aggravation')} 
                        icon={<TrendingUp size={18} />}
                        color="text-error"
                        data={comparisonList.map(r => ({
                          text: r.modalities?.aggravation || r.modality || 'N/A',
                          bangla: r.modalities?.banglaAggravation || r.banglaModality || 'N/A'
                        }))}
                      />

                      <ComparisonSection 
                        title={t('materia.amelioration')} 
                        icon={<TrendingDown size={18} />}
                        color="text-tertiary"
                        data={comparisonList.map(r => ({
                          text: r.modalities?.amelioration || 'N/A',
                          bangla: r.modalities?.banglaAmelioration || 'N/A'
                        }))}
                      />

                      <ComparisonSection 
                        title={t('materia.mainSymptoms')} 
                        icon={<Activity size={18} />}
                        data={comparisonList.map(r => ({
                          text: r.mainSymptoms?.join(', ') || 'N/A',
                          bangla: r.banglaMainSymptoms?.join(', ') || 'N/A'
                        }))}
                      />

                      <ComparisonSection 
                        title={t('materia.mentalState')} 
                        icon={<Brain size={18} />}
                        data={comparisonList.map(r => ({
                          text: r.mind?.join(', ') || r.mentalState || 'N/A',
                          bangla: r.banglaMind?.join(', ') || r.banglaMentalState || 'N/A'
                        }))}
                      />

                      <ComparisonSection 
                        title={t('materia.physicalDetails')} 
                        icon={<Activity size={18} />}
                        data={comparisonList.map(r => ({
                          text: `${t('materia.location')}: ${r.location || 'N/A'}\n${t('materia.appearance')}: ${r.appearance || 'N/A'}\n${t('materia.sensation')}: ${r.sensation || 'N/A'}\n${t('materia.pain')}: ${r.pain || 'N/A'}`,
                          bangla: `${t('materia.location')}: ${r.banglaLocation || 'N/A'}\n${t('materia.appearance')}: ${r.banglaAppearance || 'N/A'}\n${t('materia.sensation')}: ${r.banglaSensation || 'N/A'}\n${t('materia.pain')}: ${r.banglaPain || 'N/A'}`
                        }))}
                      />

                      <ComparisonSection 
                        title={t('materia.timeModality')} 
                        icon={<Clock size={18} />}
                        data={comparisonList.map(r => ({
                          text: `${t('materia.time')}: ${r.time || 'N/A'}\n${t('materia.modality')}: ${r.modality || 'N/A'}`,
                          bangla: `${t('materia.time')}: ${r.banglaTime || 'N/A'}\n${t('materia.modality')}: ${r.banglaModality || 'N/A'}`
                        }))}
                      />

                      <ComparisonSection 
                        title={t('materia.desiresAversions')} 
                        icon={<Utensils size={18} />}
                        data={comparisonList.map(r => ({
                          text: `${t('materia.desire')}: ${r.desire || 'N/A'}\n${t('materia.aversion')}: ${r.aversion || 'N/A'}`,
                          bangla: `${t('materia.desire')}: ${r.banglaDesire || 'N/A'}\n${t('materia.aversion')}: ${r.banglaAversion || 'N/A'}`
                        }))}
                      />

                      <ComparisonSection 
                        title={t('materia.dosageUsage')} 
                        icon={<FlaskConical size={18} />}
                        data={comparisonList.map(r => ({
                          text: r.dosage || 'N/A',
                          bangla: r.banglaDosage || 'N/A'
                        }))}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            ) : selectedRemedy ? (
              <motion.div 
                key={selectedRemedy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
              >
                {/* Mobile Back Button */}
                <button 
                  onClick={() => setShowMobileDetails(false)}
                  className="md:hidden mb-4 flex items-center gap-2 text-primary font-bold"
                >
                  <ArrowLeft size={20} />
                  {t('materia.backToDirectory')}
                </button>

                {/* Hero Section */}
                <div className="relative rounded-3xl overflow-hidden mb-12 h-64 flex items-end shadow-xl">
                  <img 
                    className="absolute inset-0 w-full h-full object-cover" 
                    src={selectedRemedy.image || `https://picsum.photos/seed/${selectedRemedy.id}/1200/600`} 
                    alt={selectedRemedy.name}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
                  <div className="relative p-8 w-full flex justify-between items-end">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                          {selectedRemedy.kingdom || 'Remedy'}
                        </span>
                        <span className="text-white/80 text-sm italic">{selectedRemedy.family || ''}</span>
                      </div>
                      <h1 className="font-manrope font-extrabold text-3xl md:text-4xl text-white tracking-tight">{selectedRemedy.name}</h1>
                      <p className="text-white/90 font-manrope text-xl mt-1">{selectedRemedy.banglaName}</p>
                      <p className="text-white/70 font-manrope text-sm italic mt-1">{selectedRemedy.commonName}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                        {t('materia.dosageUsage')}: {selectedRemedy.dosage || 'N/A'}
                      </span>
                      <button 
                        onClick={() => setQuickDetailsRemedy(selectedRemedy)}
                        className="hidden sm:flex bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full font-label text-xs font-bold uppercase tracking-widest hover:bg-white/30 transition-all items-center gap-2">
                        <Plus size={16} />
                        {t('common.view')}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content Grid: Bento Layout */}
                <div className="grid grid-cols-12 gap-6">
                  {/* Keynotes Section */}
                  <div className="col-span-12 lg:col-span-8 p-8 bg-surface-container-low rounded-[2rem]">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Zap size={20} />
                      </div>
                      <h3 className="font-manrope font-bold text-xl text-primary">{t('materia.keynotes')}</h3>
                    </div>
                    <div className="space-y-6">
                      <p className="text-on-surface font-body leading-relaxed text-lg italic border-l-4 border-tertiary pl-6">
                        "{selectedRemedy.description}"
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-2xl">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{t('materia.causation')}</h4>
                          <p className="text-sm text-on-surface-variant font-medium">{selectedRemedy.causation || 'N/A'}</p>
                          <p className="text-[11px] text-outline mt-1 font-manrope">{selectedRemedy.banglaCausation || ''}</p>
                        </div>
                        <div className="p-4 bg-white rounded-2xl">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{t('materia.mentalState')}</h4>
                          <p className="text-sm text-on-surface-variant font-medium">{selectedRemedy.mentalState || 'N/A'}</p>
                          <p className="text-[11px] text-outline mt-1 font-manrope">{selectedRemedy.banglaMentalState || ''}</p>
                        </div>
                      </div>
                      
                      {/* Key Indications / Keynotes */}
                      <div className="p-6 bg-white rounded-2xl">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                          <Star size={14} className="text-tertiary" />
                          {t('materia.mainSymptoms')}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                          {selectedRemedy.keyIndications.map((item, i) => (
                            <div key={i} className="flex flex-col border-l-2 border-primary/20 pl-3 py-1">
                              <span className="text-sm font-bold text-on-surface">{item}</span>
                              <span className="text-[11px] text-on-surface-variant font-manrope">{selectedRemedy.banglaIndications[i]}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Guiding Symptoms */}
                      {selectedRemedy.guidingSymptoms && (
                        <div className="p-6 bg-white rounded-2xl">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                            <Shield size={14} className="text-tertiary" />
                            {t('materia.guidingSymptoms')}
                          </h4>
                          <div className="space-y-3">
                            {selectedRemedy.guidingSymptoms.map((item, i) => (
                              <div key={i} className="flex flex-col border-l-2 border-primary/10 pl-3 py-1">
                                <span className="text-sm text-on-surface font-medium">{item}</span>
                                <span className="text-[11px] text-on-surface-variant font-manrope italic">{selectedRemedy.banglaGuidingSymptoms?.[i]}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="bg-primary/5 p-6 rounded-2xl">
                        <h4 className="font-manrope font-bold text-sm mb-3 flex items-center gap-2">
                          <BookOpen size={16} className="text-tertiary" />
                          {t('materia.bengaliDesc')}
                        </h4>
                        <p className="text-on-surface text-sm leading-relaxed">
                          {selectedRemedy.banglaDescription}
                        </p>
                      </div>

                      {/* Relationships Section */}
                      {selectedRemedy.relationships && (
                        <div className="p-6 bg-tertiary-container/5 rounded-2xl border border-tertiary/10">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-tertiary mb-4 flex items-center gap-2">
                            <Link2 size={14} />
                            {t('materia.remedyRelationships')}
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {selectedRemedy.relationships.complementary && (
                              <div className="text-[11px]">
                                <span className="font-black text-on-surface-variant">{t('materia.complementary')}: </span>
                                <span className="text-on-surface">{selectedRemedy.relationships.complementary}</span>
                              </div>
                            )}
                             {selectedRemedy.relationships.antidote && (
                              <div className="text-[11px]">
                                <span className="font-black text-on-surface-variant">{t('materia.antidote')}: </span>
                                <span className="text-on-surface">{selectedRemedy.relationships.antidote}</span>
                              </div>
                            )}
                             {selectedRemedy.relationships.inimical && (
                              <div className="text-[11px]">
                                <span className="font-black text-error">{t('materia.inimical')}: </span>
                                <span className="text-on-surface">{selectedRemedy.relationships.inimical}</span>
                              </div>
                            )}
                             {selectedRemedy.relationships.followsWell && (
                              <div className="text-[11px]">
                                <span className="font-black text-tertiary">{t('materia.followsWell')}: </span>
                                <span className="text-on-surface">{selectedRemedy.relationships.followsWell}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Modalities Section */}
                  <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    <div className="p-8 bg-surface-container rounded-[2rem] flex-1">
                      <h3 className="font-manrope font-bold text-lg mb-6 flex items-center gap-2 text-error">
                        <TrendingUp size={20} />
                        {t('materia.aggravation')}
                      </h3>
                      <ul className="space-y-4 text-sm font-medium">
                        {(selectedRemedy.modalities?.aggravation || selectedRemedy.modality || '').split(',').map((item, i) => (
                          <li key={i} className="flex flex-col gap-0.5">
                            <div className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-error mt-1.5 shrink-0"></span>
                              {item.trim()}
                            </div>
                            {selectedRemedy.modalities?.banglaAggravation && (
                              <span className="text-[10px] text-outline ml-3.5 font-manrope">
                                {selectedRemedy.modalities.banglaAggravation.split(',')[i]?.trim()}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-8 bg-tertiary-container/10 rounded-[2rem] flex-1">
                      <h3 className="font-manrope font-bold text-lg mb-6 flex items-center gap-2 text-tertiary">
                        <TrendingDown size={20} />
                        {t('materia.amelioration')}
                      </h3>
                      <ul className="space-y-4 text-sm font-medium">
                        {(selectedRemedy.modalities?.amelioration || '').split(',').map((item, i) => (
                          <li key={i} className="flex flex-col gap-0.5">
                            <div className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-tertiary mt-1.5 shrink-0"></span>
                              {item.trim() || 'Open air, rest'}
                            </div>
                            {selectedRemedy.modalities?.banglaAmelioration && (
                              <span className="text-[10px] text-outline ml-3.5 font-manrope">
                                {selectedRemedy.modalities.banglaAmelioration.split(',')[i]?.trim()}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Physical Details Bento */}
                  <div className="col-span-12 lg:col-span-6 p-8 bg-surface-container-low rounded-[2rem]">
                    <h3 className="font-manrope font-bold text-lg mb-6 flex items-center gap-2 text-primary">
                      <User size={20} />
                      {t('materia.physicalDetails')}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex flex-col border-b border-outline-variant/10 pb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-outline uppercase">{t('materia.appearance')}</span>
                          <span className="text-sm font-bold text-on-surface text-right">{selectedRemedy.appearance || 'N/A'}</span>
                        </div>
                        <p className="text-[11px] text-outline text-right font-manrope">{selectedRemedy.banglaAppearance || ''}</p>
                      </div>
                      <div className="flex flex-col border-b border-outline-variant/10 pb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-outline uppercase">{t('materia.location')}</span>
                          <span className="text-sm font-bold text-on-surface text-right">{selectedRemedy.location || 'N/A'}</span>
                        </div>
                        <p className="text-[11px] text-outline text-right font-manrope">{selectedRemedy.banglaLocation || ''}</p>
                      </div>
                      <div className="flex flex-col border-b border-outline-variant/10 pb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-outline uppercase">{t('materia.sensation')}</span>
                          <span className="text-sm font-bold text-on-surface text-right">{selectedRemedy.sensation || 'N/A'}</span>
                        </div>
                        <p className="text-[11px] text-outline text-right font-manrope">{selectedRemedy.banglaSensation || ''}</p>
                      </div>
                      <div className="flex flex-col border-b border-outline-variant/10 pb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-outline uppercase">{t('materia.pain')}</span>
                          <span className="text-sm font-bold text-on-surface text-right">{selectedRemedy.pain || 'N/A'}</span>
                        </div>
                        <p className="text-[11px] text-outline text-right font-manrope">{selectedRemedy.banglaPain || ''}</p>
                      </div>
                    </div>
                  </div>

                  {/* Desires & Aversions Bento */}
                  <div className="col-span-12 lg:col-span-6 p-8 bg-surface-container-low rounded-[2rem]">
                    <h3 className="font-manrope font-bold text-lg mb-6 flex items-center gap-2 text-tertiary">
                      <Utensils size={20} />
                      {t('materia.desiresAversions')}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 bg-white rounded-2xl">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{t('materia.desire')}</h4>
                        <p className="text-sm text-on-surface-variant">{selectedRemedy.desire || 'N/A'}</p>
                        <p className="text-[10px] text-outline mt-1">{selectedRemedy.banglaDesire || ''}</p>
                      </div>
                      <div className="p-4 bg-white rounded-2xl">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-error mb-2">{t('materia.aversion')}</h4>
                        <p className="text-sm text-on-surface-variant">{selectedRemedy.aversion || 'N/A'}</p>
                        <p className="text-[10px] text-outline mt-1">{selectedRemedy.banglaAversion || ''}</p>
                      </div>
                    </div>
                  </div>

                  {/* Time & Modality Bento */}
                  <div className="col-span-12 lg:col-span-4 p-8 bg-surface-container-low rounded-[2rem]">
                    <h3 className="font-manrope font-bold text-lg mb-6 flex items-center gap-2 text-primary">
                      <Clock size={20} />
                      {t('materia.timeModality')}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-[10px] font-bold text-outline uppercase mb-1">{t('materia.time')} {t('materia.aggravation')}</h4>
                        <p className="text-sm text-on-surface">{selectedRemedy.time || 'N/A'}</p>
                        <p className="text-[10px] text-outline">{selectedRemedy.banglaTime || ''}</p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-outline uppercase mb-1">{t('materia.modality')}</h4>
                        <p className="text-sm text-on-surface">{selectedRemedy.modality || 'N/A'}</p>
                        <p className="text-[10px] text-outline">{selectedRemedy.banglaModality || ''}</p>
                      </div>
                    </div>
                  </div>

                  {/* Clinical Indications Bento */}
                  <div className="col-span-12 lg:col-span-8 p-8 bg-surface-container-highest/30 rounded-[2rem]">
                    <h3 className="font-manrope font-bold text-xl text-on-surface mb-8">{t('materia.clinicalIndications')}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedRemedy.mainSymptoms?.map((symptom, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:translate-y-[-4px] transition-transform">
                          <Activity className="text-primary mb-3" size={20} />
                          <h4 className="font-bold text-sm mb-1">{symptom}</h4>
                          <p className="text-[11px] text-on-surface-variant">
                            {selectedRemedy.banglaMainSymptoms?.[i] || ''}
                          </p>
                        </div>
                      )) || (
                        <div className="col-span-3 py-10 text-center text-slate-400">
                          {t('materia.noIndications')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12">
                <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center text-primary/20 mb-6">
                  <Leaf size={40} />
                </div>
                <h3 className="text-xl font-bold text-on-surface opacity-40">{t('materia.selectRemedy')}</h3>
                <p className="text-on-surface-variant text-sm mt-2 max-w-xs">{t('materia.selectRemedyDesc')}</p>
              </div>
            )}
          </AnimatePresence>
        </section>
      </div>
      {quickDetailsRemedy && (
        <QuickDetailsModal 
          remedy={quickDetailsRemedy} 
          onClose={() => setQuickDetailsRemedy(null)} 
        />
      )}
    </div>
  );
};

export const ComparisonSection = ({ title, icon, data, color = "text-primary" }: { 
  title: string, 
  icon: React.ReactNode, 
  data: { text: string, bangla: string }[],
  color?: string
}) => (
  <section>
    <div className="flex items-center gap-3 mb-6">
      <div className={`w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <h4 className="font-manrope font-bold text-lg text-on-surface">{title}</h4>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item, i) => (
        <div key={i} className="space-y-3">
          <div className="text-on-surface font-body text-sm leading-relaxed italic border-l-2 border-outline-variant/20 pl-4 whitespace-pre-line">
            {item.text}
          </div>
          <div className="text-on-surface-variant text-xs font-bold bg-surface-container-low p-3 rounded-xl whitespace-pre-line">
            {item.bangla}
          </div>
        </div>
      ))}
    </div>
  </section>
);



