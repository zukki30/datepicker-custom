import { storiesOf } from "@storybook/vue";
import { date, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Calendar } from "@/components/calendar/Calendar";
import CalendarBase from "@/components/calendar/CalendarBase.vue";

storiesOf("caledar/CalendarBase", module).add(
  "default",
  () => ({
    components: { CalendarBase },
    props: {
      date: {
        default: () => myDateKnob("Calendar", new Date())
      },
      disabledMonthClick: {
        default: boolean("disabledMonthClick", false)
      }
    },
    methods: {
      onClick: action("click"),
      onMonthClick: action("month-click")
    },
    computed: {
      calendar() {
        const props: any = this.$props;
        const date: Date = props.date;
        return Calendar.build(date);
      }
    },
    template: `
    <CalendarBase
     v-slot:default="{ date }"
     :calendar="calendar"
     :disabled-month-click="disabledMonthClick"
     @click="onClick"
     @month-click="onMonthClick">
      {{ date.getDate() }}
    </CalendarBase>`
  }),
  {
    info: {
      summary: "Simple CalendarBase component"
    }
  }
);

function myDateKnob(name: string, value: Date) {
  const stringTimestamp = date(name, value);
  return new Date(stringTimestamp);
}
