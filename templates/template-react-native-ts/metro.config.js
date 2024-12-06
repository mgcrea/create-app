// @ts-check
/* eslint-disable no-undef, @typescript-eslint/no-require-imports  */
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

/**
 * Metro configuration
 * @see https://reactnative.dev/docs/metro
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
