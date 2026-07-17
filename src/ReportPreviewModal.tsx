import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Printer, Hexagon, Pill, ArrowLeft, Download } from 'lucide-react';
import { Patient } from './types';

interface ReportPreviewModalProps {
  patient: Patient;
  onClose: () => void;
}

export const ReportPreviewModal: React.FC<ReportPreviewModalProps> = ({ patient, onClose }) => {
  const [signatureData, setSignatureData] = useState<string | null>(() => localStorage.getItem('doctorSignature'));
  const [doctorName, setDoctorName] = useState(() => localStorage.getItem('doctorName') || 'Dr. Samim Ahamed');
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('hide-global-print');
    const handleStorageChange = () => {
      setSignatureData(localStorage.getItem('doctorSignature'));
      setDoctorName(localStorage.getItem('doctorName') || 'Dr. Helena Vance, DIHom');
    };
    window.addEventListener('signatureUpdated', handleStorageChange);
    window.addEventListener('doctorNameUpdated', handleStorageChange);
    return () => {
      document.body.classList.remove('hide-global-print');
      window.removeEventListener('signatureUpdated', handleStorageChange);
      window.removeEventListener('doctorNameUpdated', handleStorageChange);
    };
  }, []);

  const handleDownloadJpg = async () => {
    if (printRef.current) {
      try {
        const htmlToImage = await import('html-to-image');
        const dataUrl = await htmlToImage.toJpeg(printRef.current, { quality: 0.95 });
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `Report_${patient.name || 'Patient'}_${new Date().toISOString().split('T')[0]}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        console.error('Failed to export image', error);
      }
    }
  };

  return (
    <div className="fixed print:static print:inset-auto print:bg-transparent inset-0 bg-slate-900/60 z-[200] flex p-0 md:p-8 backdrop-blur-sm overflow-y-auto print:overflow-visible print:block" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        className="m-auto w-full max-w-4xl bg-white min-h-screen md:min-h-0 md:h-auto md:rounded-xl shadow-2xl print:shadow-none flex flex-col relative font-sans text-slate-800 print:m-0 print:w-full print:block"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center px-6 py-4 border-b border-slate-100 print:hidden sticky top-0 bg-white/90 backdrop-blur z-20">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-sm transition"
          >
            <ArrowLeft size={16} /> Back to Edit
          </button>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleDownloadJpg}
              className="flex items-center gap-2 px-5 py-2.5 rounded bg-white text-[#105a5e] border border-[#105a5e] font-bold hover:bg-[#f0f6f6] transition text-xs tracking-wider shadow-sm mr-2"
            >
              <Download size={16} />
              JPG
            </button>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-5 py-2.5 rounded bg-[#105a5e] text-white font-bold hover:bg-[#0c4447] transition text-xs tracking-wider shadow-sm"
            >
              <Printer size={16} />
              PRINT RX
            </button>
          </div>
        </header>

        <main className="flex-1 w-full bg-slate-50 p-6 md:p-12 print:p-0 print:bg-white flex justify-center">
          <div 
            ref={printRef}
            className="print-target bg-white w-full max-w-[800px] shadow-sm ring-1 ring-slate-100 print:shadow-none print:ring-0 relative flex flex-col min-h-[1123px]"
            style={{
              backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              borderLeft: '4px solid #105a5e'
            }}
          >
            {/* Canvas Overlay if exists */}
            {patient.canvasOverlay && (
              <img 
                src={patient.canvasOverlay} 
                alt="Canvas Overlay" 
                className="absolute inset-0 w-full h-full z-[40] pointer-events-none mix-blend-multiply opacity-80"
              />
            )}
            <div className="p-12 flex-1 flex flex-col relative bg-white/80 backdrop-blur-[2px]">
              {/* Header section matches image precisely */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-8 sm:gap-4 mb-12">
                <div>
                  <h1 className="text-3xl font-bold text-[#105a5e] tracking-tight mb-1">Homeo Desk Pro</h1>
                  <p className="text-slate-700 font-medium text-sm mb-4">The Clinical Editorial & Apothecary</p>
                  
                  <div className="text-[11px] text-slate-500 space-y-0.5 leading-relaxed font-medium">
                    <p>128 Wellness Plaza, Medical District</p>
                    <p>London, UK - W1G 9PL</p>
                    <p>+44 20 7946 0101 | care@homeodeskpro.com</p>
                  </div>
                </div>
                
                <div className="sm:text-right flex flex-col items-start sm:items-end">
                  <div className="w-12 h-12 bg-[#f0f6f6] rounded-xl flex items-center justify-center text-[#105a5e] mb-4 border border-[#e0eded]">
                    <div className="relative">
                      <Pill size={24} />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[10px] font-bold">+</div>
                    </div>
                  </div>
                  <h2 className="text-base font-bold text-slate-900">{doctorName}</h2>
                  <p className="text-xs text-slate-600 mb-2 font-medium">Consultant Homeopath</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#105a5e]">Registration: #HD-88219</p>
                </div>
              </div>

              {/* Patient Block */}
              <div className="bg-[#fafafa] rounded-xl border border-slate-100 p-6 flex flex-wrap gap-x-12 gap-y-4 mb-10 w-full">
                <div className="flex flex-col gap-1.5 flex-1 min-w-[120px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">PATIENT NAME</span>
                  <span className="font-bold text-slate-900 text-[14px]">{patient.name || 'John Doe'}</span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1 min-w-[100px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">AGE / GENDER</span>
                  <span className="font-bold text-slate-900 text-[14px]">{patient.age || '34'}y / {patient.gender || 'Male'}</span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1 min-w-[120px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">CASE ID</span>
                  <span className="font-bold text-slate-900 text-[14px]">#{patient.id || 'RX-9921-JD'}</span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1 min-w-[100px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">DATE</span>
                  <span className="font-bold text-slate-900 text-[14px]">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Assessments */}
              <div className="mb-10 w-full relative">
                {/* Huge Watermark text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[140px] font-bold text-slate-50 opacity-40 -rotate-[15deg] pointer-events-none select-none tracking-tighter whitespace-nowrap z-0">
                  HOMEO
                </div>

                <div className="relative z-10 w-full">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#105a5e] mb-5">
                    Clinical Assessment
                  </h3>
                  
                  <div className="space-y-6 text-sm text-slate-800 leading-relaxed font-medium">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-3">Presenting Complaints:</span>
                      {patient.chiefSymptoms && patient.chiefSymptoms.filter(s => s.complaint).length > 0 ? (
                        <div className="space-y-4">
                          {patient.chiefSymptoms.filter(s => s.complaint).map((s, idx) => (
                            <div key={idx} className="bg-slate-50/80 p-4 rounded-xl border border-slate-100 flex flex-col gap-2">
                              <p className="font-bold text-slate-900 text-sm mb-1">{s.complaint}</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-600">
                                {s.location && <p><span className="font-semibold text-slate-400">Loc:</span> {s.location}</p>}
                                {s.sensation && <p><span className="font-semibold text-slate-400">Sens:</span> {s.sensation}</p>}
                                {s.modality && <p><span className="font-semibold text-slate-400">Mod:</span> {s.modality}</p>}
                                {s.concomitant && <p><span className="font-semibold text-slate-400">Conc:</span> {s.concomitant}</p>}
                                {s.duration && <p><span className="font-semibold text-slate-400">Dur:</span> {s.duration}</p>}
                                {s.physiological && <p><span className="font-semibold text-slate-400">Onset:</span> {s.physiological}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-500 italic">No presenting complaints recorded.</p>
                      )}
                    </div>
                    
                    {patient.mentalSymptoms && patient.mentalSymptoms.filter(Boolean).length > 0 && (
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-2 mt-4">Mental State:</span>
                        <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100">
                          <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                            {patient.mentalSymptoms.filter(Boolean).map((s, idx) => (
                              <li key={idx}>
                                {s.startsWith('Narrative:') ? (
                                  <span className="italic block mt-1">{s.replace('Narrative:', '')}</span>
                                ) : s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {patient.physicalGenerals && patient.physicalGenerals.filter(p => p.value).length > 0 && (
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-2 mt-4">Physical Generals:</span>
                        <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-700">
                            {patient.physicalGenerals.filter(p => p.value).map((p, idx) => (
                              <p key={idx}><span className="font-semibold text-slate-500">{p.label}:</span> {p.value}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {patient.history && Object.values(patient.history).some(v => v && (Array.isArray(v) ? v.length > 0 : true)) && (
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-2 mt-4">History & Personal:</span>
                        <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100 text-xs text-slate-700 space-y-3">
                           {patient.history.pastIllnessOptions && patient.history.pastIllnessOptions.length > 0 && (
                             <p><span className="font-bold text-slate-900 block mb-1">Past Illness:</span> {patient.history.pastIllnessOptions.join(', ')} {patient.history.pastIllnessDetails ? `- ${patient.history.pastIllnessDetails}` : ''}</p>
                           )}
                           {(patient.history.familyPaternal || patient.history.familyMaternal) && (
                             <div>
                               <span className="font-bold text-slate-900 block mb-1">Family History:</span>
                               <div className="pl-2 space-y-1">
                                 {patient.history.familyPaternal && <p><span className="text-slate-500">Paternal:</span> {patient.history.familyPaternal}</p>}
                                 {patient.history.familyMaternal && <p><span className="text-slate-500">Maternal:</span> {patient.history.familyMaternal}</p>}
                               </div>
                             </div>
                           )}
                           {(patient.history.treatmentMode || patient.history.treatmentResponse || patient.history.treatmentDetails) && (
                             <p><span className="font-bold text-slate-900 block mb-1">Treatment History:</span> {patient.history.treatmentMode && `${patient.history.treatmentMode}`} {patient.history.treatmentResponse && `(${patient.history.treatmentResponse})`} {patient.history.treatmentDetails && `- ${patient.history.treatmentDetails}`}</p>
                           )}
                           {((patient.history.vaccinationPersonal && patient.history.vaccinationPersonal.length > 0) || (patient.history.vaccinations && patient.history.vaccinations.length > 0) || patient.history.vaccinationStatus) && (
                             <p><span className="font-bold text-slate-900 block mb-1">Vaccinations:</span> {patient.history.vaccinationStatus && <span className="font-medium bg-slate-200 px-1.5 py-0.5 rounded text-[10px] mr-2">{patient.history.vaccinationStatus}</span>} {patient.history.vaccinations ? patient.history.vaccinations.join(', ') : patient.history.vaccinationPersonal?.join(', ')}</p>
                           )}
                           {((patient.history.habits && patient.history.habits.length > 0) || patient.history.personalHabits) && (
                             <p><span className="font-bold text-slate-900 block mb-1">Habits:</span> {patient.history.habits?.join(', ')} {patient.history.personalHabits ? `- ${patient.history.personalHabits}` : ''}</p>
                           )}
                        </div>
                      </div>
                    )}

                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1 mt-4">Totality of Symptoms:</span>
                      <p>{patient.notes || 'No totality of symptoms recorded.'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remedy Selection */}
              <div className="w-full relative z-10 mb-8 mt-auto">
                <div className="flex items-center gap-2 mb-4 text-[#105a5e]">
                   <span className="text-[32px] font-serif italic font-bold">Rx</span>
                   <span className="text-[10px] font-bold uppercase tracking-[0.15em] ml-2 mt-2">Remedy Selection</span>
                </div>

                <div className="border border-[#e0eded] rounded-2xl p-6 bg-white shadow-sm relative overflow-hidden">
                  {/* Verified Icon badge */}
                  <div className="absolute top-6 right-6">
                    <Hexagon size={32} className="text-[#105a5e]/20 fill-[#105a5e]/5" />
                    <div className="absolute inset-0 flex items-center justify-center text-[#105a5e]">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                  </div>

                  {patient.prescriptions && patient.prescriptions.length > 0 ? (
                    <div className="space-y-6">
                      {patient.prescriptions.map((rx, idx) => (
                        <div key={idx} className={idx !== patient.prescriptions!.length - 1 ? "border-b border-slate-100 pb-6" : ""}>
                          <h4 className="text-2xl font-black text-slate-900 mb-1 truncate">
                            {rx.remedy}
                          </h4>
                          <div className="flex items-center gap-3 text-sm font-bold text-[#105a5e] mb-4">
                            <span>{rx.potency}</span>
                            <span className="w-px h-4 bg-slate-300"></span>
                            <span className="text-slate-500 font-medium">{rx.type || 'Standard'}</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-4 sm:gap-8">
                            <div className="flex-1 min-w-[100px]">
                              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Dosage Form</span>
                              <span className="font-bold text-slate-900 text-xs sm:text-[13px]">{rx.dosage || '4 Globules (Size 40)'}</span>
                            </div>
                            <div className="flex-1 min-w-[100px]">
                              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Frequency</span>
                              <span className="font-bold text-slate-900 text-xs sm:text-[13px]">{rx.frequency || 'Twice Daily'}</span>
                            </div>
                            <div className="flex-1 min-w-[100px]">
                              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Duration</span>
                              <span className="font-bold text-slate-900 text-xs sm:text-[13px]">{rx.duration || '2 weeks'}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-3xl font-black text-slate-900 mb-2 truncate">
                        {patient.remedy || 'N/A'}
                      </h4>
                      <div className="flex items-center gap-3 text-sm font-bold text-[#105a5e] mb-8">
                        <span>{patient.currentPotency || 'N/A'}</span>
                        {patient.currentPotency && <span className="w-px h-4 bg-slate-300"></span>}
                        {patient.currentPotency && <span className="text-slate-500 font-medium">Standard</span>}
                      </div>

                      <div className="flex flex-wrap gap-8">
                        <div className="flex-1 min-w-[120px]">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Dosage Form</span>
                          <span className="font-bold text-slate-900 text-[13px]">4 Globules (Size 40)</span>
                        </div>
                        <div className="flex-1 min-w-[120px]">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Frequency</span>
                          <span className="font-bold text-slate-900 text-[13px]">Twice Daily</span>
                        </div>
                        <div className="flex-1 min-w-[120px]">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Method</span>
                          <span className="font-bold text-slate-900 text-[13px]">Direct Tongue / Dry</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Advice blocks */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <div className="flex-1 bg-[#f9fafb] border-l-4 border-emerald-500 rounded-r-xl p-6">
                  <h5 className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-3">Lifestyle Advice</h5>
                  <ul className="text-xs text-slate-700 font-medium space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                      Avoid coffee and strong aromatics.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                      Lukewarm water for bathing.
                    </li>
                  </ul>
                </div>
                <div className="flex-1 bg-[#f9fafb] border-l-4 border-[#105a5e] rounded-r-xl p-6">
                  <h5 className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-3">Follow-Up</h5>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    Please report progress in <strong className="text-slate-900">14 days</strong> or immediately in case of acute aggravation.
                  </p>
                </div>
              </div>

              <div className="w-full border-t border-slate-100 my-6"></div>

              {/* Footer Auth */}
              <footer className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 sm:gap-2 relative w-full mt-auto">
                <div className="w-full sm:w-[300px]">
                  <p className="text-[10px] text-slate-500 italic font-medium leading-relaxed mb-4">
                    Note: This is a homeopathic prescription based on symptom totality.
                  </p>
                  <div className="bg-slate-50 border border-slate-100 inline-block px-3 py-1.5 rounded">
                     <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500">Valid for 1 month from date of issue</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="h-[60px] mb-2 relative w-[180px] flex justify-center items-center">
                    {signatureData ? (
                      <img src={signatureData} alt="Signature" className="max-h-full max-w-full object-contain filter mix-blend-multiply" />
                    ) : (
                      <div className="w-[60px] h-[60px] bg-slate-900 flex items-center justify-center rotated">
                        <span className="font-script text-white text-xl italic rotate-[-15deg] opacity-80">Helena V.</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-slate-200 pt-2 px-6 text-center w-full min-w-[200px]">
                     <p className="text-[11px] font-bold text-slate-900">Authorized Signature</p>
                     <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5">{doctorName}</p>
                  </div>
                </div>
              </footer>

              {/* Very Bottom line */}
              <div className="mt-8 pt-4 flex justify-between items-center w-full">
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Electronically generated by Homeo Desk Pro v4.2</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Page 1 of 1</span>
              </div>
            </div>
          </div>
        </main>
      </motion.div>
    </div>
  );
};
