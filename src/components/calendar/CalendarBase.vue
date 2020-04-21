<template>
  <div class="calendar-base">
    <div class="calendar-base__title">
      <span class="calendar-base__text" v-text="title" />
    </div>
    <table class="calendar-base__body">
      <thead>
        <tr>
          <th
            v-for="week in weeks"
            :key="week.id"
            class="calendar-base__cell  calendar-base__head-cell"
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
            class="calendar-base__cell calendar-base__body-cell"
            @click="onClick(date)"
          >
            <slot :date="date" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { Calendar, Table, Week } from "@/components/calendar/Calendar";

@Component
export default class CalendarBase extends Vue {
  @Prop({ type: Calendar, required: true })
  calendar!: Calendar;

  @Emit("click")
  onClick(date: Date) {}

  get title(): string {
    return this.calendar.title;
  }

  get weeks(): Week[] {
    return this.calendar.weekTexts;
  }

  get table(): Table {
    const date = new Date(this.calendar.year, this.calendar.month, 0);

    return Calendar.buildCalendarTable(date);
  }
}
</script>

<style scoped lang="scss">
.calendar-base {
  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: $cellHeight;
    border-bottom: 1px solid $colorElmentUIGray200;
    text-align: center;
  }

  &__text {
    display: inline-block;
    padding: 8px 10px 0;
    height: $cellHeight;
  }

  &__body {
    width: 100%;
    table-layout: fixed;
  }

  &__cell {
    height: $cellHeight;
    color: $colorElmentUIGray600;
    vertical-align: middle;
    text-align: center;
    font-size: 12px;
  }

  &__body-cell {
    padding-top: 2px;
    padding-bottom: 2px;
  }
}
</style>
