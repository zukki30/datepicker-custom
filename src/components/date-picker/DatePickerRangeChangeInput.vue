<template>
  <div class="date-picker-range-change-input" :style="{ width }">
    <div class="date-picker-range-change-input__field">
      <DatePickerInput
        ref="startDatePickerInput"
        placeholder="対象期間の開始"
        :class="{
          'date-picker-range-change-input__input--hidden': showDateValue
        }"
        :value="selectedStartInputValue"
        :disabled="disabled"
        :disabled-dates="disabledDates"
        :selected-dates="dates"
        @input="onStartInput"
        @mouse-enter="onStartCalendarMouseEnter"
      />
      <transition name="fade" @after-enter="onSwitched">
        <div
          v-show="showDateValue"
          class="date-picker-range-change-input__date"
          :class="{
            'date-picker-range-change-input__date--start-switch': switching
          }"
          :data-before-value="beforeStartInputValue"
          :data-after-value="afterStartInputValue"
        />
      </transition>
    </div>
    <div class="date-picker-range-change-input__hyphen">-</div>
    <div class="date-picker-range-change-input__field">
      <DatePickerInput
        ref="endDatePickerInput"
        placeholder="対象期間の終了"
        :class="{
          'date-picker-range-change-input__input--hidden': showDateValue
        }"
        :value="selectedEndInputValue"
        :disabled="disabled"
        :disabled-dates="disabledDates"
        :selected-dates="dates"
        @input="onEndInput"
        @mouse-enter="onEndCalendarMouseEnter"
      />
      <transition name="fade" @after-enter="onSwitched">
        <div
          v-show="showDateValue"
          class="date-picker-range-change-input__date"
          :class="{
            'date-picker-range-change-input__date--end-switch': switching
          }"
          :data-before-value="beforeEndInputValue"
          :data-after-value="afterEndInputValue"
        />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Emit } from "vue-property-decorator";
import { DateRange, changeDateRange } from "@/components/calendar/Calendar";
import { dateFormat } from "@/components/date-picker/DatePicker";
import { WidthProperty } from "csstype";
import DatePickerInput from "@/components/date-picker/DatePickerInput.vue";

@Component({
  components: { DatePickerInput }
})
export default class DatePickerRangeChangeInput extends Vue {
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
  beforeStartInputValue: string = "";
  afterStartInputValue: string = "";

  endInputValue: Date | null = null;
  onEndCalendarMouseEnterDate: Date | null = null;
  beforeEndInputValue: string = "";
  afterEndInputValue: string = "";

  showDateValue: boolean = false;
  switching: boolean = false;
  selectDates: Date[] = [];

  get selectedStartInputValue(): Date | null {
    if (this.onStartCalendarMouseEnterDate !== null) {
      return this.onStartCalendarMouseEnterDate;
    }

    if (this.startInputValue !== null) {
      return this.startInputValue;
    }

    if (this.selectedDates !== null) {
      this.startInputValue = this.selectedDates.min;
      return this.selectedDates.min;
    }

    return null;
  }

  get selectedEndInputValue(): Date | null {
    if (this.onEndCalendarMouseEnterDate !== null) {
      return this.onEndCalendarMouseEnterDate;
    }

    if (this.endInputValue !== null) {
      return this.endInputValue;
    }

    if (this.selectedDates !== null) {
      this.endInputValue = this.selectedDates.max;
      return this.selectedDates.max;
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

  setBeforeAndAfterStartValue(before: Date, after: Date) {
    this.beforeStartInputValue = dateFormat(before);
    this.afterStartInputValue = dateFormat(after);
  }

  setBeforeAndAfterEndValue(before: Date, after: Date) {
    this.beforeEndInputValue = dateFormat(before);
    this.afterEndInputValue = dateFormat(after);
  }

  onStartInput(date: Date) {
    this.switching = false;
    this.startInputValue = date;
    this.onCalendarClose();

    if (this.endInputValue === null) {
      (this.$refs.endDatePickerInput as DatePickerInput).onOpen();
    }

    if (this.endInputValue instanceof Date && date > this.endInputValue) {
      this.startInputValue = this.endInputValue;
      this.endInputValue = date;
      this.switching = true;
      this.showDateValue = true;

      this.setBeforeAndAfterStartValue(date, this.startInputValue);
      this.setBeforeAndAfterEndValue(this.startInputValue, date);
    }
  }

  onEndInput(date: Date) {
    this.switching = false;
    this.endInputValue = date;
    this.onCalendarClose();

    if (this.startInputValue === null) {
      (this.$refs.startDatePickerInput as DatePickerInput).onOpen();
    }

    if (this.startInputValue instanceof Date && date < this.startInputValue) {
      this.endInputValue = this.startInputValue;
      this.startInputValue = date;
      this.switching = true;
      this.showDateValue = true;

      this.setBeforeAndAfterStartValue(this.endInputValue, date);
      this.setBeforeAndAfterEndValue(date, this.endInputValue);
    }
  }

  onSwitched() {
    setTimeout(() => {
      this.showDateValue = false;
    }, 500);
  }
}
</script>

<style scoped lang="scss">
.date-picker-range-change-input {
  display: flex;
  align-items: center;

  &__field {
    position: relative;
    flex: 1;
  }

  &__input--hidden {
    opacity: 0;
  }

  &__date {
    background-color: #f2f5fc;
    border-radius: 5px;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    &::before,
    &::after {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
    }

    &::before {
      content: attr(data-before-value);
    }

    &::after {
      content: attr(data-after-value);
    }

    &--start-switch {
      &::after {
        opacity: 0;
      }
    }

    &--end-switch {
      &::after {
        opacity: 0;
      }
    }
  }

  &__hyphen {
    padding: 0 10px;
  }
}

.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@keyframes start-anime {
  0% {
    opacity: 1;
    transform: translate(0, -50%);
  }
  50% {
    opacity: 0;
    transform: translate(50%, -50%);
  }
  100% {
    opacity: 0;
    transform: translate(50%, -50%);
  }
}

@keyframes end-anime {
  0% {
    opacity: 1;
    transform: translate(0, -50%);
  }
  50% {
    opacity: 0;
    transform: translate(-50%, -50%);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%);
  }
}
</style>
