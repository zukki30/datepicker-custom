import { storiesOf } from "@storybook/vue";
import { date, boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { DateRange } from "@/components/calendar/Calendar";
import DatePickerRangeInput from "@/components/date-picker/DatePickerRangeInput.vue";

const selectedDates: DateRange = {
  min: new Date("2020-02-15"),
  max: new Date("2020-03-03")
};

const disabledDates: DateRange = {
  min: new Date("2020-01-15"),
  max: new Date("2020-03-20")
};

storiesOf("date-picker/DatePickerRangeInput", module)
  .add(
    "default",
    () => ({
      components: { DatePickerRangeInput },
      data() {
        return {
          disabledDates
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
        onInput: action("input"),
        onReset: action("reset")
      },
      template: `
      <DatePickerRangeInput
       :width="width"
       :disabled="disabled"
       :disabled-dates="disabledDates"
       @input="onInput"
       @reset="onReset" />`
    }),
    {
      info: {
        summary: "Simple DatePickerRangeInput component"
      }
    }
  )
  .add(
    "set props",
    () => ({
      components: { DatePickerRangeInput },
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
        onInput: action("input"),
        onReset: action("reset")
      },
      template: `
      <DatePickerRangeInput
       :width="width"
       :disabled="disabled"
       :disabled-dates="disabledDates"
       :selected-dates="selectedDates"
       @input="onInput"
       @reset="onReset" />`
    }),
    {
      info: {
        summary: "Simple DatePickerRangeInput component"
      }
    }
  );
