import { i18n } from "@/i18n";

export const weeks: string[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];
const MAX_MONTH = 12;

const MAX_TABLE_ROW = 6;
const MAX_TABLE_CELL = MAX_TABLE_ROW * weeks.length;

export type Table = Date[][];

export class Calendar {
  constructor(
    // 対象日
    public readonly date: Date,
    // 週の始まり
    public readonly startWeek: number = 0
  ) {}

  get year(): number {
    return this.date.getFullYear();
  }

  get month(): number {
    return this.date.getMonth() + 1;
  }

  get title(): string {
    return this.year + "年" + this.month + "月";
  }

  get orderWeeks(): string[] {
    if (this.startWeek === 0) {
      return weeks;
    }

    const weekMap: string[] = [];
    weeks.forEach((week: string, i: number) => {
      let order: number = i - this.startWeek;
      order = 0 > order ? weeks.length + order : order;

      weekMap.splice(order, 0, week);
    });

    return weekMap;
  }

  get weekTexts(): string[] {
    return this.orderWeeks.map(
      week => i18n.t("util.dateUtil." + week) as string
    );
  }

  get calendarDates(): Date[] {
    // 月の初め日を取得
    const startDate = new Date(this.year, this.date.getMonth(), 1);
    // 初めの日の曜日を取得
    const startDayOfTheWeek = startDate.getDay();
    // 月の最後の日を取得
    const endDate = new Date(this.year, this.month, 0);
    // 月の末日
    const endDay = endDate.getDate();
    // 1日より前の日付を埋める日を取得
    const previousMonthDates = getEmptyCellsWithPreviousMonth(
      this.year,
      this.date.getMonth(),
      startDayOfTheWeek
    );
    const dates: Date[] = previousMonthDates;

    for (let i = 0; i < endDay; i++) {
      const date = new Date(this.year, this.month - 1, i + 1);
      dates.push(date);
    }

    // 末日より後の空セルを埋める日を取得
    const nextMonthDates = getEmptyCellsWithNextMonth(
      this.year,
      this.date.getMonth(),
      MAX_TABLE_CELL - dates.length
    );

    const result: Date[] = dates.concat(nextMonthDates);
    return result;
  }

  get table(): Table {
    return splitDatas(this.calendarDates, weeks.length);
  }
}

export class PreviousCalendar {
  constructor(
    public readonly year: number,
    public readonly monthIndex: number,
    public readonly month: number
  ) {}

  public static build(
    year: number,
    monthIndex: number,
    month: number
  ): PreviousCalendar {
    if (0 > month) {
      return new PreviousCalendar(
        year - 1,
        MAX_MONTH + monthIndex,
        MAX_MONTH + month
      );
    }

    return new PreviousCalendar(year, monthIndex, month);
  }
}

export class NextCalendar {
  constructor(
    public readonly year: number,
    public readonly monthIndex: number,
    public readonly month: number
  ) {}

  public static build(
    year: number,
    monthIndex: number,
    month: number
  ): NextCalendar {
    if (monthIndex >= MAX_MONTH) {
      return new NextCalendar(year + 1, 0, 1);
    }

    return new NextCalendar(year, monthIndex, month);
  }
}

/**
 * 1日より前の空のセルを埋めるため前の月から日付を取得する;
 */
function getEmptyCellsWithPreviousMonth(
  year: number,
  monthIndex: number,
  startDayOfTheWeek: number
): Date[] {
  const previousMonthIndex = monthIndex - 1;
  // 前月の最後の日の情報
  const prevMonthEndDate = new Date(year, previousMonthIndex, 0);
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
 * 末日より後の空のセルを埋めるため次の月から日付を取得する;
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
function splitDatas(dates: Date[], splitNumber: number): Table {
  return dates.reduce(
    (acc, value, i) =>
      i % splitNumber ? acc : [...acc, dates.slice(i, i + splitNumber)],
    [] as Table
  );
}
