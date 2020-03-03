import { Calendar } from "@/components/calendar/Calendar";

export class DataPicker {
  constructor(
    // 対象日
    public readonly date: Date,
    // 表示する前の月
    public readonly monthsAgo: number = 3
  ) {}

  get calendars(): Calendar[] {
    const calendars: Calendar[] = [];

    for (let i = 0; i < this.monthsAgo; i++) {
      calendars.push(Calendar.previousCalendarBuild(this.date, i));
    }

    return calendars;
  }

  get prevCalendar(): Calendar {
    return Calendar.previousCalendarBuild(this.date, this.monthsAgo);
  }

  get nextCalendar(): Calendar {
    return Calendar.nextCalendarBuild(this.date, 1);
  }
}
