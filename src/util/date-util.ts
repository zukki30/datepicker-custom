import { i18n } from "@/i18n";
import { AvailableLanguages } from "@/i18n";
import SelectOption from "@/components/SelectOption";

// 秒とどの単位の秒を使っているかわかりやすくするため
export type Msec = number;
export type Sec = number;
export type Usec = number;

export const TIMEZONE_OFFSET: number = new Date().getTimezoneOffset();
export const SECONDS_IN_MINUTE: Sec = 60;
export const MINUTES_IN_HOUR: number = 60;
export const HOURS_IN_DAY: number = 24;
export const SECONDS_IN_DAY: Sec =
  SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY;

export const HOUR_UNSELECTED: number = -1;

export enum TIME_DIFF_PARAM_TYPE {
  TIME_UNIT = 1, // %(TIME)%(UNIT)経過、前、などで用いる
  YEAR_MONTH = 2 // %(YEAR)年%(MONTH)ヶ月経過などで用いる
}
export interface TimeDiffTxParams {
  type: TIME_DIFF_PARAM_TYPE;
  time: number;
  unitTx: string;
  year: number;
  month: number;
}

// MessageBlock.vueの@Prop({ type: String, default: HHcmm })に
// DateFormat.HHcmmを渡すとstorybookでエラーになるので、別途 切り出すす
// なぜDateFormat.HHcmmだとエラーになるかは、まだ理由がわかっていない
export const HHcmm: string = "%(HH):%(mm)";

// javascriptに日付フォーマットが定義されていないため、Javaのフォーマットを流用する
export namespace DateFormat {
  export const HHcmm_TZONEDIFF: string = "%(HH):%(mm)%(TZONE_STR_IFDIFF)";
  export const HHcmm: string = "%(HH):%(mm)";
  export const Md: string = "%(M)/%(d)";
  export const yyyysMMsdd: string = "%(yyyy)/%(MM)/%(dd)";
  export const yyyysMMsdd_HHcmm: string = "%(yyyy)/%(MM)/%(dd) %(HH):%(mm)";
  export const yyyysMsd: string = "%(yyyy)/%(M)/%(d)";

  // 以下は翻訳のKeyになるのでスペースはカット
  export const M月d日_E_HH時mm分_TZONEDIFF: string =
    "%(E),%(MM)-%(dd)%(HH):%(mm)%(TZONE_STR_IFDIFF)";
  export const M月d日_E_HH時mm分: string = "%(E),%(MM)-%(dd)%(HH):%(mm)";
  export const yyyy年M月d日E: string = "%(E),%(M)-%(d)-%(yyyy)";
  export const yyyy年MMM月: string = "%(MMM)-%(yyyy)";
  export const MMM月: string = "%(MMM)";
  export const yyyy年M月d日E_HH時mm分_TZONEDIFF: string =
    "%(E),%(M)-%(d)-%(yyyy)%(HH)-%(mm)%(TZONE_STR_IFDIFF)"; // %(HH):%(mm)と:でいいがKeyがかぶるので-にする
  export const yyyy年M月d日E_HHcmm_TZONEDIFF: string =
    "%(E),%(M)-%(d)-%(yyyy)%(HH):%(mm)%(TZONE_STR_IFDIFF)";
}

const monthMap: { [index: number]: string } = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec"
};
const dayMap: { [index: number]: string } = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat"
};

