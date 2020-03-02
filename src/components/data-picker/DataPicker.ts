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
    return PreviousCalendar.build(this.date, this.monthsAgo);
  }

  get nextCalendar(): NextCalendar {
    return NextCalendar.build(this.date, 1);
  }
}
