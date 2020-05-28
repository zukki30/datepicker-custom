import { storiesOf } from "@storybook/vue";
import { boolean, text, select, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { PopupAlign } from "@/components/date-picker/DatePickerData";
import DateRangePicker from "@/components/date-picker/DateRangePicker.vue";

function props() {
  return {
    disabled: {
      default: boolean("Disabled", false)
    },
    width: {
      default: text("Width", "380px")
    },
    align: {
      default: select("align", PopupAlign, PopupAlign.Left)
    },
    showPeriodChoices: {
      default: boolean("showPeriodChoices", true)
    },
    enabledPeriod: {
      default: () =>
        object("enabledPeriod", {
          min: new Date("2019-01-15"),
          max: new Date("2020-03-20")
        })
    }
  };
}

const actions = {
  onInput: action("input"),
  onReset: action("reset")
};

storiesOf("date-picker | DateRangePicker", module)
  .add(
    "default",
    () => ({
      components: { DateRangePicker },
      data() {
        return {
          selectedPeriod: null
        };
      },
      props: props(),
      methods: actions,
      template: `<div style="padding: 400px 0">
      <DateRangePicker
       v-model="selectedPeriod"
       :width="width"
       :disabled="disabled"
       :enabled-period="enabledPeriod"
       :align="align"
       :show-period-choices="showPeriodChoices"
       @input="onInput"
       @reset="onReset" /></div>`
    }),
    {
      info: {
        summary: "Simple DateRangePicker component"
      }
    }
  )
  .add(
    "set props",
    () => ({
      components: { DateRangePicker },
      data() {
        return {
          selectedPeriod: {
            min: new Date("2020-02-15"),
            max: new Date("2020-03-03")
          }
        };
      },
      props: props(),
      methods: actions,
      template: `
      <DateRangePicker
       v-model="selectedPeriod"
       :width="width"
       :disabled="disabled"
       :enabled-period="enabledPeriod"
       :align="align"
       :show-period-choices="showPeriodChoices"
       @input="onInput"
       @reset="onReset" />`
    }),
    {
      info: {
        summary: "set props"
      }
    }
  );
