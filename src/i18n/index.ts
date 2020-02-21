import Vue from "vue";
import VueI18n from "vue-i18n";

import u_dateUtil from "./util/date-util.json";

export enum AvailableLanguages {
  ja = "ja",
  en = "en"
}

Vue.use(VueI18n);

import Element from "element-ui";

const locale = getInitalLanguage();

const messages = {
  en: {
    util: {
      dateUtil: { ...u_dateUtil.en }
    }
  },
  ja: {
    util: {
      dateUtil: { ...u_dateUtil.ja }
    }
  }
};

const i18n = new VueI18n({
  locale,
  messages
});

Vue.use(Element, {
  i18n: (key: string, value?: any[] | { [key: string]: any }) =>
    i18n.t(key, value)
});

export function getInitalLanguage(): AvailableLanguages {
  try {
    return getBrowserLanguage();
  } catch (e) {
    return AvailableLanguages.ja;
  }
}

export function getBrowserLanguage(): AvailableLanguages {
  const navi = navigator as any;
  const lang: string =
    navi.userLanguage || navi.browserLanguage || navigator.language || "en";

  const localeString = lang.substring(0, 2).toLowerCase();
  if (localeString === "ja") {
    return AvailableLanguages.ja;
  }

  return AvailableLanguages.en;
}

export { i18n };
