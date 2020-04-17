import { storiesOf } from "@storybook/vue";
import { date, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { DateRange } from "@/components/calendar/Calendar";
import { DatePicker } from "@/components/date-picker/DatePicker";
import DateRangePickerPopup from "@/components/date-picker/DateRangePickerPopup.vue";

const selectedDates: DateRange = {
  min: new Date("2020-02-15"),
  max: new Date("2020-03-10")
};

const disabledDates: DateRange = {
  min: new Date("2020-01-15"),
  max: new Date("2020-03-20")
};

storiesOf("date-picker/DateRangePickerPopup", module).add(
  "default",
  () => ({
    components: { DateRangePickerPopup },
    data() {
      return {
        selectedDates,
        disabledDates
      };
    },
    props: {
      date: {
        default: () => myDateKnob("DatePicker", new Date())
      },
      disabledMonthClick: {
        default: boolean("disabledMonthClick", false)
      }
    },
    methods: {
      onClick: action("click"),
      onMoveCalendar: action("click-switch"),
      onMonthClick: action("month-click")
    },
    computed: {
      datePicker() {
        const props: any = this.$props;
        const date: Date = props.date;
        return new DatePicker(date);
      }
    },
    template: `
      <DateRangePickerPopup
       :date-picker="datePicker"
       :selected-dates="selectedDates"
       :disabled-dates="disabledDates"
       :disabled-month-click="disabledMonthClick"
       @click="onClick"
       @move="onMoveCalendar"
       @month-click="onMonthClick" />`
  }),
  {
    info: {
      summary: "Simple DateRangePickerPopup component"
    }
  }
);

function myDateKnob(name: string, value: Date) {
  const stringTimestamp = date(name, value);
  return new Date(stringTimestamp);
}
