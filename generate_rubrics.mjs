
import fs from 'fs';

const mindRubrics = [
  {
    name: "Abandoned", tr: "পরিত্যক্ত",
    sr: [{ name: "Abandoned, general", d: { mind: [{n: "Puls.", g: 3}, {n: "Psor.", g: 2}, {n: "Aur.", g: 2}], general: {} } }]
  },
  {
    name: "Anger", tr: "রাগ",
    sr: [{ name: "Anger, general", d: { mind: [{n: "Cham.", g: 3}, {n: "Nux-v.", g: 3}, {n: "Staph.", g: 3}, {n: "Lyc.", g: 2}], general: {} } }]
  },
  {
    name: "Anxiety", tr: "উদ্বেগ",
    sr: [{ name: "Anxiety, general", d: { mind: [{n: "Ars.", g: 3}, {n: "Acon.", g: 3}, {n: "Phos.", g: 2}, {n: "Arg-n.", g: 2}], general: {} } }]
  },
  {
    name: "Bashful", tr: "লাজুক",
    sr: [{ name: "Bashful, general", d: { mind: [{n: "Bar-c.", g: 3}, {n: "Sil.", g: 2}, {n: "Puls.", g: 2}, {n: "Gels.", g: 2}], general: {} } }]
  },
  {
    name: "Company", tr: "সঙ্গ",
    sr: [
      { name: "Company, aversion to", tr: "সঙ্গ অপছন্দ", d: { mind: [{n: "Ign.", g: 3}, {n: "Nat-m.", g: 3}, {n: "Sep.", g: 3}, {n: "Nux-v.", g: 2}], general: {} } },
      { name: "Company, desire for", tr: "সঙ্গ পছন্দ", d: { mind: [{n: "Phos.", g: 3}, {n: "Puls.", g: 3}, {n: "Stram.", g: 3}, {n: "Bism.", g: 2}], general: {} } }
    ]
  },
  {
    name: "Confidence", tr: "বিশ্বাস",
    sr: [{ name: "Confidence, want of self", tr: "আত্মবিশ্বাসের অভাব", d: { mind: [{n: "Bar-c.", g: 3}, {n: "Lyc.", g: 3}, {n: "Sil.", g: 2}, {n: "Anac.", g: 2}], general: {} } }]
  },
  {
    name: "Confusion", tr: "বিভ্রান্তি",
    sr: [{ name: "Confusion, general", d: { mind: [{n: "Bapt.", g: 3}, {n: "Gels.", g: 3}, {n: "Nux-v.", g: 2}, {n: "Ph-ac.", g: 2}], general: {} } }]
  },
  {
    name: "Death", tr: "মৃত্যু",
    sr: [{ name: "Death, fear of", tr: "মৃত্যু ভয়", d: { mind: [{n: "Acon.", g: 3}, {n: "Ars.", g: 3}, {n: "Gels.", g: 2}, {n: "Nux-v.", g: 2}], general: {} } }]
  },
  {
    name: "Delusions", tr: "বিভ্রম",
    sr: [{ name: "Delusions, general", d: { mind: [{n: "Stram.", g: 3}, {n: "Hyos.", g: 3}, {n: "Lach.", g: 3}, {n: "Cann-i.", g: 3}], general: {} } }]
  },
  {
    name: "Despair", tr: "হতাশা",
    sr: [{ name: "Despair, recovery, of", tr: "নিরাময় সম্পর্কে হতাশা", d: { mind: [{n: "Psor.", g: 3}, {n: "Ars.", g: 2}, {n: "Aur.", g: 3}, {n: "Acon.", g: 2}], general: {} } }]
  },
  {
    name: "Excitement", tr: "উত্তেজনা",
    sr: [{ name: "Excitement, general", d: { mind: [{n: "Coff.", g: 3}, {n: "Acon.", g: 3}, {n: "Cham.", g: 3}, {n: "Nux-v.", g: 2}], general: {} } }]
  },
  {
    name: "Fear", tr: "ভয়",
    sr: [
      { name: "Fear, dark, of", tr: "অন্ধকার ভয়", d: { mind: [{n: "Stram.", g: 3}, {n: "Calc.", g: 2}, {n: "Lyco.", g: 2}], general: {} } },
      { name: "Fear, ghosts, of", tr: "ভূতের ভয়", d: { mind: [{n: "Phos.", g: 3}, {n: "Ars.", g: 2}, {n: "Puls.", g: 2}], general: {} } }
    ]
  },
  {
    name: "Grief", tr: "শোক",
    sr: [{ name: "Grief, silent", tr: "নীরব শোক", d: { mind: [{n: "Ign.", g: 3}, {n: "Nat-m.", g: 3}, {n: "Ph-ac.", g: 3}, {n: "Aur.", g: 2}], general: {} } }]
  },
  {
    name: "Haughty", tr: "অহংকারী",
    sr: [{ name: "Haughty, general", d: { mind: [{n: "Plat.", g: 3}, {n: "Lyco.", g: 3}, {n: "Pall.", g: 2}], general: {} } }]
  },
  {
    name: "Hurry", tr: "তাড়াহুড়ো",
    sr: [{ name: "Hurry, general", d: { mind: [{n: "Arg-n.", g: 3}, {n: "Tarent.", g: 3}, {n: "Lil-t.", g: 2}, {n: "Sulph.", g: 2}], general: {} } }]
  },
  {
    name: "Irritability", tr: "খিটখিটে ভাব",
    sr: [{ name: "Irritability, general", d: { mind: [{n: "Cham.", g: 3}, {n: "Nux-v.", g: 3}, {n: "Bry.", g: 3}, {n: "Hep.", g: 2}], general: {} } }]
  },
  {
    name: "Jealousy", tr: "ঈর্ষা",
    sr: [{ name: "Jealousy, general", d: { mind: [{n: "Hyos.", g: 3}, {n: "Lach.", g: 3}, {n: "Apis", g: 2}, {n: "Puls.", g: 2}], general: {} } }]
  },
  {
    name: "Laughing", tr: "হাসি",
    sr: [{ name: "Laughing, immoderate", tr: "অতিরিক্ত হাসি", d: { mind: [{n: "Cann-i.", g: 3}, {n: "Hyos.", g: 3}, {n: "Stram.", g: 2}], general: {} } }]
  },
  {
    name: "Memory", tr: "স্মৃতি",
    sr: [{ name: "Memory, weakness, of", tr: "স্মৃতিশক্তি হ্রাস", d: { mind: [{n: "Anac.", g: 3}, {n: "Bar-c.", g: 3}, {n: "Ph-ac.", g: 2}, {n: "Lyco.", g: 2}], general: {} } }]
  },
  {
    name: "Night", tr: "রাত",
    sr: [{ name: "Mentals, night", tr: "মানসিক লক্ষণ, রাতে", d: { mind: [{n: "Ars.", g: 3}, {n: "Caust.", g: 2}, {n: "Merc.", g: 3}], general: {} } }]
  },
  {
    name: "Obstinate", tr: "একগুঁয়ে",
    sr: [{ name: "Obstinate, general", d: { mind: [{n: "Calc.", g: 3}, {n: "Sil.", g: 2}, {n: "Cham.", g: 3}, {n: "Nux-v.", g: 2}], general: {} } }]
  },
  {
    name: "Peevish", tr: "খিটখিটে",
    sr: [{ name: "Peevish, general", d: { mind: [{n: "Cham.", g: 3}, {n: "Cina", g: 3}, {n: "Ant-c.", g: 3}], general: {} } }]
  },
  {
    name: "Quarrelsome", tr: "ঝগড়াটে",
    sr: [{ name: "Quarrelsome, general", d: { mind: [{n: "Cham.", g: 3}, {n: "Nux-v.", g: 3}, {n: "Lach.", g: 2}, {n: "Hep.", g: 2}], general: {} } }]
  },
  {
    name: "Restlessness", tr: "অস্থিরতা",
    sr: [{ name: "Restlessness, general", d: { mind: [{n: "Acon.", g: 3}, {n: "Ars.", g: 3}, {n: "Rhus-t.", g: 3}, {n: "Arg-n.", g: 2}], general: {} } }]
  },
  {
    name: "Sadness", tr: "বিষণ্নতা",
    sr: [{ name: "Sadness, general", d: { mind: [{n: "Ign.", g: 3}, {n: "Nat-m.", g: 3}, {n: "Sep.", g: 3}, {n: "Aur.", g: 3}, {n: "Puls.", g: 2}], general: {} } }]
  },
  {
    name: "Suicidal", tr: "আত্মঘাতী",
    sr: [{ name: "Suicidal, disposition", tr: "আত্মহত্যার প্রবণতা", d: { mind: [{n: "Aur.", g: 3}, {n: "Naja", g: 2}, {n: "Nat-s.", g: 2}], general: {} } }]
  },
  {
    name: "Timid", tr: "ভীরু",
    sr: [{ name: "Timid, general", d: { mind: [{n: "Bar-c.", g: 3}, {n: "Sil.", g: 3}, {n: "Puls.", g: 2}, {n: "Calc.", g: 2}], general: {} } }]
  },
  {
    name: "Unconscious", tr: "অচেতন",
    sr: [{ name: "Unconscious, general", d: { mind: [{n: "Hell.", g: 3}, {n: "Op.", g: 3}, {n: "Apis", g: 2}, {n: "Gels.", g: 2}], general: {} } }]
  },
  {
    name: "Viper", tr: "সর্পবৎ",
    sr: [{ name: "Malicious", tr: "বিদ্বেষপরায়ণ", d: { mind: [{n: "Lach.", g: 3}, {n: "Hyos.", g: 2}, {n: "Anac.", g: 3}], general: {} } }]
  },
  {
    name: "Weeping", tr: "ক্রন্দন",
    sr: [{ name: "Weeping, tendency", tr: "কাঁদ কাঁদ ভাব", d: { mind: [{n: "Puls.", g: 3}, {n: "Ign.", g: 3}, {n: "Nat-m.", g: 2}, {n: "Sep.", g: 2}, {n: "Lyc.", g: 2}], general: {} } }]
  },
  {
    name: "Yielding", tr: "নতিস্বীকার",
    sr: [{ name: "Yielding, disposition", tr: "উদার স্বভাব", d: { mind: [{n: "Puls.", g: 3}, {n: "Sil.", g: 2}, {n: "Calc.", g: 2}], general: {} } }]
  },
  {
    name: "Zealous", tr: "উৎসাহী",
    sr: [{ name: "Zealous, general", d: { mind: [{n: "Nux-v.", g: 3}, {n: "Sulph.", g: 2}], general: {} } }]
  }
];

