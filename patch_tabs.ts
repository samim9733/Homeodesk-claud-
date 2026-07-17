import fs from 'fs';

const file = 'src/LibraryTabs.tsx';
let content = fs.readFileSync(file, 'utf-8');

// 1. the fixed progress bar
content = content.replace('১৯/{DIAGNOSES_DATA.length}', '{DIAGNOSES_DATA.length}');
content = content.replace('progress: ২২%', 'progress: ১০০%');
content = content.replace('অগ্রগতি: ২২%', 'অগ্রগতি: ১০০%');
content = content.replace(/width: '22%'/g, "width: '100%'");
content = content.replace('রোগ পর্যালোচনা: ৪৮%', 'রোগ পর্যালোচনা: সম্পূর্ণ');
content = content.replace(/w-\[48%\]/g, 'w-full');
content = content.replace('রোগ অধ্যয়ন: ৬৫%', 'রোগ অধ্যয়ন: বিস্তারিত');
content = content.replace(/width: '65%'/g, "width: '100%'");

// 2. fix activeTab medicine hardcoded texts
const oldMedFootnote = `<div className="p-4 bg-[#F8FFF9] text-[10px] font-bold text-slate-500 border-t border-[#D1FAE5]">
                             📌 নির্দেশিকা: ডেঙ্গুর ক্ষেত্রে Eupatorium Perfoliatum-কে প্রথম পছন্দের ওষুধ হিসেবে বিবেচনা করা হয় যখন হাড় ভাঙা ব্যথার সাথে জ্বর থাকে।
                           </div>`;
const newMedFootnote = `<div className="p-4 bg-[#F8FFF9] text-[10px] font-bold text-slate-500 border-t border-[#D1FAE5]">
                             📌 সারাংশ: {selectedDiagnosis.summary || 'রোগীর নিজস্ব লক্ষণের ওপর ভিত্তি করে ঔষধ নির্বাচন আবশ্যক।'}
                           </div>`;
content = content.replace(oldMedFootnote, newMedFootnote);

// 3. fix alert box
const oldAlertBox = `{/* ALERT BOX */}
                       <section className="bg-gradient-to-br from-[#FFF5F5] to-[#FFF0F0] border border-[#FCA5A5] border-l-[6px] border-l-[#DC2626] rounded-3xl p-8 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-3xl -mr-24 -mt-24" />
                          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
                             <div className="space-y-4 max-w-2xl">
                               <div className="flex items-center gap-3">
                                  <div className="px-3 py-1 bg-red-600 text-white rounded-full text-[10px] font-black animate-pulse">🔴 জরুরি সতর্কতা</div>
                                  <h3 className="text-xl font-black text-[#991B1B]">ডেঙ্গু হেমোরেজিক ফিভার (DHF) — বিপদ চিহ্ন</h3>
                               </div>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                  <div className="space-y-3">
                                    <h4 className="text-[12px] font-black text-[#991B1B] uppercase tracking-widest flex items-center gap-2">⚠️ বিপদ লক্ষণ</h4>
                                    <ul className="space-y-2 text-[13px] font-bold text-[#7F1D1D] opacity-80">
                                      {selectedDiagnosis.emergencySigns?.map((sign, i) => (
                                        <li key={i} className="flex items-center gap-2">• {sign}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="space-y-3">
                                    <h4 className="text-[12px] font-black text-[#166534] uppercase tracking-widest flex items-center gap-2">✅ জরুরি হোমিও ধাপ</h4>
                                    <ul className="space-y-2 text-[12px] font-bold text-[#14532D]">
                                      <li>১. Crotalus Horridus 30C — প্রতি ১ঘ ঘণ্টা</li>
                                      <li>২. Phosphorus 30C — ৩ ঘণ্টা পরপর</li>
                                      <li>৩. অবিলম্বে উন্নত চিকিৎসা কেন্দ্রে প্রেরণ</li>
                                      <li>৪. রক্ত পরীক্ষা (CBC) পুনরায় নিশ্চিত করা</li>
                                    </ul>
                                  </div>
                               </div>
                             </div>
                             <div className="flex flex-col gap-3 shrink-0">
                                <div className="bg-white/40 p-5 rounded-2xl border border-red-200">
                                  <p className="text-[9px] font-black text-red-600 uppercase mb-2">Critical Count</p>
                                  <p className="text-4xl font-mono font-black text-slate-900 tracking-tighter">&lt;৫০,০০০</p>
                                  <p className="text-[9px] text-slate-400 font-bold mt-1">Platelet Count Indicator</p>
                                </div>
                                <div className="py-3 px-5 bg-red-600 text-white rounded-xl text-center font-black text-[10px] tracking-[0.2em] shadow-lg shadow-red-200 uppercase">
                                  ভর্তি প্রয়োজন
                                </div>
                             </div>
                          </div>
                          <div className="mt-8 pt-6 border-t border-red-100 flex items-center justify-center">
                            <p className="text-[11px] font-black text-red-600 italic">🔴 গুরুত্বপূর্ণ: ডেঙ্গুতে Aspirin বা NSAID গ্রুপের ওষুধ দেবেন না — এতে রক্তক্ষরণের ঝুঁকি বাড়ে।</p>
                          </div>
                       </section>`;

