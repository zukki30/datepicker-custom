import { storiesOf } from "@storybook/vue";
import { boolean, text, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { DateRange } from "@/components/calendar/Calendar";
import { PopupAlign } from "@/components/date-picker/DatePicker";
import DatePickerInput from "@/components/date-picker/DatePickerInput.vue";

const disabledDates: DateRange = {
  min: new Date("2020-01-15"),
  max: new Date("2020-03-20")
};

function props() {
  return {
    disabled: {
      default: boolean("Disabled", false)
    },
    width: {
      default: text("Width", "100%")
    },
    placeholder: {
      default: text("Placeholder", "対象の期間")
    },
    align: {
      default: select("align", PopupAlign, PopupAlign.Left)
    }
  };
}

const actions = {
  onInput: action("input"),
  onMouseEnter: action("mouse-enter"),
  onOpen: action("open"),
  onClose: action("close")
};

storiesOf("date-picker/DatePickerInput", module)
  .add(
    "default",
    () => ({
      components: { DatePickerInput },
      data() {
        return {
          disabledDates
        };
      },
      props: props(),
      methods: actions,
      template: `
      <DatePickerInput
       :width="width"
       :placeholder="placeholder"
       :disabled="disabled"
       :disabled-dates="disabledDates"
       :align="align"
       @input="onInput"
       @mouse-enter="onMouseEnter"
       @open="onOpen"
       @close="onClose" />`
    }),
    {
      info: {
        summary: "Simple DatePickerInput component"
      }
    }
  )
  .add(
    "set value",
    () => ({
      components: { DatePickerInput },
      data() {
        return {
          value: new Date(),
          disabledDates
        };
      },
      props: props(),
      methods: actions,
      template: `
      <DatePickerInput
       :value="value"
       :width="width"
       :placeholder="placeholder"
       :disabled="disabled"
       :disabled-dates="disabledDates"
       :align="align"
       @input="onInput"
       @mouse-enter="onMouseEnter"
       @open="onOpen"
       @close="onClose" />`
    }),
    {
      info: {
        summary: "Set value"
      }
    }
  );