export function formatDate(
  format: string,
  dtSrcP: Date,
  timezoneOffsetP: number = TIMEZONE_OFFSET
): string {
  if (dtSrcP.getTime() === 0) {
    return "";
  }
  let dtSrc = dtSrcP;
  let timezoneOffset = timezoneOffsetP;

  // タイムゾーンがnullやundefinedで渡ってくる可能性があるのでチェックしておく
  if (typeof timezoneOffset !== "number") {
    timezoneOffset = TIMEZONE_OFFSET;
  }

  // タイムゾーン表示文字列を作成
  const timeZoneStr = getTimezoneStr(timezoneOffset);

  // タイムゾーンが異なる場合にだけ表示する
  let timeZoneStrIfDiff = "";

  // タイムゾーンが異なる場合、指定されたタイムゾーンで表示する
  if (timezoneOffset !== TIMEZONE_OFFSET) {
    // デフォルトのタイムゾーンを足す -> getYear,Month,etcの値がUTCになる
    // 指定されたタイムゾーンを引く -> getYear,Month,etcの値が指定されたタイムゾーンの値になる
    // ※タイムゾーンは負の秒値(例：+09:00の場合、-540となる)
    const timeZoneDiff = TIMEZONE_OFFSET - timezoneOffset;
    const adjustTimeMsec = dtSrc.getTime() + timeZoneDiff * 60 * 1000;
    dtSrc = new Date(adjustTimeMsec);

    // タイムゾーンが異なる場合のみ表示する文字列
    timeZoneStrIfDiff = timeZoneStr;
  }

  const year: number = dtSrc.getFullYear();
  const month: number = dtSrc.getMonth() + 1;
  const date: number = dtSrc.getDate();
  const hour: number = dtSrc.getHours();
  const minute: number = dtSrc.getMinutes();
  const day: number = dtSrc.getDay();
  const shortDayJp: string = dayMap[day];
  const shortDayTx: string = i18n.t("util.dateUtil." + shortDayJp) as string;

  const yy: string = "" + (dtSrc.getFullYear() % 100);
  const yyyy: string = "" + dtSrc.getFullYear();
  const M: string = "" + (dtSrc.getMonth() + 1);
  const MM: string = ("00" + (dtSrc.getMonth() + 1)).slice(-2);
  const d: string = "" + dtSrc.getDate();
  const dd: string = ("00" + dtSrc.getDate()).slice(-2);
  const h: string = "" + (dtSrc.getHours() % 12);
  const hh: string = ("00" + (dtSrc.getHours() % 12)).slice(-2);
  const H: string = "" + dtSrc.getHours();
  const HH: string = ("00" + dtSrc.getHours()).slice(-2);
  const m: string = "" + dtSrc.getMinutes();
  const mm: string = ("00" + dtSrc.getMinutes()).slice(-2);
  const s: string = "" + dtSrc.getSeconds();
  const ss: string = ("00" + dtSrc.getSeconds()).slice(-2);

  const E: string = shortDayTx;

  // Jan = 1月
  let MMM = monthMap[month];
  MMM = i18n.t("util.dateUtil." + MMM) as string;

  const params: { [index: string]: number | string } = {
    YEAR: year,
    MONTH: month,
    DATE: date,
    HOUR: hour,
    MINUTE: minute,
    SHORT_DAY_TX: shortDayTx,
    TZONE_STR_IFDIFF: timeZoneStrIfDiff,
    yy,
    yyyy,
    M,
    MM,
    MMM,
    d,
    dd,
    h,
    hh,
    H,
    HH,
    m,
    mm,
    s,
    ss,
    E
  };

  let retTemplate = format;
  if (isTranslationRequired(format)) {
    retTemplate = i18n.t("util.dateUtil." + format) as string;
  }

  const keys: string[] = Object.keys(params);
  keys.forEach(key => {
    retTemplate = retTemplate.replace("%(" + key + ")", "" + params[key]);
  });

  return retTemplate;
}

// 経過テキストを取得
export function getElapsedTimeTx(startSec: number, endSec: number): string {
  const params = getTimeDiffTxParams(
    startSec,
    endSec,
    TIMEZONE_OFFSET,
    i18n.locale as AvailableLanguages,
    true
  );
  if (params.type === TIME_DIFF_PARAM_TYPE.TIME_UNIT) {
    return i18n.t("util.dateUtil.TIME_UNIT_elapsed", {
      time: params.time,
      unit: params.unitTx
    }) as string;
  } else {
    const year = i18n.tc("util.dateUtil.year", params.year, {
      year: params.year
    });
    const month = i18n.tc("util.dateUtil.month", params.month, {
      month: params.month
    });
    return i18n.t("util.dateUtil.YEAR_MONTH_elapsed", {
      year,
      month
    }) as string;
  }
}

// 履歴用経過テキストを取得
export function getElapsedTxFromNow(targetMsec: number): string {
  const params = getTimeDiffTxParams(
    msecToSec(targetMsec),
    msecToSec(Date.now())
  );
  if (params.type === TIME_DIFF_PARAM_TYPE.TIME_UNIT) {
    return i18n.t("util.dateUtil.TIME_UNIT_ago", {
      time: params.time,
      unit: params.unitTx
    }) as string;
  } else {
    const year = i18n.tc("util.dateUtil.year", params.year, {
      year: params.year
    });
    const month = i18n.tc("util.dateUtil.month", params.month, {
      month: params.month
    });
    return i18n.t("util.dateUtil.YEAR_MONTH_ago", {
      year,
      month
    }) as string;
  }
}

