import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "src/App.tsx");
let code = fs.readFileSync(filePath, "utf8");

// find start of const loginTranslations = {
const startIdx = code.indexOf("const loginTranslations = {");
// find end of it (the next `  const { t, language } = useLanguage();`)
const endIdx = code.indexOf("const { t, language } = useLanguage();");

if (startIdx !== -1 && endIdx !== -1) {
  code = code.slice(0, startIdx) + code.slice(endIdx);
  fs.writeFileSync(filePath, code, "utf8");
  console.log("Success");
} else {
  console.log("Not found");
}
