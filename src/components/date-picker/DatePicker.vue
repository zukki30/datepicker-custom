<i18n src="@/i18n/components/date-picker/date-picker-input.json"></i18n>
<template>
  <div
    v-click-outside="onClose"
    data-cy="date-picker"
    class="datePickerInput"
    :style="{ width }"
  >
    <div
      ref="datePickerInputField"
      class="datePickerInput__field"
      :class="{ 'datePickerInput__field--disabled': disabled }"
      @click="onOpen"
    >
      <DatePickerReadonlyInput
        :value="formatValue"
        class="datePickerInput__input"
        :placeholder="$t('targetPeriod')"
        :focus="focus"
        :disabled="disabled"
      />
    </div>

    <Transition name="datePickerPopup">
      <div
        v-if="showDatePickerPopup"
        class="datePickerInput__popup"
        :style="popupStyle"
      >
        <DatePickerPopup
          :date-picker="datePicker"
          :enabled-period="enabledPeriod"
          :selected-date="popupSelectedDate"
          @select-date="onInput"
          @move-year-month="onMoveCalendarButtonClick"
          @mouse-enter-date="onMouseEnterDate"
        />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import debounce from "lodash/debounce";
import {
  DatePickerData,
  PopupAlign,
  InputTextAlign,
  POPUP_WIDTH,
  POPUP_HEIGHT,
  INPUT_HEIGHT,
  INPUT_POPUP_DISTANCE
} from "@/components/date-picker/DatePickerData";
import { CalendarData } from "@/components/date-picker/CalendarData";
import { DateRange } from "@/components/date-picker/DateRange.ts";
import { WidthProperty } from "csstype";
import { DateFormat, formatDate } from "@/util/date-util";
import DatePickerPopup from "@/components/date-picker/popup/DatePickerPopup.vue";
import DatePickerReadonlyInput from "@/components/date-picker/DatePickerReadonlyInput.vue";

@Component({
  components: { DatePickerPopup, DatePickerReadonlyInput }
})
export default class DatePickerInput extends Vue {
  @Prop({ type: Date, default: null })
  value!: Date;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: String, default: "100%" })
  width!: WidthProperty<0>;

  @Prop({ type: Object, default: null })
  enabledPeriod!: DateRange;

  @Prop({ type: String, default: PopupAlign.Left })
  align!: PopupAlign;

  @Prop({ type: Boolean, default: true })
  isFixedPopupTopPosition!: boolean;

  @Emit("input")
  onInput(date: Date) {
    this.onClose();
  }

  datePicker: DatePickerData | null = null;
  focus: boolean = false;
  showDatePickerPopup: boolean = false;
  saveDate: Date | null = null;
  popupTop: number = 0;
  popupLeft: number = 0;

  mouseEnterDate: Date | null = null;

  debounceSetPopupPosition = debounce(this.setPopupPosition, 600);

  get popupSelectedDate(): Date | null {
    if (this.mouseEnterDate !== null) {
      return this.mouseEnterDate;
    }

    return this.value;
  }

  get formatValue(): string {
    if (this.mouseEnterDate !== null) {
      return formatDate(DateFormat.yyyy年M月d日, this.mouseEnterDate);
    }

    return this.value !== null
      ? formatDate(DateFormat.yyyy年M月d日, this.value)
      : "";
  }

  get datePickerInputField(): HTMLElement {
    return this.$refs.datePickerInputField as HTMLElement;
  }

  get popupStyle() {
    return {
      width: POPUP_WIDTH + "px",
      height: POPUP_HEIGHT + "px",
      top: this.popupTop + "px",
      left: this.popupLeft + "px"
    };
  }

  mounted() {
    window.addEventListener("resize", this.debounceSetPopupPosition);
    window.addEventListener("scroll", this.setPopupPosition);
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.debounceSetPopupPosition);
    window.removeEventListener("scroll", this.setPopupPosition);
  }

  setPopupPosition() {
    const clientRect = this.datePickerInputField.getBoundingClientRect();

    // POPUP X軸位置調整
    let left = clientRect.left;
    if (this.align === PopupAlign.Center) {
      left = left + clientRect.width / 2 - POPUP_WIDTH / 2;
    } else if (this.align === PopupAlign.Right) {
      left = left + clientRect.width - POPUP_WIDTH;
    }

    // POPUP Y軸位置調整
    let top = clientRect.top;
    const popupBottomPosition =
      top + INPUT_HEIGHT + INPUT_POPUP_DISTANCE + POPUP_HEIGHT;

    if (popupBottomPosition > window.innerHeight) {
      top = top - (INPUT_POPUP_DISTANCE + POPUP_HEIGHT);

      if (top < 0 && !this.isFixedPopupTopPosition) {
        top = 0;
      }
    } else {
      top = top + INPUT_HEIGHT + INPUT_POPUP_DISTANCE;
    }

    this.popupTop = top;
    this.popupLeft = left;
  }

  // 閉じた時に表示していたカレンダーを開く
  // 未入力時は現在の月を支点としたカレンダーを開く
  // 初めから入力されていたときは入力された日付を支点にカレンダーを開く
  onBuild() {
    if (this.saveDate === null) {
      if (this.value !== null) {
        this.saveDate = this.value;
      } else {
        this.saveDate = new Date();
      }
    }

    this.datePicker = DatePickerData.build(this.saveDate);
  }

  onMoveCalendarButtonClick(calendar: CalendarData) {
    const date = new Date(calendar.year, calendar.month, 0);
    this.saveDate = date;
    this.datePicker = DatePickerData.build(date);
  }

  onMouseEnterDate(date: Date) {
    this.mouseEnterDate = date;
  }

  onOpen() {
    if (!this.disabled) {
      this.showDatePickerPopup = true;
      this.focus = true;
      this.onBuild();
      this.setPopupPosition();
    }
  }

  onClose() {
    this.showDatePickerPopup = false;
    this.focus = false;
    this.mouseEnterDate = null;
  }
}
</script>

<style scoped lang="scss">
.datePickerInput {
  position: relative;
}

.datePickerInput__field {
  padding: 2px;
  width: 100%;
  height: $formPartsHeight;
  border: 1px solid $colorBase700;
  border-radius: $sizeRadius;
}

.datePickerInput__field--disabled {
  background-color: $colorBase300;
}

.datePickerInput__popup {
  position: fixed;
  padding: 10px;
  width: 100%;
  border: 1px solid $colorBase400;
  border-radius: $sizeRadius;
  background-color: $colorWhite;
  box-shadow: 0 1px 4px $colorShadow100;
}

.datePickerPopup-enter-active,
.datePickerPopup-leave-active {
  margin-top: 0;
  opacity: 1;
  transition: opacity 0.3s ease, margin-top 0.3s ease;
}

.datePickerPopup-enter,
.datePickerPopup-leave-to {
  margin-top: -40px;
  opacity: 0;
}
</style>
