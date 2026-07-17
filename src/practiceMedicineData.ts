export interface MedicineDetail {
  name: string;
  symptoms: string;
  potency: string;
  priority: '1st Choice' | 'High' | 'Medium' | 'Emergency';
  shortDesc?: string;
}

export interface ClinicalDiagnosis {
  id: string;
  name: string;
  banglaName: string;
  category: string;
  section: string;
  icd10?: string;
  severity: 'mild' | 'moderate' | 'severe';
  feverTemp?: string;
  stats?: {
    label: string;
    value: string;
  }[];
  commonSymptoms: string[];
  banglaSymptoms: string[];
  repertoryRubrics: string[];
  mainRemedies: string[];
  medicineDetails?: MedicineDetail[];
  emergencySigns?: string[];
  investigations?: { label: string; note: string }[];
  differentialDiagnosis?: { feature: string; [key: string]: string }[];
  summary?: string;
}

export const DIAGNOSES_DATA: ClinicalDiagnosis[] = [
  {
    "id": "amoebic-dysentery",
    "name": "Amoebic Dysentery",
    "banglaName": "অ্যামিবিক আমাশয়",
    "category": "Gastrointestinal",
    "section": "Section E: পরিপাকতন্ত্র",
    "severity": "moderate",
    "banglaSymptoms": [
      "রক্ত ও মিউকাস মিশ্রিত পাতলা পায়খানা",
      "বারবার পায়খানার তাগিদ",
      "পেটে মচকানো ব্যথা",
      "হালকা জ্বর",
      "দুর্বলতা"
    ],
    "commonSymptoms": [
      "Bloody and mucous stool",
      "Frequent urge",
      "Cramping abdominal pain",
      "Low-grade fever",
      "Weakness"
    ],
    "investigations": [
      {
        "label": "Stool Microscopy",
        "note": "এন্টামিবা হিস্টোলাইটিকা ট্রফোজয়েট বা সিস্ট"
      },
      {
        "label": "Clinical History",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Dysentery, bloody – Merc. cor.",
      "Cramping pain – Colocynthis",
      "Tenesmus – Nux vomica."
    ],
    "mainRemedies": [
      "Merc. cor.",
      "Colocynthis",
      "Nux vomica",
      "Podophyllum"
    ],
    "medicineDetails": [
      {
        "name": "Merc. cor.",
        "symptoms": "রক্ত ও মিউকাস মিশ্রিত পাতলা পায়খানা",
        "potency": "30C, 200C",
        "priority": "1st Choice"
      },
      {
        "name": "Colocynthis",
        "symptoms": "পেটে মচকানো ব্যথা",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Nux vomica",
        "symptoms": "বারবার পায়খানার তাগিদ",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Podophyllum",
        "symptoms": "পাতলা পায়খানা",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "দীর্ঘমেয়াদী কোলাইটিস",
      "লিভারের ফোড়া",
      "অপুষ্টি",
      "ডিহাইড্রেশন"
    ],
    "summary": "এন্টামিবা পরজীবী ঘটিত আমাশয়। Merc. cor. ও Colocynthis প্রধান প্রতিকার।"
  },
  {
    "id": "arthritis",
    "name": "Arthritis",
    "banglaName": "আর্থ্রাইটিস (বাতবেদনা)",
    "category": "Musculoskeletal",
    "section": "Section F: হাড় ও জয়েন্ট",
    "severity": "moderate",
    "banglaSymptoms": [
      "জয়েন্ট ফুলে যাওয়া",
      "ব্যথা",
      "শক্ত হয়ে যাওয়া",
      "লালচে ভাব",
      "সকালে কাঠিন্য বেশি"
    ],
    "commonSymptoms": [
      "Joint swelling",
      "Pain",
      "Stiffness",
      "Redness",
      "Morning stiffness"
    ],
    "investigations": [
      {
        "label": "Blood Test",
        "note": "RA factor, ESR, CRP"
      },
      {
        "label": "X-ray",
        "note": "জয়েন্টের অবস্থা"
      }
    ],
    "repertoryRubrics": [
      "Joint pain, better by motion – Rhus tox",
      "worse by motion – Bryonia",
      "swelling with stinging – Apis."
    ],
    "mainRemedies": [
      "Rhus tox",
      "Bryonia",
      "Apis mellifica",
      "Ledum pal"
    ],
    "medicineDetails": [
      {
        "name": "Rhus tox",
        "symptoms": "নড়াচড়ায় আরাম, সকালে ব্যথা বেশি",
        "potency": "30C, 200C",
        "priority": "1st Choice"
      },
      {
        "name": "Bryonia",
        "symptoms": "নড়াচড়ায় বৃদ্ধি, বিশ্রামে আরাম",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Apis mellifica",
        "symptoms": "ফুলে যাওয়া, হুল ফোটানো ব্যথা",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Ledum pal",
        "symptoms": "ঠাণ্ডায় আরাম",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "জয়েন্ট বিকৃতি",
      "অ্যানকাইলোসিস",
      "পেশি ক্ষয়"
    ],
    "summary": "বিভিন্ন ধরনের আর্থ্রাইটিসে Rhus tox ও Bryonia অন্যতম।"
  },
  {
    "id": "asthma",
    "name": "Asthma",
    "banglaName": "অ্যাজমা",
    "category": "Respiratory",
    "section": "Section C: শ্বাসতন্ত্রের রোগ",
    "severity": "severe",
    "banglaSymptoms": [
      "শ্বাস নিতে কষ্ট",
      "বুকের ভিতর শাঁই শাঁই শব্দ",
      "শুষ্ক বা ভেজা কাশি",
      "রাতে বাড়ে"
    ],
    "commonSymptoms": [
      "Breathing difficulty",
      "Wheezing",
      "Dry or wet cough",
      "Worse at night"
    ],
    "investigations": [
      {
        "label": "Spirometry",
        "note": "ফুসফুসের কার্যকারিতা"
      },
      {
        "label": "Peak flow meter",
        "note": ""
      },
      {
        "label": "Allergy Test",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Asthma, night – Ars.",
      "Dry, barking cough – Spongia",
      "Rattling cough – Ant-t."
    ],
    "mainRemedies": [
      "Arsenicum album",
      "Spongia",
      "Ipecac",
      "Antimonium tart"
    ],
    "medicineDetails": [
      {
        "name": "Arsenicum album",
        "symptoms": "রাতে বাড়ে, অস্থিরতা, ছটফট করা",
        "potency": "30C, 200C",
        "priority": "1st Choice"
      },
      {
        "name": "Spongia",
        "symptoms": "শুষ্ক, ঘেউ ঘেউ কাশি",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Ipecac",
        "symptoms": "কাশির সাথে বমি ভাব",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Antimonium tart",
        "symptoms": "বুকে কফ জমার শব্দ, তুলতে পারে না",
        "potency": "30C",
        "priority": "High"
      }
    ],
    "emergencySigns": [
      "এমফিসেমা",
      "শ্বাসযন্ত্র ফেইলিওর",
      "কর পালমোনেল"
    ],
    "summary": "অ্যাজমা দীর্ঘস্থায়ী প্রদাহ। Arsenicum, Spongia ও Ipecac প্রধান।"
  },
  {
    "id": "bronchitis",
    "name": "Bronchitis",
    "banglaName": "ব্রংকাইটিস",
    "category": "Respiratory",
    "section": "Section C: শ্বাসতন্ত্রের রোগ",
    "severity": "moderate",
    "banglaSymptoms": [
      "কফ সহ কাশি",
      "জ্বর",
      "বুক ব্যথা",
      "শ্বাসকষ্ট",
      "গলা খুসখুসে"
    ],
    "commonSymptoms": [
      "Cough with excessive phlegm",
      "Fever",
      "Chest pain",
      "Shortness of breath",
      "Tickling throat"
    ],
    "investigations": [
      {
        "label": "Stethoscope",
        "note": "বুকে রনকি শোনা"
      },
      {
        "label": "Chest X-ray",
        "note": "ফুসফুসের অবস্থা"
      }
    ],
    "repertoryRubrics": [
      "Cough with thick phlegm – Hepar",
      "Dry painful cough – Bryonia",
      "Blood-streaked – Phosphorus."
    ],
    "mainRemedies": [
      "Bryonia",
      "Phosphorus",
      "Hepar sulph",
      "Antimonium tart"
    ],
    "medicineDetails": [
      {
        "name": "Hepar sulph",
        "symptoms": "ঘন কফ, ঠাণ্ডায় বাড়ে",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Bryonia",
        "symptoms": "শুষ্ক যন্ত্রণাদায়ক কাশি, বুকে ব্যথা",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Phosphorus",
        "symptoms": "রক্তমিশ্রিত কফ, গলা খুসখুস",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Antimonium tart",
        "symptoms": "বুকে ঘড়ঘড় শব্দ, শ্বাসকষ্ট",
        "potency": "30C",
        "priority": "High"
      }
    ],
    "emergencySigns": [
      "নিউমোনিয়া",
      "ক্রনিক ব্রংকাইটিস",
      "শ্বাসকষ্ট"
    ],
    "summary": "ব্রংকাইটিস শ্বাসনালীর প্রদাহ। Hepar sulph ও Bryonia গুরুত্বপূর্ণ।"
  },
  {
    "id": "cholera",
    "name": "Cholera",
    "banglaName": "কলেরা",
    "category": "Gastrointestinal",
    "section": "Section E: পরিপাকতন্ত্র",
    "severity": "severe",
    "banglaSymptoms": [
      "পানি ঝরা ডায়রিয়া (চালের জলের মতো)",
      "বমি",
      "পেশি টান",
      "ডিহাইড্রেশন",
      "চোখ বসে যাওয়া"
    ],
    "commonSymptoms": [
      "Rice water diarrhoea",
      "Vomiting",
      "Muscle cramps",
      "Dehydration",
      "Sunken eyes"
    ],
    "investigations": [
      {
        "label": "Stool Culture",
        "note": "ভিব্রিও কলেরার উপস্থিতি"
      },
      {
        "label": "Clinical",
        "note": "দ্রুত ডিহাইড্রেশনের ইতিহাস"
      }
    ],
    "repertoryRubrics": [
      "Rice water stool – Camph., Verat.",
      "Muscle cramps – Cuprum",
      "Collapse – Carbo veg."
    ],
    "mainRemedies": [
      "Camphora",
      "Veratrum album",
      "Cuprum met",
      "Carbo veg"
    ],
    "medicineDetails": [
      {
        "name": "Camphora",
        "symptoms": "প্রাথমিক পর্যায়, শরীর বরফের মতো ঠাণ্ডা",
        "potency": "30C, 1M",
        "priority": "1st Choice"
      },
      {
        "name": "Veratrum album",
        "symptoms": "প্রচুর ঘাম, চালধোয়া জলের মতো মল",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Cuprum met",
        "symptoms": "পেশিতে তীব্র টান বা খিল ধরা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Carbo veg",
        "symptoms": "কলাপ্স অবস্থা, নাড়ি ক্ষীণ",
        "potency": "30C",
        "priority": "Emergency"
      }
    ],
    "emergencySigns": [
      "রেনাল ফেইলিওর",
      "হাইপোভোলেমিক শক",
      "মৃত্যু"
    ],
    "summary": "Vibrio cholerae জনিত মারণ রোগ। ক্যাম্ফোরা প্রথম সারির ওষুধ।"
  },
  {
    "id": "dengue-fever",
    "name": "Dengue Fever",
    "banglaName": "ডেঙ্গু জ্বর",
    "category": "Infectious",
    "section": "Section A: জ্বর ও সংক্রামক রোগ",
    "severity": "severe",
    "banglaSymptoms": [
      "হঠাৎ উচ্চ জ্বর",
      "তীব্র মাথাব্যথা (চোখের পেছনে)",
      "হাড় ও পেশিতে ব্যথা",
      "ফুসকুড়ি",
      "বমি"
    ],
    "commonSymptoms": [
      "High sudden fever",
      "Severe headache (behind eyes)",
      "Bone and muscle pain",
      "Rash",
      "Vomiting"
    ],
    "investigations": [
      {
        "label": "Blood Test",
        "note": "NS1 অ্যান্টিজেন, IgM/IgG অ্যান্টিবডি"
      },
      {
        "label": "Platelet Count",
        "note": "প্লাটিলেট কমে যাওয়া"
      }
    ],
    "repertoryRubrics": [
      "Bone-breaking pain – Eupatorium",
      "Rash with itching – Rhus tox",
      "Aching all over – Gelsemium."
    ],
    "mainRemedies": [
      "Eupatorium perfoliatum",
      "Rhus tox",
      "Bryonia",
      "Gelsemium"
    ],
    "medicineDetails": [
      {
        "name": "Eupatorium perfoliatum",
        "symptoms": "হাড় ভাঙা ব্যথা",
        "potency": "30C, 200C",
        "priority": "1st Choice"
      },
      {
        "name": "Rhus tox",
        "symptoms": "ত্বকে র‍্যাশ বা ফুসকুড়ি, অস্থিরতা",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Bryonia",
        "symptoms": "নড়াচড়ায় ব্যথা বৃদ্ধি",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Gelsemium",
        "symptoms": "পুরো শরীরে ম্যাজ ম্যাজ ব্যথা, ক্লান্তি",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "ডেঙ্গু শক সিন্ড্রোম",
      "রক্তপাত",
      "লিভারের ক্ষতি"
    ],
    "summary": "ডেঙ্গু ভাইরাসজনিত রোগ। ইউপেটোরিয়াম প্রধান প্রতিকার।"
  },
  {
    "id": "diphtheria",
    "name": "Diphtheria",
    "banglaName": "ডিপথেরিয়া",
    "category": "Infectious",
    "section": "Section A: জ্বর ও সংক্রামক রোগ",
    "severity": "severe",
    "banglaSymptoms": [
      "গলায় ধূসর-সাদা পর্দা জমা",
      "গলা ব্যথা",
      "জ্বর",
      "শ্বাস নিতে কষ্ট",
      "কর্কশ আওয়াজ"
    ],
    "commonSymptoms": [
      "Grey-white membrane in throat",
      "Sore throat",
      "Fever",
      "Difficulty breathing",
      "Hoarse voice"
    ],
    "investigations": [
      {
        "label": "Throat Swab",
        "note": "কালচার"
      },
      {
        "label": "Schick Test",
        "note": "শিক টেস্ট"
      }
    ],
    "repertoryRubrics": [
      "Throat, membrane – Diphtherinum",
      "Swollen throat – Apis",
      "Hoarseness – Causticum."
    ],
    "mainRemedies": [
      "Diphtherinum",
      "Apis mellifica",
      "Lac caninum",
      "Mercurius cyanatus"
    ],
    "medicineDetails": [
      {
        "name": "Diphtherinum",
        "symptoms": "গলায় পর্দা জমা",
        "potency": "30C, 200C",
        "priority": "1st Choice"
      },
      {
        "name": "Apis mellifica",
        "symptoms": "গলা ফোলা, হুল ফোটানো ব্যথা",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Lac caninum",
        "symptoms": "গলা ব্যথা, পর্দা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Mercurius cyanatus",
        "symptoms": "মারাত্মক অবস্থার জন্য",
        "potency": "30C",
        "priority": "Emergency"
      }
    ],
    "emergencySigns": [
      "মায়োকার্ডাইটিস",
      "শ্বাসরোধ",
      "নিউরাইটিস"
    ],
    "summary": "করিনেব্যাকটেরিয়াম ডিপথেরিয়া ঘটিত। Diphtherinum বিশেষ।"
  },
  {
    "id": "influenza",
    "name": "Influenza / Flu",
    "banglaName": "ইনফ্লুয়েঞ্জা",
    "category": "Infectious",
    "section": "Section A: জ্বর ও সংক্রামক রোগ",
    "severity": "moderate",
    "banglaSymptoms": [
      "হঠাৎ জ্বর",
      "মাথাব্যথা",
      "গলা ব্যথা",
      "কাশি",
      "পেশি ব্যথা",
      "ক্লান্তি",
      "ঠাণ্ডা লাগা"
    ],
    "commonSymptoms": [
      "Sudden fever",
      "Headache",
      "Sore throat",
      "Cough",
      "Muscle aches",
      "Fatigue",
      "Chills"
    ],
    "investigations": [
      {
        "label": "RTPCR",
        "note": "আরটিপিসিআর বা দ্রুত এন্টিজেন টেস্ট"
      }
    ],
    "repertoryRubrics": [
      "Flu, sudden onset – Oscillococcinum",
      "Dullness, heaviness – Gelsemium",
      "Thirst with dry cough – Bryonia."
    ],
    "mainRemedies": [
      "Oscillococcinum",
      "Gelsemium",
      "Bryonia",
      "Eupatorium perfoliatum"
    ],
    "medicineDetails": [
      {
        "name": "Oscillococcinum",
        "symptoms": "হঠাৎ সর্দি জ্বরের শুরু",
        "potency": "200C",
        "priority": "1st Choice"
      },
      {
        "name": "Gelsemium",
        "symptoms": "অলসতা, ভারী ভাব, তন্দ্রাচ্ছন্ন",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Bryonia",
        "symptoms": "শুষ্ক কাশি, প্রচুর পিপাসা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Eupatorium perfoliatum",
        "symptoms": "তীব্র পেশি ও জয়েন্ট ব্যথা",
        "potency": "30C",
        "priority": "High"
      }
    ],
    "emergencySigns": [
      "নিউমোনিয়া",
      "সাইনোসাইটিস",
      "ওটিটিস মিডিয়া"
    ],
    "summary": "ইনফ্লুয়েঞ্জা ভাইরাসজনিত তীব্র অসুখ। Oscillococcinum প্রাথমিক পর্যায়ে অত্যন্ত কার্যকর।"
  },
  {
    "id": "jaundice",
    "name": "Jaundice",
    "banglaName": "জন্ডিস",
    "category": "Liver",
    "section": "Section E: পরিপাকতন্ত্র",
    "severity": "moderate",
    "banglaSymptoms": [
      "চোখ ও ত্বক হলুদ",
      "প্রস্রাব গাঢ়",
      "মল ফ্যাকাশে",
      "ক্লান্তি",
      "ক্ষুধামান্দ্য",
      "ডান পাঁজরে ব্যথা"
    ],
    "commonSymptoms": [
      "Yellow eyes and skin",
      "Dark urine",
      "Pale stool",
      "Fatigue",
      "Loss of appetite",
      "Right hypochondriac pain"
    ],
    "investigations": [
      {
        "label": "Liver Function Test",
        "note": "বিলিরুবিন, এসজিপিটি, এসজিওটি"
      },
      {
        "label": "Viral Markers",
        "note": "HAV, HBV ইত্যাদি"
      }
    ],
    "repertoryRubrics": [
      "Jaundice – Chelidonium",
      "Right hypochondriac pain – Carduus mar.",
      "Liver enlarged – Lycopodium."
    ],
    "mainRemedies": [
      "Chelidonium majus",
      "Lycopodium",
      "Carduus marianus",
      "Nux vomica"
    ],
    "medicineDetails": [
      {
        "name": "Chelidonium majus",
        "symptoms": "চোখ-ত্বক হলুদ, ডান পাঁজরে ব্যথা",
        "potency": "30C, 200C",
        "priority": "1st Choice"
      },
      {
        "name": "Lycopodium",
        "symptoms": "লিভার বৃদ্ধি, বিকেলে বাড়ে",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Carduus marianus",
        "symptoms": "ডান পাঁজরে তীব্র ব্যথা",
        "potency": "Q, 30C",
        "priority": "High"
      },
      {
        "name": "Nux vomica",
        "symptoms": "ক্ষুধামান্দ্য, কোষ্ঠকাঠিন্য",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "লিভার সিরোসিস",
      "লিভার ফেইলিওর",
      "হেপাটিক এনসেফালোপ্যাথি"
    ],
    "summary": "লিভারের বিভিন্ন রোগের লক্ষণ। Chelidonium প্রধান ওষুধ।"
  },
  {
    "id": "malaria",
    "name": "Malaria",
    "banglaName": "ম্যালেরিয়া",
    "category": "Infectious",
    "section": "Section A: জ্বর ও সংক্রামক রোগ",
    "severity": "severe",
    "banglaSymptoms": [
      "পর্যায়ক্রমিক ঠাণ্ডা ও কাঁপুনি",
      "উচ্চ জ্বর (১০২-১০৪°F)",
      "প্রচুর ঘাম",
      "মাথাব্যথা",
      "বমি",
      "প্লীহা বড় হওয়া"
    ],
    "commonSymptoms": [
      "Intermittent cold and shivering",
      "High fever (102-104°F)",
      "Profuse sweating",
      "Headache",
      "Vomiting",
      "Enlarged spleen"
    ],
    "investigations": [
      {
        "label": "Blood Microscopy",
        "note": "প্লাজমোডিয়াম"
      },
      {
        "label": "RDT",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Intermittent fever – China",
      "Chill with thirst – Ars",
      "Bone pain – Eupatorium."
    ],
    "mainRemedies": [
      "China officinalis",
      "Arsenicum album",
      "Eupatorium perfoliatum",
      "Nux vomica"
    ],
    "medicineDetails": [
      {
        "name": "China officinalis",
        "symptoms": "পর্যায়ক্রমিক জ্বর, ঘাম, দুর্বলতা",
        "potency": "30C, 200C",
        "priority": "1st Choice"
      },
      {
        "name": "Arsenicum album",
        "symptoms": "পিপাসা সহ কাঁপুনি, অস্থিরতা",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Eupatorium perfoliatum",
        "symptoms": "মারাত্মক হাড়ভাঙা ব্যথা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Nux vomica",
        "symptoms": "ज্বর, বমি ভাব",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "সেরিব্রাল ম্যালেরিয়া",
      "রক্তাল্পতা",
      "ব্ল্যাক ওয়াটার ফিভার"
    ],
    "summary": "প্লাজমোডিয়াম পরজীবী ঘটিত। China ও Ars প্রধান।"
  },
  {
    "id": "pneumonia",
    "name": "Pneumonia",
    "banglaName": "নিউমোনিয়া",
    "category": "Respiratory",
    "section": "Section C: শ্বাসতন্ত্রের রোগ",
    "severity": "severe",
    "banglaSymptoms": [
      "তীব্র জ্বর",
      "কাঁপুনি",
      "মরিচা রঙের কফ",
      "বুক ব্যথা",
      "দ্রুত শ্বাস",
      "শ্বাসকষ্ট"
    ],
    "commonSymptoms": [
      "High fever",
      "Chills",
      "Rusty sputum",
      "Chest pain",
      "Rapid breathing",
      "Dyspnea"
    ],
    "investigations": [
      {
        "label": "Chest X-ray",
        "note": "অস্বাভাবিকতা"
      },
      {
        "label": "Physical Exam",
        "note": "ক্রেপিটেশন"
      },
      {
        "label": "Blood Culture",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Rusty sputum – Phosphorus",
      "Stitching pain worse by motion – Bryonia",
      "Night aggravation – Sulphur."
    ],
    "mainRemedies": [
      "Phosphorus",
      "Bryonia",
      "Sulphur",
      "Hepar sulph"
    ],
    "medicineDetails": [
      {
        "name": "Phosphorus",
        "symptoms": "মরিচা রঙের কফ, শ্বাসকষ্ট",
        "potency": "30C, 200C",
        "priority": "1st Choice"
      },
      {
        "name": "Bryonia",
        "symptoms": "নড়াচড়ায় বুকে তীব্র ব্যথা",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Sulphur",
        "symptoms": "রাতে রোগ বৃদ্ধি, গরম বোধ",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Hepar sulph",
        "symptoms": "পুঁজযুক্ত কফ",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "প্লুরাল ইফিউশন",
      "ফুসফুসের ফোড়া",
      "সেপসিস"
    ],
    "summary": "ফুসফুসের প্রদাহ। Phosphorus ও Bryonia শীর্ষ ওষুধ।"
  },
  {
    "id": "plague",
    "name": "Plague",
    "banglaName": "প্লেগ (ঐতিহাসিক)",
    "category": "Infectious",
    "section": "Section A: জ্বর ও সংক্রামক রোগ",
    "severity": "severe",
    "banglaSymptoms": [
      "হঠাৎ উচ্চ জ্বর",
      "লসিকা গ্রন্থি ফুলে যাওয়া (বুবো)",
      "মাথাব্যথা",
      "রক্তাক্ত কফ",
      "শক"
    ],
    "commonSymptoms": [
      "Sudden high fever",
      "Swollen lymph nodes (Bubo)",
      "Headache",
      "Bloody sputum",
      "Shock"
    ],
    "investigations": [
      {
        "label": "Bubo Aspiration",
        "note": "কালচার"
      },
      {
        "label": "Blood Culture",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Plague, bubo – Plagueinum",
      "Septicemia – Arsenicum",
      "Haemorrhagic – Lachesis."
    ],
    "mainRemedies": [
      "Plagueinum",
      "Arsenicum album",
      "Rhus tox",
      "Lachesis"
    ],
    "medicineDetails": [
      {
        "name": "Plagueinum",
        "symptoms": "বুবো, লসিকা গ্রন্থি ফোলা",
        "potency": "30C, 200C",
        "priority": "1st Choice"
      },
      {
        "name": "Arsenicum album",
        "symptoms": "সেপ্টিসেমিয়া, তীব্র অস্থিরতা",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Lachesis",
        "symptoms": "হেমোরেজিক বা রক্তক্ষরণ",
        "potency": "30C",
        "priority": "High"
      }
    ],
    "emergencySigns": [
      "সেপ্টিসেমিয়া",
      "নিউমোনিক প্লেগ",
      "প্রাণঘাতী শক"
    ],
    "summary": "ইয়েরসিনিয়া পেস্টিস ঘটিত মারণ রোগ। Plagueinum প্রতিকার বিশেষ।"
  },
  {
    "id": "polio",
    "name": "Polio",
    "banglaName": "পোলিও",
    "category": "Neurological",
    "section": "Section D: স্নায়ুতন্ত্র ও মানসিক",
    "severity": "severe",
    "banglaSymptoms": [
      "জ্বর",
      "গলা ব্যথা",
      "মাথাব্যথা",
      "পেশি দুর্বলতা",
      "ফ্ল্যাসিড প্যারালাইসিস",
      "অঙ্গ অবশ হয়ে যাওয়া"
    ],
    "commonSymptoms": [
      "Fever",
      "Sore throat",
      "Headache",
      "Muscle weakness",
      "Flaccid paralysis",
      "Limb numbness"
    ],
    "investigations": [
      {
        "label": "Serology",
        "note": ""
      },
      {
        "label": "Virus Isolation",
        "note": "স্টুল বা গলার সোয়াব থেকে"
      }
    ],
    "repertoryRubrics": [
      "Paralysis after fever – Lathyrus",
      "Progressive weakness – Causticum",
      "Trembling – Gelsemium."
    ],
    "mainRemedies": [
      "Lathyrus sativus",
      "Gelsemium",
      "Causticum",
      "Plumbum met"
    ],
    "medicineDetails": [
      {
        "name": "Lathyrus sativus",
        "symptoms": "জ্বরের পর প্যারালাইসিস",
        "potency": "30C, 200C",
        "priority": "1st Choice"
      },
      {
        "name": "Causticum",
        "symptoms": "ক্রমান্বয়ে দুর্বলতা, প্যারালাইসিস",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Gelsemium",
        "symptoms": "পেশি কাঁপুনি, দুর্বলতা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Plumbum met",
        "symptoms": "পেশি শুকিয়ে যাওয়া",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "আজীবন প্যারালাইসিস",
      "শ্বাসযন্ত্রের পেশি প্যারালাইসিস"
    ],
    "summary": "পোলিও ভাইরাসজনিত। Lathyrus sativus বিশেষ সুনাম।"
  },
  {
    "id": "anaemia",
    "name": "Anaemia",
    "banglaName": "রক্তাল্পতা",
    "category": "Blood",
    "section": "Section B: হৃদরোগ ও সংবহনতন্ত্র",
    "severity": "moderate",
    "banglaSymptoms": [
      "ক্লান্তি",
      "ফ্যাকাশে ভাব",
      "মাথা ঘোরা",
      "শ্বাসকষ্ট",
      "ধড়ফড়",
      "হাত-পা ঠাণ্ডা"
    ],
    "commonSymptoms": [
      "Fatigue",
      "Paleness",
      "Dizziness",
      "Shortness of breath",
      "Palpitations",
      "Cold extremities"
    ],
    "investigations": [
      {
        "label": "Blood Test",
        "note": "হিমোগ্লোবিন, আরবিসি সূচক, ফেরিটিন"
      }
    ],
    "repertoryRubrics": [
      "Anaemia, iron deficiency – Ferrum",
      "After haemorrhage – China",
      "Chlorosis – Pulsatilla."
    ],
    "mainRemedies": [
      "Ferrum met",
      "China",
      "Pulsatilla",
      "Calcarea phos"
    ],
    "medicineDetails": [
      {
        "name": "Ferrum met",
        "symptoms": "আয়রনের ঘাটতি, মুখ ফ্যাকাশে",
        "potency": "30C, 200C",
        "priority": "1st Choice"
      },
      {
        "name": "China",
        "symptoms": "রক্তক্ষরণের পর দুর্বলতা",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Pulsatilla",
        "symptoms": "ক্লোরোসিস, ঠাণ্ডা বাতাস চায়",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Calcarea phos",
        "symptoms": "অপুষ্টিজনিত রক্তাল্পতা",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "হার্ট ফেইলিওর",
      "অপুষ্টি",
      "অক্সিজেন পরিবহনে ব্যাঘাত"
    ],
    "summary": "রক্তস্বল্পতা। Ferrum met ও China প্রধান।"
  },
  {
    "id": "common-cold",
    "name": "Common Cold",
    "banglaName": "সর্দি-কাশি",
    "category": "Respiratory",
    "section": "Section C: শ্বাসতন্ত্রের রোগ",
    "severity": "mild",
    "banglaSymptoms": [
      "নাক দিয়ে পানি পড়া",
      "হাঁচি",
      "গলা ব্যথা",
      "হালকা জ্বর",
      "মাথাব্যথা",
      "ক্লান্তি"
    ],
    "commonSymptoms": [
      "Runny nose",
      "Sneezing",
      "Sore throat",
      "Low-grade fever",
      "Headache",
      "Fatigue"
    ],
    "investigations": [],
    "repertoryRubrics": [
      "Acrid discharge – Allium cepa",
      "Violent sneezing – Aconite",
      "Bland discharge with eye irritation – Euphrasia."
    ],
    "mainRemedies": [
      "Allium cepa",
      "Aconite",
      "Euphrasia",
      "Gelsemium"
    ],
    "medicineDetails": [
      {
        "name": "Allium cepa",
        "symptoms": "নাক দিয়ে জ্বালাকর পানি ঝরা, চোখে সাধারণ পানি",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Aconite",
        "symptoms": "ঠাণ্ডা লেগে হঠাৎ শুরু, বারবার হাঁচি",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Euphrasia",
        "symptoms": "চোখ থেকে জ্বালাকর পানি, নাক দিয়ে সাধারণ পানি",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Gelsemium",
        "symptoms": "ক্লান্তি ও দুর্বলতা সহ সর্দি",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "সাইনোসাইটিস",
      "ওটিটিস মিডিয়া",
      "ব্রংকাইটিস"
    ],
    "summary": "ভাইরাসজনিত সাধারণ ঠাণ্ডা। Allium cepa ও Aconite প্রথম সারি।"
  },
  {
    "id": "typhoid-fever",
    "name": "Typhoid Fever",
    "banglaName": "টাইফয়েড জ্বর",
    "category": "Infectious",
    "section": "Section A: জ্বর ও সংক্রামক রোগ",
    "severity": "severe",
    "banglaSymptoms": [
      "ক্রমান্বয়ে ধাপে ধাপে জ্বর (step-ladder)",
      "মাথাব্যথা",
      "গোলাপি র্যাশ",
      "পেট ফাঁপা",
      "মলবদ্ধতা বা ডায়রিয়া",
      "দুর্বলতা"
    ],
    "commonSymptoms": [
      "Step-ladder fever",
      "Headache",
      "Rose spots",
      "Bloating",
      "Constipation or Diarrhoea",
      "Weakness"
    ],
    "investigations": [
      {
        "label": "Widal Test",
        "note": ""
      },
      {
        "label": "Typhidot",
        "note": ""
      },
      {
        "label": "Blood Culture",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Typhoid, stupor – Baptisia",
      "Dry tongue with thirst – Bryonia",
      "Restlessness – Arsenicum."
    ],
    "mainRemedies": [
      "Baptisia tinctoria",
      "Bryonia",
      "Rhus tox",
      "Arsenicum album"
    ],
    "medicineDetails": [
      {
        "name": "Baptisia tinctoria",
        "symptoms": "তন্দ্রাচ্ছন্নতা, দুর্গন্ধযুক্ত মল",
        "potency": "30C, 200C",
        "priority": "1st Choice"
      },
      {
        "name": "Bryonia",
        "symptoms": "শুষ্ক জিহ্বা, পিপাসা, নড়াচড়ায় কষ্ট",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Arsenicum album",
        "symptoms": "অস্থিরতা, দুর্বলতা, ডায়রিয়া",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Rhus tox",
        "symptoms": "জিহ্বার ডগা লাল, অস্থিরতা",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "আন্ত্রিক রক্তক্ষরণ",
      "অন্ত্রছিদ্র",
      "পেরিটোনাইটিস"
    ],
    "summary": "স্যালমোনেলা টাইফি ঘটিত। Baptisia অত্যন্ত কার্যকর।"
  },
  {
    "id": "whooping-cough",
    "name": "Whooping Cough",
    "banglaName": "হুপিং কাশি",
    "category": "Respiratory",
    "section": "Section C: শ্বাসতন্ত্রের রোগ",
    "severity": "moderate",
    "banglaSymptoms": [
      "হুপ শব্দ সহ কাশি (প্যারোক্সিসমাল)",
      "কাশির পর শ্বাস নিতে হাঁপ",
      "রাতে বেশি",
      "বমি"
    ],
    "commonSymptoms": [
      "Paroxysmal cough with whoop",
      "Gasping for breath after coughing",
      "Worse at night",
      "Vomiting"
    ],
    "investigations": [
      {
        "label": "Nasopharyngeal Culture",
        "note": ""
      },
      {
        "label": "PCR",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Whooping cough – Drosera",
      "Haemorrhagic stage – Coccus",
      "Spasmodic cough – Pertussinum."
    ],
    "mainRemedies": [
      "Drosera",
      "Pertussinum",
      "Coccus cacti",
      "Corallium rubrum"
    ],
    "medicineDetails": [
      {
        "name": "Drosera",
        "symptoms": "আক্ষেপিক কাশি, রাত ১২টার পর বৃদ্ধি",
        "potency": "30C, 200C",
        "priority": "1st Choice"
      },
      {
        "name": "Pertussinum",
        "symptoms": "আক্ষেপিক কাশি",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Coccus cacti",
        "symptoms": "কাশির শেষে সুতোর মত কফ",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Corallium rubrum",
        "symptoms": "অতি দ্রুত কাশি",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "নিউমোনিয়া",
      "মস্তিষ্কের ক্ষতি (হাইপক্সিয়া)",
      "ব্রংকাইটিস"
    ],
    "summary": "বর্ডেটেলা পারটুসিস সংক্রমণ। Drosera ও Pertussinum প্রধান।"
  },
  {
    "id": "gonorrhoea",
    "name": "Gonorrhoea",
    "banglaName": "গনোরিয়া",
    "category": "Urinary",
    "section": "Section J: মূত্রতন্ত্র",
    "severity": "moderate",
    "banglaSymptoms": [
      "মূত্রনালি থেকে পুঁজ স্রাব",
      "প্রস্রাবে জ্বালাপোড়া",
      "ব্যথা",
      "পুরুষের মূত্রনালি ফুলে যাওয়া",
      "মহিলায় যোনি স্রাব"
    ],
    "commonSymptoms": [
      "Purulent urethral discharge",
      "Burning micturition",
      "Pain",
      "Urethral swelling in men",
      "Vaginal discharge"
    ],
    "investigations": [
      {
        "label": "Gram Stain & Culture",
        "note": ""
      },
      {
        "label": "Nucleic Acid Amplification",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Urethritis, burning – Cantharis",
      "Thick discharge – Medorrhinum",
      "Yellow green discharge – Pulsatilla."
    ],
    "mainRemedies": [
      "Medorrhinum",
      "Cantharis",
      "Pulsatilla",
      "Sepia"
    ],
    "medicineDetails": [
      {
        "name": "Medorrhinum",
        "symptoms": "ঘন হলুদ বা সবুজ পুঁজ",
        "potency": "200C, 1M",
        "priority": "1st Choice"
      },
      {
        "name": "Cantharis",
        "symptoms": "প্রস্রাবে তীব্র জ্বালাপোড়া",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Pulsatilla",
        "symptoms": "হলুদ-সবুজ স্রাব, ব্যথাহীন বা পরিবর্তনশীল",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Sepia",
        "symptoms": "দীর্ঘস্থায়ী যোনি স্রাব",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "পেলভিক ইনফ্লামেটরি ডিজিজ",
      "বন্ধ্যাত্ব",
      "স্ট্রিকচার"
    ],
    "summary": "নাইসেরিয়া গনোরিয়া সংক্রমণ। Medorrhinum নসোড।"
  },
  {
    "id": "diarrhoea",
    "name": "Diarrhoea - Acute",
    "banglaName": "ডায়রিয়া",
    "category": "Gastrointestinal",
    "section": "Section E: পরিপাকতন্ত্র",
    "severity": "moderate",
    "banglaSymptoms": [
      "ঘন ঘন পাতলা পায়খানা",
      "পেট ব্যথা",
      "বমি বমি ভাব",
      "জ্বর হতে পারে",
      "দুর্বলতা"
    ],
    "commonSymptoms": [
      "Frequent watery stool",
      "Abdominal pain",
      "Nausea",
      "May have fever",
      "Weakness"
    ],
    "investigations": [
      {
        "label": "Stool Test",
        "note": "রুটিন/কালচার"
      }
    ],
    "repertoryRubrics": [
      "Diarrhoea, watery – Ars",
      "Morning diarrhoea – Podophyllum",
      "Profuse with collapse – Veratrum."
    ],
    "mainRemedies": [
      "Arsenicum album",
      "Podophyllum",
      "Veratrum album",
      "China"
    ],
    "medicineDetails": [
      {
        "name": "Arsenicum album",
        "symptoms": "জলবৎ পাতলা পায়খানা, তীব্র দুর্বলতা",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Podophyllum",
        "symptoms": "সকালে পাতলা পায়খানা, প্রচুর দুর্গন্ধ",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Veratrum album",
        "symptoms": "প্রচুর পায়খানা ও বমি, কলাপ্স অবস্থা",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "China",
        "symptoms": "পায়খানার পর দুর্বলতা ও গ্যাস",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "ডিহাইড্রেশন",
      "ইলেক্ট্রোলাইট ইমব্যালেন্স",
      "রেনাল ফেইলিওর"
    ],
    "summary": "বিভিন্ন কারণে ডায়রিয়া। Arsenicum ও Podophyllum সহায়ক।"
  },
  {
    "id": "liver-abscess",
    "name": "Liver Abscess",
    "banglaName": "লিভার অ্যাবসেস",
    "category": "Liver",
    "section": "Section E: পরিপাকতন্ত্র",
    "severity": "severe",
    "banglaSymptoms": [
      "ডান পাঁজরের নিচে ব্যথা",
      "জ্বর",
      "কাঁপুনি",
      "বমি",
      "জন্ডিস",
      "ওজন কমা"
    ],
    "commonSymptoms": [
      "Pain under right ribs",
      "Fever",
      "Chills",
      "Vomiting",
      "Jaundice",
      "Weight loss"
    ],
    "investigations": [
      {
        "label": "Ultrasound",
        "note": ""
      },
      {
        "label": "CT Scan",
        "note": ""
      },
      {
        "label": "Blood Culture",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Liver abscess – Chelidonium",
      "Pus formation – Hepar sulph",
      "Draining sinus – Silicea."
    ],
    "mainRemedies": [
      "Chelidonium",
      "Calcarea sulphurica",
      "Silicea",
      "Hepar sulph"
    ],
    "medicineDetails": [
      {
        "name": "Chelidonium",
        "symptoms": "ডান দিকের পাঁজরে ব্যথা, জন্ডিস",
        "potency": "30C, 200C",
        "priority": "1st Choice"
      },
      {
        "name": "Hepar sulph",
        "symptoms": "পুঁজ তৈরি হওয়া রোধ করতে বা শুকাতে",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Silicea",
        "symptoms": "পুঁজ নির্গত হওয়া সহজ করতে",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Calcarea sulphurica",
        "symptoms": "পুঁজ ক্রমাগত নির্গত হলে",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "পেরিটোনাইটিস",
      "সেপসিস",
      "ডায়াফ্রামের নিচে ছড়ানো"
    ],
    "summary": "লিভারে পুঁজ জমা। Chelidonium ও Hepar sulph প্রধান।"
  },
  {
    "id": "peritonitis",
    "name": "Peritonitis",
    "banglaName": "পেরিটোনাইটিস",
    "category": "Gastrointestinal",
    "section": "Section E: পরিপাকতন্ত্র",
    "severity": "severe",
    "banglaSymptoms": [
      "প্রচণ্ড পেট ব্যথা",
      "পেট ফুলে যাওয়া",
      "জ্বর",
      "বমি",
      "কোমলতা",
      "রোগী শুয়ে নড়তে চায় না"
    ],
    "commonSymptoms": [
      "Severe abdominal pain",
      "Abdominal swelling",
      "Fever",
      "Vomiting",
      "Tenderness",
      "Patient lies perfectly still"
    ],
    "investigations": [
      {
        "label": "Paracentesis",
        "note": ""
      },
      {
        "label": "Blood Test",
        "note": ""
      },
      {
        "label": "CT Scan",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Peritonitis, acute – Aconite",
      "Stitching pain – Belladonna",
      "Stabbing pain – Colocynthis."
    ],
    "mainRemedies": [
      "Aconite",
      "Belladonna",
      "Apis mellifica",
      "Colocynthis",
      "Arsenicum album"
    ],
    "medicineDetails": [
      {
        "name": "Aconite",
        "symptoms": "প্রাথমিক পর্যায়, রোগী অস্থির",
        "potency": "30C",
        "priority": "Emergency"
      },
      {
        "name": "Belladonna",
        "symptoms": "তীব্র সুঁই ফোটার মত ব্যথা",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Colocynthis",
        "symptoms": "তীব্র মোচড়ানো ব্যথা, চাপ দিলে আরাম",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Apis mellifica",
        "symptoms": "পেট ফোলা, হুল ফোটানো ব্যথা",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "সেপটিক শক",
      "আন্ত্রিক বাধা",
      "মৃত্যু"
    ],
    "summary": "পেরিটোনিয়ামের প্রদাহ। দ্রুত হোমিওপ্যাথিক মূল্যায়ন প্রয়োজন।"
  },
  {
    "id": "pyelonephritis",
    "name": "Pyelonephritis",
    "banglaName": "পাইলোনেফ্রাইটিস",
    "category": "Urinary",
    "section": "Section J: মূত্রতন্ত্র",
    "severity": "moderate",
    "banglaSymptoms": [
      "জ্বর",
      "কাঁপুনি",
      "কোমর ব্যথা",
      "প্রস্রাবে জ্বালা",
      "ঘন ঘন প্রস্রাব",
      "বমি বমি ভাব"
    ],
    "commonSymptoms": [
      "Fever",
      "Chills",
      "Flank pain",
      "Burning urination",
      "Frequent urination",
      "Nausea"
    ],
    "investigations": [
      {
        "label": "Urine Test",
        "note": "পাইউরিয়া"
      },
      {
        "label": "Culture",
        "note": ""
      },
      {
        "label": "Ultrasound",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Burning urine – Cantharis",
      "Pain in kidney region – Berberis",
      "Chill with fever – Eupatorium."
    ],
    "mainRemedies": [
      "Cantharis",
      "Berberis vulgaris",
      "Apis",
      "Eupatorium perfoliatum"
    ],
    "medicineDetails": [
      {
        "name": "Cantharis",
        "symptoms": "তীব্র প্রস্রাবে জ্বালাপোড়া ও কোঁথানি",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Berberis vulgaris",
        "symptoms": "কিডনি অঞ্চলে ব্যথা যা নিচে নামে",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Apis",
        "symptoms": "হুল ফোটানো ব্যথা প্রস্রাব কম",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Eupatorium perfoliatum",
        "symptoms": "জ্বর ও কাঁপুনি",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "ক্রনিক কিডনি ডিজিজ",
      "সেপসিস",
      "রেনাল অ্যাবসেস"
    ],
    "summary": "কিডনির ব্যাকটেরিয়া সংক্রমণ। Cantharis ও Berberis গুরুত্বপূর্ণ।"
  },
  {
    "id": "rheumatic-fever",
    "name": "Rheumatic Fever",
    "banglaName": "রিউম্যাটিক জ্বর",
    "category": "Immune",
    "section": "Section A: জ্বর ও সংক্রামক রোগ",
    "severity": "severe",
    "banglaSymptoms": [
      "জ্বর",
      "বড় জয়েন্টে ব্যথা ও ফোলা",
      "ত্বকে লাল দাগ",
      "নাক দিয়ে রক্ত",
      "হৃদপিণ্ডে ব্যথা (কার্ডাইটিস)"
    ],
    "commonSymptoms": [
      "Fever",
      "Large joint pain and swelling",
      "Red skin patches",
      "Nosebleeds",
      "Heart pain (Carditis)"
    ],
    "investigations": [
      {
        "label": "Jones Criteria",
        "note": ""
      },
      {
        "label": "Blood Tests",
        "note": "স্ট্রেপ্টোকক্কাস অ্যান্টিবডি, ইএসআর, সিআরপি"
      }
    ],
    "repertoryRubrics": [
      "Rheumatic fever, joints – Rhus tox",
      "Worse in cold – Ledum",
      "Pain spreads downward – Kalmia."
    ],
    "mainRemedies": [
      "Rhus tox",
      "Bryonia",
      "Ledum pal",
      "Kalmia latifolia"
    ],
    "medicineDetails": [
      {
        "name": "Rhus tox",
        "symptoms": "জয়েন্টে ব্যথা, নড়াচড়ায় আরাম",
        "potency": "30C, 200C",
        "priority": "1st Choice"
      },
      {
        "name": "Kalmia latifolia",
        "symptoms": "ব্যথা উপর থেকে নিচে নামে, হৃদপিণ্ড আক্রান্ত",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Bryonia",
        "symptoms": "নড়াচড়ায় তীব্র ব্যথা",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Ledum pal",
        "symptoms": "ঠাণ্ডায় আরাম, ব্যথা নিচে থেকে উপরে ওঠে",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "রিউম্যাটিক হার্ট ডিজিজ (মাইট্রাল স্টেনোসিস)",
      "এন্ডোকার্ডাইটিস"
    ],
    "summary": "গ্রুপ এ স্ট্রেপ্টোকক্কাস সংক্রমণের পরবর্তী জটিলতা। Rhus tox ও Kalmia প্রধান।"
  },
  {
    "id": "sinusitis",
    "name": "Sinusitis",
    "banglaName": "সাইনোসাইটিস",
    "category": "Respiratory",
    "section": "Section C: শ্বাসতন্ত্রের রোগ",
    "severity": "mild",
    "banglaSymptoms": [
      "কপাল ও মুখে ব্যথা",
      "নাক বন্ধ",
      "ঘন স্রাব",
      "মাথাব্যথা",
      "গলা ব্যথা",
      "জ্বর"
    ],
    "commonSymptoms": [
      "Forehead & facial pain",
      "Nasal congestion",
      "Thick discharge",
      "Headache",
      "Sore throat",
      "Fever"
    ],
    "investigations": [
      {
        "label": "Clinical Exam",
        "note": ""
      },
      {
        "label": "X-ray or CT Scan",
        "note": "সাইনাসের অবস্থা"
      }
    ],
    "repertoryRubrics": [
      "Thick, ropy discharge – Kali bi.",
      "Pressure pain – Silicea",
      "Bland discharge – Pulsatilla."
    ],
    "mainRemedies": [
      "Kali bichromicum",
      "Silicea",
      "Pulsatilla",
      "Hepar sulph"
    ],
    "medicineDetails": [
      {
        "name": "Kali bichromicum",
        "symptoms": "ঘন আঠালো স্রাব, একটি নির্দিষ্ট বিন্দুতে ব্যথা",
        "potency": "30C, 200C",
        "priority": "1st Choice"
      },
      {
        "name": "Silicea",
        "symptoms": "মাথাব্যথা, চাপে আরাম, ক্রনিক সাইনোসাইটিস",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Pulsatilla",
        "symptoms": "হলুদাভ স্রাব, মুক্ত বায়ুতে আরাম",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Hepar sulph",
        "symptoms": "ঠাণ্ডায় অত্যন্ত স্পর্শকাতর",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "ক্রনিক সাইনোসাইটিস",
      "অরবিটাল সেলুলাইটিস",
      "মেনিনজাইটিস"
    ],
    "summary": "সাইনাসের প্রদাহ। Kali bich. ও Silicea কার্যকর।"
  },
  {
    "id": "tonsillitis",
    "name": "Tonsillitis",
    "banglaName": "টনসিলাইটিস",
    "category": "Respiratory",
    "section": "Section C: শ্বাসতন্ত্রের রোগ",
    "severity": "moderate",
    "banglaSymptoms": [
      "গলা ব্যথা",
      "টনসিল ফোলা ও লাল",
      "গিলতে কষ্ট",
      "জ্বর",
      "কণ্ঠস্বরে পরিবর্তন"
    ],
    "commonSymptoms": [
      "Sore throat",
      "Swollen red tonsils",
      "Difficulty swallowing",
      "Fever",
      "Voice change"
    ],
    "investigations": [
      {
        "label": "Direct Exam",
        "note": "গলার টেস্ট"
      },
      {
        "label": "Rapid Test",
        "note": "স্ট্রেপ্টোকক্কাস র্যাপিড টেস্ট"
      }
    ],
    "repertoryRubrics": [
      "Throat, tonsillitis – Bell.",
      "Ulcerated – Merc.",
      "Splinter-like pain – Hepar."
    ],
    "mainRemedies": [
      "Belladonna",
      "Mercurius solubilis",
      "Hepar sulph",
      "Lachesis"
    ],
    "medicineDetails": [
      {
        "name": "Belladonna",
        "symptoms": "প্রাথমিক পর্যায়, লাল, ফোলা, তীব্র ব্যথা",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Mercurius solubilis",
        "symptoms": "মুখে দুর্গন্ধ, লালা ঝরা, ঘাম",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Hepar sulph",
        "symptoms": "গলায় কাঁটা ফোটার মত ব্যথা, পুঁজ",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Lachesis",
        "symptoms": "বাম দিকের টনসিলে প্রদাহ زیادہ",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "পেরিটনসিলার অ্যাবসেস",
      "রিউম্যাটিক জ্বর",
      "গ্লোমেরুলোনেফ্রাইটিস"
    ],
    "summary": "টনসিলের প্রদাহ। Belladonna প্রাথমিক পর্যায়ে উত্তম।"
  },
  {
    "id": "uti",
    "name": "Urinary Tract Infection",
    "banglaName": "মূত্রনালির সংক্রমণ (UTI)",
    "category": "Urinary",
    "section": "Section J: মূত্রতন্ত্র",
    "severity": "moderate",
    "banglaSymptoms": [
      "প্রস্রাবে জ্বালাপোড়া",
      "ঘন ঘন প্রস্রাব",
      "পেটের নিচে ব্যথা",
      "প্রস্রাবে রক্ত",
      "জ্বর থাকতে পারে"
    ],
    "commonSymptoms": [
      "Burning urination",
      "Frequent urination",
      "Lower abdominal pain",
      "Blood in urine",
      "Possible fever"
    ],
    "investigations": [
      {
        "label": "Urine Routine",
        "note": ""
      },
      {
        "label": "Culture",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Burning urine – Cantharis",
      "Scanty urine – Apis",
      "After catheter – Staphysagria."
    ],
    "mainRemedies": [
      "Cantharis",
      "Apis mellifica",
      "Staphysagria",
      "Berberis vulgaris"
    ],
    "medicineDetails": [
      {
        "name": "Cantharis",
        "symptoms": "তীব্র জ্বালাপোড়া, ফোঁটায় ফোঁটায় প্রস্রাব",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Apis mellifica",
        "symptoms": "হুল ফোটানো ব্যথা, প্রস্রাব কম",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Staphysagria",
        "symptoms": "ক্যাথেটার বা সহবাসের পর UTI",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Berberis vulgaris",
        "symptoms": "কোমর থেকে বিকিরিত ব্যথা",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "পাইলোনেফ্রাইটিস",
      "সেপসিস",
      "ক্রনিক কিডনি রোগ"
    ],
    "summary": "ই. কোলাই প্রধান কারণ। Cantharis ও Apis গুরুত্বপূর্ণ।"
  },
  {
    "id": "viral-hepatitis",
    "name": "Viral Hepatitis (A, B, E)",
    "banglaName": "ভাইরাল হেপাটাইটিস",
    "category": "Liver",
    "section": "Section E: পরিপাকতন্ত্র",
    "severity": "moderate",
    "banglaSymptoms": [
      "জন্ডিস",
      "ক্লান্তি",
      "বমি বমি ভাব",
      "ক্ষুধামান্দ্য",
      "গাঢ় প্রস্রাব",
      "ডান পাঁজরে ব্যথা"
    ],
    "commonSymptoms": [
      "Jaundice",
      "Fatigue",
      "Nausea",
      "Loss of appetite",
      "Dark urine",
      "Right subcostal pain"
    ],
    "investigations": [
      {
        "label": "Serology",
        "note": "IgM anti-HAV, HBsAg ইত্যাদি"
      },
      {
        "label": "Liver Function Test",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Hepatitis – Chelidonium",
      "Liver enlarged – Lycopodium",
      "Fatty liver – Phosphorus."
    ],
    "mainRemedies": [
      "Chelidonium",
      "Lycopodium",
      "Phosphorus",
      "Myristica sebifera"
    ],
    "medicineDetails": [
      {
        "name": "Chelidonium",
        "symptoms": "প্রধান ওষুধ, চোখ হলুদ, কোষ্ঠকাঠিন্য",
        "potency": "30C, 200C",
        "priority": "1st Choice"
      },
      {
        "name": "Lycopodium",
        "symptoms": "লিভার বৃদ্ধি, হজমে সমস্যা",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Phosphorus",
        "symptoms": "ফ্যাটি লিভার, দুর্বলতা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Myristica sebifera",
        "symptoms": "দ্রুত পুনরুদ্ধারে সহায়ক",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "ফুলমিন্যান্ট হেপাটাইটিস",
      "সিরোসিস",
      "লিভার ক্যান্সার"
    ],
    "summary": "ভাইরাসজনিত লিভারের প্রদাহ। Chelidonium প্রধান।"
  },
  {
    "id": "tuberculosis",
    "name": "Tuberculosis (Pulmonary)",
    "banglaName": "যক্ষ্মা",
    "category": "Respiratory",
    "section": "Section C: শ্বাসতন্ত্রের রোগ",
    "severity": "severe",
    "banglaSymptoms": [
      "দীর্ঘদিনের কাশি",
      "রক্তমিশ্রিত কফ",
      "রাতের ঘাম",
      "ওজন কমা",
      "জ্বর",
      "ক্লান্তি"
    ],
    "commonSymptoms": [
      "Persistent cough",
      "Blood-tinged sputum",
      "Night sweats",
      "Weight loss",
      "Fever",
      "Fatigue"
    ],
    "investigations": [
      {
        "label": "Chest X-ray",
        "note": ""
      },
      {
        "label": "Sputum test",
        "note": "এবি স্মিয়ার/কালচার"
      },
      {
        "label": "GeneXpert",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Tuberculosis – Tuberculinum",
      "Night sweat – Stannum",
      "Hemoptysis – Phosphorus."
    ],
    "mainRemedies": [
      "Tuberculinum",
      "Stannum met",
      "Phosphorus",
      "Bacillinum"
    ],
    "medicineDetails": [
      {
        "name": "Tuberculinum",
        "symptoms": "পরিবারে টিবির ইতিহাস বা প্রবণতা",
        "potency": "200C, 1M",
        "priority": "1st Choice"
      },
      {
        "name": "Stannum met",
        "symptoms": "প্রচুর রাতের ঘাম, তীব্র দুর্বলতা",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Phosphorus",
        "symptoms": "রক্তবমি বা রক্তমিশ্রিত কফ",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Bacillinum",
        "symptoms": "টিবির মতো কাশি, বয়স্ক রোগীদের ক্ষেত্রেও",
        "potency": "200C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "প্লুরাল ইফিউশন",
      "মাইলিয়ারি টিবি",
      "পট্টের রোগ"
    ],
    "summary": "মাইকোব্যাকটেরিয়াম টিউবারকুলোসিস। Tuberculinum ও Bacillinum নসোড।"
  },
  {
    "id": "allergic-rhinitis",
    "name": "Allergic Rhinitis (Hay Fever)",
    "banglaName": "এলার্জিক রাইনাইটিস",
    "category": "Respiratory",
    "section": "Section C: শ্বাসতন্ত্রের রোগ",
    "severity": "mild",
    "banglaSymptoms": [
      "হাঁচি",
      "নাক দিয়ে পানি",
      "নাক চুলকানো",
      "চোখ চুলকানো ও পানি পড়া",
      "গলা খুসখুসে"
    ],
    "commonSymptoms": [
      "Sneezing",
      "Runny nose",
      "Itchy nose",
      "Itchy watery eyes",
      "Tickling throat"
    ],
    "investigations": [
      {
        "label": "Clinical history",
        "note": ""
      },
      {
        "label": "Allergy Skin Test",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Hay fever, sneezing – Sabadilla",
      "Acrid discharge – Allium cepa",
      "Bland eye discharge – Euphrasia."
    ],
    "mainRemedies": [
      "Allium cepa",
      "Euphrasia",
      "Sabadilla",
      "Arsenicum album"
    ],
    "medicineDetails": [
      {
        "name": "Allium cepa",
        "symptoms": "নাকের স্রাবে জ্বালা, চোখের পানি স্বাভাবিক",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Euphrasia",
        "symptoms": "চোখের পানিতে জ্বালা, নাকের স্রাব স্বাভাবিক",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Sabadilla",
        "symptoms": "প্রচণ্ড হাঁচি, চোখে সুরসুর করা",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Arsenicum album",
        "symptoms": "নাক দিয়ে পাতলা পানি, অস্থিরতা",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "অ্যাজমা",
      "সাইনোসাইটিস",
      "পলিপ গঠন"
    ],
    "summary": "পরিবেশগত অ্যালার্জেন দ্বারা। Allium cepa ও Euphrasia প্রধান।"
  },
  {
    "id": "gastric-ulcer",
    "name": "Gastric Ulcer",
    "banglaName": "পেটের আলসার",
    "category": "Gastrointestinal",
    "section": "Section E: পরিপাকতন্ত্র",
    "severity": "moderate",
    "banglaSymptoms": [
      "খাওয়ার পর বা খালি পেটে পেট ব্যথা",
      "বুক জ্বালা",
      "বমি বমি ভাব",
      "অম্বল",
      "খিদে কমে যাওয়া"
    ],
    "commonSymptoms": [
      "Abdominal pain after meals/empty stomach",
      "Heartburn",
      "Nausea",
      "Acidity",
      "Loss of appetite"
    ],
    "investigations": [
      {
        "label": "Endoscopy",
        "note": ""
      },
      {
        "label": "H. pylori Test",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Gastric ulcer – Nux",
      "Burning pain – Phosphorus",
      "Acid dyspepsia – Robinia."
    ],
    "mainRemedies": [
      "Nux vomica",
      "Phosphorus",
      "Robinia",
      "Kali bichromicum"
    ],
    "medicineDetails": [
      {
        "name": "Nux vomica",
        "symptoms": "অতিরিক্ত মসলা খাওয়া বা অনিয়ম, কোষ্ঠকাঠিন্য",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Phosphorus",
        "symptoms": "পেটে তীব্র জ্বালা, ঠাণ্ডা পানি পানে আরাম",
        "potency": "30C",
        "priority": "High"
      },
      {
        "name": "Robinia",
        "symptoms": "তীব্র অ্যাসিড ডিসপেপসিয়া, টক বমি",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Kali bichromicum",
        "symptoms": "একটি নির্দিষ্ট বিন্দুতে ছিদ্র হওয়ার মতো ব্যথা",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "আলসার ছিদ্র (perforation)",
      "রক্তপাত",
      "পাইলোরিক স্টেনোসিস"
    ],
    "summary": "পাকস্থলীর ক্ষত। Nux vomica ও Phosphorus স্মরণীয়।"
  },
  {
    "id": "cystic-fibrosis",
    "name": "Cystic Fibrosis",
    "banglaName": "সিস্টিক ফাইব্রোসিস",
    "severity": "moderate",
    "banglaSymptoms": [
      "ঘন শ্লেষ্মা",
      "বারবার ফুসফুসের সংক্রমণ",
      "ক্লান্তি",
      "প্যানক্রিয়াসের অভাবে অপুষ্টি",
      "লবণাক্ত ঘাম।"
    ],
    "commonSymptoms": [
      "ঘন শ্লেষ্মা",
      "বারবার ফুসফুসের সংক্রমণ",
      "ক্লান্তি",
      "প্যানক্রিয়াসের অভাবে অপুষ্টি",
      "লবণাক্ত ঘাম।"
    ],
    "investigations": [
      {
        "label": "ঘাম ক্লোরাইড টেস্ট",
        "note": ""
      },
      {
        "label": "জিন বিশ্লেষণ (CFTR মিউটেশন)।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Cystic fibrosis, thick mucus - Kali mur",
      "Recurrent chest infections - Tuberculinum",
      "Malabsorption - Phosphorus",
      "Salt craving - Natrum mur।"
    ],
    "mainRemedies": [
      "Pulsatilla"
    ],
    "medicineDetails": [
      {
        "name": "Pulsatilla",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "1st Choice"
      }
    ],
    "emergencySigns": [
      "ব্রংকাইক্টেসিস",
      "অগ্ন্যাশয়ের অপ্রতুলতা",
      "লিভার সিরোসিস।"
    ],
    "summary": "জিনঘটিত রোগ। লক্ষণভিত্তিক হোমিওপ্যাথি সহায়ক।",
    "section": "Section C: শ্বাসতন্ত্রের রোগ",
    "category": "Respiratory"
  },
  {
    "id": "dandruff",
    "name": "Dandruff",
    "banglaName": "খুশকি",
    "severity": "moderate",
    "banglaSymptoms": [
      "মাথার ত্বকে সাদা বা হলুদ আঁশ",
      "চুলকানি",
      "শুষ্ক বা তৈলাক্ত ত্বক",
      "চুল পড়া।"
    ],
    "commonSymptoms": [
      "মাথার ত্বকে সাদা বা হলুদ আঁশ",
      "চুলকানি",
      "শুষ্ক বা তৈলাক্ত ত্বক",
      "চুল পড়া।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Dandruff, white scales - Thuja",
      "Crusty with itching - Mezereum",
      "Yellow scales - Kali sulph",
      "Bleeding when scratched - Graphites।"
    ],
    "mainRemedies": [
      "Thuja"
    ],
    "medicineDetails": [
      {
        "name": "Thuja",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "1st Choice"
      }
    ],
    "emergencySigns": [
      "সেবোরিক ডার্মাটাইটিস",
      "ফলিকুলাইটিস।"
    ],
    "summary": "ছত্রাক ও সিবামের ভারসাম্যহীনতা। Thuja ও Graphites প্রধান।",
    "section": "Section G: ত্বকের রোগ",
    "category": "Skin"
  },
  {
    "id": "deafness",
    "name": "Deafness",
    "banglaName": "বধিরতা",
    "severity": "moderate",
    "banglaSymptoms": [
      "শব্দ শুনতে অসুবিধা",
      "কানে ভোঁ ভোঁ শব্দ (টিনিটাস)",
      "কথা বলার সময় উচ্চস্বরে বলা",
      "সামাজিক প্রত্যাহার।"
    ],
    "commonSymptoms": [
      "শব্দ শুনতে অসুবিধা",
      "কানে ভোঁ ভোঁ শব্দ (টিনিটাস)",
      "কথা বলার সময় উচ্চস্বরে বলা",
      "সামাজিক প্রত্যাহার।"
    ],
    "investigations": [
      {
        "label": "অডিওমেট্রি",
        "note": ""
      },
      {
        "label": "টাইমপ্যানোমেট্রি",
        "note": ""
      },
      {
        "label": "ক্লিনিক্যাল।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Deafness, after catarrh - Pulsatilla",
      "Tinnitus - Chininum sulph",
      "Chronic suppuration - Silicea",
      "Right ear - Lycopodium।"
    ],
    "mainRemedies": [
      "Pulsatilla"
    ],
    "medicineDetails": [
      {
        "name": "Pulsatilla",
        "symptoms": "সর্দি পরবর্তী, Calcarea carb 30C (গ্ল্যান্ডুলার), Chininum sulphuricum 30C (টিনিটাস), Silicea 30C (যখন পুঁজ হয়), Lycopodium 30C (ডান কান বেশি)।",
        "potency": "30C",
        "priority": "1st Choice"
      }
    ],
    "emergencySigns": [
      "সামাজিক বিচ্ছিন্নতা",
      "বিষণ্নতা।"
    ],
    "summary": "বিভিন্ন কারণ (বয়স, সংক্রমণ, শব্দ)। Pulsatilla ও Chininum sulph বিশেষ।",
    "section": "Section L: চোখ ও কানের রোগ",
    "category": "ENT/Eye"
  },
  {
    "id": "delirium-tremens",
    "name": "Delirium Tremens",
    "banglaName": "মদ্যপায়ের প্রলাপ",
    "severity": "moderate",
    "banglaSymptoms": [
      "মদ্যপানের পর থমথমে অবস্থা",
      "কাঁপুনি",
      "ভ্রম (কীটপতঙ্গ দেখা)",
      "অস্থিরতা",
      "ঘাম",
      "খিঁচুনি",
      "অনিদ্রা",
      "অজ্ঞান।"
    ],
    "commonSymptoms": [
      "মদ্যপানের পর থমথমে অবস্থা",
      "কাঁপুনি",
      "ভ্রম (কীটপতঙ্গ দেখা)",
      "অস্থিরতা",
      "ঘাম",
      "খিঁচুনি",
      "অনিদ্রা",
      "অজ্ঞান।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল ইতিহাস (অ্যালকোহল উইথড্রোয়াল)",
        "note": ""
      },
      {
        "label": "লক্ষণ।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Delirium tremens, seeing animals - Lachesis",
      "Trembling - Hyoscyamus",
      "Fear of water - Belladonna",
      "Restlessness - Ars।"
    ],
    "mainRemedies": [
      "Lachesis"
    ],
    "medicineDetails": [
      {
        "name": "Lachesis",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "1st Choice"
      }
    ],
    "emergencySigns": [
      "সিজার",
      "কার্ডিয়াক অ্যারেস্ট।"
    ],
    "summary": "অ্যালকোহল নির্ভরতার তীব্র প্রত্যাহার উপসর্গ। Lachesis ও Hyoscyamus প্রাথমিক।",
    "section": "Section D: স্নায়ুতন্ত্র ও মানসিক",
    "category": "Neurological/Psychological"
  },
  {
    "id": "depression",
    "name": "Depression",
    "banglaName": "বিষণ্নতা",
    "severity": "moderate",
    "banglaSymptoms": [
      "দীর্ঘস্থায়ী মেজার খারাপ থাকা",
      "আগ্রহ হারানো",
      "ক্লান্তি",
      "ঘুম ও ক্ষুধায় পরিবর্তন",
      "আত্মহত্যার চিন্তা।"
    ],
    "commonSymptoms": [
      "দীর্ঘস্থায়ী মেজার খারাপ থাকা",
      "আগ্রহ হারানো",
      "ক্লান্তি",
      "ঘুম ও ক্ষুধায় পরিবর্তন",
      "আত্মহত্যার চিন্তা।"
    ],
    "investigations": [
      {
        "label": "DSM-5 মানদণ্ড",
        "note": ""
      },
      {
        "label": "হ্যামিলটন ডিপ্রেশন স্কেল।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Depression, grief - Ignatia",
      "Silent grief - Nat mur",
      "Suicidal - Aurum",
      "Weepy - Pulsatilla",
      "Indifferent - Sepia।"
    ],
    "mainRemedies": [
      "Ignatia"
    ],
    "medicineDetails": [
      {
        "name": "Ignatia",
        "symptoms": "শোকে, Natrum mur 30C (নীরব দুঃখ), Aurum met 30C (আত্মহত্যার প্রবণতা), Pulsatilla 30C (কান্নাকাটি, সান্ত্বনা চায়), Sepia 30C (উদাসীন, বিরক্তিবোধ)।",
        "potency": "30C",
        "priority": "1st Choice"
      }
    ],
    "emergencySigns": [
      "আত্মহত্যা",
      "অ্যালকোহল আসক্তি।"
    ],
    "summary": "মানসিক রোগ। Ignatia ও Nat mur ক্লাসিক রেমেডি।",
    "section": "Section D: স্নায়ুতন্ত্র ও মানসিক",
    "category": "Neurological/Psychological"
  },
  {
    "id": "diabetes-mellitus",
    "name": "Diabetes Mellitus",
    "banglaName": "ডায়াবেটিস",
    "severity": "moderate",
    "banglaSymptoms": [
      "অতিরিক্ত পিপাসা",
      "ঘন ঘন প্রস্রাব",
      "অতিরিক্ত ক্ষুধা",
      "ওজন কমা",
      "ক্লান্তি",
      "ক্ষত শুকাতে দেরি।"
    ],
    "commonSymptoms": [
      "অতিরিক্ত পিপাসা",
      "ঘন ঘন প্রস্রাব",
      "অতিরিক্ত ক্ষুধা",
      "ওজন কমা",
      "ক্লান্তি",
      "ক্ষত শুকাতে দেরি।"
    ],
    "investigations": [
      {
        "label": "ফাস্টিং ব্লাড সুগার",
        "note": ""
      },
      {
        "label": "HbA1c",
        "note": ""
      },
      {
        "label": "গ্লুকোজ টলারেন্স টেস্ট।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Diabetes, polyuria - Syzygium",
      "Sugar in urine - Uranium nit",
      "Weight loss - Phosphorus",
      "Insatiable thirst - Abroma।"
    ],
    "mainRemedies": [
      "Syzygium jambolanum",
      "Uranium nitricum",
      "Phosphorus",
      "Abroma augusta",
      "Cephalandra indica"
    ],
    "medicineDetails": [
      {
        "name": "Syzygium jambolanum",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "Q",
        "priority": "1st Choice"
      },
      {
        "name": "Uranium nitricum",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Phosphorus",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Abroma augusta",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "Q",
        "priority": "Medium"
      },
      {
        "name": "Cephalandra indica",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "Q",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "নেফ্রোপ্যাথি",
      "রেটিনোপ্যাথি",
      "নিউরোপ্যাথি",
      "ফুট আলসার।"
    ],
    "summary": "ইনসুলিনের অপ্রতুলতা বা রেজিস্ট্যান্স। Syzygium জাম্বোলানাম খুবই কার্যকর।",
    "section": "Section J: মূত্রতন্ত্র",
    "category": "Urinary/Male Reproductive"
  },
  {
    "id": "dryness-of-mouth",
    "name": "Dryness of Mouth",
    "banglaName": "শুকনো মুখ",
    "severity": "moderate",
    "banglaSymptoms": [
      "মুখ শুষ্ক",
      "লালা কম",
      "গিলতে কষ্ট",
      "জিহ্বায় ফাটল",
      "স্বাদ কম পাওয়া।"
    ],
    "commonSymptoms": [
      "মুখ শুষ্ক",
      "লালা কম",
      "গিলতে কষ্ট",
      "জিহ্বায় ফাটল",
      "স্বাদ কম পাওয়া।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল",
        "note": ""
      },
      {
        "label": "শোগ্রেন সিন্ড্রোম পরীক্ষা।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Mouth dry, thirst great - Bryonia",
      "Thirstless - Pulsatilla",
      "Food tastes dry - Nux moschata",
      "Red dry tongue - Belladonna।"
    ],
    "mainRemedies": [
      "Bryonia"
    ],
    "medicineDetails": [
      {
        "name": "Bryonia",
        "symptoms": "খুব শুষ্ক, Pulsatilla 30C (শুষ্ক মুখ কিন্তু পিপাসা নেই)।",
        "potency": "30C",
        "priority": "1st Choice"
      }
    ],
    "emergencySigns": [
      "দাঁতের ক্ষয়",
      "সংক্রমণ।"
    ],
    "summary": "ওষুধের পার্শ্বপ্রতিক্রিয়া বা রোগের লক্ষণ। Nux moschata বিশেষ।",
    "section": "Section K: দন্ত ও মুখগহ্বর",
    "category": "Oral"
  },
  {
    "id": "dysmenorrhoea",
    "name": "Dysmenorrhoea",
    "banglaName": "মাসিকের ব্যথা",
    "severity": "moderate",
    "banglaSymptoms": [
      "মাসিক শুরুর আগে বা সময় পেটের নিচে তীব্র ব্যথা",
      "পিঠে ব্যথা",
      "বমি বমি ভাব",
      "মাথাব্যথা",
      "ক্লান্তি।"
    ],
    "commonSymptoms": [
      "মাসিক শুরুর আগে বা সময় পেটের নিচে তীব্র ব্যথা",
      "পিঠে ব্যথা",
      "বমি বমি ভাব",
      "মাথাব্যথা",
      "ক্লান্তি।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল",
        "note": ""
      },
      {
        "label": "পেলভিক আলট্রাসাউন্ড (এন্ডোমেট্রিওসিস বাদে)।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Dysmenorrhoea, cramping - Mag phos",
      "Better by doubling up - Colocynthis",
      "Before menses - Caulophyllum",
      "Changeable - Pulsatilla",
      "Radiating to back - Cimicifuga।"
    ],
    "mainRemedies": [
      "Mag phos"
    ],
    "medicineDetails": [
      {
        "name": "Mag phos",
        "symptoms": "মোচড়ানো ব্যথা, গরমে ভাল, Colocynthis 30C (ব্যথায় কুঁকড়ে যায়), Caulophyllum 30C (আক্রমণের আগে), Pulsatilla 30C (পরিবর্তনশীল মেজাজ), Cimicifuga 30C (ব্যথা পিঠে ও উরুতে ছড়ায়)।",
        "potency": "30C",
        "priority": "1st Choice"
      }
    ],
    "emergencySigns": [
      "এন্ডোমেট্রিওসিস",
      "বন্ধ্যাত্ব।"
    ],
    "summary": "প্রোস্টাগ্লান্ডিনের কারণে জরায়ুর সংকোচন। Mag phos দ্রুত উপশম দেয়।",
    "section": "Section I: স্ত্রীরোগ",
    "category": "Gynecology"
  },
  {
    "id": "earache",
    "name": "Earache",
    "banglaName": "কানে ব্যথা",
    "severity": "moderate",
    "banglaSymptoms": [
      "কানে তীব্র ব্যথা",
      "টানা ব্যথা",
      "জ্বর থাকতে পারে",
      "শ্রবণশক্তি কমে যাওয়া",
      "শিশুর কান ধরা।"
    ],
    "commonSymptoms": [
      "কানে তীব্র ব্যথা",
      "টানা ব্যথা",
      "জ্বর থাকতে পারে",
      "শ্রবণশক্তি কমে যাওয়া",
      "শিশুর কান ধরা।"
    ],
    "investigations": [
      {
        "label": "অটোস্কোপি (কানের পর্দা লাল ও ফোলা)।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Earache, sudden - Belladonna",
      "Intolerable pain - Chamomilla",
      "After cold - Pulsatilla",
      "Discharge - Hepar",
      "Throbbing - Ferrum phos।"
    ],
    "mainRemedies": [
      "Belladonna",
      "Chamomilla",
      "Pulsatilla",
      "Ferrum phos",
      "Hepar sulph"
    ],
    "medicineDetails": [
      {
        "name": "Belladonna",
        "symptoms": "হঠাৎ তীব্র ব্যথা, লালতা",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Chamomilla",
        "symptoms": "অসহনীয় ব্যথা, শিশু জ্বালাতন",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Pulsatilla",
        "symptoms": "থোকা স্রাব",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Ferrum phos",
        "symptoms": "প্রাথমিক পর্যায়",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Hepar sulph",
        "symptoms": "ছিদ্র হয়ে পুঁজ বের হওয়া।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "কানের পর্দা ছিদ্র",
      "মাস্টয়েডাইটিস।"
    ],
    "summary": "ওটিটিস মিডিয়ার কারণে। Belladonna ও Chamomilla প্রথম সারি।",
    "section": "Section L: চোখ ও কানের রোগ",
    "category": "ENT/Eye"
  },
  {
    "id": "eczema",
    "name": "Eczema",
    "banglaName": "একজিমা",
    "severity": "moderate",
    "banglaSymptoms": [
      "ত্বক লাল",
      "চুলকানি",
      "শুষ্ক বা ভেজা ফোসকা",
      "ঘা থেকে পানি পড়া",
      "পুরু আঁশ জমা।"
    ],
    "commonSymptoms": [
      "ত্বক লাল",
      "চুলকানি",
      "শুষ্ক বা ভেজা ফোসকা",
      "ঘা থেকে পানি পড়া",
      "পুরু আঁশ জমা।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল",
        "note": ""
      },
      {
        "label": "প্যাচ টেস্ট (অ্যালার্জি)।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Eczema, oozing sticky - Graphites",
      "Burning and itching - Sulphur",
      "Fissured - Petroleum",
      "Dry, crusty - Nat mur",
      "Thick crusts - Mezereum।"
    ],
    "mainRemedies": [
      "Graphites",
      "Sulphur",
      "Petroleum",
      "Natrum mur",
      "Mezereum"
    ],
    "medicineDetails": [
      {
        "name": "Graphites",
        "symptoms": "মধুর মতো স্রাব",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Sulphur",
        "symptoms": "চুলকানি, রাতে বেড়ে",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Petroleum",
        "symptoms": "শীতকালে ফাটা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Natrum mur",
        "symptoms": "শুষ্ক, ছোট ফোসকা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Mezereum",
        "symptoms": "পুরু আঁশ, পুঁজ।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "সেকেন্ডারি ইনফেকশন",
      "লাইকেনিফিকেশন।"
    ],
    "summary": "এলার্জি বা ইমিউন ডিজঅর্ডার। Graphites ও Sulphur ক্লাসিক।",
    "section": "Section G: ত্বকের রোগ",
    "category": "Skin"
  },
  {
    "id": "endometriosis",
    "name": "Endometriosis",
    "banglaName": "এন্ডোমেট্রিওসিস",
    "severity": "moderate",
    "banglaSymptoms": [
      "তীব্র মাসিক ব্যথা",
      "মাসিকের সময় অতিরিক্ত রক্তপাত",
      "বন্ধ্যাত্ব",
      "যৌনমিলনে ব্যথা",
      "কোমর ব্যথা।"
    ],
    "commonSymptoms": [
      "তীব্র মাসিক ব্যথা",
      "মাসিকের সময় অতিরিক্ত রক্তপাত",
      "বন্ধ্যাত্ব",
      "যৌনমিলনে ব্যথা",
      "কোমর ব্যথা।"
    ],
    "investigations": [
      {
        "label": "ল্যাপারোস্কোপি",
        "note": ""
      },
      {
        "label": "পেলভিক এমআরআই।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Endometriosis, pain before menses - Lachesis",
      "Bearing down - Sepia",
      "Sudden pain - Belladonna",
      "Radiating pain - Cimicifuga",
      "Vaginal hypersensitivity - Platina।"
    ],
    "mainRemedies": [
      "Lachesis",
      "Sepia",
      "Belladonna",
      "Cimicifuga",
      "Platina"
    ],
    "medicineDetails": [
      {
        "name": "Lachesis",
        "symptoms": "মাসিক শুরুর আগে খারাপ, প্রবাহ শুরু হলে ভাল",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Sepia",
        "symptoms": "চাপ অনুভব, অবসাদ",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Belladonna",
        "symptoms": "তীব্র ব্যথা, জ্বালাপোড়া",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Cimicifuga",
        "symptoms": "ব্যথা পিঠে ও উরুতে",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Platina",
        "symptoms": "যৌনাঙ্গের অতিসংবেদনশীলতা।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "বন্ধ্যাত্ব",
      "ওভারিয়ান সিস্ট।"
    ],
    "summary": "জরায়ুর আস্তরণ বাইরে বেড়ে ওঠা। Lachesis ও Sepia প্রধান।",
    "section": "Section I: স্ত্রীরোগ",
    "category": "Gynecology"
  },
  {
    "id": "enuresis",
    "name": "Enuresis",
    "banglaName": "বিছানা ভিজানো",
    "severity": "moderate",
    "banglaSymptoms": [
      "শিশুদের অনিচ্ছাকৃত প্রস্রাব (রাতে বা দিনে)",
      "৫ বছরের বেশি বয়সে",
      "ঘন ঘন প্রস্রাবের তাগিদ থাকতে পারে।"
    ],
    "commonSymptoms": [
      "শিশুদের অনিচ্ছাকৃত প্রস্রাব (রাতে বা দিনে)",
      "৫ বছরের বেশি বয়সে",
      "ঘন ঘন প্রস্রাবের তাগিদ থাকতে পারে।"
    ],
    "investigations": [
      {
        "label": "ইউরিনালাইসিস",
        "note": ""
      },
      {
        "label": "ইউরিন কালচার",
        "note": ""
      },
      {
        "label": "ব্লাড সুগার।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Enuresis, first sleep - Causticum",
      "Deep sleep - Kreosotum",
      "Day wetting - Pulsatilla",
      "Urgency - Equisetum",
      "Involuntary - Sepia।"
    ],
    "mainRemedies": [
      "Causticum",
      "Equisetum",
      "Kreosotum",
      "Pulsatilla",
      "Sepia"
    ],
    "medicineDetails": [
      {
        "name": "Causticum",
        "symptoms": "শয্যায় প্রথম ঘুমে, স্বপ্ন দেখে প্রস্রাব",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Equisetum",
        "symptoms": "মূত্রাশয়ে ব্যথা সহ",
        "potency": "q",
        "priority": "Medium"
      },
      {
        "name": "Kreosotum",
        "symptoms": "গভীর ঘুম",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Pulsatilla",
        "symptoms": "দিনে ও রাতে, পরিবর্তনশীল",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Sepia",
        "symptoms": "প্রস্রাবের সময় কাশি বা হাঁচি।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "সংক্রমণ",
      "মানসিক সমস্যা।"
    ],
    "summary": "বেশিরভাগ শিশুর বয়সে সেরে যায়। Causticum ও Kreosotum উত্তম।",
    "section": "Section J: মূত্রতন্ত্র",
    "category": "Urinary/Male Reproductive"
  },
  {
    "id": "epicondylitis",
    "name": "Epicondylitis",
    "banglaName": "টেনিস এলবো",
    "severity": "moderate",
    "banglaSymptoms": [
      "কনুইয়ের বাইরের দিকে ব্যথা",
      "বস্তু তুললে বা হাত ঘোরালে ব্যথা বাড়ে",
      "স্থানীয় কোমলতা।"
    ],
    "commonSymptoms": [
      "কনুইয়ের বাইরের দিকে ব্যথা",
      "বস্তু তুললে বা হাত ঘোরালে ব্যথা বাড়ে",
      "স্থানীয় কোমলতা।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল",
        "note": ""
      },
      {
        "label": "প্রতিরোধী প্রসারন পরীক্ষা।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Tennis elbow, painful motion - Rhus tox",
      "Worse on movement - Bryonia",
      "After injury - Arnica",
      "Burning pain - Causticum।"
    ],
    "mainRemedies": [
      "Rhus tox",
      "Bryonia",
      "Arnica",
      "Hypericum",
      "Causticum"
    ],
    "medicineDetails": [
      {
        "name": "Rhus tox",
        "symptoms": "নড়াচড়ায় ব্যথা কমে ও পরে বাড়ে",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Bryonia",
        "symptoms": "নড়াচড়ায় ব্যথা বাড়ে",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Arnica",
        "symptoms": "আঘাতের পর",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Hypericum",
        "symptoms": "স্নায়বিক ব্যথা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Causticum",
        "symptoms": "স্থায়ী অবসাদ।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "ক্রনিক ব্যথা।"
    ],
    "summary": "রিপিটিটিভ মোশন ইনজুরি। Rhus tox প্রধান।",
    "section": "Section F: হাড় ও জয়েন্ট",
    "category": "Musculoskeletal"
  },
  {
    "id": "epilepsy",
    "name": "Epilepsy",
    "banglaName": "মৃগী / অ্যাপিলেপসি",
    "severity": "moderate",
    "banglaSymptoms": [
      "বারবার অজ্ঞান হয়ে খিঁচুনি (টনিক-ক্লোনিক বা অনুপস্থিতি)",
      "জিহ্বা কামড়ানো",
      "প্রস্রাব নষ্ট",
      "বিভ্রম।"
    ],
    "commonSymptoms": [
      "বারবার অজ্ঞান হয়ে খিঁচুনি (টনিক-ক্লোনিক বা অনুপস্থিতি)",
      "জিহ্বা কামড়ানো",
      "প্রস্রাব নষ্ট",
      "বিভ্রম।"
    ],
    "investigations": [
      {
        "label": "ইইজি",
        "note": ""
      },
      {
        "label": "এমআরআই",
        "note": ""
      },
      {
        "label": "ব্লাড টেস্ট।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Epilepsy, aura in stomach - Cicuta",
      "Violent convulsions - Cuprum",
      "After fright - Causticum",
      "With sexual excitement - Bufo।"
    ],
    "mainRemedies": [
      "Cicuta virosa",
      "Cuprum met",
      "Bufo",
      "Causticum",
      "Silicea"
    ],
    "medicineDetails": [
      {
        "name": "Cicuta virosa",
        "symptoms": "আঘাত পরবর্তী",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Cuprum met",
        "symptoms": "শ্বাস বন্ধ, নীলাভ",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Bufo",
        "symptoms": "যৌনাঙ্গের উদ্দীপনা সহ",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Causticum",
        "symptoms": "রাতে, ভয়",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Silicea",
        "symptoms": "মৃগী মন্দা।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "মস্তিষ্কের ক্ষতি",
      "দুর্ঘটনা।"
    ],
    "summary": "নিউরোলজিক্যাল ডিজঅর্ডার। Cicuta ও Cuprum গুরুত্বপূর্ণ।",
    "section": "Section D: স্নায়ুতন্ত্র ও মানসিক",
    "category": "Neurological/Psychological"
  },
  {
    "id": "erysipelas",
    "name": "Erysipelas",
    "banglaName": "ইরিসিপেলাস",
    "severity": "moderate",
    "banglaSymptoms": [
      "ত্বকের লাল",
      "উঁচু",
      "চকচকে অংশ",
      "স্পষ্ট সীমানা",
      "জ্বর",
      "ঠাণ্ডা লাগা",
      "ব্যথা ও জ্বালা।"
    ],
    "commonSymptoms": [
      "ত্বকের লাল",
      "উঁচু",
      "চকচকে অংশ",
      "স্পষ্ট সীমানা",
      "জ্বর",
      "ঠাণ্ডা লাগা",
      "ব্যথা ও জ্বালা।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল",
        "note": ""
      },
      {
        "label": "ব্লাড কালচার।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Erysipelas, bright red - Belladonna",
      "Oedematous - Apis",
      "Dark red - Lachesis",
      "Vesicular - Rhus tox",
      "Burning - Ars।"
    ],
    "mainRemedies": [
      "Belladonna",
      "Apis",
      "Lachesis",
      "Rhus tox",
      "Arsenicum album"
    ],
    "medicineDetails": [
      {
        "name": "Belladonna",
        "symptoms": "লাল, জ্বলন্ত, স্পন্দন",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Apis",
        "symptoms": "ফোলা, জ্বালাপোড়া, স্পর্শে ব্যথা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Lachesis",
        "symptoms": "নীলচে-লাল, শক্ত",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Rhus tox",
        "symptoms": "ফোসকাসহ",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Arsenicum album",
        "symptoms": "জ্বালা ও অস্থিরতা।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "সেপ্টিসেমিয়া",
      "ফোড়া",
      "লিম্ফিডিমা।"
    ],
    "summary": "স্ট্রেপ্টোকক্কাস সংক্রমণ। Belladonna প্রথম সারির ওষুধ।",
    "section": "Section G: ত্বকের রোগ",
    "category": "Skin"
  },
  {
    "id": "eye-stye",
    "name": "Eye Stye",
    "banglaName": "পিচুটি",
    "severity": "moderate",
    "banglaSymptoms": [
      "চোখের পাতায় লাল ফোলা",
      "ব্যথা",
      "পুঁজ জমা",
      "চুলকানি",
      "আলোতে অসুবিধা।"
    ],
    "commonSymptoms": [
      "চোখের পাতায় লাল ফোলা",
      "ব্যথা",
      "পুঁজ জমা",
      "চুলকানি",
      "আলোতে অসুবিধা।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Stye, acute - Pulsatilla",
      "Recurrent - Staphysagria",
      "Suppurating - Hepar",
      "Oedema - Apis",
      "Hard nodule - Silicea।"
    ],
    "mainRemedies": [
      "Pulsatilla"
    ],
    "medicineDetails": [
      {
        "name": "Pulsatilla",
        "symptoms": "পুরনো স্টাই, Hepar sulph 30C (পুঁজ হলে), Apis 30C (ফোলা), Silicea 30C (পুনরাবৃত্ত)।",
        "potency": "30C",
        "priority": "1st Choice"
      }
    ],
    "emergencySigns": [
      "চ্যালাজিয়ন",
      "সেলুলাইটিস।"
    ],
    "summary": "স্ট্যাফিলোকক্কাস ইনফেকশন। Pulsatilla ও Staphysagria উল্লেখযোগ্য।",
    "section": "Section L: চোখ ও কানের রোগ",
    "category": "ENT/Eye"
  },
  {
    "id": "facial-paralysis",
    "name": "Facial Paralysis",
    "banglaName": "মুখের প্যারালাইসিস – বেলস পালসি",
    "severity": "moderate",
    "banglaSymptoms": [
      "হঠাৎ মুখের একপাশ অবশ",
      "চোখ বন্ধ না হওয়া",
      "মুখ বাঁকা",
      "স্বাদ লোপ",
      "কানে শব্দ।"
    ],
    "commonSymptoms": [
      "হঠাৎ মুখের একপাশ অবশ",
      "চোখ বন্ধ না হওয়া",
      "মুখ বাঁকা",
      "স্বাদ লোপ",
      "কানে শব্দ।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল",
        "note": ""
      },
      {
        "label": "ইএমজি",
        "note": ""
      },
      {
        "label": "(স্ট্রোক বাদে)।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Facial paralysis, right side - Causticum",
      "After chill - Aconite",
      "With drooping eyelids - Gelsemium",
      "After injury - Hypericum।"
    ],
    "mainRemedies": [
      "Causticum"
    ],
    "medicineDetails": [
      {
        "name": "Causticum",
        "symptoms": "ডান দিক, Aconite 30C (হঠাৎ ঠাণ্ডা বাতাসের পর), Gelsemium 30C (ধীরগতি, সর্দি সহ), Hypericum 30C (স্নায়ুতে চোট), Lathyrus 30C (দুর্বলতা)।",
        "potency": "30C",
        "priority": "1st Choice"
      }
    ],
    "emergencySigns": [
      "স্থায়ী অচলতা",
      "সিনকাইনেসিস।"
    ],
    "summary": "৭ম ক্র্যানিয়াল স্নায়ুর প্যারালাইসিস। Causticum ও Gelsemium প্রধান।",
    "section": "Section L: চোখ ও কানের রোগ",
    "category": "ENT/Eye"
  },
  {
    "id": "fatty-liver",
    "name": "Fatty Liver",
    "banglaName": "ফ্যাটি লিভার",
    "severity": "moderate",
    "banglaSymptoms": [
      "ডান পাঁজরের নিচে চাপ বা ব্যথা",
      "ক্লান্তি",
      "ওজন কমে না",
      "প্রস্রাব গাঢ়",
      "আল্ট্রাসাউন্ডে ফ্যাটি লিভার।"
    ],
    "commonSymptoms": [
      "ডান পাঁজরের নিচে চাপ বা ব্যথা",
      "ক্লান্তি",
      "ওজন কমে না",
      "প্রস্রাব গাঢ়",
      "আল্ট্রাসাউন্ডে ফ্যাটি লিভার।"
    ],
    "investigations": [
      {
        "label": "আলট্রাসাউন্ড",
        "note": ""
      },
      {
        "label": "লিভার ফাংশন টেস্ট (এসজিপিটি)",
        "note": ""
      },
      {
        "label": "এফআইবি-৪ স্কোর।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Fatty liver - Carduus mar.",
      "Enlarged tender liver - Chelidonium",
      "Craves sweets - Phosphorus",
      "Fullness after eating - Lycopodium।"
    ],
    "mainRemedies": [
      "Carduus marianus",
      "Chelidonium",
      "Phosphorus",
      "Lycopodium",
      "Cholesterinum"
    ],
    "medicineDetails": [
      {
        "name": "Carduus marianus",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "Q",
        "priority": "1st Choice"
      },
      {
        "name": "Chelidonium",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Phosphorus",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Lycopodium",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Cholesterinum",
        "symptoms": "কলেস্টেরল কমায়।",
        "potency": "6C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "স্টেটোহেপাটাইটিস",
      "সিরোসিস।"
    ],
    "summary": "স্থূলতা ও বিপাক সিন্ড্রোমের অংশ। Carduus marianus ও Phosphorus গুরুত্বপূর্ণ।",
    "section": "Section E: পরিপাকতন্ত্র",
    "category": "Gastrointestinal"
  },
  {
    "id": "fistula-in-ano",
    "name": "Fistula in Ano",
    "banglaName": "পায়ুপথের ফিসচুলা",
    "severity": "moderate",
    "banglaSymptoms": [
      "পায়ুপথের পাশে ক্ষত",
      "পুঁজ ও রক্তস্রাব",
      "স্থায়ী জল স্রাব",
      "বসলে ব্যথা",
      "কখনো কখনো জ্বর।"
    ],
    "commonSymptoms": [
      "পায়ুপথের পাশে ক্ষত",
      "পুঁজ ও রক্তস্রাব",
      "স্থায়ী জল স্রাব",
      "বসলে ব্যথা",
      "কখনো কখনো জ্বর।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল পরীক্ষা",
        "note": ""
      },
      {
        "label": "ফিস্টুলোগ্রাফি (প্রয়োজনে)।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Fistula in ano, discharge thin - Silicea",
      "Offensive - Ars",
      "Burning - Berberis",
      "Indurated edges - Calcarea fluor।"
    ],
    "mainRemedies": [
      "Silicea",
      "Berberis vulgaris",
      "Hepar sulph",
      "Arsenicum album",
      "Calcium fluoride"
    ],
    "medicineDetails": [
      {
        "name": "Silicea",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Berberis vulgaris",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Hepar sulph",
        "symptoms": "তীব্র পুঁজ",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Arsenicum album",
        "symptoms": "দুর্গন্ধ",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Calcium fluoride",
        "symptoms": "শক্ত মাংস।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "পুনরাবৃত্ত ফোড়া।"
    ],
    "summary": "সার্জারি প্রায়ই লাগে। Silicea ও Berberis সাপোর্টিভ।",
    "section": "Section E: পরিপাকতন্ত্র",
    "category": "Gastrointestinal"
  },
  {
    "id": "flatulence",
    "name": "Flatulence",
    "banglaName": "পেটে গ্যাস",
    "severity": "moderate",
    "banglaSymptoms": [
      "পেট ফুলে ওঠা",
      "বায়ু নির্গমন",
      "পেটে গড়গড় শব্দ",
      "বুক জ্বালা",
      "অম্বল",
      "কামড়ানো ব্যথা।"
    ],
    "commonSymptoms": [
      "পেট ফুলে ওঠা",
      "বায়ু নির্গমন",
      "পেটে গড়গড় শব্দ",
      "বুক জ্বালা",
      "অম্বল",
      "কামড়ানো ব্যথা।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Flatulence, upper abdomen - Carbo veg",
      "Lower abdomen - Lycopodium",
      "Colic with gas - Nux vomica",
      "Gas not passing - Raphanus।"
    ],
    "mainRemedies": [
      "Lycopodium",
      "Carbo veg",
      "Nux vomica",
      "Raphanus sativus",
      "China"
    ],
    "medicineDetails": [
      {
        "name": "Lycopodium",
        "symptoms": "পেট ফুলে, ডান দিকে",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Carbo veg",
        "symptoms": "পুরো পেট ফুলে, বাতাসের প্রয়োজন",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Nux vomica",
        "symptoms": "পেট খারাপের সাথে",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Raphanus sativus",
        "symptoms": "গ্যাস উপরের দিকে যেতে পারে না",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "China",
        "symptoms": "অপুষ্টির সাথে।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "সাধারণত গৌণ।"
    ],
    "summary": "বিভিন্ন খাদ্য ও অন্ত্রের ব্যাধির ফলে। Lycopodium ও Carbo veg প্রধান।",
    "section": "Section E: পরিপাকতন্ত্র",
    "category": "Gastrointestinal"
  },
  {
    "id": "fracture-healing",
    "name": "Fracture Healing",
    "banglaName": "হাড় ভাঙা সারানো সহায়ক",
    "severity": "moderate",
    "banglaSymptoms": [
      "হাড় ভাঙার পর ব্যথা",
      "ফোলা",
      "দেরিতে জোড়া লাগা।"
    ],
    "commonSymptoms": [
      "হাড় ভাঙার পর ব্যথা",
      "ফোলা",
      "দেরিতে জোড়া লাগা।"
    ],
    "investigations": [
      {
        "label": "এক্স-রে।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Fracture, non-union - Symphytum",
      "Slow healing - Calcarea phos",
      "After trauma - Arnica",
      "Pain in periosteum - Ruta।"
    ],
    "mainRemedies": [
      "Symphytum",
      "Calcarea phosphorica",
      "Arnica",
      "Ruta"
    ],
    "medicineDetails": [
      {
        "name": "Symphytum",
        "symptoms": "হাড় জোড়ার জন্য অতুলনীয়",
        "potency": "Q",
        "priority": "1st Choice"
      },
      {
        "name": "Calcarea phosphorica",
        "symptoms": "নতুন হাড় গঠন",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Arnica",
        "symptoms": "প্রাথমিক ব্যথা ও শক",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Ruta",
        "symptoms": "পেরিওস্টিয়ামের ক্ষতি।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "নন-ইউনিয়ন",
      "ম্যালইউনিয়ন।"
    ],
    "summary": "Symphytum হাড়ের জন্য বিশেষ রেমেডি।",
    "section": "Section F: হাড় ও জয়েন্ট",
    "category": "Musculoskeletal"
  },
  {
    "id": "gallstones",
    "name": "Gallstones",
    "banglaName": "পিত্তথলির পাথর",
    "severity": "moderate",
    "banglaSymptoms": [
      "ডান পাঁজরের নিচে কোলিক ব্যথা",
      "বিশেষ করে তৈলাক্ত খাবারের পর",
      "বমি",
      "জ্বর",
      "জন্ডিস (পাথর ব্লক করলে)।"
    ],
    "commonSymptoms": [
      "ডান পাঁজরের নিচে কোলিক ব্যথা",
      "বিশেষ করে তৈলাক্ত খাবারের পর",
      "বমি",
      "জ্বর",
      "জন্ডিস (পাথর ব্লক করলে)।"
    ],
    "investigations": [
      {
        "label": "আলট্রাসাউন্ড",
        "note": ""
      },
      {
        "label": "সিটি স্ক্যান।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Gallstones, right shoulder pain - Chelidonium",
      "Radiating to kidneys - Berberis",
      "After rich food - Lycopodium",
      "Nausea - Nux vomica।"
    ],
    "mainRemedies": [
      "Chelidonium",
      "Berberis vulgaris",
      "Lycopodium",
      "Nux vomica",
      "Dioscorea"
    ],
    "medicineDetails": [
      {
        "name": "Chelidonium",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Berberis vulgaris",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Lycopodium",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Nux vomica",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Dioscorea",
        "symptoms": "তীব্র ব্যথায়।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "কোলেসিস্টাইটিস",
      "প্যানক্রিয়াটাইটিস।"
    ],
    "summary": "পিত্তথলির পাথর উপশমে Chelidonium ও Berberis স্মরণীয়।",
    "section": "Section E: পরিপাকতন্ত্র",
    "category": "Gastrointestinal"
  },
  {
    "id": "giardiasis",
    "name": "Giardiasis",
    "banglaName": "জিয়ার্ডিয়াসিস",
    "severity": "moderate",
    "banglaSymptoms": [
      "পেট ফাঁপা",
      "দুর্গন্ধযুক্ত ডায়রিয়া (ফ্লোটিং স্টুল)",
      "পেটে ফোলাভাব",
      "ক্লান্তি",
      "ক্ষুধামান্দ্য।"
    ],
    "commonSymptoms": [
      "পেট ফাঁপা",
      "দুর্গন্ধযুক্ত ডায়রিয়া (ফ্লোটিং স্টুল)",
      "পেটে ফোলাভাব",
      "ক্লান্তি",
      "ক্ষুধামান্দ্য।"
    ],
    "investigations": [
      {
        "label": "স্টুল মাইক্রোস্কোপি (জিয়ার্ডিয়া সিস্ট/ট্রফোজয়েট) বা এলিসা।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Giardiasis, floating stool - Chionanthus",
      "Offensive diarrhoea - Ars",
      "Fat intolerance - Mercurius",
      "Alternating stool - Pulsatilla।"
    ],
    "mainRemedies": [
      "Arsenicum album",
      "Chionanthus",
      "Mercurius cor",
      "Pulsatilla",
      "China"
    ],
    "medicineDetails": [
      {
        "name": "Arsenicum album",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Chionanthus",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Mercurius cor",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Pulsatilla",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "China",
        "symptoms": "দুর্বলতা।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "ল্যাকটোজ ইনটলারেন্স",
      "ওজন কমা।"
    ],
    "summary": "পরজীবী সংক্রমণ। Chionanthus ভার্জিনিকা ও Arsenicum বিশেষ।",
    "section": "Section E: পরিপাকতন্ত্র",
    "category": "Gastrointestinal"
  },
  {
    "id": "glaucoma",
    "name": "Glaucoma",
    "banglaName": "গ্লুকোমা – চোখের চাপ",
    "severity": "moderate",
    "banglaSymptoms": [
      "চোখে ব্যথা",
      "বমি বমি ভাব",
      "আলোর চারপাশে রিং দেখা",
      "দৃষ্টি ধীরে ধীরে কমে যাওয়া (হঠাৎ অ্যাকিউট গ্লুকোমায় চরম ব্যথা)।"
    ],
    "commonSymptoms": [
      "চোখে ব্যথা",
      "বমি বমি ভাব",
      "আলোর চারপাশে রিং দেখা",
      "দৃষ্টি ধীরে ধীরে কমে যাওয়া (হঠাৎ অ্যাকিউট গ্লুকোমায় চরম ব্যথা)।"
    ],
    "investigations": [
      {
        "label": "টনোমেট্রি (চোখের চাপ মাপা)",
        "note": ""
      },
      {
        "label": "ফান্ডোস্কোপি।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Glaucoma, increased tension - Physostigma",
      "Halos around light - Phosphorus",
      "Pain in eyes - Spigelia",
      "Nausea - Gelsemium।"
    ],
    "mainRemedies": [
      "Physostigma",
      "Phosphorus",
      "Osmium",
      "Spigelia",
      "Gelsemium"
    ],
    "medicineDetails": [
      {
        "name": "Physostigma",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Phosphorus",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Osmium",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Spigelia",
        "symptoms": "চোখের পেছনে ব্যথা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Gelsemium",
        "symptoms": "অলসতা।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "অপটিক নার্ভ ড্যামেজ",
      "স্থায়ী অন্ধত্ব।"
    ],
    "summary": "চোখের ভেতর চাপ বেড়ে যায়। Physostigma প্রধান রেমেডি।",
    "section": "Section L: চোখ ও কানের রোগ",
    "category": "ENT/Eye"
  },
  {
    "id": "gout",
    "name": "Gout",
    "banglaName": "গেঁটে বাত",
    "severity": "moderate",
    "banglaSymptoms": [
      "বড় পায়ের আঙুলের গোড়ালিতে হঠাৎ তীব্র ব্যথা",
      "ফোলা",
      "লালচে",
      "স্পর্শে অত্যন্ত কোমল",
      "জ্বর হতে পারে।"
    ],
    "commonSymptoms": [
      "বড় পায়ের আঙুলের গোড়ালিতে হঠাৎ তীব্র ব্যথা",
      "ফোলা",
      "লালচে",
      "স্পর্শে অত্যন্ত কোমল",
      "জ্বর হতে পারে।"
    ],
    "investigations": [
      {
        "label": "জয়েন্ট ফ্লুইডে ইউরিক এসিড ক্রিস্টাল",
        "note": ""
      },
      {
        "label": "সিরাম ইউরিক অ্যাসিড বেড়ে যাওয়া।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Gout, big toe - Colchicum",
      "Offensive urine - Benzoic acid",
      "Prickling - Urtica",
      "Worse in cold - Ledum।"
    ],
    "mainRemedies": [
      "Colchicum",
      "Benzoic acid",
      "Urtica urens",
      "Ledum pal",
      "Lithicum carbonicum"
    ],
    "medicineDetails": [
      {
        "name": "Colchicum",
        "symptoms": "স্পর্শে অসহিষ্ণুতা, নড়াচড়ায় ব্যথা",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Benzoic acid",
        "symptoms": "তীব্র গন্ধযুক্ত প্রস্রাব",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Urtica urens",
        "symptoms": "ইউরিক অ্যাসিড ডায়াথেসিস",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Ledum pal",
        "symptoms": "ঠাণ্ডা লাগলে ভাল",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Lithicum carbonicum",
        "symptoms": "পাথর।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "টফি (ইউরেট জমা)",
      "জয়েন্ট বিকৃতি।"
    ],
    "summary": "ইউরিক অ্যাসিড মেটাবলিজমের ব্যাধি। Colchicum ও Ledum pal প্রধান।",
    "section": "Section F: হাড় ও জয়েন্ট",
    "category": "Musculoskeletal"
  },
  {
    "id": "gum-boil",
    "name": "Gum Boil",
    "banglaName": "মাড়ির ফোঁড়া",
    "severity": "moderate",
    "banglaSymptoms": [
      "মাড়িতে ফোলা",
      "লাল",
      "ব্যথা",
      "পুঁজ বের হতে পারে",
      "দাঁতের গোড়ায় ব্যথা",
      "জ্বর।"
    ],
    "commonSymptoms": [
      "মাড়িতে ফোলা",
      "লাল",
      "ব্যথা",
      "পুঁজ বের হতে পারে",
      "দাঁতের গোড়ায় ব্যথা",
      "জ্বর।"
    ],
    "investigations": [
      {
        "label": "ডেন্টাল এক্স-রে",
        "note": ""
      },
      {
        "label": "ক্লিনিক্যাল।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Gum boil, suppurating - Hepar",
      "Red swelling - Belladonna",
      "Recurrent - Silicea",
      "Offensive odour - Merc sol।"
    ],
    "mainRemedies": [
      "Hepar sulph",
      "Belladonna",
      "Silicea",
      "Mercurius solubilis",
      "Calcarea fluorica"
    ],
    "medicineDetails": [
      {
        "name": "Hepar sulph",
        "symptoms": "পুঁজ জমে",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Belladonna",
        "symptoms": "তীব্র লাল ফোলা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Silicea",
        "symptoms": "পুনরাবৃত্ত ফোঁড়া",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Mercurius solubilis",
        "symptoms": "ঘাম সহ",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Calcarea fluorica",
        "symptoms": "শক্ত মাড়ি।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "ডেন্টাল অ্যাবসেস",
      "সেলুলাইটিস।"
    ],
    "summary": "দাঁতের ইনফেকশন। Hepar sulph ও Siliceা উত্তম।",
    "section": "Section K: দন্ত ও মুখগহ্বর",
    "category": "Oral"
  },
  {
    "id": "headache",
    "name": "Headache",
    "banglaName": "মাথাব্যথা – টেনশন, মাইগ্রেন",
    "severity": "moderate",
    "banglaSymptoms": [
      "বিভিন্ন ধরনের মাথাব্যথা (কপালে",
      "মাথার পেছনে",
      "চোখের পিছনে) – চাপা ব্যথা বা স্পন্দন",
      "বমি বমি ভাব",
      "আলো-শব্দে অসুবিধা।"
    ],
    "commonSymptoms": [
      "বিভিন্ন ধরনের মাথাব্যথা (কপালে",
      "মাথার পেছনে",
      "চোখের পিছনে) – চাপা ব্যথা বা স্পন্দন",
      "বমি বমি ভাব",
      "আলো-শব্দে অসুবিধা।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল ইতিহাস",
        "note": ""
      },
      {
        "label": "নিউরোইমেজিং (প্রয়োজনে)।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Headache, throbbing - Belladonna",
      "Sun headache - Glonoinum",
      "Right-sided migraine - Sanguinaria",
      "Bilious - Iris",
      "Occipital - Gelsemium।"
    ],
    "mainRemedies": [
      "Belladonna",
      "Glonoinum",
      "Sanguinaria",
      "Iris versicolor",
      "Gelsemium"
    ],
    "medicineDetails": [
      {
        "name": "Belladonna",
        "symptoms": "হঠাৎ তীব্র, কপালে, গরম",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Glonoinum",
        "symptoms": "রোদে মাথাব্যথা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Sanguinaria",
        "symptoms": "ডান চোখ থেকে শুরু, মাইগ্রেন",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Iris versicolor",
        "symptoms": "বমির সাথে",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Gelsemium",
        "symptoms": "মাথার পেছনে, দৃষ্টি ঝাপসা।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "সাধারণত গৌণ। দীর্ঘস্থায়ী হলে জীবনমান হ্রাস।"
    ],
    "summary": "টেনশন, সাইনাস, মাইগ্রেন ইত্যাদি। Belladonna ও Sanguinaria প্রধান।",
    "section": "Section L: চোখ ও কানের রোগ",
    "category": "ENT/Eye"
  },
  {
    "id": "heartburn",
    "name": "Heartburn",
    "banglaName": "বুক জ্বালা – অম্বল",
    "severity": "moderate",
    "banglaSymptoms": [
      "বুকে জ্বালা",
      "খাবারের পর বা শুয়ে বসলে বাড়ে",
      "পেট ও গলায় এসিড অনুভব",
      "খাবার ওঠা।"
    ],
    "commonSymptoms": [
      "বুকে জ্বালা",
      "খাবারের পর বা শুয়ে বসলে বাড়ে",
      "পেট ও গলায় এসিড অনুভব",
      "খাবার ওঠা।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল",
        "note": ""
      },
      {
        "label": "Endoscopy (ক্রনিক)।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Heartburn, acid rising - Robinia",
      "Burning along oesophagus - Iris",
      "After spicy food - Nux vomica",
      "Belching - Carbo veg।"
    ],
    "mainRemedies": [
      "Robinia",
      "Iris versicolor",
      "Nux vomica",
      "Carbo veg",
      "Arsenicum album"
    ],
    "medicineDetails": [
      {
        "name": "Robinia",
        "symptoms": "তীব্র এসিডিটি",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Iris versicolor",
        "symptoms": "জ্বালা ও বমি",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Nux vomica",
        "symptoms": "মসলাদার খাবারের পর",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Carbo veg",
        "symptoms": "পেট ফাঁপা সহ",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Arsenicum album",
        "symptoms": "জ্বালা ও অস্থিরতা।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "ওসোফেজাইটিস",
      "বেরেটস এসোফাগাস।"
    ],
    "summary": "গ্যাস্ট্রোওসোফেজিয়াল রিফ্লাক্স। Robinia অত্যন্ত কার্যকর।",
    "section": "Section A: জ্বর ও সংক্রামক রোগ",
    "category": "General"
  },
  {
    "id": "haematuria",
    "name": "Haematuria",
    "banglaName": "প্রস্রাবে রক্ত",
    "severity": "moderate",
    "banglaSymptoms": [
      "প্রস্রাব লাল বা গোলাপি",
      "প্রস্রাবের সময় জ্বালা বা ব্যথা",
      "কোমর ব্যথা",
      "জ্বর হতে পারে।"
    ],
    "commonSymptoms": [
      "প্রস্রাব লাল বা গোলাপি",
      "প্রস্রাবের সময় জ্বালা বা ব্যথা",
      "কোমর ব্যথা",
      "জ্বর হতে পারে।"
    ],
    "investigations": [
      {
        "label": "ইউরিনালাইসিস (RBC)",
        "note": ""
      },
      {
        "label": "ইউরিন কালচার",
        "note": ""
      },
      {
        "label": "সিস্টোস্কোপি",
        "note": ""
      },
      {
        "label": "সিটি স্ক্যান।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Haematuria, burning - Cantharis",
      "Painless - Phosphorus",
      "Smoky urine - Terebinthina",
      "Clots - Sabina।"
    ],
    "mainRemedies": [
      "Cantharis",
      "Apis",
      "Phosphorus",
      "Terebinthina",
      "Sepia"
    ],
    "medicineDetails": [
      {
        "name": "Cantharis",
        "symptoms": "জ্বালাপোড়া সহ",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Apis",
        "symptoms": "ব্যথাহীন বা ফোঁটা ফোঁটা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Phosphorus",
        "symptoms": "ব্যথাহীন, দীর্ঘস্থায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Terebinthina",
        "symptoms": "স্মোকি প্রস্রাব",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Sepia",
        "symptoms": "মেনোপজ পরবর্তী।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "অ্যানিমিয়া",
      "রেনাল ফেইলিওর (কারণভেদে)।"
    ],
    "summary": "সংক্রমণ, পাথর, টিউমার ইত্যাদি। কারণ নির্ণয় আবশ্যক।",
    "section": "Section J: মূত্রতন্ত্র",
    "category": "Urinary/Male Reproductive"
  },
  {
    "id": "haemorrhoids",
    "name": "Haemorrhoids",
    "banglaName": "পাইলস",
    "severity": "moderate",
    "banglaSymptoms": [
      "পায়ুপথের ভেতর বা বাইরে ফোলা শিরা",
      "বসলে ব্যথা",
      "চুলকানি",
      "মলত্যাগের সময় রক্তপাত (উজ্জ্বল লাল)",
      "মলত্যাগের পর তাগিদ।"
    ],
    "commonSymptoms": [
      "পায়ুপথের ভেতর বা বাইরে ফোলা শিরা",
      "বসলে ব্যথা",
      "চুলকানি",
      "মলত্যাগের সময় রক্তপাত (উজ্জ্বল লাল)",
      "মলত্যাগের পর তাগিদ।"
    ],
    "investigations": [
      {
        "label": "ডিজিটাল রেক্টাল পরীক্ষা",
        "note": ""
      },
      {
        "label": "প্রোক্টোস্কোপি।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Haemorrhoids, bleeding - Hamamelis",
      "Backache - Aesculus",
      "Constipation with piles - Nux vomica",
      "Jelly-like mucous - Aloe",
      "Pregnancy - Collinsonia।"
    ],
    "mainRemedies": [
      "Hamamelis",
      "Aesculus",
      "Nux vomica",
      "Aloe",
      "Collinsonia"
    ],
    "medicineDetails": [
      {
        "name": "Hamamelis",
        "symptoms": "রক্তপাত সহ, কোমল",
        "potency": "Q",
        "priority": "1st Choice"
      },
      {
        "name": "Aesculus",
        "symptoms": "পিঠে ব্যথা, পায়ুতে চাপ",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Nux vomica",
        "symptoms": "কোষ্ঠকাঠিন্য থেকে",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Aloe",
        "symptoms": "জেলি মতো স্রাব",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Collinsonia",
        "symptoms": "গর্ভাবস্থায়।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "থ্রোম্বোসিস",
      "স্ট্র্যাংগুলেশন।"
    ],
    "summary": "ভেরিকোজ শিরা। Hamamelis ও Aesculus স্মরণীয়।",
    "section": "Section E: পরিপাকতন্ত্র",
    "category": "Gastrointestinal"
  },
  {
    "id": "hernia",
    "name": "Hernia",
    "banglaName": "হার্নিয়া – অন্ত্রবৃদ্ধি",
    "severity": "moderate",
    "banglaSymptoms": [
      "পেট বা কোমরে স্ফীতি",
      "কাশলে বা ওজন তুললে বেড়ে যাওয়া",
      "ব্যথা বা চাপ অনুভব",
      "বমি বমি ভাব (স্ট্র্যাংগুলেশন হলে)।"
    ],
    "commonSymptoms": [
      "পেট বা কোমরে স্ফীতি",
      "কাশলে বা ওজন তুললে বেড়ে যাওয়া",
      "ব্যথা বা চাপ অনুভব",
      "বমি বমি ভাব (স্ট্র্যাংগুলেশন হলে)।"
    ],
    "investigations": [
      {
        "label": "শারীরিক পরীক্ষা",
        "note": ""
      },
      {
        "label": "আলট্রাসাউন্ড।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Hernia, inguinal - Nux vomica",
      "Right side - Lycopodium",
      "Umbilical - Calcarea carb",
      "After strain - Rhus tox।"
    ],
    "mainRemedies": [
      "Nux vomica",
      "Lycopodium",
      "Rhus tox",
      "Calcarea fluorica",
      "Silicea"
    ],
    "medicineDetails": [
      {
        "name": "Nux vomica",
        "symptoms": "স্ট্র্যাংগুলেশন",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Lycopodium",
        "symptoms": "ডান দিকের ইঙ্গুইনাল হার্নিয়া",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Rhus tox",
        "symptoms": "নড়াচড়ায় খারাপ",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Calcarea fluorica",
        "symptoms": "শক্ত স্ফীতি",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Silicea",
        "symptoms": "ছোট শিশু।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "স্ট্র্যাংগুলেশন",
      "বন্ধ্যাত্ব।"
    ],
    "summary": "দুর্বল পেশি দিয়ে অঙ্গ বেরিয়ে আসা। Lycopodium ও Nux vomica সহায়ক।",
    "section": "Section A: জ্বর ও সংক্রামক রোগ",
    "category": "General"
  },
  {
    "id": "herpes",
    "name": "Herpes",
    "banglaName": "হার্পিস – ঠাণ্ডা ঘা",
    "severity": "moderate",
    "banglaSymptoms": [
      "ঠোঁটে বা যৌনাঙ্গে পানি ভরা ফোস্কা",
      "জ্বালাপোড়া",
      "চুলকানি",
      "ফোস্কা ফেটে ঘা হয়",
      "বারবার হয়।"
    ],
    "commonSymptoms": [
      "ঠোঁটে বা যৌনাঙ্গে পানি ভরা ফোস্কা",
      "জ্বালাপোড়া",
      "চুলকানি",
      "ফোস্কা ফেটে ঘা হয়",
      "বারবার হয়।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল",
        "note": ""
      },
      {
        "label": "টজাংক স্মিয়ার।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Herpes, cold sores - Natrum mur",
      "Vesicular - Rhus tox",
      "Burning - Ars",
      "Crusty - Mezereum",
      "Recurrent - Sepia।"
    ],
    "mainRemedies": [
      "Natrum mur",
      "Rhus tox",
      "Arsenicum album",
      "Mezereum",
      "Graphites"
    ],
    "medicineDetails": [
      {
        "name": "Natrum mur",
        "symptoms": "ঠোঁটের কোণে",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Rhus tox",
        "symptoms": "জলীয় ফোস্কা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Arsenicum album",
        "symptoms": "দগ্ধ সংবেদন",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Mezereum",
        "symptoms": "খোসা সহ",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Graphites",
        "symptoms": "পুরু স্রাব।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "পোস্টহার্পেটিক নিউরালজিয়া।"
    ],
    "summary": "হার্পিস সিমপ্লেক্স ভাইরাস। Natrum mur ও Rhus tox প্রথম সারি।",
    "section": "Section L: চোখ ও কানের রোগ",
    "category": "ENT/Eye"
  },
  {
    "id": "high-blood-pressure",
    "name": "High Blood Pressure",
    "banglaName": "উচ্চ রক্তচাপ",
    "severity": "moderate",
    "banglaSymptoms": [
      "প্রায়ই উপসর্গহীন। মাথাব্যথা",
      "মাথা ঘোরা",
      "চোখের সামনে ঘোলা",
      "ধড়ফড়",
      "নাক দিয়ে রক্ত",
      "ক্লান্তি।"
    ],
    "commonSymptoms": [
      "প্রায়ই উপসর্গহীন। মাথাব্যথা",
      "মাথা ঘোরা",
      "চোখের সামনে ঘোলা",
      "ধড়ফড়",
      "নাক দিয়ে রক্ত",
      "ক্লান্তি।"
    ],
    "investigations": [
      {
        "label": "বারবার রক্তচাপ মাপা (সিস্টোলিক >= ১৪০",
        "note": ""
      },
      {
        "label": "ডায়াস্টোলিক >= ৯০)।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Hypertension, flushing - Glonoinum",
      "Menopausal - Lachesis",
      "Arteriosclerosis - Aurum",
      "Throbbing headache - Belladonna।"
    ],
    "mainRemedies": [
      "Glonoinum",
      "Lachesis",
      "Aurum met",
      "Belladonna",
      "Rauwolfia"
    ],
    "medicineDetails": [
      {
        "name": "Glonoinum",
        "symptoms": "রক্তচাপ হঠাৎ বেড়ে যাওয়া, মাথা গরম",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Lachesis",
        "symptoms": "মেনোপজের সময়",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Aurum met",
        "symptoms": "অ্যাথেরোস্ক্লেরোসিস সহ",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Belladonna",
        "symptoms": "হঠাৎ লাল মাথা, স্পন্দন",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Rauwolfia",
        "symptoms": "সাপ্তাহিক, দীর্ঘস্থায়ী।",
        "potency": "Q",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "হার্ট অ্যাটাক",
      "স্ট্রোক",
      "রেনাল ফেইলিওর।"
    ],
    "summary": "নিরব ঘাতক। Glonoinum ও Belladonna অ্যাকিউট জরুরি অবস্থায় কাজে লাগে।",
    "section": "Section L: চোখ ও কানের রোগ",
    "category": "ENT/Eye"
  },
  {
    "id": "hiccough",
    "name": "Hiccough",
    "banglaName": "হেঁচকি",
    "severity": "moderate",
    "banglaSymptoms": [
      "অনিয়ন্ত্রিত ডায়াফ্রামের সংকোচন",
      "হিক শব্দ",
      "খাওয়ার পর বা মানসিক চাপে বেড়ে।"
    ],
    "commonSymptoms": [
      "অনিয়ন্ত্রিত ডায়াফ্রামের সংকোচন",
      "হিক শব্দ",
      "খাওয়ার পর বা মানসিক চাপে বেড়ে।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Hiccough, spasmodic - Cicuta",
      "After grief - Ignatia",
      "With indigestion - Nux vomica",
      "Relieved by warm drinks - Magnesia phos।"
    ],
    "mainRemedies": [
      "Cicuta virosa",
      "Ignatia",
      "Nux vomica",
      "Magnesia phos",
      "Hydrocyanic acid"
    ],
    "medicineDetails": [
      {
        "name": "Cicuta virosa",
        "symptoms": "প্রচণ্ড",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Ignatia",
        "symptoms": "শোকে, খাওয়ার সময়",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Nux vomica",
        "symptoms": "পেটের সমস্যা সহ",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Magnesia phos",
        "symptoms": "গরমে ভাল",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Hydrocyanic acid",
        "symptoms": "মরণাপন্ন অবস্থায়।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "ডিহাইড্রেশন",
      "ক্লান্তি।"
    ],
    "summary": "সাধারণত সাময়িক। Ignatia ও Nux vomica উত্তম।",
    "section": "Section D: স্নায়ুতন্ত্র ও মানসিক",
    "category": "Neurological/Psychological"
  },
  {
    "id": "hydrocele",
    "name": "Hydrocele",
    "banglaName": "অণ্ডকোষে পানি জমা",
    "severity": "moderate",
    "banglaSymptoms": [
      "অণ্ডকোষ ফুলে যাওয়া",
      "ব্যথা নেই (প্রাথমিক)",
      "স্পর্শে নরম",
      "ট্রান্সইল্যুমিনেশন পজিটিভ।"
    ],
    "commonSymptoms": [
      "অণ্ডকোষ ফুলে যাওয়া",
      "ব্যথা নেই (প্রাথমিক)",
      "স্পর্শে নরম",
      "ট্রান্সইল্যুমিনেশন পজিটিভ।"
    ],
    "investigations": [
      {
        "label": "শারীরিক পরীক্ষা",
        "note": ""
      },
      {
        "label": "আলট্রাসাউন্ড (ইনগুইনাল হার্নিয়া বাদে)।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Hydrocele, painless swelling - Apis",
      "Worse in wet weather - Rhododendron",
      "Congenital - Pulsatilla",
      "Chronic - Silicea।"
    ],
    "mainRemedies": [
      "Apis mellifica",
      "Rhododendron",
      "Pulsatilla",
      "Silicea",
      "Iodum"
    ],
    "medicineDetails": [
      {
        "name": "Apis mellifica",
        "symptoms": "হঠাৎ ফুলে",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Rhododendron",
        "symptoms": "আবহাওয়া পরিবর্তনে",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Pulsatilla",
        "symptoms": "শিশুদের, কান্নাকাটি",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Silicea",
        "symptoms": "পুরনো",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Iodum",
        "symptoms": "শক্ত ফোলা।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "হার্নিয়া",
      "সংক্রমণ।"
    ],
    "summary": "টিউনিকা ভ্যাজাইনালিসের ভেতর তরল জমা। Apis ও Rhododendron প্রধান।",
    "section": "Section J: মূত্রতন্ত্র",
    "category": "Urinary/Male Reproductive"
  },
  {
    "id": "hypothyroidism",
    "name": "Hypothyroidism",
    "banglaName": "থাইরয়েডের অকর্মণ্যতা",
    "severity": "moderate",
    "banglaSymptoms": [
      "ক্লান্তি",
      "ওজন বৃদ্ধি",
      "ঠাণ্ডা সহনশীলতা কম",
      "কোষ্ঠকাঠিন্য",
      "শুষ্ক ত্বক",
      "চুল পড়া",
      "বিষণ্নতা",
      "মন্থর হৃদস্পন্দন।"
    ],
    "commonSymptoms": [
      "ক্লান্তি",
      "ওজন বৃদ্ধি",
      "ঠাণ্ডা সহনশীলতা কম",
      "কোষ্ঠকাঠিন্য",
      "শুষ্ক ত্বক",
      "চুল পড়া",
      "বিষণ্নতা",
      "মন্থর হৃদস্পন্দন।"
    ],
    "investigations": [
      {
        "label": "TSH বেড়ে যাওয়া",
        "note": ""
      },
      {
        "label": "T4 কম",
        "note": ""
      },
      {
        "label": "টেস্ট।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Hypothyroidism, fatigue - Thyroidinum",
      "Cold, sluggish - Calcarea carb",
      "Flatulence - Lycopodium",
      "Hair loss - Sepia",
      "Dry skin - Graphites।"
    ],
    "mainRemedies": [
      "Thyroidinum",
      "Calcarea carbonica",
      "Lycopodium",
      "Sepia",
      "Graphites"
    ],
    "medicineDetails": [
      {
        "name": "Thyroidinum",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "6X",
        "priority": "1st Choice"
      },
      {
        "name": "Calcarea carbonica",
        "symptoms": "স্থূল, ঠাণ্ডা, ঘাম",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Lycopodium",
        "symptoms": "পেট ফাঁপা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Sepia",
        "symptoms": "মাথাব্যথা ও জরায়ুর সমস্যা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Graphites",
        "symptoms": "ত্বক শুষ্ক।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "মাইক্সিডিমা",
      "গলগণ্ড",
      "কার্ডিওমায়োপ্যাথি।"
    ],
    "summary": "থাইরয়েড হরমোনের অভাবে। Thyroidinum ও Calcarea carb সহায়ক।",
    "section": "Section G: ত্বকের রোগ",
    "category": "Skin"
  },
  {
    "id": "insomnia",
    "name": "Insomnia",
    "banglaName": "অনিদ্রা",
    "severity": "moderate",
    "banglaSymptoms": [
      "রাতে ঘুম না হওয়া",
      "বারবার ঘুম ভাঙা",
      "সকালে ক্লান্ত লাগা",
      "খিটখিটে মেজাজ।"
    ],
    "commonSymptoms": [
      "রাতে ঘুম না হওয়া",
      "বারবার ঘুম ভাঙা",
      "সকালে ক্লান্ত লাগা",
      "খিটখিটে মেজাজ।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Insomnia, from joy/excitement - Coffea",
      "Wakes at 3 AM - Nux vomica",
      "From grief - Ignatia",
      "Anxious restlessness - Ars।"
    ],
    "mainRemedies": [
      "Coffea cruda",
      "Passiflora",
      "Nux vomica",
      "Ignatia",
      "Arsenicum album"
    ],
    "medicineDetails": [
      {
        "name": "Coffea cruda",
        "symptoms": "অতি আনন্দে বা চিন্তায় ঘুম না আসা",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Passiflora",
        "symptoms": "সাধারণ অনিদ্রা",
        "potency": "Q",
        "priority": "Medium"
      },
      {
        "name": "Nux vomica",
        "symptoms": "রাত ৩টায় ঘুম ভাঙে",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Ignatia",
        "symptoms": "শোকে",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Arsenicum album",
        "symptoms": "ভয়ে, সকালে।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "মানসিক অবসাদ।"
    ],
    "summary": "Coffea ও Passiflora বিশেষ উপকারী।",
    "section": "Section D: স্নায়ুতন্ত্র ও মানসিক",
    "category": "Neurological/Psychological"
  },
  {
    "id": "kidney-stones",
    "name": "Kidney Stones",
    "banglaName": "কিডনিতে পাথর",
    "severity": "moderate",
    "banglaSymptoms": [
      "পিঠে ও কোমরে তীব্র মোচড়ানো ব্যথা (রেনাল কোলিক)",
      "প্রস্রাবে রক্ত",
      "বমি বমি ভাব",
      "প্রস্রাবে জ্বালা।"
    ],
    "commonSymptoms": [
      "পিঠে ও কোমরে তীব্র মোচড়ানো ব্যথা (রেনাল কোলিক)",
      "প্রস্রাবে রক্ত",
      "বমি বমি ভাব",
      "প্রস্রাবে জ্বালা।"
    ],
    "investigations": [
      {
        "label": "আল্ট্রাসাউন্ড",
        "note": ""
      },
      {
        "label": "এক্স-রে (KUB)।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Kidney stones, left side - Berberis",
      "Right side - Lycopodium",
      "Pain at close of urination - Sarsaparilla",
      "Burning - Cantharis।"
    ],
    "mainRemedies": [
      "Berberis vulgaris",
      "Lycopodium",
      "Cantharis",
      "Sarsaparilla",
      "Hydrangea"
    ],
    "medicineDetails": [
      {
        "name": "Berberis vulgaris",
        "symptoms": "বাম দিকে ব্যথা",
        "potency": "Q",
        "priority": "1st Choice"
      },
      {
        "name": "Lycopodium",
        "symptoms": "ডান দিকে ব্যথা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Cantharis",
        "symptoms": "তীব্র জ্বালা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Sarsaparilla",
        "symptoms": "প্রস্রাবের শেষে ব্যথা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Hydrangea",
        "symptoms": "পাথর ভাঙতে।",
        "potency": "Q",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "হাইড্রোনেফ্রোসিস",
      "প্রস্রাবে সংক্রমণ।"
    ],
    "summary": "মূত্রতন্ত্রে পাথর। Berberis ও Lycopodium অত্যন্ত নির্ভরযোগ্য।",
    "section": "Section J: মূত্রতন্ত্র",
    "category": "Urinary/Male Reproductive"
  },
  {
    "id": "laryngitis",
    "name": "Laryngitis",
    "banglaName": "স্বরযন্ত্রের প্রদাহ",
    "severity": "moderate",
    "banglaSymptoms": [
      "গলা বসা",
      "কথা বলতে কষ্ট",
      "শুষ্ক কাশি",
      "গলা ব্যথা।"
    ],
    "commonSymptoms": [
      "গলা বসা",
      "কথা বলতে কষ্ট",
      "শুষ্ক কাশি",
      "গলা ব্যথা।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল",
        "note": ""
      },
      {
        "label": "ল্যারিঙ্গোস্কোপি।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Laryngitis, dry cough - Spongia",
      "Hoarseness in morning - Causticum",
      "Singers/Speakers - Arg met",
      "Better from cold drinks - Phosphorus।"
    ],
    "mainRemedies": [
      "Spongia",
      "ঘেউ ঘেউ কাশি)",
      "Phosphorus",
      "গলা খুসখুস)",
      "Causticum",
      "Argentum metallicum"
    ],
    "medicineDetails": [
      {
        "name": "Spongia",
        "symptoms": "শুকনো",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "ঘেউ ঘেউ কাশি)",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Phosphorus",
        "symptoms": "বিকালে বাড়ে",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "গলা খুসখুস)",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Causticum",
        "symptoms": "সকালে গলা ভাঙে",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Argentum metallicum",
        "symptoms": "বক্তাদের গলা বসা।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "ক্রনিক ল্যারিঞ্জাইটিস।"
    ],
    "summary": "স্বরনালীর প্রদাহ। Spongia ও Phosphorus প্রধান।",
    "section": "Section C: শ্বাসতন্ত্রের রোগ",
    "category": "Respiratory"
  },
  {
    "id": "measles",
    "name": "Measles",
    "banglaName": "হাম",
    "severity": "moderate",
    "banglaSymptoms": [
      "জ্বর",
      "সর্দি",
      "কাশি",
      "চোখ লাল (কনজাংটিভাইটিস)",
      "ত্বকে লাল ফুসকুড়ি (মাথা থেকে শুরু)",
      "কপলিক স্পট।"
    ],
    "commonSymptoms": [
      "জ্বর",
      "সর্দি",
      "কাশি",
      "চোখ লাল (কনজাংটিভাইটিস)",
      "ত্বকে লাল ফুসকুড়ি (মাথা থেকে শুরু)",
      "কপলিক স্পট।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল (লক্ষণভিত্তিক)।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Measles, slow eruption - Pulsatilla",
      "Retrocession - Bryonia",
      "Watery eyes - Euphrasia।"
    ],
    "mainRemedies": [
      "Pulsatilla",
      "তৃষ্ণাহীন)",
      "Morbillinum",
      "Bryonia",
      "Euphrasia"
    ],
    "medicineDetails": [
      {
        "name": "Pulsatilla",
        "symptoms": "ফুসকুড়ি ধীর",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "তৃষ্ণাহীন)",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Morbillinum",
        "symptoms": "প্রতিরোধক ও চিকিৎসা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Bryonia",
        "symptoms": "ফুসকুড়ি ঠিকমতো না বের হলে",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Euphrasia",
        "symptoms": "চোখে পানি ও আলোকাতর।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "নিউমোনিয়া",
      "ওটিটিস মিডিয়া।"
    ],
    "summary": "শিশুদের ভাইরাসজনিত রোগ। Pulsatilla ক্লাসিক।",
    "section": "Section G: ত্বকের রোগ",
    "category": "Skin"
  },
  {
    "id": "neuralgia",
    "name": "Neuralgia",
    "banglaName": "স্নায়ুশূল",
    "severity": "moderate",
    "banglaSymptoms": [
      "নির্দিষ্ট স্নায়ু বরাবর তীব্র",
      "চমকানো বা বৈদ্যুতিক শকের মতো ব্যথা।"
    ],
    "commonSymptoms": [
      "নির্দিষ্ট স্নায়ু বরাবর তীব্র",
      "চমকানো বা বৈদ্যুতিক শকের মতো ব্যথা।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Neuralgia, shooting pain - Mag phos",
      "Left sided facial - Spigelia",
      "After nerve injury - Hypericum",
      "Sudden - Aconite।"
    ],
    "mainRemedies": [
      "Hypericum",
      "Mag phos",
      "মোচড়ানো)",
      "Spigelia",
      "বিশেষত বাম দিকে)",
      "Kalmia",
      "Aconite"
    ],
    "medicineDetails": [
      {
        "name": "Hypericum",
        "symptoms": "স্নায়ুতে আঘাত",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Mag phos",
        "symptoms": "গরমে আরাম",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "মোচড়ানো)",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Spigelia",
        "symptoms": "মুখমণ্ডলীয়",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "বিশেষত বাম দিকে)",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Kalmia",
        "symptoms": "ব্যথা উপরের দিকে ওঠে",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Aconite",
        "symptoms": "ঠান্ডা লাগার পর হঠাৎ।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "দীর্ঘস্থায়ী ব্যথা।"
    ],
    "summary": "স্নায়ুর প্রদাহ বা চাপ। Hypericum ও Spigelia প্রধান।",
    "section": "Section L: চোখ ও কানের রোগ",
    "category": "ENT/Eye"
  },
  {
    "id": "osteoarthritis",
    "name": "Osteoarthritis",
    "banglaName": "অস্টিওআর্থ্রাইটিস",
    "severity": "moderate",
    "banglaSymptoms": [
      "জয়েন্টে ব্যথা (বিশেষত হাঁটু বা নিতম্ব)",
      "নড়াচড়ায় বাড়ে",
      "বিশ্রামে কমে",
      "জয়েন্ট শক্ত হয়ে যাওয়া (সকালে বা বিশ্রামের পর)।"
    ],
    "commonSymptoms": [
      "জয়েন্টে ব্যথা (বিশেষত হাঁটু বা নিতম্ব)",
      "নড়াচড়ায় বাড়ে",
      "বিশ্রামে কমে",
      "জয়েন্ট শক্ত হয়ে যাওয়া (সকালে বা বিশ্রামের পর)।"
    ],
    "investigations": [
      {
        "label": "এক্স-রে।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Osteoarthritis, worse initial motion - Rhus tox",
      "Worse from motion - Bryonia",
      "Bone nodes - Calcarea fluor",
      "Tendon pain - Ruta।"
    ],
    "mainRemedies": [
      "Rhus tox",
      "একটানা নড়াচড়ায় আরাম)",
      "Bryonia",
      "Calcarea fluorica",
      "Ruta",
      "Kali carbonicum"
    ],
    "medicineDetails": [
      {
        "name": "Rhus tox",
        "symptoms": "প্রথম নড়াচড়ায় ব্যথা",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "একটানা নড়াচড়ায় আরাম)",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Bryonia",
        "symptoms": "নড়াচড়ায় তীব্র ব্যথা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Calcarea fluorica",
        "symptoms": "হাড়ের গঠন পরিবর্তন",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Ruta",
        "symptoms": "পেরিঅস্টিয়াম ও টেন্ডনে ব্যথা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Kali carbonicum",
        "symptoms": "দুর্বলতা সহ।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "গতিশীলতা হ্রাস",
      "জয়েন্ট বিকৃতি।"
    ],
    "summary": "হাড়ের ক্ষয়জনিত বাত। Rhus tox ও Calcarea fluorica নির্দেশিত।",
    "section": "Section A: জ্বর ও সংক্রামক রোগ",
    "category": "General"
  },
  {
    "id": "psoriasis",
    "name": "Psoriasis",
    "banglaName": "সোরিয়াসিস",
    "severity": "moderate",
    "banglaSymptoms": [
      "ত্বকে লাল ছোপ এবং এর উপর সাদা বা রুপালি আঁশ",
      "চুলকানি",
      "ত্বক শুষ্ক ও ফাটল যুক্ত।"
    ],
    "commonSymptoms": [
      "ত্বকে লাল ছোপ এবং এর উপর সাদা বা রুপালি আঁশ",
      "চুলকানি",
      "ত্বক শুষ্ক ও ফাটল যুক্ত।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল",
        "note": ""
      },
      {
        "label": "স্কিন বায়োপসি।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Psoriasis, silver scales - Ars",
      "Winter aggravation - Petroleum",
      "Sticky exudation - Graphites",
      "Itching worse heat - Sulphur।"
    ],
    "mainRemedies": [
      "Arsenicum album",
      "অস্থিরতা)",
      "Graphites",
      "ত্বকে ফাটল)",
      "Sepia",
      "শীতকাতর)",
      "Sulphur",
      "গরমে বাড়ে)",
      "Petroleum"
    ],
    "medicineDetails": [
      {
        "name": "Arsenicum album",
        "symptoms": "শুকনো আঁশ",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "অস্থিরতা)",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Graphites",
        "symptoms": "আঠালো রস",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "ত্বকে ফাটল)",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Sepia",
        "symptoms": "রিং আকৃতির",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "শীতকাতর)",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Sulphur",
        "symptoms": "তীব্র চুলকানি",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "গরমে বাড়ে)",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Petroleum",
        "symptoms": "শীতকালে বাড়ে বা ফাটে।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "সোরিয়াটিক আর্থ্রাইটিস।"
    ],
    "summary": "অটোইমিউন ত্বকের রোগ। Arsenicum ও Petroleum খুব কার্যকর।",
    "section": "Section G: ত্বকের রোগ",
    "category": "Skin"
  },
  {
    "id": "rabies-prevention",
    "name": "Rabies Prevention",
    "banglaName": "জলাতঙ্ক প্রতিরোধ",
    "severity": "moderate",
    "banglaSymptoms": [
      "কুকুর বা প্রাণীর কামড়।"
    ],
    "commonSymptoms": [
      "কুকুর বা প্রাণীর কামড়।"
    ],
    "investigations": [
      {
        "label": "ইতিহাস।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Animal bite - Ledum",
      "Nerve injury - Hypericum",
      "Hydrophobia prophylaxis - Lyssinum।"
    ],
    "mainRemedies": [
      "Lyssinum",
      "Hypericum",
      "Ledum pal",
      "Belladonna"
    ],
    "medicineDetails": [
      {
        "name": "Lyssinum",
        "symptoms": "প্রতিরোধক ও স্নায়বিক উত্তেজনা",
        "potency": "200C",
        "priority": "1st Choice"
      },
      {
        "name": "Hypericum",
        "symptoms": "স্নায়ুযুক্ত স্থানে কামড়",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Ledum pal",
        "symptoms": "তীব্র সুচ ফোটানো আঘাত",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Belladonna",
        "symptoms": "তীব্র স্পন্দন।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "জলাতঙ্ক (মৃত্যু)।"
    ],
    "summary": "মেডিকেল ভ্যাকসিনেশনের পাশাপাশি হোমিওপ্যাথি সহায়ক হতে পারে।",
    "section": "Section A: জ্বর ও সংক্রামক রোগ",
    "category": "General"
  },
  {
    "id": "sciatica",
    "name": "Sciatica",
    "banglaName": "সায়াটিকা",
    "severity": "moderate",
    "banglaSymptoms": [
      "কোমর বা নিতম্ব থেকে শুরু হয়ে পায়ের পেছন দিক দিয়ে নিচ পর্যন্ত তীব্র ব্যথা। ঝিনঝিন করা বা অবশ ভাব।"
    ],
    "commonSymptoms": [
      "কোমর বা নিতম্ব থেকে শুরু হয়ে পায়ের পেছন দিক দিয়ে নিচ পর্যন্ত তীব্র ব্যথা। ঝিনঝিন করা বা অবশ ভাব।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল",
        "note": ""
      },
      {
        "label": "এমআরআই (ডিস্ক প্রল্যাপ্স)।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Sciatica, left side - Colocynthis",
      "With numbness - Gnaphalium",
      "Better heat - Mag phos",
      "Better motion - Rhus tox।"
    ],
    "mainRemedies": [
      "Colocynthis",
      "চাপ দিলে ও ভাঁজ করলে আরাম)",
      "Magnesium phos",
      "গরমে আরাম)",
      "Gnaphalium",
      "Rhus tox"
    ],
    "medicineDetails": [
      {
        "name": "Colocynthis",
        "symptoms": "বাম দিকে",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "চাপ দিলে ও ভাঁজ করলে আরাম)",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Magnesium phos",
        "symptoms": "ডান দিকে",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "গরমে আরাম)",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Gnaphalium",
        "symptoms": "ব্যথার সাথে অবশ ভাব",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Rhus tox",
        "symptoms": "ভিজা ঠান্ডায় বাড়ে।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "পেশি দুর্বলতা",
      "স্নায়ুর ক্ষতি।"
    ],
    "summary": "সায়াটিক স্নায়ুতে চাপ। Colocynthis ও Gnaphalium খুবই উপকারী।",
    "section": "Section A: জ্বর ও সংক্রামক রোগ",
    "category": "General"
  },
  {
    "id": "tinea-corporis",
    "name": "Tinea Corporis",
    "banglaName": "দাদ / রিংওয়ার্ম",
    "severity": "moderate",
    "banglaSymptoms": [
      "ত্বকে গোলাকার বা আংটির মতো লাল দাগ",
      "তীব্র চুলকানি",
      "পরিধি উঁচু এবং মাঝখানটা পরিষ্কার।"
    ],
    "commonSymptoms": [
      "ত্বকে গোলাকার বা আংটির মতো লাল দাগ",
      "তীব্র চুলকানি",
      "পরিধি উঁচু এবং মাঝখানটা পরিষ্কার।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Ringworm, spots - Sepia",
      "Offensive odour - Tellurium",
      "Intercurrent - Bacillinum",
      "Burning - Sulphur।"
    ],
    "mainRemedies": [
      "Sepia",
      "শীতকাতর)",
      "Tellurium",
      "রসুনের মতো গন্ধ)",
      "Bacillinum",
      "মাসে একবার)",
      "Sulphur"
    ],
    "medicineDetails": [
      {
        "name": "Sepia",
        "symptoms": "বসন্তে বাড়ে",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "শীতকাতর)",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Tellurium",
        "symptoms": "শরীরের উভয় দিকে",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "রসুনের মতো গন্ধ)",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Bacillinum",
        "symptoms": "ক্রনিক ক্ষেত্রে",
        "potency": "200C",
        "priority": "Medium"
      },
      {
        "name": "মাসে একবার)",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Sulphur",
        "symptoms": "তীব্র চুলকানি ও জ্বালা।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "গৌণ সংক্রমণ।"
    ],
    "summary": "ছত্রাক সংক্রমণ। Sepia ও Tellurium কার্যকরী।",
    "section": "Section G: ত্বকের রোগ",
    "category": "Skin"
  },
  {
    "id": "urticaria",
    "name": "Urticaria",
    "banglaName": "আমবাত",
    "severity": "moderate",
    "banglaSymptoms": [
      "ত্বকে হঠাৎ লাল চাকা চাকা হয়ে ফুলে ওঠা",
      "তীব্র চুলকানি বা জ্বালা পোড়া",
      "কিছু খেলে বা ঠান্ডায় হতে পারে।"
    ],
    "commonSymptoms": [
      "ত্বকে হঠাৎ লাল চাকা চাকা হয়ে ফুলে ওঠা",
      "তীব্র চুলকানি বা জ্বালা পোড়া",
      "কিছু খেলে বা ঠান্ডায় হতে পারে।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Urticaria, stinging - Apis",
      "From shellfish - Urtica",
      "In cold damp - Rhus tox",
      "After exertion - Natrum mur।"
    ],
    "mainRemedies": [
      "Apis mellifica",
      "ফোলা)",
      "Urtica urens",
      "তীব্র চুলকানি)",
      "Rhus tox",
      "Natrum mur"
    ],
    "medicineDetails": [
      {
        "name": "Apis mellifica",
        "symptoms": "মৌমাছির হুল ফোটানোর মতো জ্বালা",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "ফোলা)",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Urtica urens",
        "symptoms": "সামুদ্রিক খাবার থেকে",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "তীব্র চুলকানি)",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Rhus tox",
        "symptoms": "ঠান্ডায় বা ভেজায় বাড়ে",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Natrum mur",
        "symptoms": "ব্যায়ামের পর বা রোদে।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "অ্যানাফাইল্যাক্সিস (বিরল)।"
    ],
    "summary": "অ্যালার্জিক প্রতিক্রিয়া। Apis ও Urtica urens প্রাথমিক পছন্দ।",
    "section": "Section G: ত্বকের রোগ",
    "category": "Skin"
  },
  {
    "id": "vertigo",
    "name": "Vertigo",
    "banglaName": "মাথা ঘোরা",
    "severity": "moderate",
    "banglaSymptoms": [
      "চারপাশ ঘুরছে এমন অনুভব",
      "বমি বমি ভাব",
      "ভারসাম্য হারানো।"
    ],
    "commonSymptoms": [
      "চারপাশ ঘুরছে এমন অনুভব",
      "বমি বমি ভাব",
      "ভারসাম্য হারানো।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল",
        "note": ""
      },
      {
        "label": "ডিক্স-হলপাইক টেস্ট।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Vertigo, turning in bed - Conium",
      "Motion sickness - Cocculus",
      "Occipital - Gelsemium",
      "Old age - Phosphorus।"
    ],
    "mainRemedies": [
      "Conium",
      "Cocculus",
      "Gelsemium",
      "দৃষ্টি ঝাপসা)",
      "Phosphorus"
    ],
    "medicineDetails": [
      {
        "name": "Conium",
        "symptoms": "শুয়ে থাকলে বা মাথা ঘোরালে",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Cocculus",
        "symptoms": "ভ্রমণে বা ঘুম কম হলে",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Gelsemium",
        "symptoms": "মাথার পেছন থেকে শুরু",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "দৃষ্টি ঝাপসা)",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Phosphorus",
        "symptoms": "বৃদ্ধদের মাথা ঘোরা।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "পড়ে গিয়ে আঘাত।"
    ],
    "summary": "ভারসাম্যতন্ত্রের সমস্যা। Conium ও Cocculus প্রধান।",
    "section": "Section D: স্নায়ুতন্ত্র ও মানসিক",
    "category": "Neurological/Psychological"
  },
  {
    "id": "warts",
    "name": "Warts",
    "banglaName": "আঁচিল",
    "severity": "moderate",
    "banglaSymptoms": [
      "ত্বকে রুক্ষ বা মসৃণ বৃদ্ধি",
      "ব্যথাহীন বা সংবেদনশীল।"
    ],
    "commonSymptoms": [
      "ত্বকে রুক্ষ বা মসৃণ বৃদ্ধি",
      "ব্যথাহীন বা সংবেদনশীল।"
    ],
    "investigations": [
      {
        "label": "ক্লিনিক্যাল।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Warts, cauliflower-like - Thuja",
      "Bleeding/splinter pain - Nitric acid",
      "Horny/soles - Ant crud",
      "Close to nails - Causticum।"
    ],
    "mainRemedies": [
      "Thuja",
      "200C",
      "ফুলকপির মতো আঁচিল)",
      "Nitric acid",
      "রক্তপাত হয় এমন",
      "সুচ ফোটানোর মতো ব্যথা)",
      "Causticum",
      "Antimonium crudum"
    ],
    "medicineDetails": [
      {
        "name": "Thuja",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "200C",
        "symptoms": "প্রধান ওষুধ",
        "potency": "200C",
        "priority": "Medium"
      },
      {
        "name": "ফুলকপির মতো আঁচিল)",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Nitric acid",
        "symptoms": "আঁকড়ে ধরা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "রক্তপাত হয় এমন",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "সুচ ফোটানোর মতো ব্যথা)",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Causticum",
        "symptoms": "মুখমণ্ডল বা নখের আশেপাশে",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Antimonium crudum",
        "symptoms": "পায়ের তলায় শক্ত আঁচিল।",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "কসমেটিক সমস্যা",
      "বড় হওয়া।"
    ],
    "summary": "হিউম্যান প্যাপিলোমা ভাইরাস (HPV)। Thuja অব্যর্থ।",
    "section": "Section G: ত্বকের রোগ",
    "category": "Skin"
  },
  {
    "id": "yellow-fever",
    "name": "Yellow Fever",
    "banglaName": "পীতজ্বর",
    "severity": "moderate",
    "banglaSymptoms": [
      "উচ্চ জ্বর",
      "জন্ডিস",
      "রক্তপাত (বমি)",
      "মাথাব্যথা",
      "পেশি ব্যথা।"
    ],
    "commonSymptoms": [
      "উচ্চ জ্বর",
      "জন্ডিস",
      "রক্তপাত (বমি)",
      "মাথাব্যথা",
      "পেশি ব্যথা।"
    ],
    "investigations": [
      {
        "label": "পিসিআর",
        "note": ""
      },
      {
        "label": "সেরোলজি।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Yellow fever, haemorrhagic - Crotalus hor",
      "Marked prostration - Ars",
      "Hepatic failure - Phosphorus।"
    ],
    "mainRemedies": [
      "Crotalus horridus",
      "জন্ডিস)",
      "Arsenicum album",
      "প্রস্টেশন)",
      "Phosphorus",
      "রক্তপাত)।"
    ],
    "medicineDetails": [
      {
        "name": "Crotalus horridus",
        "symptoms": "রক্তপাত",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "জন্ডিস)",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Arsenicum album",
        "symptoms": "তীব্র অস্থিরতা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "প্রস্টেশন)",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Phosphorus",
        "symptoms": "লিভার ড্যামেজ",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "রক্তপাত)।",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "লিভার ও কিডনি ফেইলিওর",
      "মৃত্যু।"
    ],
    "summary": "মশা বাহিত ভাইরাল রোগ। Crotalus horridus গুরুতর অবস্থায় নির্দেশিত।",
    "section": "Section F: হাড় ও জয়েন্ট",
    "category": "Musculoskeletal"
  },
  {
    "id": "zollinger-ellison-syndrome",
    "name": "Zollinger-Ellison Syndrome",
    "banglaName": "জোলিঞ্জার-এলিসন সিনড্রোম",
    "severity": "moderate",
    "banglaSymptoms": [
      "তীব্র মাত্রায় গ্যাস্ট্রিক আলসার",
      "পেটে ব্যথা",
      "ডায়রিয়া",
      "এসিড রিফ্লাক্স।"
    ],
    "commonSymptoms": [
      "তীব্র মাত্রায় গ্যাস্ট্রিক আলসার",
      "পেটে ব্যথা",
      "ডায়রিয়া",
      "এসিড রিফ্লাক্স।"
    ],
    "investigations": [
      {
        "label": "গ্যাস্ট্রিন হরমোন পরিমাপ",
        "note": ""
      },
      {
        "label": "এন্ডোস্কোপি।",
        "note": ""
      }
    ],
    "repertoryRubrics": [
      "Peptic ulcer, severe burning - Phosphorus",
      "Sour vomiting - Robinia",
      "Duodenal ulcer - Uranium nit।"
    ],
    "mainRemedies": [
      "Uranium nitricum",
      "Robinia",
      "Phosphorus",
      "ঠান্ডা পানীয় পানের ইচ্ছা)।"
    ],
    "medicineDetails": [
      {
        "name": "Uranium nitricum",
        "symptoms": "আলসার ও প্রচুর এসিডিটি",
        "potency": "30C",
        "priority": "1st Choice"
      },
      {
        "name": "Robinia",
        "symptoms": "তীব্র টক বমি",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "Phosphorus",
        "symptoms": "পেটে জ্বালা",
        "potency": "30C",
        "priority": "Medium"
      },
      {
        "name": "ঠান্ডা পানীয় পানের ইচ্ছা)।",
        "symptoms": "লক্ষণ অনুযায়ী",
        "potency": "30C",
        "priority": "Medium"
      }
    ],
    "emergencySigns": [
      "পারফোরেশন",
      "রক্তপাত।"
    ],
    "summary": "গ্যাস্ট্রিনোমা টিউমারের কারণে অতিরিক্ত এসিড। নির্দেশিত লক্ষণভিত্তিক চিকিৎসা।",
    "section": "Section E: পরিপাকতন্ত্র",
    "category": "Gastrointestinal"
  }
];
