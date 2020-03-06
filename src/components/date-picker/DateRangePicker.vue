<template>
  <div class="date-range-picker" :style="{ width }">
    <DateRangePickerContainer
      :dates="dates"
      :disabled="disabled"
      :focus="focus"
      @input="onOopen"
    />

    <div
      v-if="showDateRangePickerPopup"
      v-click-outside="onClose"
      class="date-range-picker__popup"
    >
      <DateRangePickerPopup
        :date-picker="datePicker"
        :selected-dates="dates"
        :disabled-dates="disabledDates"
        @click="onClick"
        @move="onMoveCalendar"
        @mouse-enter="onMouseEnter"
      />
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
import DateRangePickerPopup from "@/components/date-picker/DateRangePickerPopup.vue";
import DateRangePickerContainer from "@/components/date-picker/DateRangePickerContainer.vue";

@Component({
  components: { DateRangePickerPopup, DateRangePickerContainer }
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
    if (this.selectDates.length === 1) {
      return this.dateRange;
    }
    return this.selectedDates === null ? null : this.dateRange;
  }

  created() {
    const date: Date = this.dates !== null ? this.dates.max : new Date();
    this.datePicker = new DatePicker(date);
  }

  onClick(date: Date) {
    this.selectDates.push(date);
    this.focus = this.dateRangeInput.End;

    if (this.selectDates.length === 2) {
      this.onInput(this.dateRange);
      this.onClose();
      this.selectDates = [];
      this.onMouseEnterDate = null;
    }
  }

  onMoveCalendar(calendar: Calendar) {
    this.datePicker = DatePicker.rebuild(calendar);
  }

  onMouseEnter(date: Date) {
    if (this.selectDates.length === 1) {
      this.onMouseEnterDate = date;
      console.log(this.onMouseEnterDate);
    }
  }

  onOopen() {
    this.showDateRangePickerPopup = true;
    this.focus = this.dateRangeInput.Start;
  }

  onClose() {
    this.showDateRangePickerPopup = false;
    this.focus = "";
  }
}
</script>

<style scoped lang="scss">
.date-range-picker {
  position: relative;

  &__popup {
    position: absolute;
    top: 40px;
    padding: 10px;
    width: 800px;
    box-shadow: 2px 2px 5px rgba(#000, 0.1);
  }
}
</style>
