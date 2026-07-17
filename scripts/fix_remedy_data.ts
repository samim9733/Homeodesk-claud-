import { REPERTORY_DATA } from '../src/repertoryData';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPERTORY_DATA_PATH = path.resolve(__dirname, '../src/repertoryData.ts');

const noiseWords = new Set([
  'sleep', 'sleeping', 'waking', 'awake', 'before', 'after', 'morning', 'evening',
  'general', 'time', 'desire', 'aversion', 'location', 'sensation', 'modality',
  'sensation of', 'beginning of', 'cold weather', 'desire to lie down', 'cough and expectoration',
  'warm applications', 'of', 'from', 'with', 'during', 'on', 'in', 'at', 'agg', 'amel', 'or 6 pm', '30 p m'
]);

function cleanRemedyString(raw: string): string {
  let s = raw.trim();
  
  // If there is a colon, take the last part
  if (s.includes(':')) {
    s = s.substring(s.lastIndexOf(':') + 1).trim();
  }
  
  // Remove any leading/trailing dots and spaces
  s = s.replace(/^\.+|\.+$/g, '').trim();
  
  if (noiseWords.has(s.toLowerCase())) {
    return ''; // Indicates it's pure noise and should be removed
  }
  
  // Handle concatenated remedies like "lyc. Merc.." or "canth carb-ac.."
  if (s.includes(' ')) {
    const parts = s.split(/\s+/);
    const firstPart = parts[0].replace(/^\.+|\.+$/g, '').trim();
    if (firstPart && !noiseWords.has(firstPart.toLowerCase())) {
      s = firstPart;
    }
  }
  
  if (!s) return '';
  
  // Apply Bug #1 casing normalization: capitalize first letter, make the rest lowercase.
  s = s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  
  // Add back a single dot at the end
  return s + '.';
}

function cleanRubricData(d: any, onRemedyProcessed: (raw: string, cleaned: string) => void) {
  if (!d || typeof d !== 'object') return;

  const remedyKeys = [
    'location', 'sensation', 'modality', 'concomitant', 'psychological',
    'physiological', 'mind', 'pain', 'desire', 'aversion', 'appearance',
    'symptoms', 'time'
  ];

  for (const key of remedyKeys) {
    if (Array.isArray(d[key])) {
      d[key] = d[key]
        .map((rem: any) => {
          const raw = rem.n;
          const cleaned = cleanRemedyString(raw);
          onRemedyProcessed(raw, cleaned);
          if (cleaned) {
            rem.n = cleaned;
            return rem;
          }
          return null;
        })
        .filter((rem: any) => rem !== null);
    }
  }

  if (d.general && typeof d.general === 'object') {
    for (const subKey of Object.keys(d.general)) {
      if (Array.isArray(d.general[subKey])) {
        d.general[subKey] = d.general[subKey]
          .map((rem: any) => {
            const raw = rem.n;
            const cleaned = cleanRemedyString(raw);
            onRemedyProcessed(raw, cleaned);
            if (cleaned) {
              rem.n = cleaned;
              return rem;
            }
            return null;
          })
          .filter((rem: any) => rem !== null);
      }
    }
  }
}

function walkAndClean(obj: any, onRemedyProcessed: (raw: string, cleaned: string) => void) {
  if (!obj || typeof obj !== 'object') return;

  if (Array.isArray(obj)) {
    obj.forEach(item => walkAndClean(item, onRemedyProcessed));
  } else {
    if (obj.d && typeof obj.d === 'object') {
      cleanRubricData(obj.d, onRemedyProcessed);
    }
    for (const key of Object.keys(obj)) {
      if (key !== 'd') {
        walkAndClean(obj[key], onRemedyProcessed);
      }
    }
  }
}

// Stats tracking
let totalMentionsBefore = 0;
let totalMentionsAfter = 0;
const uniqueRemediesBefore = new Set<string>();
const uniqueRemediesAfter = new Set<string>();
const changesList: { raw: string, cleaned: string }[] = [];

// Initial Pass to collect stats BEFORE cleaning
walkAndClean(REPERTORY_DATA, (raw, cleaned) => {
  totalMentionsBefore++;
  uniqueRemediesBefore.add(raw);
});

// Reset and do actual cleaning
walkAndClean(REPERTORY_DATA, (raw, cleaned) => {
  if (raw !== cleaned) {
    changesList.push({ raw, cleaned });
  }
  if (cleaned) {
    totalMentionsAfter++;
    uniqueRemediesAfter.add(cleaned);
  }
});

console.log('==================================================');
console.log('REMEDY DATA CLEANUP REPORT');
console.log('==================================================');
console.log(`Total mentions before: ${totalMentionsBefore}`);
console.log(`Total mentions after:  ${totalMentionsAfter}`);
console.log(`Unique remedies count before: ${uniqueRemediesBefore.size}`);
console.log(`Unique remedies count after:  ${uniqueRemediesAfter.size}`);
console.log(`Removed mentions (pure noise): ${totalMentionsBefore - totalMentionsAfter}`);

// Analyze casing inconsistencies
const lowercaseToOriginals = new Map<string, Set<string>>();
uniqueRemediesBefore.forEach(r => {
  const lower = r.toLowerCase();
  if (!lowercaseToOriginals.has(lower)) {
    lowercaseToOriginals.set(lower, new Set());
  }
  lowercaseToOriginals.get(lower)!.add(r);
});

console.log('\n--- CASING INCONSISTENCIES FOUND (BUG #1) ---');
let casingIssuesCount = 0;
lowercaseToOriginals.forEach((originalSet, lower) => {
  if (originalSet.size > 1) {
    casingIssuesCount++;
    console.log(`- "${lower}": [${Array.from(originalSet).join(', ')}] -> Resolved to "${cleanRemedyString(lower)}"`);
  }
});
console.log(`Total casing inconsistencies resolved: ${casingIssuesCount}`);

console.log('\n--- SAMPLE NOISE/EXTRACTION ISSUES RESOLVED (BUG #2) ---');
const noiseResolved = changesList.filter(c => c.cleaned === '');
console.log(`Total pure noise entries removed: ${noiseResolved.length}`);
noiseResolved.slice(0, 15).forEach(c => {
  console.log(`- Removed: "${c.raw}"`);
});

const modificationResolved = changesList.filter(c => c.cleaned !== '' && c.raw !== c.cleaned && c.raw.toLowerCase() !== c.cleaned.toLowerCase());
console.log(`\nTotal text extraction/colons entries cleaned: ${modificationResolved.length}`);
modificationResolved.slice(0, 15).forEach(c => {
  console.log(`- Cleaned: "${c.raw}" -> "${c.cleaned}"`);
});

// Writing changes to file
console.log('\nSerializing and writing updated REPERTORY_DATA back to src/repertoryData.ts...');
let jsonContent = JSON.stringify(REPERTORY_DATA, null, 2);

// Collapse remedy objects onto a single line to keep the file format clean and compact
jsonContent = jsonContent.replace(/\{\s*"n":\s*"([^"]+)",\s*"g":\s*(\d+)\s*\}/g, '{ "n": "$1", "g": $2 }');

const fileHeader = `import { Chapter } from './types';\n\nexport const REPERTORY_DATA: Chapter[] = `;
const fileFooter = `;\n`;

fs.writeFileSync(REPERTORY_DATA_PATH, fileHeader + jsonContent + fileFooter, 'utf-8');
console.log('SUCCESS: Written updated file!');
console.log('==================================================');
