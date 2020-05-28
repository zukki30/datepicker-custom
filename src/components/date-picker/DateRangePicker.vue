<i18n src="@/i18n/components/date-picker/date-range-picker-input.json"></i18n>
<template>
  <div
    v-click-outside="onOutSideClick"
    data-cy="date-range-picker"
    class="dateRangePickerInput"
    :style="{ width }"
  >
    <div
      ref="dateRangePickerInputContainer"
      class="dateRangePickerInput__container"
      :class="{
        'dateRangePickerInput__container--foucs':
          startInputFocus || endInputFocus
      }"
    >
      <div class="dateRangePickerInput__icon">
        <Icon icon="icon-calendar" color="#818599" :size="14" />
      </div>
      <div class="dateRangePickerInput__field" @click="onStartInputClick">
        <DatePickerReadonlyInput
          ref="startInput"
          :value="dispalyStartInputValue"
          :placeholder="$t('startOfTargetPeriod')"
          :disabled="disabled"
          :focus="startInputFocus"
          :align="inputTextAlign.Center"
        />
      </div>
      <div class="dateRangePickerInput__hyphen">-</div>
      <div class="dateRangePickerInput__field" @click="onEndInputClick">
        <DatePickerReadonlyInput
          ref="endInput"
          :value="dispalyEndInputValue"
          :placeholder="$t('endOfTargetPeriod')"
          :disabled="disabled"
          :focus="endInputFocus"
          :align="inputTextAlign.Center"
        />
      </div>

      <div
        class="dateRangePickerInput__deleteButton"
        :title="$t('reselectEntirePeriod')"
        @click="onDeleteButtonClick"
      >
        <Icon
          class="date-picker-range-change-input__delete-button-icon"
          icon="icon-close"
          :color="'#666'"
          :size="10"
        />
      </div>
    </div>

    <Transition name="datePickerPopup">
      <div
        v-if="showDatePickerPopup"
        class="dateRangePickerInput__popup"
        :style="popupStyle"
      >
        <div v-if="showPeriodChoices" class="dateRangePickerInput__header">
          <PeriodChoices
            :current="periodChoiceValue"
            @click="onPeriodChoiceClick"
          />
        </div>

        <div class="dateRangePickerInput__body">
          <DateRangePickerPopup
            :date-picker="datePicker"
            :enabled-period="enabledPeriod"
            :selected-period="popupSelectedPeriod"
            :disabled-month-click="true"
            @select-date="onSelectDate"
            @move-year-month="onMoveCalendarButtonClick"
            @mouse-enter-date="onMouseEnterDate"
          />
        </div>
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
import {
  DateRange,
  changeDateRange
} from "@/components/date-picker/DateRange.ts";
import { PeriodChoice } from "@/components/date-picker/PeriodChoice.ts";
import { WidthProperty } from "csstype";
import { DateFormat, formatDate } from "@/util/date-util";
import Icon from "@/components/Icon.vue";
import IconButton from "@/components/IconButton.vue";
import DateRangePickerPopup from "@/components/date-picker/popup/DateRangePickerPopup.vue";
import DatePickerReadonlyInput from "@/components/date-picker/DatePickerReadonlyInput.vue";
import PeriodChoices from "@/components/date-picker/PeriodChoices.vue";

