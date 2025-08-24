module.exports = function (api) {
  api.cache(true);
  let plugins = [

    // worklets has to be listed last!
    'react-native-worklets/plugin' ];

  plugins.push("react-native-reanimated/plugin");

  return {
    presets: [
      [ "babel-preset-expo", { jsxImportSource: "nativewind" } ],
      "nativewind/babel",
    ],

    plugins,
  };
};
