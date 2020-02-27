import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { text, boolean } from "@storybook/addon-knobs";
import {
  disabledDateForDatePicker,
  dateRangePickerShortcuts
} from "@/util/date-range-picker-util";
import DateRangePicker from "@/components/DateRangePicker.vue";

storiesOf("DateRangePicker", module)
  .add(
    "default",
    () => ({
      components: { DateRangePicker },
      data() {
        return { value: null };
      },
      props: {
        disabled: {
          default: boolean("Disabled", false)
        },
        width: {
          default: text("Width", "350px")
        }
      },
      methods: { onInput: action("emitInputEvent") },
      template:
        '<DateRangePicker v-model="value" :disabled="disabled" :width="width"  @input="onInput" />'
    }),
    {
      info: {
        summary: "Simple DateRangePicker component"
      }
    }
  )
  .add(
    "Disable date",
    () => ({
      components: { DateRangePicker },
      data() {
        return { value: null };
      },
      props: {
        disabled: {
          default: boolean("Disabled", false)
        },
        width: {
          default: text("Width", "350px")
        }
      },
      methods: { onInput: action("emitInputEvent") },
      template:
        '<DateRangePicker v-model="value" :disabled="disabled" :width="width" :disabledDate="disabledDate" @input="onInput" />',
      computed: {
        disabledDate() {
          return disabledDateForDatePicker();
        }
      }
    }),
    {
      info: {
        summary: "Disable date mode"
      }
    }
  )
  .add(
    "Shortcuts",
    () => ({
      components: { DateRangePicker },
      data() {
        return { value: null };
      },
      props: {
        disabled: {
          default: boolean("Disabled", false)
        },
        width: {
          default: text("Width", "350px")
        }
      },
      methods: { onInput: action("emitInputEvent") },
      template:
        '<DateRangePicker v-model="value" :disabled="disabled" :shortcuts="shortcuts" @input="onInput" />',
      computed: {
        shortcuts() {
          return dateRangePickerShortcuts(new Date());
        }
      }
    }),
    {
      info: {
        summary: "Add Shortcuts"
      }
    }
  )
  .add(
    "Shortcuts + Disable date",
    () => ({
      components: { DateRangePicker },
      data() {
        return { value: null };
      },
      props: {
        disabled: {
          default: boolean("Disabled", false)
        },
        width: {
          default: text("Width", "350px")
        }
      },
      methods: { onInput: action("emitInputEvent") },
      template:
        '<DateRangePicker v-model="value" :disabled="disabled" :shortcuts="shortcuts" :disabledDate="disabledDate" @input="onInput" />',
      computed: {
        shortcuts() {
          return dateRangePickerShortcuts(new Date());
        },
        disabledDate() {
          return disabledDateForDatePicker();
        }
      }
    }),
    {
      info: {
        summary: "Shortcuts + Disable date"
      }
    }
  );
