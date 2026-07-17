import fs from 'fs';

const file = 'src/LibraryTabs.tsx';
let content = fs.readFileSync(file, 'utf-8');

const missingTabsContent = `
                  {activeTab === 'summary' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <section className="bg-white border border-slate-100 rounded-3xl p-10">
                        <div className="flex items-center gap-4 mb-6">
                           <span className="text-3xl">📄</span>
                           <h2 className="text-2xl font-black text-slate-800 tracking-tight">রোগের সারাংশ (Summary)</h2>
                        </div>
                        <p className="text-lg text-slate-600 font-medium leading-relaxed">
                          {selectedDiagnosis.summary || 'কোন সারাংশ পাওয়া যায়নি। লক্ষণ অনুযায়ী ঔষধ নির্বাচন করুন।'}
                        </p>
                      </section>
                    </div>
                  )}

                  {activeTab === 'complications' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <section className="bg-white border border-red-100 border-l-[6px] border-l-red-500 rounded-3xl p-10 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                           <span className="text-3xl">⚠</span>
                           <h2 className="text-2xl font-black text-slate-800 tracking-tight">জটিলতা (Complications)</h2>
                        </div>
                        {selectedDiagnosis.emergencySigns && selectedDiagnosis.emergencySigns.length > 0 ? (
                          <ul className="space-y-4">
                            {selectedDiagnosis.emergencySigns.map((comp, idx) => (
                              <li key={idx} className="flex items-center gap-3 text-red-700 font-bold bg-red-50 p-4 rounded-xl">
                                <span className="material-symbols-outlined text-red-500">error</span>
                                {comp}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-slate-500">উল্লেখযোগ্য জটিলতা পাওয়া যায়নি। লক্ষণ প্রকাশ পেলে চিকিৎসকের পরামর্শ নিন।</p>
                        )}
                      </section>
                    </div>
                  )}

                  {activeTab === 'differential' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <section className="bg-white border border-blue-100 rounded-3xl p-10 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                           <span className="text-3xl">🏥</span>
                           <h2 className="text-2xl font-black text-slate-800 tracking-tight">পার্থক্য নির্ণয় (Differential Diagnosis)</h2>
                        </div>
                        {selectedDiagnosis.differentialDiagnosis && selectedDiagnosis.differentialDiagnosis.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {selectedDiagnosis.differentialDiagnosis.map((diff, idx) => (
                               <div key={idx} className="bg-blue-50 p-6 rounded-2xl">
                                 <h4 className="text-lg font-black text-blue-900 mb-2">{diff.feature}</h4>
                                 <ul className="space-y-2 text-sm text-slate-600 font-medium">
                                   {Object.entries(diff).filter(([key]) => key !== 'feature').map(([k, v]) => (
                                     <li key={k}><strong>{k}:</strong> {v}</li>
                                   ))}
                                 </ul>
                               </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-slate-500 font-medium text-lg text-center p-8 bg-slate-50 rounded-2xl border border-slate-100">
                            এই রোগের জন্য সুনির্দিষ্ট পার্থক্য নির্ণয় যুক্ত করা হয়নি। অন্যান্য রোগের সাথে লক্ষণ মিলিয়ে দেখুন।
                          </p>
                        )}
                      </section>
                    </div>
                  )}
`;

content = content.replace(
  "{activeTab === 'keypoints' && (",
  missingTabsContent + "\\n                  {activeTab === 'keypoints' && ("
);

fs.writeFileSync(file, content);
console.log('Tabs added to LibraryTabs.tsx');
