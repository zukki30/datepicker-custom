import { storiesOf } from "@storybook/vue";
import { date, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { DateRange } from "@/components/calendar/Calendar";
import { DatePicker } from "@/components/date-picker/DatePicker";
import DatePickerPopup from "@/components/date-picker/DatePickerPopup.vue";

const selectedDate: Date = new Date("2020-03-10");

const disabledDates: DateRange = {
  min: new Date("2020-01-15"),
  max: new Date("2020-03-20")
};

storiesOf("date-picker/DatePickerPopup", module).add(
  "default",
  () => ({
    components: { DatePickerPopup },
    data() {
      return {
        selectedDate,
        disabledDates
      };
    },
    props: {
      date: {
        default: () => myDateKnob("DatePicker", new Date())
      }
    },
    methods: {
      onClick: action("click"),
      onMoveCalendar: action("click-switch")
    },
    computed: {
      datePicker() {
        const props: any = this.$props;
        const date: Date = props.date;
        return new DatePicker(date);
      }
    },
    template: `
      <DatePickerPopup
       :date-picker="datePicker"
       :selected-date="selectedDate"
       :disabled-dates="disabledDates"
       @click="onClick"
       @move="onMoveCalendar" />`
  }),
  {
    info: {
      summary: "Simple DatePickerPopup component"
    }
  }
);

function myDateKnob(name: string, value: Date) {
  const stringTimestamp = date(name, value);
  return new Date(stringTimestamp);
}
