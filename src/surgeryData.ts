
export interface SurgeryTable {
  title: string;
  description?: string;
  headers: string[];
  rows: any[][];
}

export interface SurgeryChapter {
  id: number;
  title: string;
  banglaTitle: string;
  part: number;
  sections: string[];
  critical?: boolean;
  highYield?: boolean;
  notes: string;
  tables: SurgeryTable[];
  emergencies?: string[];
  drugs?: { name: string; indication: string; dosage: string }[];
  mcqs?: { question: string; options: string[]; answer: number }[];
  summary?: string;
  stats?: { title: string; value: string; desc: string }[];
}

export const SURGERY_DATA: SurgeryChapter[] = [
  {
    id: 1,
    title: 'Basic Principles of Surgery',
    banglaTitle: 'সার্জারির মৌলিক নীতিসমূহ',
    part: 1,
    sections: ['History of Surgery', 'Wound Healing', 'Surgical Infections', 'Metabolic Response to Injury'],
    critical: false,
    highYield: true,
    notes: 'Surgery is as much a science as it is an art. Wound healing occurs in three main phases: inflammatory, proliferative, and remodeling.',
    tables: [
      {
        title: 'Classification of Surgical Wounds',
        headers: ['Class', 'Description', 'Infection Risk'],
        rows: [
          ['Clean', 'Uninfected, no inflammation, closed primarily', '< 2%'],
          ['Clean-Contaminated', 'Controlled opening of respiratory, GI, or GU tract', '2 - 10%'],
          ['Contaminated', 'Open, fresh, accidental wounds; gross spillage from GI tract', '10 - 20%'],
          ['Dirty-Infected', 'Old traumatic wounds, devitalized tissue, existing infection', '> 20%']
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Shock & Blood Transfusion',
    banglaTitle: 'শক ও রক্ত সঞ্চালন',
    part: 1,
    sections: ['Pathophysiology', 'Classification', 'Management', 'Blood Transfusion'],
    critical: true,
    highYield: true,
    stats: [
      { title: 'Types of Shock', value: '4 Main Classes', desc: 'Distributive, Obstructive, Hypovolemic, Cardiogenic' },
      { title: 'Haemorrhage', value: 'Class I-IV Scale', desc: 'Critical: Class III (>30%)' },
      { title: 'Blood Products', value: 'Storage & Lifespan', desc: 'Platelets: 5 Days @ 22°C' },
      { title: 'Massive Protocol', value: '1:1:1 Ratio', desc: 'RBC:FFP:Platelets' }
    ],
    notes: 'Shock is a state of systemic hypoperfusion. Recognition must be clinical. Do not wait for BP to drop.',
    tables: [
      {
        title: 'Hemodynamic Profiles in Shock',
        headers: ['Type', 'CO', 'SVR', 'CVP', 'Pulse'],
        rows: [
          ['Hypovolaemic', '↓', '↑', '↓', '↑'],
          ['Cardiogenic', '↓', '↑', '↑', '↑'],
          ['Distributive', '↑', '↓', '↓', '↑'],
          ['Obstructive', '↓', '↑', '↑', '↑']
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Trauma',
    banglaTitle: 'ট্রমা ও দুর্ঘটনা',
    part: 1,
    sections: ['ATLS Protocols', 'Triage', 'Head Injury', 'Thoracic Trauma', 'Abdominal Trauma'],
    critical: true,
    highYield: true,
    stats: [
      { title: 'Primary Survey', value: 'ABCDE', desc: 'Airway, Breathing, Circulation, Disability, Exposure' },
      { title: 'Glasgow Coma Scale', value: '3-15 Range', desc: 'Severe < 8, Moderate 9-12, Minor 13-15' },
      { title: 'FAST Scan', value: '4 Views', desc: 'Hepatorenal, Perisplenic, Pelvic, Pericardial' },
      { title: 'Golden Hour', value: 'First 60 Mins', desc: 'Critical time for survival intervention' }
    ],
    notes: 'The initial assessment of a trauma patient is crucial. ATLS guidelines prioritize life-threatening injuries.',
    tables: [
      {
        title: 'Glasgow Coma Scale (GCS)',
        headers: ['Response', 'Eye Opening', 'Verbal', 'Motor'],
        rows: [
          ['4 / 5 / 6', 'Spontaneous', 'Oriented', 'Obeys commands'],
          ['3 / 4 / 5', 'To voice', 'Confused', 'Localizes pain'],
          ['2 / 3 / 4', 'To pain', 'Inappropriate', 'Withdraws from pain'],
          ['1 / 2 / 3', 'None', 'Incomprehensible', 'Abnormal flexion'],
          ['None / 1 / 2', '-', 'None', 'Abnormal extension'],
          ['None / - / 1', '-', '-', 'None']
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'Surgical Infection',
    banglaTitle: 'সার্জিক্যাল ইনফেকশন',
    part: 1,
    sections: ['Definition', 'Pathogenesis', 'Common Pathogens', 'Prophylactic Antibiotics', 'Specific Infections'],
    highYield: true,
    notes: 'Surgical Site Infection (SSI) is defined as infection occurring within 30 days of surgery. Hand washing is the single most important factor in preventing cross-infection.',
    tables: [
      {
        title: 'Common Surgical Pathogens',
        headers: ['Pathogen', 'Source', 'Common Sites'],
        rows: [
          ['Staph aureus', 'Skin, Nasopharynx', 'Skin, Bone, Cardiovascular'],
          ['E. coli', 'GI Trace', 'GU Tract, Biliary'],
          ['Bacteroides', 'Colonic', 'Abscesses, Peritonitis'],
          ['Pseudomonas', 'Water, Green pus', 'Burns, Urinary']
        ]
      }
    ],
    stats: [
      { title: 'SSI Window', value: '30 Days', desc: 'Up to 1 year for implants' },
      { title: 'Asepsis', value: 'Zero Bacteria', desc: 'Freedom from infection' }
    ]
  },
  {
    id: 4,
    title: 'Principles of Oncology',
    banglaTitle: 'অনকোলজি মূলনীতি',
    part: 2,
    sections: ['Tumor Biology', 'Staging', 'Screening', 'Multimodal Therapy'],
    notes: 'Early detection and multimodal treatment approach are key in modern oncology. TNM staging is the gold standard.',
    tables: [
      {
        title: 'TNM Staging System',
        headers: ['Component', 'Description'],
        rows: [
          ['T (Tumour)', 'Size or direct extent of primary tumour'],
          ['N (Node)', 'Degree of spread to regional lymph nodes'],
          ['M (Metastasis)', 'Presence of distant metastasis']
        ]
      }
    ],
    stats: [
      { title: 'Staging', value: 'TNM', desc: 'Universally accepted system' }
    ]
  },
  {
    id: 7,
    title: 'Wounds & Scars',
    banglaTitle: 'ক্ষত ও দাগ',
    part: 1,
    sections: ['Wound Healing', 'Surgical Wounds', 'Complications', 'Keloids & Hypertrophic Scars'],
    highYield: true,
    notes: 'Wound healing is a complex process. Keloids extend beyond the original wound boundary, while hypertrophic scars do not.',
    tables: [
      {
        title: 'Keloid vs Hypertrophic Scar',
        headers: ['Feature', 'Keloid', 'Hypertrophic Scar'],
        rows: [
          ['Boundary', 'Extends beyond wound', 'Stays within wound'],
          ['Regress', 'Rarely', 'Often regresses with time'],
          ['Race', 'Dark skin common', 'Any race'],
          ['Sites', 'Sternum, Ear lobes', 'Any site']
        ]
      }
    ]
  }
];
