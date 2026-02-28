import { registerRootComponent } from 'expo';
import App from './App';

// On web, paint the sign-up screen immediately so user never sees white (in case index.ts is the bundle entry)
if (typeof document !== 'undefined') {
  try {
    require('./paint-first.js');
  } catch (_) {}
}
registerRootComponent(App);
