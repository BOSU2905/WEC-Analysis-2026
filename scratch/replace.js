const fs = require('fs');
const files = [
  'web/src/components/story/Hero.tsx',
  'web/src/components/story/EditorialPhoto.tsx',
  'web/src/components/archive/MachinesExperience.tsx',
  'web/src/chapters/chapter-00/Chapter00.tsx',
  'web/src/chapters/chapter-04/Chapter04.tsx',
  'web/src/chapters/chapter-05/Chapter05.tsx'
];

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/import\s+\{\s*([^}]*)\s*\}\s+from\s+"framer-motion";/, (match, p1) => {
    const parts = p1.split(',').map(s => s.trim()).filter(s => s);
    const newParts = parts.map(p => p === 'motion' ? 'm' : p);
    return `import { ${newParts.join(', ')} } from "framer-motion";`;
  });
  c = c.replace(/<motion\./g, '<m.');
  c = c.replace(/<\/motion\./g, '</m.');
  fs.writeFileSync(f, c);
});
console.log('Done');