const newAlertBox = `{selectedDiagnosis.emergencySigns && selectedDiagnosis.emergencySigns.length > 0 && (
                        {/* ALERT BOX */}
                       <section className="bg-gradient-to-br from-[#FFF5F5] to-[#FFF0F0] border border-[#FCA5A5] border-l-[6px] border-l-[#DC2626] rounded-3xl p-8 relative overflow-hidden group mt-6">
                          <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-3xl -mr-24 -mt-24" />
                          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
                             <div className="space-y-4 max-w-2xl w-full">
                               <div className="flex items-center gap-3">
                                  <div className="px-3 py-1 bg-red-600 text-white rounded-full text-[10px] font-black animate-pulse">🔴 জরুরি সতর্কতা</div>
                                  <h3 className="text-xl font-black text-[#991B1B]">বিপদ চিহ্ন (Emergency Signs)</h3>
                               </div>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                  <div className="space-y-3">
                                    <h4 className="text-[12px] font-black text-[#991B1B] uppercase tracking-widest flex items-center gap-2">⚠️ বিপদ লক্ষণ</h4>
                                    <ul className="space-y-2 text-[13px] font-bold text-[#7F1D1D] opacity-80">
                                      {selectedDiagnosis.emergencySigns?.map((sign, i) => (
                                        <li key={i} className="flex items-center gap-2">• {sign}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="space-y-3">
                                    <h4 className="text-[12px] font-black text-[#166534] uppercase tracking-widest flex items-center gap-2">✅ করণীয়</h4>
                                    <ul className="space-y-2 text-[12px] font-bold text-[#14532D]">
                                      <li>১. জরুরী ভিত্তিতে হাসপাতালে স্থানান্তর করার প্রস্তুতি রাখুন।</li>
                                      <li>২. অবস্থার অবনতি হলে নিকটস্থ চিকিৎসকের পরামর্শ নিন।</li>
                                    </ul>
                                  </div>
                               </div>
                             </div>
                          </div>
                          <div className="mt-8 pt-6 border-t border-red-100 flex items-center justify-center">
                            <p className="text-[11px] font-black text-red-600 italic">🔴 গুরুত্বপূর্ণ: জরুরি অবস্থায় এলোপ্যাথিক বা আধুনিক চিকিৎসা গ্রহণ করা আবশ্যক হতে পারে।</p>
                          </div>
                       </section>
                     )}`;
content = content.replace(oldAlertBox, newAlertBox);

