import React, { useState, useEffect, useMemo } from 'react';
import { CHAPTER_INDEX } from './constants';
import { motion } from 'motion/react';
import { 
  X, Printer, FileText, Clock, Brain, AlertCircle, Droplets, Zap, Move, Thermometer
, Stethoscope, Activity, ArrowRightLeft, RefreshCw, Utensils, ClipboardList, ChevronLeft, ChevronRight, Users, Database, Calendar, Plus, FlaskConical, BookmarkCheck, ChevronDown, TrendingUp, Bookmark} from 'lucide-react';
import { Patient, ChiefSymptom, PhysicalGeneral } from './types';


export const PatientDetailsCanvas = ({ 
  patient, 
  onClose, 
  onNext, 
  onPrevious,
  onSave
}: { 
  patient: Patient, 
  onClose: () => void,
  onNext?: () => void,
  onPrevious?: () => void,
  onSave: (updatedPatient: Patient) => void
}) => {
  const [activeTab, setActiveTab] = useState<'chief' | 'mental' | 'physical' | 'analysis'>('chief');
  const [chiefSymptoms, setChiefSymptoms] = useState<ChiefSymptom[]>([]);
  const [mentalSymptoms, setMentalSymptoms] = useState<string[]>([]);
  const [physicalGeneralsState, setPhysicalGeneralsState] = useState<PhysicalGeneral[]>([]);
  const [caseAnalysis, setCaseAnalysis] = useState('');

  const COMPLAINT_OPTIONS = useMemo(() => CHAPTER_INDEX.map(c => c.n), []);
  const LOCATION_OPTIONS = [
    "Head", "Forehead", "Temples", "Vertex", "Occiput", "Eyes", "Ears", "Nose", "Face", "Mouth", "Teeth", "Tongue", "Throat", 
    "Stomach", "Abdomen", "Hypochondrium", "Umbilical Region", "Iliac Region", "Rectum", "Anus", "Bladder", "Kidneys", "Urethra", 
    "Genitalia", "Larynx", "Trachea", "Chest", "Heart", "Lungs", "Back", "Spine", "Lumbar", "Sacrum", "Extremities", "Shoulders", 
    "Arms", "Hands", "Fingers", "Hips", "Legs", "Knees", "Feet", "Toes", "Skin", "Nerves", "Blood Vessels"
  ];
  const SENSATION_OPTIONS = [
    "Aching", "Biting", "Burning", "Bursting", "Clutching", "Constricting", "Cramping", "Crawling", "Crushing", "Cutting", 
    "Digging", "Distending", "Dragging", "Drawing", "Dull", "Empty feeling", "Gnawing", "Griping", "Hammering", "Heaviness", 
    "Itching", "Jerking", "Lacerating", "Numbness", "Paralytic", "Pinching", "Pressing", "Prickling", "Pulsating", "Rawness", 
    "Shooting", "Smarting", "Soreness", "Spasmodic", "Splinter-like", "Squeezing", "Stabbing", "Sticking", "Stinging", 
    "Stitching", "Tearing", "Tension", "Throbbing", "Tickling", "Tingling", "Twitching", "Wandering"
  ];
  const MODALITY_OPTIONS = [
    "< Morning", "< Forenoon", "< Noon", "< Afternoon", "< Evening", "< Night", "< Midnight", 
    "< Cold", "< Heat", "< Dampness", "< Dryness", "< Change of weather", "< Draft of air", 
    "< Motion", "< Rest", "< Standing", "< Sitting", "< Lying", "< Walking", "< Running", 
    "< Eating", "< Drinking", "< After sleep", "< Touch", "< Pressure", "< Tight clothing", 
    "> Cold", "> Heat", "> Motion", "> Rest", "> Pressure", "> Rubbing", "> Open air", "> Warm room", 
    "> Eating", "> Drinking", "> Sleep", "> Perspiration", "> Discharge"
  ];
  const CONCOMITANT_OPTIONS = [
    "Thirst", "Thirstless", "Nausea", "Vomiting", "Sweat", "Chills", "Fever", "Weakness", "Prostration", 
    "Restlessness", "Anxiety", "Fear", "Sadness", "Drowsiness", "Sleeplessness", 
    "Headache", "Vertigo", "Palpitation", "Cough", "Diarrhea", "Constipation"
  ];
  const PHYSIOLOGICAL_OPTIONS = [
    "Urination", "Stool", "Menses", "Sleep", "Dreams", "Appetite", "Thirst", "Perspiration", "Sexual Desire", "Leucorrhea"
  ];

  const PG_TIME_OPTIONS = ["Morning", "Forenoon", "Noon", "Afternoon", "Evening", "Night", "Midnight", "Daybreak", "Sunrise", "Sunset", "Periodic", "Every 2nd day", "Every 7th day"];
  const PG_TEMP_OPTIONS = ["< Hot weather", "< Summer", "< Sun", "< Warmth", "< Heat of bed", "> Hot drinks", "< Cold weather", "< Winter", "< Snow", "< Change of season", "< Cold air", "> Cold air"];
  const PG_PHYSIO_OPTIONS = ["< Urination", "> Stool", "< After menses", "< While breathing", "< Deep inspiration", "> Perspiration", "< During sleep", "> After sleep", "< Full moon"];
  const PG_POS_OPTIONS = ["< Lying", "< Lying on back", "< Lying on painful side", "< Lying on left side", "< Standing", "> Standing", "< Sitting", "> Sitting", "< Walking", "> Walking", "< Walking fast"];
  const PG_PATH_OPTIONS = ["Bleeding/Hemorrhage", "Injury/Trauma", "Suppuration", "Induration", "Cicatrix/Scars", "Fistula", "Soreness", "Emaciation", "Dropsy/Edema", "Numbness"];
  const PG_FACT_OPTIONS = ["< Pressure", "> Pressure", "< Tight clothing", "< Light", "< Noise", "< Touch", "> Touch", "< Motion", "> Motion", "< Sudden motion", "< Jarring"];
  const PG_DISCH_OPTIONS = ["Thin/Watery", "Thick/Viscid", "Yellowish", "Greenish", "Bloody", "Offensive", "Acre/Excoriating", "Bland", "Stringy", "Foul smelling"];
  const PG_SIDES_OPTIONS = ["Right side", "Left side", "Right to Left", "Left to Right", "Diagonal (Upper R / Lower L)", "Diagonal (Upper L / Lower R)", "Cross-wise"];
  const PG_ALTER_OPTIONS = ["Alternating sides", "Alternating symptoms", "Metastasis", "Periodical appearance", "Wandering pains", "Shifting location", "Rapid change"];
  const PG_CRAVE_OPTIONS = ["Desire: Sweets", "Desire: Salt", "Desire: Sour", "Desire: Spicy", "Desire: Cold drinks", "Desire: Hot food", "Aversion: Meat", "Aversion: Milk", "Aversion: Bread", "Aversion: Water"];
  const MENTAL_STATE_OPTIONS = [
    "Irritability / Anger", "Anxiety / Restlessness", "Fear of death / disease", "Sadness / Weeping tendency", 
    "Indifference / Apathy", "Obstinate / Stubborn", "Jealousy / Suspicion", "Hurry / Haste", 
    "Memory weak / Absent-minded", "Fear of crowd", "Fear of dark", "Anticipatory anxiety",
    "Sensitive to noise/light", "Desire for company", "Aversion to company", "Delusions / Hallucinations"
  ];

  useEffect(() => {
    document.body.classList.add('hide-global-print');
    return () => document.body.classList.remove('hide-global-print');
  }, []);

  const physicalGeneralsMeta = [
    { label: "Time", icon: <Clock size={14} />, placeholder: "Aggravation/Amelioration time...", options: PG_TIME_OPTIONS, color: 'emerald' },
    { label: "Temperature", icon: <Thermometer size={14} />, placeholder: "Sun, summer, winter, air...", options: PG_TEMP_OPTIONS, color: 'blue' },
    { label: "Physiological", icon: <Activity size={14} />, placeholder: "Urination, menses, breathing...", options: PG_PHYSIO_OPTIONS, color: 'rose' },
    { label: "Position", icon: <Move size={14} />, placeholder: "Lying, walking, standing...", options: PG_POS_OPTIONS, color: 'amber' },
    { label: "Pathological", icon: <AlertCircle size={14} />, placeholder: "Hemorrhage, injury, etc...", options: PG_PATH_OPTIONS, color: 'purple' },
    { label: "Physical Factors", icon: <Zap size={14} />, placeholder: "Pressure, light, noise...", options: PG_FACT_OPTIONS, color: 'indigo' },
    { label: "Discharges", icon: <Droplets size={14} />, placeholder: "Character, color, odor...", options: PG_DISCH_OPTIONS, color: 'cyan' },
    { label: "Sides", icon: <ArrowRightLeft size={14} />, placeholder: "Right, left, diagonal...", options: PG_SIDES_OPTIONS, color: 'orange' },
    { label: "Alterations", icon: <RefreshCw size={14} />, placeholder: "Alternating symptoms...", options: PG_ALTER_OPTIONS, color: 'teal' },
    { label: "Craving/Aversion", icon: <Utensils size={14} />, placeholder: "Food desires/dislikes...", options: PG_CRAVE_OPTIONS, color: 'pink' }
  ];

  const pgColorMap: Record<string, { bg: string, text: string, border: string, hover: string }> = {
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', hover: 'hover:bg-emerald-100' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', hover: 'hover:bg-blue-100' },
    rose: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100', hover: 'hover:bg-rose-100' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', hover: 'hover:bg-amber-100' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100', hover: 'hover:bg-purple-100' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100', hover: 'hover:bg-indigo-100' },
    cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-100', hover: 'hover:bg-cyan-100' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100', hover: 'hover:bg-orange-100' },
    teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-100', hover: 'hover:bg-teal-100' },
    pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-100', hover: 'hover:bg-pink-100' }
  };

  useEffect(() => {
    setChiefSymptoms(patient.chiefSymptoms || Array(5).fill({ complaint: '', location: '', sensation: '', modality: '', concomitant: '', physiological: '' }));
    setMentalSymptoms(patient.mentalSymptoms || Array(5).fill(''));
    setPhysicalGeneralsState(patient.physicalGenerals || physicalGeneralsMeta.map(m => ({ label: m.label, value: '' })));
    setCaseAnalysis(patient.caseAnalysis || '');
  }, [patient]);

  const handleSave = () => {
    const updatedPatient: Patient = {
      ...patient,
      chiefSymptoms,
      mentalSymptoms,
      physicalGenerals: physicalGeneralsState,
      caseAnalysis
    };
    onSave(updatedPatient);
    onClose();
  };

  const updateChiefSymptom = (idx: number, field: keyof ChiefSymptom, value: string) => {
    const newSymptoms = [...chiefSymptoms];
    newSymptoms[idx] = { ...newSymptoms[idx], [field]: value };
    setChiefSymptoms(newSymptoms);
  };

  const updateMentalSymptom = (idx: number, value: string) => {
    const newSymptoms = [...mentalSymptoms];
    newSymptoms[idx] = value;
    setMentalSymptoms(newSymptoms);
  };

  const updatePhysicalGeneral = (idx: number, value: string) => {
    const newGenerals = [...physicalGeneralsState];
    newGenerals[idx] = { ...newGenerals[idx], value };
    setPhysicalGeneralsState(newGenerals);
  };

  const analysisResults = useMemo(() => {
    if (!patient.coreRubrics || patient.coreRubrics.length === 0) return [];
    
    const remedyMap: { [key: string]: { 
      name: string, 
      score: number, 
      coverage: number
    } } = {};

    patient.coreRubrics.forEach((item) => {
      item.remedies.forEach(r => {
        if (!remedyMap[r.n]) {
          remedyMap[r.n] = {
            name: r.n,
            score: 0,
            coverage: 0
          };
        }
        
        const points = r.g === 3 ? 3 : (r.g === 2 ? 2 : 1);
        remedyMap[r.n].score += points;
        remedyMap[r.n].coverage += 1;
      });
    });

    return Object.values(remedyMap)
      .sort((a, b) => b.score - a.score || b.coverage - a.coverage)
      .slice(0, 5);
  }, [patient.coreRubrics]);

  return (
    <>
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-0 sm:p-2 md:p-4 print:p-0 print:bg-white print:static"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white w-full max-w-[1400px] h-full rounded-none sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col print:h-auto print:w-full print:shadow-none print:rounded-none"
      >
        {/* Header - Professional Medical Style */}
        <div className="p-8 border-b border-slate-100 bg-white relative overflow-hidden print:p-4">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-60 print:hidden" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-emerald-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-emerald-200 rotate-3 print:w-12 print:h-12">
                <ClipboardList size={32} className="print:w-6 print:h-6" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight print:text-xl">Clinical Case Record</h2>
                  <div className="flex items-center gap-2 print:hidden">
                    {onPrevious && (
                      <button 
                        onClick={onPrevious}
                        className="p-1.5 hover:bg-slate-100 rounded-xl transition text-slate-400 hover:text-slate-900"
                        title="Previous Patient"
                      >
                        <ChevronLeft size={18} />
                      </button>
                    )}
                    {onNext && (
                      <button 
                        onClick={onNext}
                        className="p-1.5 hover:bg-slate-100 rounded-xl transition text-slate-400 hover:text-slate-900"
                        title="Next Patient"
                      >
                        <ChevronRight size={18} />
                      </button>
                    )}
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full print:hidden">Official Document</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400 text-xs font-bold">
                  <span className="flex items-center gap-1.5"><Users size={14} /> {patient.name}</span>
                  <div className="w-1 h-1 bg-slate-200 rounded-full" />
                  <span className="flex items-center gap-1.5"><Database size={14} /> ID: {patient.id}</span>
                  <div className="w-1 h-1 bg-slate-200 rounded-full" />
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 print:hidden">
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition shadow-xl shadow-slate-200 group"
              >
                <Printer size={16} className="group-hover:scale-110 transition-transform" />
                EXPORT AS PDF
              </button>
              <button 
                onClick={onClose}
                className="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Hidden on Print */}
        <div className="px-8 py-4 bg-slate-50/50 border-b border-slate-100 flex gap-2 overflow-x-auto custom-scrollbar print:hidden">
          {[
            { id: 'chief', label: 'Chief Symptoms', icon: <Plus size={14} />, count: 5 },
            { id: 'mental', label: 'Mental State', icon: <Brain size={14} />, count: 5 },
            { id: 'physical', label: 'Physical Generals', icon: <Activity size={14} />, count: 10 },
            { id: 'analysis', label: 'Case Analysis', icon: <FlaskConical size={14} />, count: null }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-white text-emerald-600 shadow-sm border border-emerald-100' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.count && <span className={`ml-1 px-1.5 py-0.5 rounded-md text-[9px] ${activeTab === tab.id ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>{tab.count}</span>}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white print:overflow-visible print:p-0">
          <div className="max-w-5xl mx-auto space-y-16 print:space-y-8">
            
            {/* Case Summary Section */}
            {(patient.remedy || patient.coreRubrics) && (
              <section className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 print:p-4 print:bg-white print:border-slate-200">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1 space-y-6">
                    <div>
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <BookmarkCheck size={16} className="text-emerald-600" />
                        Active Selection
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {patient.coreRubrics?.map((rubric, i) => (
                          <span key={i} className="px-3 py-1.5 bg-white text-slate-700 text-[10px] font-bold rounded-lg border border-slate-200 shadow-sm">
                            {rubric.text}
                          </span>
                        ))}
                      </div>
                    </div>
                    {patient.notes && (
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Clinical Notes</p>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium bg-white p-4 rounded-2xl border border-slate-100">
                          {patient.notes}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="md:w-64 space-y-4">
                    <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Prescribed Remedy</p>
                      <p className="text-lg font-black text-emerald-700">{patient.remedy || 'Not set'}</p>
                      <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Potency</span>
                        <span className="text-xs font-black text-slate-900">{patient.currentPotency || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Case Status</p>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${patient.caseStatus === 'Improving' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <p className="text-sm font-black text-slate-800">{patient.caseStatus || 'Active'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Chief (Chip) Symptoms Section */}
            <section className={activeTab === 'chief' ? 'block' : 'hidden print:block'}>
              <div className="flex items-center justify-between mb-8 print:mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <Plus size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Chief (Chip) Symptoms</h3>
                    <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">প্রধান লক্ষণসমূহ (L/S/M/C)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 print:space-y-4">
                {chiefSymptoms.map((symptom, i) => (
                  <div key={i} className="group p-8 bg-slate-50/50 rounded-[2rem] border-2 border-transparent hover:border-emerald-100 hover:bg-white hover:shadow-2xl hover:shadow-emerald-100/20 transition-all duration-500 print:p-4 print:bg-white print:border-slate-200 print:rounded-xl">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/4 space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-xs font-black shadow-lg shadow-emerald-200">
                            {i + 1}
                          </span>
                          <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Complaint</h4>
                        </div>
                        <div className="relative">
                          <input 
                            type="text" 
                            list={`canvas-complaint-options-${i}`}
                            placeholder="Enter main complaint..." 
                            value={symptom.complaint}
                            onChange={(e) => updateChiefSymptom(i, 'complaint', e.target.value)}
                            className="w-full bg-white border-b-2 border-slate-200 focus:border-emerald-500 outline-none py-2 pr-8 text-sm font-black text-slate-800 placeholder:text-slate-300 transition-colors print:border-slate-100"
                          />
                          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500 pointer-events-none" />
                          <datalist id={`canvas-complaint-options-${i}`}>
                            {COMPLAINT_OPTIONS.map(opt => <option key={opt} value={opt} />)}
                          </datalist>
                        </div>
                        <div className="mt-2 print:hidden">
                          <select 
                            className="w-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-lg px-3 py-1.5 outline-none border border-emerald-100 cursor-pointer hover:bg-emerald-100 transition-all"
                            onChange={(e) => {
                              if (e.target.value) {
                                const current = symptom.complaint;
                                const newValue = current ? `${current}, ${e.target.value}` : e.target.value;
                                updateChiefSymptom(i, 'complaint', newValue);
                                e.target.value = ""; 
                              }
                            }}
                          >
                            <option value="">+ Quick Add Complaint</option>
                            {COMPLAINT_OPTIONS.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {[
                          { label: 'Location (L)', field: 'location', placeholder: 'Where is it felt?', color: 'emerald', options: LOCATION_OPTIONS },
                          { label: 'Sensation (S)', field: 'sensation', placeholder: 'Burning, stitching...', color: 'blue', options: SENSATION_OPTIONS },
                          { label: 'Modality (M)', field: 'modality', placeholder: '< Agg / > Amel', color: 'amber', options: MODALITY_OPTIONS },
                          { label: 'Concomitant (C)', field: 'concomitant', placeholder: 'Associated symptoms', color: 'rose', options: CONCOMITANT_OPTIONS },
                          { label: 'Physiological (P)', field: 'physiological', placeholder: 'Functions/Vitals', color: 'indigo', options: PHYSIOLOGICAL_OPTIONS }
                        ].map((field) => (
                          <div key={field.label} className="space-y-2">
                            <label className={`text-[9px] font-black text-slate-400 uppercase tracking-widest`}>{field.label}</label>
                            <div className="relative group/field">
                              <div className="relative">
                                <input 
                                  list={`canvas-${field.field}-options-${i}`}
                                  className="w-full p-4 pr-10 rounded-2xl bg-white border border-slate-100 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-xs font-bold text-slate-600 transition-all print:border-slate-100"
                                  placeholder={field.placeholder}
                                  value={symptom[field.field as keyof ChiefSymptom]}
                                  onChange={(e) => updateChiefSymptom(i, field.field as keyof ChiefSymptom, e.target.value)}
                                />
                                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 pointer-events-none" />
                              </div>
                              <datalist id={`canvas-${field.field}-options-${i}`}>
                                {field.options.map(opt => <option key={opt} value={opt} />)}
                              </datalist>
                              
                              <div className="mt-2 print:hidden">
                                <select 
                                  className={`w-full ${pgColorMap[field.color as keyof typeof pgColorMap]?.bg || 'bg-slate-50'} ${pgColorMap[field.color as keyof typeof pgColorMap]?.text || 'text-slate-600'} text-[10px] font-black uppercase tracking-widest rounded-lg px-3 py-1.5 outline-none border ${pgColorMap[field.color as keyof typeof pgColorMap]?.border || 'border-slate-100'} cursor-pointer hover:bg-opacity-80 transition-all`}
                                  onChange={(e) => {
                                    if (e.target.value) {
                                      const current = symptom[field.field as keyof ChiefSymptom];
                                      const newValue = current ? `${current}, ${e.target.value}` : e.target.value;
                                      updateChiefSymptom(i, field.field as keyof ChiefSymptom, newValue);
                                      e.target.value = ""; 
                                    }
                                  }}
                                >
                                  <option value="">+ Quick Add {field.label.split(' ')[0]}</option>
                                  {field.options.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Mental Symptoms Section */}
            <section className={activeTab === 'mental' ? 'block pt-16 border-t border-slate-50' : 'hidden print:block'}>
              <div className="flex items-center gap-3 mb-8 print:mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Brain size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Psychological State (Mental)</h3>
                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">মানসিক লক্ষণসমূহ</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 print:grid-cols-2">
                {mentalSymptoms.map((symptom, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-slate-300">0{i + 1}</span>
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Symptom Box</label>
                    </div>
                    <textarea 
                      className="w-full h-40 p-5 rounded-[1.5rem] bg-blue-50/30 border-2 border-transparent focus:border-blue-200 focus:bg-white outline-none text-xs font-bold text-slate-700 resize-none transition-all shadow-sm print:h-32 print:bg-white print:border-slate-100"
                      placeholder="Emotions, intellect, memory, fears..."
                      value={symptom}
                      onChange={(e) => updateMentalSymptom(i, e.target.value)}
                    />
                    <div className="mt-2 print:hidden">
                      <select 
                        className={`w-full ${pgColorMap['blue'].bg} ${pgColorMap['blue'].text} text-[10px] font-black uppercase tracking-widest rounded-lg px-3 py-1.5 outline-none border ${pgColorMap['blue'].border} cursor-pointer hover:bg-opacity-80 transition-all`}
                        onChange={(e) => {
                          if (e.target.value) {
                            const current = mentalSymptoms[i] || '';
                            const newValue = current ? `${current}, ${e.target.value}` : e.target.value;
                            updateMentalSymptom(i, newValue);
                            e.target.value = ""; 
                          }
                        }}
                      >
                        <option value="">+ Quick Add Mental State</option>
                        {MENTAL_STATE_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Physical Generals Section */}
            <section className={activeTab === 'physical' ? 'block pt-16 border-t border-slate-50' : 'hidden print:block'}>
              <div className="flex items-center gap-3 mb-8 print:mb-4">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                  <Activity size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Physical General Symptoms</h3>
                  <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest">শারীরিক সাধারণ লক্ষণসমূহ</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 print:grid-cols-2">
                {physicalGeneralsMeta.map((pg, i) => (
                  <div key={i} className="group space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-amber-500 shadow-sm group-hover:bg-amber-500 group-hover:text-white transition-colors">
                        {pg.icon}
                      </div>
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{pg.label}</label>
                    </div>
                    <textarea 
                      className="w-full h-32 p-5 rounded-[1.5rem] bg-amber-50/30 border-2 border-transparent focus:border-amber-200 focus:bg-white outline-none text-xs font-bold text-slate-700 resize-none transition-all shadow-sm print:h-24 print:bg-white print:border-slate-100"
                      placeholder={pg.placeholder}
                      value={physicalGeneralsState[i]?.value || ''}
                      onChange={(e) => updatePhysicalGeneral(i, e.target.value)}
                    />
                    <div className="mt-2 print:hidden">
                      <select 
                        className={`w-full ${pgColorMap[pg.color as keyof typeof pgColorMap]?.bg || 'bg-slate-50'} ${pgColorMap[pg.color as keyof typeof pgColorMap]?.text || 'text-slate-600'} text-[10px] font-black uppercase tracking-widest rounded-lg px-3 py-1.5 outline-none border ${pgColorMap[pg.color as keyof typeof pgColorMap]?.border || 'border-slate-100'} cursor-pointer hover:bg-opacity-80 transition-all`}
                        onChange={(e) => {
                          if (e.target.value) {
                            const current = physicalGeneralsState[i]?.value || '';
                            const newValue = current ? `${current}, ${e.target.value}` : e.target.value;
                            updatePhysicalGeneral(i, newValue);
                            e.target.value = ""; 
                          }
                        }}
                      >
                        <option value="">+ Quick Add {pg.label}</option>
                        {pg.options?.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Totality & Analysis Section */}
            <section className={activeTab === 'analysis' ? 'block pt-16 border-t border-slate-50 pb-12' : 'hidden print:block'}>
              <div className="flex items-center gap-3 mb-8 print:mb-4">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                  <FlaskConical size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Case Totality & Analysis</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">কেস টোটালিটি এবং বিশ্লেষণ</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <TrendingUp size={14} className="text-emerald-500" />
                    Repertorization Summary
                  </h4>
                  <div className="bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100/50">
                          <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">Remedy</th>
                          <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest text-center">Score</th>
                          <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest text-center">Coverage</th>
                          <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {analysisResults.length > 0 ? (
                          analysisResults.map((res, i) => (
                            <tr key={res.name} className={`hover:bg-white transition-colors ${patient.remedy === res.name ? 'bg-emerald-50/50' : ''}`}>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  {patient.remedy === res.name && <BookmarkCheck size={12} className="text-emerald-600" />}
                                  <span className={`text-xs font-black ${patient.remedy === res.name ? 'text-emerald-700' : 'text-slate-900'}`}>{res.name}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span className={`px-2 py-1 text-[10px] font-black rounded-md ${patient.remedy === res.name ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-50 text-emerald-700'}`}>{res.score}</span>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span className="text-xs font-bold text-slate-600">{res.coverage}/{patient.coreRubrics?.length}</span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button 
                                  onClick={() => onSave({ ...patient, remedy: res.name })}
                                  className={`p-1.5 rounded-lg transition-all ${patient.remedy === res.name ? 'text-emerald-600 bg-emerald-100' : 'text-slate-300 hover:text-emerald-600 hover:bg-emerald-50'}`}
                                >
                                  {patient.remedy === res.name ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={3} className="px-6 py-12 text-center">
                              <p className="text-xs font-bold text-slate-400 italic">No analysis data available.</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <FileText size={14} className="text-blue-500" />
                    Clinical Synthesis
                  </h4>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000 print:hidden" />
                    <textarea 
                      className="relative w-full h-64 p-10 rounded-[2.5rem] bg-slate-50 border-2 border-slate-100 focus:border-slate-900 focus:bg-white outline-none text-base font-medium text-slate-800 leading-relaxed resize-none transition-all print:h-auto print:p-4 print:border-slate-200"
                      placeholder="Synthesize the case findings, determine the totality, and outline the therapeutic plan..."
                      value={caseAnalysis}
                      onChange={(e) => setCaseAnalysis(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer - Professional Branding */}
        <div className="p-8 border-t border-slate-100 bg-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 print:p-4 print:bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm border border-slate-100">
              <Stethoscope size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">HomeoDesk Pro</p>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Clinical Intelligence System v2.0</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 print:hidden">
            <button 
              onClick={onClose}
              className="px-8 py-3 text-slate-500 text-xs font-black uppercase tracking-widest hover:bg-slate-100 rounded-2xl transition"
            >
              Discard
            </button>
            <button 
              onClick={handleSave}
              className="px-10 py-3 bg-emerald-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Save Record
            </button>
          </div>

          <div className="hidden print:block text-right">
            <p className="text-[10px] font-black text-slate-900 uppercase">Authorized Signature</p>
            <div className="w-48 h-px bg-slate-900 mt-8 ml-auto" />
          </div>
        </div>
      </motion.div>
    </motion.div>
    </>
  );
};

