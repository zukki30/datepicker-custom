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
    <p>選択されている日付より前、もしくは後を入力させない</p>
    <div class="datepicker3A">
      <DatePickerRangeInput
        :selected-dates="datepicker3ADates"
        :disabled-dates="disabledDates"
        @input="onAInput"
      />
    </div>
    <PeriodDirectSelect
      v-model="datepicker3AValue"
      class="periodDirectSelect"
      @click="onADatepicker3Click"
    />

    <h2>DatePicker - 3 - B</h2>
    <p>選択した日付が前後する時入れかるアニメーションが発生</p>
    <div class="datepicker3B">
      <DatePickerRangeChangeInput
        :selected-dates="datepicker3BDates"
        :disabled-dates="disabledDates"
        @input="onBInput"
      />
    </div>
    <PeriodDirectSelect
      v-model="datepicker3BValue"
      class="periodDirectSelect"
      @click="onBDatepicker3Click"
    />

    <h2>DatePicker - 4 - A</h2>
    <p>キャンセル時に選択していた日付が無効になる</p>
    <AlignChange
      :align="datapicker4APopup"
      @click="onDatePicker4APopupAlignChange"
    />
    <div class="datepicker4A">
      <DateRangeConfirmPicker
        :selected-dates="datepicker4ADates"
        :disabled-dates="disabledDates"
        :align="datapicker4APopup"
        @input="onDateRangeConfirmPickerInput"
      />
    </div>

    <h2>DatePicker - 4 - B</h2>
    <p>キャンセル時に選択していた日付が有効になる</p>
    <AlignChange
      :align="datapicker4BPopup"
      @click="onDatePicker4BPopupAlignChange"
    />
    <DateRangeConfirmCanselInputPicker
      :selected-dates="datepicker4BDates"
      :disabled-dates="disabledDates"
      :align="datapicker4BPopup"
      @input="onDateRangeConfirmCanselInputPicker"
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
import AlignChange from "@/components/AlignChange.vue";
import DateRangeConfirmCanselInputPicker from "@/components/date-picker/DateRangeConfirmCanselInputPicker.vue";

@Component({
  components: {
    DateRangePicker,
    PeriodSpecification,
    DatePickerRangeInput,
    DateRangeConfirmPicker,
    PeriodDirectSelect,
    DatePickerRangeChangeInput,
    DateRangeConfirmCanselInputPicker,
    AlignChange
  }
})
export default class Home extends Vue {
  value = null;
  datepicker3AValue: string = "";
  datepicker3ADates: DateRange | null = null;

  datepicker3BValue: string = "";
  datepicker3BDates: DateRange | null = null;

  datepicker4ADates: DateRange | null = null;
  datapicker4APopup: string = "center";

  datepicker4BDates: DateRange | null = null;
  datapicker4BPopup: string = "center";

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
      this.datepicker4ADates = dates;
    }
  }

  onDateRangeConfirmCanselInputPicker(dates: DateRange | null) {
    if (dates !== null) {
      this.datepicker4BDates = dates;
    }
  }

  onDatePicker4APopupAlignChange(value: string) {
    this.datapicker4APopup = value;
  }

  onDatePicker4BPopupAlignChange(value: string) {
    this.datapicker4BPopup = value;
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
  padding: 100px 100px 500px;
  max-width: 1000px;

  h2 {
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 36px;
    &:not(:first-child) {
      margin-top: 45px;
    }
  }

  p {
    margin-bottom: 20px;

    &::before {
      margin-right: 5px;
      content: "ー";
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

.datepicker4A {
  position: relative;
  z-index: 35;
}

.periodDirectSelect {
  margin-top: 10px;
}
</style>
