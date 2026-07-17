import fs from 'fs';
import { DIAGNOSES_DATA } from './src/practiceMedicineData';

const data = `88. Kidney Stones (কিডনিতে পাথর)
লক্ষণ: পিঠে ও কোমরে তীব্র মোচড়ানো ব্যথা (রেনাল কোলিক), প্রস্রাবে রক্ত, বমি বমি ভাব, প্রস্রাবে জ্বালা।
রোগ নির্ণয়: আল্ট্রাসাউন্ড, এক্স-রে (KUB)।
হোমিওপ্যাথি ওষুধ: Berberis vulgaris Q (বাম দিকে ব্যথা), Lycopodium 30C (ডান দিকে ব্যথা), Cantharis 30C (তীব্র জ্বালা), Sarsaparilla 30C (প্রস্রাবের শেষে ব্যথা), Hydrangea Q (পাথর ভাঙতে)।
রেপাটরি: Kidney stones, left side - Berberis; Right side - Lycopodium; Pain at close of urination - Sarsaparilla; Burning - Cantharis।
জটিলতা: হাইড্রোনেফ্রোসিস, প্রস্রাবে সংক্রমণ।
সারাংশ: মূত্রতন্ত্রে পাথর। Berberis ও Lycopodium অত্যন্ত নির্ভরযোগ্য।

89. Laryngitis (স্বরযন্ত্রের প্রদাহ)
লক্ষণ: গলা বসা, কথা বলতে কষ্ট, শুষ্ক কাশি, গলা ব্যথা।
রোগ নির্ণয়: ক্লিনিক্যাল, ল্যারিঙ্গোস্কোপি।
হোমিওপ্যাথি ওষুধ: Spongia 30C (শুকনো, ঘেউ ঘেউ কাশি), Phosphorus 30C (বিকালে বাড়ে, গলা খুসখুস), Causticum 30C (সকালে গলা ভাঙে), Argentum metallicum 30C (বক্তাদের গলা বসা)।
রেপাটরি: Laryngitis, dry cough - Spongia; Hoarseness in morning - Causticum; Singers/Speakers - Arg met; Better from cold drinks - Phosphorus।
জটিলতা: ক্রনিক ল্যারিঞ্জাইটিস।
সারাংশ: স্বরনালীর প্রদাহ। Spongia ও Phosphorus প্রধান।

90. Measles (হাম)
লক্ষণ: জ্বর, সর্দি, কাশি, চোখ লাল (কনজাংটিভাইটিস), ত্বকে লাল ফুসকুড়ি (মাথা থেকে শুরু), কপলিক স্পট।
রোগ নির্ণয়: ক্লিনিক্যাল (লক্ষণভিত্তিক)।
হোমিওপ্যাথি ওষুধ: Pulsatilla 30C (ফুসকুড়ি ধীর, তৃষ্ণাহীন), Morbillinum 30C (প্রতিরোধক ও চিকিৎসা), Bryonia 30C (ফুসকুড়ি ঠিকমতো না বের হলে), Euphrasia 30C (চোখে পানি ও আলোকাতর)।
রেপাটরি: Measles, slow eruption - Pulsatilla; Retrocession - Bryonia; Watery eyes - Euphrasia।
জটিলতা: নিউমোনিয়া, ওটিটিস মিডিয়া।
সারাংশ: শিশুদের ভাইরাসজনিত রোগ। Pulsatilla ক্লাসিক।

91. Neuralgia (স্নায়ুশূল)
লক্ষণ: নির্দিষ্ট স্নায়ু বরাবর তীব্র, চমকানো বা বৈদ্যুতিক শকের মতো ব্যথা।
রোগ নির্ণয়: ক্লিনিক্যাল।
হোমিওপ্যাথি ওষুধ: Hypericum 30C (স্নায়ুতে আঘাত), Mag phos 30C (গরমে আরাম, মোচড়ানো), Spigelia 30C (মুখমণ্ডলীয়, বিশেষত বাম দিকে), Kalmia 30C (ব্যথা উপরের দিকে ওঠে), Aconite 30C (ঠান্ডা লাগার পর হঠাৎ)।
রেপাটরি: Neuralgia, shooting pain - Mag phos; Left sided facial - Spigelia; After nerve injury - Hypericum; Sudden - Aconite।
জটিলতা: দীর্ঘস্থায়ী ব্যথা।
সারাংশ: স্নায়ুর প্রদাহ বা চাপ। Hypericum ও Spigelia প্রধান।

92. Osteoarthritis (অস্টিওআর্থ্রাইটিস)
লক্ষণ: জয়েন্টে ব্যথা (বিশেষত হাঁটু বা নিতম্ব), নড়াচড়ায় বাড়ে, বিশ্রামে কমে, জয়েন্ট শক্ত হয়ে যাওয়া (সকালে বা বিশ্রামের পর)।
রোগ নির্ণয়: এক্স-রে।
হোমিওপ্যাথি ওষুধ: Rhus tox 30C (প্রথম নড়াচড়ায় ব্যথা, একটানা নড়াচড়ায় আরাম), Bryonia 30C (নড়াচড়ায় তীব্র ব্যথা), Calcarea fluorica 30C (হাড়ের গঠন পরিবর্তন), Ruta 30C (পেরিঅস্টিয়াম ও টেন্ডনে ব্যথা), Kali carbonicum 30C (দুর্বলতা সহ)।
রেপাটরি: Osteoarthritis, worse initial motion - Rhus tox; Worse from motion - Bryonia; Bone nodes - Calcarea fluor; Tendon pain - Ruta।
জটিলতা: গতিশীলতা হ্রাস, জয়েন্ট বিকৃতি।
সারাংশ: হাড়ের ক্ষয়জনিত বাত। Rhus tox ও Calcarea fluorica নির্দেশিত।

93. Psoriasis (সোরিয়াসিস)
লক্ষণ: ত্বকে লাল ছোপ এবং এর উপর সাদা বা রুপালি আঁশ, চুলকানি, ত্বক শুষ্ক ও ফাটল যুক্ত।
রোগ নির্ণয়: ক্লিনিক্যাল, স্কিন বায়োপসি।
হোমিওপ্যাথি ওষুধ: Arsenicum album 30C (শুকনো আঁশ, অস্থিরতা), Graphites 30C (আঠালো রস, ত্বকে ফাটল), Sepia 30C (রিং আকৃতির, শীতকাতর), Sulphur 30C (তীব্র চুলকানি, গরমে বাড়ে), Petroleum 30C (শীতকালে বাড়ে বা ফাটে)।
রেপাটরি: Psoriasis, silver scales - Ars; Winter aggravation - Petroleum; Sticky exudation - Graphites; Itching worse heat - Sulphur।
জটিলতা: সোরিয়াটিক আর্থ্রাইটিস।
সারাংশ: অটোইমিউন ত্বকের রোগ। Arsenicum ও Petroleum খুব কার্যকর।

94. Rabies Prevention (জলাতঙ্ক প্রতিরোধ)
লক্ষণ: কুকুর বা প্রাণীর কামড়।
রোগ নির্ণয়: ইতিহাস।
হোমিওপ্যাথি ওষুধ: Lyssinum 200C (প্রতিরোধক ও স্নায়বিক উত্তেজনা), Hypericum 30C (স্নায়ুযুক্ত স্থানে কামড়), Ledum pal 30C (তীব্র সুচ ফোটানো আঘাত), Belladonna 30C (তীব্র স্পন্দন)।
রেপাটরি: Animal bite - Ledum; Nerve injury - Hypericum; Hydrophobia prophylaxis - Lyssinum।
জটিলতা: জলাতঙ্ক (মৃত্যু)।
সারাংশ: মেডিকেল ভ্যাকসিনেশনের পাশাপাশি হোমিওপ্যাথি সহায়ক হতে পারে।

95. Sciatica (সায়াটিকা)
লক্ষণ: কোমর বা নিতম্ব থেকে শুরু হয়ে পায়ের পেছন দিক দিয়ে নিচ পর্যন্ত তীব্র ব্যথা। ঝিনঝিন করা বা অবশ ভাব।
রোগ নির্ণয়: ক্লিনিক্যাল, এমআরআই (ডিস্ক প্রল্যাপ্স)।
হোমিওপ্যাথি ওষুধ: Colocynthis 30C (বাম দিকে, চাপ দিলে ও ভাঁজ করলে আরাম), Magnesium phos 30C (ডান দিকে, গরমে আরাম), Gnaphalium 30C (ব্যথার সাথে অবশ ভাব), Rhus tox 30C (ভিজা ঠান্ডায় বাড়ে)।
রেপাটরি: Sciatica, left side - Colocynthis; With numbness - Gnaphalium; Better heat - Mag phos; Better motion - Rhus tox।
জটিলতা: পেশি দুর্বলতা, স্নায়ুর ক্ষতি।
সারাংশ: সায়াটিক স্নায়ুতে চাপ। Colocynthis ও Gnaphalium খুবই উপকারী।

96. Tinea Corporis (দাদ / রিংওয়ার্ম)
লক্ষণ: ত্বকে গোলাকার বা আংটির মতো লাল দাগ, তীব্র চুলকানি, পরিধি উঁচু এবং মাঝখানটা পরিষ্কার।
রোগ নির্ণয়: ক্লিনিক্যাল।
হোমিওপ্যাথি ওষুধ: Sepia 30C (বসন্তে বাড়ে, শীতকাতর), Tellurium 30C (শরীরের উভয় দিকে, রসুনের মতো গন্ধ), Bacillinum 200C (ক্রনিক ক্ষেত্রে, মাসে একবার), Sulphur 30C (তীব্র চুলকানি ও জ্বালা)।
রেপাটরি: Ringworm, spots - Sepia; Offensive odour - Tellurium; Intercurrent - Bacillinum; Burning - Sulphur।
জটিলতা: গৌণ সংক্রমণ।
সারাংশ: ছত্রাক সংক্রমণ। Sepia ও Tellurium কার্যকরী।

97. Urticaria (আমবাত)
লক্ষণ: ত্বকে হঠাৎ লাল চাকা চাকা হয়ে ফুলে ওঠা, তীব্র চুলকানি বা জ্বালা পোড়া, কিছু খেলে বা ঠান্ডায় হতে পারে।
রোগ নির্ণয়: ক্লিনিক্যাল।
হোমিওপ্যাথি ওষুধ: Apis mellifica 30C (মৌমাছির হুল ফোটানোর মতো জ্বালা, ফোলা), Urtica urens 30C (সামুদ্রিক খাবার থেকে, তীব্র চুলকানি), Rhus tox 30C (ঠান্ডায় বা ভেজায় বাড়ে), Natrum mur 30C (ব্যায়ামের পর বা রোদে)।
রেপাটরি: Urticaria, stinging - Apis; From shellfish - Urtica; In cold damp - Rhus tox; After exertion - Natrum mur।
জটিলতা: অ্যানাফাইল্যাক্সিস (বিরল)।
সারাংশ: অ্যালার্জিক প্রতিক্রিয়া। Apis ও Urtica urens প্রাথমিক পছন্দ।

98. Vertigo (মাথা ঘোরা)
লক্ষণ: চারপাশ ঘুরছে এমন অনুভব, বমি বমি ভাব, ভারসাম্য হারানো।
রোগ নির্ণয়: ক্লিনিক্যাল, ডিক্স-হলপাইক টেস্ট।
হোমিওপ্যাথি ওষুধ: Conium 30C (শুয়ে থাকলে বা মাথা ঘোরালে), Cocculus 30C (ভ্রমণে বা ঘুম কম হলে), Gelsemium 30C (মাথার পেছন থেকে শুরু, দৃষ্টি ঝাপসা), Phosphorus 30C (বৃদ্ধদের মাথা ঘোরা)।
রেপাটরি: Vertigo, turning in bed - Conium; Motion sickness - Cocculus; Occipital - Gelsemium; Old age - Phosphorus।
জটিলতা: পড়ে গিয়ে আঘাত।
সারাংশ: ভারসাম্যতন্ত্রের সমস্যা। Conium ও Cocculus প্রধান।

99. Warts (আঁচিল)
লক্ষণ: ত্বকে রুক্ষ বা মসৃণ বৃদ্ধি, ব্যথাহীন বা সংবেদনশীল।
রোগ নির্ণয়: ক্লিনিক্যাল।
হোমিওপ্যাথি ওষুধ: Thuja 30C, 200C (প্রধান ওষুধ, ফুলকপির মতো আঁচিল), Nitric acid 30C (আঁকড়ে ধরা, রক্তপাত হয় এমন, সুচ ফোটানোর মতো ব্যথা), Causticum 30C (মুখমণ্ডল বা নখের আশেপাশে), Antimonium crudum 30C (পায়ের তলায় শক্ত আঁচিল)।
রেপাটরি: Warts, cauliflower-like - Thuja; Bleeding/splinter pain - Nitric acid; Horny/soles - Ant crud; Close to nails - Causticum।
জটিলতা: কসমেটিক সমস্যা, বড় হওয়া।
সারাংশ: হিউম্যান প্যাপিলোমা ভাইরাস (HPV)। Thuja অব্যর্থ।

100. Yellow Fever (পীতজ্বর)
লক্ষণ: উচ্চ জ্বর, জন্ডিস, রক্তপাত (বমি), মাথাব্যথা, পেশি ব্যথা।
রোগ নির্ণয়: পিসিআর, সেরোলজি।
হোমিওপ্যাথি ওষুধ: Crotalus horridus 30C (রক্তপাত, জন্ডিস), Arsenicum album 30C (তীব্র অস্থিরতা, প্রস্টেশন), Phosphorus 30C (লিভার ড্যামেজ, রক্তপাত)।
রেপাটরি: Yellow fever, haemorrhagic - Crotalus hor; Marked prostration - Ars; Hepatic failure - Phosphorus।
জটিলতা: লিভার ও কিডনি ফেইলিওর, মৃত্যু।
সারাংশ: মশা বাহিত ভাইরাল রোগ। Crotalus horridus গুরুতর অবস্থায় নির্দেশিত।

101. Zollinger-Ellison Syndrome (জোলিঞ্জার-এলিসন সিনড্রোম)
লক্ষণ: তীব্র মাত্রায় গ্যাস্ট্রিক আলসার, পেটে ব্যথা, ডায়রিয়া, এসিড রিফ্লাক্স।
রোগ নির্ণয়: গ্যাস্ট্রিন হরমোন পরিমাপ, এন্ডোস্কোপি।
হোমিওপ্যাথি ওষুধ: Uranium nitricum 30C (আলসার ও প্রচুর এসিডিটি), Robinia 30C (তীব্র টক বমি), Phosphorus 30C (পেটে জ্বালা, ঠান্ডা পানীয় পানের ইচ্ছা)।
রেপাটরি: Peptic ulcer, severe burning - Phosphorus; Sour vomiting - Robinia; Duodenal ulcer - Uranium nit।
জটিলতা: পারফোরেশন, রক্তপাত।
সারাংশ: গ্যাস্ট্রিনোমা টিউমারের কারণে অতিরিক্ত এসিড। নির্দেশিত লক্ষণভিত্তিক চিকিৎসা।
`;

