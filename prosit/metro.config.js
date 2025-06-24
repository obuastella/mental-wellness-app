const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
config.resolver.alias = {
  ...config.resolver.alias,
  "react-native-vector-icons": "@expo/vector-icons",
};

// Ensure Firebase modules are properly resolved
config.resolver.platforms = ["ios", "android", "native", "web"];

module.exports = withNativeWind(config, { input: "./app/globals.css" });
