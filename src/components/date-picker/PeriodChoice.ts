import { DateRange } from "@/components/date-picker/DateRange.ts";

export interface PeriodChoice {
  name: string;
  dateRange: DateRange;
}

export enum PeriodChoiceName {
  Blank = "",
  Yesterday = "yesterday",
  Today = "today",
  LastWeek = "lastWeek",
  ThisWeek = "thisWeek",
  LastMonth = "lastMonth",
  ThisMonth = "thisMonth"
}
