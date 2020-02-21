<template>
  <div class="input-text">
    <input
      class="input-text-input"
      :class="{ 'input-text-input--error': hasError }"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      :tabindex="tabindex"
      :maxlength="maxLength"
      @input="onInput($event.target.value)"
      @focus="onFocus"
      @keyup.enter="onEnter"
      @keypress="onKeypress"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Emit } from "vue-property-decorator";

@Component
export default class InputText extends Vue {
  @Model("input", { type: [String, Number], required: true })
  value!: string | number;

  // IE11ブラウザのバグ
  // placeholderに値が無いと最初に文字を入力した時にinput eventが発生しない
  // defaultでnullを設定し回避
  @Prop({ type: String, default: null })
  placeholder!: string | null;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: Number, default: 0 })
  tabindex!: number;

  @Prop({ type: String, default: "text" })
  type!: string;

  @Prop({ type: Number })
  maxLength?: number;

  @Prop({ type: Boolean, default: false })
  hasError!: boolean;

  @Emit("input")
  onInput(value: string | number) {}

  @Emit("focus")
  onFocus() {}

  @Emit("keyup-enter")
  onEnter() {}

  @Emit("keypress")
  onKeypress(event: KeyboardEvent) {}
}
</script>

<style scoped lang="scss">
.input-text-input {
  padding: 0 8px;
  width: 100%;
  height: $formPartsHeight;
  border: 1px solid $colorBase600;
  border-radius: $sizeRadius;
  background-color: $colorWhite;
  color: $colorText;
  font-size: $basicFontSize;
  //IE11で中央にする
  line-height: $formPartsHeight;

  &::placeholder {
    color: $colorBase700;
  }
}

.input-text-input:disabled {
  border: 1px solid $colorBase500;
  background-color: $colorBase300;
  color: $colorBase600;
  cursor: default;
}

.input-text-input--error {
  border-color: $colorError;
  color: $colorError;
}
</style>
