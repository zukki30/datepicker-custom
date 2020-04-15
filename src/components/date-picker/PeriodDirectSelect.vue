<template>
  <div class="period-direct-select">
    <label
      v-for="directSelect in directSelects"
      :key="directSelect.dateRange.min.getDate()"
      class="period-direct-select__button"
      :class="{
        'period-direct-select__button--current': current(directSelect.name)
      }"
    >
      <input
        type="radio"
        name="periodDirectSelect"
        class="period-direct-select__radio"
        :checked="current(directSelect.name)"
        @change="onPeriodClick(directSelect)"
      />
      {{ directSelect.label }}
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Emit } from "vue-property-decorator";
import { DateRange } from "@/components/calendar/Calendar";
import { DirectSelect } from "@/components/date-picker/DatePicker";

@Component
export default class PeriodDirectSelect extends Vue {
  @Model("input", { type: String })
  value: string = "";

  @Emit("click")
  onClick(directSelect: DirectSelect) {}

  currentDirectSelect: DirectSelect | null = null;

  get directSelects(): DirectSelect[] {
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
      {
        label: "昨日",
        name: "yesterday",
        dateRange: { min: yesterday, max: yesterday }
      },
      { label: "今日", name: "today", dateRange: { min: today, max: today } },
      {
        label: "先週",
        name: "lastWeek",
        dateRange: { min: lastMonday, max: lastSunday }
      },
      {
        label: "先月",
        name: "lastMonth",
        dateRange: { min: lastMonthStart, max: lastMonthEnd }
      }
    ];
  }

  get currentButton() {
    return this.directSelects.find(
      directSelect => directSelect.name === this.value
    );
  }

  get selected(): DirectSelect | null {
    return this.currentButton === undefined
      ? this.currentDirectSelect
      : this.currentButton;
  }

  current(name: string): boolean {
    if (this.currentButton === undefined) {
      return false;
    }

    return this.selected !== null && name === this.selected.name;
  }

  onPeriodClick(directSelect: DirectSelect) {
    if (this.currentButton !== directSelect) {
      this.onClick(directSelect);
      this.currentDirectSelect = directSelect;
    }
  }
}
</script>

<style scoped lang="scss">
.period-direct-select {
  display: flex;

  &__button {
    position: relative;
    display: block;
    padding: 5px;
    min-width: 85px;
    border: 1px solid $colorBase400;
    border-radius: 5px;
    background-color: $colorWhite;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: $colorBlue600;
    }

    &:not(:first-child) {
      margin-left: 5px;
    }

    &--current {
      background-color: $colorBlue600;
      font-weight: bold;
      cursor: text;
    }
  }

  &__radio {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    opacity: 0;
  }
}
</style>
