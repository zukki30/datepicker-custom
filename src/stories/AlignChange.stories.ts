import { storiesOf } from "@storybook/vue";
import { select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { PopupAlign } from "@/components/date-picker/DatePicker";
import AlignChange from "@/components/AlignChange.vue";

storiesOf("AlignChange", module).add(
  "default",
  () => ({
    components: { AlignChange },
    props: {
      align: {
        default: select("align", PopupAlign, PopupAlign.Center)
      }
    },
    methods: {
      onClick: action("click")
    },
    template: `
      <AlignChange
       :align="align"
       @click="onClick" />`
  }),
  {
    info: {
      summary: "Simple AlignChange component"
    }
  }
);
