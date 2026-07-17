import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { readdirSync, statSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function walkSync(dir, filelist = []) {
  const files = readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (statSync(filepath).isDirectory()) {
      filelist = walkSync(filepath, filelist);
    } else {
      filelist.push(filepath);
    }
  }
  return filelist;
}

const files = walkSync(path.join(__dirname, "src")).filter(f => f.endsWith(".ts") || f.endsWith(".tsx"));

for (const filePath of files) {
  let code = fs.readFileSync(filePath, "utf8");
  let modified = false;
  if (code.match(/,\s*any\s*>/) || code.match(/:\s*any\b/) || code.match(/as\s+any\b/) || code.match(/<\s*any\s*>/)) {
    code = code.replace(/,\s*any\s*>/g, ", unknown>");
    code = code.replace(/:\s*any\b/g, ": unknown");
    code = code.replace(/as\s+any\b/g, "as unknown");
    code = code.replace(/<\s*any\s*>/g, "<unknown>");
    fs.writeFileSync(filePath, code, "utf8");
    modified = true;
  }
}
console.log("Fixed any types in all files");
