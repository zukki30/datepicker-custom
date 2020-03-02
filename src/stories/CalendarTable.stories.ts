import { storiesOf } from "@storybook/vue";
import { date } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Calendar } from "@/components/calendar/Calendar";
import CalendarTable from "@/components/calendar/CalendarTable.vue";

storiesOf("CalendarTable", module).add(
  "default",
  () => ({
    components: { CalendarTable },
    props: {
      date: {
        default: myDateKnob("Date", new Date())
      }
    },
    methods: {
      onMouseEnter: action("mouse-enter"),
      onMouseLeave: action("mouse-leave"),
      onClick: action("click")
    },
    computed: {
      calendar() {
        const props: any = this.$props;
        const date: Date = props.date;
        return Calendar.build(date);
      }
    },
    template: `<CalendarTable
     :calendar="calendar"
     @click="onClick"
     @mouse-enter="onMouseEnter"
     @mouse-leave="onMouseLeave" />`
  }),
  {
    info: {
      summary: "Simple CalendarTable component"
    }
  }
);

function myDateKnob(name: string, value: Date) {
  const stringTimestamp = date(name, value);
  return new Date(stringTimestamp);
}
