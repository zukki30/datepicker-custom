<template>
  <div class="date-range-picker-popup">
    <div class="date-range-picker-popup__switch">
      <button
        class="date-range-picker-popup__button date-range-picker-popup__previous"
        :title="previousCalendar.title"
        @click="onMoveCalendar(calendars[1])"
      ></button>
      <button
        class="date-range-picker-popup__button date-range-picker-popup__next"
        :title="nextCalendar.title"
        @click="onMoveCalendar(nextCalendar)"
      ></button>
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
        @mouse-enter="onMouseEnter"
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

  @Emit("mouse-enter")
  onMouseEnter(event: MouseEvent): void {}

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
  background-color: $colorWhite;

  &__button {
    position: absolute;
    top: 0;
    padding: 5px;
    width: 25px;
    height: 25px;
    border: 1px solid $colorBase500;
    border-radius: 50%;
    background-color: $colorWhite;
    font-size: 12px;
    line-height: 1;
    cursor: pointer;
    transition: border-color 0.3s ease, background-color 0.3s ease;

    &::before {
      position: absolute;
      top: 50%;
      width: 7px;
      height: 7px;
      border-top: 2px solid $colorBase500;
      content: "";
      transition: border-color 0.3s ease;
    }

    &:hover {
      background-color: $colorBlue600;
    }
  }

  &__previous {
    left: 0;

    &::before {
      left: 50%;
      margin-left: 5%;
      border-left: 2px solid $colorBase500;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  &__next {
    right: 0;

    &::before {
      right: 50%;
      margin-right: 3%;
      border-right: 2px solid $colorBase500;
      transform: translate(50%, -50%) rotate(45deg);
    }
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
