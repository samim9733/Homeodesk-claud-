const fs = require('fs');

const text = fs.readFileSync('./src/generalities.txt', 'utf8');
const lines = text.split('\n').filter(l => l.trim() !== '' && l !== 'GENERALITIES.');

const generalitiesRubrics = [];
let currentRubric = null;
let currentLevel2 = null;

function getGrade(remedyStr) {
    // Kent grading: 
    // ALL CAPS = 3 (e.g. BELL.) -> Actually, in text it's Bell. or BELL.
    // In our text: 
    // Bold -> 3 (we don't have bold, but capitalized first letter or all caps?)
    // Wait, in Kent, bold = 3, italic = 2, plain = 1.
    // In the prompt text:
    // "Alum., am-m., cimic., ferr., guaj., sang., Sep., Sulph."
    // Notice "Sep." and "Sulph." are capitalized. "Alum." is capitalized. "am-m." is lowercase.
    // Actually, in typical plain text Kent: 
    // Capitalized first letter = 2 or 3? Let's just assign:
    // If it's capitalized (e.g. "Sep."), let's give it grade 2 or 3.
    // Let's just say: 
    // all lowercase -> 1
    // First letter capitalized -> 2
    // All caps -> 3
    if (remedyStr === remedyStr.toUpperCase()) return 3;
    if (remedyStr[0] === remedyStr[0].toUpperCase()) return 2;
    return 1;
}

for (let line of lines) {
    if (!line.includes(':')) {
        // sometimes lines wrap, or it's a continuation of remedies
        // If it doesn't have a colon, it's continuation of remedies
        if (currentLevel2) {
            line.split(',').forEach(r => {
                let rem = r.trim().replace('.', '');
                if (rem) {
                    currentLevel2.d.general.g_patho.push({ n: rem + '.', g: getGrade(rem) });
                }
            });
        } else if (currentRubric) {
            let lastSr = currentRubric.sr[currentRubric.sr.length - 1];
            if (lastSr && lastSr.name === currentRubric.name + ', general') {
                line.split(',').forEach(r => {
                    let rem = r.trim().replace('.', '');
                    if (rem) {
                        lastSr.d.general.g_patho.push({ n: rem + '.', g: getGrade(rem) });
                    }
                });
            }
        }
        continue;
    }

    const parts = line.split(':');
    const namePart = parts[0].trim();
    const remediesPart = parts.slice(1).join(':').trim();

    const remedies = remediesPart.split(',').map(r => r.trim()).filter(r => r !== '');
    const g_patho = remedies.map(r => {
        let clean = r.replace('.', '');
        return { n: clean + '.', g: getGrade(clean) };
    });

    const isSubrubric = /^[a-z]/.test(namePart); // starts with lowercase
    
    if (!isSubrubric) {
        // New Rubric
        currentRubric = {
            name: namePart,
            tr: namePart, // fallback
            sr: []
        };
        // Add general subrubric for its own remedies
        if (g_patho.length > 0) {
            currentRubric.sr.push({
                name: namePart + ", general",
                d: {
                    general: {
                        g_patho: g_patho
                    }
                }
            });
        }
        generalitiesRubrics.push(currentRubric);
        currentLevel2 = null;
    } else {
        // Subrubric
        if (!currentRubric) continue;
        currentLevel2 = {
            name: namePart,
            d: {
                general: {
                    g_patho: g_patho
                }
            }
        };
        currentRubric.sr.push(currentLevel2);
    }
}

const outFile = './src/parsed_generalities.json';
fs.writeFileSync(outFile, JSON.stringify(generalitiesRubrics, null, 2));
console.log(`Parsed ${generalitiesRubrics.length} rubrics into ${outFile}`);
