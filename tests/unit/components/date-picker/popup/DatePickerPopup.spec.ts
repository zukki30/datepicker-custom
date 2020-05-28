import { createWrapper, createWrapperMount } from "@test-utils/factory";
import { expectEmitted } from "@test-utils/test-util";
import { CalendarData, weeks } from "@/components/date-picker/CalendarData";
import { DatePickerData } from "@/components/date-picker/DatePickerData";
import DatePickerPopup from "@/components/date-picker/popup/DatePickerPopup.vue";

const setDate = new Date("2020-02-29");
const DATEPICKER = DatePickerData.build(setDate);

let options: object = {};

describe("DatePickerPopup.vue", () => {
  beforeEach(() => {
    options = {
      propsData: {
        datePicker: DATEPICKER
      }
    };
  });

  it("Add datePicker prop when value is 'DATEPICKER'", () => {
    const wrapper = createWrapper(DatePickerPopup, options);
    expect(wrapper.props().datePicker).toEqual(DATEPICKER);
  });

  it("Add selectedDate prop when value is 'SELECTED_DATE'", () => {
    const SELECTED_DATE = new Date("2020-02-12");
    options = {
      propsData: {
        datePicker: DATEPICKER,
        selectedDate: SELECTED_DATE
      }
    };
    const wrapper = createWrapper(DatePickerPopup, options);
    expect(wrapper.props().selectedDate).toEqual(SELECTED_DATE);
    expect(
      wrapper.find(".datePickerPopup__calendar").props().selectedDate
    ).toEqual(SELECTED_DATE);
  });

  it("Add enabledPeriod prop when value is 'ENABLED_PERIOD'", () => {
    const ENABLED_PERIOD = {
      min: new Date("2020-01-29"),
      max: new Date("2020-03-04")
    };
    options = {
      propsData: {
        datePicker: DATEPICKER,
        enabledPeriod: ENABLED_PERIOD
      }
    };
    const wrapper = createWrapper(DatePickerPopup, options);
    expect(wrapper.props().enabledPeriod).toEqual(ENABLED_PERIOD);
    expect(
      wrapper.find(".datePickerPopup__calendar").props().enabledPeriod
    ).toEqual(ENABLED_PERIOD);
  });

  it("emits select-date to return date.", () => {
    options = {
      propsData: {
        datePicker: DATEPICKER
      }
    };
    const wrapper = createWrapperMount(DatePickerPopup, options);
    const table = CalendarData.buildCalendarTable(setDate);
    const rowIndex = 2;
    const cellIndex = 4;

    const calendars = wrapper.findAll(".datePickerPopup__calendar");
    const cells = calendars.at(2).findAll(".calendarBase__bodyCell");
    cells.at(weeks.length * rowIndex + cellIndex).trigger("click");
    expectEmitted(wrapper, "select-date", table[rowIndex][cellIndex]);
  });

  it("emits moved to return calendar.", () => {
    options = {
      propsData: {
        datePicker: DATEPICKER
      }
    };
    const wrapper = createWrapperMount(DatePickerPopup, options);
    wrapper
      .find(".datePickerPopupContainer__previousYearButton")
      .trigger("click");
    expectEmitted(wrapper, "move-year-month", DATEPICKER.previousYearCalendar);
  });

  it("emits mouse-enter-date to return date.", () => {
    const wrapper = createWrapperMount(DatePickerPopup, options);
    const table = CalendarData.buildCalendarTable(setDate);
    const rowIndex = 2;
    const cellIndex = 4;

    const calendars = wrapper.findAll(".datePickerPopup__calendar");
    const cells = calendars.at(2).findAll(".calendarDateTable__inner");
    cells.at(weeks.length * rowIndex + cellIndex).trigger("mouseenter");
    expectEmitted(wrapper, "mouse-enter-date", table[rowIndex][cellIndex]);
  });
});
