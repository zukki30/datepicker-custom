import { storiesOf } from "@storybook/vue";
import { boolean, text, select } from "@storybook/addon-knobs";
import { InputTextAlign } from "@/components/date-picker/DatePickerData";
import DatePickerReadonlyInput from "@/components/date-picker/DatePickerReadonlyInput.vue";

storiesOf("date-picker | DatePickerReadonlyInput", module).add(
  "default",
  () => ({
    components: { DatePickerReadonlyInput },
    props: {
      value: {
        default: text("value", "")
      },
      disabled: {
        default: boolean("Disabled", false)
      },
      placeholder: {
        default: text("Placeholder", "対象の期間")
      },
      focus: {
        default: boolean("focus", false)
      },
      align: {
        default: select("align", InputTextAlign, InputTextAlign.Left)
      }
    },
    template: `
      <DatePickerReadonlyInput
       :value="value"
       :placeholder="placeholder"
       :disabled="disabled"
       :focus="focus"
       :align="align" />`
  }),
  {
    info: {
      summary: "Simple DatePickerReadonlyInput component"
    }
  }
);
