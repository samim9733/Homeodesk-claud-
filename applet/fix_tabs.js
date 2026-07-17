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
// The old guide ends at the closing `</div>` right before the end of the file.
// Let's find exactly the line: it's the </div> matching the <div id="potency-guide-container"...>
// Looking at the file, the end of the file looks like:
// </div>
// </div>
// </div>
// );
// };
// Let's just find the index of the first of these trailing closing divs after the old guide start
let oldGuideEnd = lines.findIndex((l, i) => i > oldGuideStart && l.includes('          </div>') && lines[i+1].includes('        </div>') && lines[i+2].includes('      </div>'));

// So we replace oldGuideStart to oldGuideEnd with myBlock
lines.splice(oldGuideStart, oldGuideEnd - oldGuideStart + 1, ...myBlock);

fs.writeFileSync(file, lines.join('\n'), 'utf8');
console.log('Done!');
