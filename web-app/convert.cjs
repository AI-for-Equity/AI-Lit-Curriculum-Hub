const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../AI Literacy Curriculum Hub - What to Teach.csv');
const jsonPath = path.join(__dirname, 'src/data/resources.json');
const modelsDir = path.dirname(jsonPath);

if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

const csv = fs.readFileSync(csvPath, 'utf8');

// CSV Parser that handles quoted fields with newlines
function parseCSV(text) {
  const result = [];
  let row = [];
  let current = '';
  let inQuote = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuote && nextChar === '"') {
        current += '"';
        i++; // skip next quote
      } else {
        inQuote = !inQuote;
      }
    } else if (char === ',' && !inQuote) {
      row.push(current.trim());
      current = '';
    } else if ((char === '\r' || char === '\n') && !inQuote) {
      if (char === '\r' && nextChar === '\n') i++; // skip \n
      row.push(current.trim());
      if (row.some(cell => cell.length > 0)) {
        result.push(row);
      }
      row = [];
      current = '';
    } else {
      current += char;
    }
  }
  if (current || row.length) {
    row.push(current.trim());
    if (row.some(cell => cell.length > 0)) result.push(row);
  }
  return result;
}

const rows = parseCSV(csv);

// Skip metadata lines. Data starts around line 8 (index 7)
// Headers are messy, mapping by index manually based on inspection.
// 0: From
// 1: Resource (Title)
// 2: Link
// 5: ES (x if true)
// 6: MS (x if true)
// 7: HS (x if true)
// 8: Quantity
// 9: Duration
// 10: Build on each other
// 11: Hands on
// 12: Lesson Plans
// 13: Videos
// 14: Slides
// 15: Handouts
// 16: Description
// 17: Our Take
// 18: Objectives
// 19: Access Notes

const data = [];

// Iterate starting from row that has "Quill" (which was line 8 in file, so index around 7 or 8 depending on parser)
// Let's find the first row with a URL in column 2 or "Quill" in col 0.

let startIndex = -1;
for (let i = 0; i < rows.length; i++) {
  if (rows[i][0] === 'Quill') {
    startIndex = i;
    break;
  }
}

if (startIndex === -1) {
  console.error("Could not find start of data");
  process.exit(1);
}

for (let i = startIndex; i < rows.length; i++) {
  const row = rows[i];
  if (row.length < 3) continue; // Skip empty/malformed rows

  const provider = row[0];
  const title = row[1];
  const link = row[2];

  if (!title) continue;

  const grades = [];
  if (row[5]?.toLowerCase().includes('x')) grades.push('Elementary (ES)');
  if (row[6]?.toLowerCase().includes('x')) grades.push('Middle School (MS)');
  if (row[7]?.toLowerCase().includes('x')) grades.push('High School (HS)');

  const resources = [];
  if (row[12]?.toLowerCase() === 'yes') resources.push('Lesson Plans');
  if (row[13]?.toLowerCase() === 'yes') resources.push('Videos');
  if (row[14]?.toLowerCase() === 'yes') resources.push('Slides');
  if (row[15]?.toLowerCase() === 'yes') resources.push('Handouts');

  const item = {
    id: i,
    provider,
    title,
    url: link,
    grades,
    quantity: row[8],
    duration: row[9],
    description: row[16],
    ourTake: row[17],
    objectives: row[18],
    accessNotes: row[19],
    resources,
    handsOn: row[11]?.toLowerCase() === 'yes',
    buildsOn: row[10]?.toLowerCase() === 'yes'
  };

  data.push(item);
}

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
console.log(`Converted ${data.length} items to JSON.`);
