import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "src/ClinicalIntakeForm.tsx");
let code = fs.readFileSync(filePath, "utf8");

code = code.replaceAll("s => !s.startsWith('Narrative:')", "s => !(s && s.startsWith('Narrative:'))");
code = code.replaceAll("s => s.startsWith('Narrative:')", "s => s && s.startsWith('Narrative:')");

fs.writeFileSync(filePath, code, "utf8");
console.log("Success");
