<template>
  <div class="home">
    <h2>DatePicker - 1</h2>
    <DateRangePicker
      v-model="value"
      :shortcuts="shortcuts"
      :disabled-date="disabledDate"
    />

    <h2>DatePicker - 2</h2>
    <PeriodSpecification />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop } from "vue-property-decorator";
import {
  disabledDateForDatePicker,
  dateRangePickerShortcuts
} from "@/util/date-range-picker-util";
import DateRangePicker from "@/components/DateRangePicker.vue";
import PeriodSpecification from "@/components/PeriodSpecification.vue";

@Component({
  components: { DateRangePicker, PeriodSpecification }
})
export default class Home extends Vue {
  value = null;

  get disabledDate() {
    return disabledDateForDatePicker();
  }

  get shortcuts() {
    return dateRangePickerShortcuts(new Date());
  }
}
</script>

<style scoped lang="scss">
.home {
  margin-right: auto;
  margin-left: auto;
  padding-top: 100px;
  max-width: 1000px;

  h2 {
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 36px;
    &:not(:first-child) {
      margin-top: 45px;
    }
  }
}
</style>
