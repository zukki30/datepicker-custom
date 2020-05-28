<template>
  <CalendarBase
    class="calendar-date-range-table"
    :calendar="calendar"
    @select-date="onSelectDateInput"
  >
    <template slot-scope="{ date }">
      <div
        class="calendar-date-range-table__inner"
        :class="[
          addRangeClass(date),
          { 'calendar-date-range-table__inner--desable': isDisabled(date) }
        ]"
        @mouseenter="onMouseEnterDate(date)"
      >
        <div
          class="calendar-date-range-table__date"
          :class="addDateClass(date)"
        >
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
export default class CalendarDateRangeTable extends Vue {
  @Prop({ type: CalendarData, required: true })
  calendar!: CalendarData;

  @Prop({ type: Object, default: null })
  selectedPeriod!: DateRange;

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
      return ["calendar-date-range-table__date--anotherMonth"];
    }

    // 今日の日付に付与
    const today = new Date();
    if (isSameDate(today, date)) {
      addClass.push("calendar-date-range-table__date--today");
    }

    // prop selectedPeriod の日付に付与
    if (this.isSelectedDate(date)) {
      addClass.push("calendar-date-range-table__date--selected");
    }

    return addClass;
  }

  isSelectedDate(date: Date): boolean {
    if (this.selectedPeriod !== null) {
      // 選択済みの日付に付与
      return (
        isSameDate(this.selectedPeriod.min, date) ||
        isSameDate(this.selectedPeriod.max, date)
      );
    }

    return false;
  }

  addRangeClass(date: Date): string {
    if (
      this.selectedPeriod === null ||
      date.getMonth() !== this.calendar.monthIndex
    ) {
      return "";
    }

    const selectedMinDate = this.selectedPeriod.min;
    selectedMinDate.setHours(0, 0, 0, 0);

    const selectedMaxDate = this.selectedPeriod.max;
    selectedMaxDate.setHours(0, 0, 0, 0);

    if (
      isSameDate(selectedMinDate, date) &&
      !isSameDate(selectedMaxDate, date)
    ) {
      return "calendar-date-range-table__inner--rangeStart";
    }

    if (
      !isSameDate(selectedMinDate, date) &&
      isSameDate(selectedMaxDate, date)
    ) {
      return "calendar-date-range-table__inner--rangeEnd";
    }

    if (
      selectedMaxDate.getTime() > date.getTime() &&
      selectedMinDate.getTime() < date.getTime()
    ) {
      return "calendar-date-range-table__inner--range";
    }

    return "";
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
.calendar-date-range-table__inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: $datePickerCellHeight;

  &:before,
  &:after {
    position: absolute;
    top: 0;
    z-index: 0;
    height: $datePickerCellHeight;
    background-color: $colorElmentUIBlue100;
    content: "";
  }

  &:after {
    left: 50%;
    width: $datePickerCellHeight;
    border-radius: 50%;
    opacity: 0;
    transform: translateX(-50%);
  }
}

.calendar-date-range-table__inner--desable {
  background-color: $colorElmentUIGray100;
  color: $colorElmentUIGray300;
  pointer-events: none;
}

.calendar-date-range-table__inner--range {
  &:before {
    left: 0;
    width: 100%;
  }
}

.calendar-date-range-table__inner--rangeStart {
  &:before {
    right: 0;
    width: 50%;
  }
  &:after {
    opacity: 1;
  }
}

.calendar-date-range-table__inner--rangeEnd {
  &:before {
    left: 0;
    width: 50%;
  }
  &:after {
    opacity: 1;
  }
}

.calendar-date-range-table__date {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    &:not(.calendar-date-range-table__date--selected) {
      color: $colorElmentUIBlue900;
      cursor: pointer;
    }
  }
}

.calendar-date-range-table__date--today {
  color: $colorElmentUIBlue900;
  font-weight: bold;
}

.calendar-date-range-table__date--selected {
  background-color: $colorElmentUIBlue900;
  color: $colorWhite;
  cursor: pointer;
}

.calendar-date-range-table__date--anotherMonth {
  color: $colorElmentUIGray300;
}
</style>
