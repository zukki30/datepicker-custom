export const weeks = ["sun", "mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const MAX_MONTH = 12;

export class Calendar {
  constructor(
    // 対象日
    public readonly date: Date,
    // 表示する前の月
    public readonly monthsAgo: number = 2,
    // 週の始まり
    public readonly weekStart: number = 0
  ) {}

  get showMonth(): number {
    return this.date.getMonth() + 1;
  }

  get title(): string {
    return this.date.getFullYear() + "年" + this.showMonth + "月";
  }

  get prevCalendar(): PrevCalendar {
    const prevMonthsAgo = this.monthsAgo + 1;
    return PrevCalendar.build(
      this.date.getFullYear(),
      this.date.getMonth() - prevMonthsAgo,
      this.showMonth - prevMonthsAgo
    );
  }

  get nextCalendar(): NextCalendar {
    return NextCalendar.build(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      this.showMonth + 1
    );
  }
}

export class PrevCalendar {
  constructor(
    public readonly year: number,
    public readonly month: number,
    public readonly showMonth: number
  ) {}

  public static build(
    year: number,
    month: number,
    showMonth: number
  ): PrevCalendar {
    if (0 > month) {
      return new PrevCalendar(
        year - 1,
        MAX_MONTH + month,
        MAX_MONTH + showMonth
      );
    }

    return new PrevCalendar(year, month, showMonth);
  }
}

export class NextCalendar {
  constructor(
    public readonly year: number,
    public readonly month: number,
    public readonly showMonth: number
  ) {}

  public static build(
    year: number,
    month: number,
    showMonth: number
  ): NextCalendar {
    if (month >= MAX_MONTH) {
      return new NextCalendar(year + 1, 0, 1);
    }

    return new NextCalendar(year, month, showMonth);
  }
}
