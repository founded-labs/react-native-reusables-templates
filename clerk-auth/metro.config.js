const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

const expoGoClerkNativeModuleShim = path.resolve(__dirname, 'shims/clerk-expo-native-module.js');
const resolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'android' && moduleName.endsWith('/specs/NativeClerkModule')) {
    return {
      type: 'sourceFile',
      filePath: expoGoClerkNativeModuleShim,
    };
  }

  return resolveRequest
    ? resolveRequest(context, moduleName, platform)
    : context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: './global.css', inlineRem: 16 });