// 経過時間と単位を取得
export function getTimeDiffTxParams(
  startSec: number,
  endSec: number,
  timezoneOffset: number = TIMEZONE_OFFSET,
  lang: AvailableLanguages = i18n.locale as AvailableLanguages,
  isLong: boolean = false
): TimeDiffTxParams {
  const minuteSec = 60;
  const hourSec = 60 * minuteSec;
  const daySec = 24 * hourSec;
  const weekSec = 7 * daySec;

  let time: number = 0;
  let unitTx: string = "";

  const elapsedSec = endSec - startSec;

  // 1週間未満
  if (elapsedSec < weekSec) {
    if (elapsedSec < minuteSec) {
      time = elapsedSec;
      unitTx = (isLong
        ? i18n.tc("util.dateUtil.second", time, lang)
        : i18n.t("util.dateUtil.s")) as string;
    } else if (elapsedSec < hourSec) {
      time = Math.floor(elapsedSec / minuteSec);
      unitTx = (isLong
        ? i18n.tc("util.dateUtil.minute", time, lang)
        : i18n.t("util.dateUtil.min")) as string;
    } else if (elapsedSec < daySec) {
      time = Math.floor(elapsedSec / hourSec);
      unitTx = (isLong
        ? i18n.tc("util.dateUtil.hour", time, lang)
        : i18n.t("util.dateUtil.h")) as string;
    } else {
      time = Math.floor(elapsedSec / daySec);
      unitTx = (isLong
        ? i18n.tc("util.dateUtil.day", time, lang)
        : i18n.t("util.dateUtil.D")) as string;
    }
    return {
      type: TIME_DIFF_PARAM_TYPE.TIME_UNIT,
      time: time,
      unitTx: unitTx,
      year: -1,
      month: -1
    };
  }
  // 単位が週以上の場合、年月日を取得し、週、ヶ月、年を取得する
  // timezoneを調整する
  const timezoneDiffSec = (TIMEZONE_OFFSET - timezoneOffset) * 60;

  const startDt = new Date((startSec + timezoneDiffSec) * 1000);
  const endDt = new Date((endSec + timezoneDiffSec) * 1000);
  const nextOfEndDt = new Date(endSec * 1000 + 24 * 60 * 60 * 1000);

  const startYear = startDt.getFullYear();
  const startMonth = startDt.getMonth() + 1;
  const startDate = startDt.getDate();

  const endYear = endDt.getFullYear();
  const endMonth = endDt.getMonth() + 1;
  const endDate = endDt.getDate();
  const nextOfEndDate = nextOfEndDt.getDate();

  // 累計経過月数を算出する
  let elapsedTotalMonth = (endYear - startYear) * 12 + (endMonth - startMonth);

  // 月中の終了の日＜月中の開始の日で、かつ終了日＜＞月末の場合、１か月経っていないものとみなす
  // （例：04/25 - 05/02など)（例外：01/29(or 30 or 31) - 02/28は1ヶ月経っているものとみなす)
  if (endDate < startDate && nextOfEndDate !== 1) {
    elapsedTotalMonth = elapsedTotalMonth - 1;
  }

  if (12 <= elapsedTotalMonth) {
    // 1年以上経っている場合
    const elapsedYear = Math.floor(elapsedTotalMonth / 12);
    const elapsedMonth = elapsedTotalMonth % 12;
    if (elapsedMonth === 0) {
      const unitTx = (isLong
        ? i18n.tc("util.dateUtil.year", elapsedYear, lang)
        : i18n.t("util.dateUtil.YR")) as string;
      return {
        type: TIME_DIFF_PARAM_TYPE.TIME_UNIT,
        time: elapsedYear,
        unitTx: unitTx,
        year: -1,
        month: -1
      };
    } else {
      return {
        type: TIME_DIFF_PARAM_TYPE.YEAR_MONTH,
        time: -1,
        unitTx: "",
        year: elapsedYear,
        month: elapsedMonth
      };
    }
  } else {
    // 1年未満の場合
    if (elapsedTotalMonth === 0) {
      // 1ヶ月未満の場合（同月、もしくは翌月の日付が末日以外で開始日未満）
      const elapsedWeek = Math.floor(elapsedSec / weekSec);
      const unitTx = (isLong
        ? i18n.tc("util.dateUtil.week", elapsedWeek, lang)
        : i18n.t("util.dateUtil.WK")) as string;
      return {
        type: TIME_DIFF_PARAM_TYPE.TIME_UNIT,
        time: elapsedWeek,
        unitTx: unitTx,
        year: -1,
        month: -1
      };
    } else {
      // 1ヶ月以上の場合
      const unitTx = (isLong
        ? i18n.tc("util.dateUtil.month", elapsedTotalMonth, lang)
        : i18n.t("util.dateUtil.M")) as string;
      return {
        type: TIME_DIFF_PARAM_TYPE.TIME_UNIT,
        time: elapsedTotalMonth,
        unitTx: unitTx,
        year: -1,
        month: -1
      };
    }
  }
}