const generalitiesRubrics = [
  {
    name: "Abscess", tr: "ফোঁড়া",
    sr: [{ name: "Abscess, general", d: { general: { g_patho: [{n: "Hep.", g: 3}, {n: "Sil.", g: 3}, {n: "Merc.", g: 3}, {n: "Bell.", g: 2}] } } }]
  },
  {
    name: "Anemia", tr: "রক্তাল্পতা",
    sr: [{ name: "Anemia, general", d: { general: { g_patho: [{n: "Ferr.", g: 3}, {n: "Chin.", g: 3}, {n: "Nat-m.", g: 3}, {n: "Calc-p.", g: 2}] } } }]
  },
  {
    name: "Bathing", tr: "স্নান",
    sr: [{ name: "Bathing, aversion to", tr: "স্নানে অনিচ্ছা", d: { general: { g_phys: [{n: "Sulph.", g: 3}, {n: "Ant-c.", g: 3}, {n: "Psor.", g: 2}] } } }]
  },
  {
    name: "Cancer", tr: "ক্যান্সার",
    sr: [{ name: "Cancerous, affections", tr: "ক্যান্সার জনিত পীড়া", d: { general: { g_patho: [{n: "Ars.", g: 3}, {n: "Con.", g: 3}, {n: "Phyt.", g: 3}, {n: "Hydr.", g: 2}] } } }]
  },
  {
    name: "Cold", tr: "ঠান্ডা",
    sr: [
      { name: "Cold, in general", tr: "ঠান্ডা, সাধারণভাবে", d: { general: { g_temp: [{n: "Hep.", g: 3}, {n: "Sil.", g: 3}, {n: "Psor.", g: 3}, {n: "Ars.", g: 3}] } } },
      { name: "Cold, air, agg", tr: "ঠান্ডা বাতাসে বৃদ্ধি", d: { general: { g_temp: [{n: "Hep.", g: 3}, {n: "Sil.", g: 3}, {n: "Rhus-t.", g: 3}] } } }
    ]
  },
  {
    name: "Dropsy", tr: "শোথ",
    sr: [{ name: "Dropsy, general", d: { general: { g_patho: [{n: "Apis", g: 3}, {n: "Ars.", g: 3}, {n: "Dig.", g: 3}, {n: "Hell.", g: 2}] } } }]
  },
  {
    name: "Food", tr: "খাদ্য",
    sr: [
      { name: "Food, sweets, desire", tr: "মিষ্টি পছন্দ", d: { general: { g_crav: [{n: "Arg-n.", g: 3}, {n: "Lyc.", g: 3}, {n: "Sulph.", g: 3}, {n: "Calc.", g: 2}] } } },
      { name: "Food, salt, desire", tr: "লবণ পছন্দ", d: { general: { g_crav: [{n: "Nat-m.", g: 3}, {n: "Phos.", g: 3}, {n: "Arg-n.", g: 2}] } } }
    ]
  },
  {
    name: "Heat", tr: "উত্তাপ / গরম",
    sr: [{ name: "Heat, lack of vital", tr: "জীবনী শক্তির উত্তাপের অভাব", d: { general: { g_temp: [{n: "Sil.", g: 3}, {n: "Psor.", g: 3}, {n: "Led.", g: 3}, {n: "Sep.", g: 2}] } } }]
  },
  {
    name: "Injury", tr: "আঘাত",
    sr: [{ name: "Injuries, general", d: { general: { g_phys: [{n: "Arn.", g: 3}, {n: "Hyper.", g: 3}, {n: "Ruta", g: 3}, {n: "Led.", g: 2}] } } }]
  },
  {
    name: "Motion", tr: "নড়াচড়া",
    sr: [
      { name: "Motion, agg", tr: "নড়াচড়ায় বৃদ্ধি", d: { general: { g_phys: [{n: "Bry.", g: 3}, {n: "Ran-b.", g: 2}, {n: "Bell.", g: 2}] } } },
      { name: "Motion, amel", tr: "নড়াচড়ায় উপশম", d: { general: { g_phys: [{n: "Rhus-t.", g: 3}, {n: "Puls.", g: 3}, {n: "Ferr.", g: 2}] } } }
    ]
  },
  {
    name: "Obesity", tr: "স্থূলতা",
    sr: [{ name: "Obesity, general", d: { general: { g_patho: [{n: "Calc.", g: 3}, {n: "Graph.", g: 3}, {n: "Am-c.", g: 2}, {n: "Ferr.", g: 2}] } } }]
  },
  {
    name: "Pain", tr: "ব্যথা",
    sr: [{ name: "Pain, general", d: { general: { g_patho: [{n: "Acon.", g: 3}, {n: "Cham.", g: 3}, {n: "Coff.", g: 3}, {n: "Mag-p.", g: 2}] } } }]
  },
  {
    name: "Quivering", tr: "কাঁপুনি",
    sr: [{ name: "Quivering, general", d: { general: { g_phys: [{n: "Gels.", g: 3}, {n: "Arg-n.", g: 2}, {n: "Cocc.", g: 2}] } } }]
  },
  {
    name: "Side", tr: "পার্শ্ব",
    sr: [
      { name: "Side, right", tr: "ডান দিক", d: { general: { g_side: [{n: "Lyc.", g: 3}, {n: "Bell.", g: 3}, {n: "Chel.", g: 3}, {n: "Apis", g: 3}] } } },
      { name: "Side, left", tr: "বাম দিক", d: { general: { g_side: [{n: "Lach.", g: 3}, {n: "Phos.", g: 3}, {n: "Sep.", g: 3}, {n: "Spig.", g: 3}] } } }
    ]
  },
  {
    name: "Weather", tr: "আবহাওয়া",
    sr: [
      { name: "Weather, damp, agg", tr: "স্যাঁতস্যাঁতে আবহাওয়ায় বৃদ্ধি", d: { general: { g_temp: [{n: "Rhus-t.", g: 3}, {n: "Dulc.", g: 3}, {n: "Nat-s.", g: 3}] } } },
      { name: "Weather, dry, agg", tr: "শুষ্ক আবহাওয়ায় বৃদ্ধি", d: { general: { g_temp: [{n: "Caust.", g: 3}, {n: "Hep.", g: 3}, {n: "Nux-v.", g: 2}] } } }
    ]
  },
  {
    name: "X-ray", tr: "এক্স-রে",
    sr: [{ name: "X-ray, general", d: { general: { g_patho: [{n: "X-ray", g: 3}, {n: "Phos.", g: 2}, {n: "Rad-br.", g: 2}] } } }]
  },
  {
    name: "Youth", tr: "যৌবন",
    sr: [{ name: "Premature, old age", tr: "অকাল বার্ধক্য", d: { general: { g_patho: [{n: "Bar-c.", g: 3}, {n: "Ambr.", g: 3}, {n: "Arg-n.", g: 2}] } } }]
  }
];

function formatRubrics(rubrics) {
  return JSON.stringify(rubrics, null, 2).substring(1, JSON.stringify(rubrics, null, 2).length - 1);
}

const headRemedies = [{n: "Bell.", g: 3}, {n: "Bry.", g: 3}, {n: "Nux-v.", g: 3}, {n: "Gels.", g: 2}, {n: "Nat-m.", g: 2}];

const extremitiesRemedies = [{n: "Rhus-t.", g: 3}, {n: "Bry.", g: 3}, {n: "Led.", g: 2}, {n: "Caust.", g: 2}];

// I will now overwrite the Mind rubrics and Generalities rubrics.
// Actually, I'll just write the full objects in the script and print them to be used in edit_file.

console.log('MIND_RUBRICS_START');
console.log(JSON.stringify(mindRubrics, null, 2).slice(1, -1));
console.log('MIND_RUBRICS_END');

console.log('GEN_RUBRICS_START');
console.log(JSON.stringify(generalitiesRubrics, null, 2).slice(1, -1));
console.log('GEN_RUBRICS_END');
