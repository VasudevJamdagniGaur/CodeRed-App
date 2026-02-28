import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { ErrorBoundary } from './src/components/ErrorBoundary';

const rootStyle = Platform.select({
  web: {
    flex: 1,
    minHeight: '100vh',
    width: '100%' as const,
    backgroundColor: '#0a0a0a',
  },
  default: { flex: 1 },
});

const WEB_ROOT_STYLES = `html, body { height: 100%; margin: 0; overflow: hidden; background: #0a0a0a !important; }
#root, [data-reactroot], [data-reactroot] > div { display: flex !important; min-height: 100% !important; width: 100% !important; background: #0a0a0a !important; }`;

if (typeof document !== 'undefined') {
  const id = 'codered-web-root-styles';
  if (!document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id;
    el.textContent = WEB_ROOT_STYLES;
    document.head.appendChild(el);
  }
}

export default function App() {
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    const id = 'codered-web-root-styles';
    if (document.getElementById(id)) return;
    const el = document.createElement('style');
    el.id = id;
    el.textContent = WEB_ROOT_STYLES;
    document.head.appendChild(el);
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