function assignSectionAndCategory(name: string, bgName: string, symptoms: string) {
    let section = 'Section A: জ্বর ও সংক্রামক রোগ';
    let category = 'General';
    
    const textToMatch = (name + ' ' + bgName + ' ' + symptoms).toLowerCase();
    if (textToMatch.includes('ত্বক') || textToMatch.includes('একজিমা') || textToMatch.includes('খুশকি') || textToMatch.includes('ছত্রাক') || textToMatch.includes('আঁচিল')) {
        section = 'Section G: ত্বকের রোগ'; category = 'Skin';
    } else if (textToMatch.includes('পায়ু') || textToMatch.includes('পাকস্থলী') || textToMatch.includes('গ্যাস') || textToMatch.includes('লিভার') || textToMatch.includes('ডায়রিয়া') || textToMatch.includes('আমাশয়') || name.toLowerCase().includes('gallstone')) {
        section = 'Section E: পরিপাকতন্ত্র'; category = 'Gastrointestinal';
    } else if (textToMatch.includes('মাসিক') || textToMatch.includes('জরায়ু')) {
        section = 'Section I: স্ত্রীরোগ'; category = 'Gynecology';
    } else if (textToMatch.includes('কান') || textToMatch.includes('চোখ')) {
        section = 'Section L: চোখ ও কানের রোগ'; category = 'ENT/Eye';
    } else if (textToMatch.includes('মুখ') || textToMatch.includes('দাঁত') || textToMatch.includes('মাড়ি')) {
        section = 'Section K: দন্ত ও মুখগহ্বর'; category = 'Oral';
    } else if (textToMatch.includes('স্নায়ু') || textToMatch.includes('মানসিক') || textToMatch.includes('অনিদ্রা') || textToMatch.includes('বিষণ্নতা') || textToMatch.includes('মাথা ঘোরা')) {
        section = 'Section D: স্নায়ুতন্ত্র ও মানসিক'; category = 'Neurological/Psychological';
    } else if (textToMatch.includes('হাড়') || textToMatch.includes('পেশি') || textToMatch.includes('গেঁটে বাত') || textToMatch.includes('এলবো')) {
        section = 'Section F: হাড় ও জয়েন্ট'; category = 'Musculoskeletal';
    } else if (textToMatch.includes('রক্তচাপ') || textToMatch.includes('হৃদ')) {
        section = 'Section B: হৃদরোগ ও সংবহনতন্ত্র'; category = 'Cardiovascular';
    } else if (name.toLowerCase().includes('urine') || textToMatch.includes('প্রস্রাব') || textToMatch.includes('অণ্ডকোষ') || textToMatch.includes('কিডনি')) {
        section = 'Section J: মূত্রতন্ত্র'; category = 'Urinary/Male Reproductive';
    } else if (textToMatch.includes('থাইরয়েড') || textToMatch.includes('ডায়াবেটিস')) {
        section = 'Section N: বিপাক ও অন্তঃস্রাবী'; category = 'Endocrine';
    } else if (textToMatch.includes('কাশি') || textToMatch.includes('শ্বাস') || textToMatch.includes('ফুসফুস') || textToMatch.includes('হেঁচকি')) {
        section = 'Section C: শ্বাসতন্ত্রের রোগ'; category = 'Respiratory';
    } 
    
    return { section, category };
}

