/**
 * Patch Expo AppEntry so on web we paint the screen first (paint-first.js), then load the app.
 * This guarantees the user sees the sign-up screen instead of white.
 */
const fs = require('fs');
const path = require('path');

const appEntryPath = path.join(__dirname, '..', 'node_modules', 'expo', 'AppEntry.js');

const content = `/**
 * Patched: run paint-first.js so something shows immediately, then load the app.
 */
require('../../paint-first.js');
var registerRootComponent = require('expo/src/launch/registerRootComponent').default;
var App = require('../../App').default;
registerRootComponent(App);
`;

try {
  fs.writeFileSync(appEntryPath, content, 'utf8');
  console.log('Patched expo/AppEntry.js (paint-first then app)');
} catch (e) {
  console.warn('Patch failed:', e.message);
}
