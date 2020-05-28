import { createWrapper, createWrapperMount } from "@test-utils/factory";
import VueI18n from "vue-i18n";
import { AvailableLanguages } from "@/i18n";
import { expectEmittedOneTime, expectEmitted } from "@test-utils/test-util";
import { PopupAlign } from "@/components/date-picker/DatePickerData";
import { CalendarData, weeks } from "@/components/date-picker/CalendarData";
import { DateFormat, formatDate } from "@/util/date-util";
import translationTexts from "@/i18n/components/date-picker/date-range-picker-input.json";
import DateRangePickerInput from "@/components/date-picker/DateRangePickerInput.vue";
import DatePickerReadonlyInput from "@/components/date-picker/DatePickerReadonlyInput.vue";
import DateRangePickerPopup from "@/components/date-picker/popup/DateRangePickerPopup.vue";
import IconButton from "@/components/IconButton.vue";

const VALUE = {
  min: new Date("2020-02-15"),
  max: new Date("2020-02-25")
};

const i18n = new VueI18n({
  locale: AvailableLanguages.ja,
  messages: translationTexts
});

let options: object = {};

describe("DateRangePickerInput.vue", () => {
  beforeEach(() => {
    options = {
      i18n,
      propsData: {
        value: VALUE
      }
    };
  });

  it("Add selectedPeriod prop when value is 'VALUE'", () => {
    const wrapper = createWrapper(DateRangePickerInput, options);
    const inputs = wrapper.findAll(DatePickerReadonlyInput);
    expect(wrapper.props().value).toEqual(VALUE);
    expect(inputs.at(0).props().value).toEqual(
      formatDate(DateFormat.yyyy年M月d日, VALUE.min)
    );
    expect(inputs.at(1).props().value).toEqual(
      formatDate(DateFormat.yyyy年M月d日, VALUE.max)
    );
  });

  it("Add disabled prop when value is true", () => {
    options = {
      i18n,
      propsData: {
        value: VALUE,
        disabled: true
      }
    };
    const wrapper = createWrapper(DateRangePickerInput, options);
    const inputs = wrapper.findAll(DatePickerReadonlyInput);
    expect(wrapper.props().disabled).toEqual(true);
    expect(inputs.at(0).props().disabled).toEqual(true);
    expect(inputs.at(1).props().disabled).toEqual(true);
  });

  it("Add width prop when value is 'WIDTH'", () => {
    const WIDTH = "500px";
    options = {
      i18n,
      propsData: {
        width: WIDTH
      }
    };
    const wrapper = createWrapper(DateRangePickerInput, options);
    expect(wrapper.props().width).toEqual(WIDTH);
    expect(wrapper.attributes().style).toContain("width: " + WIDTH);
  });

  it("Add enabledPeriod prop when value is 'ENABLED_PERIOD'", async () => {
    const ENABLED_PERIOD = {
      min: new Date("2020-01-29"),
      max: new Date("2020-03-04")
    };
    options = {
      i18n,
      propsData: {
        value: VALUE,
        enabledPeriod: ENABLED_PERIOD
      }
    };

    const wrapper = createWrapper(DateRangePickerInput, options);
    wrapper
      .findAll(".dateRangePickerInput__field")
      .at(0)
      .trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.props().enabledPeriod).toEqual(ENABLED_PERIOD);
    expect(wrapper.find(DateRangePickerPopup).props().enabledPeriod).toEqual(
      ENABLED_PERIOD
    );
  });

  it("Add align prop when value is 'PopupAlign.Center'", async () => {
    options = {
      i18n,
      propsData: {
        value: VALUE,
        align: PopupAlign.Center
      }
    };
    const wrapper = createWrapper(DateRangePickerInput, options);
    expect(wrapper.props().align).toEqual(PopupAlign.Center);
  });

  it("Add showPeriodChoices prop when value is true", async () => {
    const wrapper = createWrapper(DateRangePickerInput, options);
    wrapper
      .findAll(".dateRangePickerInput__field")
      .at(0)
      .trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.props().showPeriodChoices).toEqual(true);
    expect(wrapper.find(".dateRangePickerInput__header").exists()).toEqual(
      true
    );
  });

  it("emits inputed to return date.", async () => {
    const wrapper = createWrapperMount(DateRangePickerInput, options);
    wrapper
      .findAll(".dateRangePickerInput__field")
      .at(0)
      .trigger("click");

    await wrapper.vm.$nextTick(async () => {
      expect(wrapper.find(".dateRangePickerInput__popup").exists()).toEqual(
        true
      );

      const rowIndex = 2;
      const cellIndex = 4;

      const calendars = wrapper.findAll(".dateRangePickerPopup__calendar");
      const cells = calendars.at(2).findAll(".calendarBase__bodyCell");
      const table = CalendarData.buildCalendarTable(VALUE.max);
      const min = table[rowIndex][cellIndex];

      cells.at(weeks.length * rowIndex + cellIndex).trigger("click");

      expectEmitted(wrapper, "input", {
        min,
        max: VALUE.max
      });

      await wrapper.vm.$nextTick(() => {
        expect(wrapper.find(".dateRangePickerInput__popup").exists()).toEqual(
          false
        );
      });
    });
  });

  it("emits deleteed to return date.", async () => {
    const wrapper = createWrapperMount(DateRangePickerInput, options);
    wrapper.find(IconButton).trigger("click");
    await wrapper.vm.$nextTick(() => {
      expect(wrapper.find(".dateRangePickerInput__popup").exists()).toEqual(
        true
      );
      expectEmittedOneTime(wrapper, "delete");
    });
  });
});
