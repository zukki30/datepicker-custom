import { storiesOf } from "@storybook/vue";
import { date, boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { DateRange } from "@/components/calendar/Calendar";
import DateRangeConfirmPicker from "@/components/date-picker/DateRangeConfirmPicker.vue";

const selectedDates: DateRange = {
  min: new Date("2020-02-15"),
  max: new Date("2020-03-03")
};

const disabledDates: DateRange = {
  min: new Date("2020-01-15"),
  max: new Date("2020-03-20")
};

storiesOf("date-picker/DateRangeConfirmPicker", module)
  .add(
    "default",
    () => ({
      components: { DateRangeConfirmPicker },
      data() {
        return {
          disabledDates,
          selectedDates
        };
      },
      props: {
        disabled: {
          default: boolean("Disabled", false)
        },
        width: {
          default: text("Width", "350px")
        }
      },
      methods: {
        onInput: action("input")
      },
      template: `
      <DateRangeConfirmPicker
       :width="width"
       :disabled="disabled"
       :disabled-dates="disabledDates"
       @input="onInput"
      />`
    }),
    {
      info: {
        summary: "Simple DateRangeConfirmPicker component"
      }
    }
  )
  .add(
    "set date",
    () => ({
      components: { DateRangeConfirmPicker },
      data() {
        return {
          disabledDates,
          selectedDates
        };
      },
      props: {
        disabled: {
          default: boolean("Disabled", false)
        },
        width: {
          default: text("Width", "350px")
        }
      },
      methods: {
        onInput: action("input")
      },
      template: `
      <DateRangeConfirmPicker
       :width="width"
       :disabled="disabled"
       :disabled-dates="disabledDates"
       :selected-dates="selectedDates"
       @input="onInput"
      />`
    }),
    {
      info: {
        summary: "Simple DateRangeConfirmPicker component"
      }
    }
  );

function myDateKnob(name: string, value: Date) {
  const stringTimestamp = date(name, value);
  return new Date(stringTimestamp);
}
