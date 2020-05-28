import { i18n, AvailableLanguages } from "@/i18n";
import {
  CalendarData,
  MAX_MONTH,
  weeks
} from "@/components/date-picker/CalendarData";

describe("Calendar", () => {
  describe("getters", () => {
    i18n.locale = AvailableLanguages.ja;
    const date = new Date("2020-01-01");
    const month = date.getMonth() + 1;
    const calendar = new CalendarData(
      date.getFullYear(),
      date.getMonth(),
      month
    );

    it("returns 'YEAR年MONTH月' for title method", () => {
      expect(calendar.title).toEqual(date.getFullYear() + "年" + month + "月");
    });

    it("returns Japanese week data for weekTexts method", () => {
      const weekTexts = calendar.weekTexts;
      for (let i = 0; i < weekTexts.length; i++) {
        const week = weekTexts[i];
        const text = i18n.t("util.dateUtil." + week.id);

        expect(week.text).toEqual(text);
      }
    });
  });

  describe("build", () => {
    it("return correct model from date", () => {
      const date = new Date("2020-03-15");
      const monthIndex = date.getMonth();
      const calendar = CalendarData.build(date);

      expect(calendar.year).toEqual(date.getFullYear());
      expect(calendar.monthIndex).toEqual(monthIndex);
      expect(calendar.month).toEqual(monthIndex + 1);
    });
  });

  describe("buildPreviousMonthCalendar", () => {
    it("return previous month model from date", () => {
      const date = new Date("2020-03-15");
      const previous = 1;
      const monthIndex = date.getMonth() - previous;
      const calendar = CalendarData.buildPreviousMonthCalendar(date, previous);

      expect(calendar.year).toEqual(date.getFullYear());
      expect(calendar.monthIndex).toEqual(monthIndex);
      expect(calendar.month).toEqual(monthIndex + 1);
    });

    it("return previous month model from date when previous year", () => {
      const date = new Date("2020-01-01");
      const previous = 1;
      const monthIndex = date.getMonth() - previous;
      const calendar = CalendarData.buildPreviousMonthCalendar(date, previous);

      expect(calendar.year).toEqual(date.getFullYear() - 1);
      expect(calendar.monthIndex).toEqual(MAX_MONTH + monthIndex);
      expect(calendar.month).toEqual(MAX_MONTH + monthIndex + 1);
    });
  });

  describe("buildNextMonthCalendar", () => {
    it("return next month model from date", () => {
      const date = new Date("2020-03-15");
      const next = 1;
      const monthIndex = date.getMonth() + next;
      const calendar = CalendarData.buildNextMonthCalendar(date, next);

      expect(calendar.year).toEqual(date.getFullYear());
      expect(calendar.monthIndex).toEqual(monthIndex);
      expect(calendar.month).toEqual(monthIndex + 1);
    });

    it("return next month model from date when next year", () => {
      const date = new Date("2020-12-12");
      const next = 1;
      const calendar = CalendarData.buildNextMonthCalendar(date, next);

      expect(calendar.year).toEqual(date.getFullYear() + 1);
      expect(calendar.monthIndex).toEqual(0);
      expect(calendar.month).toEqual(1);
    });
  });

  describe("buildPreviousYearCalendar", () => {
    it("return one year ago model from date", () => {
      const date = new Date("2020-03-15");
      const monthIndex = date.getMonth();
      const calendar = CalendarData.buildPreviousYearCalendar(date);

      expect(calendar.year).toEqual(date.getFullYear() - 1);
      expect(calendar.monthIndex).toEqual(monthIndex);
      expect(calendar.month).toEqual(monthIndex + 1);
    });
  });

  describe("buildNextYearCalendar", () => {
    it("return one year later model from date", () => {
      const date = new Date("2020-03-15");
      const monthIndex = date.getMonth();
      const calendar = CalendarData.buildNextYearCalendar(date);

      expect(calendar.year).toEqual(date.getFullYear() + 1);
      expect(calendar.monthIndex).toEqual(monthIndex);
      expect(calendar.month).toEqual(monthIndex + 1);
    });
  });

  describe("buildCalendarTable", () => {
    it("returns table data for table method", () => {
      const date = new Date("2020-03-15");
      const table = CalendarData.buildCalendarTable(date);
      expect(table.length).toEqual(6);

      table.forEach(row => {
        expect(row.length).toEqual(weeks.length);

        row.forEach(cell => {
          expect(cell instanceof Date).toEqual(true);
        });
      });
    });
  });
});
