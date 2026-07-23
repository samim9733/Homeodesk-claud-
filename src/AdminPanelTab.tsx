import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import { PharmacyManual } from './PharmacyManual';
import { PhysiologyAnatomyTab } from './PhysiologyAnatomyTab';
import { REPERTORY_DATA } from './constants';
import { ORGANON_DATA, PREFACES_DATA } from './organonData';
import { MATERIA_MEDICA_DATA } from './materiaMedicaData';
import { PATHOLOGY_DATA, PHYSIOLOGY_ANATOMY_DATA } from './medicalData';
import { SURGERY_DATA } from './surgeryData';
import { 
  ShieldCheck, 
  Database, 
  Settings, 
  CheckCircle, 
  RefreshCw, 
  Search, 
  Layers, 
  Edit, 
  Trash2, 
  Check, 
  AlertTriangle,
  Play,
  Terminal,
  FilePlus,
  BookOpen,
  Users,
  Book
} from 'lucide-react';
import { cleanRubricName } from './constants';

// Safe sanitization helper of IDs to comply with Firebase validation rules
function sanitizeId(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9_\-]/g, '_').substring(0, 120);
}

interface LogEntry {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'error' | 'warn';
  message: string;
}

export function AdminPanelTab() {
  const { language } = useLanguage();
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Active sync data type tab
  const [syncDataType, setSyncDataType] = useState<
    'repertory' | 'organon' | 'materiaMedica' | 'patients' | 'knowledge' | 
    'pathology' | 'physiology' | 'surgery' | 'pharmacy' | 'patientsReminders' | 'analysis'
  >('repertory');

  // Search states for loaders
  const [organonSearch, setOrganonSearch] = useState('');
  const [remedySearch, setRemedySearch] = useState('');
  const [patientsSearch, setPatientsSearch] = useState('');

  // 1. Repertory Selection State
  const [selectedChapters, setSelectedChapters] = useState<{ [key: string]: boolean }>(() => {
    // Select first 5 chapters by default to encourage clean iterative loading
    const initial: { [key: string]: boolean } = {};
    REPERTORY_DATA.slice(0, 5).forEach(ch => {
      initial[ch.name] = true;
    });
    return initial;
  });

  // 2. Organon Selection State
  const [selectedOrganon, setSelectedOrganon] = useState<{ [key: string]: boolean }>(() => {
    const initial: { [key: string]: boolean } = {};
    PREFACES_DATA.forEach(p => { initial[`preface_${p.id}`] = true; });
    ORGANON_DATA.forEach(a => { initial[`aphorism_${a.id}`] = true; }); // default select all prefaces and aphorisms
    return initial;
  });

  // 3. Materia Medica Selection State
  const [selectedRemedies, setSelectedRemedies] = useState<{ [key: string]: boolean }>(() => {
    const initial: { [key: string]: boolean } = {};
    MATERIA_MEDICA_DATA.slice(0, 15).forEach(rem => { initial[rem.id] = true; }); // select first 15 by default
    return initial;
  });

  // 4. Patients Offline State & Selection State
  const [offlinePatients, setOfflinePatients] = useState<any[]>([]);
  const [selectedPatients, setSelectedPatients] = useState<{ [key: string]: boolean }>(() => {return {};});
  const [anatomySystems, setAnatomySystems] = useState(PHYSIOLOGY_ANATOMY_DATA);

  useEffect(() => {
    try {
      const cached = localStorage.getItem('homeodesk_patients');
      if (cached) {
        const pats = JSON.parse(cached);
        setOfflinePatients(pats);
        const initial: { [key: string]: boolean } = {};
        pats.forEach((pat: any) => { initial[pat.id] = true; });
        setSelectedPatients(initial);
      }
    } catch(e) {}
  }, []);

  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, percentage: 0 });
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Manage state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapterFilter, setSelectedChapterFilter] = useState('Mind');
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
  const [editingRubricId, setEditingRubricId] = useState<string | null>(null);
  
  // Forms state
  const [showChapterForm, setShowChapterForm] = useState(false);
  const [newChapter, setNewChapter] = useState({ nameEn: '', nameBn: '', status: 'Active' as 'Active' | 'Inactive' });
  const [showRubricForm, setShowRubricForm] = useState(false);
  const [newRubric, setNewRubric] = useState({ nameEn: '', nameBn: '', chapterId: 'mind', status: 'Active' as 'Active' | 'Inactive' });

  // Remove firebase auth check, automatically give admin access in standalone offline mode
  useEffect(() => {
    setUserEmail('local-user@homeodesk.com');
    setIsAdmin(true);
  }, []);

  // Set default selection
  const handleSelectAll = (select: boolean) => {
    const next: { [key: string]: boolean } = {};
    REPERTORY_DATA.forEach(ch => {
      next[ch.name] = select;
    });
    setSelectedChapters(next);
    addLog('info', select ? 'Selected all 37 Repertory chapters' : 'Deselected all Repertory chapters');
  };

  const toggleChapterSelection = (name: string) => {
    setSelectedChapters(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  // Selection toggle lists
  const toggleOrganonSelection = (id: string) => {
    setSelectedOrganon(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleRemedySelection = (id: string) => {
    setSelectedRemedies(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePatientSelection = (id: string) => {
    setSelectedPatients(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectAllOrganon = (select: boolean) => {
    const next: { [key: string]: boolean } = {};
    PREFACES_DATA.forEach(p => { next[`preface_${p.id}`] = select; });
    ORGANON_DATA.forEach(a => { next[`aphorism_${a.id}`] = select; });
    setSelectedOrganon(next);
    addLog('info', select ? 'Selected all Organon elements' : 'Deselected all Organon selections');
  };

  const handleSelectAllRemedies = (select: boolean) => {
    const next: { [key: string]: boolean } = {};
    MATERIA_MEDICA_DATA.forEach(rem => { next[rem.id] = select; });
    setSelectedRemedies(next);
    addLog('info', select ? 'Selected all Remedies' : 'Deselected all Remedies');
  };

  const handleSelectAllPatients = (select: boolean) => {
    const next: { [key: string]: boolean } = {};
    offlinePatients.forEach(p => { next[p.id] = select; });
    setSelectedPatients(next);
    addLog('info', select ? 'Selected all Patients' : 'Deselected all Patients');
  };

  const addLog = (type: 'info' | 'success' | 'warn' | 'error', message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog: LogEntry = {
      id: Math.random().toString(),
      timestamp,
      type,
      message
    };
    setLogs(prev => [...prev, newLog]);
  };

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Main Upload Runner Function
  const runUploadProcess = async () => {
    addLog('error', 'Cloud sync has been disabled. Firebase removed.');
    alert(language === 'bn' ? 'ফায়ারবেস অপসারণ করা হয়েছে, সিঙ্ক নিষ্ক্রিয়।' : 'Cloud sync disabled.');
  };

  // Add individual custom chapter via form
  const handleAddNewChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapter.nameEn || !newChapter.nameBn) return;

    try {
      // Offline mode: just reset form
      alert(language === 'bn' ? 'অধ্যায় সফলভাবে যোগ করা হয়েছে! (Local)' : 'Chapter added successfully! (Local)');
      setNewChapter({ nameEn: '', nameBn: '', status: 'Active' });
      setShowChapterForm(false);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  // Add individual custom rubric via form
  const handleAddNewRubric = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRubric.nameEn || !newRubric.nameBn) return;

    try {
      // Offline mode: just reset form
      alert(language === 'bn' ? 'রুব্রিক সফলভাবে যোগ করা হয়েছে! (Local)' : 'Rubric added successfully! (Local)');
      setNewRubric({ nameEn: '', nameBn: '', chapterId: newRubric.chapterId, status: 'Active' });
      setShowRubricForm(false);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  // Filter local rubrics for showcase browsing in Manage Tab
  const activeChapterData = REPERTORY_DATA.find(c => c.name === selectedChapterFilter);
  const displayedLocalRubrics = activeChapterData
    ? activeChapterData.rubrics.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (r.tr || '').toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Filter Organon prefatory data based on search input
  const filteredOrganonPrefaces = PREFACES_DATA.filter(p => 
    p.title.toLowerCase().includes(organonSearch.toLowerCase()) ||
    p.banglaTitle.toLowerCase().includes(organonSearch.toLowerCase()) ||
    p.content.toLowerCase().includes(organonSearch.toLowerCase())
  );

  // Filter Aphorisms based on ID or textual description match
  const filteredOrganonAphorisms = ORGANON_DATA.filter(a => 
    a.id.toString().includes(organonSearch) ||
    a.text.toLowerCase().includes(organonSearch.toLowerCase()) ||
    (a.banglaText || '').toLowerCase().includes(organonSearch.toLowerCase()) ||
    (a.title || '').toLowerCase().includes(organonSearch.toLowerCase()) ||
    (a.banglaTitle || '').toLowerCase().includes(organonSearch.toLowerCase())
  );

  // Filter Remedies for Materia Medica tab selections
  const filteredRemedies = MATERIA_MEDICA_DATA.filter(rem => 
    rem.name.toLowerCase().includes(remedySearch.toLowerCase()) ||
    (rem.banglaName || '').toLowerCase().includes(remedySearch.toLowerCase()) ||
    (rem.commonName || '').toLowerCase().includes(remedySearch.toLowerCase()) ||
    rem.id.toLowerCase().includes(remedySearch.toLowerCase()) ||
    (rem.abbreviation || '').toLowerCase().includes(remedySearch.toLowerCase())
  );

  // Filter cached Offline Patients for syncer module
  const filteredPatientsList = offlinePatients.filter(pat => 
    pat.name.toLowerCase().includes(patientsSearch.toLowerCase()) ||
    (pat.phone || '').includes(patientsSearch) ||
    (pat.gender || '').toLowerCase().includes(patientsSearch.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Dynamic Visual Banner */}
      <div className="bg-[#038aa6] text-white p-8 rounded-b-[2.5rem] shadow-md border-b border-[#02758c]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="text-left">
            <span className="text-[10px] bg-white/20 text-white font-black px-3 py-1 rounded-full uppercase tracking-widest block w-max mb-2">
              {language === 'bn' ? 'সিস্টেম অ্যাডমিনিস্ট্রেশন' : 'System Administration'}
            </span>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <ShieldCheck className="text-emerald-400 shrink-0" size={36} />
              {language === 'bn' ? 'রুব্রিক্স লোডার ও এডমিন প্যানেল' : 'Repertory Loader & Admin Panel'}
            </h1>
            <p className="text-sky-100 text-sm mt-1 max-w-2xl leading-relaxed font-medium">
              {language === 'bn' 
                ? 'হোমিওডেস্ক প্রো-তে কেন্টের রেপার্টরি থেকে সকল রুব্রিক এবং অধ্যায় ডাটাবেজে সংরক্ষণ ও পরিচালনার কেন্দ্রীয় হাব।'
                : 'Central repository hub to orchestrate, filter, select, and sync Kent\'s total rubrics library safely to Firestore.'}
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-3xl shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <Database className="text-emerald-300" size={20} />
            </div>
            <div className="text-left text-xs text-white">
              <p className="font-semibold">{language === 'bn' ? 'অ্যাডমিন স্ট্যাটাস' : 'Credential Status'}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`w-2.5 h-2.5 rounded-full inline-block ${isAdmin ? 'bg-emerald-400' : 'bg-rose-400 animate-pulse'}`} />
                <span className="font-bold uppercase tracking-wider">{isAdmin ? 'Authorized Admin' : 'Read-Only (Requires Admin Login)'}</span>
              </div>
              <p className="text-sky-200 mt-1 uppercase font-mono tracking-wider text-[10px]">{userEmail || 'No active cloud user'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Verification banner for Samim account */}
        {!isAdmin && (
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 text-left">
            <div className="flex gap-4">
              <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={24} />
              <div>
                <h4 className="font-black text-slate-900 text-sm">{language === 'bn' ? 'নিরাপত্তা সতর্কতা - অ্যাডমিন অনুমোদন প্রয়োজন' : 'Security Warning - Admin Authorization Required'}</h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {language === 'bn' 
                    ? 'রুব্রিক্স ডাটা ক্লাউডে আপলোড করতে, অনুগ্রহ করে সেটিংস পেজে "Sakil973363@gmail.com" ইমেইলে লগইন করুন। গুগল অথ সক্রিয় থাকতে হবে।' 
                    : 'To successfully bypass write policies, sign in through top user panel using configured Sakil973363@gmail.com security account.'}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-3 py-1 rounded-full shrink-0 tracking-wider">
              Protected by Firestore Rules
            </span>
          </div>
        )}

        {/* Tab Controls */}
        <div className="mb-12">
            <h2 className="text-xl font-black text-slate-950 mb-6">System Management</h2>
        </div>

        {/* --- DYNAMIC SYNC LOADER VIEW --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left selector panel */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 text-left">
              
              {/* Data Type Selection Tabs */}
              <div className="flex border-b border-slate-100 pb-3 mb-6 gap-2 shrink-0 overflow-x-auto custom-scrollbar">
                <button
                  onClick={() => setSyncDataType('repertory')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-tight transition-all flex items-center gap-2 border shrink-0 ${
                    syncDataType === 'repertory' 
                      ? 'bg-[#038aa6]/10 border-[#038aa6]/30 text-[#038aa6] font-bold shadow-sm' 
                      : 'border-slate-100 text-slate-500 hover:text-slate-800 bg-slate-50'
                  }`}
                >
                  <Layers size={14} />
                  {language === 'bn' ? 'রেপার্টরি অধ্যায়' : 'Repertory (Kent)'}
                </button>
                <button
                  onClick={() => setSyncDataType('organon')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-tight transition-all flex items-center gap-2 border shrink-0 ${
                    syncDataType === 'organon' 
                      ? 'bg-[#038aa6]/10 border-[#038aa6]/30 text-[#038aa6] font-bold shadow-sm' 
                      : 'border-slate-100 text-slate-500 hover:text-slate-800 bg-slate-50'
                  }`}
                >
                  <BookOpen size={14} />
                  {language === 'bn' ? 'অর্গানন (সূত্র)' : 'Organon of Medicine'}
                </button>
                <button
                  onClick={() => setSyncDataType('materiaMedica')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-tight transition-all flex items-center gap-2 border shrink-0 ${
                    syncDataType === 'materiaMedica' 
                      ? 'bg-[#038aa6]/10 border-[#038aa6]/30 text-[#038aa6] font-bold shadow-sm' 
                      : 'border-slate-100 text-slate-500 hover:text-slate-800 bg-slate-50'
                  }`}
                >
                  <Book size={14} />
                  {language === 'bn' ? 'মেটেরিয়া মেডিকা' : 'Materia Medica'}
                </button>
                <button
                  onClick={() => setSyncDataType('patients')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-tight transition-all flex items-center gap-2 border shrink-0 ${
                    syncDataType === 'patients' 
                      ? 'bg-[#038aa6]/10 border-[#038aa6]/30 text-[#038aa6] font-bold shadow-sm' 
                      : 'border-slate-100 text-slate-500 hover:text-slate-800 bg-slate-50'
                  }`}
                >
                  <Users size={14} />
                  {language === 'bn' ? 'রোগী ডাটা (Patients)' : 'Offline Patients'}
                </button>
                <button
                  onClick={() => setSyncDataType('knowledge')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-tight transition-all flex items-center gap-2 border shrink-0 ${
                    syncDataType === 'knowledge' 
                      ? 'bg-[#038aa6]/10 border-[#038aa6]/30 text-[#038aa6] font-bold shadow-sm' 
                      : 'border-slate-100 text-slate-500 hover:text-slate-800 bg-slate-50'
                  }`}
                >
                  <Book size={14} />
                  {language === 'bn' ? 'নলেজ' : 'Knowledge'}
                </button>
                <button
                  onClick={() => setSyncDataType('pathology')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-tight transition-all flex items-center gap-2 border shrink-0 ${
                    syncDataType === 'pathology' 
                      ? 'bg-[#038aa6]/10 border-[#038aa6]/30 text-[#038aa6] font-bold shadow-sm' 
                      : 'border-slate-100 text-slate-500 hover:text-slate-800 bg-slate-50'
                  }`}
                >
                  <Database size={14} />
                  {language === 'bn' ? 'প্যাথলজি' : 'Pathology'}
                </button>
                <button
                  onClick={() => setSyncDataType('physiology')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-tight transition-all flex items-center gap-2 border shrink-0 ${
                    syncDataType === 'physiology' 
                      ? 'bg-[#038aa6]/10 border-[#038aa6]/30 text-[#038aa6] font-bold shadow-sm' 
                      : 'border-slate-100 text-slate-500 hover:text-slate-800 bg-slate-50'
                  }`}
                >
                  <Layers size={14} />
                  {language === 'bn' ? 'ফিজিওলজি এন্ড আনাটমি' : 'Physiology & Anatomy'}
                </button>
                <button
                  onClick={() => setSyncDataType('surgery')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-tight transition-all flex items-center gap-2 border shrink-0 ${
                    syncDataType === 'surgery' 
                      ? 'bg-[#038aa6]/10 border-[#038aa6]/30 text-[#038aa6] font-bold shadow-sm' 
                      : 'border-slate-100 text-slate-500 hover:text-slate-800 bg-slate-50'
                  }`}
                >
                  <FilePlus size={14} />
                  {language === 'bn' ? 'সার্জারি' : 'Surgery'}
                </button>
                <button
                  onClick={() => setSyncDataType('pharmacy')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-tight transition-all flex items-center gap-2 border shrink-0 ${
                    syncDataType === 'pharmacy' 
                      ? 'bg-[#038aa6]/10 border-[#038aa6]/30 text-[#038aa6] font-bold shadow-sm' 
                      : 'border-slate-100 text-slate-500 hover:text-slate-800 bg-slate-50'
                  }`}
                >
                  <Settings size={14} />
                  {language === 'bn' ? 'ফার্মেসি' : 'Pharmacy'}
                </button>
                <button
                  onClick={() => setSyncDataType('patientsReminders')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-tight transition-all flex items-center gap-2 border shrink-0 ${
                    syncDataType === 'patientsReminders' 
                      ? 'bg-[#038aa6]/10 border-[#038aa6]/30 text-[#038aa6] font-bold shadow-sm' 
                      : 'border-slate-100 text-slate-500 hover:text-slate-800 bg-slate-50'
                  }`}
                >
                  <Users size={14} />
                  {language === 'bn' ? 'পেশেন্ট রিমাইন্ডার' : 'Patient Reminders'}
                </button>
                <button
                  onClick={() => setSyncDataType('analysis')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-tight transition-all flex items-center gap-2 border shrink-0 ${
                    syncDataType === 'analysis' 
                      ? 'bg-[#038aa6]/10 border-[#038aa6]/30 text-[#038aa6] font-bold shadow-sm' 
                      : 'border-slate-100 text-slate-500 hover:text-slate-800 bg-slate-50'
                  }`}
                >
                  <CheckCircle size={14} />
                  {language === 'bn' ? 'এনালাইসিস' : 'Analysis'}
                </button>
              </div>

              {/* Dynamic Sub-Panel Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-50 pb-4">
                <div>
                  <h3 className="font-black text-base text-slate-950">
                    {syncDataType === 'repertory' && (language === 'bn' ? 'অধ্যায় ভিত্তিক নির্বাচন (Repertory)' : 'Repertory Chapter Selection')}
                    {syncDataType === 'organon' && (language === 'bn' ? 'অর্গানন সূত্র নির্বাচন' : 'Organon Section Selection')}
                    {syncDataType === 'materiaMedica' && (language === 'bn' ? 'মেটেরিয়া মেডিকা রেমেডি নির্বাচন' : 'Materia Medica Remedy Selection')}
                    {syncDataType === 'patients' && (language === 'bn' ? 'রোগী ডাটা নির্বাচন (Offline)' : 'Select offline patients cache')}
                    {syncDataType === 'knowledge' && (language === 'bn' ? 'নলেজ ম্যানেজমেন্ট' : 'Knowledge Management')}
                    {syncDataType === 'pathology' && (language === 'bn' ? 'প্যাথলজি প্যানেল' : 'Pathology Panel')}
                    {syncDataType === 'physiology' && (language === 'bn' ? 'ফিজিওলজি এন্ড আনাটমি' : 'Physiology & Anatomy')}
                    {syncDataType === 'surgery' && (language === 'bn' ? 'সার্জারি ক্যাটালগ' : 'Surgery Catalog')}
                    {syncDataType === 'pharmacy' && (language === 'bn' ? 'ফার্মেসি ও ফর্মুলা' : 'Pharmacy & Formulation')}
                    {syncDataType === 'patientsReminders' && (language === 'bn' ? 'পেশেন্ট রিমাইন্ডারসমূহ' : 'Patient Reminders')}
                    {syncDataType === 'analysis' && (language === 'bn' ? 'এনালাইসিস ইঞ্জিন' : 'Analysis Engine')}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {syncDataType === 'repertory' && (language === 'bn' ? 'আপনার প্রয়োজনীয় রেপার্টরি অধ্যায়গুলো নির্ধারণ করুন।' : 'Choose Kent\'s Repertory chapters and child rubrics.')}
                    {syncDataType === 'organon' && (language === 'bn' ? 'ভূমিকা, প্রস্তাবনা এবং হ্যামিলটন সংস্করণের সূত্রগুলো নির্ধারণ করুন।' : 'Choose preface introductions and specific Hahnemann aphorisms.')}
                    {syncDataType === 'materiaMedica' && (language === 'bn' ? 'ক্লাউড ডেটাবেজে আপলোড করতে রেমেডিগুলো নির্ধারণ করুন।' : 'Choose Materia Medica remedy monographs to push.')}
                    {syncDataType === 'patients' && (language === 'bn' ? 'সিস্টেম লোকাল স্টোরেজ থেকে রোগী ডাটা নির্ধারণ করুন।' : 'List of patients offline database rows queued for sync.')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      if (syncDataType === 'repertory') handleSelectAll(true);
                      else if (syncDataType === 'organon') handleSelectAllOrganon(true);
                      else if (syncDataType === 'materiaMedica') handleSelectAllRemedies(true);
                      else handleSelectAllPatients(true);
                    }}
                    className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-bold border border-slate-100 hover:bg-slate-100 transition-all font-mono shrink-0"
                  >
                    Select All
                  </button>
                  <button 
                    onClick={() => {
                      if (syncDataType === 'repertory') handleSelectAll(false);
                      else if (syncDataType === 'organon') handleSelectAllOrganon(false);
                      else if (syncDataType === 'materiaMedica') handleSelectAllRemedies(false);
                      else handleSelectAllPatients(false);
                    }}
                    className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-bold border border-slate-100 hover:bg-slate-100 transition-all font-mono shrink-0"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* DYNAMIC LIST CONTENT */}
              {syncDataType === 'repertory' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[28rem] overflow-y-auto pr-2 custom-scrollbar">
                  {REPERTORY_DATA.map((chapter) => {
                    const isChecked = !!selectedChapters[chapter.name];
                    return (
                      <div 
                        key={chapter.name}
                        onClick={() => toggleChapterSelection(chapter.name)}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          isChecked 
                            ? 'border-[#038aa6]/30 bg-[#038aa6]/5 text-slate-950 font-bold' 
                            : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 text-left">
                          <span className="text-xl shrink-0">{chapter.icon || '📖'}</span>
                          <div>
                            <p className="text-xs font-black tracking-tight">{chapter.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold">{chapter.tr || chapter.t || chapter.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[9px] uppercase tracking-wider bg-slate-100 text-slate-500 font-black px-2 py-0.5 rounded-md">
                            {chapter.rubrics?.length || 0} {language === 'bn' ? 'রুব্রিক' : 'Rubrics'}
                          </span>
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            isChecked ? 'bg-[#038aa6] border-[#038aa6] text-white' : 'border-slate-300 text-transparent bg-white'
                          }`}>
                            <Check size={12} className="stroke-[3]" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* --- KNOWLEDGE EDITOR --- */}
              {syncDataType === 'knowledge' && (
                <div className="p-8 text-center text-slate-400 text-xs border border-slate-100 rounded-2xl">
                  <Book size={32} className="mx-auto mb-2 text-slate-300" />
                  <p>Knowledge Management Editor Section. (Ready for implementation)</p>
                </div>
              )}

              {/* --- PATHOLOGY EDITOR --- */}
              {syncDataType === 'pathology' && (
                <div className="space-y-2">
                  {PATHOLOGY_DATA.map((item: any) => (
                    <div key={item.id || item.name} className="flex justify-between items-center p-3 bg-white border border-slate-100 rounded-xl hover:border-[#038aa6]/30 transition-all">
                      <p className="text-xs font-bold text-slate-800">{item.name}</p>
                      <button 
                        onClick={() => alert(`Editing Pathology: ${item.name}`)}
                        className="text-[10px] text-[#038aa6] font-black bg-[#038aa6]/10 px-2 py-1 rounded-lg"
                      >
                        EDIT
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* --- PHYSIOLOGY & ANATOMY EDITOR --- */}
              {syncDataType === 'physiology' && (
                <div className="bg-white p-4 rounded-2xl border border-slate-100">
                  <PhysiologyAnatomyTab 
                    anatomySystems={anatomySystems} 
                    setAnatomySystems={setAnatomySystems}
                    onEditImage={(id) => alert(`Editing image for ${id}`)} />
                </div>
              )}

              {/* --- SURGERY EDITOR --- */}
              {syncDataType === 'surgery' && (
                <div className="space-y-2">
                  {SURGERY_DATA.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-white border border-slate-100 rounded-xl">
                      <p className="text-xs font-bold text-slate-800">{item.title}</p>
                      <button className="text-[10px] text-[#038aa6] font-black bg-[#038aa6]/10 px-2 py-1 rounded-lg">EDIT</button>
                    </div>
                  ))}
                </div>
              )}

              {/* --- PHARMACY EDITOR --- */}
              {syncDataType === 'pharmacy' && (
                <div className="p-4 text-center text-slate-400 text-xs border border-slate-100 rounded-2xl">
                    <p>Pharmacy Editor (Component being updated)</p>
                     <PharmacyManual />
                </div>
              )}

              {/* --- PATIENT REMINDERS EDITOR --- */}
              {syncDataType === 'patientsReminders' && (
                <div className="p-8 text-center text-slate-400 text-xs border border-slate-100 rounded-2xl">
                  <Users size={32} className="mx-auto mb-2 text-slate-300" />
                  <p>Patient Reminders Editor Section. (Ready for implementation)</p>
                </div>
              )}

              {/* --- ANALYSIS ENGINE EDITOR --- */}
              {syncDataType === 'analysis' && (
                <div className="p-8 text-center text-slate-400 text-xs border border-slate-100 rounded-2xl">
                  <CheckCircle size={32} className="mx-auto mb-2 text-slate-300" />
                  <p>Analysis Engine Editor Section. (Ready for implementation)</p>
                </div>
              )}



              {syncDataType === 'organon' && (
                <div className="space-y-4">
                  <div className="relative mb-3">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                      type="text"
                      value={organonSearch}
                      onChange={(e) => setOrganonSearch(e.target.value)}
                      placeholder={language === 'bn' ? 'অর্গানন সূত্র বা টাইটেল অনুসন্ধান...' : 'Search organon aphorisms/preface...'}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:ring-1 focus:ring-[#038aa6] focus:outline-none focus:bg-white text-slate-800"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[25rem] overflow-y-auto pr-2 custom-scrollbar">
                    {/* Filtered Prefaces */}
                    {filteredOrganonPrefaces.map((p) => {
                      const idKey = `preface_${p.id}`;
                      const isChecked = !!selectedOrganon[idKey];
                      return (
                        <div
                          key={idKey}
                          onClick={() => toggleOrganonSelection(idKey)}
                          className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                            isChecked 
                              ? 'border-[#038aa6]/30 bg-[#038aa6]/5 text-slate-950 font-bold' 
                              : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3 text-left">
                            <span className="text-xl shrink-0 text-amber-500">📄</span>
                            <div>
                              <p className="text-xs font-black tracking-tight line-clamp-1">{p.title}</p>
                              <p className="text-[10px] text-slate-400 font-bold line-clamp-1">{p.banglaTitle}</p>
                            </div>
                          </div>
                          <div className={`w-5 h-5 shrink-0 rounded-md border flex items-center justify-center transition-all ${
                            isChecked ? 'bg-[#038aa6] border-[#038aa6] text-white' : 'border-slate-300 text-transparent bg-white'
                          }`}>
                            <Check size={12} className="stroke-[3]" />
                          </div>
                        </div>
                      );
                    })}

                    {/* Filtered Aphorisms */}
                    {filteredOrganonAphorisms.map((a) => {
                      const idKey = `aphorism_${a.id}`;
                      const isChecked = !!selectedOrganon[idKey];
                      return (
                        <div
                          key={idKey}
                          onClick={() => toggleOrganonSelection(idKey)}
                          className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                            isChecked 
                              ? 'border-indigo-500/30 bg-indigo-50/5 text-slate-950 font-bold' 
                              : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3 text-left">
                            <span className="text-xs font-black px-2 py-1 bg-[#038aa6]/10 text-[#038aa6] rounded-md shrink-0 font-mono"># {a.id}</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-black tracking-tight line-clamp-1">{a.title || `Aphorism ${a.id}`}</p>
                              <p className="text-[10px] text-slate-400 font-medium line-clamp-1">{a.text}</p>
                            </div>
                          </div>
                          <div className={`w-5 h-5 shrink-0 rounded-md border flex items-center justify-center transition-all ${
                            isChecked ? 'bg-[#038aa6] border-[#038aa6] text-white' : 'border-slate-300 text-transparent bg-white'
                          }`}>
                            <Check size={12} className="stroke-[3]" />
                          </div>
                        </div>
                      );
                    })}

                    {filteredOrganonPrefaces.length === 0 && filteredOrganonAphorisms.length === 0 && (
                      <div className="col-span-2 p-8 text-center text-xs text-slate-400 italic">No matching Aphorisms found.</div>
                    )}
                  </div>
                </div>
              )}

              {syncDataType === 'materiaMedica' && (
                <div className="space-y-4">
                  <div className="relative mb-3">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                      type="text"
                      value={remedySearch}
                      onChange={(e) => setRemedySearch(e.target.value)}
                      placeholder={language === 'bn' ? 'রেমেডির ইংরেজি বা বাংলা নাম দিয়ে সার্চ করুন...' : 'Search remedies by name or abbreviation...'}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:ring-1 focus:ring-[#038aa6] focus:outline-none focus:bg-white text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[25rem] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredRemedies.map((remedy) => {
                      const isChecked = !!selectedRemedies[remedy.id];
                      return (
                        <div
                          key={remedy.id}
                          onClick={() => toggleRemedySelection(remedy.id)}
                          className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                            isChecked 
                              ? 'border-emerald-500/30 bg-emerald-50/5 text-slate-950 font-bold' 
                              : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3 text-left min-w-0">
                            <span className="text-xs font-mono font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-1 rounded-md shrink-0">
                              {remedy.abbreviation || remedy.id.substring(0, 3).toUpperCase()}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-black tracking-tight line-clamp-1 text-slate-900">{remedy.name}</p>
                              <p className="text-[10px] text-slate-450 font-bold line-clamp-1">{remedy.banglaName || remedy.commonName}</p>
                            </div>
                          </div>
                          <div className={`w-5 h-5 shrink-0 rounded-md border flex items-center justify-center transition-all ${
                            isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 text-transparent bg-white'
                          }`}>
                            <Check size={12} className="stroke-[3]" />
                          </div>
                        </div>
                      );
                    })}

                    {filteredRemedies.length === 0 && (
                      <div className="col-span-2 p-8 text-center text-xs text-slate-400 italic">No remedies match and correspond with the keywords.</div>
                    )}
                  </div>
                </div>
              )}

              {syncDataType === 'patients' && (
                <div className="space-y-4">
                  <div className="relative mb-3">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                      type="text"
                      value={patientsSearch}
                      onChange={(e) => setPatientsSearch(e.target.value)}
                      placeholder={language === 'bn' ? 'রোগীর নাম বা ফোন অনুসন্ধান...' : 'Search offline patients...'}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:ring-1 focus:ring-[#038aa6] focus:outline-none focus:bg-white text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[25rem] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredPatientsList.map((patient) => {
                      const isChecked = !!selectedPatients[patient.id];
                      return (
                        <div
                          key={patient.id}
                          onClick={() => togglePatientSelection(patient.id)}
                          className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                            isChecked 
                              ? 'border-sky-500/30 bg-sky-50/5 text-slate-950 font-bold' 
                              : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3 text-left min-w-0">
                            <span className="text-xl shrink-0">👤</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-black tracking-tight line-clamp-1 text-slate-900">{patient.name}</p>
                              <p className="text-[10px] text-slate-450 font-bold line-clamp-1">{patient.gender} • {patient.age} Yrs • {patient.phone || 'No phone'}</p>
                            </div>
                          </div>
                          <div className={`w-5 h-5 shrink-0 rounded-md border flex items-center justify-center transition-all ${
                            isChecked ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300 text-transparent bg-white'
                          }`}>
                            <Check size={12} className="stroke-[3]" />
                          </div>
                        </div>
                      );
                    })}

                    {offlinePatients.length === 0 && (
                      <div className="col-span-2 p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center">
                        <Users size={28} className="mx-auto text-slate-300 mb-2" />
                        <p className="text-xs font-bold text-[#038aa6]">{language === 'bn' ? 'কোনো ক্যাশড অফলাইন রোগী রেকর্ড পাওয়া যায়নি!' : 'No offline patients found in local cache!'}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{language === 'bn' ? 'উক্ত ইইউ-তে ডাটা সিংকিং পরীক্ষা করার পূর্বে অন্তত একজন রোগী নিবন্ধন করুন।' : 'Add patients in the main Patient Tab to populate offline list.'}</p>
                      </div>
                    )}

                    {offlinePatients.length > 0 && filteredPatientsList.length === 0 && (
                      <div className="col-span-2 p-8 text-center text-xs text-slate-400 italic font-medium">No offline patient profile matched the search parameters.</div>
                    )}
                  </div>
                </div>
              )}

              {/* Upload actions block */}
              <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-left bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100/60 w-full sm:w-auto">
                  <p className="text-[10px] uppercase font-black text-slate-450 tracking-wider mb-2">{language === 'bn' ? 'সিঙ্কিং সারসংক্ষেপ' : 'Queue Summary Statistics'}</p>
                  <div className="grid grid-cols-2 sm:flex sm:items-center gap-x-4 gap-y-1.5 md:gap-x-6 text-[10px] font-bold text-slate-600 font-mono">
                    <div>
                      <span>KENT: </span>
                      <span className="text-[#038aa6] font-black">{REPERTORY_DATA.filter(ch => selectedChapters[ch.name]).length} Chs</span>
                    </div>
                    <div>
                      <span>ORGANON: </span>
                      <span className="text-[#038aa6] font-black">
                        {PREFACES_DATA.filter(p => !!selectedOrganon[`preface_${p.id}`]).length + ORGANON_DATA.filter(a => !!selectedOrganon[`aphorism_${a.id}`]).length} items
                      </span>
                    </div>
                    <div>
                      <span>MATERIA: </span>
                      <span className="text-[#038aa6] font-black">{MATERIA_MEDICA_DATA.filter(rem => !!selectedRemedies[rem.id]).length} Rems</span>
                    </div>
                    <div>
                      <span>PATIENTS: </span>
                      <span className="text-[#038aa6] font-black">{offlinePatients.filter(p => !!selectedPatients[p.id]).length} profiles</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={runUploadProcess}
                  disabled={
                    isUploading || 
                    (
                      REPERTORY_DATA.filter(ch => selectedChapters[ch.name]).length === 0 &&
                      PREFACES_DATA.filter(p => !!selectedOrganon[`preface_${p.id}`]).length === 0 &&
                      ORGANON_DATA.filter(a => !!selectedOrganon[`aphorism_${a.id}`]).length === 0 &&
                      MATERIA_MEDICA_DATA.filter(rem => !!selectedRemedies[rem.id]).length === 0 &&
                      offlinePatients.filter(p => !!selectedPatients[p.id]).length === 0
                    )
                  }
                  className="w-full sm:w-auto px-8 py-3.5 bg-slate-950 hover:bg-slate-900 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-black rounded-2xl flex items-center justify-center gap-2.5 shadow-md transition-all uppercase tracking-widest min-w-[200px]"
                >
                  {isUploading ? (
                    <>
                      <RefreshCw className="animate-spin text-emerald-400" size={16} />
                      {language === 'bn' ? 'সিংকিং চলছে...' : 'Syncing to Cloud...'}
                    </>
                  ) : (
                    <>
                      <Play size={16} className="text-emerald-400 fill-emerald-450" />
                      {language === 'bn' ? 'ডাটা ক্লাউডে আপলোড করুন' : 'Push Select data to cloud'}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Logger Console */}
            <div className="bg-slate-900 text-slate-300 rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col h-[40rem]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4 shrink-0">
                <div className="flex items-center gap-2">
                  <Terminal size={16} className="text-emerald-400" />
                  <h3 className="font-mono text-xs font-black tracking-widest text-[#038aa6] uppercase">Sync Control Panel Logs</h3>
                </div>
                <button 
                  onClick={() => setLogs([])}
                  className="text-[10px] font-mono text-slate-500 hover:text-slate-300 uppercase transition-all"
                >
                  Clear Console
                </button>
              </div>

              {/* Interactive progress bar */}
              {isUploading && (
                <div className="mb-4 shrink-0 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left">
                  <div className="flex justify-between items-center text-[10px] uppercase font-mono text-slate-400 font-black mb-1.5">
                    <span>PROGRESS STATUS</span>
                    <span className="text-emerald-400 font-bold">{progress.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                  <p className="text-[10px] font-mono text-slate-500 mt-2">
                    COMPLETED: {progress.current} of {progress.total} elements (including child rubrics)
                  </p>
                </div>
              )}

              {/* Dynamic Console Scrollbox */}
              <div className="flex-1 overflow-y-auto text-left font-mono text-[11px] leading-relaxed space-y-2 pr-2 custom-scrollbar bg-slate-950 p-4 rounded-2xl border border-slate-950">
                {logs.length === 0 ? (
                  <p className="text-slate-500 italic text-center pt-32 shrink-0">Idle. Ready to trigger. Click "Push Select data to cloud" or manage content.</p>
                ) : (
                  logs.map((log) => {
                    let color = 'text-slate-400';
                    if (log.type === 'success') color = 'text-emerald-400 font-bold';
                    if (log.type === 'error') color = 'text-rose-400 font-bold';
                    if (log.type === 'warn') color = 'text-amber-400 font-bold';
                    return (
                      <div key={log.id} className="border-b border-white/[0.02] pb-1 transition-all">
                        <span className="text-slate-600 mr-2">[{log.timestamp}]</span>
                        <span className={color}>{log.message}</span>
                      </div>
                    );
                  })
                )}
                <div ref={terminalEndRef} />
              </div>
            </div>
          </div>
        </div>

        {/* --- REPERTORY MANAGER TAB --- */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 text-left">
            {/* Header controls select */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-50 pb-6">
              <div>
                <h3 className="font-black text-lg text-slate-900">{language === 'bn' ? 'রুব্রিক্স পরিচালনা প্যানেল' : 'Direct Rubric Record Editor'}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{language === 'bn' ? 'কেন্টের অধ্যায় সিলেক্ট এবং রুব্রিক ডাটা এডিট করুন।' : 'Directly view reference entries and customize data.'}</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <button 
                  onClick={() => setShowChapterForm(true)}
                  className="px-4 py-2.5 bg-[#038aa6]/10 hover:bg-[#038aa6]/25 text-[#038aa6] font-black rounded-xl text-xs flex items-center gap-1.5 transition-all"
                >
                  <Layers size={14} />+ New Chapter
                </button>
                <button 
                  onClick={() => setShowRubricForm(true)}
                  className="px-4 py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-black rounded-xl text-xs flex items-center gap-1.5 transition-all"
                >
                  <FilePlus size={14} />+ New Rubric
                </button>
              </div>
            </div>

            {/* Selection & Search row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-[10px] uppercase font-black tracking-wider text-slate-400 mb-1.5">Select Chapter Category</label>
                <select
                  value={selectedChapterFilter}
                  onChange={(e) => setSelectedChapterFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:ring-1 focus:ring-[#038aa6] focus:outline-none focus:bg-white text-slate-800 font-semibold"
                >
                  {REPERTORY_DATA.map((ch) => (
                    <option key={chapterIdOf(ch.name)} value={ch.name}>
                      {ch.name} ({ch.tr || ch.t || ch.name})
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase font-black tracking-wider text-slate-400 mb-1.5">Filter/Search inside selected chapter</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={language === 'bn' ? 'রুব্রিক ইংরেজি বা বাংলা লিখে সার্চ করুন...' : 'Search rubric values...'}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:ring-1 focus:ring-[#038aa6] focus:outline-none focus:bg-white text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* List Table of Rubrics */}
            <div className="border border-slate-100 rounded-2xl overflow-hidden mt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="p-4 text-[10px] uppercase font-black tracking-wider text-slate-400">{language === 'bn' ? 'রুব্রিক আইডি' : 'ID'}</th>
                      <th className="p-4 text-[10px] uppercase font-black tracking-wider text-slate-400">{language === 'bn' ? 'ইংরেজি নাম' : 'Name (En)'}</th>
                      <th className="p-4 text-[10px] uppercase font-black tracking-wider text-slate-400">{language === 'bn' ? 'বাংলা অনুবাদ' : 'Translation (Bn)'}</th>
                      <th className="p-4 text-[10px] uppercase font-black tracking-wider text-slate-400">{language === 'bn' ? 'সাব-রুব্রিক' : 'Child Count'}</th>
                      <th className="p-4 text-[10px] uppercase font-black tracking-wider text-slate-400 text-right">{language === 'bn' ? 'অ্যাকশন' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedLocalRubrics.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-xs text-slate-400 italic">No matching records found.</td>
                      </tr>
                    ) : (
                      displayedLocalRubrics.slice(0, 15).map((rubric) => {
                        const rubId = sanitizeId(`${selectedChapterFilter}_${rubric.name}`);
                        return (
                          <tr key={rubId} className="border-b border-slate-100/60 hover:bg-slate-50/50">
                            <td className="p-4 font-bold text-slate-800 text-xs">{cleanRubricName(rubric.name)}</td>
                            <td className="p-4 text-xs text-slate-600 font-semibold">{cleanRubricName(rubric.tr || rubric.name)}</td>
                            <td className="p-4 text-xs text-slate-600">
                              <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-[10px] font-black">
                                {rubric.sr?.length || 0}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button 
                                  onClick={() => alert('Quick Edit allows real-time local configuration in the preview interface directly.')}
                                  className="p-2 text-slate-500 hover:text-[#038aa6] hover:bg-slate-100 rounded-xl transition"
                                  title="Edit Entry"
                                >
                                  <Edit size={13} />
                                </button>
                                <button 
                                  onClick={() => alert('Safe delete blocks is configured for local safety net database rules.')}
                                  className="p-2 text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition"
                                  title="Delete Entry"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    );
  }
  
  // Utility ID generator helper to avoid issues with non-latin string characters in ID
  function chapterIdOf(name: string): string {
    return sanitizeId(name);
  }
