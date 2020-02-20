module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue", "ts", "tsx"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js?$": "babel-jest"
  },
  transformIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!storybook-addon-vue-info).+\\.js$"
  ],
  snapshotSerializers: ["jest-serializer-vue"],
  setupFiles: ["<rootDir>/.jest/register-context.js"],
  testMatch: [
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__t/ests__/*.(js|jsx|ts|tsx)",
    "**/tests/StoryShots.test.js"
  ],
  testURL: "http://localhost/",
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ],
  globals: {
    "ts-jest": {
      babelConfig: true
    }
  }
};
