<template>
  <div
    class="date-range-picker-container"
    :class="[
      { 'date-range-picker-container--focus': focus.length > 0 },
      { 'date-range-picker-container--disabled': disabled }
    ]"
    @click="onInput(dates)"
  >
    <input
      ref="startDatePicker"
      type="text"
      name="start"
      placeholder="対象期間の開始"
      :value="startInputValue"
      class="date-range-picker-container__input"
      :class="{
        'date-range-picker-container__input--focus':
          focus === dateRangeInput.Start
      }"
      :disabled="disabled"
    />
    <div class="date-range-picker-container__hyphen">-</div>
    <input
      ref="endDatePicker"
      type="text"
      name="end"
      placeholder="対象期間の終了"
      :value="endInputValue"
      class="date-range-picker-container__input"
      :class="{
        'date-range-picker-container__input--focus':
          focus === dateRangeInput.End
      }"
      :disabled="disabled"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Emit } from "vue-property-decorator";
import {
  DatePicker,
  DateRangeInput,
  dateFormat
} from "@/components/date-picker/DatePicker";
import { Calendar, DateRange } from "@/components/calendar/Calendar";

@Component
export default class DateRangePickerContainer2 extends Vue {
  @Prop({ type: Object })
  dates!: DateRange | null;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: String, default: "" })
  focus!: DateRangeInput;

  @Emit("input")
  onInput(dates: DateRange | null) {
    if (this.focus.length !== 0) {
      (this.$refs[this.focus] as HTMLElement).focus();
    }
  }

  dateRangeInput = DateRangeInput;

  get startInputValue(): string | null {
    return this.dates !== null ? dateFormat(this.dates.min) : null;
  }

  get endInputValue(): string | null {
    return this.dates !== null && this.focus !== this.dateRangeInput.End
      ? dateFormat(this.dates.max)
      : null;
  }
}
</script>

<style scoped lang="scss">
.date-range-picker-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1px;
  border: 1px solid $colorBase600;
  border-radius: 5px;

  &--focus {
    border-color: $colorWhite;
    box-shadow: 0 0 2px 2px $colorBlue900;
    transition: box-shadow 0.3s ease;
  }

  &--disabled {
    border-color: $colorBase500;
    background-color: $colorBase300;
  }

  &__input {
    flex: 1;
    height: $formPartsHeight;
    border: 2px solid rgba(0, 0, 0, 0);
    border-radius: 5px;
    text-align: center;
    font-size: $basicFontSize;
    line-height: $formPartsHeight;
    &:disabled {
      background-color: $colorBase300;
      color: $colorBase600;
    }

    &--focus {
      background-color: $colorBlue700;
    }
  }

  &__hyphen {
    padding: 0 10px;
    width: 30px;
    text-align: center;
    line-height: 1;
  }
}
</style>
