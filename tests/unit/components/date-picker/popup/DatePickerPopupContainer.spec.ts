import { createWrapper } from "@test-utils/factory";
import { expectEmitted } from "@test-utils/test-util";
import { DatePickerData } from "@/components/date-picker/DatePickerData";
import DatePickerPopupContainer from "@/components/date-picker/popup/DatePickerPopupContainer.vue";

const setDate = new Date("2020-02-29");
const DATEPICKER = DatePickerData.build(setDate);

let options: object = {};

describe("DatePickerPopupContainer.vue", () => {
  beforeEach(() => {
    options = {
      propsData: {
        datePicker: DATEPICKER
      }
    };
  });

  it("Add datePicker prop when value is 'DATEPICKER'", () => {
    const wrapper = createWrapper(DatePickerPopupContainer, options);
    expect(wrapper.props().datePicker).toEqual(DATEPICKER);
  });

  it("'.datePickerPopupContainer__previousYearButton' emits clicked to return calendar.", () => {
    const wrapper = createWrapper(DatePickerPopupContainer, options);

    wrapper
      .find(".datePickerPopupContainer__previousYearButton")
      .trigger("click");

    expectEmitted(wrapper, "move-year-month", DATEPICKER.previousYearCalendar);
  });

  it("'.datePickerPopupContainer__previousMonthButton' emits clicked to return calendar.", () => {
    const wrapper = createWrapper(DatePickerPopupContainer, options);

    wrapper
      .find(".datePickerPopupContainer__previousMonthButton")
      .trigger("click");

    expectEmitted(wrapper, "move-year-month", DATEPICKER.calendars[1]);
  });

  it("'.datePickerPopupContainer__nextMonthButton' emits clicked to return calendar.", () => {
    const wrapper = createWrapper(DatePickerPopupContainer, options);

    wrapper.find(".datePickerPopupContainer__nextMonthButton").trigger("click");

    expectEmitted(wrapper, "move-year-month", DATEPICKER.nextMonthCalendar);
  });

  it("'.datePickerPopupContainer__nextYearButton' emits clicked to return calendar.", () => {
    const wrapper = createWrapper(DatePickerPopupContainer, options);

    wrapper.find(".datePickerPopupContainer__nextYearButton").trigger("click");

    expectEmitted(wrapper, "move-year-month", DATEPICKER.nextYearCalendar);
  });
});
