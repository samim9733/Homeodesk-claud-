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
  if (code.match(/,\s*unknown\s*>/) || code.match(/:\s*unknown\b/) || code.match(/as\s+unknown\b/) || code.match(/<\s*unknown\s*>/)) {
    code = code.replace(/,\s*unknown\s*>/g, ", any>");
    code = code.replace(/:\s*unknown\b/g, ": any");
    code = code.replace(/as\s+unknown\b/g, "as any");
    code = code.replace(/<\s*unknown\s*>/g, "<any>");
    fs.writeFileSync(filePath, code, "utf8");
    modified = true;
  }
}
console.log("Reverted unknown to any");
