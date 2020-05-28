import Vue from "vue";
import VueI18n from "vue-i18n";

import u_dateUtil from "./util/date-util.json";

export enum AvailableLanguages {
  ja = "ja",
  "zh-hant" = "zh-hant",
  "zh-hans" = "zh-hans",
  en = "en"
}

Vue.use(VueI18n);

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
  },
  "zh-hant": {
    util: {
      dateUtil: { ...u_dateUtil["zh-hant"] }
    }
  },
  "zh-hans": {
    util: {
      dateUtil: { ...u_dateUtil["zh-hans"] }
    }
  }
};

const i18n = new VueI18n({
  locale,
  messages
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

  if (lang === "zh-CN") {
    return AvailableLanguages["zh-hans"];
  } else if (lang === "zh-TW") {
    return AvailableLanguages["zh-hant"];
  }

  const localeString = lang.substring(0, 2).toLowerCase();
  if (localeString === "ja") {
    return AvailableLanguages.ja;
  }

  return AvailableLanguages.en;
}

export { i18n };