// 4. fix symptoms
const oldSymptoms = `<div className="bg-[#F0FDF4] px-6 py-4 border-b border-[#D1FAE5] flex justify-between items-center text-[10px] font-black text-[#166534] uppercase tracking-widest">
                             <span>WHO লক্ষণ শ্রেণীবিভাগ</span>
                             <span className="bg-white px-2 py-1 rounded text-primary border border-primary/20">Class A Indicator</span>
                           </div>

                           <div className="bg-white divide-y divide-[#D1FAE5]">
                             {[
                               { type: '🔴 সাধারণ লক্ষণ', desc: 'হঠাৎ তীব্র জ্বর (১০২-১০৪°F), মাথাব্যথা, চোখের পেছনে ব্যথা', sev: 'অতি তীব্র 🔴', dur: '১-৩ দিন', color: 'border-l-red-500' },
                               { type: '🔴 ব্যথার লক্ষণ', desc: 'হাড়ে-পেশীতে তীব্র ব্যথা ("হাড় ভাঙা জ্বর"), পিঠের ব্যথা', sev: 'তীব্র 🔴', dur: '৩-৭ দিন', color: 'border-l-red-500' },
                               { type: '🟡 ত্বকের লক্ষণ', desc: 'লালচে র্যাশ, "আইল্যান্ড অফ হোয়াইট", চুলকানি', sev: 'মধ্যম 🟡', dur: '৪-৭ দিন', color: 'border-l-amber-400' },
                               { type: '🔴 রক্তক্ষরণ (DHF)', desc: 'পিটিচিয়া, রক্তপাত, Tourniquet test পজিটিভ', sev: 'বিপজ্জনক 🔴', dur: '৪-৬ দিন', color: 'border-l-red-500' },
                               { type: '🟢 পুনরুদ্ধার', desc: 'জ্বর কমে যাওয়া, ক্ষুধা ফিরে আসা, দুর্বলতা থাকা', sev: 'হালকা 🟢', dur: '৭-১০ দিন', color: 'border-l-emerald-400' }
                             ].map((row, i) => (
                               <div key={i} className={\`flex flex-col md:flex-row hover:bg-[#F8FFF9] transition-all border-l-[5px] \${row.color}\`}>
                                 <div className="w-full md:w-1/4 p-6 bg-slate-50/50">
                                   <p className="text-[13px] font-black text-slate-800 tracking-tight">{row.type}</p>
                                 </div>
                                 <div className="flex-1 p-6">
                                   <p className="text-sm font-bold text-slate-600 leading-relaxed">{row.desc}</p>
                                 </div>
                                 <div className="w-1/3 md:w-1/6 p-6 flex flex-col items-center justify-center border-l border-slate-50">
                                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest mb-1">{row.sev}</span>
                                    <p className="text-[9px] font-bold text-slate-400">{row.dur}</p>
                                 </div>
                               </div>
                             ))}
                           </div>`;

const newSymptoms = `<div className="bg-[#F0FDF4] px-6 py-4 border-b border-[#D1FAE5] flex justify-between items-center text-[10px] font-black text-[#166534] uppercase tracking-widest">
                             <span>প্রধান লক্ষণসমূহ</span>
                             <span className="bg-white px-2 py-1 rounded text-primary border border-primary/20">Clinical Profile</span>
                           </div>

                           <div className="bg-white divide-y divide-[#D1FAE5]">
                             {selectedDiagnosis.banglaSymptoms?.map((sym, i) => (
                               <div key={i} className="flex flex-col md:flex-row hover:bg-[#F8FFF9] transition-all border-l-[5px] border-l-primary">
                                 <div className="w-full md:w-1/4 p-6 bg-slate-50/50 flex items-center">
                                   <p className="text-[13px] font-black text-slate-800 tracking-tight">লক্ষণ {i + 1}</p>
                                 </div>
                                 <div className="flex-1 p-6 flex items-center">
                                   <p className="text-sm font-bold text-slate-600 leading-relaxed">{sym}</p>
                                 </div>
                                 <div className="w-1/3 md:w-1/6 p-6 flex flex-col items-center justify-center border-l border-slate-50">
                                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest mb-1">{selectedDiagnosis.severity === 'severe' ? 'তীব্র' : 'সাধারণ'}</span>
                                 </div>
                               </div>
                             ))}
                           </div>`;
content = content.replace(oldSymptoms, newSymptoms);

// 5. Hardcoded tags
content = content.replace('<span className="px-3 py-1 bg-[#14B8A6]/10 text-[#0F766E] text-[10px] font-black rounded-lg uppercase">🦟 ভাইরাল সংক্রমণ</span>', '');
content = content.replace('<span className="px-3 py-1 bg-[#2563EB]/10 text-[#1D4ED8] text-[10px] font-black rounded-lg uppercase">💉 রক্তবাহিত রোগ</span>', '');
content = content.replace('<span className="px-3 py-1 bg-[#F59E0B]/10 text-[#B45309] text-[10px] font-black rounded-lg uppercase">⏱ তীব্র রোগ (৭-১০ দিন)</span>', '');

fs.writeFileSync(file, content);
console.log('Successfully patched LibraryTabs.tsx');
