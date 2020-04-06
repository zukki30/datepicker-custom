<template>
  <div class="align-change">
    <div class="align-change__label">ポップアップ位置切り替え</div>
    <ul class="align-change__select">
      <li
        :class="{
          current: align === 'center'
        }"
        @click="onClick('center')"
      >
        Center
      </li>
      <li
        :class="{
          current: align === 'left'
        }"
        @click="onClick('left')"
      >
        Left
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from "vue-property-decorator";

@Component
export default class AlignChange extends Vue {
  @Prop({ type: String, default: null })
  align!: string;

  @Emit("click")
  onClick(value: string) {}
}
</script>

<style scoped lang="scss">
.align-change {
  margin-top: -5px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;

  &__label {
    font-weight: bold;
  }

  &__select {
    margin-left: 20px;
    display: flex;
    li {
      padding: 8px 5px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
      width: 85px;
      text-align: center;
      cursor: pointer;

      &:hover {
        background-color: #f2f5fc;
      }

      &.current {
        background-color: #f2f5fc;
        border-color: #3468eb;
        cursor: text;
        pointer-events: none;
      }

      &:not(:first-child) {
        margin-left: 10px;
      }
    }
  }
}
</style>
