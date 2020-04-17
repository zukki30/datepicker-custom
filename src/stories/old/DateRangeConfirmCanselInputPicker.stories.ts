import { storiesOf } from "@storybook/vue";
import { boolean, text, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { DateRange } from "@/components/calendar/Calendar";
import { PopupAlign } from "@/components/date-picker/DatePicker";
import DateRangeConfirmCanselInputPicker from "@/components/old/date-picker/DateRangeConfirmCanselInputPicker.vue";

const selectedDates: DateRange = {
  min: new Date("2020-02-15"),
  max: new Date("2020-03-03")
};

const disabledDates: DateRange = {
  min: new Date("2020-01-15"),
  max: new Date("2020-03-20")
};

storiesOf("old/date-picker/DateRangeConfirmCanselInputPicker", module)
  .add(
    "default",
    () => ({
      components: { DateRangeConfirmCanselInputPicker },
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
        },
        align: {
          default: select("Align", PopupAlign, PopupAlign.Center)
        }
      },
      methods: {
        onInput: action("input")
      },
      template: `
      <DateRangeConfirmCanselInputPicker
       :width="width"
       :disabled="disabled"
       :align="align"
       :disabled-dates="disabledDates"
       @input="onInput"
      />`
    }),
    {
      info: {
        summary: "Simple DateRangeConfirmCanselInputPicker component"
      }
    }
  )
  .add(
    "set date",
    () => ({
      components: { DateRangeConfirmCanselInputPicker },
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
      <DateRangeConfirmCanselInputPicker
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
