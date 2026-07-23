import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Edit2, Trash2, ChevronDown, Check, X, User, Activity, FileText, Clock, AlertCircle, TrendingUp, Brain, History, MapPin, BookOpen } from 'lucide-react';
import { Patient, ChiefSymptom, AnalysisItem, RubricData, Remedy as RepertoryRemedy } from './types';
import { REPERTORY_DATA, CHAPTER_INDEX } from './constants';
import { useLanguage } from './LanguageContext';

const getAllRemedies = (data: RubricData): RepertoryRemedy[] => {
  const all: RepertoryRemedy[] = [];
  const seen = new Set<string>();
  
  const addRemedies = (rems: RepertoryRemedy[] | undefined) => {
    if (!rems) return;
    rems.forEach(r => {
      if (!seen.has(r.n)) {
        all.push(r);
        seen.add(r.n);
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
  addRemedies(data.appearance);
  addRemedies(data.symptoms);
  addRemedies(data.time);

  if (data.general) {
    Object.values(data.general).forEach(rems => addRemedies(rems));
  }

  return all;
};

const getRubricRemedies = (rubric: any): RepertoryRemedy[] => {
  if (!rubric) return [];
  const remedies: RepertoryRemedy[] = [];
  const seen = new Set<string>();

  const add = (rems: RepertoryRemedy[] | undefined) => {
    if (!rems) return;
    rems.forEach(r => {
      if (!seen.has(r.n)) {
        remedies.push(r);
        seen.add(r.n);
      }
    });
  };

  if (rubric.d) {
    add(getAllRemedies(rubric.d));
  }

  if (rubric.sr) {
    rubric.sr.forEach((sr: any) => {
      if (sr.d) add(getAllRemedies(sr.d));
      if (sr.sr) {
        sr.sr.forEach((ssr: any) => {
          if (ssr.d) add(getAllRemedies(ssr.d));
        });
      }
    });
  }

  return remedies;
};

const getMatchingGeneralRubrics = (label: string): { name: string; tr?: string; parent?: string; d?: RubricData }[] => {
  const genChapter = REPERTORY_DATA.find(c => c.name === 'Generalities');
  if (!genChapter) return [];

  const list: { name: string; tr?: string; parent?: string; d?: RubricData }[] = [];

  genChapter.rubrics.forEach(rubric => {
    rubric.sr.forEach(sr => {
      let match = false;
      if (label === 'Cravings') {
        match = rubric.name === 'Food' || rubric.name === 'FOOD';
      } else if (label === 'Thermals') {
        match = ['Cold', 'Heat', 'Warmth', 'Weather', 'COLD in general agg.', 'HEAT, sensation of'].includes(rubric.name);
      } else if (label === 'Appetite') {
        match = ['Eating', 'EATING, before'].includes(rubric.name) || sr.name.toLowerCase().includes('hunger');
      } else if (label === 'Thirst') {
        match = sr.name.toLowerCase().includes('drinks') || sr.name.toLowerCase().includes('drinking');
      }

      if (match) {
        list.push({
          name: sr.name,
          tr: sr.tr,
          parent: rubric.name,
          d: sr.d
        });
      }
    });
  });

  return list;
};

const LOCATION_OPTIONS = [
  "Head", "Forehead", "Temples", "Vertex", "Occiput", "Eyes", "Ears", "Nose", "Face", "Mouth", "Teeth", "Tongue", "Throat", 
  "Stomach", "Abdomen", "Hypochondrium", "Umbilical Region", "Iliac Region", "Rectum", "Anus", "Bladder", "Kidneys", "Urethra", 
  "Genitalia", "Larynx", "Trachea", "Chest", "Heart", "Lungs", "Back", "Spine", "Lumbar", "Sacrum", "Extremities", "Shoulders", 
  "Arms", "Hands", "Fingers", "Hips", "Legs", "Knees", "Feet", "Toes", "Skin", "Nerves", "Blood Vessels", "General"
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
const DURATION_OPTIONS = [
  "Hours", "Days", "1 Week", "2 Weeks", "3 Weeks", "1 Month", "2 Months", "3-6 Months", "6-12 Months", 
  "1 Year", "1-2 Years", "2-5 Years", "5+ Years", "Since Childhood"
];
const ONSET_OPTIONS = [
  "Gradual", "Sudden", "Since Birth", "After Injury", "After Illness", "After Emotional Shock", 
  "Recent", "Insidious", "Acute", "Recurrent"
];
const CRAVINGS_OPTIONS = [
  "Milk (+)", "Milk (++)", "Milk (-)", "Milk (--)",
  "Salt (+)", "Salt (++)", "Salt (-)", "Salt (--)",
  "Sweets (+)", "Sweets (++)", "Sweets (-)", "Sweets (--)",
  "Sour (+)", "Sour (++)", "Sour (-)", "Sour (--)",
  "Spicy (+)", "Spicy (++)", "Spicy (-)", "Spicy (--)",
  "Meat (+)", "Meat (++)", "Meat (-)", "Meat (--)",
  "Warm Food (+)", "Warm Food (++)", "Warm Food (-)", "Warm Food (--)",
  "Cold Food (+)", "Cold Food (++)", "Cold Food (-)", "Cold Food (--)",
  "Cold Drinks (+)", "Cold Drinks (++)", "Cold Drinks (-)", "Cold Drinks (--)",
  "Warm Drinks (+)", "Warm Drinks (++)", "Warm Drinks (-)", "Warm Drinks (--)"
];
const VACCINATION_OPTIONS = [
  "BCG", "Polio", "DPT", "Measles", "Hepatitis B", "COVID-19", "Typhoid", "Tetanus"
];
const HABIT_OPTIONS = [
  "Smoking", "Alcohol", "Tobacco Chewing", "Sedentary Lifestyle", "Night Watching", "Irregular Meals", "Tea/Coffee Addiction", "Drug Addiction"
];

export const ClinicalIntakeForm = ({ patient, onAnalyze, onReport, onSave, onAddAnalysis, onOpenRepertory }: {
  patient: Patient;
  onAnalyze: () => void;
  onReport: () => void;
  onSave: (p: Patient) => void;
  onAddAnalysis?: (item: AnalysisItem) => void;
  onOpenRepertory?: () => void;
}) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<Patient>({ ...patient });
  
  const allKentSubrubrics = useMemo(() => {
    const rubricsArr: { name: string, chapter: string, rubricName: string, sub: any }[] = [];
    
    REPERTORY_DATA.forEach(chapter => {
      chapter.rubrics.forEach(rubric => {
        rubric.sr.forEach(sr => {
          if (sr.name && sr.name.length > 2) {
            rubricsArr.push({
              name: sr.name,
              chapter: chapter.name,
              rubricName: rubric.name,
              sub: sr
            });
          }
        });
      });
    });
    
    return rubricsArr.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  useEffect(() => {
    setFormData({ ...patient });
  }, [patient]);

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const updateFormData = (key: keyof Patient, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value as never }));
  };

  const handleAddSymptom = () => {
    const newSymptom: ChiefSymptom = {
      complaint: '',
      location: '',
      sensation: '',
      modality: '',
      concomitant: '',
    };
    updateFormData('chiefSymptoms', [...(formData.chiefSymptoms || []), newSymptom]);
  };

  const handleUpdateSymptom = (index: number, key: keyof ChiefSymptom, value: string) => {
    const updated = [...(formData.chiefSymptoms || [])];
    const newSymptom = { ...updated[index], [key]: value };
    
    // Auto-detect location if it's currently empty and we are updating the complaint
    if (key === 'complaint' && (!newSymptom.location || newSymptom.location === '')) {
      const detected = findLocationFromComplaint(value);
      if (detected) newSymptom.location = detected;
    }

    updated[index] = newSymptom;
    updateFormData('chiefSymptoms', updated);
  };

  const handleDeleteSymptom = (index: number) => {
    const updated = [...(formData.chiefSymptoms || [])];
    updated.splice(index, 1);
    updateFormData('chiefSymptoms', updated);
  };

  const findLocationFromChapter = (chapter: string) => {
    const normalizedChapter = chapter.toUpperCase();
    if (normalizedChapter.includes('HEAD')) return 'Head';
    if (normalizedChapter.includes('EYE')) return 'Eyes';
    if (normalizedChapter.includes('EAR')) return 'Ears';
    if (normalizedChapter.includes('NOSE')) return 'Nose';
    if (normalizedChapter.includes('FACE')) return 'Face';
    if (normalizedChapter.includes('MOUTH')) return 'Mouth';
    if (normalizedChapter.includes('TEETH')) return 'Teeth';
    if (normalizedChapter.includes('THROAT')) return 'Throat';
    if (normalizedChapter.includes('STOMACH')) return 'Stomach';
    if (normalizedChapter.includes('ABDOMEN')) return 'Abdomen';
    if (normalizedChapter.includes('CHEST')) return 'Chest';
    if (normalizedChapter.includes('BACK')) return 'Back';
    if (normalizedChapter.includes('LUMBAR')) return 'Lumbar';
    if (normalizedChapter.includes('SPINE')) return 'Spine';
    if (normalizedChapter.includes('EXTREMITIES')) return 'Extremities';
    if (normalizedChapter.includes('SKIN')) return 'Skin';
    if (normalizedChapter.includes('BLADDER')) return 'Bladder';
    if (normalizedChapter.includes('KIDNEY')) return 'Kidneys';
    if (normalizedChapter.includes('URETHRA')) return 'Urethra';
    if (normalizedChapter.includes('GENITALIA')) return 'Genitalia';
    if (normalizedChapter.includes('RECTUM')) return 'Rectum';
    if (normalizedChapter.includes('GENERALITIES')) return 'General';
    return '';
  };

  const findLocationFromComplaint = (complaint: string) => {
    const lower = complaint.toLowerCase();
    if (lower.includes('head') || lower.includes('migraine')) return 'Head';
    if (lower.includes('abdominal') || lower.includes('abdomen') || lower.includes('acidity') || lower.includes('gastritis') || lower.includes('dyspepsia') || lower.includes('flatulence') || lower.includes('constipation') || lower.includes('diarrhea') || lower.includes('dysentery') || lower.includes('indigestion')) return 'Abdomen';
    if (lower.includes('backache') || lower.includes('lumbago') || lower.includes('sciatica')) return 'Back';
    if (lower.includes('joint') || lower.includes('ostearthritis') || lower.includes('rheumatism')) return 'Extremities';
    if (lower.includes('skin') || lower.includes('eczema') || lower.includes('psoriasis') || lower.includes('acne') || lower.includes('dermatitis') || lower.includes('warts') || lower.includes('itching') || lower.includes('boils') || lower.includes('pimples') || lower.includes('dandruff')) return 'Skin';
    if (lower.includes('urination') || lower.includes('burning urination')) return 'Bladder';
    if (lower.includes('throat') || lower.includes('cough') || lower.includes('tonsillitis') || lower.includes('stomatitis') || lower.includes('mouth ulcers')) return 'Throat';
    if (lower.includes('nasal catarrh') || lower.includes('allergic rhinitis')) return 'Nose';
    if (lower.includes('vertigo')) return 'Head';
    if (lower.includes('nausea') || lower.includes('vomiting')) return 'Stomach';
    if (lower.includes('leucorrhoea')) return 'Genitalia';
    if (lower.includes('hemorrhoids') || lower.includes('piles')) return 'Anus';
    return '';
  };

  // Pre-fill defaults if empty
  const symptoms = formData.chiefSymptoms?.length ? formData.chiefSymptoms : [
    { complaint: 'Chronic Gastritis with burning', location: 'Epigastric region', sensation: 'Burning', modality: 'Worse hot drinks', concomitant: 'Restlessness', physiological: 'gradual onset' }
  ];

  return (
    <div className="bg-[#f8fbfa] min-h-screen font-sans text-slate-800 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-emerald-100/50 p-6 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center overflow-hidden">
            <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${patient.name}&backgroundColor=e6f4ea`} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900">{patient.name}</h2>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-md tracking-wider">CASE-{patient.id.slice(0,4)}</span>
            </div>
            <p className="text-sm text-slate-500 font-medium mt-1">{patient.age} Years • {patient.gender}</p>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Visit</p>
            <p className="text-sm font-bold text-slate-700">12 Oct, 2023</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Blood Group</p>
            <p className="text-sm font-bold text-rose-600">B+ Positive</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-6">

        {/* Linked Repertory Rubrics — auto-populated from Kent's Repertory tab */}
        {formData.coreRubrics && formData.coreRubrics.length > 0 && (
          <section className="bg-emerald-50/60 rounded-3xl p-6 border border-emerald-100 shadow-sm relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-emerald-800 flex items-center gap-2 uppercase tracking-wider">
                <BookOpen className="text-emerald-600" size={18} />
                Repertory Rubrics Linked ({formData.coreRubrics.length})
              </h3>
              {onOpenRepertory && (
                <button
                  type="button"
                  onClick={onOpenRepertory}
                  className="text-[10px] font-black text-emerald-700 hover:underline flex items-center gap-1"
                >
                  + ADD MORE
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.coreRubrics.map((rubric, rIdx) => (
                <span
                  key={rIdx}
                  className="pl-3 pr-2 py-1.5 bg-white text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm"
                  title={rubric.remedies?.length ? `${rubric.remedies.length} remedies` : undefined}
                >
                  <span className="flex flex-col leading-tight">
                    <span>{rubric.subrubric || rubric.rubric}</span>
                    <span className="text-[9px] font-medium text-emerald-500 uppercase opacity-70">
                      {rubric.chapter}{rubric.rubric && rubric.subrubric ? ` — ${rubric.rubric}` : ''}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = (formData.coreRubrics || []).filter((_, i) => i !== rIdx);
                      updateFormData('coreRubrics', updated);
                    }}
                    className="w-4 h-4 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 flex items-center justify-center transition-colors shrink-0"
                    title="Remove"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Presenting Complaints */}
        <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <FileText className="text-emerald-600" size={20} />
              Presenting Complaints <span className="text-sm font-medium text-slate-500">(প্রধান সমস্যাবলী)</span>
            </h3>
            <button onClick={handleAddSymptom} className="flex items-center gap-2 px-4 py-2 bg-[#1e612a] text-white rounded-xl text-xs font-bold hover:bg-[#15471e] transition-colors shadow-sm">
              <Plus size={16} /> ADD SYMPTOM
            </button>
          </div>

          <div className="space-y-4">
            {symptoms.map((symptom, idx) => (
              <div key={idx} className="border border-slate-100 rounded-2xl p-5 bg-slate-50 relative group">
                <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-2">
                   <button onClick={() => handleDeleteSymptom(idx)} className="p-1.5 text-slate-400 hover:text-red-600 bg-white rounded-md shadow-sm border border-slate-100 transition-all hover:scale-110" title="Remove Symptom"><Trash2 size={14}/></button>
                </div>
                <div className="mb-4 relative pr-24">
                    <div className="flex items-center w-full group/input bg-white/50 rounded-xl px-4 py-2 border border-transparent group-hover/input:border-emerald-100 transition-all focus-within:bg-white focus-within:shadow-sm focus-within:border-emerald-200">
                      <input
                        type="text"
                        value={symptom.complaint || ''}
                        onChange={(e) => handleUpdateSymptom(idx, 'complaint', e.target.value)}
                        onFocus={() => setOpenDropdown(idx)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(idx);
                        }}
                        placeholder="Chief Complaint (e.g. Chronic Gastritis)"
                        className="flex-1 bg-transparent text-base font-bold text-slate-900 border-none outline-none focus:ring-0 p-0 placeholder:text-slate-300"
                        autoComplete="off"
                      />
                      <div className="flex items-center gap-1.5 ml-3 shrink-0">
                        <button type="button" className="p-1.5 text-slate-400 hover:text-[#1e612a] bg-slate-100/50 hover:bg-emerald-50 rounded-lg transition-all border border-slate-100/50 hover:border-emerald-100" title="Edit Details">
                            <Edit2 size={13}/>
                        </button>
                        <div className="relative">
                          <button 
                            type="button" 
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(openDropdown === idx ? null : idx);
                            }}
                            className={`p-1.5 rounded-lg transition-all ${openDropdown === idx ? 'bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-600/20' : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'}`}
                            title="Open Options"
                          >
                             <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === idx ? 'rotate-180' : ''}`}/>
                          </button>
                          
                          {openDropdown === idx && (
                            <div className="absolute right-0 top-full mt-2 w-80 bg-white shadow-2xl border border-slate-200 rounded-2xl p-3 z-[100] animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-between mb-3 px-2">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                                    {(symptom.complaint || '').length > 0 ? t('intake.searchSuggestions') : t('intake.commonComplaints')}
                                  </h4>
                                </div>
                                <button onClick={() => setOpenDropdown(null)} className="text-slate-400 hover:text-slate-600 transition-colors"><X size={12}/></button>
                              </div>
                              <div className="custom-scrollbar max-h-64 overflow-y-auto space-y-1">
                                {/* Repertory Suggestions First if any */}
                                {patient.coreRubrics && patient.coreRubrics
                                  .filter(r => {
                                    const text = (r.subrubric || r.rubric || '').toLowerCase();
                                    const query = (symptom.complaint || '').toLowerCase();
                                    return query.length > 0 && text.includes(query);
                                  })
                                  .map((rubric, rIdx) => (
                                    <button
                                    type="button"
                                    key={`rubric-${rIdx}`}
                                    onClick={() => {
                                      const complaint = rubric.subrubric || rubric.rubric;
                                      const location = findLocationFromChapter(rubric.chapter) || findLocationFromComplaint(complaint);
                                      
                                      const updated = [...(formData.chiefSymptoms || [])];
                                      updated[idx] = { 
                                        ...updated[idx], 
                                        complaint: complaint,
                                        location: location || updated[idx].location 
                                      };
                                      updateFormData('chiefSymptoms', updated);
                                      setOpenDropdown(null);
                                    }}
                                    className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors border border-transparent hover:border-emerald-100 flex flex-col"
                                  >
                                    <div className="flex items-center gap-2">
                                      <BookOpen size={10} className="text-emerald-500" />
                                      <span className="truncate">{rubric.subrubric || rubric.rubric}</span>
                                    </div>
                                    <span className="ml-5 text-[9px] font-medium text-slate-400 uppercase opacity-70 truncate">{rubric.chapter}</span>
                                  </button>
                                ))}

                                {/* Common & Kent's Rubrics */}
                                {allKentSubrubrics
                                  .filter(opt => {
                                    const query = (symptom.complaint || '').toLowerCase();
                                    return query.length === 0 || opt.name.toLowerCase().includes(query);
                                  })
                                  .slice(0, 50) // Reduced limit for better performance with objects
                                  .map((opt, cIdx) => (
                                    <button
                                      type="button"
                                      key={`common-${cIdx}`}
                                      onClick={() => {
                                        const location = findLocationFromChapter(opt.chapter) || findLocationFromComplaint(opt.name);
                                        const updated = [...(formData.chiefSymptoms || [])];
                                        updated[idx] = { 
                                          ...updated[idx], 
                                          complaint: opt.name,
                                          location: location || updated[idx].location 
                                        };
                                        updateFormData('chiefSymptoms', updated);
                                        
                                        // Auto-add to analysis if possible
                                        if (onAddAnalysis) {
                                          const chIndex = CHAPTER_INDEX.find(c => c.n === opt.chapter);
                                          onAddAnalysis({
                                            chapter: opt.chapter,
                                            rubric: opt.rubricName,
                                            subrubric: opt.name,
                                            text: `${opt.rubricName}, ${opt.name}`,
                                            category: t('intake.generalCategory'),
                                            page: chIndex?.p.split('-')[0] ? parseInt(chIndex.p.split('-')[0]) : 0,
                                            remedies: getAllRemedies(opt.sub.d)
                                          });
                                        }
                                        
                                        setOpenDropdown(null);
                                      }}
                                      className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors border border-transparent hover:border-slate-100 flex flex-col"
                                    >
                                      <span>{opt.name}</span>
                                      <span className="text-[8px] text-emerald-600 uppercase font-black opacity-60">{opt.chapter}</span>
                                    </button>
                                  ))
                                }

                                {onOpenRepertory && (
                                  <button 
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onOpenRepertory();
                                    }}
                                    className="w-full mt-2 py-2 text-[10px] font-black text-emerald-700 hover:bg-emerald-50 rounded-xl flex items-center justify-center gap-1 border border-dashed border-emerald-200"
                                  >
                                    <BookOpen size={12} /> BROWSE FULL REPERTORY
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                </div>
                  <div className="flex gap-3 mt-3">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-white px-2 py-1 border border-slate-200 rounded-md">
                      <Clock size={12} className="text-emerald-600"/> DURATION: 
                      <div className="relative flex items-center">
                        <select 
                          className="bg-transparent border-none outline-none text-[10px] appearance-none pr-4 cursor-pointer font-bold text-slate-700" 
                          value={symptom.duration || ''}
                          onChange={(e) => handleUpdateSymptom(idx, 'duration', e.target.value)}
                        >
                          <option value="">Select...</option>
                          {DURATION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        <ChevronDown size={10} className="absolute right-0 text-slate-400 pointer-events-none"/>
                      </div>
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-white px-2 py-1 border border-slate-200 rounded-md">
                      <Activity size={12} className="text-emerald-600"/> ONSET: 
                      <div className="relative flex items-center">
                        <select 
                          className="bg-transparent border-none outline-none text-[10px] appearance-none pr-4 cursor-pointer font-bold text-slate-700" 
                          value={symptom.physiological || ''} 
                          onChange={(e) => handleUpdateSymptom(idx, 'physiological', e.target.value)}
                        >
                          <option value="">Select...</option>
                          {ONSET_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        <ChevronDown size={10} className="absolute right-0 text-slate-400 pointer-events-none"/>
                      </div>
                    </span>
                  </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-6 border-t border-slate-200/60 pt-5">
                  <div>
                    <label className="flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-700 tracking-wider mb-1">
                      <MapPin size={12}/> LOCATION & EXTENSION
                    </label>
                    <div className="relative">
                      <select 
                        value={symptom.location || ''} 
                        onChange={(e) => handleUpdateSymptom(idx, 'location', e.target.value)}
                        className="w-full appearance-none bg-transparent text-sm text-slate-700 font-medium border-b border-slate-200 focus:border-emerald-500 outline-none pb-1 pr-6 cursor-pointer" 
                      >
                        <option value="">{t('common.search')}</option>
                        {LOCATION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-700 tracking-wider mb-1">
                      <AlertCircle size={12}/> DETAILED SENSATION
                    </label>
                    <div className="relative">
                      <select 
                        value={symptom.sensation || ''} 
                        onChange={(e) => handleUpdateSymptom(idx, 'sensation', e.target.value)}
                        className="w-full appearance-none bg-transparent text-sm text-slate-700 font-medium border-b border-slate-200 focus:border-emerald-500 outline-none pb-1 pr-6 cursor-pointer" 
                      >
                        <option value="">{t('common.search')}</option>
                        {SENSATION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-700 tracking-wider mb-1">
                      <TrendingUp size={12}/> MODALITIES (AGG/AMEL)
                    </label>
                    <div className="relative">
                      <select 
                        value={symptom.modality || ''} 
                        onChange={(e) => handleUpdateSymptom(idx, 'modality', e.target.value)}
                        className="w-full appearance-none bg-transparent text-sm text-slate-700 font-medium border-b border-slate-200 focus:border-emerald-500 outline-none pb-1 pr-6 cursor-pointer" 
                      >
                        <option value="">Select Modality...</option>
                        {MODALITY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-700 tracking-wider mb-1">
                      <TrendingUp size={12}/> CONCOMITANT
                    </label>
                    <div className="relative">
                      <select 
                        value={symptom.concomitant || ''} 
                        onChange={(e) => handleUpdateSymptom(idx, 'concomitant', e.target.value)}
                        className="w-full appearance-none bg-transparent text-sm text-slate-700 font-medium border-b border-slate-200 focus:border-emerald-500 outline-none pb-1 pr-6 cursor-pointer" 
                      >
                        <option value="">Select Concomitant...</option>
                        {CONCOMITANT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mental State */}
        <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative">
           <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
              <Brain className="text-emerald-600" size={20} />
              {t('intake.mentalState')} <span className="text-sm font-medium text-slate-500">(মানসিক অবস্থা)</span>
           </h3>

                      {(()=>{
              const mindChapter = REPERTORY_DATA.find(c => c.name === 'Mind');
              const mindRubrics = mindChapter ? mindChapter.rubrics : [];

              return (
                <div className="flex flex-col gap-4 mb-6">
                  <div className="relative mb-2">
                    <select
                      className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all appearance-none text-slate-700"
                      value=""
                      onChange={(e) => {
                        if (!e.target.value) return;
                        const rubricName = e.target.value;
                        const current = formData.mentalSymptoms || [];
                        if (!current.includes(rubricName)) {
                          updateFormData('mentalSymptoms', [...current, rubricName]);
                          if (onAddAnalysis) {
                            const selectedRubric = mindRubrics.find(r => r.name === rubricName);
                            if (selectedRubric) {
                              const remedies = getRubricRemedies(selectedRubric);
                              const chIndex = CHAPTER_INDEX.find(c => c.n === 'Mind');
                              onAddAnalysis({
                                chapter: 'Mind',
                                rubric: selectedRubric.name,
                                subrubric: selectedRubric.name,
                                text: `Mind, ${selectedRubric.name}`,
                                category: t('intake.mentalCategory'),
                                page: chIndex?.p.split('-')[0] ? parseInt(chIndex.p.split('-')[0]) : 0,
                                remedies: remedies
                              });
                            }
                          }
                        }
                      }}
                    >
                      <option value="">Select Mental Rubrics (Kent's Repertory)...</option>
                      {mindRubrics.map(rubric => (
                        <option key={rubric.name} value={rubric.name} disabled={formData.mentalSymptoms?.includes(rubric.name)}>
                          {rubric.name} {rubric.tr ? `(${rubric.tr})` : ''}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                  
                  {formData.mentalSymptoms && formData.mentalSymptoms.filter(s => s && !s.startsWith('Narrative:')).length > 0 && (
                     <div className="mt-4 pt-4 border-t border-slate-100">
                       <label className="block text-xs font-bold text-slate-700 mb-3">Selected ({formData.mentalSymptoms.filter(s => s && !s.startsWith('Narrative:')).length})</label>
                       <div className="flex flex-wrap gap-2">
                         {formData.mentalSymptoms.filter(s => s && !s.startsWith('Narrative:')).map(s => (
                           <span key={s} className="pl-3 pr-2 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm">
                             {s}
                             <button 
                              onClick={() => {
                                updateFormData('mentalSymptoms', (formData.mentalSymptoms || []).filter(ms => ms !== s));
                              }}
                              className="w-4 h-4 rounded-full bg-emerald-200 hover:bg-emerald-300 text-emerald-800 flex items-center justify-center transition-colors"
                             >
                                <X size={10} />
                             </button>
                           </span>
                         ))}
                       </div>
                     </div>
                  )}
                </div>
              );
           })()}

           <div className="grid grid-cols-1 gap-8">
             <div className="md:col-span-3">
               <label className="block text-xs font-bold text-slate-700 mb-3">Detailed Narrative (বিস্তারিত বিবরণ)</label>
               <textarea 
                 rows={3}
                 value={(formData.mentalSymptoms || []).find(s => s && s.startsWith('Narrative:'))?.replace('Narrative:', '') || ''}
                 onChange={(e) => {
                   const current = (formData.mentalSymptoms || []).filter(s => s && !s.startsWith('Narrative:'));
                   updateFormData('mentalSymptoms', [...current, `Narrative:${e.target.value}`]);
                 }}
                 className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500 resize-none"
                 placeholder="Recording psychological observations, temperament, fears, and dreams..."
               />
             </div>
           </div>
        </section>

          {/* Physical Generals */}
         <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
               <Activity className="text-emerald-600" size={20} />
               {t('intake.physicalGenerals')} <span className="text-sm font-medium text-slate-500">(শারীরিক সাধারণ লক্ষণ)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Appetite Field */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-[120px_1fr] items-start gap-4 border-b border-slate-100 pb-4">
                <label className="text-sm font-bold text-slate-700 pt-2">Appetite <span className="text-xs text-slate-400 font-medium block mt-0.5">(ক্ষুধা)</span></label>
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex flex-wrap gap-3">
                    {/* Free-text Selector */}
                    <div className="relative flex-1 min-w-[200px]">
                      <select 
                        value={formData.physicalGenerals?.find(p => p.label === 'Appetite' && !p.rubricName)?.value || ''}
                        onChange={(e) => {
                          const updated = (formData.physicalGenerals || []).filter(p => p.label !== 'Appetite' || p.rubricName);
                          if (e.target.value) {
                            updated.push({ label: 'Appetite', value: e.target.value });
                          }
                          updateFormData('physicalGenerals', updated);
                        }}
                        className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        <option value="">Select Custom Value...</option>
                        <option value="Normal">Normal (স্বাভাবিক)</option>
                        <option value="Increased">Increased (বেশি)</option>
                        <option value="Decreased">Decreased (কম)</option>
                        <option value="Ravenous">Ravenous (রাক্ষুসে ক্ষুধা)</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>

                    {/* Repertory Rubric Selector */}
                    <div className="relative flex-1 min-w-[200px]">
                      <select 
                        value=""
                        onChange={(e) => {
                          if (!e.target.value) return;
                          const rubrics = getMatchingGeneralRubrics('Appetite');
                          const match = rubrics.find(r => r.name === e.target.value);
                          if (match) {
                            const updated = [...(formData.physicalGenerals || [])];
                            if (!updated.some(p => p.label === 'Appetite' && p.rubricName === match.name)) {
                              const remedies = match.d ? getAllRemedies(match.d) : [];
                              updated.push({
                                label: 'Appetite',
                                value: match.name,
                                rubricName: match.name,
                                remedies: remedies
                              });
                              updateFormData('physicalGenerals', updated);

                              if (onAddAnalysis) {
                                const chIndex = CHAPTER_INDEX.find(c => c.n === 'Generalities');
                                onAddAnalysis({
                                  chapter: 'Generalities',
                                  rubric: match.parent || 'Generalities',
                                  subrubric: match.name,
                                  text: `${match.parent || 'Generalities'}, ${match.name}`,
                                  category: t('intake.generalCategory'),
                                  page: chIndex?.p.split('-')[0] ? parseInt(chIndex.p.split('-')[0]) : 0,
                                  remedies: remedies
                                });
                              }
                            }
                          }
                        }}
                        className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        <option value="">Add Appetite Repertory Rubric...</option>
                        {getMatchingGeneralRubrics('Appetite').map(r => (
                          <option key={r.name} value={r.name}>
                            {r.name} {r.tr ? `(${r.tr})` : ''}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>
                  </div>

                  {/* Active Selections list */}
                  <div className="flex flex-col gap-2 mt-2">
                    {formData.physicalGenerals?.filter(p => p.label === 'Appetite').map((item, pIdx) => {
                      const isRubric = !!item.rubricName;
                      return (
                        <div key={pIdx} className="bg-slate-50 hover:bg-slate-100/70 border border-slate-150 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition">
                          <div className="flex flex-col">
                            <span className={`text-xs font-bold ${isRubric ? 'text-emerald-800' : 'text-slate-700'}`}>
                              {isRubric ? `📖 Rubric: ${item.value}` : `✍️ Custom: ${item.value}`}
                            </span>
                            {isRubric && item.remedies && item.remedies.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1.5 items-center">
                                <span className="text-[9px] font-black uppercase text-slate-400 mr-1">Remedies:</span>
                                {item.remedies.slice(0, 10).map((rem, rIdx) => (
                                  <span key={rIdx} className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                    rem.g === 3 ? 'bg-error-container text-on-error-container border border-error-container/20' : 
                                    rem.g === 2 ? 'bg-tertiary-container text-on-tertiary-container' : 
                                    'bg-secondary-container text-on-secondary-container'
                                  }`}>
                                    {rem.n}
                                  </span>
                                ))}
                                {item.remedies.length > 10 && (
                                  <span className="text-[10px] text-slate-500 font-bold">+${item.remedies.length - 10} more</span>
                                )}
                              </div>
                            )}
                          </div>
                          <button 
                            type="button"
                            onClick={() => {
                              const updated = (formData.physicalGenerals || []).filter((_, idx) => {
                                const originalIdx = (formData.physicalGenerals || []).indexOf(item);
                                return idx !== originalIdx;
                              });
                              updateFormData('physicalGenerals', updated);
                            }}
                            className="self-end sm:self-auto text-slate-400 hover:text-error transition p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Thirst Field */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-[120px_1fr] items-start gap-4 border-b border-slate-100 pb-4">
                <label className="text-sm font-bold text-slate-700 pt-2">Thirst <span className="text-xs text-slate-400 font-medium block mt-0.5">(তৃষ্ণা)</span></label>
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex flex-wrap gap-3">
                    {/* Free-text Selector */}
                    <div className="relative flex-1 min-w-[200px]">
                      <select 
                        value={formData.physicalGenerals?.find(p => p.label === 'Thirst' && !p.rubricName)?.value || ''}
                        onChange={(e) => {
                          const updated = (formData.physicalGenerals || []).filter(p => p.label !== 'Thirst' || p.rubricName);
                          if (e.target.value) {
                            updated.push({ label: 'Thirst', value: e.target.value });
                          }
                          updateFormData('physicalGenerals', updated);
                        }}
                        className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        <option value="">Select Custom Value...</option>
                        <option value="Normal">Normal (স্বাভাবিক)</option>
                        <option value="Thirstless">Thirstless (তৃষ্ণাহীন)</option>
                        <option value="Unquenchable">Unquenchable (প্রচণ্ড তৃষ্ণা)</option>
                        <option value="Small intervals">Small quantity often (সল্প পরিমাণে বারবার)</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>

                    {/* Repertory Rubric Selector */}
                    <div className="relative flex-1 min-w-[200px]">
                      <select 
                        value=""
                        onChange={(e) => {
                          if (!e.target.value) return;
                          const rubrics = getMatchingGeneralRubrics('Thirst');
                          const match = rubrics.find(r => r.name === e.target.value);
                          if (match) {
                            const updated = [...(formData.physicalGenerals || [])];
                            if (!updated.some(p => p.label === 'Thirst' && p.rubricName === match.name)) {
                              const remedies = match.d ? getAllRemedies(match.d) : [];
                              updated.push({
                                label: 'Thirst',
                                value: match.name,
                                rubricName: match.name,
                                remedies: remedies
                              });
                              updateFormData('physicalGenerals', updated);

                              if (onAddAnalysis) {
                                const chIndex = CHAPTER_INDEX.find(c => c.n === 'Generalities');
                                onAddAnalysis({
                                  chapter: 'Generalities',
                                  rubric: match.parent || 'Generalities',
                                  subrubric: match.name,
                                  text: `${match.parent || 'Generalities'}, ${match.name}`,
                                  category: t('intake.generalCategory'),
                                  page: chIndex?.p.split('-')[0] ? parseInt(chIndex.p.split('-')[0]) : 0,
                                  remedies: remedies
                                });
                              }
                            }
                          }
                        }}
                        className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        <option value="">Add Thirst Repertory Rubric...</option>
                        {getMatchingGeneralRubrics('Thirst').map(r => (
                          <option key={r.name} value={r.name}>
                            {r.name} {r.tr ? `(${r.tr})` : ''}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>
                  </div>

                  {/* Active Selections list */}
                  <div className="flex flex-col gap-2 mt-2">
                    {formData.physicalGenerals?.filter(p => p.label === 'Thirst').map((item, pIdx) => {
                      const isRubric = !!item.rubricName;
                      return (
                        <div key={pIdx} className="bg-slate-50 hover:bg-slate-100/70 border border-slate-150 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition">
                          <div className="flex flex-col">
                            <span className={`text-xs font-bold ${isRubric ? 'text-emerald-800' : 'text-slate-700'}`}>
                              {isRubric ? `📖 Rubric: ${item.value}` : `✍️ Custom: ${item.value}`}
                            </span>
                            {isRubric && item.remedies && item.remedies.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1.5 items-center">
                                <span className="text-[9px] font-black uppercase text-slate-400 mr-1">Remedies:</span>
                                {item.remedies.slice(0, 10).map((rem, rIdx) => (
                                  <span key={rIdx} className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                    rem.g === 3 ? 'bg-error-container text-on-error-container border border-error-container/20' : 
                                    rem.g === 2 ? 'bg-tertiary-container text-on-tertiary-container' : 
                                    'bg-secondary-container text-on-secondary-container'
                                  }`}>
                                    {rem.n}
                                  </span>
                                ))}
                                {item.remedies.length > 10 && (
                                  <span className="text-[10px] text-slate-500 font-bold">+${item.remedies.length - 10} more</span>
                                )}
                              </div>
                            )}
                          </div>
                          <button 
                            type="button"
                            onClick={() => {
                              const updated = (formData.physicalGenerals || []).filter((_, idx) => {
                                const originalIdx = (formData.physicalGenerals || []).indexOf(item);
                                return idx !== originalIdx;
                              });
                              updateFormData('physicalGenerals', updated);
                            }}
                            className="self-end sm:self-auto text-slate-400 hover:text-error transition p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Cravings Field */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-[120px_1fr] items-start gap-4 border-b border-slate-100 pb-4">
                <label className="text-sm font-bold text-slate-700 pt-2">Cravings / Aversions <span className="text-xs text-slate-400 font-medium block mt-0.5">(পছন্দ ও অপছন্দ)</span></label>
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex flex-wrap gap-3">
                    {/* Free-text Selector */}
                    <div className="relative flex-1 min-w-[200px]">
                      <select 
                        className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500 cursor-pointer"
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val) {
                            const updated = [...(formData.physicalGenerals || [])];
                            if (!updated.some(p => p.label === 'Cravings' && !p.rubricName && p.value === val)) {
                              updated.push({ label: 'Cravings', value: val });
                              updateFormData('physicalGenerals', updated);
                            }
                          }
                          e.target.value = '';
                        }}
                      >
                        <option value="">Select Custom Craving or Aversion...</option>
                        {CRAVINGS_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>

                    {/* Repertory Rubric Selector */}
                    <div className="relative flex-1 min-w-[200px]">
                      <select 
                        value=""
                        onChange={(e) => {
                          if (!e.target.value) return;
                          const rubrics = getMatchingGeneralRubrics('Cravings');
                          const match = rubrics.find(r => r.name === e.target.value);
                          if (match) {
                            const updated = [...(formData.physicalGenerals || [])];
                            if (!updated.some(p => p.label === 'Cravings' && p.rubricName === match.name)) {
                              const remedies = match.d ? getAllRemedies(match.d) : [];
                              updated.push({
                                label: 'Cravings',
                                value: match.name,
                                rubricName: match.name,
                                remedies: remedies
                              });
                              updateFormData('physicalGenerals', updated);

                              if (onAddAnalysis) {
                                const chIndex = CHAPTER_INDEX.find(c => c.n === 'Generalities');
                                onAddAnalysis({
                                  chapter: 'Generalities',
                                  rubric: match.parent || 'Generalities',
                                  subrubric: match.name,
                                  text: `${match.parent || 'Generalities'}, ${match.name}`,
                                  category: t('intake.generalCategory'),
                                  page: chIndex?.p.split('-')[0] ? parseInt(chIndex.p.split('-')[0]) : 0,
                                  remedies: remedies
                                });
                              }
                            }
                          }
                        }}
                        className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        <option value="">Add Cravings Repertory Rubric...</option>
                        {getMatchingGeneralRubrics('Cravings').map(r => (
                          <option key={r.name} value={r.name}>
                            {r.name} {r.tr ? `(${r.tr})` : ''}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>
                  </div>

                  {/* Active Selections list */}
                  <div className="flex flex-col gap-2 mt-2">
                    {formData.physicalGenerals?.filter(p => p.label === 'Cravings').map((item, pIdx) => {
                      const isRubric = !!item.rubricName;
                      return (
                        <div key={pIdx} className="bg-slate-50 hover:bg-slate-100/70 border border-slate-150 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition">
                          <div className="flex flex-col">
                            <span className={`text-xs font-bold ${isRubric ? 'text-emerald-800' : 'text-slate-700'}`}>
                              {isRubric ? `📖 Rubric: ${item.value}` : `✍️ Custom: ${item.value}`}
                            </span>
                            {isRubric && item.remedies && item.remedies.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1.5 items-center">
                                <span className="text-[9px] font-black uppercase text-slate-400 mr-1">Remedies:</span>
                                {item.remedies.slice(0, 10).map((rem, rIdx) => (
                                  <span key={rIdx} className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                    rem.g === 3 ? 'bg-error-container text-on-error-container border border-error-container/20' : 
                                    rem.g === 2 ? 'bg-tertiary-container text-on-tertiary-container' : 
                                    'bg-secondary-container text-on-secondary-container'
                                  }`}>
                                    {rem.n}
                                  </span>
                                ))}
                                {item.remedies.length > 10 && (
                                  <span className="text-[10px] text-slate-500 font-bold">+${item.remedies.length - 10} more</span>
                                )}
                              </div>
                            )}
                          </div>
                          <button 
                            type="button"
                            onClick={() => {
                              const updated = (formData.physicalGenerals || []).filter((_, idx) => {
                                const originalIdx = (formData.physicalGenerals || []).indexOf(item);
                                return idx !== originalIdx;
                              });
                              updateFormData('physicalGenerals', updated);
                            }}
                            className="self-end sm:self-auto text-slate-400 hover:text-error transition p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Thermals Field */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-[120px_1fr] items-start gap-4 border-b border-slate-100 pb-4">
                <label className="text-sm font-bold text-slate-700 pt-2">Thermals <span className="text-xs text-slate-400 font-medium block mt-0.5">(তাপমান)</span></label>
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex flex-wrap gap-3 items-center">
                    {/* Buttons for custom thermals */}
                    <div className="flex bg-slate-50 rounded-xl p-1 border border-slate-100 flex-1 min-w-[200px]">
                      {['CHILLY', 'HOT', 'AMBI-THERMAL'].map(therm => (
                        <button 
                          key={therm}
                          type="button"
                          onClick={() => {
                            const updated = (formData.physicalGenerals || []).filter(p => p.label !== 'Thermals' || p.rubricName);
                            updated.push({ label: 'Thermals', value: therm });
                            updateFormData('physicalGenerals', updated);
                          }}
                          className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition flex flex-col items-center gap-1 ${
                            formData.physicalGenerals?.find(p => p.label === 'Thermals' && !p.rubricName)?.value === therm
                              ? 'bg-white shadow-sm text-emerald-700 border border-emerald-100'
                              : 'text-slate-500 hover:text-slate-700'
                          }`}
                        >
                          {therm}
                        </button>
                      ))}
                    </div>

                    {/* Repertory Rubric Selector */}
                    <div className="relative flex-1 min-w-[200px]">
                      <select 
                        value=""
                        onChange={(e) => {
                          if (!e.target.value) return;
                          const rubrics = getMatchingGeneralRubrics('Thermals');
                          const match = rubrics.find(r => r.name === e.target.value);
                          if (match) {
                            const updated = [...(formData.physicalGenerals || [])];
                            if (!updated.some(p => p.label === 'Thermals' && p.rubricName === match.name)) {
                              const remedies = match.d ? getAllRemedies(match.d) : [];
                              updated.push({
                                label: 'Thermals',
                                value: match.name,
                                rubricName: match.name,
                                remedies: remedies
                              });
                              updateFormData('physicalGenerals', updated);

                              if (onAddAnalysis) {
                                const chIndex = CHAPTER_INDEX.find(c => c.n === 'Generalities');
                                onAddAnalysis({
                                  chapter: 'Generalities',
                                  rubric: match.parent || 'Generalities',
                                  subrubric: match.name,
                                  text: `${match.parent || 'Generalities'}, ${match.name}`,
                                  category: t('intake.generalCategory'),
                                  page: chIndex?.p.split('-')[0] ? parseInt(chIndex.p.split('-')[0]) : 0,
                                  remedies: remedies
                                });
                              }
                            }
                          }
                        }}
                        className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        <option value="">Add Thermals Repertory Rubric...</option>
                        {getMatchingGeneralRubrics('Thermals').map(r => (
                          <option key={r.name} value={r.name}>
                            {r.name} {r.tr ? `(${r.tr})` : ''}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>
                  </div>

                  {/* Active Selections list */}
                  <div className="flex flex-col gap-2 mt-2">
                    {formData.physicalGenerals?.filter(p => p.label === 'Thermals').map((item, pIdx) => {
                      const isRubric = !!item.rubricName;
                      return (
                        <div key={pIdx} className="bg-slate-50 hover:bg-slate-100/70 border border-slate-150 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition">
                          <div className="flex flex-col">
                            <span className={`text-xs font-bold ${isRubric ? 'text-emerald-800' : 'text-slate-700'}`}>
                              {isRubric ? `📖 Rubric: ${item.value}` : `✍️ Custom: ${item.value}`}
                            </span>
                            {isRubric && item.remedies && item.remedies.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1.5 items-center">
                                <span className="text-[9px] font-black uppercase text-slate-400 mr-1">Remedies:</span>
                                {item.remedies.slice(0, 10).map((rem, rIdx) => (
                                  <span key={rIdx} className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                    rem.g === 3 ? 'bg-error-container text-on-error-container border border-error-container/20' : 
                                    rem.g === 2 ? 'bg-tertiary-container text-on-tertiary-container' : 
                                    'bg-secondary-container text-on-secondary-container'
                                  }`}>
                                    {rem.n}
                                  </span>
                                ))}
                                {item.remedies.length > 10 && (
                                  <span className="text-[10px] text-slate-500 font-bold">+${item.remedies.length - 10} more</span>
                                )}
                              </div>
                            )}
                          </div>
                          <button 
                            type="button"
                            onClick={() => {
                              const updated = (formData.physicalGenerals || []).filter((_, idx) => {
                                const originalIdx = (formData.physicalGenerals || []).indexOf(item);
                                return idx !== originalIdx;
                              });
                              updateFormData('physicalGenerals', updated);
                            }}
                            className="self-end sm:self-auto text-slate-400 hover:text-error transition p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Notes Field */}
              <div className="md:col-span-2 grid grid-cols-[120px_1fr] items-center gap-4 border-b border-slate-100 pb-4">
                <label className="text-sm font-bold text-slate-700">Detailed Notes</label>
                <textarea 
                  rows={2}
                  value={formData.physicalGenerals?.find(p => p.label === 'Notes')?.value || ''}
                  onChange={(e) => {
                    const updated = (formData.physicalGenerals || []).filter(p => p.label !== 'Notes');
                    if (e.target.value) updated.push({ label: 'Notes', value: e.target.value });
                    updateFormData('physicalGenerals', updated);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500 resize-none"
                  placeholder="Tongue, Sweat, Craving, Aversion, Perspiration..."
                />
              </div>
            </div>
         </section>
{/* History */}
        <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative mb-24">
           <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
              <History className="text-emerald-600" size={20} />
              {t('intake.history')} <span className="text-sm font-medium text-slate-500">(ইতিহাস)</span>
           </h3>

           <div className="space-y-8">
             <div>
               <label className="block text-xs font-black text-slate-400 tracking-widest uppercase mb-4">Past Illness (অতীতের পীড়া)</label>
               <div className="flex flex-wrap gap-6 mb-4">
                 {['Chronic Conditions', 'Major Operations', 'Childhood Illness'].map(illness => {
                   const isActive = formData.history?.pastIllnessOptions?.includes(illness);
                   return (
                     <label key={illness} className="flex items-center gap-2 cursor-pointer" onClick={() => {
                       const current = formData.history?.pastIllnessOptions || [];
                       updateFormData('history', {
                         ...formData.history,
                         pastIllnessOptions: isActive ? current.filter(i => i !== illness) : [...current, illness]
                       });
                     }}>
                       <div className={`w-4 h-4 rounded flex items-center justify-center ${isActive ? 'bg-[#1e612a]' : 'border border-slate-300'}`}>
                         {isActive && <Check size={12} className="text-white"/>}
                       </div>
                       <span className="text-sm font-medium text-slate-700">{illness}</span>
                     </label>
                   )
                 })}
               </div>
               <textarea 
                 rows={2}
                 value={formData.history?.pastIllnessDetails || ''}
                 onChange={(e) => updateFormData('history', { ...formData.history, pastIllnessDetails: e.target.value })}
                 className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm text-slate-600 outline-none focus:border-emerald-500 resize-none"
                 placeholder="Details: Typhoid at age 12, Appendectomy in 2015..."
               />
             </div>

             <div className="border-t border-slate-100 pt-8">
               <label className="block text-xs font-black text-slate-400 tracking-widest uppercase mb-4">Family History (বংশগত ইতিহাস)</label>
               <div className="space-y-2">
                 <div className="flex items-center justify-between border border-slate-100 rounded-xl p-4 bg-slate-50">
                    <div className="flex items-center gap-3 w-full mr-4">
                      <User size={16} className="text-slate-400 shrink-0"/>
                      <input 
                        type="text"
                        value={formData.history?.familyPaternal || ''}
                        onChange={(e) => updateFormData('history', { ...formData.history, familyPaternal: e.target.value })}
                        className="bg-transparent border-none outline-none text-sm font-medium text-slate-700 w-full placeholder-slate-400"
                        placeholder="Diabetes (Father), Heart issues..."
                      />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0">PATERNAL</span>
                 </div>
                 <div className="flex items-center justify-between border border-slate-100 rounded-xl p-4 bg-slate-50">
                    <div className="flex items-center gap-3 w-full mr-4">
                      <User size={16} className="text-slate-400 shrink-0"/>
                      <input 
                        type="text"
                        value={formData.history?.familyMaternal || ''}
                        onChange={(e) => updateFormData('history', { ...formData.history, familyMaternal: e.target.value })}
                        className="bg-transparent border-none outline-none text-sm font-medium text-slate-700 w-full placeholder-slate-400"
                        placeholder="Asthma (Mother), Hypertension..."
                      />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0">MATERNAL</span>
                 </div>
               </div>
             </div>

             <div className="border-t border-slate-100 pt-8">
               <label className="block text-xs font-black text-slate-400 tracking-widest uppercase mb-4">Treatment History (চিকিৎসা ইতিহাস)</label>
               <div className="grid grid-cols-2 gap-4 mb-4">
                 <div className="relative border border-slate-200 rounded-xl">
                   <select 
                     value={formData.history?.treatmentMode || ''}
                     onChange={(e) => updateFormData('history', { ...formData.history, treatmentMode: e.target.value })}
                     className="w-full appearance-none bg-slate-50 hover:bg-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 outline-none cursor-pointer transition"
                   >
                     <option value="">Previous Mode</option>
                     <option value="Allopathic">Allopathic</option>
                     <option value="Ayurvedic">Ayurvedic</option>
                     <option value="Homeopathic">Homeopathic</option>
                     <option value="Unani">Unani</option>
                   </select>
                   <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                 </div>
                 <div className="relative border border-slate-200 rounded-xl">
                   <select 
                     value={formData.history?.treatmentResponse || ''}
                     onChange={(e) => updateFormData('history', { ...formData.history, treatmentResponse: e.target.value })}
                     className="w-full appearance-none bg-slate-50 hover:bg-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 outline-none cursor-pointer transition"
                   >
                     <option value="">Response</option>
                     <option value="Cured">Cured</option>
                     <option value="Palliated">Palliated</option>
                     <option value="Suppressed">Suppressed</option>
                     <option value="No Effect">No Effect</option>
                   </select>
                   <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                 </div>
               </div>
               <textarea 
                 rows={2}
                 value={formData.history?.treatmentDetails || ''}
                 onChange={(e) => updateFormData('history', { ...formData.history, treatmentDetails: e.target.value })}
                 className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm text-slate-600 outline-none focus:border-emerald-500 resize-none"
                 placeholder="Suppressed symptoms or side effects..."
               />
             </div>

             <div className="border-t border-slate-100 pt-8">
               <label className="block text-xs font-black text-slate-400 tracking-widest uppercase mb-4">Vaccination (টিকাদান)</label>
               <div className="flex items-center justify-between border border-slate-100 rounded-xl p-4 bg-slate-50 mb-4">
                  <span className="text-sm font-medium text-slate-700">Vaccination Status</span>
                  <div className="flex bg-white rounded-lg p-1 border border-slate-200">
                    <button 
                      onClick={() => updateFormData('history', { ...formData.history, vaccinationStatus: 'Complete' })}
                      className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest ${formData.history?.vaccinationStatus === 'Complete' ? 'bg-[#1e612a] text-white' : 'text-slate-400 hover:text-slate-600'}`}>Complete</button>
                    <button 
                      onClick={() => updateFormData('history', { ...formData.history, vaccinationStatus: 'Partial' })}
                      className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest ${formData.history?.vaccinationStatus === 'Partial' ? 'bg-[#1e612a] text-white' : 'text-slate-400 hover:text-slate-600'}`}>Partial</button>
                    <button 
                      onClick={() => updateFormData('history', { ...formData.history, vaccinationStatus: 'Unvaccinated' })}
                      className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest ${formData.history?.vaccinationStatus === 'Unvaccinated' ? 'bg-[#1e612a] text-white' : 'text-slate-400 hover:text-slate-600'}`}>Unvaccinated</button>
                  </div>
               </div>
               <div className="flex flex-col gap-3">
                 <div className="relative">
                   <select 
                     className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 outline-none focus:border-emerald-500 cursor-pointer"
                     onChange={(e) => {
                       const val = e.target.value;
                       if (val) {
                         const items = [...(formData.history?.vaccinations || [])];
                         if (!items.includes(val)) {
                           items.push(val);
                           updateFormData('history', { ...formData.history, vaccinations: items });
                         }
                       }
                       e.target.value = '';
                     }}
                   >
                     <option value="">Select Specific Vaccines...</option>
                     {VACCINATION_OPTIONS.map(opt => (
                       <option key={opt} value={opt}>{opt}</option>
                     ))}
                   </select>
                   <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                 </div>
                 
                 {/* Display active tags */}
                 <div className="flex flex-wrap gap-2 mb-4">
                   {(formData.history?.vaccinations || []).map(item => (
                     <div key={item} className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 border border-slate-200">
                       {item}
                       <button 
                         onClick={() => {
                           const items = (formData.history?.vaccinations || []).filter(s => s !== item);
                           updateFormData('history', { ...formData.history, vaccinations: items });
                         }}
                         className="text-slate-400 hover:text-slate-600"
                       >
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                       </button>
                     </div>
                   ))}
                 </div>
               </div>
             </div>

             <div className="border-t border-slate-100 pt-8">
               <label className="block text-xs font-black text-slate-400 tracking-widest uppercase mb-4">Personal Habits (ব্যক্তিগত অভ্যাস)</label>
               <div className="flex flex-col gap-3">
                 <div className="relative">
                   <select 
                     className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 outline-none focus:border-emerald-500 cursor-pointer"
                     onChange={(e) => {
                       const val = e.target.value;
                       if (val) {
                         const items = [...(formData.history?.habits || [])];
                         if (!items.includes(val)) {
                           items.push(val);
                           updateFormData('history', { ...formData.history, habits: items });
                         }
                       }
                       e.target.value = '';
                     }}
                   >
                     <option value="">Select Habits...</option>
                     {HABIT_OPTIONS.map(opt => (
                       <option key={opt} value={opt}>{opt}</option>
                     ))}
                   </select>
                   <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                 </div>
                 
                 {/* Display active tags */}
                 <div className="flex flex-wrap gap-2 mb-4">
                   {(formData.history?.habits || []).map(item => (
                     <div key={item} className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 border border-slate-200">
                       {item}
                       <button 
                         onClick={() => {
                           const items = (formData.history?.habits || []).filter(s => s !== item);
                           updateFormData('history', { ...formData.history, habits: items });
                         }}
                         className="text-slate-400 hover:text-slate-600"
                       >
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                       </button>
                     </div>
                   ))}
                 </div>
               </div>
               <textarea 
                 rows={2}
                 value={formData.history?.personalHabits || ''} 
                 onChange={(e) => updateFormData('history', { ...formData.history, personalHabits: e.target.value })}
                 className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm text-slate-600 outline-none focus:border-emerald-500 resize-none"
                 placeholder="Other habits (Exercise, Sleep cycle)..."
               />
             </div>
           </div>
        </section>

      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 lg:left-[80px] right-0 bg-white border-t border-slate-200 px-8 py-4 flex items-center justify-between z-50 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.05)]">
         <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
           <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
           Autosaved: 2 minutes ago
         </div>
         <div className="flex items-center gap-4">
           <button 
             type="button"
             onClick={() => { onSave(formData); onAnalyze(); }}
             className="flex items-center gap-2 px-6 py-3 border-2 border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-700 rounded-xl text-xs font-black uppercase tracking-widest transition"
           >
             <Activity size={16}/> {t('intake.analyze')}
           </button>
           <button 
             type="button"
             onClick={onReport}
             className="flex items-center gap-2 px-6 py-3 border-2 border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-700 rounded-xl text-xs font-black uppercase tracking-widest transition"
           >
             <FileText size={16}/> {t('intake.report')}
           </button>
           <button 
             type="button"
             onClick={() => onSave(formData)}
             className="flex items-center gap-2 px-8 py-3 bg-[#1e612a] hover:bg-[#15471e] text-white rounded-xl text-xs font-black uppercase tracking-widest transition shadow-lg shadow-emerald-900/20"
           >
             <Check size={16}/> {t('intake.save')}
           </button>
         </div>
      </div>
    </div>
  );
};
