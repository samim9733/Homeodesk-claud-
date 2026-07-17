import React, { useState } from 'react';
import { DIAGNOSES_DATA, ClinicalDiagnosis } from './practiceMedicineData';
import { Edit, Trash2, FilePlus, Search } from 'lucide-react';

export function PracticeMedicineAdminPanel() {
  const [diagnoses, setDiagnoses] = useState<ClinicalDiagnosis[]>(DIAGNOSES_DATA);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDiagnoses = diagnoses.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.banglaName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-50 pb-6">
        <div>
          <h3 className="font-black text-lg text-slate-900">Practice of Medicine Manager</h3>
          <p className="text-xs text-slate-400 mt-0.5">Manage clinical diagnoses, remedies, and symptoms.</p>
        </div>
        <button 
          className="px-4 py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-black rounded-xl text-xs flex items-center gap-1.5 transition-all"
        >
          <FilePlus size={14} />+ New Diagnosis
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search diagnoses..."
          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:ring-1 focus:ring-[#038aa6] focus:outline-none focus:bg-white text-slate-800"
        />
      </div>

      <div className="border border-slate-100 rounded-2xl overflow-hidden mt-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-4 text-[10px] uppercase font-black tracking-wider text-slate-400">ID</th>
              <th className="p-4 text-[10px] uppercase font-black tracking-wider text-slate-400">Name (En)</th>
              <th className="p-4 text-[10px] uppercase font-black tracking-wider text-slate-400">Name (Bn)</th>
              <th className="p-4 text-[10px] uppercase font-black tracking-wider text-slate-400">Severity</th>
              <th className="p-4 text-[10px] uppercase font-black tracking-wider text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDiagnoses.map((diag) => (
              <tr key={diag.id} className="border-b border-slate-100/60 hover:bg-slate-50/50">
                <td className="p-4 font-mono text-[10px] text-[#038aa6] font-bold">{diag.id}</td>
                <td className="p-4 font-bold text-slate-800 text-xs">{diag.name}</td>
                <td className="p-4 text-xs text-slate-600 font-semibold">{diag.banglaName}</td>
                <td className="p-4 text-xs capitalize">{diag.severity}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button className="p-2 text-slate-500 hover:text-[#038aa6] hover:bg-slate-100 rounded-xl transition">
                      <Edit size={13} />
                    </button>
                    <button className="p-2 text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
