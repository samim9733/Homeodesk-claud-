const fs = require('fs');
let content = fs.readFileSync('src/repertoryData.ts', 'utf8');

const stomachChapter = `  {
    name: "Stomach",
    tr: "পাকস্থলী",
    t: "পাকস্থলী",
    icon: "🍅",
    pages: "476-540",
    rubrics: [
      {
        name: "Vomiting",
        tr: "বমি",
        em: "🤮",
        sr: [
          {
            name: "lying on the back, while",
            tr: "চিৎ হয়ে শুয়ে থাকলে",
            em: "🤮",
            sr: [
              {
                name: "side agg.",
                tr: "পাশ ফিরলে বাড়ে",
                sr: [
                  {
                    name: "right in liver affections",
                    tr: "যকৃতের রোগে ডান পাশে",
                    sr: [
                      {
                        name: "amel.",
                        tr: "শুলে কমে",
                        d: {
                          location: [
                            { n: "Nux-v.", g: 3 },
                            { n: "Puls.", g: 3 },
                            { n: "Ars.", g: 2 },
                            { n: "Lyc.", g: 2 },
                            { n: "Calc.", g: 1 },
                            { n: "Nat-m.", g: 1 },
                            { n: "Sep.", g: 1 }
                          ],
                          general: {}
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }`;

const startIdx = content.indexOf('name: "Stomach"');
if (startIdx !== -1) {
  const chapterStart = content.lastIndexOf('{', startIdx);
  
  let braceCount = 0;
  let endIdx = -1;
  for (let i = chapterStart; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        endIdx = i + 1;
        break;
      }
    }
  }

  if (endIdx !== -1) {
    content = content.substring(0, chapterStart) + stomachChapter + content.substring(endIdx);
    fs.writeFileSync('src/repertoryData.ts', content, 'utf8');
    console.log('Replaced Stomach chapter.');
  } else {
    console.log('Could not find end of chapter.');
  }
} else {
  console.log('Could not find Stomach chapter.');
}

