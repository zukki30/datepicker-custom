<template>
  <div class="date-picker-input" :style="{ width }">
    <input
      type="text"
      class="date-picker-input__field"
      readonly
      :placeholder="placeholder"
      :value="formatValue"
      :class="{ 'date-picker-input__field--focus': focus }"
      :disabled="disabled"
      @click="onOpen"
    />

    <Transition name="datePickerPopup" @enter="onChangePosition">
      <div
        v-if="showDatePickerPopup"
        ref="datePickerPopup"
        v-click-outside="onClose"
        class="date-picker-input__popup"
        :style="{ 'margin-left': popupX + 'px' }"
      >
        <DateRangePickerPopup
          :date-picker="datePicker"
          :disabled-dates="disabledDates"
          :selected-dates="dates"
          @click="onInput"
          @move="onMoveCalendar"
          @mouse-enter="onMouseEnter"
        />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Emit } from "vue-property-decorator";
import { DatePicker, dateFormat } from "@/components/date-picker/DatePicker";
import {
  Calendar,
  DateRange,
  changeDateRange
} from "@/components/calendar/Calendar";
import { WidthProperty } from "csstype";
import DateRangePickerPopup from "@/components/date-picker/DateRangePickerPopup.vue";
import { date } from "@storybook/addon-knobs";

@Component({
  components: { DateRangePickerPopup }
})
export default class DatePickerInput extends Vue {
  @Prop({ type: Date, default: null })
  value!: Date;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: String, default: "100%" })
  width!: WidthProperty<0>;

  @Prop({ type: String, default: "" })
  placeholder!: string;

  @Prop({ type: Object, default: null })
  disabledDates!: DateRange;

  @Prop({ type: Object, default: null })
  selectedDates!: DateRange;

  @Emit("input")
  onInput(date: Date) {
    this.onClose();
  }

  @Emit("mouse-enter")
  onMouseEnter(date: Date) {}

  @Emit("open")
  onOpen() {
    this.showDatePickerPopup = true;
    this.focus = true;
    this.onBuild();
  }

  @Emit("close")
  onClose() {
    this.showDatePickerPopup = false;
    this.focus = false;
    this.popupX = 0;
  }

  currentDate: Date | null = null;
  focus: boolean = false;
  showDatePickerPopup: boolean = false;
  datePicker: DatePicker | null = null;
  popupX: number = 0;

  get formatValue(): string {
    return this.value !== null ? dateFormat(this.value) : "";
  }

  get dates(): DateRange | null {
    if (this.selectedDates !== null) {
      return this.selectedDates;
    }

    return this.value === null
      ? null
      : changeDateRange([this.value, this.value]);
  }

  onBuild() {
    let date: Date = this.value !== null ? this.value : new Date();

    if (this.dates !== null) {
      date = this.dates.max;
    }

    this.datePicker = new DatePicker(date);
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
}
</script>

<style scoped lang="scss">
.date-picker-input {
  position: relative;

  &__field {
    padding: 0 10px;
    width: 100%;
    height: 30px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 13px;
    line-height: 30px;
    box-shadow: 0 0 3px rgba(#3468eb, 0);
    transition: box-shadow 0.3s ease, border-color 0.3s ease;
    &:disabled {
      background-color: #eee;
    }

    &--focus {
      border-color: #cfdcff;
      box-shadow: 0 0 3px rgba(#3468eb, 0.7);
    }
  }
  &__popup {
    position: absolute;
    top: 40px;
    left: 50%;
    padding: 10px;
    width: 100%;
    min-width: 700px;
    box-shadow: 2px 2px 5px rgba(#000, 0.1);
    transform: translateX(-50%);
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
