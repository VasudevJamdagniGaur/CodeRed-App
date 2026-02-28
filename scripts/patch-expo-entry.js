/**
 * Patch Expo AppEntry.js so the web bundle runs our index.ts (which mounts to #root and shows sign-up).
 * Run after npm install so web never gets a white screen.
 */
const fs = require('fs');
const path = require('path');

const appEntryPath = path.join(__dirname, '..', 'node_modules', 'expo', 'AppEntry.js');
const content = `/**
 * Patched: run bootstrap.js first (paints immediately, no imports), then app.
 */
require('../../bootstrap.js');
`;

try {
  fs.writeFileSync(appEntryPath, content, 'utf8');
  console.log('Patched expo/AppEntry.js to use project index.ts');
} catch (e) {
  console.warn('Could not patch expo/AppEntry.js:', e.message);
}
