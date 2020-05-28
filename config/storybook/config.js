import { i18n, AvailableLanguages } from "@/i18n";
import { configure, addDecorator } from "@storybook/vue";
import { select } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs";
import { withInfo } from "storybook-addon-vue-info";
import Vue from "vue";
import vClickOutside from "v-click-outside";

import "element-ui/lib/theme-chalk/index.css";
import "@/assets/scss/reset.scss";

// Storybook調整CSS
import "./storybook.scss";

Vue.use(vClickOutside);

addDecorator(withInfo);
addDecorator(withKnobs);

// 言語切替をKnobsに追加
const languages = Object.keys(AvailableLanguages);
addDecorator(() => {
  return {
    template: `<story/>`,
    i18n,
    beforeCreate: function() {
      // snapshots の翻訳 warring を非表示にする
      this.$i18n.silentTranslationWarn = true;
      this.$root._i18n = this.$i18n;
    },
    props: {
      storybookLocale: {
        type: String,
        default: select("Language", languages, "ja")
      }
    },
    watch: {
      storybookLocale: {
        handler() {
          this.$i18n.locale = this.storybookLocale;
        },
        immediate: true
      }
    }
  };
});

const req = require.context("../../src/stories/", true, /.stories.ts$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
