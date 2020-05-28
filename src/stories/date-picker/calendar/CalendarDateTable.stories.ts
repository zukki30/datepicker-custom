import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { convertDate } from "@/stories/storybook-util";
import { CalendarData } from "@/components/date-picker/CalendarData";
import { DateRange } from "@/components/date-picker/DateRange.ts";
import CalendarDateTable from "@/components/date-picker/calendar/CalendarDateTable.vue";

const enabledPeriod: DateRange = {
  min: new Date("2020-01-29"),
  max: new Date("2020-03-04")
};

storiesOf("date-picker | caledar/CalendarDateTable", module).add(
  "default",
  () => ({
    components: { CalendarDateTable },
    data() {
      return {
        enabledPeriod
      };
    },
    props: {
      date: {
        default: () => convertDate("Calendar", new Date("2020-02-29"))
      },
      selectedDate: {
        default: () => convertDate("Selected date", new Date("2020-02-12"))
      }
    },
    methods: {
      onSelectDate: action("select-date"),
      onMouseEnterDate: action("mouse-enter-date")
    },
    computed: {
      calendar() {
        const props: any = this.$props;
        const date: Date = props.date;
        return CalendarData.build(date);
      }
    },
    template: `
      <CalendarDateTable
       :calendar="calendar"
       :selected-date="selectedDate"
       :enabled-period="enabledPeriod"
       @select-date="onSelectDate"
       @mouse-enter-date="onMouseEnterDate" />`
  }),
  {
    info: {
      summary: "Simple CalendarDateTable component"
    }
  }
);
