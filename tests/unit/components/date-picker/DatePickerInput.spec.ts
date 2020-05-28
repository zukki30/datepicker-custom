import { createWrapper, createWrapperMount } from "@test-utils/factory";
import VueI18n from "vue-i18n";
import { AvailableLanguages } from "@/i18n";
import { expectEmitted } from "@test-utils/test-util";
import { PopupAlign } from "@/components/date-picker/DatePickerData";
import { CalendarData, weeks } from "@/components/date-picker/CalendarData";
import { DateFormat, formatDate } from "@/util/date-util";
import translationTexts from "@/i18n/components/date-picker/date-picker-input.json";
import DatePickerInput from "@/components/date-picker/DatePickerInput.vue";
import DatePickerPopup from "@/components/date-picker/popup/DatePickerPopup.vue";

const setDate = new Date("2020-02-29");

const i18n = new VueI18n({
  locale: AvailableLanguages.ja,
  messages: translationTexts
});

let options: object = {};

describe("DatePickerInput.vue", () => {
  beforeEach(() => {
    options = {
      i18n,
      propsData: {
        value: setDate
      }
    };
  });

  it("Add value prop when value is 'setDate'", () => {
    const wrapper = createWrapper(DatePickerInput, options);
    expect(wrapper.props().value).toEqual(setDate);
    expect(wrapper.find(".datePickerInput__input").props().value).toEqual(
      formatDate(DateFormat.yyyy年M月d日, setDate)
    );
  });

  it("Add disabled prop when value is true", () => {
    options = {
      i18n,
      propsData: {
        disabled: true
      }
    };
    const wrapper = createWrapper(DatePickerInput, options);
    expect(wrapper.props().disabled).toEqual(true);
    expect(wrapper.find(".datePickerInput__input").props().disabled).toEqual(
      true
    );
  });

  it("Add width prop when value is 'WIDTH'", () => {
    const WIDTH = "500px";
    options = {
      i18n,
      propsData: {
        width: WIDTH
      }
    };
    const wrapper = createWrapper(DatePickerInput, options);
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
        enabledPeriod: ENABLED_PERIOD
      }
    };
    const wrapper = createWrapperMount(DatePickerInput, options);
    wrapper.find(".datePickerInput__field").trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.props().enabledPeriod).toEqual(ENABLED_PERIOD);
    expect(wrapper.find(DatePickerPopup).props().enabledPeriod).toEqual(
      ENABLED_PERIOD
    );
  });

  it("Add align prop when value is 'PopupAlign.Center'", async () => {
    options = {
      i18n,
      propsData: {
        align: PopupAlign.Center
      }
    };
    const wrapper = createWrapperMount(DatePickerInput, options);
    expect(wrapper.props().align).toEqual(PopupAlign.Center);
  });

  it("emits inputed to return date.", async () => {
    const wrapper = createWrapperMount(DatePickerInput, options);
    wrapper.find(".datePickerInput__field").trigger("click");
    await wrapper.vm.$nextTick(() => {
      expect(wrapper.find(".datePickerInput__popup").exists()).toEqual(true);

      const table = CalendarData.buildCalendarTable(setDate);
      const rowIndex = 2;
      const cellIndex = 4;

      const calendars = wrapper.findAll(".datePickerPopup__calendar");
      const cells = calendars.at(2).findAll(".calendarBase__bodyCell");
      cells.at(weeks.length * rowIndex + cellIndex).trigger("click");

      expectEmitted(wrapper, "input", table[rowIndex][cellIndex]);
      expect(wrapper.find(".datePickerInput__popup").exists()).toEqual(false);
    });
  });
});
