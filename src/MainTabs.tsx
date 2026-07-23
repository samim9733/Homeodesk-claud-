import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users, UserPlus, Bell, User, Calendar, ChevronRight, ChevronLeft, Search, Plus, Trash2, X, AlertCircle, Stethoscope, Save, ClipboardList,
 Microscope, Leaf, BookOpen, GraduationCap, Scroll, Quote, ArrowRight, Activity, Filter, FileText, ListFilter, ArrowUpDown, Database, ChevronDown, FileDown} from 'lucide-react';
import { Patient, Reminder, AnalysisItem, RubricData, Remedy as RepertoryRemedy, Rubric } from './types';
import { CHAPTER_INDEX, REPERTORY_DATA, CATEGORIES, CHAPTER_CATEGORIES, cleanRubricName } from './constants';
import { useLanguage } from './LanguageContext';

export const Dashboard = ({ patients, analysisCount, reminders, setActiveTab }: { 
  patients: Patient[], 
  analysisCount: number, 
  reminders: Reminder[],
  setActiveTab: (t: string) => void
}) => {
  const { t } = useLanguage();
  const upcomingReminders = useMemo(() => 
    reminders.filter(r => !r.completed).slice(0, 3), 
    [reminders]
  );

  const stats = [
    { label: t('stats.totalPatients'), value: patients.length, icon: Users, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { label: t('stats.analysesRun'), value: analysisCount, icon: Microscope, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: t('stats.activeReminders'), value: reminders.filter(r => !r.completed).length, icon: Bell, color: 'text-amber-600', bgColor: 'bg-amber-50' },
    { label: t('stats.quickSearch'), value: 'Ready', icon: Search, color: 'text-purple-600', bgColor: 'bg-purple-50' },
  ];

  const actionButtons = [
    { id: 'patients', label: t('nav.patients'), icon: Plus, color: 'text-emerald-500', desc: 'Register new patient' },
    { id: 'repertory', label: t('nav.repertory'), icon: Stethoscope, color: 'text-blue-500', desc: 'Browse rubrics' },
    { id: 'materia', label: t('nav.materia'), icon: Leaf, color: 'text-emerald-600', desc: 'Study remedies' },
    { id: 'organon', label: t('nav.organon'), icon: BookOpen, color: 'text-amber-500', desc: 'Philosophy' },
    { id: 'practice', label: t('nav.practice'), icon: Microscope, color: 'text-rose-500', desc: 'Clinical guide' },
    { id: 'knowledge', label: t('nav.knowledge'), icon: GraduationCap, color: 'text-indigo-500', desc: 'Medical library' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-3.5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3 group cursor-default transition-all hover:shadow-md"
          >
            <div className={`w-10 h-10 ${stat.bgColor} ${stat.color} rounded-lg flex items-center justify-center shrink-0`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest leading-none mb-1">{stat.label}</p>
              <h3 className="text-lg font-black text-slate-800 leading-none">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 md:p-10 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
            <div className="relative z-10 text-center md:text-left">
              <h4 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">{t('header.welcome')}</h4>
              <p className="text-emerald-50/80 max-w-xl font-medium leading-relaxed mb-8">
                {t('header.desc')}
              </p>
              <button 
                onClick={() => setActiveTab('repertory')}
                className="w-full px-10 py-4 bg-white text-emerald-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-xl shadow-black/5"
              >
                {t('header.openRepertory')}
              </button>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform duration-700 -mr-12 -mb-12 pointer-events-none">
              <Stethoscope size={320} />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {actionButtons.map((btn, i) => (
              <motion.button
                key={btn.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                onClick={() => setActiveTab(btn.id)}
                className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col items-center gap-3 group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${btn.color} group-hover:scale-110 transition-transform shadow-inner`}>
                  <btn.icon size={24} />
                </div>
                <div className="text-center">
                  <span className="block text-[10px] font-black text-slate-700 uppercase tracking-tight">{btn.label}</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{btn.desc}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
          {/* Apothecary Note Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col h-full min-h-[400px]"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Scroll size={120} className="text-emerald-500" />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                   <Quote size={20} />
                </div>
                <h3 className="text-white font-black text-xs uppercase tracking-[0.2em]">{t('dashboard.apothecaryNote')}</h3>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <p className="text-2xl md:text-3xl font-black text-white leading-tight mb-6 italic font-serif">
                  {t('dashboard.hahnemannQuote')}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-0.5 bg-emerald-500 rounded-full" />
                  <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">Samuel Hahnemann</span>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10">
                <button 
                  onClick={() => setActiveTab('organon')}
                  className="w-full group flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
                      <BookOpen size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-black text-[10px] uppercase tracking-widest leading-none mb-1">{t('dashboard.philosophy')}</p>
                      <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">{t('dashboard.readOrganon')}</p>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-emerald-500 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="text-amber-500" size={18} />
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-800">{t('dashboard.upcomingReminders')}</h3>
        </div>
        
        <div className="space-y-2.5">
          {upcomingReminders.length === 0 ? (
            <p className="text-slate-400 text-xs italic py-6 text-center">{t('dashboard.noReminders')}</p>
          ) : (
            upcomingReminders.map((r) => (
              <div key={r.id} className="p-3.5 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100 hover:border-amber-200 transition-all relative group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[8px] font-black text-amber-600 uppercase tracking-widest px-1.5 py-0.5 bg-amber-50 rounded-md">{r.type}</span>
                      <h4 className="font-black text-slate-800 text-sm">{r.patientName}</h4>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{r.note}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">{r.date}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export const PatientsTab = ({ patients, addPatient, removePatient, setSelectedPatientForRx, onSetReminder, onOpenPD, onOpenReportHistory }: { 
  patients: Patient[], 
  addPatient: (p: Omit<Patient, 'id' | 'date'>) => void,
  removePatient: (id: string) => void,
  setSelectedPatientForRx: (p: Patient | null) => void,
  onSetReminder: (p: Patient) => void,
  onOpenPD: (p: Patient) => void,
  onOpenReportHistory: (p: Patient) => void
}) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'Active' | 'Follow-up' | 'Completed' | 'Inactive'>('Active');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'age'>('date');
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);

  const stats = useMemo(() => {
    const total = patients.length;
    const male = patients.filter(p => p.gender === 'Male').length;
    const female = patients.filter(p => p.gender === 'Female').length;
    const avgAge = total > 0 ? Math.round(patients.reduce((acc, p) => acc + p.age, 0) / total) : 0;
    return { total, male, female, avgAge };
  }, [patients]);

  const filteredPatients = useMemo(() => {
    let result = [...patients];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.id.toLowerCase().includes(query) ||
        (p.phone && p.phone.includes(query))
      );
    }
    
    return result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'age') return b.age - a.age;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [patients, searchQuery, sortBy]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age) return;
    addPatient({ name, age: parseInt(age), gender, phone, status });
    setName('');
    setAge('');
    setGender('Male');
    setPhone('');
    setStatus('Active');
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800">{t('patients.title')}</h2>
          <p className="text-slate-500 text-sm">{t('patients.desc')}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder={t('patients.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
            />
          </div>
          <button 
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold transition shadow-lg shadow-emerald-500/20 flex items-center gap-2 whitespace-nowrap"
          >
            {isFormOpen ? <X size={18} /> : <Plus size={18} />}
            <span>{isFormOpen ? t('patients.closeForm') : t('patients.newPatient')}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('patients.totalRecords'), value: stats.total, icon: Users, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
          { label: t('patients.malePatients'), value: stats.male, icon: User, color: 'text-blue-600', bgColor: 'bg-blue-50' },
          { label: t('patients.femalePatients'), value: stats.female, icon: User, color: 'text-rose-600', bgColor: 'bg-rose-50' },
          { label: t('patients.avgAge'), value: `${stats.avgAge} Yrs`, icon: Activity, color: 'text-amber-600', bgColor: 'bg-amber-50' },
        ].map((s) => (
          <div key={s.label} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`w-10 h-10 ${s.bgColor} ${s.color} rounded-xl flex items-center justify-center`}>
              <s.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
              <p className="text-lg font-black text-slate-800">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        >
          <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <UserPlus size={20} /> {t('patients.registerNew')}
            </h3>
            <p className="text-emerald-50/80 text-xs mt-1">{t('patients.fillDetails')}</p>
          </div>
          <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('patients.fullName')}</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                placeholder="Enter patient name..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('patients.age')}</label>
              <input 
                type="number" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required 
                placeholder={t('patients.age')}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('patients.gender')}</label>
              <select 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('patients.phone')}</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('patients.initialStatus')}</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
              >
                <option value="Active">Active Case</option>
                <option value="Follow-up">Needs Follow-up</option>
                <option value="Completed">Treatment Completed</option>
                <option value="Inactive">Inactive/On Hold</option>
              </select>
            </div>
            <div className="md:col-span-4 flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button 
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-6 py-2 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition"
              >
                {t('common.cancel')}
              </button>
              <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-2 rounded-xl font-bold transition shadow-lg shadow-emerald-500/20 flex items-center gap-2">
                <Save size={18} /> {t('patients.saveRecord')}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-500">{t('patients.sortBy')}</span>
            <div className="flex gap-1">
              {[
                { id: 'date', label: t('patients.date') },
                { id: 'name', label: t('patients.name') },
                { id: 'age', label: t('patients.age') }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSortBy(s.id as any)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                    sortBy === s.id ? 'bg-emerald-500 text-white shadow-md' : 'bg-white text-slate-400 hover:text-slate-600 border border-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {t('patients.showing')} {filteredPatients.length} {t('patients.of')} {patients.length}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse hidden md:table">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="p-4 border-b border-slate-100">{t('patients.id')}</th>
                <th className="p-4 border-b border-slate-100">{t('patients.details')}</th>
                <th className="p-4 border-b border-slate-100">{t('patients.demographics')}</th>
                <th className="p-4 border-b border-slate-100">{t('patients.treatment')}</th>
                <th className="p-4 border-b border-slate-100">{t('patients.registeredOn')}</th>
                <th className="p-4 border-b border-slate-100 text-right">{t('patients.actions')}</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <Users size={48} className="opacity-20 mb-2" />
                      <p className="font-bold">{t('patients.noPatientsFound')}</p>
                      <p className="text-xs">{t('patients.tryAdjusting')}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPatients.map((p) => (
                  <tr key={p.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-bold">
                        {p.id.slice(0, 8)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div 
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => setSelectedPatientForRx(p)}
                      >
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm group-hover:bg-emerald-200 transition-colors">
                          {p.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{p.name}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Patient Record</p>
                            {p.phone && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-slate-200" />
                                <p className="text-[10px] text-slate-500 font-bold">{p.phone}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-700 font-medium">{p.age} Yrs</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            p.gender === 'Male' ? 'bg-blue-50 text-blue-600' : 
                            p.gender === 'Female' ? 'bg-rose-50 text-rose-600' : 
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {p.gender}
                          </span>
                        </div>
                        <span className={`w-fit px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${
                          p.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                          p.status === 'Follow-up' ? 'bg-amber-100 text-amber-700' :
                          p.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {p.status || 'Active'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        {p.remedy ? (
                          <>
                            <span className="text-emerald-700 font-black text-xs uppercase tracking-tight">{p.remedy}</span>
                            <span className="text-[10px] text-slate-400 font-bold">{p.currentPotency || 'N/A'}</span>
                          </>
                        ) : (
                          <span className="text-slate-300 italic text-[10px]">No remedy set</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Calendar size={14} />
                        <span className="text-xs">{p.date}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => onOpenPD(p)}
                          className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors" 
                          title="Patient Details (PD)"
                        >
                          <ClipboardList size={18} />
                        </button>
                        <button 
                          onClick={() => onOpenReportHistory(p)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" 
                          title="Report History (Save/Print old &amp; new reports)"
                        >
                          <FileDown size={18} />
                        </button>
                        <button 
                          onClick={() => setSelectedPatientForRx(p)}
                          className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors" 
                          title="Write Prescription (Rx)"
                        >
                          <FileText size={18} />
                        </button>
                        <button 
                          onClick={() => onSetReminder(p)}
                          className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors" 
                          title="Set Reminder"
                        >
                          <Bell size={18} />
                        </button>
                        <button 
                          onClick={() => setPatientToDelete(p)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" 
                          title="Delete Patient"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-slate-100">
            {filteredPatients.length === 0 ? (
              <div className="p-12 text-center">
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <Users size={48} className="opacity-20 mb-2" />
                  <p className="font-bold">{t('patients.noPatientsFound')}</p>
                </div>
              </div>
            ) : (
              filteredPatients.map((p) => (
                <div key={p.id} className="p-4 space-y-4">
                  <div 
                    className="flex justify-between items-start cursor-pointer group"
                    onClick={() => setSelectedPatientForRx(p)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm group-hover:bg-emerald-200 transition-colors">
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{p.name}</p>
                        <p className="text-[10px] text-slate-500 font-bold">{p.phone || 'No Phone'}</p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-bold">
                      {p.id.slice(0, 8)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-3 rounded-xl">
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Demographics</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-700">{p.age}Y</span>
                        <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${
                          p.gender === 'Male' ? 'bg-blue-50 text-blue-600' : 
                          p.gender === 'Female' ? 'bg-rose-50 text-rose-600' : 
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {p.gender}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                      <span className={`px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${
                        p.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                        p.status === 'Follow-up' ? 'bg-amber-100 text-amber-700' :
                        p.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {p.status || 'Active'}
                      </span>
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Remedy</p>
                      <p className="text-[10px] font-black text-emerald-700 uppercase">{p.remedy || 'None'}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Registered</p>
                      <p className="text-[10px] font-bold text-slate-700">{p.date}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-end gap-2 pt-2">
                    <button 
                      onClick={() => onOpenPD(p)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest"
                    >
                      <ClipboardList size={14} /> PD
                    </button>
                    <button 
                      onClick={() => onOpenReportHistory(p)}
                      className="p-2 text-rose-500 bg-rose-50 rounded-xl"
                      title="Report History (Save/Print old &amp; new reports)"
                    >
                      <FileDown size={14} />
                    </button>
                    <button 
                      onClick={() => setSelectedPatientForRx(p)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-200"
                    >
                      <FileText size={14} /> Rx
                    </button>
                    <button 
                      onClick={() => onSetReminder(p)}
                      className="p-2 text-amber-500 bg-amber-50 rounded-xl"
                    >
                      <Bell size={14} />
                    </button>
                    <button 
                      onClick={() => setPatientToDelete(p)}
                      className="p-2 text-rose-500 bg-rose-50 rounded-xl"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {patientToDelete && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPatientToDelete(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden z-10"
            >
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle size={40} />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">{t('patients.deleteConfirmTitle')}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                   {t('patients.deleteConfirmDesc')}
                </p>
              </div>
              <div className="flex border-t border-slate-100">
                <button 
                  onClick={() => setPatientToDelete(null)}
                  className="flex-1 py-5 text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  {t('common.cancel')}
                </button>
                <button 
                  onClick={() => {
                    removePatient(patientToDelete.id);
                    setPatientToDelete(null);
                  }}
                  className="flex-1 py-5 text-sm font-bold text-rose-500 hover:bg-rose-50 transition-colors border-l border-slate-100"
                >
                  {t('patients.confirmDelete')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const RepertoryTab = ({ analysis, addToAnalysis, runRepertorization, setActiveTab, searchQuery = '' }: { 
  analysis: AnalysisItem[], 
  addToAnalysis: (item: AnalysisItem) => void, 
  runRepertorization: (results: any[]) => void, 
  setActiveTab: (tab: string) => void,
  searchQuery?: string
}) => {
  const { t, language } = useLanguage();
  const [selectedChapter, setSelectedChapter] = useState<string>('Mind');
  
  const [sortBy, setSortBy] = useState<'name' | 'subrubrics'>('name');
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [rubricPath, setRubricPath] = useState<(Rubric | import('./types').SubRubric)[]>([]);
  const selectedRubric = rubricPath.length > 0 ? rubricPath[rubricPath.length - 1] : null;
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [subrubricPage, setSubrubricPage] = useState(1);
  
  const ITEMS_PER_PAGE = 50;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedChapter, searchQuery, activeFilter]);

  useEffect(() => {
    setSubrubricPage(1);
  }, [selectedRubric, activeFilter]);

  const currentChapter = REPERTORY_DATA.find(c => c.name === selectedChapter);
  const currentChapterIndex = CHAPTER_INDEX.find(c => c.n === selectedChapter);

  const matchesFilter = (data: RubricData | undefined, filter: string) => {
    if (filter === 'ALL') return true;
    if (!data) return false;

    if (filter === 'MIND') {
      return (data.mind && data.mind.length > 0) || (data.psychological && data.psychological.length > 0);
    }
    if (filter === 'TIME') {
      return (data.general?.g_time && data.general.g_time.length > 0) || (data.time && data.time.length > 0);
    }
    if (filter === 'SIDE') {
      return (data.general?.g_side && data.general.g_side.length > 0);
    }
    if (filter === 'MODALITIES') {
      return (data.modality && data.modality.length > 0);
    }
    if (filter === 'PHYSICAL GENERALS') {
      return (data.general?.g_temp && data.general.g_temp.length > 0) || 
             (data.sensation && data.sensation.length > 0) || 
             (data.pain && data.pain.length > 0) || 
             (data.desire && data.desire.length > 0) || 
             (data.aversion && data.aversion.length > 0) ||
             (data.general?.g_phys && data.general.g_phys.length > 0);
    }
    if (filter === 'CONDITION') {
      return (data.general?.g_patho && data.general.g_patho.length > 0);
    }
    return true;
  };

  const getAllRemedies = (data?: import('./types').RubricData): import('./types').Remedy[] => {
    const remedies: RepertoryRemedy[] = [];
    if (!data) return remedies;
    const seen = new Set<string>();

    const addRemedies = (list?: RepertoryRemedy[]) => {
      if (!list) return;
      list.forEach(r => {
        if (!seen.has(r.n)) {
          remedies.push({ ...r });
          seen.add(r.n);
        } else {
          // Update grade if higher
          const existing = remedies.find(ex => ex.n === r.n);
          if (existing && r.g < existing.g) {
            existing.g = r.g;
          }
        }
      });
    };

    addRemedies(data.location);
    addRemedies(data.sensation);
    addRemedies(data.modality);
    addRemedies(data.concomitant);
    addRemedies(data.psychological);
    addRemedies(data.physiological);
    addRemedies(data.mind);
    addRemedies(data.pain);
    addRemedies(data.desire);
    addRemedies(data.aversion);
    addRemedies(data.time);
    
    if (data.general) {
      Object.values(data.general).forEach(list => addRemedies(list as RepertoryRemedy[]));
    }

    return remedies;
  };

  const getRecursiveRemedies = (sub: import('./types').SubRubric): import('./types').Remedy[] => {
    let allRemedies = getAllRemedies(sub.d);
    
    if (sub.sr && sub.sr.length > 0) {
      sub.sr.forEach(child => {
        const childRemedies = getRecursiveRemedies(child);
        const seen = new Set(allRemedies.map(r => r.n));
        
        childRemedies.forEach(r => {
          if (!seen.has(r.n)) {
            allRemedies.push({ ...r });
            seen.add(r.n);
          } else {
            const existing = allRemedies.find(ex => ex.n === r.n);
            if (existing && r.g < existing.g) {
              existing.g = r.g;
            }
          }
        });
      });
    }
    
    return allRemedies;
  };

  const filteredRubrics = useMemo(() => {
    if (!currentChapter) return [];
    const searchStr = searchQuery.toLowerCase();
    const rubrics = currentChapter.rubrics.filter(r => {
      const matchesSearch = !searchQuery || 
        r.name.toLowerCase().includes(searchStr) ||
        r.tr.toLowerCase().includes(searchStr) ||
        r.sr.some(s => {
          const allRem = getAllRemedies(s.d);
          return allRem.some(rem => rem.n.toLowerCase().includes(searchStr));
        });
      
      if (!matchesSearch) return false;

      if (activeFilter === 'ALL') return true;
      return r.sr.some(s => matchesFilter(s.d, activeFilter));
    });

    if (sortBy === 'name') {
      rubrics.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      rubrics.sort((a, b) => b.sr.length - a.sr.length);
    }

    return rubrics;
  }, [currentChapter, searchQuery, sortBy, activeFilter]);

  const calculateRepertorization = () => {
    if (analysis.length === 0) return;
    const remedyScores: { [key: string]: { score: number, count: number } } = {};
    analysis.forEach(item => {
      item.remedies.forEach(r => {
        if (!remedyScores[r.n]) {
          remedyScores[r.n] = { score: 0, count: 0 };
        }
        const points = r.g === 1 ? 3 : (r.g === 2 ? 2 : 1);
        remedyScores[r.n].score += points;
        remedyScores[r.n].count += 1;
      });
    });
    const results = Object.entries(remedyScores)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.score - a.score || b.count - a.count)
      .slice(0, 10);
    runRepertorization(results);
  };

  const topRemedies = useMemo(() => {
    if (analysis.length === 0) return [];
    const remedyScores: { [key: string]: { score: number, count: number } } = {};
    analysis.forEach(item => {
      item.remedies.forEach(r => {
        if (!remedyScores[r.n]) remedyScores[r.n] = { score: 0, count: 0 };
        remedyScores[r.n].score += (r.g === 1 ? 3 : (r.g === 2 ? 2 : 1));
        remedyScores[r.n].count += 1;
      });
    });
    return Object.entries(remedyScores)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [analysis]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:h-[calc(100vh-12rem)] min-h-[500px] lg:overflow-hidden">
      {/* Left Sidebar: Chapters */}
      <div className="w-full lg:w-72 flex flex-col gap-4 md:gap-6 shrink-0 lg:overflow-hidden">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden flex-1 lg:min-h-0">
          <div className="p-3 md:p-4 border-b border-slate-50 bg-slate-50/30">
            <h3 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{t('repertory.chapters')}</h3>
            <p className="text-[8px] md:text-[9px] text-slate-400 font-bold uppercase tracking-widest">{t('repertory.index')}</p>
          </div>
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto p-2 custom-scrollbar gap-4 lg:gap-4">
            {CHAPTER_CATEGORIES.map(cat => {
              const visibleChapters = cat.chapters.filter(chapterName => {
                const ch = CHAPTER_INDEX.find(c => c.n === chapterName);
                if (!ch) return false;
                if (searchQuery) {
                  const searchStr = searchQuery.toLowerCase();
                  const chData = REPERTORY_DATA.find(rd => rd.name === ch.n);
                  const matchesName = ch.n.toLowerCase().includes(searchStr) || ch.t.toLowerCase().includes(searchStr);
                  const matchesContent = chData ? JSON.stringify(chData).toLowerCase().includes(searchStr) : false;
                  return matchesName || matchesContent;
                }
                return true;
              });

              if (visibleChapters.length === 0) return null;

              return (
              <div key={cat.name} className="flex-shrink-0 lg:w-full space-y-1">
                <div className="px-2 pb-1 mb-1 border-b border-slate-100 hidden lg:block">
                  <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em]">{cat.name}</h4>
                </div>
                <div className="flex lg:flex-col gap-2 lg:gap-0">
                  {visibleChapters.map(chapterName => {
                    const ch = CHAPTER_INDEX.find(c => c.n === chapterName);
                    if (!ch) return null;
                    const hasData = REPERTORY_DATA.some(rd => rd.name === ch.n);
                    const isActive = selectedChapter === ch.n;
                    return (
                      <motion.button
                        key={ch.n}
                        whileHover={hasData ? { scale: 1.02, x: 2 } : {}}
                        whileTap={hasData ? { scale: 0.98 } : {}}
                        onClick={() => {
                          if (hasData) {
                            setSelectedChapter(ch.n);
                            setRubricPath([]);
                          }
                        }}
                        disabled={!hasData}
                        className={`flex-shrink-0 lg:w-full flex items-center gap-3 p-2.5 md:p-3.5 rounded-2xl transition-all duration-300 group cursor-pointer relative overflow-hidden border ${
                          isActive 
                            ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white shadow-lg shadow-slate-900/10 border-slate-950 ring-2 ring-emerald-500/10' 
                            : hasData 
                              ? 'bg-slate-50/25 border-slate-100/60 hover:border-slate-200 hover:bg-white hover:shadow-md hover:shadow-slate-100 text-slate-700' 
                              : 'bg-slate-50/10 border-transparent opacity-30 cursor-not-allowed'
                        }`}
                      >
                        {/* Glow effect on hover */}
                        {hasData && !isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        )}
                        
                        {/* Active vertical bar indicator */}
                        {isActive && (
                          <div className="absolute left-0 top-1/4 bottom-1/4 w-[4px] bg-gradient-to-b from-emerald-400 to-teal-500 rounded-r-full" />
                        )}

                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-500 shadow-sm border shrink-0 ${
                          isActive 
                            ? 'bg-emerald-500/20 border-emerald-400/30 text-white group-hover:scale-110' 
                            : 'bg-white border-slate-100 group-hover:border-emerald-200 group-hover:bg-emerald-50/30 group-hover:text-emerald-500 group-hover:scale-110'
                        }`}>
                          {ch.i}
                        </div>
                        <div className="text-left flex-1 min-w-[80px] lg:min-w-0 flex flex-col justify-center relative z-10 pl-0.5">
                          <p className={`text-[10px] md:text-xs font-black uppercase tracking-tight truncate transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-800 group-hover:text-slate-950'}`}>{ch.n}</p>
                          <p className={`text-[8px] md:text-[9px] font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-500'}`}>{ch.t}</p>
                        </div>
                        {isActive ? (
                          <ChevronRight size={14} className="hidden lg:block text-emerald-400 animate-pulse shrink-0" />
                        ) : (
                          <ChevronRight size={14} className="hidden lg:block text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )})}
          </div>
        </div>

        {/* Apothecary Note Card */}
        <div className="relative overflow-hidden group p-[4px] bg-gradient-to-b from-white/30 via-white/5 to-white/10 backdrop-blur-3xl rounded-[2rem] border border-white/30 shadow-[inset_0_2px_8px_rgba(255,255,255,0.25),_0_16px_40px_rgba(0,0,0,0.25)] text-white">
          {/* Ambient inner glow */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/25 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />
          
          <div className="relative bg-slate-950/90 p-5 rounded-[1.7rem] border border-white/10 z-10 overflow-hidden shadow-inner">
            {/* Specular glare */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400">
                  <Leaf size={16} />
                </div>
                <h4 className="font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-emerald-400">Apothecary Note</h4>
              </div>
              <p className="text-xs md:text-sm font-medium text-white/90 leading-relaxed mb-4 italic font-serif">
                "The highest ideal of cure is rapid, gentle and permanent restoration of health."
              </p>
              <button 
                onClick={() => setActiveTab('organon')}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-md border border-white/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer transform active:scale-98"
              >
                <BookOpen size={12} />
                {t('nav.organon')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Rubric Browser */}
      <div className="flex-1 flex flex-col gap-4 md:gap-6 min-w-0 lg:overflow-hidden">
        {/* Header & Quick Filters */}
        <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 border border-slate-100 shadow-sm space-y-2 md:space-y-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              {selectedRubric && (
                <button 
                  onClick={() => setRubricPath(prev => prev.slice(0, -1))}
                  className="p-1.5 md:p-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-all border border-slate-100"
                >
                  <ChevronLeft size={16} />
                </button>
              )}
              <div>
                <p className="text-[8px] md:text-[9px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-0.5">
                  {selectedRubric ? t('repertory.rubricDetails') : t('repertory.centralRepertory')}
                </p>
                <h2 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight flex items-center flex-wrap gap-x-2 gap-y-1">
                  {selectedRubric ? (
                    <span className="flex flex-wrap items-center gap-2">
                      <span 
                        onClick={() => setRubricPath([])} 
                        className="text-slate-400 hover:text-emerald-500 cursor-pointer font-bold transition-colors"
                      >
                        {t('repertory.browser')}
                      </span>
                      {rubricPath.map((r, i) => {
                        const isLast = i === rubricPath.length - 1;
                        const displayName = language === 'en' ? cleanRubricName(r.name) : cleanRubricName(r.tr || r.name);
                        return (
                          <React.Fragment key={i}>
                            <span className="text-slate-300 select-none">❭</span>
                            <span 
                              onClick={() => {
                                if (!isLast) {
                                  setRubricPath(rubricPath.slice(0, i + 1));
                                }
                              }}
                              className={`font-black uppercase tracking-tight transition-colors ${
                                isLast 
                                  ? 'text-slate-900' 
                                  : 'text-slate-400 hover:text-emerald-500 cursor-pointer'
                              }`}
                            >
                              {displayName}
                            </span>
                          </React.Fragment>
                        );
                      })}
                    </span>
                  ) : t('repertory.browser')}
                  <span className="hidden sm:inline-block px-2.5 py-0.5 bg-slate-100 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-full">v4.2</span>
                </h2>
              </div>
            </div>
            {!selectedRubric && (
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <button 
                  onClick={() => setSortBy(sortBy === 'name' ? 'subrubrics' : 'name')}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md shadow-slate-200 transition-all cursor-pointer"
                >
                  <ArrowUpDown size={12} className="text-emerald-400 animate-pulse" /> 
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {t('repertory.sort')}: {sortBy === 'name' ? (language === 'bn' ? 'এ-জেড' : 'A-Z') : (language === 'bn' ? 'সাব-রুব্রিক সংখ্যা' : 'Subrubrics Count')}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Rubric List or Subrubric List */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
          <div className="flex flex-wrap items-center gap-2 mb-2 p-1">
            {[
              { id: 'ALL', label: t('repertory.filter.all') },
              { id: 'MIND', label: t('repertory.filter.mind') },
              { id: 'TIME', label: t('repertory.filter.time') },
              { id: 'SIDE', label: t('repertory.filter.side') },
              { id: 'MODALITIES', label: t('repertory.filter.modalities') },
              { id: 'PHYSICAL GENERALS', label: t('repertory.filter.physicalGenerals') },
              { id: 'CONDITION', label: t('repertory.filter.condition') }
            ].map((f) => {
              const isSelected = activeFilter === f.id;
              const className = `px-3 md:px-5 py-1.5 md:py-2 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' 
                  : 'bg-white text-slate-400 hover:text-slate-600 border border-slate-100'
              }`;
              if (f.id === 'CONDITION') {
                return (
                  <div
                    key={f.id}
                    id="condition"
                    onClick={() => setActiveFilter(f.id)}
                    className={className}
                    role="button"
                  >
                    {f.label}
                  </div>
                );
              }
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={className}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
          {!selectedRubric ? (
            <div className="space-y-8 pb-10">
              {(() => {
                const totalRubrics = filteredRubrics.length;
                const totalPages = Math.ceil(totalRubrics / ITEMS_PER_PAGE);
                const paginatedRubrics = filteredRubrics.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
                
                return (
                  <>
                    {sortBy === 'name' ? (
                      Object.entries(
                        paginatedRubrics.reduce((acc, rubric) => {
                          const firstLetter = rubric.name[0].toUpperCase();
                          if (!acc[firstLetter]) acc[firstLetter] = [];
                          acc[firstLetter].push(rubric);
                          return acc;
                        }, {} as Record<string, typeof REPERTORY_DATA[0]['rubrics']>)
                      ).sort(([a], [b]) => a.localeCompare(b)).map(([letter, group]) => (
                        <div key={letter} className="space-y-4">
                          <div className="flex items-center gap-4 sticky top-0 z-20 bg-slate-50/90 backdrop-blur-md py-2">
                            <div className="h-px flex-1 bg-slate-200"></div>
                            <span className="text-xs font-black text-slate-400 tracking-[0.3em] pl-[0.3em]">{letter}</span>
                            <div className="h-px flex-1 bg-slate-200"></div>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-4">
                            {group.map((rubric, groupIdx) => (
                              <motion.div
                                key={rubric.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (groupIdx % 10) * 0.03 }}
                                onClick={() => setRubricPath([rubric])}
                                className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group relative overflow-hidden cursor-pointer"
                              >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />
                                
                                <div className="flex justify-between items-start relative z-10">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-lg group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">
                                        {rubric.em || <FileText size={16} />}
                                      </div>
                                      <h4 className="text-md md:text-lg font-black text-slate-900 uppercase tracking-tight truncate">
                                        {language === 'en' ? cleanRubricName(rubric.name) : cleanRubricName(rubric.tr || rubric.name)}
                                      </h4>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                      <span className="flex items-center gap-1.5"><Database size={10} /> {t('repertory.chapters')}: {selectedChapter}</span>
                                      <span className="flex items-center gap-1.5"><ClipboardList size={10} /> {t('repertory.viewSubrubrics')}: {rubric.sr.length}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:border-slate-900 group-hover:text-slate-900 transition-all">
                                      <ChevronRight size={14} />
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-6 space-y-4 relative z-10">
                                  <div className="flex items-start gap-3">
                                    <div className="mt-1 w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                                    <p className="text-[11px] font-bold text-slate-500 leading-relaxed">
                                      <span className="text-slate-900 uppercase font-black mr-2">{t('repertory.topRemedies')}:</span>
                                      {(() => {
                                        const allRem = getRecursiveRemedies(rubric as unknown as import('./types').SubRubric);
                                        const maxToShow = 24;
                                        const displayed = allRem.slice(0, maxToShow);
                                        return displayed.map((r, i) => (
                                          <span key={i} className={`mr-2 ${r.g === 3 ? 'text-emerald-600 font-black' : r.g === 2 ? 'text-blue-600 font-black' : 'text-slate-400'}`}>
                                            {r.n}{i < displayed.length - 1 ? ',' : (allRem.length > maxToShow ? '...' : '')}
                                          </span>
                                        ));
                                      })()}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {paginatedRubrics.map((rubric, groupIdx) => (
                          <motion.div
                            key={rubric.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (groupIdx % 10) * 0.03 }}
                            onClick={() => setRubricPath([rubric])}
                            className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group relative overflow-hidden cursor-pointer"
                          >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            <div className="flex justify-between items-start relative z-10">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-lg group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">
                                    {rubric.em || <FileText size={16} />}
                                  </div>
                                  <h4 className="text-md md:text-lg font-black text-slate-900 uppercase tracking-tight truncate">
                                    {language === 'en' ? cleanRubricName(rubric.name) : cleanRubricName(rubric.tr || rubric.name)}
                                  </h4>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                  <span className="flex items-center gap-1.5"><Database size={10} /> {t('repertory.chapters')}: {selectedChapter}</span>
                                  <span className="flex items-center gap-1.5 text-emerald-600 font-extrabold"><ClipboardList size={10} /> {t('repertory.viewSubrubrics')}: {rubric.sr.length}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:border-slate-900 group-hover:text-slate-900 transition-all">
                                  <ChevronRight size={14} />
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 space-y-4 relative z-10">
                              <div className="flex items-start gap-3">
                                <div className="mt-1 w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                                <p className="text-[11px] font-bold text-slate-500 leading-relaxed">
                                  <span className="text-slate-900 uppercase font-black mr-2">{t('repertory.topRemedies')}:</span>
                                  {(() => {
                                    const allRem = getRecursiveRemedies(rubric as unknown as import('./types').SubRubric);
                                    const maxToShow = 24;
                                    const displayed = allRem.slice(0, maxToShow);
                                    return displayed.map((r, i) => (
                                      <span key={i} className={`mr-2 ${r.g === 3 ? 'text-emerald-600 font-black' : r.g === 2 ? 'text-blue-600 font-black' : 'text-slate-400'}`}>
                                        {r.n}{i < displayed.length - 1 ? ',' : (allRem.length > maxToShow ? '...' : '')}
                                      </span>
                                    ));
                                  })()}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                        <button 
                          onClick={() => { setCurrentPage(prev => Math.max(1, prev - 1)); }}
                          disabled={currentPage === 1}
                          className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {language === 'bn' ? 'আগের পেজ' : 'Previous'}
                        </button>
                        <span className="text-xs font-black text-slate-400">Page {currentPage} of {totalPages}</span>
                        <button 
                          onClick={() => { setCurrentPage(prev => Math.min(totalPages, prev + 1)); }}
                          disabled={currentPage === totalPages}
                          className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {language === 'bn' ? 'পরের পেজ' : 'Next'}
                        </button>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="space-y-8 pb-10">
              {(() => {
                const filteredSubrubrics = (selectedRubric.sr || []).filter(sub => matchesFilter(sub.d || { general: {} }, activeFilter));
                const totalSubrubrics = filteredSubrubrics.length;
                const totalPages = Math.ceil(totalSubrubrics / ITEMS_PER_PAGE);
                const paginatedSubrubrics = filteredSubrubrics.slice((subrubricPage - 1) * ITEMS_PER_PAGE, subrubricPage * ITEMS_PER_PAGE);

                return (
                  <>
                    {Object.entries(
                      paginatedSubrubrics.reduce((acc, sub) => {
                        // Determine primary category by looking at keys in sub.d
                        let primaryKey = 'general';
                        const keys = Object.keys(sub.d || {}).filter(k => k !== 'general' && Array.isArray((sub.d || {} as any)[k]) && (sub.d || {} as any)[k].length > 0);
                        if (keys.length > 0) {
                          primaryKey = keys[0];
                        }
                        const categoryDef = CATEGORIES.find(c => c.key === primaryKey) || CATEGORIES.find(c => c.key === 'general');
                        const catName = categoryDef ? (language === 'bn' ? categoryDef.t : categoryDef.n) : (language === 'bn' ? 'সাধারণ লক্ষণ' : 'General Symptoms');
                        
                        if (!acc[catName]) acc[catName] = [];
                        acc[catName].push(sub);
                        return acc;
                      }, {} as Record<string, typeof selectedRubric.sr>)
                    ).sort((a, b) => a[0].localeCompare(b[0])).map(([catName, subs]) => (
                      <div key={catName} className="space-y-6 mb-12">
                        <div className="flex items-center gap-4 py-3 px-6 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-lg shadow-emerald-200" />
                          <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.25em]">{catName}</h4>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          {(subs as any[]).map((sub, idx) => (
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              key={sub.name}
                              onClick={() => {
                                if (sub.sr && sub.sr.length > 0) {
                                  setRubricPath(prev => [...prev, sub]);
                                }
                              }}
                              className={`bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 border border-slate-100 shadow-sm transition-all group ${sub.sr && sub.sr.length > 0 ? 'cursor-pointer hover:shadow-xl hover:shadow-slate-200/50 relative overflow-hidden' : 'hover:shadow-md'}`}
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-lg group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">
                                        {sub.em || selectedRubric.em || <FileText size={16} />}
                                      </div>
                                      <h5 className="text-sm md:text-md font-black text-slate-900 uppercase tracking-tight">
                                        {language === 'en' ? cleanRubricName(sub.name) : cleanRubricName(sub.tr || sub.name)}
                                      </h5>
                                    </div>
                                    {sub.sr && sub.sr.length > 0 && (
                                      <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 text-[10px] font-black uppercase tracking-wider group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                        <span>{language === 'bn' ? `সাব-রুব্রিক (${sub.sr.length})` : `Subrubrics (${sub.sr.length})`}</span>
                                        <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                      <div className="mt-1 w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                                      <p className="text-[10px] md:text-[11px] font-bold text-slate-500 leading-relaxed">
                                        <span className="text-slate-900 uppercase font-black mr-2">Remedies:</span>
                                        {(() => {
                                          const allRem = getRecursiveRemedies(sub);
                                          const maxToShow = 24;
                                          const displayed = allRem.slice(0, maxToShow);
                                          return displayed.map((r, i) => (
                                            <span key={i} className={`mr-2 ${r.g === 3 ? 'text-emerald-600 font-black' : r.g === 2 ? 'text-blue-600 font-black' : 'text-slate-400'}`}>
                                              {r.n}{i < displayed.length - 1 ? ',' : (allRem.length > maxToShow ? '...' : '')}
                                            </span>
                                          ));
                                        })()}
                                      </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                                      <div className="flex flex-wrap gap-2">
                                        {(() => {
                                          const badgeKeys: string[] = [];
                                          Object.entries(sub.d || {}).forEach(([key, val]) => {
                                            if (key === 'general') {
                                              if (val && typeof val === 'object') {
                                                Object.entries(val).forEach(([gKey, gVal]) => {
                                                  if (gVal && Array.isArray(gVal) && gVal.length > 0) {
                                                    if (gKey === 'g_patho') {
                                                      badgeKeys.push('condition');
                                                    } else {
                                                      badgeKeys.push(gKey.startsWith('g_') ? gKey.substring(2) : gKey);
                                                    }
                                                  }
                                                });
                                              }
                                            } else if (val && Array.isArray(val) && val.length > 0) {
                                              badgeKeys.push(key);
                                            }
                                          });
                                          return badgeKeys.map((key) => (
                                            <span key={key} className="px-2 py-0.5 bg-slate-50 text-slate-400 text-[8px] font-black uppercase tracking-widest rounded-md border border-slate-100">
                                              {key}
                                            </span>
                                          ));
                                        })()}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <button 
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            addToAnalysis({
                                              chapter: selectedChapter,
                                              rubric: cleanRubricName(rubricPath[0].name),
                                              subrubric: rubricPath.slice(1).map(r => cleanRubricName(r.name)).concat(cleanRubricName(sub.name)).join(', '),
                                              text: `${rubricPath.map(r => cleanRubricName(r.name)).join(', ')}, ${cleanRubricName(sub.name)}`,
                                              category: 'General',
                                              page: currentChapterIndex?.p.split('-')[0] ? parseInt(currentChapterIndex.p.split('-')[0]) : 0,
                                              remedies: getRecursiveRemedies(sub)
                                            });
                                          }}
                                          className="flex items-center justify-center gap-1 px-4 py-2 bg-emerald-500 text-white rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all w-full sm:w-auto"
                                        >
                                          +{t('repertory.addToSelection')}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                        <button 
                          onClick={() => { setSubrubricPage(prev => Math.max(1, prev - 1)); }}
                          disabled={subrubricPage === 1}
                          className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {language === 'bn' ? 'আগের পেজ' : 'Previous'}
                        </button>
                        <span className="text-xs font-black text-slate-400">Page {subrubricPage} of {totalPages}</span>
                        <button 
                          onClick={() => { setSubrubricPage(prev => Math.min(totalPages, prev + 1)); }}
                          disabled={subrubricPage === totalPages}
                          className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {language === 'bn' ? 'পরের পেজ' : 'Next'}
                        </button>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>

      {/* Floating Active Repertorization Panel */}
      <AnimatePresence>
        {!isPanelExpanded ? (
          <motion.button
            key="floating-icon"
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1, translateY: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPanelExpanded(true)}
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-14 h-14 p-[3px] bg-gradient-to-b from-white/40 via-white/10 to-white/20 backdrop-blur-3xl rounded-full shadow-[inset_0_3px_8px_rgba(255,255,255,0.6),_0_12px_36px_rgba(0,0,0,0.5),_0_0_20px_rgba(16,185,129,0.25)] flex items-center justify-center text-emerald-400 z-50 border border-white/50 hover:border-emerald-400/60 group transition-all duration-300"
          >
            {/* Outer spinning light ring on hover */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/30 to-teal-500/30 opacity-0 group-hover:opacity-100 animate-spin duration-1000 blur-[2px] transition-opacity" />
            
            <div className="w-full h-full bg-slate-950/90 rounded-full flex items-center justify-center border border-white/10 relative z-10 overflow-hidden shadow-inner">
              {/* Radial reflection streak */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/20 pointer-events-none" />
              <div className="relative">
                <Activity size={20} className="group-hover:text-emerald-300 transition-colors duration-300 animate-pulse text-emerald-400" />
                {analysis.length > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 min-w-[18px] h-5 px-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-full text-[8px] font-black flex items-center justify-center border border-white/35 shadow-lg text-white tracking-tighter animate-bounce">
                    {analysis.length}
                  </span>
                )}
              </div>
            </div>
          </motion.button>
        ) : (
          <motion.div 
            key="expanded-panel"
            drag
            dragMomentum={false}
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.8 }}
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-[calc(100vw-2rem)] md:w-90 z-50 p-[8px] bg-gradient-to-b from-white/30 via-white/5 to-white/15 backdrop-blur-3xl rounded-[2.5rem] border border-white/40 shadow-[inset_0_4px_16px_rgba(255,255,255,0.45),_0_30px_70px_rgba(0,0,0,0.6),_0_0_40px_rgba(16,185,129,0.15)] cursor-grab active:cursor-grabbing text-white"
          >
            {/* Ambient glows within the liquid glass frame */}
            <div className="absolute -top-16 -left-16 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

            {/* Inner Dark Glass Plate */}
            <div className="relative bg-slate-950/90 rounded-[2.1rem] border border-white/10 overflow-hidden z-10 shadow-2xl">
              {/* Glass surface highlight glare */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 backdrop-blur-md relative z-10">
                <div>
                  <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">{t('repertory.activeAnalysis')}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <p className="text-emerald-300 text-[10px] font-extrabold uppercase tracking-widest">{analysis.length} {t('repertory.rubricsSelected')}</p>
                  </div>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsPanelExpanded(false); }}
                  className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center text-white/80 hover:text-white hover:border-white/25 transition-all"
                >
                  <ChevronDown size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-5 relative z-10">
                <div className="space-y-2.5">
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">{t('repertory.topRemedyMatches')}</p>
                  <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                    {topRemedies.length > 0 ? (
                      topRemedies.map((r, i) => (
                        <div 
                          key={r.name} 
                          className="flex items-center justify-between p-3 bg-white/5 border border-white/5 hover:border-emerald-500/25 hover:bg-white/10 rounded-2xl backdrop-blur-md transition-all duration-300"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-emerald-400 font-extrabold text-xs">{i + 1}.</span>
                            <span className="text-white/90 font-black text-[12px] uppercase tracking-wider">{r.name}</span>
                          </div>
                          <span className="text-emerald-300 font-black text-[12px] bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20">
                            {r.score} <span className="text-[8px] uppercase tracking-widest ml-0.5 opacity-60">pts</span>
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-[11px] text-white/35 italic py-4 text-center">{t('repertory.noRubricsSelected') || 'No rubrics added yet...'}</p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <button 
                    onClick={calculateRepertorization}
                    disabled={analysis.length === 0}
                    className="w-full py-4.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:via-teal-400 hover:to-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] shadow-lg shadow-emerald-500/20 border border-white/20 hover:border-white/45 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {t('repertory.viewDetailed')}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

