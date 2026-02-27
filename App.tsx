import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { ErrorBoundary } from './src/components/ErrorBoundary';

// Ensure root fills viewport on web (fixes white screen)
const rootStyle = Platform.select({
  web: { flex: 1, minHeight: '100vh', width: '100%' as const },
  default: { flex: 1 },
});

const WEB_ROOT_STYLES = `html, body { height: 100%; margin: 0; overflow: hidden; }
#root, [data-reactroot] { display: flex; min-height: 100%; width: 100%; }`;

export default function App() {
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    const id = 'codered-web-root-styles';
    if (document.getElementById(id)) return;
    const el = document.createElement('style');
    el.id = id;
    el.textContent = WEB_ROOT_STYLES;
    document.head.appendChild(el);
    return () => { document.head.removeChild(el); };
  }, []);

  return (
    <GestureHandlerRootView style={rootStyle}>
        <ErrorBoundary>
          <AuthProvider>
            <StatusBar style="light" />
            <AppNavigator />
          </AuthProvider>
        </ErrorBoundary>
      </GestureHandlerRootView>
  );
}
