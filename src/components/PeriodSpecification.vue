<template>
  <div class="period-specification">
    <DateRangePicker
      :selected-dates="dateRange"
      :disabled-dates="disabledDates"
      @input="onInput"
    />

    <div class="period-specification__directly-select">
      <div
        v-for="directSelect in directSelects"
        :key="directSelect.dateRange.min.getDate()"
        class="period-specification__button"
        :class="{
          'period-specification__button--current':
            currentButton === directSelect.name
        }"
        @click="onClick(directSelect)"
      >
        {{ directSelect.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Emit } from "vue-property-decorator";
import {
  DatePicker,
  DateRangeInput
} from "@/components/date-picker/DatePicker";
import {
  Calendar,
  DateRange,
  changeDateRange
} from "@/components/calendar/Calendar";
import DateRangePicker from "@/components/date-picker/DateRangePicker.vue";

interface DirectSelect {
  name: string;
  dateRange: DateRange;
}

@Component({
  components: { DateRangePicker }
})
export default class PeriodSpecification extends Vue {
  dateRange: DateRange | null = null;
  currentButton: string = "";

  get disabledDates(): DateRange {
    return {
      min: new Date("2019-12-15"),
      max: new Date("2020-03-20")
    };
  }

  get directSelects() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today.getTime());
    yesterday.setDate(yesterday.getDate() - 1);

    const monday = new Date(today.getTime());
    monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));

    const lastMonday = new Date(monday.getTime());
    lastMonday.setDate(lastMonday.getDate() - 7);

    const lastSunday = new Date(lastMonday.getTime());
    lastSunday.setDate(lastSunday.getDate() + 6);

    const lastMonthStart = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1
    );
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    return [
      { name: "昨日", dateRange: { min: yesterday, max: yesterday } },
      { name: "今日", dateRange: { min: today, max: today } },
      { name: "先週", dateRange: { min: lastMonday, max: lastSunday } },
      { name: "先月", dateRange: { min: lastMonthStart, max: lastMonthEnd } }
    ];
  }

  onInput(dateRange: DateRange) {
    this.dateRange = dateRange;
    this.currentButton = "";
  }

  onClick(directSelect: DirectSelect) {
    if (this.currentButton !== directSelect.name) {
      this.dateRange = directSelect.dateRange;
      this.currentButton = directSelect.name;
    }
  }
}
</script>

<style scoped lang="scss">
.period-specification {
  &__directly-select {
    display: flex;
    margin-top: 10px;
  }

  &__button {
    padding: 5px;
    min-width: 85px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
    text-align: center;
    cursor: pointer;

    &:hover {
      background-color: #f2f5fc;
    }

    &:not(:first-child) {
      margin-left: 5px;
    }

    &--current {
      background-color: #f2f5fc;
      font-weight: bold;
      cursor: text;
    }
  }
}
</style>
