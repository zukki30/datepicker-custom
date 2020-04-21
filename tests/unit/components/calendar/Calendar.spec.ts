import { i18n, AvailableLanguages } from "@/i18n";
import {
  Calendar,
  MAX_MONTH,
  weeks,
  changeDateRange
} from "@/components/calendar/Calendar";

describe("Calendar", () => {
  describe("getters", () => {
    const date = new Date("2020-01-01");
    const month = date.getMonth() + 1;
    const calendar = new Calendar(date.getFullYear(), date.getMonth(), month);

    it("returns 'YEAR年MONTH月' for title method", () => {
      expect(calendar.title).toEqual(date.getFullYear() + "年" + month + "月");
    });

    it("returns Japanese week data for weekTexts method", () => {
      i18n.locale = AvailableLanguages.ja;
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
      const calendar = Calendar.build(date);

      expect(calendar.year).toEqual(date.getFullYear());
      expect(calendar.monthIndex).toEqual(monthIndex);
      expect(calendar.month).toEqual(monthIndex + 1);
    });
  });

  describe("buildPreviousCalendar", () => {
    it("return previous month model from date", () => {
      const date = new Date("2020-03-15");
      const previous = 1;
      const monthIndex = date.getMonth() - previous;
      const calendar = Calendar.buildPreviousCalendar(date, previous);

      expect(calendar.year).toEqual(date.getFullYear());
      expect(calendar.monthIndex).toEqual(monthIndex);
      expect(calendar.month).toEqual(monthIndex + 1);
    });

    it("return previous month model from date when previous year", () => {
      const date = new Date("2020-01-01");
      const previous = 1;
      const monthIndex = date.getMonth() - previous;
      const calendar = Calendar.buildPreviousCalendar(date, previous);

      expect(calendar.year).toEqual(date.getFullYear() - 1);
      expect(calendar.monthIndex).toEqual(MAX_MONTH + monthIndex);
      expect(calendar.month).toEqual(MAX_MONTH + monthIndex + 1);
    });
  });

  describe("buildNextCalendar", () => {
    it("return next month model from date", () => {
      const date = new Date("2020-03-15");
      const next = 1;
      const monthIndex = date.getMonth() + next;
      const calendar = Calendar.buildNextCalendar(date, next);

      expect(calendar.year).toEqual(date.getFullYear());
      expect(calendar.monthIndex).toEqual(monthIndex);
      expect(calendar.month).toEqual(monthIndex + 1);
    });

    it("return next month model from date when next year", () => {
      const date = new Date("2020-12-12");
      const next = 1;
      const calendar = Calendar.buildNextCalendar(date, next);

      expect(calendar.year).toEqual(date.getFullYear() + 1);
      expect(calendar.monthIndex).toEqual(0);
      expect(calendar.month).toEqual(1);
    });
  });

  describe("buildOneYearAgoCalendar", () => {
    it("return one year ago model from date", () => {
      const date = new Date("2020-03-15");
      const monthIndex = date.getMonth();
      const calendar = Calendar.buildOneYearAgoCalendar(date);

      expect(calendar.year).toEqual(date.getFullYear() - 1);
      expect(calendar.monthIndex).toEqual(monthIndex);
      expect(calendar.month).toEqual(monthIndex + 1);
    });
  });

  describe("buildOneYearLaterCalendar", () => {
    it("return one year later model from date", () => {
      const date = new Date("2020-03-15");
      const monthIndex = date.getMonth();
      const calendar = Calendar.buildOneYearLaterCalendar(date);

      expect(calendar.year).toEqual(date.getFullYear() + 1);
      expect(calendar.monthIndex).toEqual(monthIndex);
      expect(calendar.month).toEqual(monthIndex + 1);
    });
  });

  describe("buildCalendarTable", () => {
    it("return one year later model from date", () => {
      const date = new Date("2020-03-15");
      const monthIndex = date.getMonth();
      const calendar = Calendar.buildOneYearLaterCalendar(date);

      expect(calendar.year).toEqual(date.getFullYear() + 1);
      expect(calendar.monthIndex).toEqual(monthIndex);
      expect(calendar.month).toEqual(monthIndex + 1);
    });

    it("returns table data for table method", () => {
      const date = new Date("2020-03-15");
      const table = Calendar.buildCalendarTable(date);
      expect(table.length).toEqual(6);

      table.forEach(row => {
        expect(row.length).toEqual(weeks.length);

        row.forEach(cell => {
          expect(cell instanceof Date).toEqual(true);
        });
      });
    });
  });

  describe("changeDateRange", () => {
    it("return DateRange interface from date array", () => {
      const dates: Date[] = [new Date("2020-01-12"), new Date("2020-12-12")];
      const dateRange = changeDateRange(dates);

      expect(dateRange.min).toEqual(dates[0]);
      expect(dateRange.max).toEqual(dates[1]);
    });

    it("return DateRange interface from reversal from date array", () => {
      const dates: Date[] = [new Date("2020-12-01"), new Date("2020-01-12")];
      const dateRange = changeDateRange(dates);

      expect(dateRange.min).toEqual(dates[1]);
      expect(dateRange.max).toEqual(dates[0]);
    });
  });
});
