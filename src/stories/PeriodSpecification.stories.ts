import { storiesOf } from "@storybook/vue";
import { date, boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { DateRange } from "@/components/calendar/Calendar";
import PeriodSpecification from "@/components/PeriodSpecification.vue";

const selectedDates: DateRange = {
  min: new Date("2020-02-15"),
  max: new Date("2020-03-03")
};

const disabledDates: DateRange = {
  min: new Date("2020-01-15"),
  max: new Date("2020-03-20")
};

storiesOf("PeriodSpecification", module).add(
  "default",
  () => ({
    components: { PeriodSpecification },
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
      <PeriodSpecification />`
  }),
  {
    info: {
      summary: "Simple PeriodSpecification component"
    }
  }
);
