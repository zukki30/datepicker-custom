import {
  Calendar,
  PreviousCalendar,
  NextCalendar
} from "@/components/calendar/Calendar";

export class DataPicker {
  constructor(
    // 対象日
    public readonly date: Date,
    // 表示する前の月
    public readonly monthsAgo: number = 2
  ) {}

  get prevCalendar(): PreviousCalendar {
    const showMonth = this.date.getMonth() + 1;
    const prevMonthsAgo = this.monthsAgo + 1;
    return PreviousCalendar.build(
      this.date.getFullYear(),
      this.date.getMonth() - prevMonthsAgo,
      showMonth - prevMonthsAgo
    );
  }

  get nextCalendar(): NextCalendar {
    const showMonth = this.date.getMonth() + 1;
    return NextCalendar.build(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      showMonth + 1
    );
  }
}
