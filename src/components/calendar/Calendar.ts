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
const MAX_WEEK = 7;

const TABLE_ROW_LENGHT = 6;

export class Calendar {
  constructor(
    // 対象日
    public readonly date: Date,
    // 週の始まり
    public readonly weekStart: number = 0
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
    if (this.weekStart === 0) {
      return weeks;
    }

    const weekMap: string[] = [];
    weeks.forEach((week: string, i: number) => {
      let order: number = i - this.weekStart;
      order = 0 > order ? MAX_WEEK + order : order;

      weekMap.splice(order, 0, week);
    });

    return weekMap;
  }

  get weekTexts(): string[] {
    return this.orderWeeks.map(
      week => i18n.t("util.dateUtil." + week) as string
    );
  }
}

export class PrevCalendar {
  constructor(
    public readonly year: number,
    public readonly monthData: number,
    public readonly month: number
  ) {}

  public static build(
    year: number,
    monthData: number,
    month: number
  ): PrevCalendar {
    if (0 > month) {
      return new PrevCalendar(
        year - 1,
        MAX_MONTH + monthData,
        MAX_MONTH + month
      );
    }

    return new PrevCalendar(year, monthData, month);
  }
}

export class NextCalendar {
  constructor(
    public readonly year: number,
    public readonly monthData: number,
    public readonly month: number
  ) {}

  public static build(
    year: number,
    monthData: number,
    month: number
  ): NextCalendar {
    if (monthData >= MAX_MONTH) {
      return new NextCalendar(year + 1, 0, 1);
    }

    return new NextCalendar(year, monthData, month);
  }
}

export class Day {
  constructor(public readonly date: Date, public readonly number: number) {}
}
