import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { DatePickerData } from "@/components/date-picker/DatePickerData";
import { DateRange } from "@/components/date-picker/DateRange.ts";
import DateRangePickerPopup from "@/components/date-picker/popup/DateRangePickerPopup.vue";

const selectedPeriod: DateRange = {
  min: new Date("2020-02-15"),
  max: new Date("2020-03-10")
};

const enabledPeriod: DateRange = {
  min: new Date("2020-01-15"),
  max: new Date("2020-03-20")
};

const datePicker = DatePickerData.build(new Date("2020-03-20"));

storiesOf("date-picker | popup/DateRangePickerPopup", module).add(
  "default",
  () => ({
    components: { DateRangePickerPopup },
    data() {
      return {
        datePicker,
        selectedPeriod,
        enabledPeriod
      };
    },
    methods: {
      onSelectDate: action("select-date"),
      onMouseEnterDate: action("mouse-enter-date"),
      onMoveCalendarButtonClick: action("move-year-month")
    },
    template: `
      <DateRangePickerPopup
       :date-picker="datePicker"
       :selected-period="selectedPeriod"
       :enabled-period="enabledPeriod"
       @select-date="onSelectDate"
       @mouse-enter-date="onMouseEnterDate"
       @move-year-month="onMoveCalendarButtonClick" />`
  }),
  {
    info: {
      summary: "Simple DateRangePickerPopup component"
    }
  }
);
