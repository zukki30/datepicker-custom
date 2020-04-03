import { storiesOf } from "@storybook/vue";
import { select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { DateRange } from "@/components/calendar/Calendar";
import { DateRangeInput } from "@/components/date-picker/DatePicker";
import DateRangePickerContainer2 from "@/components/date-picker/DateRangePickerContainer2.vue";

const dates: DateRange = {
  min: new Date("2020-02-15"),
  max: new Date("2020-03-10")
};

storiesOf("date-picker/DateRangePickerContainer2", module).add(
  "default",
  () => ({
    components: { DateRangePickerContainer2 },
    data() {
      return {
        dates
      };
    },
    props: {
      disabled: {
        default: boolean("Disabled", false)
      },
      focus: {
        default: select("Focus", DateRangeInput, DateRangeInput.Start)
      }
    },
    methods: {
      onInput: action("input")
    },
    template: `
      <DateRangePickerContainer2
       :dates="dates"
       :disabled="disabled"
       :focus="focus"
       @input="onInput" />`
  }),
  {
    info: {
      summary: "Simple DateRangePickerContainer2 component"
    }
  }
);
