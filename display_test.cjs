const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/parsed_repertory.json', 'utf8'));

// Find a mind rubric with nested sub-rubrics
const keys = Object.keys(data);
for (const key of keys) {
  if (data[key].rubrics) {
    for (const rubric of data[key].rubrics) {
      if (rubric.sr && rubric.sr.some(sr => sr.sr)) {
        console.log("Found nested SR in:", rubric.name);
        console.log(JSON.stringify(rubric, null, 2).slice(0, 1000));
        process.exit();
      }
    }
  }
}
console.log("No nested SR found");
