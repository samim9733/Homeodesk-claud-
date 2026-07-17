import fs from 'fs';
import { DIAGNOSES_DATA } from './src/practiceMedicineData';

const data = `51. Cystic Fibrosis (সিস্টিক ফাইব্রোসিস)
লক্ষণ: ঘন শ্লেষ্মা, বারবার ফুসফুসের সংক্রমণ, ক্লান্তি, প্যানক্রিয়াসের অভাবে অপুষ্টি, লবণাক্ত ঘাম।
রোগ নির্ণয়: ঘাম ক্লোরাইড টেস্ট, জিন বিশ্লেষণ (CFTR মিউটেশন)।
হোমিওপ্যাথি ওষুধ: Pulsatilla 30C, Kali mur 6X, Phosphorus 30C, Silicea 30C, Tuberculinum 200C
রেপাটরি: Cystic fibrosis, thick mucus - Kali mur; Recurrent chest infections - Tuberculinum; Malabsorption - Phosphorus; Salt craving - Natrum mur।
জটিলতা: ব্রংকাইক্টেসিস, অগ্ন্যাশয়ের অপ্রতুলতা, লিভার সিরোসিস।
সারাংশ: জিনঘটিত রোগ। লক্ষণভিত্তিক হোমিওপ্যাথি সহায়ক।

52. Dandruff (খুশকি)
লক্ষণ: মাথার ত্বকে সাদা বা হলুদ আঁশ, চুলকানি, শুষ্ক বা তৈলাক্ত ত্বক, চুল পড়া।
রোগ নির্ণয়: ক্লিনিক্যাল।
হোমিওপ্যাথি ওষুধ: Thuja 30C, Mezereum 30C, Kali sulphuricum 30C, Graphites 30C, Phosphorus 30C
রেপাটরি: Dandruff, white scales - Thuja; Crusty with itching - Mezereum; Yellow scales - Kali sulph; Bleeding when scratched - Graphites।
জটিলতা: সেবোরিক ডার্মাটাইটিস, ফলিকুলাইটিস।
সারাংশ: ছত্রাক ও সিবামের ভারসাম্যহীনতা। Thuja ও Graphites প্রধান।

53. Deafness (বধিরতা)
লক্ষণ: শব্দ শুনতে অসুবিধা, কানে ভোঁ ভোঁ শব্দ (টিনিটাস), কথা বলার সময় উচ্চস্বরে বলা, সামাজিক প্রত্যাহার।
রোগ নির্ণয়: অডিওমেট্রি, টাইমপ্যানোমেট্রি, ক্লিনিক্যাল।
হোমিওপ্যাথি ওষুধ: Pulsatilla 30C (সর্দি পরবর্তী), Calcarea carb 30C (গ্ল্যান্ডুলার), Chininum sulphuricum 30C (টিনিটাস), Silicea 30C (যখন পুঁজ হয়), Lycopodium 30C (ডান কান বেশি)
রেপাটরি: Deafness, after catarrh - Pulsatilla; Tinnitus - Chininum sulph; Chronic suppuration - Silicea; Right ear - Lycopodium।
জটিলতা: সামাজিক বিচ্ছিন্নতা, বিষণ্নতা।
সারাংশ: বিভিন্ন কারণ (বয়স, সংক্রমণ, শব্দ)। Pulsatilla ও Chininum sulph বিশেষ।

54. Delirium Tremens (মদ্যপায়ের প্রলাপ)
লক্ষণ: মদ্যপানের পর থমথমে অবস্থা, কাঁপুনি, ভ্রম (কীটপতঙ্গ দেখা), অস্থিরতা, ঘাম, খিঁচুনি, অনিদ্রা, অজ্ঞান।
রোগ নির্ণয়: ক্লিনিক্যাল ইতিহাস (অ্যালকোহল উইথড্রোয়াল), লক্ষণ।
হোমিওপ্যাথি ওষুধ: Lachesis 30C, Belladonna 30C, Hyoscyamus 30C, Stramonium 30C, Arsenicum album 30C
রেপাটরি: Delirium tremens, seeing animals - Lachesis; Trembling - Hyoscyamus; Fear of water - Belladonna; Restlessness - Ars।
জটিলতা: সিজার, কার্ডিয়াক অ্যারেস্ট।
সারাংশ: অ্যালকোহল নির্ভরতার তীব্র প্রত্যাহার উপসর্গ। Lachesis ও Hyoscyamus প্রাথমিক।

55. Depression (বিষণ্নতা)
লক্ষণ: দীর্ঘস্থায়ী মেজার খারাপ থাকা, আগ্রহ হারানো, ক্লান্তি, ঘুম ও ক্ষুধায় পরিবর্তন, আত্মহত্যার চিন্তা।
রোগ নির্ণয়: DSM-5 মানদণ্ড, হ্যামিলটন ডিপ্রেশন স্কেল।
হোমিওপ্যাথি ওষুধ: Ignatia 30C (শোকে), Natrum mur 30C (নীরব দুঃখ), Aurum met 30C (আত্মহত্যার প্রবণতা), Pulsatilla 30C (কান্নাকাটি, সান্ত্বনা চায়), Sepia 30C (উদাসীন, বিরক্তিবোধ)
রেপাটরি: Depression, grief - Ignatia; Silent grief - Nat mur; Suicidal - Aurum; Weepy - Pulsatilla; Indifferent - Sepia।
জটিলতা: আত্মহত্যা, অ্যালকোহল আসক্তি।
সারাংশ: মানসিক রোগ। Ignatia ও Nat mur ক্লাসিক রেমেডি।

56. Diabetes Mellitus (ডায়াবেটিস)
লক্ষণ: অতিরিক্ত পিপাসা, ঘন ঘন প্রস্রাব, অতিরিক্ত ক্ষুধা, ওজন কমা, ক্লান্তি, ক্ষত শুকাতে দেরি।
রোগ নির্ণয়: ফাস্টিং ব্লাড সুগার, HbA1c, গ্লুকোজ টলারেন্স টেস্ট।
হোমিওপ্যাথি ওষুধ: Syzygium jambolanum Q, Uranium nitricum 30C, Phosphorus 30C, Abroma augusta Q, Cephalandra indica Q
রেপাটরি: Diabetes, polyuria - Syzygium; Sugar in urine - Uranium nit; Weight loss - Phosphorus; Insatiable thirst - Abroma।
জটিলতা: নেফ্রোপ্যাথি, রেটিনোপ্যাথি, নিউরোপ্যাথি, ফুট আলসার।
সারাংশ: ইনসুলিনের অপ্রতুলতা বা রেজিস্ট্যান্স। Syzygium জাম্বোলানাম খুবই কার্যকর।

57. Dryness of Mouth (শুকনো মুখ)
লক্ষণ: মুখ শুষ্ক, লালা কম, গিলতে কষ্ট, জিহ্বায় ফাটল, স্বাদ কম পাওয়া।
রোগ নির্ণয়: ক্লিনিক্যাল, শোগ্রেন সিন্ড্রোম পরীক্ষা।
হোমিওপ্যাথি ওষুধ: Bryonia 30C, Belladonna 30C, Aconite 30C, Nux moschata 30C (খুব শুষ্ক), Pulsatilla 30C (শুষ্ক মুখ কিন্তু পিপাসা নেই)
রেপাটরি: Mouth dry, thirst great - Bryonia; Thirstless - Pulsatilla; Food tastes dry - Nux moschata; Red dry tongue - Belladonna।
জটিলতা: দাঁতের ক্ষয়, সংক্রমণ।
সারাংশ: ওষুধের পার্শ্বপ্রতিক্রিয়া বা রোগের লক্ষণ। Nux moschata বিশেষ।

58. Dysmenorrhoea (মাসিকের ব্যথা)
লক্ষণ: মাসিক শুরুর আগে বা সময় পেটের নিচে তীব্র ব্যথা, পিঠে ব্যথা, বমি বমি ভাব, মাথাব্যথা, ক্লান্তি।
রোগ নির্ণয়: ক্লিনিক্যাল, পেলভিক আলট্রাসাউন্ড (এন্ডোমেট্রিওসিস বাদে)।
হোমিওপ্যাথি ওষুধ: Mag phos 30C (মোচড়ানো ব্যথা, গরমে ভাল), Colocynthis 30C (ব্যথায় কুঁকড়ে যায়), Caulophyllum 30C (আক্রমণের আগে), Pulsatilla 30C (পরিবর্তনশীল মেজাজ), Cimicifuga 30C (ব্যথা পিঠে ও উরুতে ছড়ায়)
রেপাটরি: Dysmenorrhoea, cramping - Mag phos; Better by doubling up - Colocynthis; Before menses - Caulophyllum; Changeable - Pulsatilla; Radiating to back - Cimicifuga।
জটিলতা: এন্ডোমেট্রিওসিস, বন্ধ্যাত্ব।
সারাংশ: প্রোস্টাগ্লান্ডিনের কারণে জরায়ুর সংকোচন। Mag phos দ্রুত উপশম দেয়।

59. Earache (কানে ব্যথা)
লক্ষণ: কানে তীব্র ব্যথা, টানা ব্যথা, জ্বর থাকতে পারে, শ্রবণশক্তি কমে যাওয়া, শিশুর কান ধরা।
রোগ নির্ণয়: অটোস্কোপি (কানের পর্দা লাল ও ফোলা)।
হোমিওপ্যাথি ওষুধ: Belladonna 30C (হঠাৎ তীব্র ব্যথা, লালতা), Chamomilla 30C (অসহনীয় ব্যথা, শিশু জ্বালাতন), Pulsatilla 30C (থোকা স্রাব), Ferrum phos 30C (প্রাথমিক পর্যায়), Hepar sulph 30C (ছিদ্র হয়ে পুঁজ বের হওয়া)
রেপাটরি: Earache, sudden - Belladonna; Intolerable pain - Chamomilla; After cold - Pulsatilla; Discharge - Hepar; Throbbing - Ferrum phos।
জটিলতা: কানের পর্দা ছিদ্র, মাস্টয়েডাইটিস।
সারাংশ: ওটিটিস মিডিয়ার কারণে। Belladonna ও Chamomilla প্রথম সারি।

60. Eczema (একজিমা)
লক্ষণ: ত্বক লাল, চুলকানি, শুষ্ক বা ভেজা ফোসকা, ঘা থেকে পানি পড়া, পুরু আঁশ জমা।
রোগ নির্ণয়: ক্লিনিক্যাল, প্যাচ টেস্ট (অ্যালার্জি)।
হোমিওপ্যাথি ওষুধ: Graphites 30C (মধুর মতো স্রাব), Sulphur 30C (চুলকানি, রাতে বেড়ে), Petroleum 30C (শীতকালে ফাটা), Natrum mur 30C (শুষ্ক, ছোট ফোসকা), Mezereum 30C (পুরু আঁশ, পুঁজ)
রেপাটরি: Eczema, oozing sticky - Graphites; Burning and itching - Sulphur; Fissured - Petroleum; Dry, crusty - Nat mur; Thick crusts - Mezereum।
জটিলতা: সেকেন্ডারি ইনফেকশন, লাইকেনিফিকেশন।
সারাংশ: এলার্জি বা ইমিউন ডিজঅর্ডার। Graphites ও Sulphur ক্লাসিক।

61. Endometriosis (এন্ডোমেট্রিওসিস)
লক্ষণ: তীব্র মাসিক ব্যথা, মাসিকের সময় অতিরিক্ত রক্তপাত, বন্ধ্যাত্ব, যৌনমিলনে ব্যথা, কোমর ব্যথা।
রোগ নির্ণয়: ল্যাপারোস্কোপি, পেলভিক এমআরআই।
হোমিওপ্যাথি ওষুধ: Lachesis 30C (মাসিক শুরুর আগে খারাপ, প্রবাহ শুরু হলে ভাল), Sepia 30C (চাপ অনুভব, অবসাদ), Belladonna 30C (তীব্র ব্যথা, জ্বালাপোড়া), Cimicifuga 30C (ব্যথা পিঠে ও উরুতে), Platina 30C (যৌনাঙ্গের অতিসংবেদনশীলতা)
রেপাটরি: Endometriosis, pain before menses - Lachesis; Bearing down - Sepia; Sudden pain - Belladonna; Radiating pain - Cimicifuga; Vaginal hypersensitivity - Platina।
জটিলতা: বন্ধ্যাত্ব, ওভারিয়ান সিস্ট।
সারাংশ: জরায়ুর আস্তরণ বাইরে বেড়ে ওঠা। Lachesis ও Sepia প্রধান।

62. Enuresis (বিছানা ভিজানো)
লক্ষণ: শিশুদের অনিচ্ছাকৃত প্রস্রাব (রাতে বা দিনে), ৫ বছরের বেশি বয়সে, ঘন ঘন প্রস্রাবের তাগিদ থাকতে পারে।
রোগ নির্ণয়: ইউরিনালাইসিস, ইউরিন কালচার, ব্লাড সুগার।
হোমিওপ্যাথি ওষুধ: Causticum 30C (শয্যায় প্রথম ঘুমে, স্বপ্ন দেখে প্রস্রাব), Equisetum 30C (মূত্রাশয়ে ব্যথা সহ), Kreosotum 30C (গভীর ঘুম), Pulsatilla 30C (দিনে ও রাতে, পরিবর্তনশীল), Sepia 30C (প্রস্রাবের সময় কাশি বা হাঁচি)
রেপাটরি: Enuresis, first sleep - Causticum; Deep sleep - Kreosotum; Day wetting - Pulsatilla; Urgency - Equisetum; Involuntary - Sepia।
জটিলতা: সংক্রমণ, মানসিক সমস্যা।
সারাংশ: বেশিরভাগ শিশুর বয়সে সেরে যায়। Causticum ও Kreosotum উত্তম।

63. Epicondylitis (টেনিস এলবো)
লক্ষণ: কনুইয়ের বাইরের দিকে ব্যথা, বস্তু তুললে বা হাত ঘোরালে ব্যথা বাড়ে, স্থানীয় কোমলতা।
রোগ নির্ণয়: ক্লিনিক্যাল, প্রতিরোধী প্রসারন পরীক্ষা।
হোমিওপ্যাথি ওষুধ: Rhus tox 30C (নড়াচড়ায় ব্যথা কমে ও পরে বাড়ে), Bryonia 30C (নড়াচড়ায় ব্যথা বাড়ে), Arnica 30C (আঘাতের পর), Hypericum 30C (স্নায়বিক ব্যথা), Causticum 30C (স্থায়ী অবসাদ)
রেপাটরি: Tennis elbow, painful motion - Rhus tox; Worse on movement - Bryonia; After injury - Arnica; Burning pain - Causticum।
জটিলতা: ক্রনিক ব্যথা।
সারাংশ: রিপিটিটিভ মোশন ইনজুরি। Rhus tox প্রধান।

64. Epilepsy (মৃগী / অ্যাপিলেপসি)
লক্ষণ: বারবার অজ্ঞান হয়ে খিঁচুনি (টনিক-ক্লোনিক বা অনুপস্থিতি), জিহ্বা কামড়ানো, প্রস্রাব নষ্ট, বিভ্রম।
রোগ নির্ণয়: ইইজি, এমআরআই, ব্লাড টেস্ট।
হোমিওপ্যাথি ওষুধ: Cicuta virosa 30C (আঘাত পরবর্তী), Cuprum met 30C (শ্বাস বন্ধ, নীলাভ), Bufo 30C (যৌনাঙ্গের উদ্দীপনা সহ), Causticum 30C (রাতে, ভয়), Silicea 30C (মৃগী মন্দা)
রেপাটরি: Epilepsy, aura in stomach - Cicuta; Violent convulsions - Cuprum; After fright - Causticum; With sexual excitement - Bufo।
জটিলতা: মস্তিষ্কের ক্ষতি, দুর্ঘটনা।
সারাংশ: নিউরোলজিক্যাল ডিজঅর্ডার। Cicuta ও Cuprum গুরুত্বপূর্ণ।

65. Erysipelas (ইরিসিপেলাস)
লক্ষণ: ত্বকের লাল, উঁচু, চকচকে অংশ, স্পষ্ট সীমানা, জ্বর, ঠাণ্ডা লাগা, ব্যথা ও জ্বালা।
রোগ নির্ণয়: ক্লিনিক্যাল, ব্লাড কালচার।
হোমিওপ্যাথি ওষুধ: Belladonna 30C (লাল, জ্বলন্ত, স্পন্দন), Apis 30C (ফোলা, জ্বালাপোড়া, স্পর্শে ব্যথা), Lachesis 30C (নীলচে-লাল, শক্ত), Rhus tox 30C (ফোসকাসহ), Arsenicum album 30C (জ্বালা ও অস্থিরতা)
রেপাটরি: Erysipelas, bright red - Belladonna; Oedematous - Apis; Dark red - Lachesis; Vesicular - Rhus tox; Burning - Ars।
জটিলতা: সেপ্টিসেমিয়া, ফোড়া, লিম্ফিডিমা।
সারাংশ: স্ট্রেপ্টোকক্কাস সংক্রমণ। Belladonna প্রথম সারির ওষুধ।

66. Eye Stye (পিচুটি)
লক্ষণ: চোখের পাতায় লাল ফোলা, ব্যথা, পুঁজ জমা, চুলকানি, আলোতে অসুবিধা।
রোগ নির্ণয়: ক্লিনিক্যাল।
হোমিওপ্যাথি ওষুধ: Pulsatilla 30C, Staphysagria 30C (পুরনো স্টাই), Hepar sulph 30C (পুঁজ হলে), Apis 30C (ফোলা), Silicea 30C (পুনরাবৃত্ত)
রেপাটরি: Stye, acute - Pulsatilla; Recurrent - Staphysagria; Suppurating - Hepar; Oedema - Apis; Hard nodule - Silicea।
জটিলতা: চ্যালাজিয়ন, সেলুলাইটিস।
সারাংশ: স্ট্যাফিলোকক্কাস ইনফেকশন। Pulsatilla ও Staphysagria উল্লেখযোগ্য।

67. Facial Paralysis (মুখের প্যারালাইসিস – বেলস পালসি)
লক্ষণ: হঠাৎ মুখের একপাশ অবশ, চোখ বন্ধ না হওয়া, মুখ বাঁকা, স্বাদ লোপ, কানে শব্দ।
রোগ নির্ণয়: ক্লিনিক্যাল, ইএমজি, (স্ট্রোক বাদে)।
হোমিওপ্যাথি ওষুধ: Causticum 30C (ডান দিক), Aconite 30C (হঠাৎ ঠাণ্ডা বাতাসের পর), Gelsemium 30C (ধীরগতি, সর্দি সহ), Hypericum 30C (স্নায়ুতে চোট), Lathyrus 30C (দুর্বলতা)
রেপাটরি: Facial paralysis, right side - Causticum; After chill - Aconite; With drooping eyelids - Gelsemium; After injury - Hypericum।
জটিলতা: স্থায়ী অচলতা, সিনকাইনেসিস।
সারাংশ: ৭ম ক্র্যানিয়াল স্নায়ুর প্যারালাইসিস। Causticum ও Gelsemium প্রধান।

68. Fatty Liver (ফ্যাটি লিভার)
লক্ষণ: ডান পাঁজরের নিচে চাপ বা ব্যথা, ক্লান্তি, ওজন কমে না, প্রস্রাব গাঢ়, আল্ট্রাসাউন্ডে ফ্যাটি লিভার।
রোগ নির্ণয়: আলট্রাসাউন্ড, লিভার ফাংশন টেস্ট (এসজিপিটি), এফআইবি-৪ স্কোর।
হোমিওপ্যাথি ওষুধ: Carduus marianus Q, Chelidonium 30C, Phosphorus 30C, Lycopodium 30C, Cholesterinum 6C (কলেস্টেরল কমায়)
রেপাটরি: Fatty liver - Carduus mar.; Enlarged tender liver - Chelidonium; Craves sweets - Phosphorus; Fullness after eating - Lycopodium।
জটিলতা: স্টেটোহেপাটাইটিস, সিরোসিস।
সারাংশ: স্থূলতা ও বিপাক সিন্ড্রোমের অংশ। Carduus marianus ও Phosphorus গুরুত্বপূর্ণ।

69. Fistula in Ano (পায়ুপথের ফিসচুলা)
লক্ষণ: পায়ুপথের পাশে ক্ষত, পুঁজ ও রক্তস্রাব, স্থায়ী জল স্রাব, বসলে ব্যথা, কখনো কখনো জ্বর।
রোগ নির্ণয়: ক্লিনিক্যাল পরীক্ষা, ফিস্টুলোগ্রাফি (প্রয়োজনে)।
হোমিওপ্যাথি ওষুধ: Silicea 30C, Berberis vulgaris 30C, Hepar sulph 30C (তীব্র পুঁজ), Arsenicum album 30C (দুর্গন্ধ), Calcium fluoride 30C (শক্ত মাংস)
রেপাটরি: Fistula in ano, discharge thin - Silicea; Offensive - Ars; Burning - Berberis; Indurated edges - Calcarea fluor।
জটিলতা: পুনরাবৃত্ত ফোড়া।
সারাংশ: সার্জারি প্রায়ই লাগে। Silicea ও Berberis সাপোর্টিভ।

70. Flatulence (পেটে গ্যাস)
লক্ষণ: পেট ফুলে ওঠা, বায়ু নির্গমন, পেটে গড়গড় শব্দ, বুক জ্বালা, অম্বল, কামড়ানো ব্যথা।
রোগ নির্ণয়: ক্লিনিক্যাল।
হোমিওপ্যাথি ওষুধ: Lycopodium 30C (পেট ফুলে, ডান দিকে), Carbo veg 30C (পুরো পেট ফুলে, বাতাসের প্রয়োজন), Nux vomica 30C (পেট খারাপের সাথে), Raphanus sativus 30C (গ্যাস উপরের দিকে যেতে পারে না), China 30C (অপুষ্টির সাথে)
রেপাটরি: Flatulence, upper abdomen - Carbo veg; Lower abdomen - Lycopodium; Colic with gas - Nux vomica; Gas not passing - Raphanus।
জটিলতা: সাধারণত গৌণ।
সারাংশ: বিভিন্ন খাদ্য ও অন্ত্রের ব্যাধির ফলে। Lycopodium ও Carbo veg প্রধান।

71. Fracture Healing (হাড় ভাঙা সারানো সহায়ক)
লক্ষণ: হাড় ভাঙার পর ব্যথা, ফোলা, দেরিতে জোড়া লাগা।
রোগ নির্ণয়: এক্স-রে।
হোমিওপ্যাথি ওষুধ: Symphytum Q (হাড় জোড়ার জন্য অতুলনীয়), Calcarea phosphorica 30C (নতুন হাড় গঠন), Arnica 30C (প্রাথমিক ব্যথা ও শক), Ruta 30C (পেরিওস্টিয়ামের ক্ষতি)
রেপাটরি: Fracture, non-union - Symphytum; Slow healing - Calcarea phos; After trauma - Arnica; Pain in periosteum - Ruta।
জটিলতা: নন-ইউনিয়ন, ম্যালইউনিয়ন।
সারাংশ: Symphytum হাড়ের জন্য বিশেষ রেমেডি।

72. Gallstones (পিত্তথলির পাথর)
লক্ষণ: ডান পাঁজরের নিচে কোলিক ব্যথা, বিশেষ করে তৈলাক্ত খাবারের পর, বমি, জ্বর, জন্ডিস (পাথর ব্লক করলে)।
রোগ নির্ণয়: আলট্রাসাউন্ড, সিটি স্ক্যান।
হোমিওপ্যাথি ওষুধ: Chelidonium 30C, Berberis vulgaris 30C, Lycopodium 30C, Nux vomica 30C, Dioscorea 30C (তীব্র ব্যথায়)
রেপাটরি: Gallstones, right shoulder pain - Chelidonium; Radiating to kidneys - Berberis; After rich food - Lycopodium; Nausea - Nux vomica।
জটিলতা: কোলেসিস্টাইটিস, প্যানক্রিয়াটাইটিস।
সারাংশ: পিত্তথলির পাথর উপশমে Chelidonium ও Berberis স্মরণীয়।

73. Giardiasis (জিয়ার্ডিয়াসিস)
লক্ষণ: পেট ফাঁপা, দুর্গন্ধযুক্ত ডায়রিয়া (ফ্লোটিং স্টুল), পেটে ফোলাভাব, ক্লান্তি, ক্ষুধামান্দ্য।
রোগ নির্ণয়: স্টুল মাইক্রোস্কোপি (জিয়ার্ডিয়া সিস্ট/ট্রফোজয়েট) বা এলিসা।
হোমিওপ্যাথি ওষুধ: Arsenicum album 30C, Chionanthus 30C, Mercurius cor 30C, Pulsatilla 30C, China 30C (দুর্বলতা)
রেপাটরি: Giardiasis, floating stool - Chionanthus; Offensive diarrhoea - Ars; Fat intolerance - Mercurius; Alternating stool - Pulsatilla।
জটিলতা: ল্যাকটোজ ইনটলারেন্স, ওজন কমা।
সারাংশ: পরজীবী সংক্রমণ। Chionanthus ভার্জিনিকা ও Arsenicum বিশেষ।

74. Glaucoma (গ্লুকোমা – চোখের চাপ)
লক্ষণ: চোখে ব্যথা, বমি বমি ভাব, আলোর চারপাশে রিং দেখা, দৃষ্টি ধীরে ধীরে কমে যাওয়া (হঠাৎ অ্যাকিউট গ্লুকোমায় চরম ব্যথা)।
রোগ নির্ণয়: টনোমেট্রি (চোখের চাপ মাপা), ফান্ডোস্কোপি।
হোমিওপ্যাথি ওষুধ: Physostigma 30C, Phosphorus 30C, Osmium 30C, Spigelia 30C (চোখের পেছনে ব্যথা), Gelsemium 30C (অলসতা)
রেপাটরি: Glaucoma, increased tension - Physostigma; Halos around light - Phosphorus; Pain in eyes - Spigelia; Nausea - Gelsemium।
জটিলতা: অপটিক নার্ভ ড্যামেজ, স্থায়ী অন্ধত্ব।
সারাংশ: চোখের ভেতর চাপ বেড়ে যায়। Physostigma প্রধান রেমেডি।

75. Gout (গেঁটে বাত)
লক্ষণ: বড় পায়ের আঙুলের গোড়ালিতে হঠাৎ তীব্র ব্যথা, ফোলা, লালচে, স্পর্শে অত্যন্ত কোমল, জ্বর হতে পারে।
রোগ নির্ণয়: জয়েন্ট ফ্লুইডে ইউরিক এসিড ক্রিস্টাল, সিরাম ইউরিক অ্যাসিড বেড়ে যাওয়া।
হোমিওপ্যাথি ওষুধ: Colchicum 30C (স্পর্শে অসহিষ্ণুতা, নড়াচড়ায় ব্যথা), Benzoic acid 30C (তীব্র গন্ধযুক্ত প্রস্রাব), Urtica urens 30C (ইউরিক অ্যাসিড ডায়াথেসিস), Ledum pal 30C (ঠাণ্ডা লাগলে ভাল), Lithicum carbonicum 30C (পাথর)
রেপাটরি: Gout, big toe - Colchicum; Offensive urine - Benzoic acid; Prickling - Urtica; Worse in cold - Ledum।
জটিলতা: টফি (ইউরেট জমা), জয়েন্ট বিকৃতি।
সারাংশ: ইউরিক অ্যাসিড মেটাবলিজমের ব্যাধি। Colchicum ও Ledum pal প্রধান।

76. Gum Boil (মাড়ির ফোঁড়া)
লক্ষণ: মাড়িতে ফোলা, লাল, ব্যথা, পুঁজ বের হতে পারে, দাঁতের গোড়ায় ব্যথা, জ্বর।
রোগ নির্ণয়: ডেন্টাল এক্স-রে, ক্লিনিক্যাল।
হোমিওপ্যাথি ওষুধ: Hepar sulph 30C (পুঁজ জমে), Belladonna 30C (তীব্র লাল ফোলা), Silicea 30C (পুনরাবৃত্ত ফোঁড়া), Mercurius solubilis 30C (ঘাম সহ), Calcarea fluorica 30C (শক্ত মাড়ি)
রেপাটরি: Gum boil, suppurating - Hepar; Red swelling - Belladonna; Recurrent - Silicea; Offensive odour - Merc sol।
জটিলতা: ডেন্টাল অ্যাবসেস, সেলুলাইটিস।
সারাংশ: দাঁতের ইনফেকশন। Hepar sulph ও Siliceা উত্তম।

77. Headache (মাথাব্যথা – টেনশন, মাইগ্রেন)
লক্ষণ: বিভিন্ন ধরনের মাথাব্যথা (কপালে, মাথার পেছনে, চোখের পিছনে) – চাপা ব্যথা বা স্পন্দন, বমি বমি ভাব, আলো-শব্দে অসুবিধা।
রোগ নির্ণয়: ক্লিনিক্যাল ইতিহাস, নিউরোইমেজিং (প্রয়োজনে)।
হোমিওপ্যাথি ওষুধ: Belladonna 30C (হঠাৎ তীব্র, কপালে, গরম), Glonoinum 30C (রোদে মাথাব্যথা), Sanguinaria 30C (ডান চোখ থেকে শুরু, মাইগ্রেন), Iris versicolor 30C (বমির সাথে), Gelsemium 30C (মাথার পেছনে, দৃষ্টি ঝাপসা)
রেপাটরি: Headache, throbbing - Belladonna; Sun headache - Glonoinum; Right-sided migraine - Sanguinaria; Bilious - Iris; Occipital - Gelsemium।
জটিলতা: সাধারণত গৌণ। দীর্ঘস্থায়ী হলে জীবনমান হ্রাস।
সারাংশ: টেনশন, সাইনাস, মাইগ্রেন ইত্যাদি। Belladonna ও Sanguinaria প্রধান।

78. Heartburn (বুক জ্বালা – অম্বল)
লক্ষণ: বুকে জ্বালা, খাবারের পর বা শুয়ে বসলে বাড়ে, পেট ও গলায় এসিড অনুভব, খাবার ওঠা।
রোগ নির্ণয়: ক্লিনিক্যাল, Endoscopy (ক্রনিক)।
হোমিওপ্যাথি ওষুধ: Robinia 30C (তীব্র এসিডিটি), Iris versicolor 30C (জ্বালা ও বমি), Nux vomica 30C (মসলাদার খাবারের পর), Carbo veg 30C (পেট ফাঁপা সহ), Arsenicum album 30C (জ্বালা ও অস্থিরতা)
রেপাটরি: Heartburn, acid rising - Robinia; Burning along oesophagus - Iris; After spicy food - Nux vomica; Belching - Carbo veg।
জটিলতা: ওসোফেজাইটিস, বেরেটস এসোফাগাস।
সারাংশ: গ্যাস্ট্রোওসোফেজিয়াল রিফ্লাক্স। Robinia অত্যন্ত কার্যকর।

79. Haematuria (প্রস্রাবে রক্ত)
লক্ষণ: প্রস্রাব লাল বা গোলাপি, প্রস্রাবের সময় জ্বালা বা ব্যথা, কোমর ব্যথা, জ্বর হতে পারে।
রোগ নির্ণয়: ইউরিনালাইসিস (RBC), ইউরিন কালচার, সিস্টোস্কোপি, সিটি স্ক্যান।
হোমিওপ্যাথি ওষুধ: Cantharis 30C (জ্বালাপোড়া সহ), Apis 30C (ব্যথাহীন বা ফোঁটা ফোঁটা), Phosphorus 30C (ব্যথাহীন, দীর্ঘস্থায়ী), Terebinthina 30C (স্মোকি প্রস্রাব), Sepia 30C (মেনোপজ পরবর্তী)
রেপাটরি: Haematuria, burning - Cantharis; Painless - Phosphorus; Smoky urine - Terebinthina; Clots - Sabina।
জটিলতা: অ্যানিমিয়া, রেনাল ফেইলিওর (কারণভেদে)।
সারাংশ: সংক্রমণ, পাথর, টিউমার ইত্যাদি। কারণ নির্ণয় আবশ্যক।

80. Haemorrhoids (পাইলস)
লক্ষণ: পায়ুপথের ভেতর বা বাইরে ফোলা শিরা, বসলে ব্যথা, চুলকানি, মলত্যাগের সময় রক্তপাত (উজ্জ্বল লাল), মলত্যাগের পর তাগিদ।
রোগ নির্ণয়: ডিজিটাল রেক্টাল পরীক্ষা, প্রোক্টোস্কোপি।
হোমিওপ্যাথি ওষুধ: Hamamelis Q (রক্তপাত সহ, কোমল), Aesculus 30C (পিঠে ব্যথা, পায়ুতে চাপ), Nux vomica 30C (কোষ্ঠকাঠিন্য থেকে), Aloe 30C (জেলি মতো স্রাব), Collinsonia 30C (গর্ভাবস্থায়)
রেপাটরি: Haemorrhoids, bleeding - Hamamelis; Backache - Aesculus; Constipation with piles - Nux vomica; Jelly-like mucous - Aloe; Pregnancy - Collinsonia।
জটিলতা: থ্রোম্বোসিস, স্ট্র্যাংগুলেশন।
সারাংশ: ভেরিকোজ শিরা। Hamamelis ও Aesculus স্মরণীয়।

81. Hernia (হার্নিয়া – অন্ত্রবৃদ্ধি)
লক্ষণ: পেট বা কোমরে স্ফীতি, কাশলে বা ওজন তুললে বেড়ে যাওয়া, ব্যথা বা চাপ অনুভব, বমি বমি ভাব (স্ট্র্যাংগুলেশন হলে)।
রোগ নির্ণয়: শারীরিক পরীক্ষা, আলট্রাসাউন্ড।
হোমিওপ্যাথি ওষুধ: Nux vomica 30C (স্ট্র্যাংগুলেশন), Lycopodium 30C (ডান দিকের ইঙ্গুইনাল হার্নিয়া), Rhus tox 30C (নড়াচড়ায় খারাপ), Calcarea fluorica 30C (শক্ত স্ফীতি), Silicea 30C (ছোট শিশু)
রেপাটরি: Hernia, inguinal - Nux vomica; Right side - Lycopodium; Umbilical - Calcarea carb; After strain - Rhus tox।
জটিলতা: স্ট্র্যাংগুলেশন, বন্ধ্যাত্ব।
সারাংশ: দুর্বল পেশি দিয়ে অঙ্গ বেরিয়ে আসা। Lycopodium ও Nux vomica সহায়ক।

82. Herpes (হার্পিস – ঠাণ্ডা ঘা)
লক্ষণ: ঠোঁটে বা যৌনাঙ্গে পানি ভরা ফোস্কা, জ্বালাপোড়া, চুলকানি, ফোস্কা ফেটে ঘা হয়, বারবার হয়।
রোগ নির্ণয়: ক্লিনিক্যাল, টজাংক স্মিয়ার।
হোমিওপ্যাথি ওষুধ: Natrum mur 30C (ঠোঁটের কোণে), Rhus tox 30C (জলীয় ফোস্কা), Arsenicum album 30C (দগ্ধ সংবেদন), Mezereum 30C (খোসা সহ), Graphites 30C (পুরু স্রাব)
রেপাটরি: Herpes, cold sores - Natrum mur; Vesicular - Rhus tox; Burning - Ars; Crusty - Mezereum; Recurrent - Sepia।
জটিলতা: পোস্টহার্পেটিক নিউরালজিয়া।
সারাংশ: হার্পিস সিমপ্লেক্স ভাইরাস। Natrum mur ও Rhus tox প্রথম সারি।

83. High Blood Pressure (উচ্চ রক্তচাপ)
লক্ষণ: প্রায়ই উপসর্গহীন। মাথাব্যথা, মাথা ঘোরা, চোখের সামনে ঘোলা, ধড়ফড়, নাক দিয়ে রক্ত, ক্লান্তি।
রোগ নির্ণয়: বারবার রক্তচাপ মাপা (সিস্টোলিক >= ১৪০, ডায়াস্টোলিক >= ৯০)।
হোমিওপ্যাথি ওষুধ: Glonoinum 30C (রক্তচাপ হঠাৎ বেড়ে যাওয়া, মাথা গরম), Lachesis 30C (মেনোপজের সময়), Aurum met 30C (অ্যাথেরোস্ক্লেরোসিস সহ), Belladonna 30C (হঠাৎ লাল মাথা, স্পন্দন), Rauwolfia Q (সাপ্তাহিক, দীর্ঘস্থায়ী)
রেপাটরি: Hypertension, flushing - Glonoinum; Menopausal - Lachesis; Arteriosclerosis - Aurum; Throbbing headache - Belladonna।
জটিলতা: হার্ট অ্যাটাক, স্ট্রোক, রেনাল ফেইলিওর।
সারাংশ: নিরব ঘাতক। Glonoinum ও Belladonna অ্যাকিউট জরুরি অবস্থায় কাজে লাগে।

84. Hiccough (হেঁচকি)
লক্ষণ: অনিয়ন্ত্রিত ডায়াফ্রামের সংকোচন, হিক শব্দ, খাওয়ার পর বা মানসিক চাপে বেড়ে।
রোগ নির্ণয়: ক্লিনিক্যাল।
হোমিওপ্যাথি ওষুধ: Cicuta virosa 30C (প্রচণ্ড), Ignatia 30C (শোকে, খাওয়ার সময়), Nux vomica 30C (পেটের সমস্যা সহ), Magnesia phos 30C (গরমে ভাল), Hydrocyanic acid 30C (মরণাপন্ন অবস্থায়)
রেপাটরি: Hiccough, spasmodic - Cicuta; After grief - Ignatia; With indigestion - Nux vomica; Relieved by warm drinks - Magnesia phos।
জটিলতা: ডিহাইড্রেশন, ক্লান্তি।
সারাংশ: সাধারণত সাময়িক। Ignatia ও Nux vomica উত্তম।

85. Hydrocele (অণ্ডকোষে পানি জমা)
লক্ষণ: অণ্ডকোষ ফুলে যাওয়া, ব্যথা নেই (প্রাথমিক), স্পর্শে নরম, ট্রান্সইল্যুমিনেশন পজিটিভ।
রোগ নির্ণয়: শারীরিক পরীক্ষা, আলট্রাসাউন্ড (ইনগুইনাল হার্নিয়া বাদে)।
হোমিওপ্যাথি ওষুধ: Apis mellifica 30C (হঠাৎ ফুলে), Rhododendron 30C (আবহাওয়া পরিবর্তনে), Pulsatilla 30C (শিশুদের, কান্নাকাটি), Silicea 30C (পুরনো), Iodum 30C (শক্ত ফোলা)
রেপাটরি: Hydrocele, painless swelling - Apis; Worse in wet weather - Rhododendron; Congenital - Pulsatilla; Chronic - Silicea।
জটিলতা: হার্নিয়া, সংক্রমণ।
সারাংশ: টিউনিকা ভ্যাজাইনালিসের ভেতর তরল জমা। Apis ও Rhododendron প্রধান।

86. Hypothyroidism (থাইরয়েডের অকর্মণ্যতা)
লক্ষণ: ক্লান্তি, ওজন বৃদ্ধি, ঠাণ্ডা সহনশীলতা কম, কোষ্ঠকাঠিন্য, শুষ্ক ত্বক, চুল পড়া, বিষণ্নতা, মন্থর হৃদস্পন্দন।
রোগ নির্ণয়: TSH বেড়ে যাওয়া, T4 কম, টেস্ট।
হোমিওপ্যাথি ওষুধ: Thyroidinum 6X, Calcarea carbonica 30C (স্থূল, ঠাণ্ডা, ঘাম), Lycopodium 30C (পেট ফাঁপা), Sepia 30C (মাথাব্যথা ও জরায়ুর সমস্যা), Graphites 30C (ত্বক শুষ্ক)
রেপাটরি: Hypothyroidism, fatigue - Thyroidinum; Cold, sluggish - Calcarea carb; Flatulence - Lycopodium; Hair loss - Sepia; Dry skin - Graphites।
জটিলতা: মাইক্সিডিমা, গলগণ্ড, কার্ডিওমায়োপ্যাথি।
সারাংশ: থাইরয়েড হরমোনের অভাবে। Thyroidinum ও Calcarea carb সহায়ক।

87. Insomnia (অনিদ্রা)
লক্ষণ: রাতে ঘুম না হওয়া, বারবার ঘুম ভাঙা, সকালে ক্লান্ত লাগা, খিটখিটে মেজাজ।
রোগ নির্ণয়: ক্লিনিক্যাল।
হোমিওপ্যাথি ওষুধ: Coffea cruda 30C (অতি আনন্দে বা চিন্তায় ঘুম না আসা), Passiflora Q (সাধারণ অনিদ্রা), Nux vomica 30C (রাত ৩টায় ঘুম ভাঙে), Ignatia 30C (শোকে), Arsenicum album 30C (ভয়ে, সকালে)
রেপাটরি: Insomnia, from joy/excitement - Coffea; Wakes at 3 AM - Nux vomica; From grief - Ignatia; Anxious restlessness - Ars।
জটিলতা: মানসিক অবসাদ।
সারাংশ: Coffea ও Passiflora বিশেষ উপকারী।
`;