const lines = data.split('\n');
const results: any[] = [];
let current: any = null;

lines.forEach(line => {
    line = line.trim();
    if (!line) return;
    
    const titleMatch = line.match(/^\d+\.\s+([^(]+)\s*\(([^)]+)\)/);
    if (titleMatch) {
       if (current) results.push(current);
       current = {
           id: titleMatch[1].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
           name: titleMatch[1].trim(),
           banglaName: titleMatch[2].trim(),
           severity: 'moderate',
           banglaSymptoms: [],
           commonSymptoms: [],
           investigations: [],
           repertoryRubrics: [],
           mainRemedies: [],
           medicineDetails: [],
           emergencySigns: [],
           summary: ""
       };
    } else if (current) {
        if (line.startsWith('লক্ষণ:')) {
            const sym = line.replace('লক্ষণ:', '').split(',').map(s => s.trim());
            current.banglaSymptoms = sym;
            current.commonSymptoms = sym.map(s => s); // placeholder
        } else if (line.startsWith('রোগ নির্ণয়:')) {
            const invs = line.replace('রোগ নির্ণয়:', '').split(',').map(s => s.trim());
            current.investigations = invs.map((i: string) => ({ label: i, note: '' }));
        } else if (line.startsWith('হোমিওপ্যাথি ওষুধ:')) {
            const meds = line.replace('হোমিওপ্যাথি ওষুধ:', '').split(',');
            meds.forEach((m: string, idx: number) => {
                let [name, ...rest] = m.split('(');
                name = name.trim();
                let symps = rest.join('(').replace(')', '').trim();
                
                let actualName = name.replace(/ \d+(C|X|\d*M|K|Q).*$/, '').replace(/ Q.*$/, '').replace(/ \d+X.*$/, '').trim();
                let potMatch = name.match(/(\d+(?:C|X|\d*M|K)|Q)/i);
                let pot = potMatch ? potMatch[0] : '30C';
                
                if (actualName) {
                    current.mainRemedies.push(actualName);
                    current.medicineDetails.push({
                        name: actualName,
                        symptoms: symps || "লক্ষণ অনুযায়ী",
                        potency: pot,
                        priority: idx === 0 ? '1st Choice' : 'Medium'
                    });
                }
            });
        } else if (line.startsWith('রেপাটরি:')) {
            const rubrics = line.replace('রেপাটরি:', '').split(';');
            current.repertoryRubrics = rubrics.map((r: string) => r.trim());
        } else if (line.startsWith('জটিলতা:')) {
            const comps = line.replace('জটিলতা:', '').split(',').map(c => c.trim());
            current.emergencySigns = comps;
        } else if (line.startsWith('সারাংশ:')) {
            current.summary = line.replace('সারাংশ:', '').trim();
        }
    }
});

