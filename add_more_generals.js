import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "src/repertoryData.ts");
let text = fs.readFileSync(filePath, "utf8");

const moreRubrics = `      ,{
        "name": "Evening",
        "tr": "সন্ধ্যা",
        "sr": [
          {
            "name": "Evening, agg",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Puls.", "g": 3 },
                  { "n": "Sep.", "g": 3 },
                  { "n": "Lyc.", "g": 3 },
                  { "n": "Zinc.", "g": 2 },
                  { "n": "Bell.", "g": 2 }
                ]
              }
            }
          },
          {
            "name": "Evening, amel",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Nux-v.", "g": 3 },
                  { "n": "Rhus-t.", "g": 2 }
                ]
              }
            }
          }
        ]
      },
      {
        "name": "Night",
        "tr": "রাত",
        "sr": [
          {
            "name": "Night, agg",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Merc.", "g": 3 },
                  { "n": "Ars.", "g": 3 },
                  { "n": "Rhus-t.", "g": 3 },
                  { "n": "Sil.", "g": 3 },
                  { "n": "Sulph.", "g": 3 }
                ]
              }
            }
          }
        ]
      },
      {
        "name": "Exertion",
        "tr": "পরিশ্রম",
        "sr": [
          {
            "name": "Exertion, physical, agg",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Ars.", "g": 3 },
                  { "n": "Calc.", "g": 3 },
                  { "n": "Nat-m.", "g": 3 },
                  { "n": "Rhus-t.", "g": 3 },
                  { "n": "Sep.", "g": 3 }
                ]
              }
            }
          }
        ]
      },
      {
        "name": "Eating",
        "tr": "খাওয়া",
        "sr": [
          {
            "name": "Eating, after agg",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Nux-v.", "g": 3 },
                  { "n": "Puls.", "g": 3 },
                  { "n": "Lyc.", "g": 3 },
                  { "n": "Nat-m.", "g": 2 },
                  { "n": "Sulph.", "g": 3 }
                ]
              }
            }
          },
          {
            "name": "Eating, amel",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Iod.", "g": 3 },
                  { "n": "Anac.", "g": 3 },
                  { "n": "Chel.", "g": 3 },
                  { "n": "Phos.", "g": 2 }
                ]
              }
            }
          }
        ]
      },
      {
        "name": "Touch",
        "tr": "স্পর্শ",
        "sr": [
          {
            "name": "Touch, agg",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Bell.", "g": 3 },
                  { "n": "Chin.", "g": 3 },
                  { "n": "Lach.", "g": 3 },
                  { "n": "Hep.", "g": 3 }
                ]
              }
            }
          }
        ]
      },
      {
        "name": "Washing",
        "tr": "ধোয়া",
        "sr": [
          {
            "name": "Washing, agg",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Ant-c.", "g": 3 },
                  { "n": "Calc.", "g": 3 },
                  { "n": "Rhus-t.", "g": 3 },
                  { "n": "Sulph.", "g": 3 },
                  { "n": "Sep.", "g": 3 }
                ]
              }
            }
          }
        ]
      },
      {
        "name": "Menses",
        "tr": "ঋতুস্রাব",
        "sr": [
          {
            "name": "Menses, before agg",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Calc.", "g": 3 },
                  { "n": "Lach.", "g": 3 },
                  { "n": "Puls.", "g": 2 },
                  { "n": "Sep.", "g": 3 }
                ]
              }
            }
          },
          {
            "name": "Menses, during agg",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Act-r.", "g": 3 },
                  { "n": "Cham.", "g": 3 },
                  { "n": "Puls.", "g": 3 },
                  { "n": "Sep.", "g": 3 }
                ]
              }
            }
          }
        ]
      },
      {
        "name": "Awaking",
        "tr": "জাগরণ",
        "sr": [
          {
            "name": "Awaking, on agg",
            "d": {
              "mind": [],
              "general": {
                "general": [
                  { "n": "Lach.", "g": 3 },
                  { "n": "Lyc.", "g": 3 },
                  { "n": "Nux-v.", "g": 2 },
                  { "n": "Spong.", "g": 3 }
                ]
              }
            }
          }
        ]
      }`;

const insertionPoint = text.lastIndexOf('    ]\n  }\n]');
if (insertionPoint !== -1) {
  text = text.substring(0, insertionPoint) + moreRubrics + text.substring(insertionPoint);
  fs.writeFileSync(filePath, text, "utf8");
  console.log("Added 8 more rubrics.");
} else {
  console.log("Could not find point");
}
