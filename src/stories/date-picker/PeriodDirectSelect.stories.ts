import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import PeriodDirectSelect from "@/components/date-picker/PeriodDirectSelect.vue";

storiesOf("date-picker/PeriodDirectSelect", module).add(
  "default",
  () => ({
    components: { PeriodDirectSelect },
    methods: {
      onClick: action("click")
    },
    template: `
      <PeriodDirectSelect @click="onClick" />`
  }),
  {
    info: {
      summary: "Simple PeriodDirectSelect component"
    }
  }
);
