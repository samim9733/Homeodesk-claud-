import { Sidebar } from './AppComponents';
import { PatientDetailsCanvas, ReportHistoryModal } from './PatientModals';
import { QRScannerModal, AnalysisResultModal, ImageEditorModal } from './Modals';
import { Dashboard, PatientsTab, RepertoryTab } from './MainTabs';
import { RemindersTab, AnalysisTab } from './AnalysisRemindersTabs';
import { ReportPreviewModal } from './ReportPreviewModal';
import { MateriaMedicaTab } from './MateriaMedicaTab';
import { PhysiologyAnatomyTab } from './PhysiologyAnatomyTab';
import { AdminPanelTab } from './AdminPanelTab';
import React, { useState, useEffect } from 'react';
import { Leaf, Bell, Calendar, Menu, X, Search, FileText, Printer, QrCode, Loader2, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { PrescriptionCanvas } from './RxPreviewModal';
import { PharmacyTab, SettingsTab } from './PharmacyComponents';
import { OrganonTab, PracticeMedicineTab, KnowledgeTab, PathologyTab } from './LibraryTabs';
import { SurgeryTab } from './SurgeryTab';
import { Patient, AnalysisItem, Reminder, ChiefSymptom } from './types';
import { PHYSIOLOGY_ANATOMY_DATA } from './medicalData';
import { useLanguage } from './LanguageContext';

// --- Components ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const [patients, setPatients] = useState<Patient[]>(() => {
    const cached = localStorage.getItem('homeodesk_patients');
    return cached ? JSON.parse(cached) : [];
  });
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const cached = localStorage.getItem('homeodesk_reminders');
    return cached ? JSON.parse(cached) : [];
  });
  
  const [analysis, setAnalysis] = useState<AnalysisItem[]>([]);
  const [totalAnalysisRun, setTotalAnalysisRun] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [repertorizationResults, setRepertorizationResults] = useState<{name: string, score: number, count: number, maxScore: number, rubricMatches: any[]}[] | null>(null);
  const [selectedPatientForRx, setSelectedPatientForRx] = useState<Patient | null>(null);
  const [quickRemedyForRx, setQuickRemedyForRx] = useState<string | undefined>(undefined);
  const [nextRemedyForRx, setNextRemedyForRx] = useState<string | undefined>(undefined);
  const [selectedPatientForPD, setSelectedPatientForPD] = useState<Patient | null>(null);
  const [selectedPatientForReportHistory, setSelectedPatientForReportHistory] = useState<Patient | null>(null);
  const [preSelectedPatientId, setPreSelectedPatientId] = useState<string | null>(null);
  const [showGlobalReportPatient, setShowGlobalReportPatient] = useState<Patient | null>(null);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAIEditorOpen, setIsAIEditorOpen] = useState(false);
  const [editingSystemId, setEditingSystemId] = useState<string | null>(null);
  const [anatomySystems, setAnatomySystems] = useState(PHYSIOLOGY_ANATOMY_DATA);
  const [materiaComparison, setMateriaComparison] = useState<string[]>([]);
  const [signatureData, setSignatureData] = useState<string | null>(() => localStorage.getItem('doctorSignature'));
  const [doctorName, setDoctorName] = useState(() => localStorage.getItem('doctorName') || 'Dr. Samim Ahamed');
  const [doctorSpecialization, setDoctorSpecialization] = useState(() => localStorage.getItem('doctorSpecialization') || 'Chief Physician');
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Cache patients & reminders to localstorage as standard fallback
  useEffect(() => {
    localStorage.setItem('homeodesk_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('homeodesk_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    const handleStorageChange = () => {
      setSignatureData(localStorage.getItem('doctorSignature'));
      setDoctorName(localStorage.getItem('doctorName') || 'Dr. Samim Ahamed');
      setDoctorSpecialization(localStorage.getItem('doctorSpecialization') || 'Chief Physician');
    };
    window.addEventListener('signatureUpdated', handleStorageChange);
    window.addEventListener('doctorNameUpdated', handleStorageChange);
    window.addEventListener('doctorProfileUpdated', handleStorageChange);
    return () => {
      window.removeEventListener('signatureUpdated', handleStorageChange);
      window.removeEventListener('doctorNameUpdated', handleStorageChange);
      window.removeEventListener('doctorProfileUpdated', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);





  // Centralized Mock CRUD operators
  const addPatient = async (p: Omit<Patient, 'id' | 'date'>) => {
    const newPatient: Patient = {
      ...p,
      id: `PT-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString(),
      status: p.status || 'Active',
      lastVisit: new Date().toLocaleDateString()
    };

    setPatients(prev => [...prev, newPatient]);
    setPreSelectedPatientId(newPatient.id);
    setActiveTab('analysis');
  };

  const removePatient = async (id: string) => {
    setPatients(patients.filter(p => p.id !== id));
    setReminders(reminders.filter(r => r.patientId !== id));
  };

  const updatePatient = async (updatedPatient: Patient) => {
    setPatients(patients.map(p => p.id === updatedPatient.id ? updatedPatient : p));
  };

  const handleSetReminders = async (arg: any) => {
    const nextReminders = typeof arg === 'function' ? arg(reminders) : arg;
    setReminders(nextReminders);
  };

  const handleQRScan = async (data: string) => {
    setIsQRScannerOpen(false);
    setIsAnalyzing(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze the following data from a QR code scan. If it's a medical report or clinical data, identify any "faults" (abnormalities, issues, or concerns). If it's not medical data, summarize it and state that it's not a medical report. Provide the analysis in a clear, structured format using Markdown.

Data: ${data}`,
      });
      
      setAnalysisResult(response.text || "No analysis generated.");
    } catch (error) {
      console.error("Analysis failed:", error);
      setAnalysisResult("Failed to analyze the QR code data. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const addToAnalysis = (item: AnalysisItem | AnalysisItem[]) => {
    const items = Array.isArray(item) ? item : [item];
    setAnalysis(prev => {
      const updated = [...prev];
      items.forEach(it => {
        if (!updated.some(a => a.text === it.text)) {
          updated.push(it);
        }
      });
      return updated;
    });
    
    // Automatically carry selected repertory rubrics into the active
    // patient's ClinicalIntakeForm (patient.coreRubrics) so the
    // "Repertory Suggestions" section there shows them immediately.
    const activePatientId = preSelectedPatientId || (patients.length > 0 ? patients[0].id : null);
    if (activePatientId) {
      const p = patients.find(pat => pat.id === activePatientId);
      if (p) {
        const existingCoreRubrics = p.coreRubrics || [];
        const newCoreRubrics = items.filter(
          it => !existingCoreRubrics.some(a => a.text === it.text)
        );
        let updatedCoreRubrics = existingCoreRubrics;
        if (newCoreRubrics.length > 0) {
          updatedCoreRubrics = [...existingCoreRubrics, ...newCoreRubrics];
        }
        let updatedSymptoms = [...(p.chiefSymptoms || [])];
        let changed = newCoreRubrics.length > 0;
        
        items.forEach(it => {
          if (it.chapter !== 'Generalities') {
            const newSymptom: ChiefSymptom = {
              complaint: it.subrubric || it.rubric,
              location: it.chapter,
              sensation: '',
              modality: '',
              concomitant: '',
            };
            
            const alreadyExists = updatedSymptoms.some(s => s.complaint === newSymptom.complaint);
            if (!alreadyExists) {
              updatedSymptoms.push(newSymptom);
              changed = true;
            }
          }
        });
        
        if (changed) {
          const updatedPatient = {
            ...p,
            chiefSymptoms: updatedSymptoms,
            coreRubrics: updatedCoreRubrics
          };
          updatePatient(updatedPatient);
        }
      }
    }
  };

  const removeFromAnalysis = (idx: number) => {
    setAnalysis(analysis.filter((_, i) => i !== idx));
  };

  const runRepertorization = (results: any[]) => {
    setTotalAnalysisRun(prev => prev + 1);
    setRepertorizationResults(results);
  };

  const { t, language } = useLanguage();

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#0f172a] flex flex-col items-center justify-center z-[9999]">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-emerald-400 mb-4"
        >
          <Leaf size={64} />
        </motion.div>
        <h1 className="text-white text-3xl font-bold tracking-widest uppercase">
          HomeoDesk <span className="text-emerald-500">Pro</span>
        </h1>
        <p className="text-slate-400 mt-2 text-sm tracking-widest uppercase">Advanced Clinical Suite</p>
      </div>
    );
  }


  return (
    <div className="flex h-screen text-slate-800 bg-slate-50 overflow-hidden print:overflow-visible print:h-auto print:block">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          if (tab === 'materia') setMateriaComparison([]);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
        isOpen={isSidebarOpen} 
        toggleMenu={() => setIsSidebarOpen(!isSidebarOpen)} 
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        doctorName={doctorName}
        doctorSpecialization={doctorSpecialization}
      />
      
      <main className={`flex-1 flex flex-col min-w-0 overflow-hidden print:overflow-visible print:h-auto transition-[margin-left] duration-300 ease-in-out ${isSidebarCollapsed ? 'lg:ml-[80px]' : 'lg:ml-[260px]'} ml-0 print:ml-0 print:block print:w-full`}>
        <header className="h-16 md:h-20 bg-white border-b border-slate-100 flex items-center px-4 lg:px-8 gap-4 md:gap-8 justify-between shadow-sm z-10 print:hidden">
          <div className="flex items-center gap-2 md:gap-4 flex-1">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition lg:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="relative flex-1 w-full max-w-md">
              <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                placeholder={t('header.searchPlaceholder')} 
                className="w-full pl-9 md:pl-12 pr-3 md:pr-4 py-2 md:py-2.5 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden xl:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-100">
              <Calendar size={14} className="text-primary" />
              <span>{new Date().toLocaleDateString(language === 'en' ? 'en-US' : (language === 'bn' ? 'bn-BD' : 'hi-IN'), { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <button 
                onClick={() => setIsQRScannerOpen(true)}
                className="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 hover:bg-primary/5 hover:text-primary transition flex items-center justify-center border border-slate-100 shadow-sm cursor-pointer"
                title="Scan QR Code"
              >
                <QrCode size={20} />
              </button>
              <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 hover:bg-amber-50 hover:text-amber-600 transition flex items-center justify-center border border-slate-100 shadow-sm relative cursor-pointer">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-10 h-10 rounded-xl transition flex items-center justify-center border border-slate-100 shadow-sm cursor-pointer ${activeTab === 'settings' ? 'bg-primary/5 text-primary' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
              >
                <Settings size={20} />
              </button>
            </div>
            <div className="h-8 w-px bg-slate-100 hidden sm:block" />
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-slate-900 tracking-tight">
                  {doctorName}
                </p>
                <p className="text-[9px] font-bold text-[#038aa6] uppercase tracking-widest leading-none truncate max-w-[150px]">
                  {doctorSpecialization}
                </p>
              </div>
              <div className="relative group cursor-pointer" onClick={() => setActiveTab('settings')}>
                  <img 
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=faces&auto=format&q=80" 
                    alt={doctorName} 
                    className="w-10 h-10 rounded-xl object-cover shadow-sm ring-2 ring-transparent group-hover:ring-[#038aa6]/50 transition-all" 
                  />
                <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-white rounded-full bg-slate-300`}></div>
              </div>
            </div>
          </div>
        </header>

        <section className="flex-1 p-4 lg:p-8 overflow-y-auto print:hidden">
          <AnimatePresence mode="wait">
            {isQRScannerOpen && (
              <QRScannerModal 
                onClose={() => setIsQRScannerOpen(false)} 
                onScan={handleQRScan} 
              />
            )}
            {isAnalyzing && (
              <div className="fixed inset-0 bg-black/40 z-[90] flex items-center justify-center backdrop-blur-sm">
                <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4">
                  <Loader2 className="animate-spin text-emerald-500" size={48} />
                  <p className="font-bold text-slate-800">Analyzing QR Data...</p>
                  <p className="text-sm text-slate-500">Please wait while Gemini processes the information.</p>
                </div>
              </div>
            )}
            {analysisResult && (
              <AnalysisResultModal 
                result={analysisResult} 
                onClose={() => setAnalysisResult(null)} 
              />
            )}
            {isAIEditorOpen && editingSystemId && (
              <ImageEditorModal 
                imageUrl={anatomySystems.find(s => s.id === editingSystemId)?.image || ''}
                onClose={() => {
                  setIsAIEditorOpen(false);
                  setEditingSystemId(null);
                }}
                onUpdate={(newUrl) => {
                  setAnatomySystems(prev => prev.map(s => 
                    s.id === editingSystemId ? { ...s, image: newUrl } : s
                  ));
                }}
              />
            )}
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Dashboard 
                  patients={patients} 
                  analysisCount={totalAnalysisRun} 
                  reminders={reminders}
                  setActiveTab={setActiveTab}
                />
              </motion.div>
            )}
            {activeTab === 'patients' && (
              <motion.div
                key="patients"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <PatientsTab 
                  patients={patients} 
                  addPatient={addPatient} 
                  removePatient={removePatient}
                  setSelectedPatientForRx={setSelectedPatientForRx}
                  onOpenPD={setSelectedPatientForPD}
                  onOpenReportHistory={setSelectedPatientForReportHistory}
                  onSetReminder={(p) => {
                    setPreSelectedPatientId(p.id);
                    setActiveTab('reminders');
                  }}
                />
              </motion.div>
            )}
            {activeTab === 'reminders' && (
              <motion.div
                key="reminders"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <RemindersTab 
                  reminders={reminders} 
                  setReminders={handleSetReminders} 
                  patients={patients} 
                  preSelectedPatientId={preSelectedPatientId}
                  setPreSelectedPatientId={setPreSelectedPatientId}
                />
              </motion.div>
            )}
            {activeTab === 'repertory' && (
              <motion.div
                key="repertory"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <RepertoryTab 
                  analysis={analysis} 
                  addToAnalysis={addToAnalysis} 
                  runRepertorization={runRepertorization}
                  setActiveTab={setActiveTab}
                  searchQuery={globalSearchQuery}
                />
              </motion.div>
            )}
            {activeTab === 'analysis' && (
              <motion.div
                key="analysis"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <AnalysisTab 
                  onSetAnalysis={setAnalysis}
                  patients={patients} 
                  analysis={analysis} 
                  preSelectedPatientId={preSelectedPatientId}
                  onClearAnalysis={() => setAnalysis([])}
                  onRemoveRubric={removeFromAnalysis}
                  onAddAnalysis={addToAnalysis}
                  onTransferToRx={(patient, nextRemedy) => {
                    setSelectedPatientForRx(patient);
                    setNextRemedyForRx(nextRemedy);
                  }}
                  onCompare={(remedyA, remedyB) => {
                    setMateriaComparison([remedyA, remedyB]);
                    setActiveTab('materia');
                  }}
                  onUpdatePatient={updatePatient}
                  setActiveTab={setActiveTab}
                />
              </motion.div>
            )}
            {activeTab === 'organon' && (
              <motion.div
                key="organon"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <OrganonTab />
              </motion.div>
            )}
            {activeTab === 'practice' && (
              <motion.div
                key="practice"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <PracticeMedicineTab />
              </motion.div>
            )}
            {activeTab === 'knowledge' && (
              <motion.div
                key="knowledge"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <KnowledgeTab setActiveTab={setActiveTab} />
              </motion.div>
            )}
            {activeTab === 'pathology' && (
              <motion.div
                key="pathology"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <PathologyTab />
              </motion.div>
            )}
            {activeTab === 'materia' && (
              <motion.div
                key="materia"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <MateriaMedicaTab 
                  initialComparison={materiaComparison} 
                  onQuickPrescribe={(remedyName) => {
                    setQuickRemedyForRx(remedyName);
                    setSelectedPatientForRx({
                      id: `QUICK-${Math.floor(1000 + Math.random() * 9000)}`,
                      name: 'Walk-in Patient',
                      age: 0,
                      gender: 'Unspecified',
                      phone: '',
                      date: new Date().toLocaleDateString(),
                      chiefSymptoms: [],
                      physicalGenerals: []
                    });
                  }}
                />
              </motion.div>
            )}
            {activeTab === 'physiology' && (
              <motion.div
                key="physiology"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <PhysiologyAnatomyTab 
                  anatomySystems={anatomySystems}
                  setAnatomySystems={setAnatomySystems}
                  onEditImage={(id) => {
                    setEditingSystemId(id);
                    setIsAIEditorOpen(true);
                  }}
                />
              </motion.div>
            )}
            {activeTab === 'surgery' && (
              <motion.div
                key="surgery"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <SurgeryTab />
              </motion.div>
            )}
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <SettingsTab />
              </motion.div>
            )}
            {activeTab === 'pharmacy' && (
              <motion.div
                key="pharmacy"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <PharmacyTab />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Repertorization Results Modal */}
        <AnimatePresence>
          {repertorizationResults && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md overflow-hidden print:hidden">
              {/* Floating organic blobs inside the backdrop for the liquid glass depth */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-[120px] animate-pulse pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] rounded-full bg-teal-500/10 blur-[150px] animate-pulse pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-slate-800/20 blur-[130px] pointer-events-none" />

              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="w-full max-w-2xl p-[8px] bg-gradient-to-b from-white/30 via-white/5 to-white/15 backdrop-blur-3xl rounded-[2.5rem] border border-white/40 shadow-[inset_0_4px_16px_rgba(255,255,255,0.45),_0_30px_80px_rgba(0,0,0,0.6),_0_0_50px_rgba(16,185,129,0.1)] overflow-hidden flex flex-col max-h-[90vh] text-white relative animate-fade-in"
              >
                {/* Floating organic blobs inside the backdrop for the liquid glass depth */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/15 blur-[120px] animate-pulse pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] rounded-full bg-teal-500/15 blur-[150px] animate-pulse pointer-events-none" />

                {/* Inner High Contrast Dark Plate */}
                <div className="relative flex flex-col flex-1 bg-slate-950/90 rounded-[2.1rem] border border-white/10 overflow-hidden z-10 shadow-2xl">
                  {/* Glass surface highlight glare */}
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                  <div className="p-6 bg-white/5 text-white flex justify-between items-center border-b border-white/10 relative z-10 backdrop-blur-md">
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-[0.15em] bg-gradient-to-r from-white via-white to-emerald-300 bg-clip-text text-transparent">Repertorization Results</h3>
                      <p className="text-emerald-300/70 text-[10px] font-bold uppercase tracking-widest mt-1">Top remedies covering your selected rubrics</p>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setRepertorizationResults(null)}
                      className="p-2 hover:bg-white/10 rounded-full border border-white/10 transition-all text-white/80"
                    >
                      <X size={24} />
                    </motion.button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar relative z-10">
                    <div className="grid grid-cols-1 gap-3.5">
                      {repertorizationResults.map((res, i) => (
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          key={res.name} 
                          className="flex items-center gap-4.5 p-5 bg-white/5 border border-white/5 hover:border-emerald-500/30 hover:bg-white/10 backdrop-blur-md rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.15)] transition-all duration-300 group relative overflow-hidden"
                        >
                          {/* Inner soft radial highlight on hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
                            {i + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <h4 className="font-black text-white text-lg uppercase tracking-wider truncate group-hover:text-emerald-200 transition-colors">{res.name}</h4>
                              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl shadow-[0_2px_12px_rgba(16,185,129,0.08)] group-hover:border-emerald-400/45 group-hover:shadow-[0_2px_18px_rgba(16,185,129,0.18)] transition-all duration-300">
                                <span className="text-emerald-400 font-black text-xl md:text-2xl drop-shadow-[0_0_10px_rgba(52,211,153,0.4)] tracking-tight">{res.score}</span>
                                <span className="text-emerald-300/60 text-[9px] font-black uppercase tracking-widest pl-0.5">pts</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 mt-2.5">
                              <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(res.score / (repertorizationResults[0]?.score || 1)) * 100}%` }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-[0_0_14px_rgba(52,211,153,0.5)]" 
                                />
                              </div>
                              <span className="text-[10px] font-extrabold text-white/50 uppercase tracking-widest whitespace-nowrap bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                                Covers {res.count} / {analysis.length} rubrics
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {repertorizationResults.length === 0 && (
                      <div className="text-center py-16 text-white/40">
                        <p className="text-xs font-bold uppercase tracking-widest">No matching remedies found</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5 md:p-6 border-t border-white/10 bg-white/5 backdrop-blur-md flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <motion.button 
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => window.print()}
                        className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-black/10 transition-all flex items-center justify-center gap-2"
                      >
                        <Printer size={16} /> Print Analysis
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          if (patients.length > 0) {
                            setSelectedPatientForRx(patients[0]);
                            setRepertorizationResults(null);
                          } else {
                            alert("Please add a patient first to create a prescription.");
                            setActiveTab('patients');
                          }
                        }}
                        className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-white border border-white/25 rounded-xl text-xs font-black uppercase tracking-[0.15em] shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
                      >
                        <FileText size={16} /> Transfer to Rx
                      </motion.button>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRepertorizationResults(null)}
                      className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/5 hover:border-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                    >
                      Close Results
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Print-only Analysis View */}
        <div className="hidden print:block global-print-target print-target p-10 bg-white min-h-screen text-slate-900">
          <div className="text-center mb-10 pb-6 border-b-2 border-slate-900">
            <h1 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tighter">HomeoDesk Pro Analysis Report</h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Kent's Repertory Clinical Analysis</p>
            <p className="text-[10px] text-slate-400 mt-2 font-mono">Generated on: {new Date().toLocaleString()}</p>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-black text-slate-900 mb-4 border-l-4 border-slate-900 pl-3 uppercase tracking-tight">Selected Rubrics</h2>
            <div className="grid grid-cols-1 gap-2">
              {analysis.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-black text-slate-900">{idx + 1}.</span>
                  <div>
                    <p className="font-black text-slate-900 uppercase tracking-tight">{item.text}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.chapter}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black text-slate-900 mb-4 border-l-4 border-slate-900 pl-3 uppercase tracking-tight">Repertorization Results</h2>
            <table className="w-full border-collapse border border-slate-900">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="border border-slate-900 p-3 text-left text-[10px] uppercase tracking-widest">Rank</th>
                  <th className="border border-slate-900 p-3 text-left text-[10px] uppercase tracking-widest">Remedy Name</th>
                  <th className="border border-slate-900 p-3 text-center text-[10px] uppercase tracking-widest">Score (pts)</th>
                  <th className="border border-slate-900 p-3 text-center text-[10px] uppercase tracking-widest">Rubrics Covered</th>
                </tr>
              </thead>
              <tbody>
                {repertorizationResults?.map((res, i) => (
                  <tr key={res.name}>
                    <td className="border border-slate-200 p-3 font-black text-xs">{i + 1}</td>
                    <td className="border border-slate-200 p-3 font-black text-slate-900 text-xs uppercase tracking-tight">{res.name}</td>
                    <td className="border border-slate-200 p-3 text-center font-black text-xs">{res.score}</td>
                    <td className="border border-slate-200 p-3 text-center text-xs font-bold">{res.count} / {analysis.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-20 flex justify-between items-end">
            <div className="text-xs text-slate-400">
              <p>HomeoDesk Pro - Advanced Homeopathic Software</p>
              <p>Clinical Decision Support System</p>
            </div>
            <div className="text-center flex flex-col items-center">
              {signatureData ? (
                <div className="h-16 mb-2 flex items-center justify-center">
                  <img src={signatureData} alt="Doctor's Signature" className="max-h-full max-w-full object-contain mix-blend-multiply" />
                </div>
              ) : (
                <div className="h-16 mb-2" />
              )}
              <div className="w-48 border-b border-slate-400 mb-2" />
              <p className="text-sm font-bold text-slate-700">Doctor's Signature</p>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {showGlobalReportPatient && (
            <ReportPreviewModal 
              patient={showGlobalReportPatient}
              onClose={() => setShowGlobalReportPatient(null)}
            />
          )}
          {selectedPatientForRx && (
            <PrescriptionCanvas 
              patient={selectedPatientForRx} 
              onClose={() => {
                setSelectedPatientForRx(null);
                setQuickRemedyForRx(undefined);
                setNextRemedyForRx(undefined);
              }} 
              onApplyAction={async (updatedPatient, plannedNextRemedy) => {
                await updatePatient(updatedPatient);
                setSelectedPatientForRx(null);
                setQuickRemedyForRx(undefined);
                setNextRemedyForRx(undefined);
                setShowGlobalReportPatient(updatedPatient);
                
                const newReminder: Reminder = {
                  id: `REM-${Math.floor(Math.random() * 10000)}`,
                  patientId: updatedPatient.id,
                  patientName: updatedPatient.name,
                  type: 'Follow-up',
                  date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                  time: '10:00',
                  note: 'Analysis completed. Follow-up required.',
                  completed: false,
                  canvasOverlay: updatedPatient.canvasOverlay,
                  report: analysis.map(a => `${a.chapter}: ${a.rubric}`).join('\n'),
                  nextRemedy: plannedNextRemedy || nextRemedyForRx || quickRemedyForRx || updatedPatient.remedy
                };
                setReminders(prev => [newReminder, ...prev]);
              }}
              initialAnalysis={analysis}
              initialResults={repertorizationResults || undefined}
              quickRemedy={quickRemedyForRx}
              nextRemedy={nextRemedyForRx}
            />
          )}
          {selectedPatientForPD && (
            <PatientDetailsCanvas 
              patient={selectedPatientForPD}
              onClose={() => setSelectedPatientForPD(null)}
              onNext={() => {
                const currentIndex = patients.findIndex(p => p.id === selectedPatientForPD.id);
                if (currentIndex < patients.length - 1) {
                  setSelectedPatientForPD(patients[currentIndex + 1]);
                }
              }}
              onPrevious={() => {
                const currentIndex = patients.findIndex(p => p.id === selectedPatientForPD.id);
                if (currentIndex > 0) {
                  setSelectedPatientForPD(patients[currentIndex - 1]);
                }
              }}
              onSave={async (updatedPatient) => {
                await updatePatient(updatedPatient);
                setSelectedPatientForPD(updatedPatient);
              }}
            />
          )}
          {selectedPatientForReportHistory && (
            <ReportHistoryModal
              patient={selectedPatientForReportHistory}
              onClose={() => setSelectedPatientForReportHistory(null)}
              onNewReport={(p) => setSelectedPatientForRx(p)}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
