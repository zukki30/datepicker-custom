<template>
  <i :class="icon" :data-cy="icon" :style="style" />
  <!-- <div>{{ icon }} {{ style }}</div> -->
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import { Colors } from "@/const/Colors";
import { Icons } from "@/const/Icons";

@Component
export default class Icon extends Vue {
  @Prop({ type: String, required: true })
  icon!: Icons;

  @Prop({ type: String, default: Colors.Base900 })
  color!: Colors;

  // inheritを指定するためにStringを指定
  @Prop({ type: [Number, String], default: 14 })
  size!: number | string;

  get fontSize(): string {
    if (typeof this.size === "number") {
      return this.size + "px";
    }
    return this.size;
  }

  get style() {
    return {
      color: this.color,
      fontSize: this.fontSize
    };
  }
}
</script>
