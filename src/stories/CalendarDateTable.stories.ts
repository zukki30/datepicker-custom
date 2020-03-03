import { storiesOf } from "@storybook/vue";
import { date } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Calendar, DateRange } from "@/components/calendar/Calendar";
import CalendarDateTable from "@/components/calendar/CalendarDateTable.vue";

const disabledDates: DateRange = {
  min: new Date("2020-03-03"),
  max: new Date("2020-03-29")
};

storiesOf("CalendarDateTable", module)
  .add(
    "default",
    () => ({
      components: { CalendarDateTable },
      props: {
        date: {
          default: myDateKnob("Calendar", new Date())
        },
        selectedDate: {
          default: myDateKnob("Selected date", new Date("2020-03-20"))
        }
      },
      methods: {
        onClick: action("click")
      },
      computed: {
        calendar() {
          const props: any = this.$props;
          const date: Date = props.date;
          return Calendar.build(date);
        }
      },
      template: `
      <CalendarDateTable
       :calendar="calendar"
       :selected-date="selectedDate"
       @click="onClick" />`
    }),
    {
      info: {
        summary: "Simple CalendarDateTable component"
      }
    }
  )
  .add(
    "disabled date",
    () => ({
      components: { CalendarDateTable },
      data() {
        return {
          disabledDates: disabledDates
        };
      },
      props: {
        date: {
          default: myDateKnob("Calendar", new Date())
        },
        selectedDate: {
          default: myDateKnob("Selected date", new Date("2020-03-20"))
        }
      },
      methods: {
        onClick: action("click")
      },
      computed: {
        calendar() {
          const props: any = this.$props;
          const date: Date = props.date;
          return Calendar.build(date);
        }
      },
      template: `
      <CalendarDateTable
       :calendar="calendar"
       :selected-date="selectedDate"
       :disabled-dates="disabledDates"
       @click="onClick" />`
    }),
    {
      info: {
        summary: "Simple CalendarDateTable component"
      }
    }
  );

function myDateKnob(name: string, value: Date) {
  const stringTimestamp = date(name, value);
  return new Date(stringTimestamp);
}
