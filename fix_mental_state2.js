import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "src/ClinicalIntakeForm.tsx");
let code = fs.readFileSync(filePath, "utf8");

const startTokenStr = "const mindChapter = REPERTORY_DATA.find(c => c.name === 'Mind');";
const idxMind = code.indexOf(startTokenStr);

if (idxMind !== -1) {
    const startIdx = code.lastIndexOf("{(()=>{", idxMind);
    const endIdx = code.indexOf("})()}", idxMind);
    
    if (startIdx !== -1 && endIdx !== -1) {
        const originalBlock = code.substring(startIdx, endIdx + 5);
        const replacement = `{(()=>{
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
                        }
                      }}
                    >
                      <option value="">Select Mental Rubrics (Kent's Repertory)...</option>
                      {mindRubrics.map(rubric => (
                        <option key={rubric.name} value={rubric.name} disabled={formData.mentalSymptoms?.includes(rubric.name)}>
                          {rubric.name} {rubric.tr ? \`(\${rubric.tr})\` : ''}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                  
                  {formData.mentalSymptoms && formData.mentalSymptoms.filter(s => !s.startsWith('Narrative:')).length > 0 && (
                     <div className="mt-4 pt-4 border-t border-slate-100">
                       <label className="block text-xs font-bold text-slate-700 mb-3">Selected ({formData.mentalSymptoms.filter(s => !s.startsWith('Narrative:')).length})</label>
                       <div className="flex flex-wrap gap-2">
                         {formData.mentalSymptoms.filter(s => !s.startsWith('Narrative:')).map(s => (
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
           })()}`;
        
        code = code.replace(originalBlock, replacement);
        fs.writeFileSync(filePath, code, "utf8");
        console.log("Success");
    } else {
        console.log("Could not find start/end", startIdx, endIdx);
    }
} else {
    console.log("Token not found", idxMind);
}
