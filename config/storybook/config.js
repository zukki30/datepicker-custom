import { configure, addDecorator } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";
import { withInfo } from "storybook-addon-vue-info";

import "element-ui/lib/theme-chalk/index.css";
import "@/assets/scss/style.scss";

// Storybook調整CSS
import "./storybook.scss";

addDecorator(withInfo);
addDecorator(withKnobs);

const req = require.context("../../src/stories/", true, /.stories.ts$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
