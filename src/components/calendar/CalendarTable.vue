<template>
  <div class="calendar-table">
    <div class="calendar-table__title">{{ title }}</div>
    <table class="calendar-table__body">
      <thead>
        <tr>
          <th
            v-for="week in weeks"
            :key="week.id"
            class="calendar-table__cell"
            :class="addWeekClass(week.id)"
          >
            {{ week.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in table" :key="index">
          <td
            v-for="date in row"
            :key="date.getDate()"
            class="calendar-table__cell"
            @click="onDateClick(date)"
          >
            <div class="calendar-table__inner" :class="addRangeClass(date)">
              <div class="calendar-table__date" :class="addDateClass(date)">
                {{ date.getDate() }}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Emit } from "vue-property-decorator";
import {
  Calendar,
  Table,
  Week,
  DateRange
} from "@/components/calendar/Calendar";

@Component
export default class CalendarTable extends Vue {
  @Model("input", { type: [Object, Date], default: null })
  dates!: DateRange | Date | null;

  @Prop({ type: Calendar, required: true })
  calendar!: Calendar;

  @Prop({ type: Boolean, default: false })
  rangeMode!: boolean;

  @Emit("click")
  onClick(dates: DateRange | Date) {}

  get title(): string {
    return this.calendar.title;
  }

  get currentMonthIndex(): number {
    return this.calendar.monthIndex;
  }

  get weeks(): Week[] {
    return this.calendar.weekTexts;
  }

  get table(): Table {
    return this.calendar.table;
  }

  selectedDates: Date[] = [];

  onDateClick(date: Date) {
    if (!this.rangeMode) {
      this.onClick(date);
      return;
    }

    this.selectedDates.push(date);
    if (this.selectedDates.length === 2) {
      this.onClick({
        min:
          this.selectedDates[0] > this.selectedDates[1]
            ? this.selectedDates[1]
            : this.selectedDates[0],
        max:
          this.selectedDates[0] > this.selectedDates[1]
            ? this.selectedDates[0]
            : this.selectedDates[1]
      });
      this.selectedDates = [];
    }
  }

  addWeekClass(week: string) {
    if (week === "Sun") {
      return "calendar-table__cell--sun";
    }

    if (week === "Sat") {
      return "calendar-table__cell--sat";
    }
  }

  addDateClass(date: Date): string[] {
    const addClass: string[] = [];

    // 別の月のセルに付与
    if (date.getMonth() !== this.currentMonthIndex) {
      addClass.push("calendar-table__date--another-month");
    }

    // 今日の日付に付与
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date.getTime() === today.getTime()) {
      addClass.push("calendar-table__date--today");
    }

    // prop dates の日付に付与
    if (this.isSelectedDate(date)) {
      addClass.push("calendar-table__date--selected");
    }

    return addClass;
  }

  isSelectedDate(date: Date): boolean {
    if (this.dates === null) {
      return false;
    }

    if (this.dates instanceof Date) {
      const selectedDate = this.dates;
      selectedDate.setHours(0, 0, 0, 0);
      return selectedDate.getTime() === date.getTime();
    }

    const selectedMinDate = this.dates.min;
    selectedMinDate.setHours(0, 0, 0, 0);
    const selectedMaxDate = this.dates.max;
    selectedMaxDate.setHours(0, 0, 0, 0);
    // 選択済みの日付に付与
    return (
      selectedMinDate.getTime() === date.getTime() ||
      selectedMaxDate.getTime() === date.getTime()
    );
  }

  addRangeClass(date: Date): string {
    if (
      this.rangeMode &&
      this.dates !== null &&
      !(this.dates instanceof Date)
    ) {
      const selectedMinDate = this.dates.min;
      selectedMinDate.setHours(0, 0, 0, 0);
      const selectedMaxDate = this.dates.max;
      selectedMaxDate.setHours(0, 0, 0, 0);

      if (selectedMinDate.getTime() === date.getTime()) {
        return "calendar-table__inner--range-start";
      }

      if (selectedMaxDate.getTime() === date.getTime()) {
        return "calendar-table__inner--range-end";
      }

      if (
        selectedMaxDate.getTime() > date.getTime() &&
        selectedMinDate.getTime() < date.getTime()
      ) {
        return "calendar-table__inner--range";
      }
    }

    return "";
  }
}
</script>

<style scoped lang="scss">
$cellHeight: 35px;

.calendar-table {
  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: $cellHeight;
    border-bottom: 1px solid #eee;
    text-align: center;
    font-weight: bold;
  }

  &__body {
    width: 100%;
    color: #111;
    table-layout: fixed;
  }

  &__cell {
    height: $cellHeight;
    vertical-align: middle;
    text-align: center;
    font-size: 12px;
    &:hover {
      color: #7a9aeb;
      cursor: pointer;
    }

    &--sun {
      color: #eb4034;
    }

    &--sat {
      color: #3468eb;
    }
  }

  &__inner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: $cellHeight;
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

    &--another-month {
      color: #ccc;
    }

    &--selected {
      background-color: #3468eb;
      color: #fff;
    }
  }
}
</style>
