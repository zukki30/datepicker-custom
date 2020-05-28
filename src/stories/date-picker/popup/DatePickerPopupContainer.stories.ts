import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { DatePickerData } from "@/components/date-picker/DatePickerData";
import DatePickerPopupContainer from "@/components/date-picker/popup/DatePickerPopupContainer.vue";

const datePicker = DatePickerData.build(new Date("2020-03-20"));

storiesOf("date-picker | popup/DatePickerPopupContainer", module).add(
  "default",
  () => ({
    components: { DatePickerPopupContainer },
    data() {
      return {
        datePicker
      };
    },
    methods: {
      onClick: action("move-year-month")
    },
    template: `
      <DatePickerPopupContainer :date-picker="datePicker" @move-year-month="onClick">
        <div style="width: 100%; text-align: center;">Slot</div>
      </DatePickerPopupContainer>`
  }),
  {
    info: {
      summary: "Simple DatePickerPopupContainer component"
    }
  }
);
