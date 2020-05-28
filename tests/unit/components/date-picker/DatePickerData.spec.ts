import { DatePickerData } from "@/components/date-picker/DatePickerData";
import { CalendarData } from "@/components/date-picker/CalendarData";

describe("DatePicker", () => {
  describe("build", () => {
    it("returns calendars, previousMonthCalendar, nextMonthCalendar, previousYearCalendar, nextYearCalendar from date and monthsAgo.", () => {
      const date = new Date("2020-04-15");
      const monthsAgo = 3;
      const datePicker = DatePickerData.build(date, monthsAgo);

      expect(datePicker.calendars.length).toEqual(monthsAgo);
      for (let i = 0; i < monthsAgo; i++) {
        const index = monthsAgo - 1 - i;
        expect(datePicker.calendars[i]).toEqual(
          CalendarData.buildPreviousMonthCalendar(date, index)
        );
      }

      expect(datePicker.previousMonthCalendar).toEqual(
        CalendarData.buildPreviousMonthCalendar(date, monthsAgo)
      );
      expect(datePicker.nextMonthCalendar).toEqual(
        CalendarData.buildNextMonthCalendar(date, 1)
      );
      expect(datePicker.previousYearCalendar).toEqual(
        CalendarData.buildPreviousYearCalendar(date)
      );
      expect(datePicker.nextYearCalendar).toEqual(
        CalendarData.buildNextYearCalendar(date)
      );
    });
  });
});