function assignSectionAndCategory(name: string, bgName: string, symptoms: string) {
    let section = 'Section A: জ্বর ও সংক্রামক রোগ';
    let category = 'General';
    
    const textToMatch = (name + ' ' + bgName + ' ' + symptoms).toLowerCase();
    if (textToMatch.includes('ত্বক') || textToMatch.includes('একজিমা') || textToMatch.includes('খুশকি')) {
        section = 'Section G: ত্বকের রোগ'; category = 'Skin';
    } else if (textToMatch.includes('পায়ু') || textToMatch.includes('পাকস্থলী') || textToMatch.includes('গ্যাস') || textToMatch.includes('লিভার') || textToMatch.includes('ডায়রিয়া') || textToMatch.includes('আমাশয়') || name.toLowerCase().includes('gallstone')) {
        section = 'Section E: পরিপাকতন্ত্র'; category = 'Gastrointestinal';
    } else if (textToMatch.includes('মাসিক') || textToMatch.includes('জরায়ু')) {
        section = 'Section I: স্ত্রীরোগ'; category = 'Gynecology';
    } else if (textToMatch.includes('কান') || textToMatch.includes('চোখ')) {
        section = 'Section L: চোখ ও কানের রোগ'; category = 'ENT/Eye';
    } else if (textToMatch.includes('মুখ') || textToMatch.includes('দাঁত') || textToMatch.includes('মাড়ি')) {
        section = 'Section K: দন্ত ও মুখগহ্বর'; category = 'Oral';
    } else if (textToMatch.includes('স্নায়ু') || textToMatch.includes('মানসিক') || textToMatch.includes('অনিদ্রা') || textToMatch.includes('বিষণ্নতা') || textToMatch.includes('মৃগী')) {
        section = 'Section D: স্নায়ুতন্ত্র ও মানসিক'; category = 'Neurological/Psychological';
    } else if (textToMatch.includes('হাড়') || textToMatch.includes('পেশি') || textToMatch.includes('গেঁটে বাত') || textToMatch.includes('এলবো')) {
        section = 'Section F: হাড় ও জয়েন্ট'; category = 'Musculoskeletal';
    } else if (textToMatch.includes('রক্তচাপ') || textToMatch.includes('হৃদ')) {
        section = 'Section B: হৃদরোগ ও সংবহনতন্ত্র'; category = 'Cardiovascular';
    } else if (name.toLowerCase().includes('urine') || textToMatch.includes('প্রস্রাব') || textToMatch.includes('অণ্ডকোষ')) {
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

const fileStr = fs.readFileSync('src/practiceMedicineData.ts', 'utf-8');
const exportPos = fileStr.indexOf('export const DIAGNOSES_DATA: ClinicalDiagnosis[] =');
const dataStr = fileStr.substring(fileStr.indexOf('[', exportPos), fileStr.lastIndexOf('];') + 1);
const originalArray = JSON.parse(dataStr);
const trimmedArray = originalArray.slice(0, 30);
const combinedArray = [...trimmedArray, ...results];

const newContent = fileStr.substring(0, exportPos) + 'export const DIAGNOSES_DATA: ClinicalDiagnosis[] = ' + JSON.stringify(combinedArray, null, 2) + ';\n';
fs.writeFileSync('src/practiceMedicineData.ts', newContent);
console.log('Done, length: ' + combinedArray.length);
