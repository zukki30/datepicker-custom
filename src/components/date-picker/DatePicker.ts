import { Calendar, DateRange } from "@/components/calendar/Calendar";

export enum DateRangeInput {
  Start = "startDatePicker",
  End = "endDatePicker"
}

export enum PopupAlign {
  Left = "left",
  Center = "center",
  Right = "right"
}

export interface DirectSelect {
  label: string;
  name: string;
  dateRange: DateRange;
}

export class DatePicker {
  constructor(
    // 対象日
    public readonly date: Date,
    // 表示する前の月
    public readonly monthsAgo: number = 3
  ) {}

  get calendars(): Calendar[] {
    const calendars: Calendar[] = [];

    for (let i = 0; i < this.monthsAgo; i++) {
      const index = this.monthsAgo - 1 - i;
      calendars.push(Calendar.previousCalendarBuild(this.date, index));
    }

    return calendars;
  }

  get previousCalendar(): Calendar {
    return Calendar.previousCalendarBuild(this.date, this.monthsAgo);
  }

  get nextCalendar(): Calendar {
    return Calendar.nextCalendarBuild(this.date, 1);
  }

  get oneYearAgoCalendar(): Calendar {
    return Calendar.oneYearAgoCalendarBuild(this.date);
  }

  get oneYearLaterCalendar(): Calendar {
    return Calendar.oneYearLaterCalendarBuild(this.date);
  }

  public static rebuild(calendar: Calendar): DatePicker {
    const date = new Date(calendar.year, calendar.monthIndex);
    return new DatePicker(date);
  }
}

/**
 * Date配列をフォーマットし返す
 */
export function dateFormat(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dateCount = date.getDate();

  return year + "年" + month + "月" + dateCount + "日";
}
