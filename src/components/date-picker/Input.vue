<template>
  <input
    type="text"
    class="input"
    readonly
    :placeholder="placeholder"
    :value="formatValue"
    :class="{ 'input--focus': focus }"
    :disabled="disabled"
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

  @Emit("input")
  onInput(date: Date) {}

  focus: boolean = false;

  get formatValue(): string {
    return this.value !== null ? dateFormat(this.value) : "";
  }
}
</script>

<style scoped lang="scss">
.input {
  padding: 0 8px;
  width: 100%;
  height: $formPartsHeight;
  border: 1px solid $colorBase600;
  border-radius: $sizeRadius;
  background-color: $colorWhite;
  box-shadow: 0 0 3px rgba($colorBlue900, 0);
  color: $colorText;
  font-size: $basicFontSize;
  line-height: $formPartsHeight;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;

  &::placeholder {
    color: $colorBase700;
  }

  &:disabled {
    border-color: $colorBase500;
    background-color: $colorBase300;
    color: $colorBase600;
  }

  &--focus {
    border-color: $colorBlue800;
    box-shadow: 0 0 3px rgba($colorBlue900, 0.7);
  }
}
</style>
