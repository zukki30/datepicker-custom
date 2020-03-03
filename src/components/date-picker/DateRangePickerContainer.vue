<template>
  <div
    class="date-range-picker-container"
    :class="{ 'date-range-picker-container--disabled': disabled }"
    @click="onClick"
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
  DateRangeInput
} from "@/components/date-picker/DatePicker";
import { Calendar, DateRange } from "@/components/calendar/Calendar";

@Component
export default class DateRangePickerContainer extends Vue {
  @Model("input", { type: Object, required: true })
  dates!: DateRange;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: String, default: DateRangeInput.Start })
  focus!: string;

  dateRangeInput = DateRangeInput;

  get startInputValue(): string {
    return this.dateFormat(this.dates.min);
  }

  get endInputValue(): string {
    return this.dateFormat(this.dates.max);
  }

  dateFormat(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dateCount = date.getDate();

    return year + "年" + month + "月" + dateCount + "日";
  }

  onClick() {
    (this.$refs[this.focus] as HTMLElement).focus();
  }
}
</script>

<style scoped lang="scss">
.date-range-picker-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1px;
  border: 1px solid #ddd;
  border-radius: 5px;

  &--disabled {
    background-color: #eee;
  }

  &__input {
    flex: 1;
    height: 30px;
    border: 2px solid rgba(0, 0, 0, 0);
    border-radius: 5px;
    text-align: center;
    font-size: 13px;
    line-height: 30px;
    &:disabled {
      background-color: #eee;
    }

    &--focus {
      &:focus {
        border-color: #3468eb;
      }
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
