<template>
  <input
    type="text"
    class="input"
    readonly
    :placeholder="placeholder"
    :value="formatValue"
    :class="{ 'input--focus': focus }"
    :disabled="disabled"
    @click="onClick"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Emit } from "vue-property-decorator";
import { dateFormat } from "@/components/date-picker/DatePicker";

@Component
export default class DatePickerInput extends Vue {
  @Prop({ type: Date, default: null })
  value!: Date;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: String, default: "" })
  placeholder!: string;

  @Prop({ type: Boolean, default: false })
  focus!: boolean;

  @Emit("click")
  onClick() {}

  get formatValue(): string {
    return this.value !== null ? dateFormat(this.value) : "";
  }
}
</script>

<style scoped lang="scss">
.input {
  padding: 0 8px;
  width: 100%;
  height: $formPartsHeight - 6;
  border: 1px solid $colorClear;
  border-radius: $sizeRadius;
  background-color: $colorWhite;
  color: $colorText;
  text-align: center;
  font-size: $basicFontSize;
  line-height: $formPartsHeight - 6;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: $colorBlue600;
    cursor: pointer;
  }

  &::placeholder {
    color: $colorBase700;
  }

  &:disabled {
    border-color: $colorBase500;
    background-color: $colorBase300;
    color: $colorBase600;
  }

  &--focus {
    background-color: $colorBlue600;
  }
}
</style>
