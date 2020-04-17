import { storiesOf } from "@storybook/vue";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Input from "@/components/date-picker/Input.vue";

function props() {
  return {
    disabled: {
      default: boolean("Disabled", false)
    },
    placeholder: {
      default: text("Placeholder", "対象の期間")
    },
    focus: {
      default: boolean("focus", false)
    }
  };
}

const actions = {
  onClick: action("click")
};

storiesOf("date-picker/Input", module)
  .add(
    "default",
    () => ({
      components: { Input },
      props: props(),
      methods: actions,
      template: `
      <Input
       :placeholder="placeholder"
       :disabled="disabled"
       :focus="focus"
       @click="onClick" />`
    }),
    {
      info: {
        summary: "Simple Input component"
      }
    }
  )
  .add(
    "set value",
    () => ({
      components: { Input },
      data() {
        return {
          value: new Date()
        };
      },
      props: props(),
      methods: actions,
      template: `
      <Input
       :value="value"
       :placeholder="placeholder"
       :disabled="disabled"
       @input="onInput" />`
    }),
    {
      info: {
        summary: "Set value"
      }
    }
  );
