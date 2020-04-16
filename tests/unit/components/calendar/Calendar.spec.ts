import { i18n, AvailableLanguages } from "@/i18n";
import {
  Calendar,
  MAX_MONTH,
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

    it("returns table data for table method", () => {
      const table = calendar.table;
      expect(table.length).toEqual(6);

      table.forEach(row => {
        expect(row.length).toEqual(calendar.weekTexts.length);
      });
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

  describe("previousCalendarBuild", () => {
    it("return previous month model from date", () => {
      const date = new Date("2020-03-15");
      const previous = 1;
      const monthIndex = date.getMonth() - previous;
      const calendar = Calendar.previousCalendarBuild(date, previous);

      expect(calendar.year).toEqual(date.getFullYear());
      expect(calendar.monthIndex).toEqual(monthIndex);
      expect(calendar.month).toEqual(monthIndex + 1);
    });

    it("return previous month model from date when previous year", () => {
      const date = new Date("2020-01-01");
      const previous = 1;
      const monthIndex = date.getMonth() - previous;
      const calendar = Calendar.previousCalendarBuild(date, previous);

      expect(calendar.year).toEqual(date.getFullYear() - 1);
      expect(calendar.monthIndex).toEqual(MAX_MONTH + monthIndex);
      expect(calendar.month).toEqual(MAX_MONTH + monthIndex + 1);
    });
  });

  describe("nextCalendarBuild", () => {
    it("return next month model from date", () => {
      const date = new Date("2020-03-15");
      const next = 1;
      const monthIndex = date.getMonth() + next;
      const calendar = Calendar.nextCalendarBuild(date, next);

      expect(calendar.year).toEqual(date.getFullYear());
      expect(calendar.monthIndex).toEqual(monthIndex);
      expect(calendar.month).toEqual(monthIndex + 1);
    });

    it("return next month model from date when next year", () => {
      const date = new Date("2020-12-12");
      const next = 1;
      const calendar = Calendar.nextCalendarBuild(date, next);

      expect(calendar.year).toEqual(date.getFullYear() + 1);
      expect(calendar.monthIndex).toEqual(0);
      expect(calendar.month).toEqual(1);
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
