import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function fixFile(filePath) {
  let code = fs.readFileSync(filePath, "utf8");
  code = code.replace(/,\s*any\s*>/g, ", unknown>");
  code = code.replace(/:\s*any/g, ": unknown");
  code = code.replace(/as\s+any/g, "as unknown");
  fs.writeFileSync(filePath, code, "utf8");
}

fixFile(path.join(__dirname, "src/App.tsx"));
fixFile(path.join(__dirname, "src/MainTabs.tsx"));
console.log("Fixed any types");
