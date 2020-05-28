import { storiesOf } from "@storybook/vue";
import { select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { PeriodChoiceName } from "@/components/date-picker/PeriodChoice";
import PeriodChoices from "@/components/date-picker/PeriodChoices.vue";

storiesOf("date-picker | PeriodChoices", module).add(
  "default",
  () => ({
    components: { PeriodChoices },
    props: {
      current: {
        default: select("current", PeriodChoiceName, PeriodChoiceName.Blank)
      }
    },
    methods: {
      onClick: action("click")
    },
    template: `
      <PeriodChoices :current="current" @click="onClick" />`
  }),
  {
    info: {
      summary: "Simple PeriodChoices component"
    }
  }
);
