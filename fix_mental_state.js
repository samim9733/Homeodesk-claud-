import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "src/ClinicalIntakeForm.tsx");
let code = fs.readFileSync(filePath, "utf8");

const startToken = '<div className="grid grid-cols-1 md:grid-cols-3 gap-8">';
const endToken = '<div className="md:col-span-3">\n               <label className="block text-xs font-bold text-slate-700 mb-3">Detailed Narrative (বিস্তারিত বিবরণ)</label>';

const startIdx = code.indexOf(startToken);
const endIdx = code.indexOf(endToken);

if (startIdx !== -1 && endIdx !== -1) {
    const replacement = `           {(()=>{
              const mindChapter = REPERTORY_DATA.find(c => c.name === 'Mind');
              const mindRubrics = mindChapter ? mindChapter.rubrics : [];
              
              const filteredRubrics = mindRubrics.filter(r => 
                r.name.toLowerCase().includes(mentalSearch.toLowerCase()) || 
                (r.tr && r.tr.includes(mentalSearch))
              );

              return (
                <div className="flex flex-col gap-4 mb-6">
                  <div className="relative mb-2">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search Mental Rubrics (Kent's Repertory) e.g. Anxiety, Fear..." 
                      value={mentalSearch}
                      onChange={(e) => setMentalSearch(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-400"
                    />
                    {mentalSearch && (
                      <button onClick={() => setMentalSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {filteredRubrics.map(rubric => {
                      const isActive = formData.mentalSymptoms?.includes(rubric.name);
                      return (
                        <button 
                          key={rubric.name}
                          onClick={() => {
                            const current = formData.mentalSymptoms || [];
                            if (isActive) {
                              updateFormData('mentalSymptoms', current.filter(s => s !== rubric.name));
                            } else {
                              updateFormData('mentalSymptoms', [...current, rubric.name]);
                            }
                          }}
                          className={\`flex items-center gap-2 px-3 py-2 border rounded-xl text-xs font-medium transition shadow-sm text-left \${
                            isActive 
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-bold' 
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }\`}
                        >
                          <div className={\`w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0 \${isActive ? 'bg-emerald-600' : 'border border-slate-300 bg-white'}\`}>
                            {isActive && <Check size={10} className="text-white"/>}
                          </div>
                          <span>{rubric.name} {rubric.tr && <span className="opacity-75 font-normal ml-1">(\${rubric.tr})</span>}</span>
                        </button>
                      )
                    })}
                    {filteredRubrics.length === 0 && (
                      <div className="w-full py-8 text-center text-slate-400 text-sm font-medium">
                        No mind rubrics found matching "\${mentalSearch}"
                      </div>
                    )}
                  </div>
                  
                  {formData.mentalSymptoms && formData.mentalSymptoms.filter(s => !s.startsWith('Narrative:')).length > 0 && (
                     <div className="mt-4 pt-4 border-t border-slate-100">
                       <label className="block text-xs font-bold text-slate-700 mb-3 mb-3">Selected ({formData.mentalSymptoms.filter(s => !s.startsWith('Narrative:')).length})</label>
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
           })()}

           <div className="grid grid-cols-1 gap-8">
             `;
             
             
    code = code.substring(0, startIdx) + replacement + code.substring(endIdx);
    fs.writeFileSync(filePath, code, "utf8");
    console.log("Success");
} else {
    console.log("Tokens not found", startIdx, endIdx);
}
