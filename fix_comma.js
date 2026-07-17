import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "src/repertoryData.ts");
let text = fs.readFileSync(filePath, "utf8");

// find "{" which I injected.
// It is at 3271|        {
// Wait, my string was `      {\n        "name": "Weakness",`
// Let's just do a replace.
text = text.replace('      {\n        "name": "Weakness",', ',\n      {\n        "name": "Weakness",');

fs.writeFileSync(filePath, text, "utf8");
console.log("Fixed comma.");
