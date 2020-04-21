import { storiesOf } from "@storybook/vue";
import { date, boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { DateRange } from "@/components/calendar/Calendar";
import DateRangePicker from "@/components/old/date-picker/DateRangePicker.vue";

const selectedDates: DateRange = {
  min: new Date("2020-02-15"),
  max: new Date("2020-03-03")
};

const disabledDates: DateRange = {
  min: new Date("2020-01-15"),
  max: new Date("2020-03-20")
};

storiesOf("old/date-picker/DateRangePicker", module).add(
  "default",
  () => ({
    components: { DateRangePicker },
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
      onMoveCalendar: action("click-switch")
    },
    template: `
      <DateRangePicker
       :width="width"
       :disabled="disabled"
       :disabled-dates="disabledDates"
       :selected-dates="selectedDates"
       @input="onInput" />`
  }),
  {
    info: {
      summary: "Simple DateRangePicker component"
    }
  }
);

function myDateKnob(name: string, value: Date) {
  const stringTimestamp = date(name, value);
  return new Date(stringTimestamp);
}