if (current) results.push(current);

results.forEach(res => {
    const { section, category } = assignSectionAndCategory(res.name, res.banglaName, res.banglaSymptoms.join(' '));
    res.section = section;
    res.category = category;
});

const combinedData = [...DIAGNOSES_DATA, ...results];

const exportFileContent = "export interface MedicineDetail {\n" +
"  name: string;\n" +
"  symptoms: string;\n" +
"  potency: string;\n" +
"  priority: '1st Choice' | 'High' | 'Medium' | 'Emergency';\n" +
"  shortDesc?: string;\n" +
"}\n\n" +
"export interface ClinicalDiagnosis {\n" +
"  id: string;\n" +
"  name: string;\n" +
"  banglaName: string;\n" +
"  category: string;\n" +
"  section: string;\n" +
"  icd10?: string;\n" +
"  severity: 'mild' | 'moderate' | 'severe';\n" +
"  feverTemp?: string;\n" +
"  stats?: {\n" +
"    label: string;\n" +
"    value: string;\n" +
"  }[];\n" +
"  commonSymptoms: string[];\n" +
"  banglaSymptoms: string[];\n" +
"  repertoryRubrics: string[];\n" +
"  mainRemedies: string[];\n" +
"  medicineDetails?: MedicineDetail[];\n" +
"  emergencySigns?: string[];\n" +
"  investigations?: { label: string; note: string }[];\n" +
"  differentialDiagnosis?: { feature: string; [key: string]: string }[];\n" +
"  summary?: string;\n" +
"}\n\n" +
"export const DIAGNOSES_DATA: ClinicalDiagnosis[] = " + JSON.stringify(combinedData, null, 2) + ";\n";

fs.writeFileSync('src/practiceMedicineData.ts', exportFileContent);
console.log('Successfully added more records, length = ' + combinedData.length);
