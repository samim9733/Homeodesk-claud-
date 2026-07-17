const fs = require('fs');
const parsed = require('./parsed_generalities.json');

const code = fs.readFileSync('./src/repertoryData.ts', 'utf8');

// The file exports REPERTORY_DATA.
// I will just find where name: "Generalities" is, and its rubrics array.
// But it's easier to manipulate as string if I can find the boundaries.
// Alternatively, I can just create a new script that generates the whole repertoryData string if I can parse it, but it's typescript.
// Let's do string replacement.
// Find:
//     name: "Generalities",
//     tr: "সাধারণ লক্ষণ",
//     icon: "🌐",
//     pages: "1341-1423",
//     rubrics: [ ... ]

const startIndex = code.indexOf('name: "Generalities",');
if (startIndex !== -1) {
    const rubricsIndex = code.indexOf('rubrics: [', startIndex);
    
    // Find the matching closing bracket for rubrics array
    let bracketCount = 0;
    let endIndex = -1;
    for (let i = rubricsIndex + 'rubrics: '.length; i < code.length; i++) {
        if (code[i] === '[') bracketCount++;
        if (code[i] === ']') {
            bracketCount--;
            if (bracketCount === 0) {
                endIndex = i;
                break;
            }
        }
    }
    
    if (endIndex !== -1) {
        // We have the existing rubrics string
        const existingRubricsStr = code.substring(rubricsIndex + 'rubrics: '.length, endIndex + 1);
        // Let's parse it? No, it's JS, might not be strict JSON.
        // Let's just append the new rubrics JSON to it.
        // Actually, we can just cut off the closing bracket, add a comma, and append the JSON of new rubrics without the outer brackets, then add closing bracket.
        
        let newRubricsJson = JSON.stringify(parsed, null, 2);
        // remove the first '[' and last ']'
        newRubricsJson = newRubricsJson.substring(1, newRubricsJson.length - 1);
        
        const before = code.substring(0, endIndex);
        const after = code.substring(endIndex);
        
        const finalCode = before + ',\n' + newRubricsJson + '\n' + after;
        
        fs.writeFileSync('./src/repertoryData.ts', finalCode);
        console.log("Appended generalities to repertoryData.ts");
    } else {
        console.log("Could not find end of rubrics array");
    }
} else {
    console.log("Could not find Generalities chapter");
}
