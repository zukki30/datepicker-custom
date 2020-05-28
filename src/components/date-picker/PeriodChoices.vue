<i18n src="@/i18n/components/date-picker/period-choices.json"></i18n>
<template>
  <div class="periodChoices">
    <label
      v-for="choice in periodChoices"
      :key="choice.name"
      class="periodChoices__item"
    >
      <input
        type="radio"
        name="periodDirectSelect"
        class="periodChoices__radio"
        :checked="current === choice.name"
        @click="onPeriodClick(choice)"
      />
      <div class="periodChoices__button">
        {{ periodChoiceLabel(choice.name) }}
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Emit } from "vue-property-decorator";
import {
  PeriodChoice,
  PeriodChoiceName
} from "@/components/date-picker/PeriodChoice.ts";

@Component
export default class PeriodChoices extends Vue {
  @Model("input", { type: String, default: PeriodChoiceName.Blank })
  current!: PeriodChoiceName;

  @Emit("click")
  onClick(directSelect: PeriodChoice) {}

  get periodChoices(): PeriodChoice[] {
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
    const currentMonthStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    return [
      {
        name: PeriodChoiceName.LastMonth,
        dateRange: { min: lastMonthStart, max: lastMonthEnd }
      },
      {
        name: PeriodChoiceName.ThisMonth,
        dateRange: { min: currentMonthStart, max: today }
      },
      {
        name: PeriodChoiceName.LastWeek,
        dateRange: { min: lastMonday, max: lastSunday }
      },
      {
        name: PeriodChoiceName.ThisWeek,
        dateRange: { min: monday, max: today }
      },
      {
        name: PeriodChoiceName.Yesterday,
        dateRange: { min: yesterday, max: yesterday }
      },
      {
        name: PeriodChoiceName.Today,
        dateRange: { min: today, max: today }
      }
    ];
  }

  get currentButton(): PeriodChoice | null {
    const periodChoices = this.periodChoices.find(c => c.name === this.current);
    return periodChoices === undefined ? null : periodChoices;
  }

  periodChoiceLabel(name: string): string {
    return this.$t(name) as string;
  }

  onPeriodClick(directSelect: PeriodChoice) {
    if (this.currentButton !== directSelect) {
      this.onClick(directSelect);
    }
  }
}
</script>

<style scoped lang="scss">
.periodChoices {
  display: flex;
}

.periodChoices__item {
  position: relative;
  display: block;

  &:not(:first-child) {
    margin-left: 5px;
  }
}

.periodChoices__radio {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  opacity: 0;
}

.periodChoices__button {
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
}

.periodChoices__radio:checked + .periodChoices__button {
  background-color: $colorBlue600;
  font-weight: bold;
  cursor: text;
}
</style>
