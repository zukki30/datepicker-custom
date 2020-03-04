<template>
  <div class="date-range-picker-popup">
    <div class="date-range-picker-popup__switch">
      <button
        class="date-range-picker-popup__button date-range-picker-popup__previous"
        @click="onMoveCalendar(calendars[1])"
      >
        {{ previousCalendar.title }}
      </button>
      <button
        class="date-range-picker-popup__button date-range-picker-popup__next"
        @click="onMoveCalendar(nextCalendar)"
      >
        {{ nextCalendar.title }}
      </button>
    </div>
    <div class="date-range-picker-popup__body">
      <CalendarDateRangeTable
        v-for="calendar in calendars"
        :key="calendar.month"
        class="date-range-picker-popup__calendar"
        :calendar="calendar"
        :selected-dates="selectedDates"
        :disabled-dates="disabledDates"
        @click="onClick"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { DatePicker } from "@/components/date-picker/DatePicker";
import { Calendar, DateRange } from "@/components/calendar/Calendar";
import CalendarDateRangeTable from "@/components/calendar/CalendarDateRangeTable.vue";

@Component({
  components: { CalendarDateRangeTable }
})
export default class DateRangePickerPopup extends Vue {
  @Prop({ type: DatePicker, required: true })
  datePicker!: DatePicker;

  @Prop({ type: Object, default: null })
  selectedDates!: DateRange;

  @Prop({ type: Object, default: null })
  disabledDates!: DateRange;

  @Emit("click")
  onClick(date: Date) {}

  @Emit("move")
  onMoveCalendar(calender: Calendar) {}

  get calendars(): Calendar[] {
    return this.datePicker.calendars;
  }

  get previousCalendar(): Calendar {
    return this.datePicker.previousCalendar;
  }

  get nextCalendar(): Calendar {
    return this.datePicker.nextCalendar;
  }
}
</script>

<style scoped lang="scss">
.date-range-picker-popup {
  position: relative;
  background-color: #fff;

  &__button {
    position: absolute;
    top: 0;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
    font-size: 12px;
    line-height: 1;
    cursor: pointer;
    &:hover {
      background-color: #f2f5fc;
    }
  }

  &__previous {
    left: 0;
  }

  &__next {
    right: 0;
  }

  &__body {
    display: flex;
    align-items: center;
  }

  &__calendar {
    &:not(:first-child) {
      margin-left: 20px;
    }
  }
}
</style>
