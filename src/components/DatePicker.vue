<template>
  <div class="date-picker" :style="{ width }">
    <ElDatePicker
      class="date-picker_wrapper"
      :value="value"
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
  DatePickerOptions,
  DisabledDateChecker
} from "element-ui/types/date-picker";
import { WidthProperty } from "csstype";

@Component({
  components: { ElDatePicker }
})
export default class DatePicker extends Vue {
  @Prop({ type: Date, required: true })
  value!: Date;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  // セットされた条件の日付を選択不可にする
  @Prop({ type: Function, default: null })
  disabledDate!: DisabledDateChecker;

  @Prop({ type: String, default: "200px" })
  width!: WidthProperty<0>;

  @Emit("input")
  onInput(value: Date) {}

  get pickerOptions(): DatePickerOptions {
    if (this.disabledDate !== null) {
      return { disabledDate: this.disabledDate };
    }
    return {};
  }
}
</script>

<style lang="scss" scoped>
.date-picker {
  /deep/ .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
.date-picker_wrapper {
  /deep/ .el-input__inner {
    border-color: $colorBase700;
    color: $colorBase900;
  }
  /deep/ .el-input__icon {
    color: $colorBase700;
  }

  &.is-disabled {
    /deep/ .el-input__inner {
      border-color: $colorBase500;
      background-color: $colorBase300;
      color: $colorBase600;
    }
    /deep/ .el-input__icon {
      color: $colorBase600;
    }
  }
}
</style>
