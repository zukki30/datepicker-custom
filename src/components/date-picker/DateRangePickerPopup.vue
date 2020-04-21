<template>
  <div class="date-range-picker-popup">
    <div class="date-range-picker-popup__switch">
      <div class="date-range-picker-popup__previous-button-container">
        <button
          class="date-range-picker-popup__skip-button date-range-picker-popup__one-year-ago"
          :title="oneYearAgoCalendar.title"
          @click="onMoveCalendar(oneYearAgoCalendar)"
        />

        <button
          class="date-range-picker-popup__button date-range-picker-popup__previous"
          :title="previousCalendar.title"
          @click="onMoveCalendar(calendars[1])"
        />
      </div>
      <div class="date-range-picker-popup__next-button-container">
        <button
          class="date-range-picker-popup__button date-range-picker-popup__next"
          :title="nextCalendar.title"
          @click="onMoveCalendar(nextCalendar)"
        />

        <button
          class="date-range-picker-popup__skip-button date-range-picker-popup__one-year-later"
          :title="oneYearLaterCalendar.title"
          @click="onMoveCalendar(oneYearLaterCalendar)"
        />
      </div>
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

  get oneYearAgoCalendar(): Calendar {
    return this.datePicker.oneYearAgoCalendar;
  }

  get oneYearLaterCalendar(): Calendar {
    return this.datePicker.oneYearLaterCalendar;
  }
}
</script>

<style scoped lang="scss">
.date-range-picker-popup {
  position: relative;
  background-color: $colorWhite;

  &__previous-button-container {
    position: absolute;
    top: 5px;
    left: 0;
    display: flex;
  }

  &__next-button-container {
    position: absolute;
    top: 5px;
    right: 0;
    display: flex;
  }

  &__button {
    position: relative;
    width: 12px;
    height: 15px;
    background-color: $colorWhite;
    line-height: 1;
    cursor: pointer;
    transition: border-color 0.3s ease, background-color 0.3s ease;

    &::before {
      position: absolute;
      top: 7px;
      width: 6px;
      height: 6px;
      border-top: 1px solid $colorElmentUIGray600;
      content: "";
      transition: border-color 0.3s ease;
    }

    &:hover {
      &::before {
        border-color: $colorElmentUIBlue900;
      }
    }
  }

  &__previous {
    &::before {
      left: 8px;
      border-left: 1px solid $colorElmentUIGray600;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  &__next {
    &::before {
      right: 8px;
      border-right: 1px solid $colorElmentUIGray600;
      transform: translate(50%, -50%) rotate(45deg);
    }
  }

  &__skip-button {
    position: relative;
    width: 12px;
    height: 15px;
    background-color: $colorWhite;
    line-height: 1;
    cursor: pointer;
    transition: border-color 0.3s ease, background-color 0.3s ease;

    &::before,
    &::after {
      position: absolute;
      top: 7px;
      width: 6px;
      height: 6px;
      border-top: 1px solid $colorElmentUIGray600;
      content: "";
      transition: border-color 0.3s ease;
    }

    &:hover {
      &::before,
      &::after {
        border-color: $colorElmentUIBlue900;
      }
    }
  }

  &__one-year-ago {
    margin-right: 15px;

    &::before,
    &::after {
      border-left: 1px solid $colorElmentUIGray600;
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    &::before {
      left: 7px;
    }
    &::after {
      left: 10px;
    }
  }

  &__one-year-later {
    margin-left: 15px;

    &::before,
    &::after {
      border-right: 1px solid $colorElmentUIGray600;
      transform: translate(50%, -50%) rotate(45deg);
    }

    &::before {
      right: 7px;
    }
    &::after {
      right: 10px;
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
