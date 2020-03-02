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
            :class="addDayClass(date)"
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave"
            @click="onClick"
          >
            {{ date.getDate() }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Emit } from "vue-property-decorator";
import { Calendar, Table, Week } from "@/components/calendar/Calendar";

@Component
export default class CalendarTable extends Vue {
  @Prop({ type: Calendar, required: true })
  calendar!: Calendar;

  @Emit("mouse-enter")
  onMouseEnter(date: Date) {}

  @Emit("mouse-leave")
  onMouseLeave(date: Date) {}

  @Emit("click")
  onClick(date: Date) {}

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

  addWeekClass(week: string) {
    if (week === "Sun") {
      return "calendar-table__cell--sun";
    }

    if (week === "Sat") {
      return "calendar-table__cell--sat";
    }
  }

  addDayClass(date: Date): string[] {
    const addClass: string[] = [];

    if (date.getMonth() !== this.currentMonthIndex) {
      addClass.push("calendar-table__cell--another-month");
    }

    return addClass;
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
    padding: 5px;
    height: $cellHeight;
    vertical-align: middle;
    text-align: center;
    font-size: 12px;

    &--sun {
      color: #eb4034;
    }

    &--sat {
      color: #3468eb;
    }

    &--another-month {
      color: #ccc;
    }
  }
}
</style>
