<template>
  <div class="calendar-base">
    <div class="calendar-base__title">{{ title }}</div>
    <table class="calendar-base__body">
      <thead>
        <tr>
          <th
            v-for="week in weeks"
            :key="week.id"
            class="calendar-base__cell"
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
    return this.calendar.table;
  }

  addWeekClass(week: string) {
    if (week === "Sun") {
      return "calendar-base__cell--sun";
    }

    if (week === "Sat") {
      return "calendar-base__cell--sat";
    }
  }
}
</script>

<style scoped lang="scss">
$cellHeight: 35px;

.calendar-base {
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

    &--sun {
      color: #eb4034;
    }

    &--sat {
      color: #3468eb;
    }
  }

  &__body-cell {
    padding-top: 2px;
    padding-bottom: 2px;
  }
}
</style>
