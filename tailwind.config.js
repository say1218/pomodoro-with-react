module.exports = {
    purge: ["./src/**/*.html", "./src/**/*.js"],
    theme: {

    },
    variants: [
      "responsive",
      "group-hover",
      "focus-within",
      "first",
      "last",
      "odd",
      "even",
      "hover",
      "focus",
      "active",
      "visited",
      "disabled",
    ],
    plugins: [],
    future: {
      removeDeprecatedGapUtilities: true,
      purgeLayersByDefault: true,
      defaultLineHeights: true,
      standardFontWeights: true
    },
  };