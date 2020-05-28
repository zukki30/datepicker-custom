<template>
  <div class="home">
    <div class="list">
      <h2>POPUP 上はみ出し有効</h2>
      <DateRangePicker v-model="value1" />
    </div>

    <div class="list">
      <h2>POPUP 上はみ出し無効</h2>
      <DateRangePicker v-model="value2" :is-fixed-popup-top-position="false" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop } from "vue-property-decorator";
import { DateRange } from "@/components/date-picker/DateRange.ts";
import DateRangePicker from "@/components/date-picker/DateRangePicker.vue";

@Component({
  components: { DateRangePicker }
})
export default class Home extends Vue {
  value1: DateRange | null = null;
  value2: DateRange | null = null;
}
</script>

<style scoped lang="scss">
.home {
  margin-right: auto;
  margin-left: auto;
  padding: 300px 100px;
  min-height: 1300px;
  max-width: 1000px;

  .list {
    &:not(:first-child) {
      margin-top: 150px;
    }
  }

  h2 {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 20px;
  }
}
</style>
