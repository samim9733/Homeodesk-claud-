const fs = require('fs');
let content = fs.readFileSync('src/MainTabs.tsx', 'utf8');

content = content.replace(
  "const [selectedRubric, setSelectedRubric] = useState<Rubric | null>(null);",
  "const [rubricPath, setRubricPath] = useState<(Rubric | import('./types').SubRubric)[]>([]);\n  const selectedRubric = rubricPath.length > 0 ? rubricPath[rubricPath.length - 1] : null;"
);

content = content.replace(
  "setSelectedRubric(rubric)",
  "setRubricPath([rubric])"
);

content = content.replace(
  "onClick={() => setSelectedRubric(null)}",
  "onClick={() => setRubricPath(prev => prev.slice(0, -1))}"
);

fs.writeFileSync('src/MainTabs.tsx', content, 'utf8');
