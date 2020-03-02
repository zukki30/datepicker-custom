import { storiesOf } from "@storybook/vue";
import { date } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Calendar, DateRange } from "@/components/calendar/Calendar";
import CalendarTable from "@/components/calendar/CalendarTable.vue";

const dateRange: DateRange = {
  min: new Date("2020-03-15"),
  max: new Date("2020-03-25")
};

storiesOf("CalendarTable", module)
  .add(
    "default",
    () => ({
      components: { CalendarTable },
      props: {
        date: {
          default: myDateKnob("Calendar", new Date())
        },
        dates: {
          default: myDateKnob("Dates", new Date("2020-03-15"))
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
     :dates="dates"
     @click="onClick"
     @mouse-enter="onMouseEnter"
     @mouse-leave="onMouseLeave" />`
    }),
    {
      info: {
        summary: "Simple CalendarTable component"
      }
    }
  )
  .add(
    "range mode",
    () => ({
      components: { CalendarTable },
      data() {
        return { dates: dateRange };
      },
      props: {
        date: {
          default: myDateKnob("Calendar", new Date())
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
     :dates="dates"
     :range-mode="true"
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
