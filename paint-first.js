/**
 * NO IMPORTS. This file runs first when the bundle loads (via AppEntry patch).
 * Paints the sign-up screen immediately so the user never sees white.
 */
(function () {
  if (typeof document === 'undefined') return;
  var style = document.createElement('style');
  style.id = 'bc-first';
  style.textContent = 'html,body{height:100%;margin:0;overflow:auto;background:#0a0a0a!important}#root{display:block!important;min-height:100vh!important;width:100%!important;background:#0a0a0a!important}';
  if (document.head) document.head.appendChild(style);
  var root = document.getElementById('root');
  if (!root && document.body) {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  }
  if (root) {
    root.innerHTML = '<div style="min-height:100vh;width:100%;background:#0a0a0a;color:#fff;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;padding:24px;box-sizing:border-box"><div style="width:100%;max-width:400px"><h1 style="color:#C41E3A;font-size:28px;font-weight:700;text-align:center;margin:0 0 8px 0">BloodConnect</h1><p style="color:#888;font-size:14px;text-align:center;margin:0 0 24px 0">Sign up to continue</p><input type="email" placeholder="Email" style="width:100%;background:#1a1a1a;border:none;border-radius:12px;padding:16px;color:#fff;font-size:16px;margin-bottom:12px;box-sizing:border-box" /><input type="password" placeholder="Password" style="width:100%;background:#1a1a1a;border:none;border-radius:12px;padding:16px;color:#fff;font-size:16px;margin-bottom:12px;box-sizing:border-box" /><div style="background:#1a1a1a;border-radius:12px;padding:16px;margin-bottom:12px;color:#666;font-size:16px">Choose role...</div><button style="width:100%;background:#C41E3A;color:#fff;border:none;border-radius:12px;padding:16px;font-size:16px;font-weight:600;cursor:pointer">Sign up</button><p style="color:#666;font-size:11px;text-align:center;margin-top:20px">Demo: admin@bc.com, hr@bc.com, volunteer@bc.com</p></div></div>';
  }
})();
