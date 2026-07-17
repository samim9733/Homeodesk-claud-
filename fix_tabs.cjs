const fs = require('fs');
const file = 'src/AnalysisRemindersTabs.tsx';
let lines = fs.readFileSync(file, 'utf8').split('\n');

// 1. Identify my block:
const startBlock = lines.findIndex(l => l.includes('bg-white rounded-[40px] p-6 sm:p-8'));
const endBlock = lines.findIndex((l, i) => i > startBlock && l.includes('<AnimatePresence>')) - 2;

const myBlock = lines.slice(startBlock, endBlock + 1);

// Remove my block
lines.splice(startBlock, myBlock.length);

// 2. Identify the old Potency Prescription Guide
const oldGuideStart = lines.findIndex(l => l.includes('{/* Potency Prescription Guide */}'));

let oldGuideEnd = lines.findIndex((l, i) => i > oldGuideStart && l.trim() === '</div>' && lines[i+1].trim() === '</div>' && lines[i+2].trim() === '</div>' && lines[i+3].trim() === ');');

// So we replace oldGuideStart to oldGuideEnd with myBlock
lines.splice(oldGuideStart, oldGuideEnd - oldGuideStart + 1, ...myBlock);

fs.writeFileSync(file, lines.join('\n'), 'utf8');
console.log('Lines replaced');
