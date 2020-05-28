import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { convertDate } from "@/stories/storybook-util";
import { CalendarData } from "@/components/date-picker/CalendarData";
import { DateRange } from "@/components/date-picker/DateRange.ts";
import CalendarDateRangeTable from "@/components/date-picker/calendar/CalendarDateRangeTable.vue";

const selectedPeriod: DateRange = {
  min: new Date("2020-02-15"),
  max: new Date("2020-02-25")
};

const enabledPeriod: DateRange = {
  min: new Date("2020-01-29"),
  max: new Date("2020-03-04")
};

storiesOf("date-picker | caledar/CalendarDateRangeTable", module).add(
  "default",
  () => ({
    components: { CalendarDateRangeTable },
    data() {
      return {
        selectedPeriod,
        enabledPeriod
      };
    },
    props: {
      date: {
        default: () => convertDate("Calendar", new Date("2020-02-29"))
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
      <CalendarDateRangeTable
       :calendar="calendar"
       :selected-period="selectedPeriod"
       :enabled-period="enabledPeriod"
       @select-date="onSelectDate"
       @mouse-enter-date="onMouseEnterDate" />`
  }),
  {
    info: {
      summary: "Simple CalendarDateRangeTable component"
    }
  }
);
