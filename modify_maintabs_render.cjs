const fs = require('fs');
let content = fs.readFileSync('src/MainTabs.tsx', 'utf8');

// Replace getAllRemedies signature and logic
content = content.replace(
  "const getAllRemedies = (data: RubricData): RepertoryRemedy[] => {",
  "const getAllRemedies = (data?: import('./types').RubricData): import('./types').Remedy[] => {"
);
content = content.replace(
  "if (!data) return remedies;",
  "if (!data) return remedies;" // It's already doing this
);

content = content.replace(
  "matchesFilter(sub.d, activeFilter)",
  "matchesFilter(sub.d || { general: {} }, activeFilter)"
);

content = content.replace(
  "const keys = Object.keys(sub.d).filter(k => k !== 'general' && Array.isArray((sub.d as any)[k]) && (sub.d as any)[k].length > 0);",
  "const keys = Object.keys(sub.d || {}).filter(k => k !== 'general' && Array.isArray((sub.d || {} as any)[k]) && (sub.d || {} as any)[k].length > 0);"
);

content = content.replace(
  "Object.entries(sub.d).map(([key, val]) => {",
  "Object.entries(sub.d || {}).map(([key, val]) => {"
);

// We need to inject the "Next window" button and handle `rubricPath` in `addToAnalysis`.
// The block starting at `<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">`
const buttonBlock = `                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                                      <div className="flex flex-wrap gap-2">
                                        {Object.entries(sub.d || {}).map(([key, val]) => {
                                          if (key === 'general' || !val || (Array.isArray(val) && val.length === 0)) return null;
                                          return (
                                            <span key={key} className="px-2 py-0.5 bg-slate-50 text-slate-400 text-[8px] font-black uppercase tracking-widest rounded-md border border-slate-100">
                                              {key}
                                            </span>
                                          );
                                        })}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        {sub.sr && sub.sr.length > 0 && (
                                          <button 
                                            onClick={() => setRubricPath(prev => [...prev, sub])}
                                            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all w-full sm:w-auto"
                                          >
                                            Next window <ChevronRight size={12} />
                                          </button>
                                        )}
                                        {sub.d && (
                                        <button 
                                          onClick={() => addToAnalysis({
                                            chapter: selectedChapter,
                                            rubric: rubricPath[0].name,
                                            subrubric: rubricPath.slice(1).map(r => r.name).concat(sub.name).join(', '),
                                            text: \`\${rubricPath.map(r => r.name).join(', ')}, \${sub.name}\`,
                                            category: 'General',
                                            page: currentChapterIndex?.p.split('-')[0] ? parseInt(currentChapterIndex.p.split('-')[0]) : 0,
                                            remedies: getAllRemedies(sub.d)
                                          })}
                                          className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all w-full sm:w-auto"
                                        >
                                          <Plus size={12} /> {t('repertory.addToSelection')}
                                        </button>
                                        )}
                                      </div>
                                    </div>`;

const searchBlock = `                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                                      <div className="flex flex-wrap gap-2">
                                        {Object.entries(sub.d || {}).map(([key, val]) => {
                                          if (key === 'general' || !val || (Array.isArray(val) && val.length === 0)) return null;
                                          return (
                                            <span key={key} className="px-2 py-0.5 bg-slate-50 text-slate-400 text-[8px] font-black uppercase tracking-widest rounded-md border border-slate-100">
                                              {key}
                                            </span>
                                          );
                                        })}
                                      </div>
                                      <button 
                                        onClick={() => addToAnalysis({
                                          chapter: selectedChapter,
                                          rubric: selectedRubric.name,
                                          subrubric: sub.name,
                                          text: \`\${selectedRubric.name}, \${sub.name}\`,
                                          category: 'General',
                                          page: currentChapterIndex?.p.split('-')[0] ? parseInt(currentChapterIndex.p.split('-')[0]) : 0,
                                          remedies: getAllRemedies(sub.d)
                                        })}
                                        className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all w-full sm:w-auto"
                                      >
                                        <Plus size={12} /> {t('repertory.addToSelection')}
                                      </button>
                                    </div>`;

content = content.replace(searchBlock, buttonBlock);

// Also need to fix where selectedRubric.name is used in the UI header
// For example: {selectedRubric ? t('repertory.rubricDetails') : t('repertory.centralRepertory')}
// and {selectedRubric ? (language === 'en' ? selectedRubric.name : (selectedRubric.tr || selectedRubric.name)) : t('repertory.browser')}

content = content.replace(
  "{selectedRubric ? (language === 'en' ? selectedRubric.name : (selectedRubric.tr || selectedRubric.name)) : t('repertory.browser')}",
  "{selectedRubric ? rubricPath.map(r => language === 'en' ? r.name : (r.tr || r.name)).join(' ❭ ') : t('repertory.browser')}"
);

fs.writeFileSync('src/MainTabs.tsx', content, 'utf8');
console.log('MainTabs modified.');
