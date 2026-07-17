import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const text = fs.readFileSync(path.join(__dirname, "src/repertoryData.ts"), "utf8");

const genStart = text.indexOf('name: "Generalities",');
if (genStart === -1) {
    console.log("Generalities not found");
} else {
    const genText = text.substring(genStart, text.indexOf('name: "', genStart + 20) !== -1 ? text.indexOf('name: "', genStart + 20) : undefined);
    
    // extract just the rubric names within Generalities
    const lines = genText.split('\n');
    const rubrics = lines.filter(l => l.includes('"name":')).map(l => l.split('"name": "')[1]?.replace('",', ''));
    console.log("Generalities Rubrics:", rubrics.slice(0, 50));
}
