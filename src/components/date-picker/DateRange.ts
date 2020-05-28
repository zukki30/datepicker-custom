import { getDeepCopiedMidnightDateRange } from "@/util/date-util";

export interface DateRange {
  min: Date;
  max: Date;
}

/**
 * Date配列をDateRangeで返す
 */
export function changeDateRange(dates: Date[]): DateRange {
  const min = dates[1] > dates[0] ? dates[0] : dates[1];
  const max = dates[1] > dates[0] ? dates[1] : dates[0];

  return getDeepCopiedMidnightDateRange({
    min,
    max
  });
}
