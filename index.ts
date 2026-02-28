/**
 * Entry: on web we show the sign-up form immediately (no white screen), then mount React.
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { registerRootComponent } from 'expo';

import App from './App';
import { ErrorBoundary } from './src/components/ErrorBoundary';

// Sign-up form HTML – shown in #root immediately so user never sees white screen
const SIGNUP_HTML = `
<div style="min-height:100vh;width:100%;background:#0a0a0a;color:#fff;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;padding:24px;box-sizing:border-box">
  <div style="width:100%;max-width:400px">
    <h1 style="color:#C41E3A;font-size:28px;font-weight:700;text-align:center;margin:0 0 8px 0">BloodConnect</h1>
    <p style="color:#888;font-size:14px;text-align:center;margin:0 0 32px 0">Sign up to continue</p>
    <input type="email" placeholder="Email" style="width:100%;background:#1a1a1a;border:none;border-radius:12px;padding:16px;color:#fff;font-size:16px;margin-bottom:16px;box-sizing:border-box" />
    <input type="password" placeholder="Password" style="width:100%;background:#1a1a1a;border:none;border-radius:12px;padding:16px;color:#fff;font-size:16px;margin-bottom:16px;box-sizing:border-box" />
    <div style="background:#1a1a1a;border-radius:12px;padding:16px;margin-bottom:16px;color:#666;font-size:16px">Choose role...</div>
    <button style="width:100%;background:#C41E3A;color:#fff;border:none;border-radius:12px;padding:16px;font-size:16px;font-weight:600;cursor:pointer">Sign up</button>
    <p style="color:#888;font-size:11px;text-align:center;margin-top:24px">Demo: admin@bc.com, hr@bc.com, volunteer@bc.com</p>
  </div>
</div>
`;

const rootStyles = StyleSheet.create({
  root: { flex: 1, minHeight: '100vh', width: '100%', backgroundColor: '#0a0a0a' },
});

function Root() {
  return (
    <View style={rootStyles.root}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </View>
  );
}

const isWeb = typeof document !== 'undefined';

function runWeb() {
  const style = document.createElement('style');
  style.id = 'bc-styles';
  style.textContent = 'html,body{height:100%;margin:0;overflow:auto;background:#0a0a0a!important}#root{display:flex!important;min-height:100vh!important;width:100%!important;background:#0a0a0a!important}';
  if (!document.getElementById(style.id)) document.head.appendChild(style);

  let el = document.getElementById('root');
  if (!el && document.body) {
    el = document.createElement('div');
    el.id = 'root';
    document.body.appendChild(el);
  }
  if (el) {
    el.innerHTML = SIGNUP_HTML;
    try {
      const { createRoot } = require('react-dom/client');
      createRoot(el).render(React.createElement(Root));
    } catch (e) {
      console.error('[BloodConnect]', e);
    }
  } else {
    registerRootComponent(Root);
  }
}

if (isWeb) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runWeb);
  } else {
    runWeb();
  }
} else {
  registerRootComponent(Root);
}
