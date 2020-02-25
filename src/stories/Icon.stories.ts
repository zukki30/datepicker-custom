import { storiesOf } from "@storybook/vue";
import { select, number } from "@storybook/addon-knobs";
import { Icons } from "@/const/Icons";
import { Colors } from "@/const/Colors";
import Icon from "@/components/Icon.vue";

storiesOf("Icon", module).add(
  "default",
  () => ({
    components: { Icon },
    props: {
      icon: {
        default: select("Icon", Icons, Icons["Calendar"])
      },
      size: {
        default: number("Size", 14)
      },
      color: {
        default: select("Color", Colors, Colors["Base900"])
      }
    },
    template: `<Icon :icon="icon" :size="size" :color="color" />`
  }),
  {
    info: {
      summary: "Simple Icon component"
    }
  }
);
