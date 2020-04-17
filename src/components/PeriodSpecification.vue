<template>
  <div class="period-specification">
    <DateRangePicker
      class="period-specification__date-picker"
      :selected-dates="dateRange"
      :disabled-dates="disabledDates"
      @input="onInput"
      @click="onClick"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DateRange } from "@/components/calendar/Calendar";
import { DirectSelect } from "@/components/date-picker/DatePicker";
import DateRangePicker from "@/components/date-picker/DateRangePicker.vue";

@Component({
  components: { DateRangePicker }
})
export default class PeriodSpecification extends Vue {
  dateRange: DateRange | null = null;
  value: string = "";

  get disabledDates(): DateRange {
    return {
      min: new Date("2018-12-15"),
      max: new Date()
    };
  }

  onInput(dateRange: DateRange) {
    this.dateRange = dateRange;
  }

  onClick(directSelect: DirectSelect) {
    this.dateRange = directSelect.dateRange;
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
