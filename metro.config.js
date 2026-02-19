const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Disable package exports so Metro resolves @react-navigation/stack internal
// modules (e.g. Header.js) correctly and we can use the JS stack on Android
// to avoid the String/Boolean native cast crash.
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
