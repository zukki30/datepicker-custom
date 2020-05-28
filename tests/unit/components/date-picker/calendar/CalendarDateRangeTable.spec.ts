import { createWrapperMount } from "@test-utils/factory";
import { expectEmitted } from "@test-utils/test-util";
import { CalendarData, weeks } from "@/components/date-picker/CalendarData";
import CalendarDateRangeTable from "@/components/date-picker/calendar/CalendarDateRangeTable.vue";

const setDate = new Date("2020-02-29");
const CALENDAR = CalendarData.build(setDate);

let options: object = {};

describe("CalendarDateRangeTable.vue", () => {
  beforeEach(() => {
    options = {
      propsData: {
        calendar: CALENDAR
      }
    };
  });

  it("Add calendar prop when value is 'CALENDAR'", () => {
    const wrapper = createWrapperMount(CalendarDateRangeTable, options);
    expect(wrapper.props().calendar).toEqual(CALENDAR);
  });

  it("Add '.calendarDateTable__date--selected' class when prop is selectedDate", () => {
    const SELECTED_DPERIOD = {
      min: new Date("2020-02-15"),
      max: new Date("2020-02-25")
    };

    options = {
      propsData: {
        calendar: CALENDAR,
        selectedPeriod: SELECTED_DPERIOD
      }
    };
    const wrapper = createWrapperMount(CalendarDateRangeTable, options);
    expect(wrapper.props().selectedPeriod).toEqual(SELECTED_DPERIOD);

    const selectedCells = wrapper.findAll(
      ".calendarDateRangeTable__date--selected"
    );
    expect(selectedCells.length).toBe(2);
    expect(
      wrapper.find(".calendarDateRangeTable__inner--rangeStart").exists()
    ).toBe(true);
    expect(
      wrapper.find(".calendarDateRangeTable__inner--rangeEnd").exists()
    ).toBe(true);

    const rangeCells = wrapper.findAll(".calendarDateRangeTable__inner--range");
    expect(rangeCells.length).toBe(9);
  });

  it("Add '.calendarDateTable__inner--desable' class when prop is enabledPeriod", () => {
    const ENABLED_PERIOD = {
      min: new Date("2020-01-29"),
      max: new Date("2020-03-04")
    };
    options = {
      propsData: {
        calendar: CALENDAR,
        enabledPeriod: ENABLED_PERIOD
      }
    };
    const wrapper = createWrapperMount(CalendarDateRangeTable, options);
    expect(wrapper.props().enabledPeriod).toEqual(ENABLED_PERIOD);

    const desableCells = wrapper.findAll(
      ".calendarDateRangeTable__inner--desable"
    );
    expect(desableCells.length).toEqual(6);
  });

  it("emits select-date to return date.", () => {
    options = {
      propsData: {
        calendar: CALENDAR
      }
    };
    const wrapper = createWrapperMount(CalendarDateRangeTable, options);
    const table = CalendarData.buildCalendarTable(setDate);
    const rowIndex = 2;
    const cellIndex = 4;

    const cells = wrapper.findAll(".calendarBase__bodyCell");
    cells.at(weeks.length * rowIndex + cellIndex).trigger("click");
    expectEmitted(wrapper, "select-date", table[rowIndex][cellIndex]);
  });

  it("enabledPeriod range cell emits select-date to not return date.", () => {
    const ENABLED_PERIOD = {
      min: new Date("2020-01-29"),
      max: new Date("2020-03-04")
    };
    options = {
      propsData: {
        calendar: CALENDAR,
        enabledPeriod: ENABLED_PERIOD
      }
    };
    const wrapper = createWrapperMount(CalendarDateRangeTable, options);
    const cells = wrapper.findAll(".calendarBase__bodyCell");

    cells.at(0).trigger("click");
    expect(wrapper.emitted("select-date")).not.toBeTruthy();
  });

  it("emits mouse-enter-date to return date.", () => {
    options = {
      propsData: {
        calendar: CALENDAR
      }
    };
    const wrapper = createWrapperMount(CalendarDateRangeTable, options);
    const table = CalendarData.buildCalendarTable(setDate);
    const rowIndex = 2;
    const cellIndex = 4;

    const cells = wrapper.findAll(".calendarDateRangeTable__inner");
    cells.at(weeks.length * rowIndex + cellIndex).trigger("mouseenter");
    expectEmitted(wrapper, "mouse-enter-date", table[rowIndex][cellIndex]);
  });
});
