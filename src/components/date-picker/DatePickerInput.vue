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
        <DatePickerPopup
          :date-picker="datePicker"
          :disabled-dates="disabledDates"
          :selected-date="value"
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
import DatePickerPopup from "@/components/date-picker/DatePickerPopup.vue";

@Component({
  components: { DatePickerPopup }
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

  onBuild() {
    const date: Date = this.value !== null ? this.value : new Date();

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
    height: $formPartsHeight;
    border: 1px solid $colorBase600;
    border-radius: $sizeRadius;
    box-shadow: 0 0 3px rgba($colorBlue900, 0);
    font-size: $basicFontSize;
    line-height: $formPartsHeight;
    transition: box-shadow 0.3s ease, border-color 0.3s ease;
    &::placeholder {
      color: $colorBase700;
    }

    &:disabled {
      border-color: $colorBase500;
      background-color: $colorBase300;
      color: $colorBase600;
    }

    &--focus {
      border-color: $colorBlue800;
      box-shadow: 0 0 3px rgba($colorBlue900, 0.7);
    }
  }
  &__popup {
    position: absolute;
    top: 40px;
    left: 50%;
    padding: 10px;
    min-width: 700px;
    width: 100%;
    box-shadow: 0 1px 4px rgba(#000, 0.1);
    transform: translateX(-50%);
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
