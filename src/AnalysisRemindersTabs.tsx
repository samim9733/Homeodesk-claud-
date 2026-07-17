import { ClinicalIntakeForm } from './ClinicalIntakeForm';
import { ReportPreviewModal } from './ReportPreviewModal';
import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, Calendar, Plus, Trash2, Edit, X, RefreshCw, AlertCircle, Clock, Save, Stethoscope, ClipboardList
, Users, FlaskConical, History, BookmarkCheck, Thermometer, Activity, Move, Zap, Droplets, ArrowRightLeft, Utensils, ChevronDown, Loader2, Bookmark} from 'lucide-react';
import { Patient, Reminder, AnalysisItem, ChiefSymptom, PhysicalGeneral } from './types';
import { CHAPTER_INDEX, cleanRubricName } from './constants';
import { useLanguage } from './LanguageContext';

export const RemindersTab = ({ reminders, setReminders, patients, preSelectedPatientId, setPreSelectedPatientId }: { 
  reminders: Reminder[], 
  setReminders: React.Dispatch<React.SetStateAction<Reminder[]>>,
  patients: Patient[],
  preSelectedPatientId: string | null,
  setPreSelectedPatientId: (id: string | null) => void
}) => {
  const { t } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(!!preSelectedPatientId);
  const [newReminder, setNewReminder] = useState<Omit<Reminder, 'id' | 'completed'>>({
    patientId: preSelectedPatientId || '',
    patientName: '',
    type: 'Follow-up',
    date: '',
    time: '',
    note: ''
  });

  useEffect(() => {
    if (preSelectedPatientId) {
      setShowAddForm(true);
      setNewReminder(prev => ({ ...prev, patientId: preSelectedPatientId }));
    }
  }, [preSelectedPatientId]);

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === newReminder.patientId);
    const reminder: Reminder = {
      ...newReminder,
      id: `REM-${Math.floor(Math.random() * 10000)}`,
      patientName: patient ? patient.name : 'Unknown Patient',
      completed: false
    };
    setReminders(prev => [reminder, ...prev]);
    setShowAddForm(false);
    setPreSelectedPatientId(null);
    setNewReminder({
      patientId: '',
      patientName: '',
      type: 'Follow-up',
      date: '',
      time: '',
      note: ''
    });
  };

  const toggleComplete = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <Bell size={20} />
            </div>
            {t('reminders.title')}
          </h2>
          <p className="text-slate-500 text-sm font-medium mt-1 ml-13">{t('reminders.desc')}</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl hover:bg-slate-800 transition shadow-xl shadow-slate-200 font-bold text-sm"
        >
          {showAddForm ? <X size={18} /> : <Plus size={18} />}
          <span>{showAddForm ? t('common.cancel') : t('reminders.setNew')}</span>
        </button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 mb-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
            
            <form onSubmit={handleAddReminder} className="relative z-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t('reminders.selectPatient')}</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <select 
                      required
                      value={newReminder.patientId}
                      onChange={(e) => setNewReminder({ ...newReminder, patientId: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-slate-50/50 text-sm font-bold transition-all"
                    >
                      <option value="">{t('reminders.choosePatient')}</option>
                      {patients.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t('reminders.type')}</label>
                  <div className="relative">
                    <ClipboardList className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <select 
                      value={newReminder.type}
                      onChange={(e) => setNewReminder({ ...newReminder, type: e.target.value as any })}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-slate-50/50 text-sm font-bold transition-all"
                    >
                      <option value="Appointment">{t('reminders.appointment')}</option>
                      <option value="Medication">{t('reminders.medication')}</option>
                      <option value="Follow-up">{t('reminders.followup')}</option>
                      <option value="Other">{t('reminders.other')}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t('reminders.date')}</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="date"
                      required
                      value={newReminder.date}
                      onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-slate-50/50 text-sm font-bold transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t('reminders.time')}</label>
                  <div className="relative">
                    <Bell className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="time"
                      required
                      value={newReminder.time}
                      onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-slate-50/50 text-sm font-bold transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t('reminders.note')}</label>
                <div className="relative">
                  <Edit className="absolute left-3 top-4 text-slate-400" size={16} />
                  <textarea 
                    placeholder={t('reminders.notePlaceholder')}
                    value={newReminder.note}
                    onChange={(e) => setNewReminder({ ...newReminder, note: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-slate-50/50 text-sm font-bold transition-all h-20 resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-8 py-3 text-slate-500 font-bold hover:bg-slate-100 rounded-2xl transition"
                >
                  {t('common.cancel')}
                </button>
                <button 
                  type="submit"
                  className="px-10 py-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition shadow-xl shadow-emerald-200 font-black uppercase tracking-widest text-xs"
                >
                  {t('reminders.save')}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reminders.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mb-6">
              <Bell size={40} />
            </div>
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">{t('reminders.noActive')}</h3>
            <p className="text-slate-400 font-medium mt-2">{t('reminders.clear')}</p>
            <button 
              onClick={() => setShowAddForm(true)}
              className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition shadow-xl shadow-slate-200 text-sm"
            >
              {t('reminders.createFirst')}
            </button>
          </div>
        ) : (
          reminders.map((reminder) => (
            <motion.div 
              layout
              key={reminder.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`group relative p-6 rounded-[2rem] border-2 transition-all duration-300 ${
                reminder.completed 
                  ? 'bg-slate-50 border-slate-100 opacity-60 grayscale' 
                  : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-1'
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                  reminder.type === 'Appointment' ? 'bg-blue-500 text-white shadow-blue-200' :
                  reminder.type === 'Medication' ? 'bg-emerald-500 text-white shadow-emerald-200' :
                  reminder.type === 'Follow-up' ? 'bg-purple-500 text-white shadow-purple-200' :
                  'bg-amber-500 text-white shadow-amber-200'
                }`}>
                  {reminder.type === 'Appointment' ? <Calendar size={20} /> :
                   reminder.type === 'Medication' ? <FlaskConical size={20} /> :
                   reminder.type === 'Follow-up' ? <History size={20} /> :
                   <Bell size={20} />}
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => toggleComplete(reminder.id)}
                    className={`p-2.5 rounded-xl transition-all ${
                      reminder.completed 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600'
                    }`}
                    title={reminder.completed ? "Mark as Pending" : "Mark as Completed"}
                  >
                    <BookmarkCheck size={18} />
                  </button>
                  <button 
                    onClick={() => deleteReminder(reminder.id)}
                    className="p-2.5 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
                    title="Delete Reminder"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      reminder.type === 'Appointment' ? 'bg-blue-100 text-blue-700' :
                      reminder.type === 'Medication' ? 'bg-emerald-100 text-emerald-700' :
                      reminder.type === 'Follow-up' ? 'bg-purple-100 text-purple-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {reminder.type}
                    </span>
                    {new Date(reminder.date) < new Date() && !reminder.completed && (
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-red-100 text-red-700 animate-pulse">
                        {t('reminders.overdue')}
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight truncate">{reminder.patientName}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('reminders.idLabel')} {reminder.patientId}</p>
                </div>

                <div className="flex items-center gap-4 py-3 border-y border-slate-50">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-slate-400" />
                    <span className="text-xs font-bold text-slate-600">{new Date(reminder.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bell size={14} className="text-slate-400" />
                    <span className="text-xs font-bold text-slate-600">{reminder.time}</span>
                  </div>
                </div>

                {reminder.note && (
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <p className="text-xs font-medium text-slate-500 italic line-clamp-2">"{reminder.note}"</p>
                  </div>
                )}
                
                {reminder.nextRemedy && (
                  <div className="bg-emerald-50 p-3 rounded-xl mt-2 border border-emerald-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Next Remedy</p>
                    <p className="text-xs font-bold text-emerald-900">{reminder.nextRemedy}</p>
                  </div>
                )}

                {reminder.report && (
                  <div className="bg-slate-50 p-3 rounded-xl mt-2 border border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Report</p>
                    <p className="text-xs font-medium text-slate-600 whitespace-pre-wrap line-clamp-4">{reminder.report}</p>
                  </div>
                )}

                {reminder.canvasOverlay && (
                  <div className="mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">RS Canvas</p>
                    <img src={reminder.canvasOverlay} alt="RS Canvas" className="w-full max-h-48 object-contain bg-white rounded-xl border border-slate-200 shadow-sm" />
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export const AnalysisTab = ({ patients, analysis, onClearAnalysis, onRemoveRubric, onAddAnalysis, onSetAnalysis, onTransferToRx, onCompare, onUpdatePatient, setActiveTab, preSelectedPatientId }: { onSetAnalysis?: (items: AnalysisItem[]) => void, 
  patients: Patient[], 
  analysis: AnalysisItem[],
  onClearAnalysis: () => void,
  onRemoveRubric: (idx: number) => void,
  onAddAnalysis: (item: AnalysisItem | AnalysisItem[]) => void,
  onTransferToRx: (patient: Patient, nextRemedy?: string) => void,
  onCompare: (remedyA: string, remedyB: string) => void,
  onUpdatePatient: (updatedPatient: Patient) => void,
  setActiveTab: (tab: string) => void,
  preSelectedPatientId?: string | null
}) => {
  const { t } = useLanguage();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(patients.length > 0 ? patients[0] : null);
  const [sortMode, setSortMode] = useState<'score' | 'coverage'>('score');
  const [potency, setPotency] = useState('200');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (preSelectedPatientId && patients.length > 0) {
      const p = patients.find(p => p.id === preSelectedPatientId);
      if (p) setSelectedPatient(p);
    } else if (patients.length > 0 && !selectedPatient) {
      setSelectedPatient(patients[0]);
    }
  }, [preSelectedPatientId, patients]);

  useEffect(() => {
    if (selectedPatient?.id) {
      const p = patients.find(p => p.id === selectedPatient.id);
      if (p && JSON.stringify(p) !== JSON.stringify(selectedPatient)) {
        setSelectedPatient(p);
      }
    } else if (patients.length > 0 && !selectedPatient) {
      setSelectedPatient(patients[0]);
    }
  }, [patients, selectedPatient?.id]);

  const [showPatientSelector, setShowPatientSelector] = useState(false);
  const [showIntake, setShowIntake] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [selectedRemedies, setSelectedRemedies] = useState<string[]>([]);
  const [rxPotency, setRxPotency] = useState('200C');
  const [rxDosage, setRxDosage] = useState(t('analysis.fourDrops'));
  const [rxFrequency, setRxFrequency] = useState(t('analysis.twiceDaily'));
  const [rxDuration, setRxDuration] = useState(t('analysis.sevenDays'));
  const [caseAnalysis, setCaseAnalysis] = useState('');

  // Symptom States
  const [chiefSymptoms, setChiefSymptoms] = useState<ChiefSymptom[]>([]);
  const [mentalSymptoms, setMentalSymptoms] = useState<string[]>([]);
  const [physicalGenerals, setPhysicalGenerals] = useState<PhysicalGeneral[]>([]);

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
  const MENTAL_STATE_OPTIONS = [
    "Irritability / Anger", "Anxiety / Restlessness", "Fear of death / disease", "Sadness / Weeping tendency", 
    "Indifference / Apathy", "Obstinate / Stubborn", "Jealousy / Suspicion", "Hurry / Haste", 
    "Memory weak / Absent-minded", "Fear of crowd", "Fear of dark", "Anticipatory anxiety",
    "Sensitive to noise/light", "Desire for company", "Aversion to company", "Delusions / Hallucinations"
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
    pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-100', hover: 'hover:bg-pink-100' },
    primary: { bg: 'bg-primary/5', text: 'text-primary', border: 'border-primary/10', hover: 'hover:bg-primary/10' }
  };

  useEffect(() => {
    if (selectedPatient) {
      setChiefSymptoms(selectedPatient.chiefSymptoms || Array.from({ length: 5 }, () => ({ complaint: '', location: '', sensation: '', modality: '', concomitant: '', physiological: '' })));
      setMentalSymptoms(selectedPatient.mentalSymptoms || Array(5).fill(''));
      setPhysicalGenerals(selectedPatient.physicalGenerals || physicalGeneralsMeta.map(m => ({ label: m.label, value: '' })));
      setCaseAnalysis(selectedPatient.caseAnalysis || '');
      // Handle legacy remedy field or new selectedRemedies (if we add it to types, but for now we'll just keep it in state or use remedy)
      setSelectedRemedies(selectedPatient.remedy ? [selectedPatient.remedy] : []);
      if (onSetAnalysis) {
        onSetAnalysis(selectedPatient.coreRubrics || []);
      }
    }
  }, [selectedPatient, onSetAnalysis]);

  // Calculate Repertorization Results
  const analysisResults = useMemo(() => {
    if (analysis.length === 0) return [];
    
    const remedyMap: { [key: string]: { 
      name: string, 
      short: string, 
      score: number, 
      coverage: number, 
      degrees: (number | null)[] 
    } } = {};

    analysis.forEach((item, rubricIdx) => {
      item.remedies.forEach(r => {
        if (!remedyMap[r.n]) {
          remedyMap[r.n] = {
            name: r.n,
            short: r.n.substring(0, 4).toUpperCase(),
            score: 0,
            coverage: 0,
            degrees: new Array(analysis.length).fill(null)
          };
        }
        
        const points = r.g === 3 ? 3 : (r.g === 2 ? 2 : 1);
        remedyMap[r.n].score += points;
        remedyMap[r.n].coverage += 1;
        remedyMap[r.n].degrees[rubricIdx] = r.g === 3 ? 3 : (r.g === 2 ? 2 : 1); // Map grade to degree points
      });
    });

    return Object.values(remedyMap)
      .sort((a, b) => {
        if (sortMode === 'score') {
          return b.score - a.score || b.coverage - a.coverage;
        } else {
          return b.coverage - a.coverage || b.score - a.score;
        }
      })
      .slice(0, 10);
  }, [analysis, sortMode]);

  const handleSave = (incPatientData?: Patient) => {
    if (!selectedPatient && !incPatientData) return;
    setIsSaving(true);
    
    // Gather physical general rubrics that have remedies and rubricName
    const pgItemsToAdd: AnalysisItem[] = [];
    const pgs = incPatientData?.physicalGenerals || physicalGenerals;
    if (pgs && Array.isArray(pgs)) {
      pgs.forEach(pg => {
        if (pg.rubricName && pg.remedies && pg.remedies.length > 0) {
          pgItemsToAdd.push({
            chapter: 'Generalities',
            rubric: pg.rubricName,
            text: pg.rubricName,
            page: '',
            remedies: pg.remedies
          });
        }
      });
    }

    if (pgItemsToAdd.length > 0 && onAddAnalysis) {
      onAddAnalysis(pgItemsToAdd);
    }

    const combinedRubrics = [...(incPatientData?.coreRubrics || analysis)];
    pgItemsToAdd.forEach(item => {
      if (!combinedRubrics.some(r => r.text === item.text)) {
        combinedRubrics.push(item);
      }
    });

    // Update patient with core rubrics from analysis and symptom data
    const updatedPatient: Patient = {
      ...(incPatientData || selectedPatient!),
      coreRubrics: combinedRubrics,
      chiefSymptoms: incPatientData?.chiefSymptoms || chiefSymptoms,
      mentalSymptoms: incPatientData?.mentalSymptoms || mentalSymptoms,
      physicalGenerals: incPatientData?.physicalGenerals || physicalGenerals,
      caseAnalysis: incPatientData?.caseAnalysis || caseAnalysis,
      remedy: incPatientData?.remedy || (selectedRemedies.length > 0 ? selectedRemedies[0] : undefined)
    };
    
    onUpdatePatient(updatedPatient);

    setTimeout(() => {
      setIsSaving(false);
      alert(t('analysis.saveSuccess'));
    }, 1500);
  };

  const handleTransfer = () => {
    if (!selectedPatient) return;
    const rx = {
      remedy: selectedRemedies.length > 0 ? selectedRemedies.join(', ') : 'None',
      potency: rxPotency,
      dosage: rxDosage,
      frequency: rxFrequency,
      duration: rxDuration,
      type: t('analysis.liquidDilution')
    };

    const updatedPatient: Patient = {
      ...selectedPatient,
      coreRubrics: [...analysis],
      chiefSymptoms,
      mentalSymptoms,
      physicalGenerals,
      caseAnalysis,
      remedy: selectedRemedies.length > 0 ? selectedRemedies[0] : undefined,
      prescriptions: [{ ...rx }]
    };
    onUpdatePatient(updatedPatient);
    setSelectedPatient(updatedPatient);
    setShowReport(true);
  };

  const getMiasmInfo = () => {
    if (analysisResults.length === 0) return { miasm: t('analysis.unknown'), load: 0, desc: t('analysis.miasmLoadDesc') };
    
    const topRemedy = analysisResults[0].name.toLowerCase();
    if (topRemedy.includes('calc') || topRemedy.includes('lyc') || topRemedy.includes('sulph')) {
      return { 
        miasm: t('analysis.psoric'), 
        load: 85, 
        desc: t('analysis.psoricDesc')
      };
    }
    if (topRemedy.includes('merc') || topRemedy.includes('aur') || topRemedy.includes('nit-ac')) {
      return { 
        miasm: t('analysis.syphilitic'), 
        load: 65, 
        desc: t('analysis.syphiliticDesc')
      };
    }
    return { 
      miasm: t('analysis.sycotic'), 
      load: 75, 
      desc: t('analysis.sycoticDesc')
    };
  };

  const miasmInfo = getMiasmInfo();

  if (!selectedPatient) {
    return (
      <div className="space-y-10 max-w-7xl mx-auto py-20 text-center">
        <div className="w-24 h-24 bg-surface-container-low rounded-full flex items-center justify-center text-outline/30 mx-auto mb-8">
          <Users size={48} />
        </div>
        <h2 className="text-3xl font-manrope font-extrabold text-on-surface tracking-tight">{t('analysis.noPatient')}</h2>
        <p className="text-outline font-medium max-w-md mx-auto mt-4">{t('analysis.noPatientDesc')}</p>
        <button 
          onClick={() => setActiveTab('dashboard')}
          className="mt-10 px-10 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:bg-primary-container transition-all"
        >
          {t('analysis.goToDashboard')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      {/* Vitals HUD */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="relative w-full lg:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 md:p-8 rounded-[2.5rem] group z-20">
          {/* Absolute Background with Border & Glows, handles overflow clipping safely */}
          <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50/40 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden pointer-events-none z-0">
            {/* Subtle Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 blur-2xl opacity-40 group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-teal-50 rounded-full blur-2xl opacity-30 group-hover:scale-125 transition-transform duration-700" />
          </div>

          {/* Patient Initials Circle / Avatar */}
          <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-[1.75rem] bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-2xl md:text-3xl shadow-lg shadow-emerald-200 shrink-0 select-none">
            {selectedPatient.name ? selectedPatient.name[0].toUpperCase() : 'P'}
          </div>

          <div className="relative z-10 flex-1 space-y-2">
            <span className="text-[9px] uppercase tracking-[0.3em] font-black text-emerald-600 block leading-none">
              {t('analysis.title')}
            </span>
            
            <div className="flex items-center gap-3 group/name cursor-pointer select-none" onClick={() => setShowPatientSelector(!showPatientSelector)}>
              <h2 className="text-3xl md:text-4xl font-manrope font-black text-slate-900 tracking-tight group-hover/name:text-emerald-500 transition-colors leading-tight">
                {selectedPatient.name}
              </h2>
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover/name:bg-emerald-50 group-hover/name:text-emerald-600 transition-colors">
                <ChevronDown size={20} className={`transition-transform duration-300 ${showPatientSelector ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {/* Badges Container */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="flex items-center gap-1.5 bg-slate-100/80 text-slate-700 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border border-slate-200/50">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                {t('analysis.miasm')}: <span className="text-slate-900">{miasmInfo.miasm}</span>
              </span>
              
              <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all ${
                selectedRemedies.length > 0 
                  ? 'bg-emerald-500 text-white border-emerald-500/10 shadow-md shadow-emerald-500/10' 
                  : 'bg-emerald-50 text-emerald-700 border-emerald-100'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${selectedRemedies.length > 0 ? 'bg-white animate-pulse' : 'bg-emerald-500'}`} />
                {selectedRemedies.length > 0 
                  ? `${t('analysis.selected')}: ${selectedRemedies.join(', ')}` 
                  : `${t('analysis.indicated')}: ${analysisResults[0]?.name || t('common.none')}`}
              </span>

              <span className="flex items-center gap-1.5 bg-slate-50 text-slate-500 px-3 py-1.5 rounded-xl text-[10px] font-medium border border-slate-100">
                <Calendar size={13} className="text-slate-400" />
                <span>{t('analysis.lastVisit')}: <strong className="font-bold text-slate-700">{selectedPatient.lastVisit}</strong></span>
              </span>
            </div>
          </div>
          
          <AnimatePresence>
            {showPatientSelector && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 mt-4 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
              >
                <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('reminders.selectPatient')}</p>
                </div>
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                  {patients.map(p => (
                    <button 
                      key={p.id}
                      onClick={() => {
                        setSelectedPatient(p);
                        setShowPatientSelector(false);
                      }}
                      className={`w-full text-left px-6 py-4 hover:bg-slate-50 transition-all flex items-center justify-between ${selectedPatient.id === p.id ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-slate-700'}`}
                    >
                      <span className="text-sm font-semibold">{p.name}</span>
                      {selectedPatient.id === p.id && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-md shadow-emerald-200" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <button 
            onClick={() => setShowIntake(!showIntake)}
            className={`px-4 py-3 md:px-6 md:py-3 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 flex-grow sm:flex-grow-0 justify-center ${
              showIntake ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            <ClipboardList size={14} />
            <span className="hidden sm:inline">{showIntake ? t('analysis.hideIntake') : t('analysis.showIntake')}</span>
            <span className="sm:hidden">Intake</span>
          </button>
          
          <div className="hidden xl:block h-10 w-px bg-surface-container-low" />
          
          <div className="flex flex-wrap gap-2 md:gap-3 flex-grow sm:flex-grow-0 justify-end w-full sm:w-auto">
            <button 
              onClick={() => {
                if (analysis.length > 0 && window.confirm('Are you sure you want to clear all selected rubrics?')) {
                  onClearAnalysis();
                } else if (analysis.length === 0) {
                  onClearAnalysis();
                }
              }}
              className="px-3 py-3 md:px-6 md:py-3 bg-error/10 text-error font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-error/20 transition-all flex items-center gap-2 flex-1 sm:flex-none justify-center"
              title="Clear Analysis"
            >
              <Trash2 size={14} /> 
              <span className="hidden sm:inline">{t('analysis.clear')}</span>
            </button>
            <button 
              onClick={() => onTransferToRx(selectedPatient)}
              className="px-3 py-3 md:px-6 md:py-3 bg-tertiary text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-tertiary/20 hover:bg-tertiary-container transition-all flex items-center gap-2 flex-1 sm:flex-none justify-center"
              title="Transfer to Rx"
            >
              <Stethoscope size={14} /> 
              <span className="hidden sm:inline">{t('analysis.prescribe')}</span>
            </button>
            <button 
              onClick={() => {
                if (!selectedPatient) return;
                // Prefer the last selected remedy as the next remedy
                const candidates = selectedRemedies.filter(r => r !== selectedPatient.remedy);
                const nextRemedy = candidates.length > 1 ? candidates[candidates.length - 1] : (candidates.length > 0 ? candidates[0] : (selectedRemedies.length > 1 ? selectedRemedies[selectedRemedies.length - 1] : (selectedRemedies[0] || '')));
                if (!nextRemedy) {
                  alert("Please select a medicine from the repertorization table first.");
                  return;
                }
                onTransferToRx(selectedPatient, nextRemedy);
              }}
              className="px-3 py-3 md:px-6 md:py-3 bg-amber-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-amber-600/20 hover:bg-amber-700 transition-all flex items-center gap-2 flex-1 sm:flex-none justify-center"
              title="Next Time"
            >
              <Clock size={14} /> 
              <span>Next Time</span>
            </button>
            <button 
              onClick={() => handleSave()}
              disabled={isSaving}
              className={`px-3 py-3 md:px-6 md:py-3 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 flex-1 sm:flex-none justify-center ${
                isSaving ? 'bg-surface-container-high text-outline cursor-not-allowed' : 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-container'
              }`}
            >
              {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              <span>{isSaving ? t('analysis.saving') : t('analysis.save')}</span>
            </button>
          </div>
        </div>
      </div>


      <AnimatePresence>
        {showIntake && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="w-full relative shadow-lg z-10"><ClinicalIntakeForm patient={selectedPatient} onAnalyze={() => setShowIntake(false)} onReport={() => setShowReport(true)} onSave={handleSave} onAddAnalysis={onAddAnalysis} onOpenRepertory={() => setActiveTab('repertory')} /></div>
            </motion.div>
        )}
      </AnimatePresence>

      {showReport && createPortal(
        <ReportPreviewModal 
          patient={selectedPatient}
          onClose={() => setShowReport(false)}
        />,
        document.body
      )}

      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Left Column: Case Rubrics */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-manrope text-xl font-extrabold tracking-tight">{t('analysis.caseRubrics')} <span className="text-outline font-bold ml-2 text-sm">({analysis.length})</span></h3>
            <button 
              onClick={() => setActiveTab('repertory')}
              className="text-primary hover:underline text-xs font-black uppercase tracking-widest"
            >
              + {t('common.next')}
            </button>
          </div>
          <div className="space-y-4">
            {analysis.length === 0 ? (
              <div className="bg-surface-container-low/30 border-2 border-dashed border-surface-container-low rounded-[2rem] p-12 text-center">
                <ClipboardList size={48} className="mx-auto text-outline/30 mb-4" />
                <p className="text-sm text-outline font-bold">{t('analysis.noRubrics')}</p>
                <p className="text-[10px] text-outline/60 uppercase tracking-widest mt-2">{t('analysis.goToRepertory')}</p>
              </div>
            ) : (
              analysis.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-surface-container-lowest p-6 rounded-[1.5rem] border-l-[6px] border-primary shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-outline">{item.chapter}</span>
                    <button 
                      onClick={() => onRemoveRubric(idx)}
                      className="text-outline hover:text-error transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-sm font-bold text-on-surface leading-relaxed mb-4">{item.text.split(',').map(part => cleanRubricName(part)).join(', ')}</p>
                  <div className="flex gap-2">
                    <span className="bg-surface-container-low text-on-surface-variant text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{item.remedies.length} {t('common.remedies')}</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Visual Analysis */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Repertorization Matrix */}
          <div className="bg-surface-container-lowest rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-surface-container-low">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
              <div>
                <h3 className="font-manrope text-2xl font-black text-on-surface tracking-tight">{t('analysis.matrixTitle')}</h3>
                <p className="text-sm text-outline font-medium mt-1">{t('analysis.matrixDesc')}</p>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-low p-1.5 rounded-2xl">
                <button 
                  onClick={() => setSortMode('score')}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-colors ${sortMode === 'score' ? 'bg-white text-primary shadow-sm' : 'text-outline hover:text-primary'}`}
                >
                  {t('analysis.byScore')}
                </button>
                <button 
                  onClick={() => setSortMode('coverage')}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-colors ${sortMode === 'coverage' ? 'bg-white text-primary shadow-sm' : 'text-outline hover:text-primary'}`}
                >
                  {t('analysis.byCoverage')}
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto custom-scrollbar pb-4">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-outline border-b border-surface-container-low">
                    <th className="pb-6 min-w-[220px]">{t('common.remedy')}</th>
                    <th className="pb-6 text-center">{t('common.score')}</th>
                    <th className="pb-6 text-center">{t('common.coverage')}</th>
                    {analysis.map((item, i) => (
                      <th key={i} className="pb-6 text-center max-w-[100px] truncate" title={item.text.split(',').map(part => cleanRubricName(part)).join(', ')}>
                        {cleanRubricName(item.text.split(',')[0])}
                      </th>
                    ))}
                    <th className="pb-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {analysisResults.length === 0 ? (
                    <tr>
                      <td colSpan={5 + analysis.length} className="py-20 text-center text-outline font-bold italic opacity-50">
                        No analysis data available. Please add rubrics to the case.
                      </td>
                    </tr>
                  ) : (
                    analysisResults.map((res, idx) => (
                      <tr 
                        key={idx} 
                        onClick={() => {
                          if (selectedRemedies.includes(res.name)) {
                            setSelectedRemedies(prev => prev.filter(r => r !== res.name));
                          } else {
                            setSelectedRemedies(prev => [...prev, res.name]);
                          }
                        }}
                        className={`group cursor-pointer transition-all ${selectedRemedies.includes(res.name) ? 'bg-primary/5' : 'hover:bg-surface-container-low/30'}`}
                      >
                        <td className="py-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-[11px] shadow-sm transition-all ${
                              selectedRemedies.includes(res.name) ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                            }`}>
                              {res.short}
                            </div>
                            <div>
                              <p className={`font-black tracking-tight transition-colors ${selectedRemedies.includes(res.name) ? 'text-primary' : 'text-on-surface'}`}>{res.name}</p>
                              <p className="text-[10px] text-outline font-bold uppercase tracking-widest">{t('common.remedy')}</p>
                            </div>
                          </div>
                        </td>
                        <td className={`text-center font-black text-base transition-colors ${selectedRemedies.includes(res.name) ? 'text-primary' : 'text-primary/60'}`}>{res.score}</td>
                        <td className="text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {Array.from({ length: Math.min(analysis.length, 5) }).map((_, i) => (
                              <span key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${
                                i < res.coverage ? (selectedRemedies.includes(res.name) ? 'bg-primary scale-125 shadow-md' : 'bg-primary/60 scale-110') : 'bg-outline-variant/20'
                              }`} />
                            ))}
                          </div>
                        </td>
                        {res.degrees.map((deg, dIdx) => (
                          <td key={dIdx} className="text-center">
                            {deg ? (
                              <span className={`inline-block w-8 h-8 leading-8 rounded-xl text-[11px] font-black shadow-sm transition-all ${
                                deg === 3 ? (selectedRemedies.includes(res.name) ? 'bg-primary text-white scale-110' : 'bg-primary/80 text-white') : 
                                deg === 2 ? (selectedRemedies.includes(res.name) ? 'bg-primary/60 text-white' : 'bg-primary/40 text-white') : 
                                'bg-secondary-container text-on-secondary-container'
                              }`}>
                                {deg}
                              </span>
                            ) : (
                              <span className="text-outline/30 font-bold">—</span>
                            )}
                          </td>
                        ))}
                        <td className="py-6 text-right pr-4">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (selectedRemedies.includes(res.name)) {
                                setSelectedRemedies(prev => prev.filter(r => r !== res.name));
                              } else {
                                setSelectedRemedies(prev => [...prev, res.name]);
                              }
                            }}
                            className={`p-2 rounded-xl transition-all ${
                              selectedRemedies.includes(res.name) 
                                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                : 'bg-surface-container-high text-outline hover:text-primary hover:bg-primary/10'
                            }`}
                          >
                            {selectedRemedies.includes(res.name) ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Strategic Clinical Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Miasmatic Analysis */}
            <div className="bg-surface-container-lowest rounded-[2.5rem] p-8 shadow-sm border border-surface-container-low">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Activity size={20} />
                </div>
                <h4 className="font-manrope font-black text-on-surface tracking-tight">{t('analysis.miasmaticAnalysis')}</h4>
              </div>
              <p className="text-xs text-on-surface-variant font-medium leading-relaxed mb-8">
                {miasmInfo.desc}
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-outline">{miasmInfo.miasm} {t('analysis.load')}</span>
                  <span className="text-xs font-black text-primary">{miasmInfo.load}%</span>
                </div>
                <div className="h-2.5 bg-surface-container-low rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${miasmInfo.load}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Remedy Comparison */}
            <div className="bg-primary-container rounded-[2.5rem] p-8 shadow-xl shadow-primary/10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                    <ArrowRightLeft size={20} />
                  </div>
                  <h4 className="font-manrope font-black tracking-tight">{t('materia.compareRemedies')}</h4>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-70">
                    {analysisResults[0]?.name || 'Remedy A'} vs {analysisResults[1]?.name || 'Remedy B'}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                    {t('analysis.top2Indicated')}
                  </span>
                </div>
                <div className="min-h-[60px] flex flex-col justify-center mb-6">
                  <p className="text-xs font-medium leading-relaxed opacity-90">
                    {analysisResults.length >= 2 
                      ? t('analysis.compareTop2Desc', { r1: analysisResults[0].name, r2: analysisResults[1].name })
                      : t('analysis.addRubricsForCompare')}
                  </p>
                </div>
                <button 
                  onClick={() => {
                    if (analysisResults.length >= 2) {
                      onCompare(analysisResults[0].name, analysisResults[1].name);
                    }
                  }}
                  disabled={analysisResults.length < 2}
                  className={`w-full py-4 bg-white text-primary rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg transition-all ${
                    analysisResults.length < 2 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-fixed'
                  }`}
                >
                  {t('materia.compareRemedies')}
                </button>
              </div>
            </div>
          </div>          {/* Prescription Guide - Moved here as Drop Downs */}
        </div>
      </div>
    </div>
  );
};



