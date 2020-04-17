<template>
  <div v-click-outside="onClose" class="date-range-picker" :style="{ width }">
    <DateRangePickerContainer
      :dates="inputDates"
      :disabled="disabled"
      :focus="focus"
      @input="onOpen"
    />

    <div v-if="showDateRangePickerPopup" class="date-range-picker__popup">
      <div class="date-range-picker__header">
        <PeriodDirectSelect v-model="value" @click="onDirectSelectClick" />
      </div>
      <div class="date-range-picker__body">
        <DateRangePickerPopup
          :date-picker="datePicker"
          :selected-dates="popupDates"
          :disabled-dates="disabledDates"
          @click="onClick"
          @move="onMoveCalendar"
          @mouse-enter="onMouseEnter"
        />
      </div>
    </div>
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
import { DirectSelect } from "@/components/date-picker/DatePicker";
import DateRangePickerPopup from "@/components/date-picker/DateRangePickerPopup.vue";
import DateRangePickerContainer from "@/components/date-picker/DateRangePickerContainer.vue";
import PeriodDirectSelect from "@/components/date-picker/PeriodDirectSelect.vue";

@Component({
  components: {
    DateRangePickerPopup,
    DateRangePickerContainer,
    PeriodDirectSelect
  }
})
export default class DateRangePicker extends Vue {
  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: String, default: "350px" })
  width!: WidthProperty<0>;

  @Prop({ type: Object, default: null })
  disabledDates!: DateRange;

  @Prop({ type: Object, default: null })
  selectedDates!: DateRange;

  @Emit("input")
  onInput(dates: DateRange | null) {
    this.value = "";
  }

  @Emit("click")
  onDirectSelectClick(directSelect: DirectSelect) {
    this.value = directSelect.name;
    this.onClose();
  }

  value: string = "";
  focus: string = "";
  selectDates: Date[] = [];
  datePicker: DatePicker | null = null;
  showDateRangePickerPopup: boolean = false;
  dateRangeInput = DateRangeInput;
  onMouseEnterDate: Date | null = null;

  get dateRange(): DateRange {
    if (this.onMouseEnterDate !== null) {
      if (this.selectedDates !== null && this.selectDates.length === 0) {
        return changeDateRange([this.onMouseEnterDate, this.selectedDates.max]);
      }

      return changeDateRange([this.selectDates[0], this.onMouseEnterDate]);
    }

    return this.selectDates.length > 0
      ? changeDateRange(this.selectDates)
      : this.selectedDates;
  }

  get popupDates(): DateRange | null {
    if (this.selectDates.length === 1) {
      return this.dateRange;
    }
    return this.selectedDates === null ? null : this.dateRange;
  }

  get inputDates(): DateRange | null {
    const dateRange =
      this.selectDates.length > 0
        ? changeDateRange(this.selectDates)
        : this.selectedDates;

    if (this.selectDates.length === 1) {
      return dateRange;
    }
    return this.selectedDates === null ? null : dateRange;
  }

  created() {
    const date: Date =
      this.inputDates !== null ? this.inputDates.max : new Date();
    this.datePicker = new DatePicker(date);
  }

  onClick(date: Date) {
    this.value = "";
    this.selectDates.push(date);
    this.focus = this.dateRangeInput.End;

    if (this.selectDates.length === 2) {
      this.onInput(this.dateRange);
      this.onClose();
    }
  }

  onMoveCalendar(calendar: Calendar) {
    this.datePicker = DatePicker.rebuild(calendar);
  }

  onMouseEnter(date: Date) {
    this.onMouseEnterDate = date;
  }

  onOpen() {
    this.showDateRangePickerPopup = true;
    this.focus = this.dateRangeInput.Start;

    if (this.selectedDates !== null) {
      this.datePicker = new DatePicker(this.selectedDates.max);
    }
  }

  onClose() {
    this.showDateRangePickerPopup = false;
    this.focus = "";
    this.selectDates = [];
    this.onMouseEnterDate = null;
  }
}
</script>

<style scoped lang="scss">
.date-range-picker {
  position: relative;

  &__popup {
    position: absolute;
    top: 40px;
    width: 800px;
    box-shadow: 2px 2px 5px rgba(#000, 0.1);
  }

  &__header {
    padding: 10px;
    border-bottom: 1px solid $colorBase400;
  }

  &__body {
    padding: 10px;
  }
}
</style>
