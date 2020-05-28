import { storiesOf } from "@storybook/vue";
import { boolean, text, select, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { PopupAlign } from "@/components/date-picker/DatePickerData";
import DatePicker from "@/components/date-picker/DatePicker.vue";

function props() {
  return {
    disabled: {
      default: boolean("Disabled", false)
    },
    width: {
      default: text("Width", "100%")
    },
    align: {
      default: select("align", PopupAlign, PopupAlign.Left)
    },
    isFixedPopupTopPosition: {
      default: boolean("isFixedPopupTopPosition", true)
    },
    enabledPeriod: {
      default: () =>
        object("enabledPeriod", {
          min: new Date("2020-01-15"),
          max: new Date("2020-03-20")
        })
    }
  };
}

const actions = {
  onInput: action("input")
};

storiesOf("date-picker | DatePicker", module)
  .add(
    "default",
    () => ({
      components: { DatePicker },
      data() {
        return {
          value: null
        };
      },
      props: props(),
      methods: actions,
      template: `
      <DatePicker
       v-model="value"
       :width="width"
       :disabled="disabled"
       :enabled-period="enabledPeriod"
       :align="align"
       :is-fixed-popup-top-position="isFixedPopupTopPosition"
       @input="onInput" />`
    }),
    {
      info: {
        summary: "Simple DatePicker component"
      }
    }
  )
  .add(
    "set value",
    () => ({
      components: { DatePicker },
      data() {
        return {
          value: new Date("2020-02-04")
        };
      },
      props: props(),
      methods: actions,
      template: `
      <DatePicker
       :value="value"
       :width="width"
       :disabled="disabled"
       :enabled-period="enabledPeriod"
       :align="align"
       @input="onInput" />`
    }),
    {
      info: {
        summary: "Set value"
      }
    }
  );
