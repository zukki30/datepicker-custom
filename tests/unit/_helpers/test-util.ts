import Vue from "vue";
import { Wrapper } from "@vue/test-utils";

/**
 * Emittedが1回だけ呼ばれたかをチェックする
 *
 * @param wrapper
 * @param event
 */
export function expectEmittedOneTime(wrapper: Wrapper<Vue>, event: string) {
  expect(wrapper.emitted(event)).toBeTruthy();
  expect(wrapper.emitted(event)!.length).toBe(1);
}

/**
 * Emittedが1回だけ呼ばれて、指定のvalueを返しているかチェックする
 *
 * @param wrapper
 * @param event
 * @param expectValue
 */
export function expectEmitted(
  wrapper: Wrapper<Vue>,
  event: string,
  expectValue: any
) {
  expectEmittedOneTime(wrapper, event);
  expect(wrapper.emitted(event)![0]).toEqual([expectValue]);
}

/**
 * new Dateを渡されたdateでmockする
 *
 * @param date
 */
export function mockDate(date: Date) {
  const originalDate = Date;
  // @ts-ignore
  jest.spyOn(global, "Date").mockImplementation(arg => {
    // If you pass a parameter, in order to make the date of the parameter.
    return arg ? new originalDate(arg) : new Date(date.getTime());
  });
}

/**
 * mockされたnew Dateをクリアする
 */
export function clearMockDate() {
  // @ts-ignore
  global.Date.mockRestore();
}

/**
 * オブジェクト同士がequalかチェックする
 * Compared values have no visual difference.のエラーが出る場合
 * JSON.stringifyしたもの同士で比較する
 * @param expectObject
 * @param targetObject
 */
export function equalObject(expectObject: any, targetObject: any) {
  expect(JSON.stringify(expectObject)).toEqual(JSON.stringify(targetObject));
}

/**
 * date range pickerが更新するときに日付を加工して返すので
 * equalチェック用に加工した日付を返す
 * @param start
 * @param end
 */
export function dateRangePickerDates(
  start: string | number,
  end: string | number
): { start: Date; end: Date } {
  const startDate = new Date(start);
  startDate.setTime(
    startDate.getTime() + startDate.getTimezoneOffset() * 1000 * 60
  );
  const endDate = new Date(end);
  endDate.setTime(
    endDate.getTime() +
      endDate.getTimezoneOffset() * 1000 * 60 +
      24 * 60 * 60 * 1000 -
      1
  );

  return { start: startDate, end: endDate };
}

/**
 * Get Stub Component, add component name as class name to the
 * stubbed component
 * @param componentName name of the component to be stubbed
 * @returns Vue Component to use in wrapper options { stubs: Result }
 */
export function getStubComponent(componentName: string) {
  return {
    template: `<div class=${componentName} />`
  };
}
