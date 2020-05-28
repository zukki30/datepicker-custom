<template>
  <div class="home">
    test
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
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
</style>
