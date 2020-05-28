<template>
  <CalendarBase
    class="calendar-date-table"
    :calendar="calendar"
    @select-date="onSelectDateInput"
  >
    <template slot-scope="{ date }">
      <div
        class="calendar-date-table__inner"
        :class="{ 'calendar-date-table__inner--desable': isDisabled(date) }"
        @mouseenter="onMouseEnterDate(date)"
      >
        <div class="calendar-date-table__date" :class="addDateClass(date)">
          {{ date.getDate() }}
        </div>
      </div>
    </template>
  </CalendarBase>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { CalendarData } from "@/components/date-picker/CalendarData";
import { DateRange } from "@/components/date-picker/DateRange.ts";
import { isSameDate } from "@/util/date-util";
import CalendarBase from "@/components/date-picker/calendar/CalendarBase.vue";

@Component({
  components: { CalendarBase }
})
export default class CalendarDateTable extends Vue {
  @Prop({ type: CalendarData, required: true })
  calendar!: CalendarData;

  @Prop({ type: Date, default: null })
  selectedDate!: Date;

  // enabledPeriodで指定した期間のみ有効にする
  // null時は全期間有効
  @Prop({ type: Object, default: null })
  enabledPeriod!: DateRange;

  @Emit("select-date")
  onSelectDate(date: Date) {}

  @Emit("mouse-enter-date")
  onMouseEnterDate(date: Date) {}

  get currentMonthIndex(): number {
    return this.calendar.monthIndex;
  }

  onSelectDateInput(date: Date) {
    if (!this.isDisabled(date)) {
      this.onSelectDate(date);
    }
  }

  addDateClass(date: Date): string[] {
    const addClass: string[] = [];

    if (date.getMonth() !== this.currentMonthIndex) {
      return ["calendar-date-table__date--anotherMonth"];
    }

    // 今日の日付に付与
    const today = new Date();
    if (isSameDate(today, date)) {
      addClass.push("calendar-date-table__date--today");
    }

    // prop dates の日付に付与
    if (this.isSelectedDate(date)) {
      addClass.push("calendar-date-table__date--selected");
    }

    return addClass;
  }

  isSelectedDate(date: Date): boolean {
    if (this.selectedDate instanceof Date) {
      return isSameDate(this.selectedDate, date);
    }

    return false;
  }

  isDisabled(date: Date): boolean {
    if (this.enabledPeriod !== null) {
      const disabledMinDate = this.enabledPeriod.min;
      disabledMinDate.setHours(0, 0, 0, 0);

      const disabledMaxDate = this.enabledPeriod.max;
      disabledMaxDate.setHours(0, 0, 0, 0);

      return (
        date.getTime() < disabledMinDate.getTime() ||
        date.getTime() > disabledMaxDate.getTime()
      );
    }

    return false;
  }
}
</script>

<style scoped lang="scss">
.calendar-date-table__inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: $datePickerCellHeight;

  &:not(.calendar-date-table__inner--desable):hover {
    color: $colorElmentUIBlue900;
    cursor: pointer;
  }
}

.calendar-date-table__inner--desable {
  background-color: $colorElmentUIGray100;
  color: $colorElmentUIGray300;
  pointer-events: none;
}

.calendar-date-table__date {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 2px solid $colorClear;
  border-radius: 50%;
}

.calendar-date-table__date--today {
  color: $colorElmentUIBlue900;
  font-weight: bold;
}

.calendar-date-table__date--selected {
  background-color: $colorElmentUIBlue900;
  color: $colorWhite;
  cursor: pointer;
}

.calendar-date-table__date--anotherMonth {
  color: $colorElmentUIGray300;
}
</style>
