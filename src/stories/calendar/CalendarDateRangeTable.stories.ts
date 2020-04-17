import { storiesOf } from "@storybook/vue";
import { date, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Calendar, DateRange } from "@/components/calendar/Calendar";
import CalendarDateRangeTable from "@/components/calendar/CalendarDateRangeTable.vue";

const selectedDates: DateRange = {
  min: new Date("2020-03-15"),
  max: new Date("2020-03-25")
};

const disabledDates: DateRange = {
  min: new Date("2020-03-03"),
  max: new Date("2020-03-29")
};

storiesOf("caledar/CalendarDateRangeTable", module)
  .add(
    "default",
    () => ({
      components: { CalendarDateRangeTable },
      data() {
        return {
          selectedDates
        };
      },
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
      <CalendarDateRangeTable
       :calendar="calendar"
       :disabled-month-click="disabledMonthClick"
       :selected-dates="selectedDates"
       @click="onClick"
       @month-click="onMonthClick" />`
    }),
    {
      info: {
        summary: "Simple CalendarDateRangeTable component"
      }
    }
  )
  .add(
    "disabled date",
    () => ({
      components: { CalendarDateRangeTable },
      data() {
        return {
          selectedDates,
          disabledDates
        };
      },
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
      <CalendarDateRangeTable
       :calendar="calendar"
       :disabled-month-click="disabledMonthClick"
       :selected-dates="selectedDates"
       :disabled-dates="disabledDates"
       @click="onClick"
       @month-click="onMonthClick" />`
    }),
    {
      info: {
        summary: "Simple CalendarDateRangeTable component"
      }
    }
  )
  .add(
    "disabled date",
    () => ({
      components: { CalendarDateRangeTable },
      data() {
        return {
          selectedDates,
          disabledDates
        };
      },
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
      <CalendarDateRangeTable
       :calendar="calendar"
       :disabled-month-click="disabledMonthClick"
       :selected-dates="selectedDates"
       :disabled-dates="disabledDates"
       @click="onClick"
       @month-click="onMonthClick" />`
    }),
    {
      info: {
        summary: "Simple CalendarDateRangeTable component"
      }
    }
  );

function myDateKnob(name: string, value: Date) {
  const stringTimestamp = date(name, value);
  return new Date(stringTimestamp);
}
