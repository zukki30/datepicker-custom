import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { text, boolean } from "@storybook/addon-knobs";
import DatePicker from "@/components/DatePicker.vue";
import { disabledDateForDatePicker } from "@/util/date-range-picker-util";

storiesOf("DatePicker", module)
  .add(
    "default",
    () => ({
      components: { DatePicker },
      data() {
        return { date: new Date() };
      },
      props: {
        disabled: {
          default: boolean("Disabled", false)
        },
        width: {
          default: text("Width", "200px")
        }
      },
      template:
        '<DatePicker v-model="date" :disabled="disabled" :width="width" @input="dateHandler"/>',
      methods: { dateHandler: action("pick") }
    }),
    {
      info: {
        summary: "Simple Balloon component"
      }
    }
  )
  .add(
    "Disable date",
    () => ({
      components: { DatePicker },
      data() {
        return { date: new Date() };
      },
      props: {
        disabled: {
          default: boolean("Disabled", false)
        },
        width: {
          default: text("Width", "200px")
        }
      },
      template:
        '<DatePicker v-model="date" :disabled="disabled" :width="width" :disabledDate="disabledDate" @input="dateHandler"/>',
      methods: { dateHandler: action("pick") },
      computed: {
        disabledDate() {
          return disabledDateForDatePicker();
        }
      }
    }),
    {
      info: {
        summary: "Simple DatePicker component"
      }
    }
  );
