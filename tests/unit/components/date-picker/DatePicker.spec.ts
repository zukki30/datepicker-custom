import { DatePicker } from "@/components/date-picker/DatePicker";
import { Calendar } from "@/components/calendar/Calendar";

describe("DatePicker", () => {
  describe("getters", () => {
    const date = new Date("2020-02-15");
    const monthsAgo = 3;
    const datePicker = new DatePicker(date, monthsAgo);

    it("returns Calendars for monthsAgo from date", () => {
      const calendars = datePicker.calendars;

      expect(calendars.length).toEqual(monthsAgo);

      for (let i = 0; i < calendars.length; i++) {
        const index = monthsAgo - i - 1;
        const calendar = Calendar.previousCalendarBuild(date, index);

        expect(calendars[i].year).toEqual(calendar.year);
        expect(calendars[i].monthIndex).toEqual(calendar.monthIndex);
        expect(calendars[i].month).toEqual(calendar.month);
      }
    });

    it("returns Calendar from date before monthsAgo", () => {
      const previousCalendar = datePicker.previousCalendar;
      const calendar = Calendar.previousCalendarBuild(date, monthsAgo);

      expect(previousCalendar.year).toEqual(calendar.year);
      expect(previousCalendar.monthIndex).toEqual(calendar.monthIndex);
      expect(previousCalendar.month).toEqual(calendar.month);
    });

    it("returns the next Calendar from date", () => {
      const nextCalendar = datePicker.nextCalendar;

      const calendar = Calendar.nextCalendarBuild(date, 1);

      expect(nextCalendar.year).toEqual(calendar.year);
      expect(nextCalendar.monthIndex).toEqual(calendar.monthIndex);
      expect(nextCalendar.month).toEqual(calendar.month);
    });
  });

  describe("rebuild", () => {
    it("return DatePicker from calendar", () => {
      const date = new Date("2020-04-15");
      const calendar = Calendar.build(date);
      const datePicker = DatePicker.rebuild(calendar);
      const datePickerDate = datePicker.date;

      expect(date.getFullYear()).toEqual(datePickerDate.getFullYear());
      expect(date.getMonth()).toEqual(datePickerDate.getMonth());
      expect(date.getMonth() + 1).toEqual(datePickerDate.getMonth() + 1);
    });
  });
});
