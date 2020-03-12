<template>
  <div class="home">
    <h2>DatePicker - 1</h2>
    <DateRangePicker
      v-model="value"
      :shortcuts="shortcuts"
      :disabled-date="disabledDate"
    />

    <h2>DatePicker - 2</h2>
    <div class="datepicker2">
      <PeriodSpecification />
    </div>

    <h2>DatePicker - 3</h2>
    <DatePickerRangeInput />

    <h2>DatePicker - 4</h2>
    <DateRangeConfirmPicker />
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
import DatePickerRangeInput from "@/components/date-picker/DatePickerRangeInput.vue";
import DateRangeConfirmPicker from "@/components/date-picker/DateRangeConfirmPicker.vue";

@Component({
  components: {
    DateRangePicker,
    PeriodSpecification,
    DatePickerRangeInput,
    DateRangeConfirmPicker
  }
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
  padding: 100px 0 500px;
  max-width: 800px;

  h2 {
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 36px;
    &:not(:first-child) {
      margin-top: 45px;
    }
  }
}

.datepicker2 {
  position: relative;
  z-index: 100;
}
</style>
