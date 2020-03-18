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
      @mouseenter="onMouseEnter(date)"
    >
      <div class="calendar-date-range-table__date" :class="addDateClass(date)">
        {{ date.getDate() }}
      </div>
    </div>
  </CalendarBase>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import {
  Calendar,
  DateRange,
  changeDateRange
} from "@/components/calendar/Calendar";
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
  onClick(date: Date) {}

  @Emit("mouse-enter")
  onMouseEnter(date: Date) {}

  get currentDates(): Date[] {
    return this.selectedDates !== null
      ? [this.selectedDates.min, this.selectedDates.max]
      : [];
  }

  get currentMonthIndex(): number {
    return this.calendar.monthIndex;
  }

  onDateClick(date: Date) {
    if (!this.isDisabled(date) && date.getMonth() === this.currentMonthIndex) {
      this.onClick(date);
    }
  }

  addDateClass(date: Date): string[] {
    const addClass: string[] = [];

    if (date.getMonth() !== this.currentMonthIndex) {
      return ["calendar-date-range-table__date--another-month"];
    }

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

      const dateRange = changeDateRange([selectedMinDate, selectedMaxDate]);

      // 選択済みの日付に付与
      return (
        dateRange.min.getTime() === date.getTime() ||
        dateRange.max.getTime() === date.getTime()
      );
    }

    return false;
  }

  addRangeClass(date: Date): string {
    if (
      this.currentDates.length === 0 ||
      date.getMonth() !== this.calendar.monthIndex
    ) {
      return "";
    }

    const selectedMinDate = this.currentDates[0];
    selectedMinDate.setHours(0, 0, 0, 0);

    const selectedMaxDate =
      this.currentDates.length === 2
        ? this.currentDates[1]
        : this.currentDates[0];
    selectedMaxDate.setHours(0, 0, 0, 0);

    const dateRange = changeDateRange([selectedMinDate, selectedMaxDate]);

    if (
      dateRange.min.getTime() === date.getTime() &&
      dateRange.max.getTime() !== date.getTime()
    ) {
      return "calendar-date-range-table__inner--range-start";
    }

    if (
      dateRange.min.getTime() !== date.getTime() &&
      dateRange.max.getTime() === date.getTime()
    ) {
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

    &--desable {
      background-color: #fbfbfb;
      cursor: text;
      pointer-events: none;
    }

    &:before {
      position: absolute;
      top: 50%;
      z-index: 0;
      margin-top: -12px;
      height: 24px;
      background-color: #f0f5ff;
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
    width: 22px;
    height: 22px;
    border: 2px solid rgba(0, 0, 0, 0);
    border-radius: 50%;
    transition: background-color 0.3s ease;

    &:hover {
      &:not(.calendar-date-range-table__date--selected) {
        background-color: #cfdcff;
        cursor: pointer;
      }
    }

    &--today {
      border-color: #7a9aeb;
      color: #3468eb;
    }

    &--selected {
      background-color: #3468eb;
      color: #fff;
      cursor: pointer;
    }

    &--another-month {
      color: #ccc;
    }
  }
}
</style>
