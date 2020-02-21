<template>
  <div class="date-range-picker" data-cy="date-range-picker" :style="{ width }">
    <ElDatePicker
      class="date-range-picker_wrapper"
      :value="value === null ? null : [value.min, value.max]"
      type="daterange"
      :disabled="disabled"
      :picker-options="pickerOptions"
      :clearable="false"
      @input="onInput"
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

@Component({
  components: { ElDatePicker }
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

  onInput(value: Date[] | null) {
    if (value === null) {
      this.emitInputEvent(null);
    } else {
      const endDate: Date = value[1];
      this.emitInputEvent({
        min: value[0],
        max: new Date(value[1].getTime() + 24 * 60 * 60 * 1000 - 1)
      });
    }
  }

  get pickerOptions(): DatePickerOptions {
    const options: DatePickerOptions = {};
    if (this.disabledDate !== null) {
      options.disabledDate = this.disabledDate;
    }
    if (this.shortcuts !== null) {
      options.shortcuts = this.shortcuts;
    }
    return options;
  }
}
</script>

<style lang="scss" scoped>
.date-range-picker {
  position: relative;
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
    height: 100%;
  }
}

.date-range-picker_wrapper {
  min-width: 100%;
  border-color: $colorBase700;
  color: $colorBase900;

  /deep/ .el-range__icon {
    color: $colorBase700;
  }

  &.is-disabled {
    border-color: $colorBase500;
    background-color: $colorBase300;
    color: $colorBase600;

    /deep/ .el-range__icon {
      color: $colorBase600;
    }
  }
}

.date-range-picker__picking {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
