import initStoryshots from "@storybook/addon-storyshots";

initStoryshots({
  configPath: "config/storybook",
  // element-uiで乱数付与しているため除外
  storyKindRegex: /^((?!.*?Tooltip).)*$/
});
