<template>
  <div v-click-outside="onReset" class="period-direct-select">
    <div
      v-for="directSelect in directSelects"
      :key="directSelect.dateRange.min.getDate()"
      class="period-direct-select__button"
      :class="{
        'period-direct-select__button--current':
          currentButton === directSelect.name
      }"
      @click="onPeriodClick(directSelect)"
    >
      {{ directSelect.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { DateRange } from "@/components/calendar/Calendar";

interface DirectSelect {
  name: string;
  dateRange: DateRange;
}

@Component
export default class PeriodDirectSelect extends Vue {
  currentButton: string = "";

  @Emit("click")
  onClick(dates: DateRange) {}

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

  onPeriodClick(directSelect: DirectSelect) {
    if (this.currentButton !== directSelect.name) {
      this.onClick(directSelect.dateRange);
      this.currentButton = directSelect.name;
    }
  }

  onReset() {
    this.currentButton = "";
  }
}
</script>

<style scoped lang="scss">
.period-direct-select {
  display: flex;

  &__button {
    padding: 5px;
    min-width: 85px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease;

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
