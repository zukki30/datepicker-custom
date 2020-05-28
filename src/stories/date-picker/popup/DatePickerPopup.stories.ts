import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { DatePickerData } from "@/components/date-picker/DatePickerData";
import { DateRange } from "@/components/date-picker/DateRange.ts";
import DatePickerPopup from "@/components/date-picker/popup/DatePickerPopup.vue";

const selectedDate: Date = new Date("2020-03-10");

const enabledPeriod: DateRange = {
  min: new Date("2020-01-15"),
  max: new Date("2020-03-20")
};

const datePicker = DatePickerData.build(new Date("2020-03-20"));

storiesOf("date-picker | popup/DatePickerPopup", module).add(
  "default",
  () => ({
    components: { DatePickerPopup },
    data() {
      return {
        selectedDate,
        enabledPeriod,
        datePicker
      };
    },
    methods: {
      onSelectDate: action("select-date"),
      onMouseEnterDate: action("mouse-enter-date"),
      onMoveCalendarButtonClick: action("move-year-month")
    },
    template: `
      <DatePickerPopup
       :date-picker="datePicker"
       :selected-date="selectedDate"
       :enabled-period="enabledPeriod"
       @select-date="onSelectDate"
       @mouse-enter-date="onMouseEnterDate"
       @move-year-month="onMoveCalendarButtonClick" />`
  }),
  {
    info: {
      summary: "Simple DatePickerPopup component"
    }
  }
);
