<template>
  <div id="app" class="app">
    <Home />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop } from "vue-property-decorator";
import Home from "@/views/Home.vue";

@Component({
  components: { Home }
})
export default class App extends Vue {}
</script>
