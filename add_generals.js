import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const text = fs.readFileSync(path.join(__dirname, "src/repertoryData.ts"), "utf8");

const genStart = text.indexOf('name: "Generalities",');
// Finding the ending bracket of the Generalities chapter.
// We can just splice before the last two brackets basically
const newRubrics = `      {
        "name": "Weakness",
        "tr": "দুর্বলতা",
        "sr": [
          {
            "name": "Weakness, general",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Ars.", "g": 3 },
                  { "n": "Chin.", "g": 3 },
                  { "n": "Phos.", "g": 3 },
                  { "n": "Calc.", "g": 2 },
                  { "n": "Nat-m.", "g": 2 }
                ]
              }
            }
          },
          {
            "name": "Weakness, morning",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Bry.", "g": 2 },
                  { "n": "Lyc.", "g": 2 },
                  { "n": "Nux-v.", "g": 3 },
                  { "n": "Puls.", "g": 2 }
                ]
              }
            }
          }
        ]
      },
      {
        "name": "Trembling",
        "tr": "কাঁপুনি",
        "sr": [
          {
            "name": "Trembling, externally",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Gels.", "g": 3 },
                  { "n": "Merc.", "g": 3 },
                  { "n": "Lach.", "g": 2 },
                  { "n": "Plb.", "g": 2 },
                  { "n": "Zinc.", "g": 2 }
                ]
              }
            }
          },
          {
            "name": "Trembling, internally",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Iod.", "g": 3 },
                  { "n": "Staph.", "g": 2 },
                  { "n": "Rhus-t.", "g": 2 }
                ]
              }
            }
          }
        ]
      },
      {
        "name": "Fainting",
        "tr": "মূর্ছা যাওয়া",
        "sr": [
          {
            "name": "Fainting, general",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Ign.", "g": 3 },
                  { "n": "Nux-m.", "g": 3 },
                  { "n": "Sep.", "g": 3 },
                  { "n": "Mosch.", "g": 2 }
                ]
              }
            }
          },
          {
            "name": "Fainting, morning",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Carb-v.", "g": 3 },
                  { "n": "Nux-v.", "g": 2 },
                  { "n": "Sep.", "g": 2 }
                ]
              }
            }
          }
        ]
      },
      {
        "name": "Periodicity",
        "tr": "পর্যায়ক্রমিকতা",
        "sr": [
          {
            "name": "Periodicity, general",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Ars.", "g": 3 },
                  { "n": "Cedr.", "g": 3 },
                  { "n": "Chin.", "g": 3 },
                  { "n": "Nat-m.", "g": 3 },
                  { "n": "Ipec.", "g": 2 }
                ]
              }
            }
          }
        ]
      },
      {
        "name": "Inflammation",
        "tr": "প্রদাহ",
        "sr": [
          {
            "name": "Inflammation, internally",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Acon.", "g": 3 },
                  { "n": "Bell.", "g": 3 },
                  { "n": "Bry.", "g": 3 },
                  { "n": "Ferr-p.", "g": 3 },
                  { "n": "Merc.", "g": 2 }
                ]
              }
            }
          },
          {
            "name": "Inflammation, outwardly",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Apis", "g": 3 },
                  { "n": "Bell.", "g": 3 },
                  { "n": "Rhus-t.", "g": 3 },
                  { "n": "Hep.", "g": 2 }
                ]
              }
            }
          }
        ]
      },
      {
        "name": "Swelling",
        "tr": "ফুলে যাওয়া",
        "sr": [
          {
            "name": "Swelling, general",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Apis", "g": 3 },
                  { "n": "Ars.", "g": 3 },
                  { "n": "Bry.", "g": 2 },
                  { "n": "Puls.", "g": 2 },
                  { "n": "Rhus-t.", "g": 2 }
                ]
              }
            }
          },
          {
            "name": "Swelling, inflammatory",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Acon.", "g": 3 },
                  { "n": "Bell.", "g": 3 },
                  { "n": "Apis", "g": 3 }
                ]
              }
            }
          }
        ]
      },
      {
        "name": "Induration",
        "tr": "শক্ত হয়ে যাওয়া",
        "sr": [
          {
            "name": "Induration, glands",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Baryta-c.", "g": 3 },
                  { "n": "Calc-f.", "g": 3 },
                  { "n": "Con.", "g": 3 },
                  { "n": "Spong.", "g": 2 },
                  { "n": "Phyt.", "g": 2 }
                ]
              }
            }
          }
        ]
      },
      {
        "name": "Emaciation",
        "tr": "ক্ষয়প্রাপ্তি",
        "sr": [
          {
            "name": "Emaciation, general",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Iod.", "g": 3 },
                  { "n": "Nat-m.", "g": 3 },
                  { "n": "Tub.", "g": 3 },
                  { "n": "Abrot.", "g": 2 },
                  { "n": "Sars.", "g": 2 }
                ]
              }
            }
          },
          {
            "name": "Emaciation, children",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Abrot.", "g": 3 },
                  { "n": "Calc.", "g": 3 },
                  { "n": "Nat-m.", "g": 3 },
                  { "n": "Sanic.", "g": 2 }
                ]
              }
            }
          }
        ]
      },
      {
        "name": "Warmth",
        "tr": "উষ্ণতা",
        "sr": [
          {
            "name": "Warmth, amel",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Ars.", "g": 3 },
                  { "n": "Hep.", "g": 3 },
                  { "n": "Nux-v.", "g": 3 },
                  { "n": "Psor.", "g": 3 },
                  { "n": "Rhus-t.", "g": 3 }
                ]
              }
            }
          },
          {
            "name": "Warmth, agg",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Apis", "g": 3 },
                  { "n": "Iod.", "g": 3 },
                  { "n": "Puls.", "g": 3 },
                  { "n": "Sec.", "g": 3 }
                ]
              }
            }
          }
        ]
      },
      {
        "name": "Lying",
        "tr": "শোয়া",
        "sr": [
          {
            "name": "Lying, agg",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Ars.", "g": 3 },
                  { "n": "Dros.", "g": 3 },
                  { "n": "Hyos.", "g": 3 },
                  { "n": "Lach.", "g": 2 }
                ]
              }
            }
          },
          {
            "name": "Lying, amel",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Bry.", "g": 3 },
                  { "n": "Nux-v.", "g": 3 },
                  { "n": "Squil.", "g": 2 }
                ]
              }
            }
          }
        ]
      },
      {
        "name": "Sleep",
        "tr": "ঘুম",
        "sr": [
          {
            "name": "Sleep, agg",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Lach.", "g": 3 },
                  { "n": "Spong.", "g": 3 },
                  { "n": "Sulph.", "g": 2 },
                  { "n": "Op.", "g": 2 }
                ]
              }
            }
          },
          {
            "name": "Sleep, amel",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Phos.", "g": 3 },
                  { "n": "Puls.", "g": 2 },
                  { "n": "Nux-v.", "g": 2 }
                ]
              }
            }
          }
        ]
      },
      {
        "name": "Convulsions",
        "tr": "খিঁচুনি",
        "sr": [
          {
            "name": "Convulsions, general",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Bell.", "g": 3 },
                  { "n": "Cic.", "g": 3 },
                  { "n": "Cupr.", "g": 3 },
                  { "n": "Hyos.", "g": 3 },
                  { "n": "Stram.", "g": 3 }
                ]
              }
            }
          },
          {
            "name": "Convulsions, children",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Bell.", "g": 3 },
                  { "n": "Cham.", "g": 3 },
                  { "n": "Cina", "g": 3 },
                  { "n": "Ign.", "g": 2 }
                ]
              }
            }
          }
        ]
      },
      {
        "name": "Tension",
        "tr": "টান",
        "sr": [
          {
            "name": "Tension, externally",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Caust.", "g": 3 },
                  { "n": "Nat-m.", "g": 2 },
                  { "n": "Phos.", "g": 2 },
                  { "n": "Rhus-t.", "g": 3 }
                ]
              }
            }
          },
          {
            "name": "Tension, internally",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Asaf.", "g": 3 },
                  { "n": "Bell.", "g": 2 },
                  { "n": "Ign.", "g": 3 },
                  { "n": "Puls.", "g": 2 }
                ]
              }
            }
          }
        ]
      },
      {
        "name": "Pulse",
        "tr": "নাড়ি",
        "sr": [
          {
            "name": "Pulse, fast",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Acon.", "g": 3 },
                  { "n": "Bell.", "g": 3 },
                  { "n": "Spong.", "g": 3 },
                  { "n": "Gels.", "g": 2 }
                ]
              }
            }
          },
          {
            "name": "Pulse, slow",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Dig.", "g": 3 },
                  { "n": "Op.", "g": 3 },
                  { "n": "Gels.", "g": 2 }
                ]
              }
            }
          }
        ]
      },
      {
        "name": "Sitting",
        "tr": "বসা",
        "sr": [
          {
            "name": "Sitting, agg",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Con.", "g": 3 },
                  { "n": "Cycl.", "g": 3 },
                  { "n": "Puls.", "g": 3 },
                  { "n": "Rhus-t.", "g": 3 },
                  { "n": "Sep.", "g": 3 }
                ]
              }
            }
          },
          {
            "name": "Sitting, amel",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Bry.", "g": 3 },
                  { "n": "Colch.", "g": 3 },
                  { "n": "Nux-v.", "g": 3 },
                  { "n": "Squil.", "g": 2 }
                ]
              }
            }
          }
        ]
      },`;

// Find where Generalities ends.
// In the array `REPERTORY_DATA`, it's the last chapter:
//       }
//     ]
//   }
// ];
// So finding the last `      }` before `    ]` should work, but to be safe, I'll find where `name: "Generalities"` is, and inject right before the end of its `rubrics` array.

const generalitiesStr = text.substring(genStart);
// Let's find `] \n  }\n];` if it's the last one, or `] \n  },\n  {` if there's another.
const endOfRubricsIndex = generalitiesStr.indexOf('    ]\n  }\n]');

if (endOfRubricsIndex !== -1) {
  const newText = text.substring(0, genStart + endOfRubricsIndex) + newRubrics + text.substring(genStart + endOfRubricsIndex);
  fs.writeFileSync(path.join(__dirname, "src/repertoryData.ts"), newText, "utf8");
  console.log("Successfully appended 15 rubrics to Generalities.");
} else {
  console.log("Could not find end of Generalities");
}
