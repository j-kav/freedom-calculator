module.exports = api => {
  const presets = [
    ["@babel/preset-env",
      {
        "targets": {
          "browsers": ["last 2 versions"]
        }
      }]
  ];
  const plugins = [];
  api.cache(false)
  return {
    presets,
    plugins
  };
}