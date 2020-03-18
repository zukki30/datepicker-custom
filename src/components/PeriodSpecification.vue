<template>
  <div class="period-specification">
    <DateRangePicker
      class="period-specification__date-picker"
      :selected-dates="dateRange"
      :disabled-dates="disabledDates"
      @input="onInput"
    />

    <div class="period-specification__directly-select">
      <PeriodDirectSelect v-model="value" @click="onClick" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DateRange } from "@/components/calendar/Calendar";
import { DirectSelect } from "@/components/date-picker/DatePicker";
import DateRangePicker from "@/components/date-picker/DateRangePicker.vue";
import PeriodDirectSelect from "@/components/date-picker/PeriodDirectSelect.vue";

@Component({
  components: { DateRangePicker, PeriodDirectSelect }
})
export default class PeriodSpecification extends Vue {
  dateRange: DateRange | null = null;
  value: string = "";

  get disabledDates(): DateRange {
    return {
      min: new Date("2019-12-15"),
      max: new Date("2020-03-20")
    };
  }

  onInput(dateRange: DateRange) {
    this.dateRange = dateRange;
    this.value = "";
  }

  onClick(directSelect: DirectSelect) {
    this.dateRange = directSelect.dateRange;
    this.value = directSelect.name;
  }
}
</script>

<style scoped lang="scss">
.period-specification {
  &__date-picker {
    position: relative;
    z-index: 1;
  }

  &__directly-select {
    margin-top: 10px;
  }
}
</style>
