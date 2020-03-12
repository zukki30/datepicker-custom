<template>
  <div class="date-range-confirm-picker" :style="{ width }">
    <DateRangePickerContainer
      :dates="dates"
      :disabled="disabled"
      :focus="focus"
      @input="onOpen"
    />

    <Transition name="datePickerPopup">
      <div
        v-if="showDateRangePickerPopup"
        v-click-outside="onClose"
        class="date-range-confirm-picker__popup"
      >
        <div
          v-if="showDatePickerHeader"
          class="date-range-confirm-picker__header"
        >
          <slot />
        </div>

        <div class="date-range-confirm-picker__body">
          <DateRangePickerPopup
            :date-picker="datePicker"
            :selected-dates="dates"
            :disabled-dates="disabledDates"
            @click="onClick"
            @move="onMoveCalendar"
            @mouse-enter="onMouseEnter"
          />
        </div>

        <div class="date-range-confirm-picker__footer">
          <div
            class="date-range-confirm-picker__button date-range-confirm-picker__button--cancel"
            @click="onCancelClick"
          >
            キャンセル
          </div>
          <div
            class="date-range-confirm-picker__button date-range-confirm-picker__button--apply"
            @click="onApplyClick"
          >
            完了
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Emit } from "vue-property-decorator";
import {
  DatePicker,
  DateRangeInput
} from "@/components/date-picker/DatePicker";
import {
  Calendar,
  DateRange,
  changeDateRange
} from "@/components/calendar/Calendar";
import { WidthProperty } from "csstype";
import DateRangePickerPopup from "@/components/date-picker/DateRangePickerPopup.vue";
import DateRangePickerContainer from "@/components/date-picker/DateRangePickerContainer.vue";

@Component({
  components: { DateRangePickerPopup, DateRangePickerContainer }
})
export default class DateRangeConfirmPicker extends Vue {
  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: String, default: "350px" })
  width!: WidthProperty<0>;

  @Prop({ type: Object, default: null })
  disabledDates!: DateRange;

  @Prop({ type: Object, default: null })
  selectedDates!: DateRange;

  @Emit("input")
  onInput(dates: DateRange | null) {}

  focus: string = "";
  selectDates: Date[] = [];
  datePicker: DatePicker | null = null;
  showDateRangePickerPopup: boolean = false;
  dateRangeInput = DateRangeInput;
  onMouseEnterDate: Date | null = null;

  get dateRange(): DateRange {
    if (this.onMouseEnterDate !== null) {
      return changeDateRange([this.selectDates[0], this.onMouseEnterDate]);
    }

    return this.selectDates.length > 0
      ? changeDateRange(this.selectDates)
      : this.selectedDates;
  }

  get dates(): DateRange | null {
    if (this.selectDates.length > 0) {
      return this.dateRange;
    }
    return this.selectedDates === null ? null : this.dateRange;
  }

  get showDatePickerHeader(): boolean {
    return this.$slots.default !== undefined && this.$slots.default.length > 0;
  }

  onClick(date: Date) {
    if (this.selectDates.length === 2) {
      this.selectDates = [];
    }

    this.selectDates.push(date);
    this.focus = this.dateRangeInput.End;

    if (this.selectDates.length === 2) {
      this.focus = this.dateRangeInput.Start;
      this.onMouseEnterDate = null;
    }
  }

  onApplyClick() {
    this.onInput(this.dateRange);
    this.onClose();
  }

  onCancelClick() {
    this.focus = this.dateRangeInput.Start;
    this.onMouseEnterDate = null;
    this.selectDates = [];
    this.onClose();
  }

  onMoveCalendar(calendar: Calendar) {
    this.datePicker = DatePicker.rebuild(calendar);
  }

  onMouseEnter(date: Date) {
    if (this.selectDates.length === 1) {
      this.onMouseEnterDate = date;
    }
  }

  onOpen() {
    const date: Date = this.dates !== null ? this.dates.max : new Date();
    this.datePicker = new DatePicker(date);
    this.showDateRangePickerPopup = true;
    this.focus = this.dateRangeInput.Start;
  }

  onClose() {
    this.datePicker = null;
    this.showDateRangePickerPopup = false;
    this.focus = "";
  }
}
</script>

<style scoped lang="scss">
.date-range-confirm-picker {
  position: relative;

  &__body {
    padding: 0 10px 10px;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    border-top: 1px solid #eee;
  }

  &__popup {
    position: absolute;
    top: 40px;
    left: 50%;
    width: 750px;
    box-shadow: 2px 2px 5px rgba(#000, 0.1);
    transform: translateX(-50%);
  }

  &__button {
    margin-left: 10px;
    padding: 10px 10px 8px;
    min-width: 85px;
    border: 1px solid;
    background-color: #fff;
    border-radius: 5px;
    font-size: 12px;
    line-height: 1;
    cursor: pointer;
    text-align: center;
    transition: border-color 0.3s ease, background-color 0.3s ease;

    &--cancel {
      border-color: #ccc;
      color: #666;

      &:hover {
        background-color: #ebf0ff;
      }
    }

    &--apply {
      background-color: #3468eb;
      border-color: #3468eb;
      color: #fff;

      &:hover {
        background-color: #4e7ef5;
        border-color: #4e7ef5;
      }
    }
  }
}

.datePickerPopup-enter-active,
.datePickerPopup-leave-active {
  opacity: 1;
  margin-top: 0;
  transition: opacity 0.3s ease, margin-top 0.3s ease;
}
.datePickerPopup-enter,
.datePickerPopup-leave-to {
  opacity: 0;
  margin-top: -40px;
}
</style>