@Component({
  components: {
    Icon,
    DateRangePickerPopup,
    DatePickerReadonlyInput,
    PeriodChoices
  }
})
export default class DateRangePickerInput extends Vue {
  @Prop({ type: Object, default: null })
  value!: DateRange;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: String, default: "380px" })
  width!: WidthProperty<0>;

  @Prop({ type: Object, default: null })
  enabledPeriod!: DateRange;

  @Prop({ type: String, default: PopupAlign.Left })
  align!: PopupAlign;

  @Prop({ type: Boolean, default: true })
  showPeriodChoices!: boolean;

  @Prop({ type: Boolean, default: true })
  isFixedPopupTopPosition!: boolean;

  @Emit("input")
  onInput(dateRange: DateRange | null) {
    this.isDelete = false;
  }

  @Emit("delete")
  onDeleteButtonClick() {
    this.isDelete = true;
    this.onInputDelete();
    this.$nextTick(() => {
      this.onOpen();
    });

    this.startInputFocus = true;
    this.endInputFocus = false;
  }

  @Emit("outside-click")
  onOutSideClick() {
    if (this.showDatePickerPopup) {
      this.isDelete = false;
      this.onClose();
      this.onInputDelete();
    }
  }

  datePicker: DatePickerData | null = null;

  startInputValue: Date | null = null;
  startInputFocus: boolean = false;

  endInputValue: Date | null = null;
  endInputFocus: boolean = false;

  mouseEnterDate: Date | null = null;

  showDatePickerPopup: boolean = false;
  periodChoiceValue: string = "";
  isDelete: boolean = false;

  saveDate: Date | null = null;
  popupTop: number = 0;
  popupLeft: number = 0;

  inputTextAlign = InputTextAlign;

  debounceSetPopupPosition = debounce(this.setPopupPosition, 600);

  get popupSelectedPeriod(): DateRange | null {
    return this.changeDateRange(
      this.selectedStartInputValue,
      this.selectedEndInputValue
    );
  }

  get selectedStartInputValue(): Date | null {
    if (this.startInputFocus) {
      return this.mouseEnterDate;
    }

    if (this.startInputValue !== null) {
      return this.startInputValue;
    }

    if (this.value !== null && !this.isDelete) {
      this.startInputValue = this.value.min;
      return this.value.min;
    }

    return null;
  }

  get selectedEndInputValue(): Date | null {
    if (this.endInputFocus) {
      return this.mouseEnterDate;
    }

    if (this.endInputValue !== null) {
      return this.endInputValue;
    }

    if (this.value !== null && !this.isDelete) {
      this.endInputValue = this.value.max;
      return this.value.max;
    }

    return null;
  }

  get dispalyStartInputValue(): string {
    return this.selectedStartInputValue !== null
      ? this.formatValue(this.selectedStartInputValue)
      : "";
  }

  get dispalyEndInputValue(): string {
    return this.selectedEndInputValue !== null
      ? this.formatValue(this.selectedEndInputValue)
      : "";
  }

  get dateRangePickerInputContainer(): HTMLElement {
    return this.$refs.dateRangePickerInputContainer as HTMLElement;
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
    const clientRect = this.dateRangePickerInputContainer.getBoundingClientRect();

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
        this.saveDate = this.value.max;
      } else {
        this.saveDate = new Date();
      }
    }

    this.datePicker = DatePickerData.build(this.saveDate);
  }

  onOpen() {
    this.showDatePickerPopup = true;
    this.onBuild();
    this.setPopupPosition();
  }

  onClose() {
    this.showDatePickerPopup = false;
    this.startInputFocus = false;
    this.endInputFocus = false;
    this.mouseEnterDate = null;
  }

  onDatesInput() {
    if (
      this.startInputValue instanceof Date &&
      this.endInputValue instanceof Date
    ) {
      this.onInput(
        this.changeDateRange(this.startInputValue, this.endInputValue)
      );
    }

    this.mouseEnterDate = null;
  }

  onStartInputClick() {
    this.startInputFocus = true;
    this.endInputFocus = false;
    this.mouseEnterDate = this.startInputValue;

    if (!this.showDatePickerPopup) {
      this.onOpen();
    }
  }

  onEndInputClick() {
    this.startInputFocus = false;
    this.endInputFocus = true;
    this.mouseEnterDate = this.endInputValue;

    if (!this.showDatePickerPopup) {
      this.onOpen();
    }
  }

  onStartInput(date: Date) {
    this.startInputValue = date;
    this.onDatesInput();

    if (this.endInputValue === null) {
      this.onEndInputClick();
    } else {
      this.onClose();
    }
  }

  onEndInput(date: Date) {
    this.endInputValue = date;
    this.onDatesInput();

    if (this.startInputValue === null) {
      this.onStartInputClick();
    } else {
      this.onClose();
    }
  }

  onMoveCalendarButtonClick(calendar: CalendarData) {
    const date = new Date(calendar.year, calendar.month, 0);
    this.saveDate = date;
    this.datePicker = DatePickerData.build(date);
  }

  onMouseEnterDate(date: Date) {
    this.mouseEnterDate = date;

    // マウスオーバーしている日付と入力済みの日付が逆転している場合、
    // フォーカスと入力されている日付の位置が逆転する
    if (
      this.startInputFocus &&
      this.endInputValue !== null &&
      this.endInputValue < date
    ) {
      this.endInputFocus = true;
      this.startInputFocus = false;

      this.startInputValue = this.endInputValue;
      this.endInputValue = date;
    } else if (
      this.endInputFocus &&
      this.startInputValue !== null &&
      this.startInputValue > date
    ) {
      this.endInputFocus = false;
      this.startInputFocus = true;

      this.endInputValue = this.startInputValue;
      this.startInputValue = date;
    }
  }

  onSelectDate(date: Date) {
    this.periodChoiceValue = "";

    if (this.startInputFocus) {
      this.onStartInput(date);
      return;
    }

    if (this.endInputFocus) {
      this.onEndInput(date);
      return;
    }
  }

  onPeriodChoiceClick(periodChoice: PeriodChoice) {
    this.startInputValue =
      periodChoice.dateRange.min < this.enabledPeriod.min
        ? this.enabledPeriod.min
        : periodChoice.dateRange.min;
    this.endInputValue =
      periodChoice.dateRange.max > this.enabledPeriod.max
        ? this.enabledPeriod.max
        : periodChoice.dateRange.max;
    this.periodChoiceValue = periodChoice.name;

    this.onInput(
      this.changeDateRange(this.startInputValue, this.endInputValue)
    );
    this.onClose();
  }

  onInputDelete() {
    this.startInputValue = null;
    this.endInputValue = null;
    this.mouseEnterDate = null;
    this.periodChoiceValue = "";
  }

  formatValue(value: Date): string {
    console.log(formatDate(DateFormat.yyyy年M月d日, value));
    return formatDate(DateFormat.yyyy年M月d日, value);
  }

  changeDateRange(min: Date | null, max: Date | null) {
    if (min instanceof Date && max === null) {
      return changeDateRange([min, min]);
    }

    if (min === null && max instanceof Date) {
      return changeDateRange([max, max]);
    }

    if (min instanceof Date && max instanceof Date) {
      return changeDateRange([min, max]);
    }

    return null;
  }
}
</script>

<style scoped lang="scss">
.dateRangePickerInput {
  position: relative;
}

.dateRangePickerInput__container {
  display: flex;
  align-items: center;
  padding: 2px;
  height: $formPartsHeight;
  border: 1px solid $colorBase700;
  border-radius: $sizeRadius;
  background-color: $colorWhite;

  &--foucs {
    border-color: $colorBlue800;
  }
}

.dateRangePickerInput__icon {
  padding-left: 3px;
  width: 25px;
  text-align: center;
}

.dateRangePickerInput__field {
  flex: 1;
}

.dateRangePickerInput__hyphen {
  padding: 0 10px;
}

.dateRangePickerInput__deleteButton {
  margin-right: 5px;
  margin-left: 5px;
  padding: 1px 5px 0;
  height: 18px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
}

.dateRangePickerInput__popup {
  position: fixed;
  width: 100%;
  border: 1px solid $colorBase400;
  border-radius: $sizeRadius;
  background-color: $colorWhite;
  box-shadow: 0 1px 4px $colorShadow100;
}

.dateRangePickerInput__header {
  padding: 10px;
  border-bottom: 1px solid $colorBase400;
}

.dateRangePickerInput__body {
  padding: 7px 10px 10px;
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
