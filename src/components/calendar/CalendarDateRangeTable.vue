<template>
  <CalendarBase
    v-slot:default="{ date }"
    class="calendar-date-table"
    :calendar="calendar"
    @click="onDateClick"
  >
    <div
      class="calendar-date-range-table__inner"
      :class="[
        addRangeClass(date),
        { 'calendar-date-range-table__inner--desable': isDisabled(date) }
      ]"
    >
      <div class="calendar-date-range-table__date" :class="addDateClass(date)">
        {{ date.getDate() }}
      </div>
    </div>
  </CalendarBase>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { Calendar, DateRange } from "@/components/calendar/Calendar";
import CalendarBase from "@/components/calendar/CalendarBase.vue";

@Component({
  components: { CalendarBase }
})
export default class CalendarDateRangeTable extends Vue {
  @Prop({ type: Calendar, required: true })
  calendar!: Calendar;

  @Prop({ type: Object, default: null })
  selectedDates!: DateRange;

  @Prop({ type: Object, default: null })
  disabledDates!: DateRange;

  @Emit("click")
  onClick(dates: DateRange) {}

  selectDates: Date[] = this.currentDates;

  get currentDates(): Date[] {
    return this.selectedDates !== null
      ? [this.selectedDates.min, this.selectedDates.max]
      : [];
  }

  onDateClick(date: Date) {
    if (this.isDisabled(date)) {
      return;
    }

    if (this.selectDates.length === 2) {
      this.selectDates = [];
    }

    this.selectDates.push(date);

    const dateRange = this.changeDateRange(this.selectDates);
    this.onClick(dateRange);
  }

  addDateClass(date: Date): string[] {
    const addClass: string[] = [];

    // 今日の日付に付与
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date.getTime() === today.getTime()) {
      addClass.push("calendar-date-range-table__date--today");
    }

    // prop dates の日付に付与
    if (this.isSelectedDate(date)) {
      addClass.push("calendar-date-range-table__date--selected");
    }

    return addClass;
  }

  isSelectedDate(date: Date): boolean {
    if (this.currentDates.length > 0) {
      const selectedMinDate = this.currentDates[0];
      selectedMinDate.setHours(0, 0, 0, 0);

      const selectedMaxDate =
        this.currentDates.length === 2
          ? this.currentDates[1]
          : this.currentDates[0];
      selectedMaxDate.setHours(0, 0, 0, 0);

      const dateRange = this.changeDateRange([
        selectedMinDate,
        selectedMaxDate
      ]);

      // 選択済みの日付に付与
      return (
        dateRange.min.getTime() === date.getTime() ||
        dateRange.max.getTime() === date.getTime()
      );
    }

    return false;
  }

  addRangeClass(date: Date): string {
    if (this.currentDates.length === 0) {
      return "";
    }

    const selectedMinDate = this.currentDates[0];
    selectedMinDate.setHours(0, 0, 0, 0);

    const selectedMaxDate =
      this.currentDates.length === 2
        ? this.currentDates[1]
        : this.currentDates[0];
    selectedMaxDate.setHours(0, 0, 0, 0);

    const dateRange = this.changeDateRange([selectedMinDate, selectedMaxDate]);

    if (dateRange.min.getTime() === date.getTime()) {
      return "calendar-date-range-table__inner--range-start";
    }

    if (dateRange.max.getTime() === date.getTime()) {
      return "calendar-date-range-table__inner--range-end";
    }

    if (
      dateRange.max.getTime() > date.getTime() &&
      dateRange.min.getTime() < date.getTime()
    ) {
      return "calendar-date-range-table__inner--range";
    }

    return "";
  }

  changeDateRange(dates: Date[]): DateRange {
    const dateRange: DateRange = {
      min: dates[1] > dates[0] ? dates[0] : dates[1],
      max: dates[1] > dates[0] ? dates[1] : dates[0]
    };
    return dateRange;
  }

  isDisabled(date: Date): boolean {
    if (this.disabledDates !== null) {
      return (
        date.getTime() < this.disabledDates.min.getTime() ||
        date.getTime() > this.disabledDates.max.getTime()
      );
    }
    return false;
  }
}
</script>

<style scoped lang="scss">
$cellHeight: 35px;

.calendar-date-range-table {
  &__inner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: $cellHeight;

    &:not(.calendar-date-range-table__inner--desable):hover {
      color: #7a9aeb;
      cursor: pointer;
    }

    &--desable {
      background-color: #fafafa;
      cursor: text;
      pointer-events: none;
    }

    &:before {
      position: absolute;
      top: 50%;
      z-index: 0;
      margin-top: -12px;
      height: 24px;
      background-color: #f2f5fc;
      content: "";
    }

    &--range {
      &:before {
        left: 0;
        width: 100%;
      }
    }

    &--range-start {
      &:before {
        right: 0;
        width: 50%;
      }
    }

    &--range-end {
      &:before {
        left: 0;
        width: 50%;
      }
    }
  }

  &__date {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: 2px solid rgba(0, 0, 0, 0);
    border-radius: 50%;

    &--today {
      border-color: #7a9aeb;
      color: #3468eb;
    }

    &--selected {
      background-color: #3468eb;
      color: #fff;
    }
  }
}
</style>
