import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Printer, Download, Info, Pencil, Square, RotateCcw, Eraser, Clock } from 'lucide-react';
import { Patient, AnalysisItem } from './types';

interface RxPreviewModalProps {
  patient: Patient;
  onClose: () => void;
  onApplyAction?: (updatedPatient: Patient, plannedNextRemedy?: string) => void;
  initialAnalysis?: AnalysisItem[];
  initialResults?: any[];
  quickRemedy?: string;
  nextRemedy?: string;
}

export const PrescriptionCanvas: React.FC<RxPreviewModalProps> = ({ patient, onClose, onApplyAction, initialAnalysis, initialResults, quickRemedy, nextRemedy }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>('pencil');
  const [penColor, setPenColor] = useState('#1e293b');
  const [penSize, setPenSize] = useState(2);
  const [history, setHistory] = useState<string[]>([]);
  const [startPos, setStartPos] = useState<{x: number, y: number} | null>(null);
  const [previewShape, setPreviewShape] = useState<{x: number, y: number, w: number, h: number} | null>(null);
  const [signatureData, setSignatureData] = useState<string | null>(() => localStorage.getItem('doctorSignature'));
  const [doctorName, setDoctorName] = useState(() => localStorage.getItem('doctorName') || 'Dr. Samim Ahamed');
  const [specialization, setSpecialization] = useState(() => localStorage.getItem('doctorSpecialization') || 'Chief Physician');
  const [regNo, setRegNo] = useState(() => localStorage.getItem('doctorRegNo') || '');
  const [clinicName, setClinicName] = useState(() => localStorage.getItem('clinicName') || 'Clinical Center');
  const [clinicAddress, setClinicAddress] = useState(() => localStorage.getItem('clinicAddress') || 'Medical District');
  const [clinicPhone, setClinicPhone] = useState(() => localStorage.getItem('doctorPhone') || '');
  const [clinicLogo, setClinicLogo] = useState<string | null>(() => localStorage.getItem('clinicLogo'));

  // Rx Configuration State
  const [rxPotency, setRxPotency] = useState(patient.currentPotency || '200C');
  const [rxDosage, setRxDosage] = useState('4 Drops');
  const [rxFrequency, setRxFrequency] = useState('Twice daily (Empty stomach)');
  const [rxDuration, setRxDuration] = useState('7 Days');
  const [plannedNextRemedy, setPlannedNextRemedy] = useState(nextRemedy || '');
  
  // Miasmatic Analysis State
  const [psora, setPsora] = useState(patient.miasmaticAnalysis?.psora ?? 0);
  const [sycosis, setSycosis] = useState(patient.miasmaticAnalysis?.sycosis ?? 0);
  const [syphilis, setSyphilis] = useState(patient.miasmaticAnalysis?.syphilis ?? 0);

  useEffect(() => {
    if (!patient.miasmaticAnalysis) {
      const hash = (patient.name || 'Patient').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + (initialAnalysis?.length || 0);
      const calculatedPsora = 45 + (hash % 25); // 45 to 69
      const calculatedSycosis = 15 + ((hash * 3) % 20); // 15 to 34
      const calculatedSyphilis = 100 - calculatedPsora - calculatedSycosis;
      
      setPsora(calculatedPsora);
      setSycosis(calculatedSycosis);
      setSyphilis(calculatedSyphilis);
    }
  }, [patient.miasmaticAnalysis, patient.name, initialAnalysis]);

  const handleApply = () => {
    const canvas = canvasRef.current;
    const canvasData = canvas ? canvas.toDataURL() : undefined;

    const rx = {
      remedy: quickRemedy || patient.remedy || 'None',
      potency: rxPotency,
      dosage: rxDosage,
      frequency: rxFrequency,
      duration: rxDuration,
      type: 'Liquid dilution'
    };

    const updatedPatient: Patient = {
      ...patient,
      remedy: quickRemedy || patient.remedy || undefined,
      canvasOverlay: canvasData,
      miasmaticAnalysis: { psora, sycosis, syphilis },
      prescriptions: [rx, ...(patient.prescriptions || [])]
    };
    
    if (onApplyAction) {
      onApplyAction(updatedPatient, plannedNextRemedy);
    }
  };

  const printPaperRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (printPaperRef.current) {
      try {
        const htmlToImage = await import('html-to-image');
        const dataUrl = await htmlToImage.toJpeg(printPaperRef.current, { quality: 0.95 });
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `Prescription_${patient.name || 'Patient'}_${new Date().getTime()}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        console.error('Failed to export image', error);
      }
    }
  };

  useEffect(() => {
    document.body.classList.add('hide-global-print');
    const handleStorageChange = () => {
      setSignatureData(localStorage.getItem('doctorSignature'));
      setDoctorName(localStorage.getItem('doctorName') || 'Dr. Samim Ahamed');
      setSpecialization(localStorage.getItem('doctorSpecialization') || 'Chief Physician');
      setRegNo(localStorage.getItem('doctorRegNo') || '');
      setClinicName(localStorage.getItem('clinicName') || 'Clinical Center');
      setClinicAddress(localStorage.getItem('clinicAddress') || 'Medical District');
      setClinicPhone(localStorage.getItem('doctorPhone') || '');
      setClinicLogo(localStorage.getItem('clinicLogo'));
    };
    window.addEventListener('signatureUpdated', handleStorageChange);
    window.addEventListener('doctorNameUpdated', handleStorageChange);
    window.addEventListener('doctorProfileUpdated', handleStorageChange);
    return () => {
      document.body.classList.remove('hide-global-print');
      window.removeEventListener('signatureUpdated', handleStorageChange);
      window.removeEventListener('doctorNameUpdated', handleStorageChange);
      window.removeEventListener('doctorProfileUpdated', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const tempImage = canvas.toDataURL();
      canvas.width = rect.width;
      canvas.height = rect.height;
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = tempImage;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
  }, [penColor, penSize]);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setHistory(prev => [...prev, canvas.toDataURL()]);
  };

  const undo = () => {
    if (history.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (newHistory.length > 0) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = newHistory[newHistory.length - 1];
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (selectedTool !== 'pencil' && selectedTool !== 'shape') return;
    saveToHistory();
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    let x, y;
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = (e as React.MouseEvent).clientX - rect.left;
      y = (e as React.MouseEvent).clientY - rect.top;
    }
    if (selectedTool === 'pencil') {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else if (selectedTool === 'shape') {
      setStartPos({ x, y });
    }
  };

  const stopDrawing = () => {
    if (selectedTool === 'shape' && previewShape) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.beginPath();
          ctx.rect(previewShape.x, previewShape.y, previewShape.w, previewShape.h);
          ctx.stroke();
        }
      }
      setPreviewShape(null);
    }
    setStartPos(null);
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    let x, y;
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = (e as React.MouseEvent).clientX - rect.left;
      y = (e as React.MouseEvent).clientY - rect.top;
    }
    if (selectedTool === 'pencil') {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (selectedTool === 'shape' && startPos) {
      setPreviewShape({
        x: Math.min(startPos.x, x),
        y: Math.min(startPos.y, y),
        w: Math.abs(x - startPos.x),
        h: Math.abs(y - startPos.y)
      });
    }
  };

  const clearCanvas = () => {
    saveToHistory();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="fixed print:static print:inset-auto print:bg-transparent inset-0 bg-slate-900/60 z-[200] flex p-0 lg:p-4 backdrop-blur-sm overflow-y-auto print:overflow-visible print:block" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        className="m-auto w-full max-w-5xl bg-[#f8fbfa] min-h-screen lg:min-h-0 lg:h-auto lg:rounded-xl shadow-2xl print:shadow-none flex flex-col relative font-sans text-slate-800 print:m-0 print:w-full print:block"
        onClick={(e) => e.stopPropagation()}
      >
      
      {/* Floating Tools */}
      <div className="fixed top-24 right-4 md:right-8 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200 p-2 flex flex-col gap-2 z-[250] print:hidden">
        <button 
          onClick={() => setSelectedTool(selectedTool === 'pencil' ? null : 'pencil')}
          className={`p-2 rounded-lg transition-colors ${selectedTool === 'pencil' ? 'bg-[#1e612a] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
          title="Pencil"
        >
          <Pencil size={20} />
        </button>
        <button 
          onClick={() => setSelectedTool(selectedTool === 'shape' ? null : 'shape')}
          className={`p-2 rounded-lg transition-colors ${selectedTool === 'shape' ? 'bg-[#1e612a] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
          title="Rectangle"
        >
          <Square size={20} />
        </button>
        <div className="w-full h-px bg-slate-200 my-1"></div>
        <button 
          onClick={undo}
          disabled={history.length === 0}
          className="p-2 rounded-lg transition-colors text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
          title="Undo"
        >
          <RotateCcw size={20} />
        </button>
        <button 
          onClick={clearCanvas}
          className="p-2 rounded-lg transition-colors text-red-600 hover:bg-red-50"
          title="Clear Canvas"
        >
          <Eraser size={20} />
        </button>
        
        {selectedTool && (
          <div className="mt-2 flex flex-col gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
            <div className="flex flex-wrap gap-1 w-[44px]">
              {['#1e293b', '#1e612a', '#dc2626', '#2563eb'].map(color => (
                <button
                  key={color}
                  onClick={() => setPenColor(color)}
                  className={`w-5 h-5 rounded-full ${penColor === color ? 'ring-2 ring-offset-1 ring-slate-400' : ''}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Top Banner (Non Printable) */}

      <header className="flex-none bg-[#f8fbfa] px-6 py-4 border-b border-slate-200 print:hidden sticky top-0 z-40 w-full max-w-5xl self-center">
        <div className="flex justify-between items-center w-full">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded border border-slate-300 text-slate-600 hover:bg-slate-100 transition-all font-medium text-[13px] bg-white shadow-sm"
          >
            <ArrowLeft size={16} />
            <span>Back to Patient</span>
          </button>
          <div className="flex items-center gap-3">
            <button 
              onClick={(e) => { e.stopPropagation(); window.print(); }}
              className="flex items-center gap-2 px-5 py-2 rounded bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition text-[13px] shadow-sm"
            >
              <Printer size={16} />
              <span>Print Prescription</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleDownload(); }}
              className="flex items-center gap-2 px-5 py-2 rounded border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition text-[13px] bg-white shadow-sm"
            >
              <Download size={16} />
              <span>Save as JPG</span>
            </button>
            <button 
              onClick={handleApply}
              className="flex items-center gap-2 px-6 py-2 rounded bg-[#1e612a] text-white font-bold hover:bg-[#164a20] transition text-[13px] shadow-sm active:scale-95 whitespace-nowrap"
            >
              PRESCRIBE & FINALISE
            </button>
          </div>
        </div>
      </header>

      {/* Prescription Config Form (Non Printable) */}
      <div className="flex-none bg-slate-50 border-b border-slate-200 px-6 py-4 print:hidden w-full max-w-5xl self-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-[10px] font-black text-[#1e612a] uppercase tracking-widest mb-1.5">Potency</label>
          <input 
            type="text" 
            value={rxPotency} 
            onChange={(e) => setRxPotency(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#1e612a] focus:border-transparent bg-white shadow-sm transition-all"
            placeholder="e.g. 200C"
          />
        </div>
        <div>
          <label className="block text-[10px] font-black text-[#1e612a] uppercase tracking-widest mb-1.5">Dosage</label>
          <input 
            type="text" 
            value={rxDosage} 
            onChange={(e) => setRxDosage(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#1e612a] focus:border-transparent bg-white shadow-sm transition-all"
            placeholder="e.g. 4 Drops"
          />
        </div>
        <div>
          <label className="block text-[10px] font-black text-[#1e612a] uppercase tracking-widest mb-1.5">Frequency</label>
          <input 
            type="text" 
            value={rxFrequency} 
            onChange={(e) => setRxFrequency(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#1e612a] focus:border-transparent bg-white shadow-sm transition-all"
            placeholder="e.g. Twice daily"
          />
        </div>
        <div>
          <label className="block text-[10px] font-black text-[#1e612a] uppercase tracking-widest mb-1.5">Duration</label>
          <input 
            type="text" 
            value={rxDuration} 
            onChange={(e) => setRxDuration(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#1e612a] focus:border-transparent bg-white shadow-sm transition-all"
            placeholder="e.g. 7 Days"
          />
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 w-full overflow-y-auto custom-scrollbar flex flex-col items-center pb-20 print:p-0 print:pb-0" onClick={(e) => e.stopPropagation()}>
        
        {/* Prescription Paper */}
        <div 
          ref={printPaperRef}
          className="print-target bg-white w-full max-w-[800px] min-h-[1123px] mt-8 print:mt-0 shadow-[0_8px_30px_rgb(0,0,0,0.08)] print:shadow-none flex flex-col p-12 relative border border-slate-100 print:border-none rounded-sm"
        >
          
          {/* Drawing Canvas Overlay */}
          <div className="absolute inset-0 z-[40]">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseMove={draw}
              onMouseOut={stopDrawing}
              onTouchStart={startDrawing}
              onTouchEnd={stopDrawing}
              onTouchMove={draw}
              className={`w-full h-full relative z-10 touch-none ${selectedTool && selectedTool !== 'text' ? (selectedTool === 'pencil' ? 'cursor-crosshair pointer-events-auto' : 'pointer-events-auto') : 'pointer-events-none'} print:object-contain`}
            />
            {previewShape && (
              <div 
                className="absolute pointer-events-none z-20 border-2"
                style={{
                  left: previewShape.x,
                  top: previewShape.y,
                  width: previewShape.w,
                  height: previewShape.h,
                  borderColor: penColor
                }}
              />
            )}
          </div>
          
          <div className={`relative z-10 flex flex-col h-full w-full ${selectedTool ? 'pointer-events-none' : 'pointer-events-auto'}`}>
            {/* Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start mb-8 w-full gap-6 sm:gap-2">
            <div className="flex items-start gap-4">
              {clinicLogo && (
                <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 overflow-hidden shrink-0">
                  <img src={clinicLogo} alt="Clinic Logo" className="w-full h-full object-contain" />
                </div>
              )}
              <div className="flex flex-col">
                <h1 className="text-[26px] font-bold text-[#1e612a] tracking-tight leading-none mb-2 uppercase">{doctorName}</h1>
                <p className="text-slate-700 font-medium text-[13px] leading-tight mb-1">{specialization}</p>
                {regNo && <p className="text-[11px] text-slate-500 mt-0.5">Registration: {regNo}</p>}
              </div>
            </div>
            
            <div className="sm:text-right flex flex-col items-start sm:items-end pt-1">
              <h2 className="text-[17px] font-bold text-slate-900 leading-tight mb-1.5">{clinicName}</h2>
              <p className="text-[12px] text-slate-600 mb-0.5">{clinicAddress}</p>
              {clinicPhone && <p className="text-[12px] text-slate-600">Contact: {clinicPhone}</p>}
            </div>
          </header>

          {/* Patient Details Strip */}
          <div className="bg-[#f2f6ea] border-y border-y-[#e2ebd9] px-4 md:px-6 py-4 md:py-5 grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 w-full">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#1e612a]">PATIENT NAME</span>
              <span className="font-bold text-slate-900 text-[13px] tracking-tight truncate">{patient.name || "Mrs. Anwara Begum"}</span>
            </div>
            <div className="flex flex-col gap-1 md:pl-4">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#1e612a]">CASE ID</span>
              <span className="font-bold text-slate-900 text-[13px] tracking-tight">#{patient.id || "CASE-8821"}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#1e612a]">AGE / GENDER</span>
              <span className="font-bold text-slate-900 text-[13px] tracking-tight">{patient.age || "54"} Years / {patient.gender || "Female"}</span>
            </div>
            <div className="flex flex-col gap-1 md:text-right md:items-end">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#1e612a]">DATE</span>
              <span className="font-bold text-slate-900 text-[13px] tracking-tight">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row relative">
            {/* Left Column */}
            <div className="w-full md:w-[35%] md:pr-8 flex flex-col gap-10 md:border-r border-[#e6ecdc] mb-10 md:mb-0">
              
              {/* Complaints */}
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#1e612a] border-b border-[#e2ebd9] pb-2 mb-4">
                  CHIEF COMPLAINTS
                </h3>
                <ul className="text-[12px] text-slate-800 space-y-3 font-medium">
                  {(patient.chiefSymptoms && patient.chiefSymptoms.length > 0) ? patient.chiefSymptoms.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-[#1e612a] mt-1.5 shrink-0"></span>
                      <span className="leading-snug">{s.complaint}</span>
                    </li>
                  )) : (
                    <>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1 h-1 rounded-full bg-[#1e612a] mt-1.5 shrink-0"></span>
                        <span className="leading-snug">Chronic Gastritis (3 years)</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1 h-1 rounded-full bg-[#1e612a] mt-1.5 shrink-0"></span>
                        <span className="leading-snug">Generalized Anxiety Disorder</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1 h-1 rounded-full bg-[#1e612a] mt-1.5 shrink-0"></span>
                        <span className="leading-snug">Insomnia due to overthinking</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Miasmatic Analysis */}
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#1e612a] border-b border-[#e2ebd9] pb-2 mb-4">
                  MIASMATIC ANALYSIS
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-slate-800 mb-1.5">
                      <span>Psora</span>
                      <span>{psora}%</span>
                    </div>
                    <div className="w-full h-[4px] bg-slate-100 rounded-full">
                      <div className="h-full bg-[#1e612a] rounded-full" style={{ width: `${psora}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-slate-800 mb-1.5">
                      <span>Sycosis</span>
                      <span>{sycosis}%</span>
                    </div>
                    <div className="w-full h-[4px] bg-slate-100 rounded-full">
                      <div className="h-full bg-[#1e612a] rounded-full opacity-60" style={{ width: `${sycosis}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-slate-800 mb-1.5">
                      <span>Syphilis</span>
                      <span>{syphilis}%</span>
                    </div>
                    <div className="w-full h-[4px] bg-slate-100 rounded-full">
                      <div className="h-full bg-[#1e612a] rounded-full opacity-30" style={{ width: `${syphilis}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quotes/Notes */}
              <div className="p-4 border border-[#e2ebd9] bg-white shadow-sm mt-4 relative">
                <div className="absolute -left-px top-0 bottom-0 w-[2px] bg-slate-200"></div>
                {(patient.aggravation || patient.amelioration) ? (
                  <div className="space-y-2">
                    {patient.aggravation && (
                       <p className="text-[11px] italic text-slate-700 leading-relaxed font-medium">
                         <span className="font-semibold text-slate-900 not-italic uppercase text-[9px] tracking-wider block mb-0.5">Aggravation</span>
                         "{patient.aggravation}"
                       </p>
                    )}
                    {patient.amelioration && (
                       <p className="text-[11px] italic text-slate-700 leading-relaxed font-medium">
                         <span className="font-semibold text-slate-900 not-italic uppercase text-[9px] tracking-wider block mb-0.5 mt-2">Amelioration</span>
                         "{patient.amelioration}"
                       </p>
                    )}
                  </div>
                ) : (
                  <p className="text-[11px] italic text-slate-700 leading-relaxed font-medium">
                    "{patient.notes || "Aggravation after warm food, better by open air. Patient shows strong emotional suppression."}"
                  </p>
                )}
              </div>

            </div>

            {/* Right Column */}
            <div className="w-full md:w-[65%] md:pl-8 flex flex-col relative min-h-[500px]">
              
              {/* Background Cross Mark (Subtle) */}
              <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[240px] h-[240px] pointer-events-none z-0 opacity-5 border-[10px] border-[#1e612a] rounded-full flex items-center justify-center">
                 <div className="text-[120px] font-bold font-serif -mt-8 leading-none">+</div>
              </div>

              {/* Drawing Canvas Overlay (Moved up) */}
              
              <div className="relative z-10 flex-col flex h-full">
                {/* Rx Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="text-[#1e612a]">
                     <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M19 5H6.5A2.5 2.5 0 0 0 4 7.5v9A2.5 2.5 0 0 0 6.5 19H19" />
                       <path d="M12 11h7" />
                       <path d="M11 9L15 21" />
                       <path d="M20 7V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7H14" />
                     </svg>
                  </div>
                  <span className="text-[28px] font-bold font-serif italic text-[#1e612a] tracking-wider mt-1">Rx</span>
                </div>

                {/* Medicine Table */}
                <div className="mb-10 w-full overflow-hidden">
                  <div className="flex text-[10px] font-black uppercase tracking-widest text-[#1e612a] border-b-2 border-slate-900 pb-2 mb-4 w-full">
                    <div className="w-[35%]">REMEDY & POTENCY</div>
                    <div className="w-[15%]">DOSAGE</div>
                    <div className="w-[35%]">FREQUENCY</div>
                    <div className="w-[15%] text-right">DURATION</div>
                  </div>

                  <div className="flex flex-col gap-0 text-sm font-semibold text-slate-800">
                    <div className="flex py-4 border-b border-slate-100 items-start w-full">
                      <div className="w-[35%]">
                          <div className="font-bold text-[13px] text-slate-900 leading-tight mb-1">{quickRemedy || patient.remedy || "Lycopodium Clavatum"} {rxPotency}</div>
                          <div className="text-[10px] font-medium text-slate-500">Liquid dilution</div>
                      </div>
                      <div className="w-[15%] text-xs pt-0.5">{rxDosage}</div>
                      <div className="w-[35%] text-xs leading-snug pt-0.5">{rxFrequency}</div>
                      <div className="w-[15%] text-right text-xs pt-0.5">{rxDuration}</div>
                    </div>
                    {patient.prescriptions && patient.prescriptions.length > 0 && 
                      patient.prescriptions.map((rx, idx) => (
                        <div key={idx} className={`flex py-4 items-start w-full opacity-50 ${idx !== patient.prescriptions!.length - 1 ? 'border-b border-slate-100' : ''}`}>
                          <div className="w-[35%]">
                             <div className="font-bold text-[13px] text-slate-900 leading-tight mb-1">{rx.remedy} {rx.potency}</div>
                             <div className="text-[10px] font-medium text-slate-500">{rx.type}</div>
                          </div>
                          <div className="w-[15%] text-xs pt-0.5">{rx.dosage}</div>
                          <div className="w-[35%] text-xs leading-snug pt-0.5">{rx.frequency}</div>
                          <div className="w-[15%] text-right text-xs pt-0.5">{rx.duration}</div>
                        </div>
                      ))
                    }
                  </div>
                </div>



                {/* Instructions Box */}
                <div className="border border-dashed border-[#a8c6a6] bg-[#f8faf4] p-5 mb-8 relative mt-auto rounded z-10 w-[95%]">
                  <div className="flex items-center gap-2 border-b border-[#e2ebd9] pb-3 mb-4">
                     <Info size={16} className="text-[#1e612a]" />
                     <h4 className="font-bold text-[13px] text-slate-900 tracking-tight">বিবিধ নির্দেশাবলী / Special Instructions</h4>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-full sm:w-1/2">
                      <h5 className="text-[9px] font-bold text-[#1e612a] uppercase tracking-widest mb-3">DIETARY RESTRICTIONS</h5>
                      <ul className="text-[11px] text-slate-800 font-medium space-y-2 list-disc pl-3 marker:text-slate-400">
                        {patient.dietaryRestrictions && patient.dietaryRestrictions.length > 0 ? (
                          patient.dietaryRestrictions.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))
                        ) : (
                          <>
                            <li>Avoid raw onion and garlic</li>
                            <li>No coffee or strong tea</li>
                            <li>avoid sour/acidic fruits</li>
                          </>
                        )}
                      </ul>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <h5 className="text-[9px] font-bold text-[#1e612a] uppercase tracking-widest mb-3">REGIMEN</h5>
                      <p className="text-[11px] text-slate-800 font-medium leading-[1.6]">
                        {patient.regimen || "Take medicines 30 mins before or after food. Rinse mouth with plain water before taking medicine. Store in a cool, dry place away from sunlight."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Followup */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-auto gap-4">
                  <div className="w-full sm:w-1/3">
                    <h5 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">NEXT FOLLOW-UP</h5>
                    <p className="text-[#1e612a] font-bold text-[14px]">{patient.nextFollowUp || "November 25, 2023"}</p>
                  </div>
                  <div className="w-full sm:w-2/3 sm:text-right">
                    <p className="text-[11px] italic text-slate-600 leading-snug font-medium pt-1">
                      "Keep a symptom diary of any changes in sleep patterns."
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="w-full border-t border-slate-200 mt-12 mb-8"></div>

          {/* Footer Auth */}
          <footer className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-4 relative w-full">
            <div className="w-full md:w-[300px]">
              <p className="text-[10px] text-slate-600 font-medium leading-[1.6]">
                This is a computer-generated prescription signed electronically. Scan QR code to verify authenticity.
              </p>
              <div className="relative inline-block mt-4">
                <div className="w-[60px] h-[60px] bg-slate-100 flex items-center justify-center border border-slate-200 rounded">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=HomeoDeskPro-Verification" alt="QR Code" className="w-full h-full opacity-50 mix-blend-multiply" referrerPolicy="no-referrer" />
                </div>
                <div className="absolute top-0 -right-[4.5rem] border-[1.5px] border-[#dcf0cf] text-[#428a2a] font-bold tracking-widest text-[10px] uppercase px-2 py-0.5 rounded rotate-[-12deg] bg-white shadow-sm z-10">
                  VERIFIED
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-[50px] mb-2 relative">
                {signatureData ? (
                  <img src={signatureData} alt="Signature" className="max-h-full max-w-full object-contain filter opacity-70 mix-blend-multiply" />
                ) : (
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Signature_of_Samuel_Hahnemann.png" alt="Signature" className="h-full object-contain filter opacity-70 mix-blend-multiply" />
                )}
              </div>
              <div className="border-t border-slate-800 pt-2 px-8 text-center min-w-[200px]">
                 <p className="text-[13px] font-bold text-slate-900">{doctorName}</p>
                 <p className="text-[10px] text-slate-500 font-medium mt-0.5">Digital Signature</p>
              </div>
            </div>
          </footer>

          </div>
        </div>
        
        {/* Print Action Bottom */}
        <div className="mt-8 mb-16 print:hidden">
          <button 
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 px-10 py-3.5 rounded bg-[#1e612a] text-white font-bold hover:bg-[#164a20] transition text-[14px] shadow-lg hover:shadow-xl active:scale-95"
          >
            <Printer size={18} />
            Confirm & Print
          </button>
        </div>
      </main>
      </motion.div>
    </div>
  );
};
