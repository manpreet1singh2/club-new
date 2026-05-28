const fs = require('fs');
const path = require('path');

const registryPath = path.join(process.cwd(), 'lib', 'agent-registry.ts');
const registrySource = fs.readFileSync(registryPath, 'utf8');
const sourcePathRegex = /sourcePath:\s*['"]([^'"]+)['"]/g;

const missing = [];
let match;

while ((match = sourcePathRegex.exec(registrySource)) !== null) {
  const sourcePath = match[1];
  const fullPath = path.join(process.cwd(), 'agents', sourcePath);
  if (!fs.existsSync(fullPath)) {
    missing.push({ sourcePath, fullPath });
  }
}

if (missing.length > 0) {
  console.error('Missing agent files:');
  for (const item of missing) {
    console.error(`- ${item.sourcePath} -> ${item.fullPath}`);
  }
  process.exitCode = 1;
} else {
  console.log('All agent sourcePath files exist.');
}
