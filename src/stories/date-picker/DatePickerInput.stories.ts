import { storiesOf } from "@storybook/vue";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { DateRange } from "@/components/calendar/Calendar";
import DatePickerInput from "@/components/date-picker/DatePickerInput.vue";

const selectedDates: DateRange = {
  min: new Date("2020-02-15"),
  max: new Date("2020-03-03")
};

const disabledDates: DateRange = {
  min: new Date("2020-01-15"),
  max: new Date("2020-03-20")
};

function props() {
  return {
    show: {
      default: boolean("Show", false)
    },
    disabled: {
      default: boolean("Disabled", false)
    },
    width: {
      default: text("Width", "100%")
    },
    placeholder: {
      default: text("Placeholder", "対象の期間")
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
       :show="show"
       :disabled="disabled"
       :disabled-dates="disabledDates"
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
       :show="show"
       :placeholder="placeholder"
       :disabled="disabled"
       :disabled-dates="disabledDates"
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
  )
  .add(
    "set selectedDates",
    () => ({
      components: { DatePickerInput },
      data() {
        return {
          value: new Date(selectedDates.min),
          disabledDates,
          selectedDates
        };
      },
      props: props(),
      methods: actions,
      template: `
      <DatePickerInput
       :value="value"
       :width="width"
       :show="show"
       :placeholder="placeholder"
       :disabled="disabled"
       :disabled-dates="disabledDates"
       :selected-dates="selectedDates"
       @input="onInput"
       @mouse-enter="onMouseEnter"
       @open="onOpen"
       @close="onClose" />`
    }),
    {
      info: {
        summary: "Set selectedDates"
      }
    }
  );
