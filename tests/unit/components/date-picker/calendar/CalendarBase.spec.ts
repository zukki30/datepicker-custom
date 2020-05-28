import { createWrapper } from "@test-utils/factory";
import { CalendarData } from "@/components/date-picker/CalendarData";
import CalendarBase from "@/components/date-picker/calendar/CalendarBase.vue";

const setDate = new Date("2020-02-20");
const CALENDAR = CalendarData.build(setDate);

let options: object = {};

describe("CalendarBase.vue", () => {
  beforeEach(() => {
    options = {
      propsData: {
        calendar: CALENDAR
      }
    };
  });

  it("Add calendar prop when value is 'CALENDAR'", () => {
    const wrapper = createWrapper(CalendarBase, options);

    expect(wrapper.props().calendar).toEqual(CALENDAR);
  });

  it("emits select-date to return date.", () => {
    const wrapper = createWrapper(CalendarBase, options);
    const table = CalendarData.buildCalendarTable(setDate);

    const cell = wrapper.findAll(".calendarBase__bodyCell");
    let num = 0;
    table.forEach(row => {
      row.forEach(date => {
        cell.at(num).trigger("click");

        // click回数が増えるためexpectEmittedを使用しない
        expect(wrapper.emitted("select-date")).toBeTruthy();
        expect(wrapper.emitted("select-date")!.length).toBe(num + 1);
        expect(wrapper.emitted("select-date")![num]).toEqual([date]);

        num += 1;
      });
    });
  });
});
