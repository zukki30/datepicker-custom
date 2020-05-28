import { CalendarData } from "@/components/date-picker/CalendarData";

export const INPUT_HEIGHT = 35;
export const POPUP_WIDTH = 700;
export const POPUP_HEIGHT = 335;
export const INPUT_POPUP_DISTANCE = 10;

export enum InputTextAlign {
  Left = "left",
  Center = "center"
}

export enum PopupAlign {
  Left = "left",
  Center = "center",
  Right = "right"
}

export class DatePickerData {
  constructor(
    public readonly calendars: CalendarData[],
    public readonly previousMonthCalendar: CalendarData,
    public readonly nextMonthCalendar: CalendarData,
    public readonly previousYearCalendar: CalendarData,
    public readonly nextYearCalendar: CalendarData
  ) {}

  public static build(date: Date, monthsAgo: number = 3): DatePickerData {
    return new DatePickerData(
      buildMonthsAgoCalendar(date, monthsAgo),
      CalendarData.buildPreviousMonthCalendar(date, monthsAgo),
      CalendarData.buildNextMonthCalendar(date, 1),
      CalendarData.buildPreviousYearCalendar(date),
      CalendarData.buildNextYearCalendar(date)
    );
  }
}

/**
 * monthsAgo分のCalendarを生成する
 */
function buildMonthsAgoCalendar(date: Date, monthsAgo: number): CalendarData[] {
  const calendars: CalendarData[] = [];

  for (let i = 0; i < monthsAgo; i++) {
    const index = monthsAgo - 1 - i;
    calendars.push(CalendarData.buildPreviousMonthCalendar(date, index));
  }

  return calendars;
}
