/**
 * Runs FIRST when the bundle loads. No imports - so nothing can throw before we paint.
 * This is the only way to guarantee something shows instead of a white screen.
 */
(function () {
  if (typeof document === 'undefined') return;
  var style = document.createElement('style');
  style.id = 'bc-first-paint';
  style.textContent = 'html,body{height:100%;margin:0;background:#0a0a0a!important}#root{min-height:100vh;background:#0a0a0a!important}';
  document.head.appendChild(style);
  var root = document.getElementById('root');
  if (!root && document.body) {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  }
  if (root) {
    root.innerHTML = '<div style="min-height:100vh;width:100%;background:#0a0a0a;color:#fff;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;padding:24px;box-sizing:border-box"><div style="width:100%;max-width:400px;text-align:center"><h1 style="color:#C41E3A;font-size:28px;margin:0 0 8px 0">BloodConnect</h1><p style="color:#888;font-size:14px;margin:0 0 24px 0">Sign up to continue</p><input type="email" placeholder="Email" style="width:100%;background:#1a1a1a;border:none;border-radius:12px;padding:16px;color:#fff;font-size:16px;margin-bottom:12px;box-sizing:border-box" /><input type="password" placeholder="Password" style="width:100%;background:#1a1a1a;border:none;border-radius:12px;padding:16px;color:#fff;font-size:16px;margin-bottom:12px;box-sizing:border-box" /><button style="width:100%;background:#C41E3A;color:#fff;border:none;border-radius:12px;padding:16px;font-size:16px;font-weight:600;cursor:pointer">Sign up</button></div></div>';
  }
})();
require('./index.ts');
