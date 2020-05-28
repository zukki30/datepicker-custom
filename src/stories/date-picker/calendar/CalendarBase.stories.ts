import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { CalendarData } from "@/components/date-picker/CalendarData";
import { convertDate } from "@/stories/storybook-util";
import CalendarBase from "@/components/date-picker/calendar/CalendarBase.vue";

storiesOf("date-picker | caledar/CalendarBase", module).add(
  "default",
  () => ({
    components: { CalendarBase },
    props: {
      date: {
        default: () => convertDate("Calendar", new Date("2020-02-29"))
      }
    },
    methods: {
      onSelectDate: action("select-date")
    },
    computed: {
      calendar() {
        const props: any = this.$props;
        const date: Date = props.date;
        return CalendarData.build(date);
      }
    },
    template: `
    <CalendarBase :calendar="calendar" @select-date="onSelectDate">
      <template slot-scope="{ date }">
        {{ date.getDate() }}
      </template>
    </CalendarBase>`
  }),
  {
    info: {
      summary: "Simple CalendarBase component"
    }
  }
);
