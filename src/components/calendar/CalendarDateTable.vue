<template>
  <CalendarBase
    v-slot:default="{ date }"
    class="calendar-date-table"
    :calendar="calendar"
    @click="onDateClick"
  >
    <div
      class="calendar-date-table__inner"
      :class="{ 'calendar-date-table__inner--desable': isDisabled(date) }"
    >
      <div class="calendar-date-table__date" :class="addDateClass(date)">
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
export default class CalendarDateTable extends Vue {
  @Prop({ type: Calendar, required: true })
  calendar!: Calendar;

  @Prop({ type: Date, default: null })
  selectedDate!: Date;

  @Prop({ type: Object, default: null })
  disabledDates!: DateRange;

  @Emit("click")
  onClick(date: Date) {}

  selectDate: Date | null =
    this.selectedDate !== null ? this.selectedDate : null;

  onDateClick(date: Date) {
    if (!this.isDisabled(date)) {
      this.selectDate = date;
      this.onClick(date);
    }
  }

  addDateClass(date: Date): string[] {
    const addClass: string[] = [];

    // 今日の日付に付与
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date.getTime() === today.getTime()) {
      addClass.push("calendar-date-table__date--today");
    }

    // prop dates の日付に付与
    if (this.isSelectedDate(date)) {
      addClass.push("calendar-date-table__date--selected");
    }

    return addClass;
  }

  isSelectedDate(date: Date): boolean {
    if (this.selectDate instanceof Date) {
      const selectDate = this.selectDate;
      selectDate.setHours(0, 0, 0, 0);
      return selectDate.getTime() === date.getTime();
    }

    return false;
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
.calendar-date-table {
  &__inner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;

    &:not(.calendar-base__cell--another-month):hover {
      color: #7a9aeb;
      cursor: pointer;
    }

    &--desable {
      background-color: #fafafa;
      cursor: text;
      pointer-events: none;
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
