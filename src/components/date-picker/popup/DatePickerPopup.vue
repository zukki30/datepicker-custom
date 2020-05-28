<template>
  <DatePickerPopupContainer
    :date-picker="datePicker"
    @move-year-month="onMoveCalendarButtonClick"
  >
    <CalendarDateTable
      v-for="calendar in calendars"
      :key="calendar.month"
      class="date-picker-popup__calendar"
      :calendar="calendar"
      :selected-date="selectedDate"
      :enabled-period="enabledPeriod"
      @select-date="onSelectDate"
      @mouse-enter-date="onMouseEnterDate"
    />
  </DatePickerPopupContainer>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { DatePickerData } from "@/components/date-picker/DatePickerData";
import { CalendarData } from "@/components/date-picker/CalendarData";
import { DateRange } from "@/components/date-picker/DateRange.ts";
import DatePickerPopupContainer from "@/components/date-picker/popup/DatePickerPopupContainer.vue";
import CalendarDateTable from "@/components/date-picker/calendar/CalendarDateTable.vue";

@Component({
  components: { DatePickerPopupContainer, CalendarDateTable }
})
export default class DatePickerPopup extends Vue {
  @Prop({ type: DatePickerData, required: true })
  datePicker!: DatePickerData;

  @Prop({ type: Date, default: null })
  selectedDate!: Date;

  @Prop({ type: Object, default: null })
  enabledPeriod!: DateRange;

  @Emit("select-date")
  onSelectDate(date: Date) {}

  @Emit("mouse-enter-date")
  onMouseEnterDate(date: Date) {}

  @Emit("move-year-month")
  onMoveCalendarButtonClick(calender: CalendarData) {}

  get calendars(): CalendarData[] {
    return this.datePicker.calendars;
  }
}
</script>

<style scoped lang="scss">
.date-picker-popup__calendar {
  width: 33.3%;

  &:not(:first-child) {
    margin-left: 20px;
  }
}
</style>
