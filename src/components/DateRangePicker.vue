<template>
  <div
    class="dateRangePicker"
    :class="{ dateRangePicker__disabled: disabled }"
    :style="{ width }"
  >
    <div class="dateRangePicker__icon">
      <Icon icon="icon-calendar" color="#999" :size="16" />
    </div>
    <ElDatePicker
      ref="startDatePicker"
      :value="startDate"
      class="dateRangePicker__input"
      placeholder="期間の開始日"
      :disabled="disabled"
      :clearable="false"
      :picker-options="pickerOptions"
      @input="onStartInput"
    />
    <div class="dateRangePicker__hyphen">-</div>
    <ElDatePicker
      ref="endDatePicker"
      :value="endDate"
      class="dateRangePicker__input"
      placeholder="期間の最終日"
      :disabled="disabled"
      :clearable="false"
      :picker-options="pickerOptions"
      align="right"
      @input="onEndInput"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Emit } from "vue-property-decorator";
import { DatePicker as ElDatePicker } from "element-ui";
import {
  DateRange as ElDateRange,
  DatePickerOptions,
  DisabledDateChecker,
  Shortcut
} from "element-ui/types/date-picker";
import { DateRange } from "@/components/DateRange";
import { WidthProperty } from "csstype";

import Icon from "@/components/Icon.vue";

export interface CellClassName {
  (time: Date): void;
}

export interface PickerOptions extends DatePickerOptions {
  cellClassName?: CellClassName;
}

@Component({
  components: { ElDatePicker, Icon }
})
export default class DateRangePicker extends Vue {
  @Prop({ type: Object })
  value!: DateRange | null;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: String, default: "350px" })
  width!: WidthProperty<0>;

  // セットされた条件の日付を選択不可にする
  @Prop({ type: Function, default: null })
  disabledDate!: DisabledDateChecker;

  // セットされた条件の日付を選択不可にする
  @Prop({ type: Array, default: null })
  shortcuts!: Shortcut[];

  @Emit("input")
  emitInputEvent(value: DateRange | null) {}

  startDate: Date | null = this.value !== null ? this.value.min : null;
  endDate: Date | null = this.value !== null ? this.value.max : null;

  onStartInput(value: Date | Date[]) {
    if (value instanceof Date) {
      this.startDate = value;
      (this.$refs.endDatePicker as HTMLElement).focus();
      return;
    }

    this.onClickShortcuts(value);
  }

  onEndDatePickerEmit(value: Date) {
    if (this.startDate === null) {
      return;
    }

    if (this.startDate > value) {
      this.endDate = this.startDate;
      this.startDate = value;
    } else {
      this.endDate = value;
    }

    this.emitInputEvent({
      min: this.startDate,
      max: new Date(this.endDate.getTime() + 24 * 60 * 60 * 1000 - 1)
    });
  }

  onEndInput(value: Date | Date[]) {
    if (value instanceof Date) {
      this.onEndDatePickerEmit(value);
      return;
    }

    this.onClickShortcuts(value);
  }

  onClickShortcuts(dates: Date[]) {
    this.startDate = dates[0];
    this.endDate = dates[1];

    this.emitInputEvent({
      min: this.startDate,
      max: new Date(this.endDate.getTime() + 24 * 60 * 60 * 1000 - 1)
    });
  }

  get pickerOptions(): PickerOptions {
    const options: PickerOptions = {};
    if (this.disabledDate !== null) {
      options.disabledDate = this.disabledDate;
    }
    if (this.shortcuts !== null) {
      options.shortcuts = this.shortcuts;
    }

    if (this.startDate !== null) {
      options.cellClassName = time => {
        if (
          this.startDate !== null &&
          time.getTime() === this.startDate.getTime()
        ) {
          return "is-selectedStartDate";
        }
      };
    }
    return options;
  }
}
</script>

<style lang="scss" scoped>
.dateRangePicker {
  display: flex;
  align-items: center;
  padding: 0 10px;
  border: 1px solid;
  border-radius: 5px;

  &:not(.dateRangePicker__disabled) {
    border-color: #ddd;
    color: #333;
  }

  &:not(.dateRangePicker__disabled):hover {
    border-color: #ccc;
  }
}

.dateRangePicker__disabled {
  border-color: #d6d6d6;
  background-color: #eee;
  color: #ccc;
}

.dateRangePicker__icon {
  padding-right: 10px;
}

.dateRangePicker__input {
  width: 100%;

  // element-ui をカスタマイズ
  /deep/ .el-input__prefix {
    display: none;
  }
  /deep/ .el-input__suffix {
    display: none;
  }
  /deep/ .el-input__inner {
    padding: 0;
    border: none;
    color: #333;
    text-align: center;
    cursor: pointer;

    &::placeholder {
      color: #999;
    }

    &:disabled {
      background-color: #eee;
      color: #ccc;
      cursor: default;
    }

    &:focus {
      background-color: #f2f5fc;
    }
  }
}

.dateRangePicker__hyphen {
  padding: 0 10px;
}
</style>
