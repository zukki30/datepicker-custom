import { i18n } from "@/i18n";
import { DateFormat, formatDate } from "@/util/date-util";

export const weeks: string[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];

export const MAX_MONTH = 12;
const MAX_TABLE_ROW = 6;
const MAX_TABLE_CELL = MAX_TABLE_ROW * weeks.length;

export type CalendarTable = Date[][];

export interface Week {
  id: string;
  text: string;
}

export class CalendarData {
  constructor(
    // 対象年
    public readonly year: number,
    // 対象月の数字
    public readonly monthIndex: number,
    // 対象月
    public readonly month: number
  ) {}

  get title(): string {
    const date = new Date(this.year, this.month, 0);
    return formatDate(DateFormat.yyyy年MMM月, date);
  }

  get weekTexts(): Week[] {
    return weeks.map(week => {
      return {
        id: week,
        text: i18n.t("util.dateUtil." + week) as string
      };
    });
  }

  public static build(date: Date): CalendarData {
    return new CalendarData(
      date.getFullYear(),
      date.getMonth(),
      date.getMonth() + 1
    );
  }

  public static buildPreviousMonthCalendar(
    date: Date,
    previous: number
  ): CalendarData {
    const year = date.getFullYear();
    const monthIndex = date.getMonth() - previous;
    const month = monthIndex + 1;

    if (0 > monthIndex) {
      return new CalendarData(
        year - 1,
        MAX_MONTH + monthIndex,
        MAX_MONTH + month
      );
    }

    return new CalendarData(year, monthIndex, month);
  }

  public static buildNextMonthCalendar(date: Date, next: number): CalendarData {
    const year = date.getFullYear();
    const monthIndex = date.getMonth() + next;
    const month = monthIndex + 1;

    if (monthIndex >= MAX_MONTH) {
      return new CalendarData(year + 1, 0, 1);
    }

    return new CalendarData(year, monthIndex, month);
  }

  public static buildPreviousYearCalendar(date: Date): CalendarData {
    const year = date.getFullYear() - 1;
    const monthIndex = date.getMonth();
    const month = monthIndex + 1;

    return new CalendarData(year, monthIndex, month);
  }

  public static buildNextYearCalendar(date: Date): CalendarData {
    const year = date.getFullYear() + 1;
    const monthIndex = date.getMonth();
    const month = monthIndex + 1;

    return new CalendarData(year, monthIndex, month);
  }

  public static buildCalendarTable(date: Date): CalendarTable {
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const month = monthIndex + 1;

    const startDate = new Date(year, monthIndex, 1);
    const startDayOfTheWeek = startDate.getDay();
    const endDate = new Date(year, month, 0);
    const endDay = endDate.getDate();
    const previousMonthDates = getEmptyCellsWithPreviousMonth(
      year,
      monthIndex,
      startDayOfTheWeek
    );
    const dates: Date[] = previousMonthDates;

    for (let i = 0; i < endDay; i++) {
      const date = new Date(year, monthIndex, i + 1);
      dates.push(date);
    }

    // 末日より後の空セルを埋める日を取得
    const nextMonthDates = getEmptyCellsWithNextMonth(
      year,
      monthIndex,
      MAX_TABLE_CELL - dates.length
    );

    const result: Date[] = dates.concat(nextMonthDates);

    return splitDatas(result, weeks.length);
  }
}

/**
 * 1日より前の空のセルを埋めるため前の月から日付を取得する
 */
function getEmptyCellsWithPreviousMonth(
  year: number,
  monthIndex: number,
  startDayOfTheWeek: number
): Date[] {
  const previousMonthIndex = monthIndex - 1;
  // 前月の最後の日の情報
  const prevMonthEndDate = new Date(year, monthIndex, 0);
  // 前月の末日
  const prevMonthendDay = prevMonthEndDate.getDate();

  const dates: Date[] = [];

  for (let i = 0; i < startDayOfTheWeek; i++) {
    const date = new Date(year, previousMonthIndex, prevMonthendDay - i);
    dates.unshift(date);
  }

  return dates;
}

/**
 * 末日より後の空のセルを埋めるため次の月から日付を取得する
 */
function getEmptyCellsWithNextMonth(
  year: number,
  monthIndex: number,
  maxDate: number
): Date[] {
  const dates: Date[] = [];

  for (let i = 0; i < maxDate; i++) {
    const date = new Date(year, monthIndex + 1, i + 1);
    dates.push(date);
  }

  return dates;
}

/**
 * Date配列を指定の数で分割する
 */
function splitDatas(dates: Date[], splitNumber: number): CalendarTable {
  return dates.reduce(
    (acc, value, i) =>
      i % splitNumber ? acc : [...acc, dates.slice(i, i + splitNumber)],
    [] as CalendarTable
  );
}
