<template>
  <input
    type="text"
    class="date-picker-readonly-input"
    readonly
    :placeholder="placeholder"
    :value="value"
    :class="[
      { 'date-picker-readonly-input--focus': focus },
      'date-picker-readonly-input--' + align
    ]"
    :disabled="disabled"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { InputTextAlign } from "@/components/date-picker/DatePickerData";

@Component
export default class DatePickerReadonlyInput extends Vue {
  @Prop({ type: String, default: "" })
  value!: string;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: String, default: "" })
  placeholder!: string;

  @Prop({ type: Boolean, default: false })
  focus!: boolean;

  @Prop({ type: String, default: InputTextAlign.Left })
  align!: InputTextAlign;
}
</script>

<style scoped lang="scss">
.date-picker-readonly-input {
  padding: 0 8px;
  width: 100%;
  height: $formPartsHeight - 6;
  border: 1px solid $colorClear;
  border-radius: $sizeRadius;
  background-color: $colorWhite;
  color: $colorText;
  font-size: $basicFontSize;
  line-height: $formPartsHeight - 6;
  transition: background-color 0.3s ease;

  &:not(:disabled):hover {
    background-color: $colorBlue600;
    cursor: pointer;
  }

  &::placeholder {
    color: $colorBase700;
  }

  &:disabled {
    background-color: $colorBase300;
    color: $colorBase600;
  }
}

.date-picker-readonly-input--left {
  text-align-last: left;
}

.date-picker-readonly-input--center {
  text-align: center;
}

.date-picker-readonly-input--focus {
  background-color: $colorBlue600;
  // IE11でplaceholderを表示させ、キャスターを消すために必要
  pointer-events: none;
}
</style>
