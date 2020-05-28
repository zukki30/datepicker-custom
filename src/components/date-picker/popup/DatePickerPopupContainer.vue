<template>
  <div class="datePicker-popup-container">
    <div class="datePicker-popup-container__buttonContainer">
      <div class="datePicker-popup-container__previousButtonContainer">
        <button
          class="datePicker-popup-container__yearButton datePicker-popup-container__previousYearButton"
          :title="previousYearCalendar.title"
          @click="onClick(previousYearCalendar)"
        />

        <button
          class="datePicker-popup-container__monthButton datePicker-popup-container__previousMonthButton"
          :title="previousMonthCalendar.title"
          @click="onClick(oneMonthAgoCalendar)"
        />
      </div>
      <div class="datePicker-popup-container__nextButtonContainer">
        <button
          class="datePicker-popup-container__monthButton datePicker-popup-container__nextMonthButton"
          :title="nextMonthCalendar.title"
          @click="onClick(nextMonthCalendar)"
        />

        <button
          class="datePicker-popup-container__yearButton datePicker-popup-container__nextYearButton"
          :title="nextYearCalendar.title"
          @click="onClick(nextYearCalendar)"
        />
      </div>
    </div>

    <div class="datePicker-popup-container__body">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { DatePickerData } from "@/components/date-picker/DatePickerData";
import { CalendarData } from "@/components/date-picker/CalendarData";

@Component
export default class DatePickerPopupContainer extends Vue {
  @Prop({ type: DatePickerData, required: true })
  datePicker!: DatePickerData;

  @Emit("move-year-month")
  onClick(calender: CalendarData) {}

  get calendars(): CalendarData[] {
    return this.datePicker.calendars;
  }

  // 移動自体は1ヶ月単位で行いたいため、previousMonthCalendarではなくこちらを使う
  get oneMonthAgoCalendar(): CalendarData {
    return this.calendars[1];
  }

  get previousMonthCalendar(): CalendarData {
    return this.datePicker.previousMonthCalendar;
  }

  get nextMonthCalendar(): CalendarData {
    return this.datePicker.nextMonthCalendar;
  }

  get previousYearCalendar(): CalendarData {
    return this.datePicker.previousYearCalendar;
  }

  get nextYearCalendar(): CalendarData {
    return this.datePicker.nextYearCalendar;
  }
}
</script>

<style scoped lang="scss">
.datePicker-popup-container {
  position: relative;
  background-color: $colorWhite;
}

.datePicker-popup-container__previousButtonContainer {
  position: absolute;
  top: 3px;
  left: 0;
  display: flex;
}

.datePicker-popup-container__nextButtonContainer {
  position: absolute;
  top: 3px;
  right: 0;
  display: flex;
}

.datePicker-popup-container__monthButton {
  position: relative;
  width: 18px;
  height: 18px;
  background-color: $colorWhite;
  line-height: 1;
  cursor: pointer;
  transition: border-color 0.3s ease, background-color 0.3s ease;

  &::before {
    position: absolute;
    top: 9px;
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

.datePicker-popup-container__previousMonthButton {
  &::before {
    left: 10px;
    border-left: 1px solid $colorElmentUIGray600;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}

.datePicker-popup-container__nextMonthButton {
  &::before {
    right: 10px;
    border-right: 1px solid $colorElmentUIGray600;
    transform: translate(50%, -50%) rotate(45deg);
  }
}

.datePicker-popup-container__yearButton {
  position: relative;
  width: 18px;
  height: 18px;
  background-color: $colorWhite;
  line-height: 1;
  cursor: pointer;
  transition: border-color 0.3s ease, background-color 0.3s ease;

  &::before,
  &::after {
    position: absolute;
    top: 9px;
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

.datePicker-popup-container__previousYearButton {
  margin-right: 12px;

  &::before,
  &::after {
    border-left: 1px solid $colorElmentUIGray600;
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::before {
    left: 9px;
  }
  &::after {
    left: 12px;
  }
}

.datePicker-popup-container__nextYearButton {
  margin-left: 12px;

  &::before,
  &::after {
    border-right: 1px solid $colorElmentUIGray600;
    transform: translate(50%, -50%) rotate(45deg);
  }

  &::before {
    right: 9px;
  }
  &::after {
    right: 12px;
  }
}

.datePicker-popup-container__body {
  display: flex;
  align-items: center;
}
</style>
