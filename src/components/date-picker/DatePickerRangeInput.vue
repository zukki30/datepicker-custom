<template>
  <div
    v-click-outside="onOutSideClick"
    class="date-picker-range-input"
    :style="{ width }"
  >
    <div class="date-picker-range-input__container">
      <Input
        ref="startInput"
        placeholder="対象期間の開始"
        :value="selectedStartInputValue"
        :disabled="disabled"
        :focus="startInputFocus"
        class="date-picker-range-input__input"
        @click="onStartClick"
      />
      <div class="date-picker-range-input__hyphen">-</div>
      <Input
        ref="endInput"
        placeholder="対象期間の終了"
        :value="selectedEndInputValue"
        :disabled="disabled"
        :focus="endInputFocus"
        class="date-picker-range-input__input"
        @click="onEndClick"
      />

      <div class="date-picker-range-input__delete-button" @click="onDelete" />
    </div>

    <Transition name="datePickerPopup" @enter="onChangePosition">
      <div
        v-if="showDatePickerPopup"
        ref="datePickerPopup"
        class="date-picker-range-input__popup"
        :style="{ 'margin-left': popupX + 'px' }"
      >
        <div class="date-picker-range-input__header">
          <PeriodDirectSelect
            v-model="periodDirectSelectValue"
            @click="onPeriodDirectSelectClick"
          />
        </div>

        <div class="date-picker-range-input__body">
          <DateRangePickerPopup
            :date-picker="datePicker"
            :disabled-dates="changeDisabledDates"
            :selected-dates="dates"
            :disabled-month-click="true"
            @click="onSelectDate"
            @move="onMoveCalendar"
            @mouse-enter="onMouseEnter"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { DatePicker, DirectSelect } from "@/components/date-picker/DatePicker";
import {
  Calendar,
  DateRange,
  changeDateRange
} from "@/components/calendar/Calendar";
import { WidthProperty } from "csstype";
import DateRangePickerPopup from "@/components/date-picker/DateRangePickerPopup.vue";
import Input from "@/components/date-picker/Input.vue";
import PeriodDirectSelect from "@/components/date-picker/PeriodDirectSelect.vue";

@Component({
  components: { DateRangePickerPopup, Input, PeriodDirectSelect }
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

  @Emit("delete")
  onDelete() {
    this.onInputDelete();
  }

  @Emit("open")
  onOpen() {
    this.showDatePickerPopup = true;
    this.onBuild();
  }

  @Emit("close")
  onClose() {
    this.showDatePickerPopup = false;
    this.startInputFocus = false;
    this.endInputFocus = false;
    this.popupX = 0;
  }

  startInputValue: Date | null = null;
  onStartCalendarMouseEnterDate: Date | null = null;
  startInputFocus: boolean = false;

  endInputValue: Date | null = null;
  onEndCalendarMouseEnterDate: Date | null = null;
  endInputFocus: boolean = false;

  datePicker: DatePicker | null = null;
  popupX: number = 0;
  showDatePickerPopup: boolean = false;
  periodDirectSelectValue: string = "";

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

  get selectedStartInputValue(): Date | null {
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
    if (this.endInputValue !== null) {
      return this.endInputValue;
    }

    if (this.selectedDates !== null) {
      this.endInputValue = this.selectedDates.max;
      return this.selectedDates.max;
    }

    return null;
  }

  get changeDisabledDates(): DateRange {
    if (this.startInputFocus && this.selectedEndInputValue !== null) {
      return {
        min: this.disabledDates.min,
        max: this.selectedEndInputValue
      };
    }

    if (this.endInputFocus && this.selectedStartInputValue !== null) {
      return {
        min: this.selectedStartInputValue,
        max: this.disabledDates.max
      };
    }

    return this.disabledDates;
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

  onBuild() {
    const date: Date = this.dates !== null ? this.dates.max : new Date();

    this.datePicker = new DatePicker(date);
  }

  onStartClick() {
    this.startInputFocus = true;
    this.endInputFocus = false;

    if (!this.showDatePickerPopup) {
      this.onOpen();
    }
  }

  onEndClick() {
    this.startInputFocus = false;
    this.endInputFocus = true;

    if (!this.showDatePickerPopup) {
      this.onOpen();
    }
  }

  onStartInput(date: Date) {
    this.startInputValue = date;
    this.onCalendarClose();

    if (this.endInputValue === null) {
      this.onEndClick();
    } else {
      this.onClose();
    }
  }

  onEndInput(date: Date) {
    this.endInputValue = date;
    this.onCalendarClose();

    if (this.startInputValue === null) {
      this.onStartClick();
    } else {
      this.onClose();
    }
  }

  onChangePosition(el: HTMLElement) {
    // Using to `Left` value because work in IE11 browser.
    const x = el.getBoundingClientRect().left;

    if (0 > x) {
      this.popupX = -x;
    }
  }

  onMoveCalendar(calendar: Calendar) {
    this.datePicker = DatePicker.rebuild(calendar);
  }

  onMouseEnter(date: Date) {
    if (this.startInputFocus) {
      this.onStartCalendarMouseEnterDate = date;
      return;
    }

    if (this.endInputFocus) {
      this.onEndCalendarMouseEnterDate = date;
      return;
    }
  }

  onSelectDate(date: Date) {
    this.periodDirectSelectValue = "";

    if (this.startInputFocus) {
      this.onStartInput(date);
      return;
    }

    if (this.endInputFocus) {
      this.onEndInput(date);
      return;
    }
  }

  onPeriodDirectSelectClick(directSelect: DirectSelect) {
    this.startInputValue = directSelect.dateRange.min;
    this.endInputValue = directSelect.dateRange.max;
    this.periodDirectSelectValue = directSelect.name;
    this.onClose();
  }

  onOutSideClick() {
    this.onClose();
    this.onInputDelete();
  }

  onInputDelete() {
    this.startInputValue = null;
    this.endInputValue = null;
  }
}
</script>

<style scoped lang="scss">
.date-picker-range-input {
  position: relative;

  &__container {
    display: flex;
    align-items: center;
  }

  &__input {
    flex: 1;
  }

  &__hyphen {
    padding: 0 8px;
  }

  &__delete-button {
    position: relative;
    margin-left: 8px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: $colorBase500;
    cursor: pointer;

    &:hover {
      background-color: $colorBase600;
    }

    &::before,
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -4px;
      margin-left: -1px;
      width: 1px;
      height: 8px;
      background-color: $colorWhite;
      content: "";
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }

  &__popup {
    position: absolute;
    top: 40px;
    left: 50%;
    min-width: 700px;
    width: 100%;
    background-color: $colorWhite;
    box-shadow: 0 1px 4px rgba(#000, 0.1);
    transform: translateX(-50%);
  }

  &__header {
    padding: 10px;
    border-bottom: 1px solid $colorBase400;
  }

  &__body {
    padding: 10px;
  }
}

.datePickerPopup-enter-active,
.datePickerPopup-leave-active {
  margin-top: 0;
  opacity: 1;
  transition: opacity 0.3s ease, margin-top 0.3s ease;
}
.datePickerPopup-enter,
.datePickerPopup-leave-to {
  margin-top: -40px;
  opacity: 0;
}
</style>
