import { createWrapper } from "@test-utils/factory";
import VueI18n from "vue-i18n";
import { AvailableLanguages } from "@/i18n";
import { mockDate, expectEmitted } from "@test-utils/test-util";
import { PeriodChoiceName } from "@/components/date-picker/PeriodChoice";
import translationTexts from "@/i18n/components/date-picker/period-choices.json";
import PeriodChoices from "@/components/date-picker/PeriodChoices.vue";

const i18n = new VueI18n({
  locale: AvailableLanguages.ja,
  messages: translationTexts
});

let options: object = {};

describe("PeriodChoices.vue", () => {
  beforeEach(() => {
    options = {
      i18n
    };
  });

  it("Add current prop when value is 'CURRNET'", () => {
    options = {
      i18n,
      propsData: {
        current: PeriodChoiceName.LastWeek
      }
    };
    const wrapper = createWrapper(PeriodChoices, options);
    expect(wrapper.props().current).toEqual(PeriodChoiceName.LastWeek);
    expect(wrapper.find(".periodChoices__radio:checked").exists()).toBe(true);
  });

  it("emits clicked to return PeriodChoice.", () => {
    const dateForNow = new Date("2019-08-10");
    mockDate(dateForNow);
    const wrapper = createWrapper(PeriodChoices, options);

    wrapper
      .findAll(".periodChoices__item")
      .at(2)
      .trigger("click");

    // @ts-ignore
    const lastWeek = wrapper.vm.periodChoices[2];
    expectEmitted(wrapper, "click", lastWeek);
  });
});
