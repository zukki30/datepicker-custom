<template>
  <div class="calendar-table">
    <div class="calendar-table__title">{{ title }}</div>
    <table class="calendar-table__body">
      <thead>
        <tr>
          <th
            v-for="(week, index) in weeks"
            :key="index"
            class="calendar-table__cell"
          >
            {{ week }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in table" :key="index">
          <td
            v-for="date in row"
            :key="date.getDate()"
            class="calendar-table__cell"
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
import { Calendar, Table } from "@/components/calendar/Calendar";

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

  get weeks(): string[] {
    return this.calendar.weekTexts;
  }

  get table(): Table {
    return this.calendar.table;
  }
}
</script>

<style scoped lang="scss">
.calendar-table {
  &__title {
    padding: 10px;
    border-bottom: 1px solid $colorBase500;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
  }

  &__body {
    width: 100%;
    table-layout: fixed;
  }

  &__cell {
    padding: 10px;
    vertical-align: middle;
    text-align: center;
    font-size: 12px;
  }
}
</style>
