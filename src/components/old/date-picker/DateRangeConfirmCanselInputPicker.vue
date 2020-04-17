<template>
  <div
    v-click-outside="onOutSideClick"
    class="date-range-confirm-cansel-input-picker"
    :style="{ width }"
  >
    <DateRangePickerContainer2
      :dates="inputDates"
      :disabled="disabled"
      :focus="focus"
      @input="onOpen"
    />

    <Transition name="datePickerPopup">
      <div
        v-if="showDateRangePickerPopup"
        class="date-range-confirm-cansel-input-picker__popup"
        :class="popupAlign"
      >
        <div class="date-range-confirm-cansel-input-picker__header">
          <div
            v-for="directSelect in directSelects"
            :key="directSelect.dateRange.min.getDate()"
            class="date-range-confirm-cansel-input-picker__direct"
            :class="{
              'date-range-confirm-cansel-input-picker__direct--current':
                currentButton === directSelect.name
            }"
            @click="onDirectClick(directSelect)"
          >
            {{ directSelect.name }}
          </div>
        </div>

        <div class="date-range-confirm-cansel-input-picker__body">
          <DateRangePickerPopup
            :date-picker="datePicker"
            :selected-dates="popupDates"
            :disabled-dates="disabledDates"
            @click="onClick"
            @move="onMoveCalendar"
            @mouse-enter="onMouseEnter"
          />
        </div>

        <div class="date-range-confirm-cansel-input-picker__footer">
          <div
            class="date-range-confirm-cansel-input-picker__button date-range-confirm-cansel-input-picker__button--cancel"
            @click="onCancelClick"
          >
            キャンセル
          </div>
          <div
            class="date-range-confirm-cansel-input-picker__button date-range-confirm-cansel-input-picker__button--apply"
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
  DateRangeInput,
  PopupAlign
} from "@/components/date-picker/DatePicker";
import {
  Calendar,
  DateRange,
  changeDateRange
} from "@/components/calendar/Calendar";
import { WidthProperty } from "csstype";
import DateRangePickerPopup from "@/components/date-picker/DateRangePickerPopup.vue";
import DateRangePickerContainer2 from "@/components/old/date-picker/DateRangePickerContainer2.vue";

interface DirectSelect {
  name: string;
  dateRange: DateRange;
}

@Component({
  components: { DateRangePickerPopup, DateRangePickerContainer2 }
})
export default class DateRangeConfirmCanselInputPicker extends Vue {
  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: String, default: "350px" })
  width!: WidthProperty<0>;

  @Prop({ type: Object, default: null })
  disabledDates!: DateRange;

  @Prop({ type: Object, default: null })
  selectedDates!: DateRange;

  @Prop({ type: String, default: PopupAlign.Center })
  align!: string;

  @Emit("input")
  onInput(dates: DateRange | null) {}

  focus: string = "";
  selectDates: Date[] = [];
  datePicker: DatePicker | null = null;
  showDateRangePickerPopup: boolean = false;
  dateRangeInput = DateRangeInput;
  currentButton: string = "";
  onMouseEnterDate: Date | null = null;

  get popupAlign(): string {
    return "date-range-confirm-cansel-input-picker__popup--" + this.align;
  }

  get dateRange(): DateRange {
    if (this.onMouseEnterDate !== null) {
      return changeDateRange([this.selectDates[0], this.onMouseEnterDate]);
    }

    return this.selectDates.length > 0
      ? changeDateRange(this.selectDates)
      : this.selectedDates;
  }

  get inputDates(): DateRange | null {
    return this.selectDates.length > 0
      ? changeDateRange(this.selectDates)
      : this.selectedDates;

    return this.selectedDates === null ? null : this.dateRange;
  }

  get popupDates(): DateRange | null {
    if (this.selectDates.length > 0) {
      return this.dateRange;
    }
    return this.selectedDates === null ? null : this.dateRange;
  }

  get directSelects(): DirectSelect[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today.getTime());
    yesterday.setDate(yesterday.getDate() - 1);

    const monday = new Date(today.getTime());
    monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));

    const lastMonday = new Date(monday.getTime());
    lastMonday.setDate(lastMonday.getDate() - 7);

    const lastSunday = new Date(lastMonday.getTime());
    lastSunday.setDate(lastSunday.getDate() + 6);

    const lastMonthStart = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1
    );
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    return [
      { name: "昨日", dateRange: { min: yesterday, max: yesterday } },
      { name: "今日", dateRange: { min: today, max: today } },
      { name: "先週", dateRange: { min: lastMonday, max: lastSunday } },
      { name: "先月", dateRange: { min: lastMonthStart, max: lastMonthEnd } }
    ];
  }

  onClick(date: Date) {
    if (this.selectDates.length === 2) {
      this.selectDates = [];
    }

    this.currentButton = "";
    this.selectDates.push(date);
    this.focus = this.dateRangeInput.End;

    if (this.selectDates.length === 2) {
      this.focus = this.dateRangeInput.Start;
      this.onMouseEnterDate = null;
    }
  }

  onDirectClick(directSelect: DirectSelect) {
    if (this.currentButton !== directSelect.name) {
      this.selectDates = [
        directSelect.dateRange.min,
        directSelect.dateRange.max
      ];
      this.currentButton = directSelect.name;
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
    this.currentButton = "";
    this.onClose();
  }

  onOutSideClick() {
    this.onInput(this.dateRange);
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
    if (!this.showDateRangePickerPopup) {
      const date: Date =
        this.inputDates !== null ? this.inputDates.max : new Date();
      this.datePicker = new DatePicker(date);
      this.showDateRangePickerPopup = true;
      this.focus = this.dateRangeInput.Start;
    }
  }

  onClose() {
    this.datePicker = null;
    this.showDateRangePickerPopup = false;
    this.focus = "";
  }
}
</script>

<style scoped lang="scss">
.date-range-confirm-cansel-input-picker {
  position: relative;

  &__header {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid $colorBase400;
  }

  &__body {
    padding: 5px 10px 10px;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    border-top: 1px solid $colorBase500;
  }

  &__popup {
    position: absolute;
    top: 40px;
    width: 750px;
    background-color: $colorWhite;
    box-shadow: 2px 2px 5px $colorShadow100;

    &--left {
      left: 0;
    }

    &--center {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &__direct {
    padding: 5px;
    min-width: 85px;
    border: 1px solid $colorBase400;
    border-radius: 5px;
    background-color: $colorWhite;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: $colorBlue600;
    }

    &:not(:first-child) {
      margin-left: 5px;
    }

    &--current {
      background-color: $colorBlue600;
      font-weight: bold;
      cursor: text;
    }
  }

  &__button {
    margin-left: 10px;
    padding: 10px 10px 8px;
    min-width: 85px;
    border: 1px solid;
    border-radius: 5px;
    background-color: $colorWhite;
    text-align: center;
    font-size: 12px;
    line-height: 1;
    cursor: pointer;
    transition: border-color 0.3s ease, background-color 0.3s ease;

    &--cancel {
      border-color: $colorBase500;
      color: $colorBase800;

      &:hover {
        background-color: $colorBlue600;
      }
    }

    &--apply {
      border-color: $colorBlue900;
      background-color: $colorBlue900;
      color: $colorWhite;

      &:hover {
        border-color: $colorBlue800;
        background-color: $colorBlue800;
      }
    }
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
