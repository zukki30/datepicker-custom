import { storiesOf } from "@storybook/vue";
import { number, text, select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import InputText from "@/components/InputText.vue";

const InputType = {
  Text: "text",
  Search: "search",
  Tel: "tel",
  Url: "url",
  Email: "email",
  Password: "password",
  Number: "number"
};

const MaxLengthOptions = {
  range: true,
  min: 10,
  max: 100,
  step: 5
};

storiesOf("InputText", module)
  .add(
    "default",
    () => ({
      components: { InputText },
      data() {
        return { value: "default value" };
      },
      props: {
        placeholder: {
          default: text("Placeholder", "")
        },
        disabled: {
          default: boolean("Disabled", false)
        },
        tabindex: {
          default: number("Tabindex", 0)
        },
        type: {
          default: select("Type", InputType, InputType.Text)
        },
        hasError: {
          default: boolean("Has Error", false)
        }
      },
      methods: {
        onInput: action("input")
      },
      template: `<InputText
       v-model="value"
       :type="type"
       :placeholder="placeholder"
       :tabindex="tabindex"
       :disabled="disabled"
       :has-error="hasError"
       @input="onInput" />`
    }),
    {
      info: {
        summary: "Simple InputText component"
      }
    }
  )
  .add(
    "Max Length",
    () => ({
      components: { InputText },
      data() {
        return { value: "default value" };
      },
      props: {
        placeholder: {
          default: text("Placeholder", "")
        },
        disabled: {
          default: boolean("Disabled", false)
        },
        tabindex: {
          default: number("Tabindex", 0)
        },
        type: {
          default: select("Type", InputType, InputType.Text)
        },
        maxLength: {
          default: number("Max Length", 10, MaxLengthOptions)
        },
        hasError: {
          default: boolean("Has Error", false)
        }
      },
      methods: {
        onInput: action("input")
      },
      template: `<InputText
       v-model="value"
       :type="type"
       :placeholder="placeholder"
       :tabindex="tabindex"
       :disabled="disabled"
       :has-error="hasError"
       :maxLength="maxLength"
       @input="onInput" />`
    }),
    {
      info: {
        summary: "Input character limit"
      }
    }
  );