function isTranslationRequired(format: string): boolean {
  if (
    format === DateFormat.M月d日_E_HH時mm分_TZONEDIFF ||
    format === DateFormat.M月d日_E_HH時mm分 ||
    format === DateFormat.yyyy年M月d日E ||
    format === DateFormat.yyyy年MMM月 ||
    format === DateFormat.MMM月 ||
    format === DateFormat.yyyy年M月d日E_HH時mm分_TZONEDIFF ||
    format === DateFormat.yyyy年M月d日E_HHcmm_TZONEDIFF
  ) {
    return true;
  }
  return false;
}

function getTimezoneStr(timezoneOffsetMin: number): string {
  const timezoneOffsetHour = -((timezoneOffsetMin / 6) | 0) / 10; // 少数第一位まで表示
  if (timezoneOffsetHour > 0) {
    return "(UTC+" + timezoneOffsetHour + ")";
  }

  if (timezoneOffsetHour === 0) {
    return "(UTC)";
  }

  return "(UTC" + timezoneOffsetHour + ")";
}

// Date-type in JS -> datetime-type in Python
export function postDate(date: Date): string {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

/**
 * 利用期間を単位付きで返す
 */
export function usagePeriod(
  startDate: Date,
  endDate: Date,
  timezoneOffset: number = TIMEZONE_OFFSET
): string {
  // timezoneを調整する
  const timezoneDiffSec = (TIMEZONE_OFFSET - timezoneOffset) * 60;

  const startSec = startDate.getTime() / 1000 + timezoneDiffSec;
  const endSec = endDate.getTime() / 1000 + timezoneDiffSec;

  const startDt = new Date(startSec * 1000);
  const endDt = new Date(endSec * 1000);
  const nextOfEndDt = new Date(endSec * 1000 + 24 * 60 * 60 * 1000);

  const startYear = startDt.getFullYear();
  const startMonth = startDt.getMonth() + 1;
  const startDay = startDt.getDate();

  const endYear = endDt.getFullYear();
  const endMonth = endDt.getMonth() + 1;
  const endDay = endDt.getDate();
  const nextOfEndDay = nextOfEndDt.getDate();

  // 累計経過月数を算出する
  let elapsedTotalMonth = (endYear - startYear) * 12 + (endMonth - startMonth);

  // 月中の終了の日＜月中の開始の日で、かつ終了日＜＞月末の場合、１か月経っていないものとみなす
  // （例：04/25 - 05/02など)（例外：01/29(or 30 or 31) - 02/28は1ヶ月経っているものとみなす)
  if (endDay < startDay && nextOfEndDay !== 1) {
    elapsedTotalMonth = elapsedTotalMonth - 1;
  }

  if (elapsedTotalMonth >= 12) {
    // 1年以上経っている場合
    const elapsedYear = Math.floor(elapsedTotalMonth / 12);
    const elapsedMonth = elapsedTotalMonth % 12;
    if (elapsedMonth === 0) {
      return i18n.tc("util.dateUtil.year", elapsedYear, {
        year: elapsedYear
      }) as string;
    } else {
      const year = i18n.tc("util.dateUtil.year", elapsedYear, {
        year: elapsedYear
      });
      const month = i18n.tc("util.dateUtil.month", elapsedMonth, {
        month: elapsedMonth
      });
      return i18n.t("util.dateUtil.YEAR_MONTH", {
        year,
        month
      }) as string;
    }
  } else {
    // 1年未満の場合
    if (elapsedTotalMonth === 0) {
      // 1ヶ月未満の場合
      const elapsedDay = Math.floor((endSec - startSec) / 60 / 60 / 24);
      // 小数点1位までの数字をセットする
      const elapsedMonth = Math.floor((elapsedDay / 30) * 10) / 10;
      return i18n.tc("util.dateUtil.month", elapsedMonth, {
        month: elapsedMonth
      }) as string;
    } else {
      return i18n.tc("util.dateUtil.month", elapsedTotalMonth, {
        month: elapsedTotalMonth
      }) as string;
    }
  }
}

interface Interval {
  start: Sec;
  end: Sec;
}

/**
 * 日付と、時間帯(時間帯)を受け取ってインターバルを返す。
 *
 * 例えば時間帯として1を受け取ると
 * 与えられた日付における1時から1時59分59秒までのインターバルを返す。
 *
 * @param date 日付
 * @param hour 時間帯
 */
export function getHourlyInterval(date: Date, hour: number): Interval {
  const start: Date = new Date(date.valueOf());
  start.setHours(hour);
  start.setMinutes(0);
  start.setSeconds(0);
  start.setMilliseconds(0);
  const startSec: Sec = msecToSec(start.valueOf());

  return {
    start: startSec,
    end: startSec + SECONDS_IN_MINUTE * MINUTES_IN_HOUR - 1
  };
}

/**
 * 任意の時間帯またはxx時台を選択するためのセレクトボックスの初期値
 * (任意の時間帯を選択した時のvalue)
 */
export const HOURLY_INTERVALS_DEFAULT_VALUE = -1;

/**
 * 任意の時間帯またはxx時台を選択するためのセレクトボックスのオプション
 */
export function hourlyIntervalsSelectOpitions(
  hasAnyTime: boolean = true
): SelectOption[] {
  const options = hasAnyTime
    ? [
        {
          label: i18n.t("util.dateUtil.anyTimeZone") as string,
          value: HOURLY_INTERVALS_DEFAULT_VALUE,
          disabled: false
        }
      ]
    : [];
  for (let i = 0; i < 24; i++) {
    options.push({
      label: i18n.t("util.dateUtil.oclock", { time: i }) as string,
      value: i,
      disabled: false
    });
  }
  return options;
}

export function msecToSec(msec: Msec): Sec {
  return Math.floor(msec / 1000);
}

export function usecToMsec(usec: Usec): Msec {
  return Math.floor(usec / 1000);
}

export function secToMsec(sec: Sec): Msec {
  return Math.floor(sec * 1000);
}

export function msecToUsec(msec: Msec): Usec {
  return Math.floor(msec * 1000);
}

export function translateMonthToString(month: number): string {
  const monthName = monthMap[month];
  return i18n.t("util.dateUtil." + monthName) as string;
}

export function translateMonthAndYearToString(
  month: number,
  year: number
): string {
  const translatedMonth = translateMonthToString(month);
  return i18n.t("util.dateUtil.monthYear", {
    month: translatedMonth,
    year: year
  }) as string;
}

/**
 * 検索条件の初期期間をかえます(30日前から今日まで)
 */
export function getDefaultSearchPeriodDates(): {
  startDate: Date;
  endDate: Date;
} {
  const SEARCH_DEFAULT_PERIOD_DAYS = 30;

  // 選定対象期間の終わり = 現在日付
  const endDate: Date = new Date();
  /**
   * 現在時刻のdateを渡してしまうバグがあったので23:59:59をセットするように修正
   * https://bebit.slack.com/archives/CDUED3657/p1574688265252100?thread_ts=1574676074.239300&cid=CDUED3657
   */
  endDate.setHours(23 /*hours*/, 59 /*min*/, 59 /*sec*/, 999 /*ms*/);

  // 選定対象期間の始め ＝ 終了日 - SEARCH_PERIOD_DAYS日
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - SEARCH_DEFAULT_PERIOD_DAYS);
  startDate.setHours(0 /*hours*/, 0 /*min*/, 0 /*sec*/, 0 /*ms*/);

  return { startDate, endDate };
}

/**
 * お気に入り検索の条件にセットされる期間(7日前から今日まで)
 */
export function getFavoriteSearchPeriodDates(): {
  startDate: Date;
  endDate: Date;
} {
  const endDate: Date = new Date();
  /**
   * 現在時刻のdateを渡してしまうバグがあったので23:59:59をセットするように修正
   * https://bebit.slack.com/archives/CDUED3657/p1574688265252100?thread_ts=1574676074.239300&cid=CDUED3657
   */
  endDate.setHours(23 /*hours*/, 59 /*min*/, 59 /*sec*/, 999 /*ms*/);

  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 7);
  startDate.setHours(0 /*hours*/, 0 /*min*/, 0 /*sec*/, 0 /*ms*/);

  return { startDate, endDate };
}

/**
 * UTCのhourから、現地時間のhourに変換する
 */
export function toLocalHour(utcHour: number): number | null {
  if (utcHour === HOUR_UNSELECTED) {
    return null;
  }
  return (
    (utcHour -
      new Date().getTimezoneOffset() / MINUTES_IN_HOUR +
      HOURS_IN_DAY) %
    HOURS_IN_DAY
  );
}
