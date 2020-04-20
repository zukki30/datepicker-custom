<template>
  <div class="home">
    <div v-if="false">
      <h2>DatePicker - 1</h2>
      <p>始点を終点を個別選択</p>
      <DateRangePicker
        v-model="value"
        :shortcuts="shortcuts"
        :disabled-date="disabledDate"
      />
    </div>

    <h2>DatePicker - 2</h2>
    <p>始点を終点をワンアクションで選択</p>
    <div class="datepicker2">
      <PeriodSpecification />
    </div>

    <h2>DatePicker - 3 - A</h2>
    <p>個別選択、始点・終点の片方だけの変更が可能で入れ替え選択は不可</p>
    <div class="datepicker3A">
      <DatePickerRangeInput
        :selected-dates="datepicker3ADates"
        :disabled-dates="disabledDates"
        @input="onAInput"
        @reset="onAReset"
      />
    </div>

    <h2>DatePicker - 3 - B</h2>
    <p>個別選択、始点・終点の片方だけの変更が可能で入れ替え選択も可能</p>
    <div class="datepicker3B">
      <DatePickerRangeChangeInput
        :selected-dates="datepicker3BDates"
        :disabled-dates="disabledDates"
        @input="onBInput"
        @reset="onBReset"
      />
    </div>

    <div v-if="false">
      <h2>DatePicker - 4 - A</h2>
      <p>
        範囲選択、完了ボタンを押すまで確定せず何度でも再選択可能<br />
        カレンダーの外側をクリックした時はキャンセル扱い
      </p>
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
      <p>
        範囲選択、完了ボタンを押すまで確定せず何度でも再選択可能<br />
        カレンダーの外側をクリックした時は確定扱い
      </p>
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
import DateRangePicker from "@/components/old/DateRangePicker.vue";
import PeriodSpecification from "@/components/PeriodSpecification.vue";
import DatePickerRangeInput from "@/components/date-picker/DatePickerRangeInput.vue";
import DateRangeConfirmPicker from "@/components/old/date-picker/DateRangeConfirmPicker.vue";
import PeriodDirectSelect from "@/components/date-picker/PeriodDirectSelect.vue";
import DatePickerRangeChangeInput from "@/components/date-picker/DatePickerRangeChangeInput.vue";
import AlignChange from "@/components/old/AlignChange.vue";
import DateRangeConfirmCanselInputPicker from "@/components/old/date-picker/DateRangeConfirmCanselInputPicker.vue";

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

  datepicker3ADates: DateRange | null = null;
  datepicker3BDates: DateRange | null = null;

  datepicker4ADates: DateRange | null = null;
  datapicker4APopup: string = "center";

  datepicker4BDates: DateRange | null = null;
  datapicker4BPopup: string = "center";

  onAInput(dates: DateRange) {
    this.datepicker3ADates = dates;
  }

  onAReset() {
    this.datepicker3ADates = null;
  }

  onBInput(dates: DateRange) {
    this.datepicker3BDates = dates;
  }

  onBReset() {
    this.datepicker3BDates = null;
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
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 36px;
    &:not(:first-child) {
      margin-top: 60px;
    }
  }

  p {
    margin-bottom: 20px;
    padding-left: 10px;
    line-height: 1.5;
  }
}

.header {
  padding: 10px;
  border-bottom: 1px solid $colorBase400;
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
