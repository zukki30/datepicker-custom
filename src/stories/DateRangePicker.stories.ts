import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { text, boolean } from "@storybook/addon-knobs";
import DateRangePicker from "@/components/DateRangePicker.vue";
import {
  disabledDateForDatePicker,
  dateRangePickerShortcuts
} from "@/util/date-range-picker-util";

storiesOf("DateRangePicker", module)
  .add(
    "default",
    () => ({
      components: { DateRangePicker },
      data() {
        return { value: { min: new Date(), max: new Date() } };
      },
      props: {
        disabled: {
          default: boolean("Disabled", false)
        },
        width: {
          default: text("Width", "350px")
        }
      },
      template:
        '<DateRangePicker v-model="value" :disabled="disabled" :width="width" @input="dateHandler"/>',
      methods: { dateHandler: action("pick") }
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
        return { value: { min: new Date(), max: new Date() } };
      },
      props: {
        disabled: {
          default: boolean("Disabled", false)
        },
        width: {
          default: text("Width", "350px")
        }
      },
      template:
        '<DateRangePicker v-model="value" :disabled="disabled" :disabledDate="disabledDate" @input="dateHandler"/>',
      methods: { dateHandler: action("pick") },
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
        return { value: { min: new Date(), max: new Date() } };
      },
      props: {
        disabled: {
          default: boolean("Disabled", false)
        },
        width: {
          default: text("Width", "350px")
        }
      },
      template:
        '<DateRangePicker v-model="value" :disabled="disabled" :shortcuts="shortcuts" @input="dateHandler"/>',
      methods: { dateHandler: action("pick") },
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
        return { value: { min: new Date(), max: new Date() } };
      },
      props: {
        disabled: {
          default: boolean("Disabled", false)
        },
        width: {
          default: text("Width", "350px")
        }
      },
      template:
        '<DateRangePicker v-model="value" :disabled="disabled" :shortcuts="shortcuts" :disabledDate="disabledDate" @input="dateHandler"/>',
      methods: { dateHandler: action("pick") },
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
