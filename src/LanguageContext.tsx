import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'bn' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    bn: string;
    hi: string;
  };
}

export const translations: Translations = {
  // Navigation
  'nav.dashboard': { en: 'Dashboard', bn: 'ড্যাশবোর্ড', hi: 'डैशबोर्ड' },
  'nav.patients': { en: 'Patients', bn: 'রোগী তালিকা', hi: 'मरीज' },
  'nav.reminders': { en: 'Reminders', bn: 'অনুস্মারক', hi: 'अनुस्मारक' },
  'nav.repertory': { en: "Kent's Repertory", bn: 'কেন্টের রেপার্টরি', hi: 'केंट रिपरटरी' },
  'nav.surgery': { en: 'Surgery', bn: 'সার্জারি', hi: 'सर्जरी' },
  'nav.analysis': { en: 'Analysis', bn: 'বিশ্লেষণ', hi: 'विश्लेषण' },
  'nav.organon': { en: 'Organon', bn: 'অর্গানন', hi: 'ऑर्गेनन' },
  'nav.practice': { en: 'Practice of Medicine', bn: 'চিকিৎসা বিজ্ঞান', hi: 'चिकित्सा अभ्यास' },
  'nav.knowledge': { en: 'Knowledge', bn: 'জ্ঞান কেন্দ্র', hi: 'ज्ञान केंद्र' },
  'nav.pathology': { en: 'Pathology', bn: 'প্যাথলজি', hi: 'पैथोलॉजी' },
  'nav.materia': { en: 'Materia Medica', bn: 'মেটেরিয়া মেডিকা', hi: 'मटेरिया मेडिका' },
  'nav.physiology': { en: 'Physiology & Anatomy', bn: 'ফিজিওলজি ও অ্যানাটমি', hi: 'शरीर विज्ञान और शरीर रचना' },
  'nav.pharmacy': { en: 'Pharmacy', bn: 'ফার্মাসি', hi: 'फार्मेसी' },
  'nav.settings': { en: 'Settings', bn: 'সেটিংস', hi: 'सेटिंग्स' },
  
  // Library Tabs - Organon
  'library.organonBrowser': { en: 'Organon Browser', bn: 'অর্গানন ব্রাউজার', hi: 'ऑर्गनोन ब्राउज़र' },
  'library.organonEdition': { en: '6th Edition', bn: '৬ষ্ঠ সংস্করণ', hi: 'छठा संस्करण' },
  'library.aphorisms': { en: 'Aphorisms', bn: 'অ্যাফোরিজম', hi: 'एफोरिज्म' },
  'library.introductions': { en: 'Introductions', bn: 'ভূমিকা', hi: 'परिचय' },
  'library.searchAphorisms': { en: 'Search aphorisms...', bn: 'অ্যাফোরিজম খুঁজুন...', hi: 'एफोरिज्म खोजें...' },
  'library.corePrinciples': { en: 'The Core Principles', bn: 'মূল নীতিসমূহ', hi: 'मूल सिद्धांत' },
  'library.systematicDirectives': { en: 'Systematic clinical directives', bn: 'পদ্ধতিগত ক্লিনিকাল নির্দেশাবলী', hi: 'व्यवस्थित नैदानिक निर्देश' },
  'library.readingMode': { en: 'Reading Mode', bn: 'রিডিং মোড', hi: 'रीडिंग मोड' },
  'library.aphorism': { en: 'Aphorism', bn: 'অ্যাফোরিজম', hi: 'एफोरिज्म' },
  'library.introduction': { en: 'Introduction', bn: 'ভূমিকা', hi: 'परिचय' },
  'library.clinicalCommentary': { en: 'Clinical Commentary', bn: 'ক্লিনিকাল ভাষ্য', hi: 'नैदानिक व्याख्या' },
  
  // Library Tabs - Practice Medicine
  'library.practiceMedicineTitle': { en: 'Systemic Therapeutics', bn: 'সিস্টেমিক থেরাপিউটিক্স', hi: 'प्रणालीगत चिकित्सा' },
  'library.diffDiagnosis': { en: 'Differential Diagnosis', bn: 'ডিফারেনশিয়াল ডায়াগনসিস', hi: 'विभेदक निदान' },
  'library.commonConditions': { en: 'Common Conditions', bn: 'সাধারণ রোগসমূহ', hi: 'सामान्य स्थितियां' },
  
  // Library Tabs - Knowledge Hub
  'library.knowledgeHub': { en: 'Knowledge Repository', bn: 'জ্ঞান ভান্ডার', hi: 'ज्ञान भंडार' },
  'library.educationalResources': { en: 'Educational Resources & Foundations', bn: 'শিক্ষামূলক সম্পদ এবং ভিত্তি', hi: 'शैक्षिक संसाधन और नींव' },
  
  // Library Tabs - Pathology
  'library.pathologyMenu': { en: 'Pathology Menu', bn: 'প্যাথলজি মেনু', hi: 'पैथोलॉजी মেনু' },
  'library.clinicalBrowser': { en: 'Clinical Browser', bn: 'ক্লিনিকাল ব্রাউজার', hi: 'नैदानिक ब्राउज़र' },
  'library.diagnosticTests': { en: 'Diagnostic Tests', bn: 'ডায়াগনস্টিক টেস্ট', hi: 'नैदानिक परीक्षण' },
  'library.testName': { en: 'Test Name & Description', bn: 'টেস্টের নাম ও বর্ণনা', hi: 'परीक्षण का नाम और विवरण' },
  'library.normalRange': { en: 'Reference / Normal Range', bn: 'রেফারেন্স / স্বাভাবিক সীমা', hi: 'संदर्भ / सामान्य श्रेणी' },
  
  // Dashboard / Header
  'header.search': { en: 'Search anything...', bn: 'কিছু খুঁজুন...', hi: 'कुछ भी खोजें...' },
  'header.searchPlaceholder': { en: 'Search symptoms, remedies, or patients...', bn: 'লক্ষণ, ওষুধ বা রোগী খুঁজুন...', hi: 'लक्षण, उपचार या मरीजों को खोजें...' },
  'header.available': { en: 'AVAILABLE', bn: 'উপলব্ধ', hi: 'उपलब्ध' },
  'header.drName': { en: 'Dr. Samim Ahamed', bn: 'ডাঃ সামিম আহমেদ', hi: 'डॉ. समीम अहमद' },
  'header.drTitle': { en: 'Chief Physician', bn: 'চিফ ফিজিশিয়ান', hi: 'मुख्य चिकित्सक' },
  
  // Sidebar Case Card
  'sidebar.clinicalCaseRecord': { en: 'Patient Profile Record', bn: 'রোগী প্রোফাইল রেকর্ড', hi: 'मरीज़ प्रोफ़ाइल रिकॉर्ड' },
  'sidebar.coreRubrics': { en: 'Core Rubrics', bn: 'মূল রুব্রিক্স', hi: 'कोर रूब्रिक्स' },
  'sidebar.openCaseFile': { en: 'Open Full Case File', bn: 'সম্পূর্ণ কেস ফাইল খুলুন', hi: 'पूरी केस फाइल खोलें' },
  'sidebar.currentPotency': { en: 'Current Potency', bn: 'বর্তমান শক্তি (Potency)', hi: 'वर्तमान शक्ति' },
  'sidebar.remedy': { en: 'Remedy', bn: 'ওষুধ', hi: 'उपचार' },
  'header.welcome': { en: 'Welcome to the Advanced Suite', bn: 'অ্যাডভান্সড সুইটে স্বাগতম', hi: 'उन्नत सूट में आपका स्वागत है' },
  'header.desc': { en: "Manage patient records and access Kent's Repertory with full hierarchical drill-down browsing.", bn: "রোগীর রেকর্ড পরিচালনা করুন এবং কেন্টের রেপার্টরি ব্রাউজ করুন।", hi: "मरीज के रिकॉर्ड प्रबंधित करें और केंट रिपरटरी ब्राउज़ करें।" },
  'header.openRepertory': { en: 'Open Repertory', bn: 'রেপার্টরি খুলুন', hi: 'रिपरटरी खोलें' },
  
  // Dashboard Stats
  'stats.totalPatients': { en: 'Total Patients', bn: 'মোট রোগী', hi: 'कुल मरीज' },
  'stats.analysesRun': { en: 'Analyses Run', bn: 'বিশ্লেষণ সম্পন্ন', hi: 'विश्लेषण किए गए' },
  'stats.activeReminders': { en: 'Active Reminders', bn: 'সক্রিয় অনুস্মারক', hi: 'सक्रिय अनुस्मारक' },
  'stats.quickSearch': { en: 'Quick Search', bn: 'দ্রুত অনুসন্ধান', hi: 'त्वरित खोज' },
  
  // Patients list
  'patients.title': { en: 'Patient Database', bn: 'রোগী ডাটাবেস', hi: 'मरीज डेटाबेस' },
  'patients.desc': { en: 'Manage your patient records and clinical history', bn: 'রোগীর রেকর্ড এবং ক্লিনিকাল ইতিহাস পরিচালনা করুন', hi: 'अपने मरीज के रिकॉर्ड और नैदानिक इतिहास को प्रबंधित करें' },
  'patients.searchPlaceholder': { en: 'Search patients...', bn: 'রোগী খুঁজুন...', hi: 'मरीजों को खोजें...' },
  'patients.newPatient': { en: 'New Patient', bn: 'নতুন রোগী', hi: 'नया मरीज' },
  'patients.closeForm': { en: 'Close Form', bn: 'ফর্ম বন্ধ করুন', hi: 'फ़ॉर्म बंद करें' },
  'patients.totalRecords': { en: 'Total Records', bn: 'মোট রেকর্ড', hi: 'कुल रिकॉर्ड' },
  'patients.malePatients': { en: 'Male Patients', bn: 'পুরুষ রোগী', hi: 'पुरुष मरीज' },
  'patients.femalePatients': { en: 'Female Patients', bn: 'মহিলা রোগী', hi: 'महिला मरीज' },
  'patients.avgAge': { en: 'Average Age', bn: 'গড় বয়স', hi: 'औसत आयु' },

  // Reminders
  'reminders.title': { en: 'Patient Reminders', bn: 'রোগীর অনুস্মারক', hi: 'मरीज अनुस्मारक' },
  'reminders.desc': { en: 'Manage clinical follow-ups and medication schedules', bn: 'ক্লিনিকাল ফলো-আপ এবং ওষুধের সময়সূচী পরিচালনা করুন', hi: 'नैदानिक फॉलो-अप और दवा कार्यक्रम प्रबंधित करें' },
  'reminders.setNew': { en: 'Set New Reminder', bn: 'নতুন অনুস্মারক সেট করুন', hi: 'नया अनुस्मारक सेट करें' },
  'reminders.noActive': { en: 'No Active Reminders', bn: 'কোনো সক্রিয় অনুস্মারক নেই', hi: 'कोई सक्रिय अनुस्मारक नहीं' },
  'reminders.clear': { en: 'Your clinical schedule is currently clear.', bn: 'আপনার ক্লিনিকাল সময়সূচী বর্তমানে পরিষ্কার আছে।', hi: 'आपका नैदानिक कार्यक्रम वर्तमान में स्पष्ट है।' },
  'reminders.createFirst': { en: 'Create First Reminder', bn: 'প্রথম অনুস্মারক তৈরি করুন', hi: 'पहला अनुस्मारक बनाएं' },
  'reminders.selectPatient': { en: 'Select Patient', bn: 'রোগী নির্বাচন করুন', hi: 'मरीज चुनें' },
  'reminders.type': { en: 'Reminder Type', bn: 'অনুস্মারকের ধরন', hi: 'अनुस्मारक प्रकार' },
  'reminders.date': { en: 'Date', bn: 'তারিখ', hi: 'तारीख' },
  'reminders.time': { en: 'Time', bn: 'সময়', hi: 'समय' },
  'reminders.note': { en: 'Note / Instructions', bn: 'নোট / নির্দেশাবলী', hi: 'नोट / निर्देश' },
  'reminders.save': { en: 'Save Reminder', bn: 'অনুস্মারক সেভ করুন', hi: 'अनुस्मारक सहेजें' },
  'reminders.choosePatient': { en: 'Choose patient...', bn: 'রোগী বেছে নিন...', hi: 'मरीज चुनें...' },
  'reminders.appointment': { en: 'Appointment', bn: 'অ্যাপয়েন্টমেন্ট', hi: 'अपॉइंटमेंट' },
  'reminders.medication': { en: 'Medication', bn: 'ওষুধ', hi: 'दवा' },
  'reminders.followup': { en: 'Follow-up', bn: 'ফলো-আপ', hi: 'फॉलो-अप' },
  'reminders.other': { en: 'Other', bn: 'অন্যান্য', hi: 'अन्य' },
  'reminders.notePlaceholder': { en: 'e.g., Check progress after 2 weeks of medication...', bn: 'উদা: ২ সপ্তাহ ওষুধ সেবনের পর চেকআপ...', hi: 'उदा., 2 सप्ताह की दवा के बाद प्रगति की जांच करें...' },
  'reminders.overdue': { en: 'Overdue', bn: 'বিলম্বিত', hi: 'विलंबित' },
  'reminders.idLabel': { en: 'ID:', bn: 'আইডি:', hi: 'आईडी:' },

  // Analysis
  'analysis.title': { en: 'Active Case Analysis', bn: 'সক্রিয় কেস বিশ্লেষণ', hi: 'सक्रिय मामले का विश्लेषण' },
  'analysis.hideIntake': { en: 'Hide Intake', bn: 'ইনটেক লুকান', hi: 'इनटेक छिपाएं' },
  'analysis.showIntake': { en: 'Show Intake', bn: 'ইনটেক দেখান', hi: 'इनटेक दिखाएं' },
  'analysis.clear': { en: 'Clear', bn: 'মুছে ফেলুন', hi: 'साफ करें' },
  'analysis.prescribe': { en: 'Prescribe', bn: 'প্রেসক্রাইব করুন', hi: 'नुस्खा लिखें' },
  'analysis.save': { en: 'Save', bn: 'সেভ করুন', hi: 'सहेजें' },
  'analysis.saving': { en: 'Saving...', bn: 'সেভ হচ্ছে...', hi: 'सहेजा जा रहा है...' },
  'analysis.caseRubrics': { en: 'Case Rubrics', bn: 'কেস রুব্রিক্স', hi: 'केस रूब्रिक्स' },
  'analysis.noRubrics': { en: 'No rubrics selected for analysis.', bn: 'বিশ্লেষণের জন্য কোনো রুব্রিক নির্বাচন করা হয়নি।', hi: 'विश्लेषण के लिए कोई रूब्रिक्स नहीं चुना गया।' },
  'analysis.goToRepertory': { en: 'Go to Repertory to add rubrics', bn: 'রুব্রিক যোগ করতে রেপার্টরিতে যান', hi: 'रूब्रिक्स जोड़ने के लिए रिपरटरी पर जाएं' },
  'analysis.matrixTitle': { en: 'Repertorization Matrix', bn: 'রেপার্টরাইজেশন ম্যাট্রিক্স', hi: 'रिपरटराइजेशन मैट्रिक्स' },
  'analysis.matrixDesc': { en: 'Cross-reference of rubrics vs. indicated remedies', bn: 'রুব্রিক এবং নির্দেশিত ওষুধের ক্রস-রেফারেন্স', hi: 'रूब्रिक्स बनाम संकेतित उपचारों का क्रॉस-रेफरेंस' },
  'analysis.noPatient': { en: 'No Patient Selected', bn: 'কোন রোগী নির্বাচন করা হয়নি', hi: 'कोई मरीज नहीं चुना गया' },
  'analysis.noPatientDesc': { en: 'Please select or add a patient from the Dashboard to begin clinical analysis and repertorization.', bn: 'ক্লিনিকাল বিশ্লেষণ এবং রেপার্টরাইজেশন শুরু করতে অনুগ্রহ করে ড্যাশবোর্ড থেকে একটি রোগী নির্বাচন করুন বা যোগ করুন।', hi: 'नैदानिक विश्लेषण और रिपरटराइजेशन शुरू करने के लिए कृपया डैशबोर्ड से एक मरीज चुनें या जोड़ें।' },
  'analysis.goToDashboard': { en: 'Go to Dashboard', bn: 'ড্যাশবোর্ডে যান', hi: 'डैशबोर्ड पर जाएं' },
  'analysis.miasmLoadDesc': { en: 'Add rubrics to analyze miasmatic load.', bn: 'মায়াজমেটিক লোড বিশ্লেষণ করতে রুব্রিক যোগ করুন।', hi: 'मियैमैटिक लोड का विश्लेषण करने के लिए रूब्रिक्स जोड़ें।' },
  'analysis.saveSuccess': { en: 'Analysis and Clinical Record updated successfully.', bn: 'বিশ্লেষণ এবং ক্লিনিকাল রেকর্ড সফলভাবে আপডেট করা হয়েছে।', hi: 'विश्लेषण और नैदानिक रिकॉर्ड सफलतापूर्वक अपडेट किया गया।' },
  'analysis.psoricDesc': { en: 'The predominance of functional disturbances and structural sensitivity points to a strong Psoric load. Focus on constitutional stability.', bn: 'কার্যকরী ব্যাঘাত এবং কাঠামোগত সংবেদনশীলতার প্রাধান্য একটি শক্তিশালী সোরিক লোড নির্দেশ করে। সাংবিধানিক স্থিতিশীলতার দিকে মনোনিবেশ করুন।', hi: 'कार्यात्मक गड़बड़ी और संरचनात्मक संवेदनशीलता की प्रधानता एक मजबूत सोरिक लोड की ओर इशारा करती है। संवैधानिक स्थिरता पर ध्यान दें।' },
  'analysis.syphiliticDesc': { en: 'Destructive tendencies and deep-seated tissue changes suggest a Syphilitic miasm. Anti-syphilitic remedies may be required.', bn: 'ধ্বংসাত্মক প্রবণতা এবং গভীর কলা (tissue) পরিবর্তন একটি সিফিলিটিক মায়াজম নির্দেশ করে। সিফিলিটিক-বিরোধী ওষুধের প্রয়োজন হতে পারে।', hi: 'विनाशकारी प्रवृत्तियां और गहरे ऊतकों में बदलाव एक सिफिलिटिक मियाज़्म का सुझाव देते हैं। एंटी-सिफिलिटिक उपचारों की आवश्यकता हो सकती है।' },
  'analysis.sycoticDesc': { en: 'Overgrowth, coordination issues, and slow progression indicate a Sycotic miasmatic influence.', bn: 'অতিরিক্ত বৃদ্ধি, সমন্বয় সমস্যা এবং ধীর অগ্রগতি একটি সাইকোটিক মায়াজম নির্দেশ করে।', hi: 'अत्यधिक वृद्धि, समन्वय की समस्याएं और धीमी प्रगति एक साइकोटिक मियैमैटिक प्रभाव का संकेत देती है।' },
  'analysis.twiceDaily': { en: 'Twice daily (Empty stomach)', bn: 'দিনে দুইবার (খালি পেটে)', hi: 'दिन में दो बार (खाली पेट)' },
  'analysis.fourDrops': { en: '4 Drops', bn: '৪ ফোঁটা', hi: '4 बूंदें' },
  'analysis.sevenDays': { en: '7 Days', bn: '৭ দিন', hi: '7 दिन' },
  'analysis.liquidDilution': { en: 'Liquid dilution', bn: 'তরল ডাইলুশন', hi: 'तरल डाइल्यूशन' },

  'common.save': { en: 'Save', bn: 'সংরক্ষণ করুন', hi: 'सहेजें' },
  'common.cancel': { en: 'Cancel', bn: 'বাতিল', hi: 'रद्द करें' },
  'common.delete': { en: 'Delete', bn: 'মুছে ফেলুন', hi: 'हटाएं' },
  'common.edit': { en: 'Edit', bn: 'সম্পাদনা করুন', hi: 'संपादित करें' },
  'common.view': { en: 'View', bn: 'দেখুন', hi: 'देखें' },
  'common.loading': { en: 'Loading...', bn: 'লোড হচ্ছে...', hi: 'लोड हो रहा है...' },
  'common.success': { en: 'Success', bn: 'সফল', hi: 'सफल' },
  'common.error': { en: 'Error', bn: 'ত্রুটি', hi: 'त्रुटि' },
  'common.remedies': { en: 'Remedies', bn: 'ওষুধসমূহ', hi: 'उपचार' },
  'common.potency': { en: 'Potency', bn: 'শক্তি (Potency)', hi: 'शक्ति' },
  'common.dosage': { en: 'Dosage', bn: 'মাত্রা', hi: 'खुराक' },
  'common.frequency': { en: 'Frequency', bn: 'বারংবারতা (Frequency)', hi: 'आवृत्ति' },
  'common.duration': { en: 'Duration', bn: 'স্থায়িত্ব (Duration)', hi: 'अवधि' },

  // Materia Medica
  'materia.browserTitle': { en: 'Materia Medica Browser', bn: 'মেটেরিয়া মেডিকা ব্রাউজার', hi: 'मटेरिया मेडिका ब्राउज़र' },
  'materia.searchPlaceholder': { en: 'Search remedies...', bn: 'ওষুধ খুঁজুন...', hi: 'उपचार खोजें...' },
  'materia.directory': { en: 'Directory', bn: 'ডিরেক্টরি', hi: 'निर्देशिका' },
  'materia.compareRemedies': { en: 'Compare Remedies', bn: 'ওষুধ তুলনা করুন', hi: 'उपचारों की तुलना करें' },
  'materia.exitComparison': { en: 'Exit Comparison', bn: 'তুলনা বন্ধ করুন', hi: 'तुलना से बाहर निकलें' },
  'materia.comparisonTitle': { en: 'Remedy Comparison', bn: 'ওষুধের তুলনা', hi: 'उपचार तुलना' },
  'materia.clearAll': { en: 'Clear All', bn: 'সব মুছুন', hi: 'सभी साफ करें' },
  'materia.backToSelection': { en: 'Back to Selection', bn: 'তালিকায় ফিরে যান', hi: 'चयन पर वापस जाएं' },
  'materia.backToDirectory': { en: 'Back to Directory', bn: 'ডিরেক্টরিতে ফিরে যান', hi: 'निर्देशिका पर वापस जाएं' },
  'materia.compareSelected': { en: 'Compare {count} Selected', bn: 'নির্বাচিত {count}টি তুলনা করুন', hi: 'चयनित {count} की तुलना करें' },
  'materia.noRemedySelected': { en: 'Select a remedy to begin studying', bn: 'পড়া শুরু করতে একটি ওষুধ নির্বাচন করুন', hi: 'अध्ययन शुरू करने के लिए एक उपचार चुनें' },
  'materia.noRemedySelectedDesc': { en: 'Choose from the list on the left or search by name.', bn: 'বাম দিকের তালিকা থেকে বেছে নিন অথবা নাম দিয়ে খুঁজুন।', hi: 'बाईं ओर की सूची से चुनें या नाम से खोजें।' },
  'materia.quickPrescribe': { en: 'Quick Prescribe', bn: 'দ্রুত প্রেসক্রিপশন', hi: 'त्वरित नुस्खा' },
  
  'materia.guidingSymptoms': { en: 'Guiding Symptoms', bn: 'নির্দেশক লক্ষণসমূহ', hi: 'मार्गदर्शक लक्षण' },
  'materia.clinicalIndications': { en: 'Clinical Indications', bn: 'ক্লিনিকাল নির্দেশিকাসমূহ', hi: 'नैदानिक संकेत' },
  'materia.relationships': { en: 'Relationships', bn: 'সম্বন্ধ (Relationships)', hi: 'संबंध' },
  'materia.causation': { en: 'Causation', bn: 'রোগের কারণ (Causation)', hi: 'कारण' },
  'materia.aggravation': { en: 'Aggravation', bn: 'বৃদ্ধি (Aggravation)', hi: 'बढ़ना' },
  'materia.amelioration': { en: 'Amelioration', bn: 'উপশম (Amelioration)', hi: 'सुधार' },
  'materia.mainSymptoms': { en: 'Main Symptoms', bn: 'প্রধান লক্ষণসমূহ', hi: 'मुख्य लक्षण' },
  'materia.mentalState': { en: 'Mental State', bn: 'মানসিক অবস্থা', hi: 'मानसिक स्थिति' },
  'materia.physicalDetails': { en: 'Physical Details', bn: 'শারীরিক বিবরণ', hi: 'शारीरिक विवरण' },
  'materia.timeModality': { en: 'Time & Modality', bn: 'সময় ও মোডালিটি', hi: 'समय और तौर-तरीके' },
  'materia.desiresAversions': { en: 'Desires & Aversions', bn: 'ইচ্ছা ও অনীহা', hi: 'इच्छाएं और अरुचि' },
  'materia.dosageUsage': { en: 'Dosage & Usage', bn: 'মাত্রা ও ব্যবহার বিধি', hi: 'खुराक और उपयोग' },
  
  'materia.complementary': { en: 'Complementary', bn: 'পরিপূরক', hi: 'पूरक' },
  'materia.antidote': { en: 'Antidote', bn: 'প্রতিষেধক', hi: 'मारक' },
  'materia.inimical': { en: 'Inimical', bn: 'শত্রুভাবাপন্ন', hi: 'शत्रुवत' },
  'materia.followsWell': { en: 'Follows Well', bn: 'পরবর্তী ভালো কাজ করে', hi: 'अच्छी तरह से काम करता है' },
  
  'materia.location': { en: 'Location', bn: 'স্থান', hi: 'स्थान' },
  'materia.appearance': { en: 'Appearance', bn: 'চেহারা', hi: 'उपस्थिति' },
  'materia.sensation': { en: 'Sensation', bn: 'অনুভূতি', hi: 'अनुभूति' },
  'materia.pain': { en: 'Pain', bn: 'ব্যথা', hi: 'दर्द' },
  'materia.time': { en: 'Time', bn: 'সময়', hi: 'समय' },
  'materia.modality': { en: 'Modality', bn: 'মোডালিটি', hi: 'तौर-तरीका' },
  'materia.desire': { en: 'Desire', bn: 'ইচ্ছা', hi: 'इच्छा' },
  'materia.aversion': { en: 'Aversion', bn: 'অনীহা', hi: 'अरुचि' },
  
  'materia.categories.all': { en: 'All', bn: 'সব', hi: 'सभी' },
  'materia.categories.polychrest': { en: 'Polychrest', bn: 'পলক্রিস্ট', hi: 'पॉलीक्रेस्ट' },
  'materia.categories.plant': { en: 'Plant', bn: 'উদ্ভিদ', hi: 'पौधा' },
  'materia.categories.animal': { en: 'Animal', bn: 'প্রাণী', hi: 'पशु' },
  'materia.categories.mineral': { en: 'Mineral', bn: 'খনিজ', hi: 'खनिज' },

  'materia.selectRemedy': { en: 'Select a remedy to view details', bn: 'বিস্তারিত দেখতে একটি ওষুধ নির্বাচন করুন', hi: 'विवरण देखने के लिए एक उपचार चुनें' },
  'materia.selectRemedyDesc': { en: 'Browse the directory on the left to explore the Materia Medica.', bn: 'মেটেরিয়া মেডিকা দেখতে বাম দিকের ডিরেক্টরি ব্রাউজ করুন।', hi: 'मटेरिया मेडिका का पता लगाने के लिए बाईं ओर की निर्देशिका ब्राउज़ करें।' },
  'materia.selectToCompare': { en: 'Select remedies to compare', bn: 'তুলনা করার জন্য ওষুধ নির্বাচন করুন', hi: 'तुलना करने के लिए उपचार चुनें' },
  'materia.selectToCompareDesc': { en: 'Choose up to 3 remedies from the directory to see side-by-side analysis.', bn: 'পাশাপাশি বিশ্লেষণের জন্য ডিরেক্টরি থেকে ৩টি পর্যন্ত ওষুধ বেছে নিন।', hi: 'साथ-साथ विश्लेषण देखने के लिए निर्देशिका से 3 उपचारों तक चुनें।' },
  'materia.noIndications': { en: 'No clinical indications listed.', bn: 'কোন ক্লিনিকাল নির্দেশিকা তালিকাভুক্ত নেই।', hi: 'कोई नैदानिक संकेत सूचीबद्ध नहीं है।' },

  'materia.keynotes': { en: 'Keynotes & Essence', bn: 'মূল লক্ষণ ও সারমর্ম', hi: 'मुख्य स्वर और सार' },
  'materia.remedyRelationships': { en: 'Remedy Relationships', bn: 'ওষুধের পারস্পরিক সম্বন্ধ', hi: 'उपचार संबंध' },
  'materia.bengaliDesc': { en: 'Bengali Description', bn: 'বাংলা বর্ণনা', hi: 'बंगाली विवरण' },

  'pharmacy.title': { en: 'Homeopathic Pharmacy', bn: 'হোমিওপ্যাথিক ফার্মেসি', hi: 'होम्योपैथिक फार्मेसी' },
  'pharmacy.remedyLibrary': { en: 'Full Remedy Library', bn: 'সম্পূর্ণ ঔষধ লাইব্রেরি', hi: 'पूर्ण उपचार पुस्तकालय' },
  'pharmacy.remediesAvailable': { en: 'Remedies Available', bn: 'ওষুধ উপলব্ধ', hi: 'उपलब्ध उपचार' },
  'pharmacy.sources': { en: 'Sources of Medicines', bn: 'ঔষধের উৎস', hi: 'दवाओं के स्रोत' },
  'pharmacy.organonDesc': { en: 'Explicitly described in the Organon of Medicine', bn: 'অর্গানন অফ মেডিসিন অনুযায়ী স্পষ্টভাবে বর্ণিত', hi: 'ऑर्गेनन ऑफ मेडिसिन में स्पष्ट रूप से वर्णित' },
  'pharmacy.plantKingdom': { en: 'Plant Kingdom', bn: 'উদ্ভিদ জগত', hi: 'पादप जगत' },
  'pharmacy.animalKingdom': { en: 'Animal Kingdom', bn: 'প্রাণী জগত', hi: 'प्राणी जगत' },
  'pharmacy.mineralKingdom': { en: 'Mineral Kingdom', bn: 'খনিজ জগত', hi: 'खनिज जगत' },
  'pharmacy.nosodes': { en: 'Nosodes', bn: 'নোসোডস্', hi: 'नोसोड्स' },
  'pharmacy.sarcodes': { en: 'Sarcodes', bn: 'সারকোডস্', hi: 'सारकोड्स' },
  'pharmacy.imponderabilia': { en: 'Imponderabilia', bn: 'ইমপন্ডারাবিলিয়া', hi: 'इम्पोंडेराबिलिया' },
  'pharmacy.nosodesDesc': { en: 'Disease products', bn: 'রোগের উপজাত', hi: 'रोग उत्पाद' },
  'pharmacy.sarcodesDesc': { en: 'Healthy tissues', bn: 'সুস্থ টিস্যু', hi: 'स्वस्थ ऊतक' },
  'pharmacy.imponderabiliaDesc': { en: 'Energy sources', bn: 'শক্তি উৎস', hi: 'ऊर्जा स्रोत' },

  'physiology.title': { en: 'Physiology & Anatomy', bn: 'শরীরবিদ্যা ও শারীরস্থান', hi: 'शरीर विज्ञान और शरीर रचना' },
  'physiology.sectionOverview': { en: 'Section Overview', bn: 'বিভাগীয় ওভারভিউ', hi: 'अनुभाग अवलोकन' },
  'physiology.deepDive': { en: 'Deep Dive Analysis', bn: 'গভীর বিশ্লেষণ', hi: 'गहन विश्लेषण' },
  'physiology.clinical': { en: 'Clinical', bn: 'ক্লিনিকাল (Clinical)', hi: 'क्लीनिकल' },
  'physiology.homeopathicLink': { en: 'Homeopathic Link', bn: 'হোমিওপ্যাথিক সংযোগ', hi: 'होम्योपैथिक लिंक' },
  
  // Surgery
  'surgery.title': { en: 'SurgeryDesk', bn: 'সার্জারি ডেস্ক (SurgeryDesk)', hi: 'सर्जरी डेस्क' },
  'surgery.subtitle': { en: 'Advanced surgery and pathology study guide.', bn: 'সার্জারি ও প্যাথোলজি স্টাডি গাইড।', hi: 'उन्नत सर्जरी और पैथोलॉजी अध्ययन गाइड।' },
  'surgery.searchPlaceholder': { en: 'Search Symptoms', bn: 'সার্চ সিম্পটম', hi: 'लक्षण खोजें' },
  'surgery.edition': { en: '27th EDITION', bn: '২৭তম এডিশন', hi: '27वां संस्करण' },
  'surgery.complete': { en: 'COMPLETE', bn: 'সম্পন্ন', hi: 'पूर्ण' },
  'surgery.part1': { en: 'Part 1: Principles', bn: 'পর্ব ১: মূলনীতি (Principles)', hi: 'भाग 1: सिद्धांत' },
  'surgery.part2': { en: 'Part 2: Investigation', bn: 'পর্ব ২: ইনভেস্টিগেশন (Investigation)', hi: 'भाग 2: जांच' },
  'surgery.trauma': { en: 'Trauma', bn: 'ট্রমা', hi: 'आघात' },
  'surgery.electiveSurgery': { en: 'Elective Surgery', bn: 'ইলেক্টিভ সার্জারি', hi: 'वैकल्पिक सर्जरी' },
  'surgery.postOpCare': { en: 'Post-operative Care', bn: 'অপারেশন পরবর্তী যত্ন', hi: 'ऑपरेशन के बाद की देखभाल' },
  'surgery.aiAssistant': { en: 'AI SURGICAL ASSISTANT', bn: 'এআই সার্জিক্যাল অ্যাসিস্ট্যান্ট', hi: 'एआई सर्जिकल सहायक' },
  'surgery.shockBlood': { en: 'Shock & Blood Transfusion', bn: 'শক ও রক্ত সঞ্চালন', hi: 'शॉक और रक्त आधान' },
  'surgery.critical': { en: 'CRITICAL', bn: 'গুরুত্বপূর্ণ (CRITICAL)', hi: 'महत्वपूर्ण' },
  'surgery.highYield': { en: 'HIGH-YIELD', bn: 'হাই-yield', hi: 'उच्च उपज' },
  'surgery.markComplete': { en: 'Mark Complete', bn: 'সম্পন্ন হিসেবে চিহ্নিত করুন', hi: 'पूर्ण चिह्नित करें' },
  'surgery.status': { en: 'Chapter Status', bn: 'চ্যাপ্টার স্ট্যাটাস', hi: 'अध्याय की स्थिति' },
  'surgery.outline': { en: 'CHAPTER OUTLINE', bn: 'চ্যাপ্টার আউটলাইন', hi: 'अध्याय की रूपरेखा' },
  'surgery.related': { en: 'RELATED CHAPTERS', bn: 'সম্পর্কিত চ্যাপ্টার', hi: 'संबंधित अध्याय' },
  'surgery.timer': { en: 'LIVE TIMER', bn: 'লাইভ টাইমার', hi: 'लाइव टाइमर' },
  'surgery.clinicalRef': { en: 'CLINICAL REF', bn: 'ক্লিনিক্যাল রেফারেন্স', hi: 'नैदानिक संदर्भ' },
  'surgery.notes': { en: 'NOTES', bn: 'নোটস', hi: 'नोट्स' },
  'surgery.tables': { en: 'TABLES', bn: 'টেবিল', hi: 'टेबल्स' },
  'surgery.emergencies': { en: 'EMERGENCIES', bn: 'জরুরি অবস্থা', hi: 'आपात स्थिति' },
  'surgery.drugs': { en: 'DRUGS', bn: 'ওষুধ', hi: 'दवाएं' },
  'surgery.mcqs': { en: 'MCQS', bn: 'MCQS', hi: 'MCQS' },
  'surgery.summary': { en: 'SUMMARY (BENGALI)', bn: 'সারসংক্ষেপ (বাংলা)', hi: 'सारांश' },
  'surgery.hypovolaemic': { en: 'Hypovolaemic', bn: 'হাইপোভোলেমিক', hi: 'हाइपोवोलेमिक' },
  'surgery.cardiogenic': { en: 'Cardiogenic', bn: 'কার্ডিওজেনিক', hi: 'कार्डियोजेनिक' },
  'surgery.distributive': { en: 'Distributive', bn: 'ডিস্ট্রিবিউটিভ', hi: 'वितरणात्मक' },
  'surgery.extracardiac': { en: 'Extracardiac', bn: 'এক্সট্রাকার্ডিয়াক', hi: 'एक्स्ट्राकार्डियक' },
  'surgery.basicPrinciples': { en: 'Basic Principles', bn: 'বেসিক প্রিন্সিপালস', hi: 'बुनियादी सिद्धांत' },
  'surgery.typesOfShock': { en: 'TYPES OF SHOCK', bn: 'শকের প্রকারভেদ', hi: 'शॉक के प्रकार' },
  'surgery.haemorrhage': { en: 'HAEMORRHAGE', bn: 'রক্তক্ষরণ', hi: 'रক্তस्राव' },
  'surgery.bloodProducts': { en: 'BLOOD PRODUCTS', bn: 'রক্তজাত পণ্য', hi: 'রক্ত উৎপদ' },
  'surgery.massiveProtocol': { en: 'MASSIVE PROTOCOL', bn: 'ম্যাসিভ প্রোটোকল', hi: 'मैसिव प्रोटोकॉल' },

  // Repertory
  'dashboard.apothecaryNote': { en: 'Apothecary Note', bn: 'অ্যাপোথেকারি নোট', hi: 'अपोथेकरी नोट' },
  'dashboard.hahnemannQuote': { en: '"The highest ideal of cure is rapid, gentle and permanent restoration of health."', bn: '"আরোগ্যের সর্বোচ্চ আদর্শ হলো দ্রুত, মৃদু এবং স্থায়ীভাবে স্বাস্থ্যের পুনরুদ্ধার।"', hi: '"इलाज का उच्चतम आदर्श स्वास्थ्य की तीव्र, कोमल और स्थायी बहाली है।"' },
  'dashboard.philosophy': { en: 'Philosophy', bn: 'দর্শন (Philosophy)', hi: 'दर्शन' },
  'dashboard.readOrganon': { en: 'Read Organon', bn: 'অর্গানন পড়ুন', hi: 'ऑर्गेनन पढ़ें' },
  'dashboard.upcomingReminders': { en: 'Upcoming Reminders', bn: 'আসন্ন রিমাইন্ডার', hi: 'आगामी अनुस्मारक' },
  'dashboard.noReminders': { en: 'No active reminders.', bn: 'কোন সক্রিয় রিমাইন্ডার নেই।', hi: 'कोई सक्रिय अनुस्मारक नहीं।' },

  'patients.registerNew': { en: 'Register New Patient', bn: 'নতুন রোগী নিবন্ধন করুন', hi: 'नया मरीज पंजीकृत करें' },
  'patients.fillDetails': { en: 'Fill in the details to add a new patient to the database', bn: 'ডাটাবেসে নতুন রোগী যোগ করতে বিস্তারিত তথ্য পূরণ করুন', hi: 'डेटाबेस में नया मरीज जोड़ने के लिए विवरण भरें' },
  'patients.fullName': { en: 'Full Name', bn: 'পুরো নাম', hi: 'पूरा नाम' },
  'patients.age': { en: 'Age', bn: 'বয়স', hi: 'आयु' },
  'patients.gender': { en: 'Gender', bn: 'লিঙ্গ (Gender)', hi: 'लिंग' },
  'patients.phone': { en: 'Phone Number', bn: 'ফোন নম্বর', hi: 'फ़ोन नंबर' },
  'patients.initialStatus': { en: 'Initial Status', bn: 'প্রাথমিক অবস্থা', hi: 'प्रारंभिक स्थिति' },
  'patients.saveRecord': { en: 'Save Record', bn: 'রেকর্ড সংরক্ষণ করুন', hi: 'रिकॉर्ड सहेजें' },
  'patients.sortBy': { en: 'Sort by:', bn: 'সাজানোর ধরণ:', hi: 'इसके अनुसार क्रमबद्ध करें:' },
  'patients.date': { en: 'Date', bn: 'তারিখ', hi: 'तारीख' },
  'patients.name': { en: 'Name', bn: 'নাম', hi: 'नाम' },
  'patients.showing': { en: 'Showing', bn: 'দেখানো হচ্ছে', hi: 'दिखाया जा रहा है' },
  'patients.of': { en: 'of', bn: 'এর মধ্যে', hi: 'का' },
  'patients.id': { en: 'ID', bn: 'আইডি', hi: 'आईडी' },
  'patients.details': { en: 'Patient Details', bn: 'রোগীর বিবরণ', hi: 'मरीज विवरण' },
  'patients.demographics': { en: 'Demographics', bn: 'জনসংখ্যাতাত্ত্বিক বিবরণ', hi: 'जनसांख्यिकी' },
  'patients.treatment': { en: 'Current Treatment', bn: 'বর্তমান চিকিৎসা', hi: 'वर्तमान उपचार' },
  'patients.registeredOn': { en: 'Registered On', bn: 'নিবন্ধিত', hi: 'पंजीकृत' },
  'patients.actions': { en: 'Actions', bn: 'অ্যাকশন', hi: 'क्रियाएं' },
  'patients.noPatientsFound': { en: 'No patients found', bn: 'কোন রোগী পাওয়া যায়নি', hi: 'कोई मरीज नहीं मिला' },
  'patients.tryAdjusting': { en: 'Try adjusting your search or add a new patient', bn: 'আপনার অনুসন্ধান পরিবর্তন করুন বা নতুন রোগী যোগ করুন', hi: 'अपनी खोज को समायोजित करने का प्रयास करें या एक नया मरीज जोड़ें' },
  'patients.deleteConfirmTitle': { en: 'Delete Patient?', bn: 'রোগী মুছে ফেলবেন?', hi: 'मरीज हटाएं?' },
  'patients.deleteConfirmDesc': { en: 'Are you sure you want to delete this patient? This action cannot be undone.', bn: 'আপনি কি নিশ্চিত যে এই রোগীকে মুছে ফেলতে চান? এই কাজটি আর ফিরিয়ে আনা সম্ভব নয়।', hi: 'क्या आप वाकई इस मरीज को हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।' },
  'patients.confirmDelete': { en: 'Confirm Delete', bn: 'মুছে ফেলার নিশ্চিত করুন', hi: 'हटाने की पुष्टि करें' },

  'repertory.chapters': { en: 'Chapters', bn: 'অধ্যায়সমূহ', hi: 'अध्याय' },
  'repertory.index': { en: "Kent's Repertory Index", bn: "কেন্ট'স রেপার্টরি ইনডেক্স", hi: 'केंट रिपरटरी इंडेक्स' },
  'repertory.browser': { en: 'Repertory Browser', bn: 'রেপার্টরি ব্রাউজার', hi: 'रिपरटरी ब्राउज़र' },
  'repertory.centralRepertory': { en: 'Central Repertory', bn: 'কেন্দ্রীয় রেপার্টরি', hi: 'केंद्रीय रिपरटरी' },
  'repertory.filters': { en: 'Filters', bn: 'ফিল্টার', hi: 'फ़िल्टर' },
  'repertory.filter.all': { en: 'All', bn: 'সব', hi: 'सब' },
  'repertory.filter.mind': { en: 'Mind', bn: 'মন', hi: 'मन' },
  'repertory.filter.time': { en: 'Time', bn: 'সময়', hi: 'समय' },
  'repertory.filter.side': { en: 'Side', bn: 'পার্শ্ব', hi: 'पार्श्व' },
  'repertory.filter.modalities': { en: 'Modalities', bn: 'মোডালিটি', hi: 'तौर-तरीके' },
  'repertory.filter.physicalGenerals': { en: 'Physical Generals', bn: 'শারীরিক সাধারণ লক্ষণ', hi: 'शारीरिक सामान्य लक्षण' },
  'repertory.filter.condition': { en: 'Condition', bn: 'রোগতাত্ত্বিক অবস্থা', hi: 'रोग संबंधी स्थिति' },
  'repertory.sort': { en: 'Sort', bn: 'সাজান', hi: 'क्रमबद्ध करें' },
  'repertory.rubricDetails': { en: 'Rubric Details', bn: 'রুব্রিক বিস্তারিত', hi: 'रूब्रिक विवरण' },
  'repertory.topRemedies': { en: 'Top Remedies', bn: 'শীর্ষ ওষুধসমূহ', hi: 'शीर्ष उपचार' },
  'repertory.viewSubrubrics': { en: 'View Subrubrics', bn: 'সাব-রুব্রিক দেখুন', hi: 'उप-रूब्रिक्स देखें' },
  'repertory.addToSelection': { en: 'Add to Selection', bn: 'নির্বাচনে যোগ করুন', hi: 'चयन में जोड़ें' },
  'repertory.activeAnalysis': { en: 'Active Repertorization', bn: 'সক্রিয় রেপার্টরাইজেশন', hi: 'सक्रिय रिपरटराइजेशन' },
  'repertory.rubricsSelected': { en: 'Rubrics Selected', bn: 'রুব্রিক নির্বাচিত', hi: 'रूब्रिक्स चयनित' },
  'repertory.viewDetailed': { en: 'View Detailed Analysis', bn: 'বিস্তারিত বিশ্লেষণ দেখুন', hi: 'विस्तृत विश्लेषण देखें' },
  'repertory.topRemedyMatches': { en: 'Top Remedy Matches', bn: 'শীর্ষ ওষুধের মিল', hi: 'शीर्ष उपचार मिलान' },

  // Settings
  'settings.title': { en: 'Settings', bn: 'সেটিংস', hi: 'सेटिंग्स' },
  'settings.preferences': { en: 'Preferences', bn: 'পছন্দসমূহ', hi: 'वरीयताएँ' },
  'settings.interfaceLanguage': { en: 'Interface Language', bn: 'ইন্টারফেস ভাষা', hi: 'इंटरफेस भाषा' },
  'settings.theme': { en: 'App Theme', bn: 'অ্যাপ থিম', hi: 'ऐप थीम' },
  'settings.notifications': { en: 'Notifications', bn: 'বিজ্ঞপ্তি', hi: 'सूचनाएं' },
  'settings.clinicalProfile': { en: 'Clinical Profile', bn: 'ক্লিনিকাল প্রোফাইল', hi: 'नैदानिक प्रोफ़ाइल' },
  'settings.fullName': { en: 'Full Name', bn: 'পুরো নাম', hi: 'पूरा नाम' },
  'settings.specialization': { en: 'Specialization', bn: 'বিশেষজ্ঞতা', hi: 'विशेषज्ञता' },
  'settings.clinicName': { en: 'Clinic Name', bn: 'ক্লিনিকের নাম', hi: 'क्लीनिक का नाम' },
  'settings.emailAddress': { en: 'Email Address', bn: 'ইমেল ঠিকানা', hi: 'ईमेल पता' },
  'settings.regNumber': { en: 'Registration Number', bn: 'রেজিস্ট্রেশন নম্বর', hi: 'पंजीकरण संख्या' },
  'settings.phoneNumber': { en: 'Phone Number', bn: 'ফোন নম্বর', hi: 'फ़ोन नंबर' },
  'settings.clinicAddress': { en: 'Clinic Address', bn: 'ক্লিনিকের ঠিকানা', hi: 'क्लीनिक का पता' },
  'settings.chamberTimings': { en: 'Chamber Timings', bn: 'চেম্বারের সময়সীমা', hi: 'चैंबर का समय' },
  'settings.consultationFees': { en: 'Consultation Fees', bn: 'পরামর্শ ফি', hi: 'परामर्श शुल्क' },
  'settings.experience': { en: 'Years of Experience', bn: 'অভিজ্ঞতা (বছর)', hi: 'अनुभव (वर्ष)' },
  'settings.bio': { en: 'About / Professional Bio', bn: 'সম্পর্কে / পেশাদার বায়ো', hi: 'मेरे बारे में / पेशेवर बायो' },
  'settings.clinicLogo': { en: 'Clinic Logo', bn: 'ক্লিনিক লোগো', hi: 'क्लीनিক लोगो' },
  'settings.whatsapp': { en: 'WhatsApp Number', bn: 'হোয়াটসঅ্যাপ নম্বর', hi: 'व्हाट्सएप नंबर' },
  'settings.website': { en: 'Clinic Website', bn: 'ক্লিনিক ওয়েবসাইট', hi: 'क्लीनিক वेबसाइट' },
  'settings.socialLinks': { en: 'Social Media Links', bn: 'সোশ্যাল মিডিয়া লিঙ্ক', hi: 'सोशल मीडिया लिंक' },
  'settings.saveProfile': { en: 'Save Profile Changes', bn: 'প্রোফাইল পরিবর্তন সংরক্ষণ করুন', hi: 'प्रोफ़ाइल परिवर्तन सहेजें' },
  'settings.digitalSignature': { en: 'Digital Signature', bn: 'ডিজিটাল স্বাক্ষর', hi: 'डिजिटल हस्ताक्षर' },
  'settings.signatureDesc': { en: 'Choose how you want your signature to appear on prescriptions.', bn: 'প্রেসক্রিপশনে আপনার স্বাক্ষর কীভাবে প্রদর্শিত হবে তা চয়ন করুন।', hi: 'चुनें कि आप अपना हस्ताक्षर नुस्खे पर कैसे दिखाना चाहते हैं।' },
  'settings.manualUpload': { en: 'Manual Upload', bn: 'ম্যানুয়াল আপলোড', hi: 'मैनुअल अपलोड' },
  'settings.systemGenerated': { en: 'System Generated', bn: 'সিস্টেম দ্বারা তৈরি', hi: 'सिस्टम द्वारा निर्मित' },
  
  // Clinical Intake
  'intake.title': { en: 'Clinical Intake', bn: 'ক্লিনিকাল ইনটেক', hi: 'नैदानिक इनटेक' },
  'intake.save': { en: 'Save Case', bn: 'কেস সেভ করুন', hi: 'केस सहेजें' },
  'intake.analyze': { en: 'Analyze in Repertory', bn: 'রেপার্টরিতে বিশ্লেষণ করুন', hi: 'रिपरटरी में विश्लेषण करें' },
  'intake.report': { en: 'Report', bn: 'রিপোর্ট', hi: 'रिपोर्ट' },
  'intake.location': { en: 'Location & Extension', bn: 'স্থান এবং বিস্তার', hi: 'स्थान और विस्तार' },
  'intake.sensation': { en: 'Detailed Sensation', bn: 'বিস্তারিত অনুভূতি', hi: 'विस्तृत अनुभूति' },
  'intake.modalities': { en: 'Modalities (Agg/Amel)', bn: 'মোডালিটি (বৃদ্ধি/উপশম)', hi: 'तौर-तरीके (Agg/Amel)' },
  'intake.concomitant': { en: 'Concomitant', bn: 'সহগামী লক্ষণ', hi: 'सहवर्ती' },
  'intake.searchSuggestions': { en: 'Search Suggestions', bn: 'অনুসন্ধান প্রস্তাবনা', hi: 'खोज सुझाव' },
  'intake.commonComplaints': { en: 'Common Complaints', bn: 'সাধারণ অভিযোগসমূহ', hi: 'सामान्य शिकायतें' },
  'intake.generalCategory': { en: 'General', bn: 'সাধারণ (General)', hi: 'सामान्य' },
  'intake.fullAnalysisView': { en: 'Full Case Analysis View', bn: 'সম্পূর্ণ কেস বিশ্লেষণ চিত্র', hi: 'पूर्ण केस विश्लेषण दृश्य' },
  'intake.caseReport': { en: 'Case Report', bn: 'কেস রিপোর্ট', hi: 'केस रिपोर्ट' },
  'intake.physicalGeneralsTitle': { en: 'Physical Generals and Vital Modalities', bn: 'শারীরিক সাধারণ লক্ষণ এবং ভাইটাল মোডালিটি', hi: 'शारीरिक सामान्य लक्षण और महत्वपूर्ण तौर-तरीके' },
  'intake.mentalStateTitle': { en: 'Mental State & Emotional Portrait', bn: 'মানসিক অবস্থা এবং আবেগীয় চিত্র', hi: 'मानसिक स्थिति और भावनात्मक चित्रण' },
  'intake.analysisAssessment': { en: 'Analysis & Clinical Assessment', bn: 'বিশ্লেষণ এবং ক্লিনিকাল মূল্যায়ন', hi: 'विश्लेषण और नैदानिक मूल्यांकन' },
  'intake.rubricsEvidence': { en: 'Rubrics & Case Evidence', bn: 'রুব্রিক্স এবং কেস প্রমাণ', hi: 'रूब्रिक्स और केस साक्ष्य' },
  'intake.presentingComplaints': { en: 'Presenting Complaints', bn: 'প্রধান অভিযোগসমূহ', hi: 'प्रस्तुत शिकायतें' },
  'intake.mentalState': { en: 'Mental State', bn: 'মানসিক অবস্থা', hi: 'मानसिक स्थिति' },
  'intake.physicalGenerals': { en: 'Physical Generals', bn: 'শারীরিক সাধারণ লক্ষণ', hi: 'शारीरिक सामान्य' },
  'intake.history': { en: 'History', bn: 'ইতিহাস', hi: 'इतिहास' },
  'intake.addComplaint': { en: 'Add Complaint', bn: 'অভিযোগ যোগ করুন', hi: 'शिकायत जोड़ें' },
  'intake.addSymptom': { en: 'Add Symptom', bn: 'লক্ষণ যোগ করুন', hi: 'लक्षण जोड़ें' },
  'intake.historyPlaceholder': { en: 'Family history, past illnesses, vaccination, suppressed diseases...', bn: 'পারিবারিক ইতিহাস, পূর্বের রোগ, টিকাদান, অবদমিত রোগ...', hi: 'पारिवारिक इतिहास, पिछली बीमारियाँ, टीकाकरण, दबी हुई बीमारियाँ...' },
  
  // Common
  'common.search': { en: 'Search', bn: 'খুঁজুন', hi: 'खोजें' },
  'common.confirm': { en: 'Confirm', bn: 'নিশ্চিত করুন', hi: 'पुष्टि करें' },
  'common.back': { en: 'Back', bn: 'পিছনে', hi: 'पीछे' },
  'common.next': { en: 'Next', bn: 'পরবর্তী', hi: 'अगला' },
  'analysis.unknown': { en: 'Unknown', bn: 'অজানা', hi: 'अज्ञात' },
  'analysis.miasm': { en: 'Miasm', bn: 'মায়াজম', hi: 'मियाज़्म' },
  'analysis.indicated': { en: 'Indicated', bn: 'নির্দেশিত', hi: 'संकेतित' },
  'analysis.selected': { en: 'Selected', bn: 'নির্বাচিত', hi: 'चयनित' },
  'analysis.lastVisit': { en: 'Last Visit', bn: 'শেষ ভিজিট', hi: 'पिछली यात्रा' },
  'analysis.psoric': { en: 'Psoric', bn: 'সোরিক', hi: 'सोरिक' },
  'analysis.syphilitic': { en: 'Syphilitic', bn: 'সিফিলিটিক', hi: 'सिफिलिटिक' },
  'analysis.sycotic': { en: 'Sycotic', bn: 'সাইকোটিক', hi: 'साइकोटिक' },
  'analysis.load': { en: 'Load', bn: 'লোড (Load)', hi: 'लोड' },
  'analysis.miasmaticAnalysis': { en: 'Miasmatic Analysis', bn: 'মায়াজমেটিক বিশ্লেষণ', hi: 'मियैमैटिक विश्लेषण' },
  'analysis.top2Indicated': { en: 'Top 2 Indicated', bn: 'শীর্ষ ২টি নির্দেশিত', hi: 'शीर्ष 2 संकेतित' },
  'analysis.addRubricsForCompare': { en: 'Add more rubrics to see comparison between top indicated remedies.', bn: 'শীর্ষ নির্দেশিত ওষুধের মধ্যে তুলনা দেখতে আরও রুব্রিক যোগ করুন।', hi: 'शीर्ष संकेतित उपचारों के बीच तुलना देखने के लिए और अधिक रूब्रिक्स जोड़ें।' },
  'analysis.compareTop2Desc': { en: 'Compare the top two indicated remedies, {r1} and {r2}, side-by-side in the Materia Medica browser for a precise differential diagnosis.', bn: 'সঠিক ডিফারেনশিয়াল ডায়াগনসিসের জন্য মেটেরিয়া মেডিকা ব্রাউজারে পাশাপাশি দুটি নির্দেশিত ওষুধ, {r1} এবং {r2} তুলনা করুন।', hi: 'सटीक विभेदक निदान के लिए मटेरिया मेडिका ब्राउज़र में साथ-साथ दो संकेतित उपचारों, {r1} और {r2} की तुलना करें।' },
  'common.none': { en: 'None', bn: 'কিছু না', hi: 'कोई नहीं' },
  'common.remedy': { en: 'Remedy', bn: 'ওষুধ', hi: 'उपचार' },
  'common.score': { en: 'Score', bn: 'স্কোর', hi: 'स्कोर' },
  'common.coverage': { en: 'Coverage', bn: 'কভারেজ', hi: 'कवरेज' },
  'physiology.rubrics': { en: 'Rubrics', bn: 'রুব্রিক্স', hi: 'रुब्रिक्स' },
  'physiology.criticalSystem': { en: 'Critical System', bn: 'গুরুত্বপূর্ণ সিস্টেম', hi: 'महत्वपूर्ण प्रणाली' },
  'physiology.anatomyOf': { en: 'The Anatomy of the', bn: 'এনাটোমি', hi: 'एनाटॉमी' },
  'physiology.relevantRubrics': { en: 'Relevant Homeopathic Rubrics', bn: 'প্রাসঙ্গিক হোমিওপ্যাথিক রুব্রিক্স', hi: 'प्रासंगिक होम्योपैथिक रुब्रिक्स' },
  'physiology.anatomyFigure': { en: 'Anatomy Figure', bn: 'এনাটোমি চিত্র', hi: 'एनाटॉमी आकृति' },
  'physiology.anatomySectioning': { en: 'Sectioning', bn: 'বিভাগীয় সংস্করণ', hi: 'सेक्शनिंग' },
  'physiology.updateDiagram': { en: 'Update Diagram', bn: 'ডায়াগ্রাম আপডেট করুন', hi: 'आरेख अपडेट करें' },
  'physiology.anatomyTag': { en: 'Anatomy Tag', bn: 'এনাটোমি ট্যাগ', hi: 'एनाटॉमी टैग' },
  'physiology.primaryStructure': { en: 'Primary Structure', bn: 'প্রাথমিক কাঠামো', hi: 'प्राथमिक संरचना' },
  'physiology.connectiveTissue': { en: 'Connective Tissue', bn: 'কানেক্টিভ টিস্যু', hi: 'संयोजी ऊतक' },
  'physiology.neuralInterface': { en: 'Neural Interface', bn: 'নিউরাল ইন্টারফেস', hi: 'तंत्रिका इंटरफ़ेस' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, variables?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as Language) || 'en';
    }
    return 'en';
  });

  const t = (key: string, variables?: Record<string, string>): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    let text = translations[key][language];
    if (variables) {
      Object.entries(variables).forEach(([name, value]) => {
        text = text.replace(`{${name}}`, value);
      });
    }
    return text;
  };

  const setLanguageAndStore = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLanguageAndStore, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
