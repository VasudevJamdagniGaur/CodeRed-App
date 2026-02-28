// Force Expo to use our index.ts as the entry (so web mount runs and #root gets content)
module.exports = {
  expo: {
    ...require('./app.json').expo,
    // Ensure Metro uses project root index.ts as entry (not expo/AppEntry.js)
    entryPoint: './index.ts',
  },
};
