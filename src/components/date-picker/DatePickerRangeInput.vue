<template>
  <div class="date-picker-range-input" :style="{ width }">
    <DatePickerInput
      ref="startDatePickerInput"
      placeholder="対象期間の開始"
      :value="selectedStartInputValue"
      :disabled="disabled"
      :disabled-dates="disabledDates"
      :selected-dates="dates"
      @input="onStartInput"
      @mouse-enter="onStartCalendarMouseEnter"
    />
    <div class="date-picker-range-input__hyphen">-</div>
    <DatePickerInput
      ref="endDatePickerInput"
      placeholder="対象期間の終了"
      :value="selectedEndInputValue"
      :disabled="disabled"
      :disabled-dates="disabledDates"
      :selected-dates="dates"
      @input="onEndInput"
      @mouse-enter="onEndCalendarMouseEnter"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Emit } from "vue-property-decorator";
import { DateRange, changeDateRange } from "@/components/calendar/Calendar";
import { WidthProperty } from "csstype";
import DatePickerInput from "@/components/date-picker/DatePickerInput.vue";

@Component({
  components: { DatePickerInput }
})
export default class DatePickerRangeInput extends Vue {
  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: String, default: "350px" })
  width!: WidthProperty<0>;

  @Prop({ type: Object, default: null })
  disabledDates!: DateRange;

  @Prop({ type: Object, default: null })
  selectedDates!: DateRange;

  @Emit("input")
  onInput(dates: DateRange) {}

  startInputValue: Date | null = null;
  onStartCalendarMouseEnterDate: Date | null = null;

  endInputValue: Date | null = null;
  onEndCalendarMouseEnterDate: Date | null = null;

  selectDates: Date[] = [];

  get selectedStartInputValue(): Date | null {
    if (this.selectedDates !== null) {
      this.startInputValue = this.selectedDates.min;
      return this.selectedDates.min;
    }

    if (this.startInputValue !== null) {
      return this.startInputValue;
    }

    return null;
  }

  get selectedEndInputValue(): Date | null {
    if (this.selectedDates !== null) {
      this.endInputValue = this.selectedDates.max;
      return this.selectedDates.max;
    }

    if (this.endInputValue !== null) {
      return this.endInputValue;
    }

    return null;
  }

  get dates(): DateRange | null {
    if (this.selectedEndInputValue && this.onStartCalendarMouseEnterDate) {
      return this.onChangeDateRange(
        this.onStartCalendarMouseEnterDate,
        this.selectedEndInputValue
      );
    }

    if (this.selectedStartInputValue && this.onEndCalendarMouseEnterDate) {
      return this.onChangeDateRange(
        this.selectedStartInputValue,
        this.onEndCalendarMouseEnterDate
      );
    }

    return this.onChangeDateRange(
      this.selectedStartInputValue,
      this.selectedEndInputValue
    );
  }

  onStartCalendarMouseEnter(date: Date) {
    this.onStartCalendarMouseEnterDate = date;
  }

  onEndCalendarMouseEnter(date: Date) {
    this.onEndCalendarMouseEnterDate = date;
  }

  onCalendarClose() {
    this.onStartCalendarMouseEnterDate = null;
    this.onEndCalendarMouseEnterDate = null;

    if (
      this.dates !== null &&
      this.startInputValue instanceof Date &&
      this.endInputValue instanceof Date
    ) {
      this.onInput(this.dates);
    }
  }

  onChangeDateRange(min: Date | null, max: Date | null) {
    if (min instanceof Date && max === null) {
      return changeDateRange([min, min]);
    }

    if (min === null && max instanceof Date) {
      return changeDateRange([max, max]);
    }

    if (min instanceof Date && max instanceof Date) {
      return changeDateRange([min, max]);
    }

    return null;
  }

  onStartInput(date: Date) {
    this.startInputValue = date;
    this.onCalendarClose();

    if (this.endInputValue === null) {
      (this.$refs.endDatePickerInput as DatePickerInput).onOpen();
    }

    if (this.endInputValue instanceof Date && date > this.endInputValue) {
      this.startInputValue = this.endInputValue;
      this.endInputValue = date;
    }
  }

  onEndInput(date: Date) {
    this.endInputValue = date;
    this.onCalendarClose();

    if (this.startInputValue === null) {
      (this.$refs.startDatePickerInput as DatePickerInput).onOpen();
    }

    if (this.startInputValue instanceof Date && date < this.startInputValue) {
      this.endInputValue = this.startInputValue;
      this.startInputValue = date;
    }
  }
}
</script>

<style scoped lang="scss">
.date-picker-range-input {
  display: flex;
  align-items: center;

  &__hyphen {
    padding: 0 10px;
  }
}
</style>
