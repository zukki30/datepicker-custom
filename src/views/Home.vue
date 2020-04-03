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

    <h2>DatePicker - 3 - A</h2>
    <div class="datepicker3A">
      <DatePickerRangeInput
        :selected-dates="datepicker3ADates"
        :disabled-dates="disabledDates"
        @input="onAInput"
      />
    </div>
    <!-- <PeriodDirectSelect
      v-model="datepicker3AValue"
      class="periodDirectSelect"
      @click="onADatepicker3Click"
    /> -->

    <h2>DatePicker - 3 - B</h2>
    <div class="datepicker3B">
      <DatePickerRangeChangeInput
        :selected-dates="datepicker3BDates"
        :disabled-dates="disabledDates"
        @input="onBInput"
      />
    </div>
    <!-- <PeriodDirectSelect
      v-model="datepicker3BValue"
      class="periodDirectSelect"
      @click="onBDatepicker3Click"
    /> -->

    <h2>DatePicker - 4</h2>
    <DateRangeConfirmPicker
      :selected-dates="datepicker4Dates"
      :disabled-dates="disabledDates"
      @input="onDateRangeConfirmPickerInput"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop } from "vue-property-decorator";
import {
  disabledDateForDatePicker,
  dateRangePickerShortcuts
} from "@/util/date-range-picker-util";
import { DateRange } from "@/components/calendar/Calendar";
import { DirectSelect } from "@/components/date-picker/DatePicker";
import DateRangePicker from "@/components/DateRangePicker.vue";
import PeriodSpecification from "@/components/PeriodSpecification.vue";
import DatePickerRangeInput from "@/components/date-picker/DatePickerRangeInput.vue";
import DateRangeConfirmPicker from "@/components/date-picker/DateRangeConfirmPicker.vue";
import PeriodDirectSelect from "@/components/date-picker/PeriodDirectSelect.vue";
import DatePickerRangeChangeInput from "@/components/date-picker/DatePickerRangeChangeInput.vue";

@Component({
  components: {
    DateRangePicker,
    PeriodSpecification,
    DatePickerRangeInput,
    DateRangeConfirmPicker,
    PeriodDirectSelect,
    DatePickerRangeChangeInput
  }
})
export default class Home extends Vue {
  value = null;
  datepicker3AValue: string = "";
  datepicker3ADates: DateRange | null = null;

  datepicker3BValue: string = "";
  datepicker3BDates: DateRange | null = null;

  datepicker4Dates: DateRange | null = null;

  onAInput(dates: DateRange) {
    this.datepicker3ADates = null;
    this.datepicker3AValue = "";
  }

  onADatepicker3Click(directSelect: DirectSelect) {
    this.datepicker3ADates = directSelect.dateRange;
    this.datepicker3AValue = directSelect.name;
  }

  onBInput(dates: DateRange) {
    this.datepicker3BDates = null;
    this.datepicker3BValue = "";
  }

  onBDatepicker3Click(directSelect: DirectSelect) {
    this.datepicker3BDates = directSelect.dateRange;
    this.datepicker3BValue = directSelect.name;
  }

  onDateRangeConfirmPickerInput(dates: DateRange | null) {
    if (dates !== null) {
      this.datepicker4Dates = dates;
    }
  }

  get disabledDates(): DateRange {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const twoYearsBefore = new Date();
    twoYearsBefore.setHours(0, 0, 0, 0);
    twoYearsBefore.setFullYear(twoYearsBefore.getFullYear() - 2);

    return {
      min: twoYearsBefore,
      max: today
    };
  }

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

.datepicker3A {
  position: relative;
  z-index: 50;
}

.datepicker3B {
  position: relative;
  z-index: 40;
}

.periodDirectSelect {
  margin-top: 10px;
}
</style>
