<template>
  <div class="calendar-base">
    <div class="calendar-base__title">
      <span class="calendar-base__text" v-text="title" />
    </div>
    <table class="calendar-base__body">
      <thead>
        <tr>
          <th
            v-for="day in dayOfWeek"
            :key="day.id"
            class="calendar-base__cell"
          >
            {{ day.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, index) in table" :key="index">
          <td
            v-for="date in week"
            :key="date.getDate()"
            class="calendar-base__cell calendar-base__bodyCell"
            @click="onSelectDate(date)"
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
import {
  CalendarData,
  CalendarTable,
  Week
} from "@/components/date-picker/CalendarData";

@Component
export default class CalendarBase extends Vue {
  @Prop({ type: CalendarData, required: true })
  calendar!: CalendarData;

  @Emit("select-date")
  onSelectDate(date: Date) {}

  get title(): string {
    return this.calendar.title;
  }

  get dayOfWeek(): Week[] {
    return this.calendar.weekTexts;
  }

  get table(): CalendarTable {
    const date = new Date(this.calendar.year, this.calendar.month, 0);
    return CalendarData.buildCalendarTable(date);
  }
}
</script>

<style scoped lang="scss">
.calendar-base__title {
  display: flex;
  align-items: center;
  justify-content: center;
  height: $datePickerCellHeight;
  border-bottom: 1px solid $colorBase400;
  text-align: center;
}

.calendar-base__text {
  display: inline-block;
  padding: 5px 10px 0;
  height: $datePickerCellHeight;
}

.calendar-base__body {
  margin-top: 5px;
  width: 100%;
  table-layout: fixed;
}

.calendar-base__cell {
  height: $datePickerCellHeight;
  color: $colorElmentUIGray600;
  vertical-align: middle;
  text-align: center;
  font-size: 12px;
}

.calendar-base__bodyCell {
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>
