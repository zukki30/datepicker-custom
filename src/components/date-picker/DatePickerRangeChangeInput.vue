<template>
  <div
    v-click-outside="onOutSideClick"
    class="date-picker-range-change-input"
    :style="{ width }"
  >
    <div
      class="date-picker-range-change-input__container"
      :class="{
        'date-picker-range-change-input__container--foucs':
          startInputFocus || endInputFocus
      }"
    >
      <div class="date-picker-range-change-input__icon">
        <Icon icon="icon-calendar" color="#818599" :size="14" />
      </div>
      <div class="date-picker-range-change-input__field" @click="onStartClick">
        <Input
          ref="startInput"
          placeholder="対象期間の開始"
          :value="selectedStartInputValue"
          :disabled="disabled"
          :focus="startInputFocus"
        />
      </div>
      <div class="date-picker-range-change-input__hyphen">-</div>
      <div class="date-picker-range-change-input__field" @click="onEndClick">
        <Input
          ref="endInput"
          placeholder="対象期間の終了"
          :value="selectedEndInputValue"
          :disabled="disabled"
          :focus="endInputFocus"
        />
      </div>

      <div
        class="date-picker-range-change-input__delete-button"
        @click="onDelete"
        @mouseover="onMouseOver"
        @mouseleave="onMouseLeave"
      >
        <Icon
          class="date-picker-range-change-input__delete-button-icon"
          icon="icon-close"
          :color="deleteButtonIconColor"
          :size="10"
        />
      </div>
    </div>

    <Transition name="datePickerPopup">
      <div
        v-if="showDatePickerPopup"
        ref="datePickerPopup"
        class="date-picker-range-change-input__popup"
        :class="['date-picker-range-change-input__popup--' + align]"
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
import {
  DatePicker,
  DirectSelect,
  dateFormat,
  PopupAlign
} from "@/components/date-picker/DatePicker";
import {
  Calendar,
  DateRange,
  changeDateRange
} from "@/components/calendar/Calendar";
import { WidthProperty } from "csstype";
import DateRangePickerPopup from "@/components/date-picker/DateRangePickerPopup.vue";
import Input from "@/components/date-picker/Input.vue";
import Icon from "@/components/Icon.vue";
import PeriodDirectSelect from "@/components/date-picker/PeriodDirectSelect.vue";

@Component({
  components: { DateRangePickerPopup, Input, Icon, PeriodDirectSelect }
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

  @Prop({ type: String, default: PopupAlign.Left })
  align!: string;

  @Emit("input")
  onInput(dates: DateRange | null) {}

  @Emit("delete")
  onDelete() {
    this.onInputDelete();
    this.$nextTick(() => {
      this.onOpen();
    });

    if (!this.startInputFocus && !this.endInputFocus) {
      this.startInputFocus = true;
    }
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
    this.onStartCalendarMouseEnterDate = null;
    this.onEndCalendarMouseEnterDate = null;
  }

  @Emit("outside-click")
  onOutSideClick() {
    if (this.showDatePickerPopup) {
      this.onClose();
      this.onInputDelete();
    }
  }

  datePicker: DatePicker | null = null;

  startInputValue: Date | null = null;
  onStartCalendarMouseEnterDate: Date | null = null;
  startInputFocus: boolean = false;

  endInputValue: Date | null = null;
  onEndCalendarMouseEnterDate: Date | null = null;
  endInputFocus: boolean = false;

  showDatePickerPopup: boolean = false;
  periodDirectSelectValue: string = "";
  saveCalendar: Calendar | null = null;

  deleteButtonIconColor: string = "#CAD1D0";

  get dates(): DateRange | null {
    return this.onChangeDateRange(
      this.selectedStartInputValue,
      this.selectedEndInputValue
    );
  }

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
    if (this.saveCalendar === null) {
      const date: Date = new Date();
      this.saveCalendar = Calendar.build(date);
    }

    this.datePicker = DatePicker.rebuild(this.saveCalendar);
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

  onMoveCalendar(calendar: Calendar) {
    this.datePicker = DatePicker.rebuild(calendar);
    this.saveCalendar = calendar;
  }

  onMouseEnter(date: Date) {
    if (this.startInputFocus) {
      this.onStartCalendarMouseEnterDate = date;

      if (this.endInputValue !== null && this.endInputValue < date) {
        this.endInputFocus = true;
        this.startInputFocus = false;

        this.startInputValue = this.endInputValue;
        this.endInputValue = date;

        this.onStartCalendarMouseEnterDate = null;
        this.onEndCalendarMouseEnterDate = date;
      }

      return;
    }

    if (this.endInputFocus) {
      this.onEndCalendarMouseEnterDate = date;

      if (this.startInputValue !== null && this.startInputValue > date) {
        this.endInputFocus = false;
        this.startInputFocus = true;

        this.endInputValue = this.startInputValue;
        this.startInputValue = date;

        this.onEndCalendarMouseEnterDate = null;
        this.onStartCalendarMouseEnterDate = date;
      }

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
    this.onInput(directSelect.dateRange);
    this.onClose();
  }

  onInputDelete() {
    this.startInputValue = null;
    this.endInputValue = null;
    this.periodDirectSelectValue = "";
  }

  onMouseOver() {
    this.deleteButtonIconColor = "#a3acbf";
  }

  onMouseLeave() {
    this.deleteButtonIconColor = "#cad1e0";
  }
}
</script>

<style scoped lang="scss">
.date-picker-range-change-input {
  position: relative;

  &__container {
    display: flex;
    align-items: center;
    padding: 2px;
    height: $formPartsHeight;
    border: 1px solid $colorBase600;
    border-radius: $sizeRadius;

    &--foucs {
      border-color: $colorBlue800;
    }
  }

  &__icon {
    width: 25px;
    text-align: center;
  }

  &__field {
    flex: 1;
  }

  &__hyphen {
    padding: 0 10px;
  }

  &__delete-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    margin-left: 5px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    cursor: pointer;

    &-icon {
      transform: scale(1);
    }
  }

  &__popup {
    position: absolute;
    top: 40px;
    min-width: 700px;
    width: 100%;
    background-color: $colorWhite;
    box-shadow: 0 1px 4px rgba(#000, 0.1);

    &--left {
      left: 0;
    }

    &--center {
      left: 50%;
      transform: translateX(-50%);
    }

    &--right {
      right: 0;
    }
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
