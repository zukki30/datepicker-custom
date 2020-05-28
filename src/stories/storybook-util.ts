import { date } from "@storybook/addon-knobs";

/**
 * storybookでdateを使用する場合は変換が必要
 * 参考: https://www.npmjs.com/package/@storybook/addon-knobs#date
 */
export function convertDate(name: string, value: Date) {
  const stringTimestamp = date(name, value);
  return new Date(stringTimestamp);
}
