import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const text = fs.readFileSync(path.join(__dirname, "src/repertoryData.ts"), "utf8");

const lines = text.split("\n");
const chapters = lines.filter((l) => l.startsWith('    name: "'));
console.log(chapters);
