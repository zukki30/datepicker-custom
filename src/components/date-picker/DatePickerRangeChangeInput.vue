<template>
  <div
    v-click-outside="onClose"
    class="date-picker-range-change-input"
    :style="{ width }"
  >
    <div class="date-picker-range-change-input__container">
      <div class="date-picker-range-change-input__field">
        <Input
          ref="startInput"
          placeholder="対象期間の開始"
          :value="selectedStartInputValue"
          :disabled="disabled"
          :focus="startInputFocus"
          :class="{
            'date-picker-range-change-input__input--hidden': showDateValue
          }"
          @click="onStartClick"
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
        <Input
          ref="endInput"
          placeholder="対象期間の終了"
          :value="selectedEndInputValue"
          :disabled="disabled"
          :focus="endInputFocus"
          :class="{
            'date-picker-range-change-input__input--hidden': showDateValue
          }"
          @click="onEndClick"
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

    <Transition name="datePickerPopup" @enter="onChangePosition">
      <div
        v-if="showDatePickerPopup"
        ref="datePickerPopup"
        class="date-picker-range-change-input__popup"
        :style="{ 'margin-left': popupX + 'px' }"
      >
        <div class="date-picker-range-change-input__header">
          <PeriodDirectSelect
            v-model="periodDirectSelectValue"
            @click="onPeriodDirectSelectClick"
          />
        </div>

        <div class="date-picker-range-change-input__body">
          <DateRangePickerPopup
            :date-picker="datePicker"
            :disabled-dates="disabledDates"
            :selected-dates="dates"
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
import {
  DatePicker,
  DirectSelect,
  dateFormat
} from "@/components/date-picker/DatePicker";
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
  beforeStartInputValue: string = "";
  afterStartInputValue: string = "";

  endInputValue: Date | null = null;
  onEndCalendarMouseEnterDate: Date | null = null;
  endInputFocus: boolean = false;
  beforeEndInputValue: string = "";
  afterEndInputValue: string = "";

  datePicker: DatePicker | null = null;
  popupX: number = 0;
  showDatePickerPopup: boolean = false;
  periodDirectSelectValue: string = "";

  showDateValue: boolean = false;
  switching: boolean = false;

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

  setBeforeAndAfterStartValue(before: Date, after: Date) {
    this.beforeStartInputValue = dateFormat(before);
    this.afterStartInputValue = dateFormat(after);
  }

  setBeforeAndAfterEndValue(before: Date, after: Date) {
    this.beforeEndInputValue = dateFormat(before);
    this.afterEndInputValue = dateFormat(after);
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
    this.switching = false;
    this.startInputValue = date;
    this.onCalendarClose();

    if (this.endInputValue === null) {
      this.onEndClick();
    } else {
      this.onClose();
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
      this.onStartClick();
    } else {
      this.onClose();
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

  onSwitched() {
    setTimeout(() => {
      this.showDateValue = false;
    }, 500);
  }
}
</script>

<style scoped lang="scss">
.date-picker-range-change-input {
  position: relative;

  &__container {
    display: flex;
    align-items: center;
  }

  &__field {
    position: relative;
    flex: 1;
  }

  &__input--hidden {
    opacity: 0;
  }

  &__date {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-color: $colorBlue600;

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
