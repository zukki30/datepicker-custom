import { DisabledDateChecker, Shortcut } from "element-ui/types/date-picker";

export function disabledDateForDatePicker(): DisabledDateChecker {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const twoYearsBefore = new Date();
  twoYearsBefore.setHours(0, 0, 0, 0);
  twoYearsBefore.setFullYear(twoYearsBefore.getFullYear() - 2);

  return (date: Date) => {
    return date > today || date < twoYearsBefore;
  };
}

/**
 * ボリュームゾーンのための、disabledDate
 * 2018/09/01以前は集計開始前なので、選択出来ないようにする
 */
export function volumeZoneDisabledDateForDatePicker(): DisabledDateChecker {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDay = new Date(2018, 8, 1);

  const twoYearsBefore = new Date();
  twoYearsBefore.setHours(0, 0, 0, 0);
  twoYearsBefore.setFullYear(twoYearsBefore.getFullYear() - 2);

  return (date: Date) => {
    return date > today || date < startDay || date < twoYearsBefore;
  };
}

export function dateRangePickerShortcuts(today: Date): Shortcut[] {
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today.getTime());
  yesterday.setDate(yesterday.getDate() - 1);

  const currentMonday = new Date(today.getTime());
  currentMonday.setDate(
    currentMonday.getDate() - ((currentMonday.getDay() + 6) % 7)
  );

  const lastMonday = new Date(currentMonday.getTime());
  lastMonday.setDate(lastMonday.getDate() - 7);

  const lastSunday = new Date(lastMonday.getTime());
  lastSunday.setDate(lastSunday.getDate() + 6);

  const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  return [
    {
      text: "昨日",
      onClick(picker) {
        picker.$emit("pick", [yesterday, yesterday]);
      }
    },
    {
      text: "本日",
      onClick(picker) {
        picker.$emit("pick", [today, today]);
      }
    },
    {
      text: "先週",
      onClick(picker) {
        picker.$emit("pick", [lastMonday, lastSunday]);
      }
    },
    {
      text: "今週",
      onClick(picker) {
        picker.$emit("pick", [currentMonday, today]);
      }
    },
    {
      text: "先月",
      onClick(picker) {
        picker.$emit("pick", [lastMonthStart, lastMonthEnd]);
      }
    },
    {
      text: "今月",
      onClick(picker) {
        picker.$emit("pick", [currentMonthStart, today]);
      }
    }
  ];
}
