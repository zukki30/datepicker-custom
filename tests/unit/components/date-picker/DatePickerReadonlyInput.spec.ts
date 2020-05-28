import { shallowMount } from "@vue/test-utils";
import DatePickerReadonlyInput from "@/components/date-picker/DatePickerReadonlyInput.vue";

const factory = (values = {}) => {
  return shallowMount<DatePickerReadonlyInput>(DatePickerReadonlyInput, {
    propsData: { ...values }
  });
};

describe("DatePickerReadonlyInput.vue", () => {
  it("Add value prop when value is 'VALUE'", () => {
    const VALUE = "sampletext";
    const wrapper = factory({
      value: VALUE
    });

    expect(wrapper.props().value).toEqual(VALUE);
  });

  it("Add disabled prop when disabled is true", () => {
    const wrapper = factory({
      disabled: true
    });

    expect(wrapper.props().disabled).toBeTruthy();
    expect(wrapper.attributes().disabled).toBeTruthy();
  });

  it("Add placeholder prop when placeholder is true", () => {
    const PLACEHOLDER = "sampletext";
    const wrapper = factory({
      placeholder: PLACEHOLDER
    });

    expect(wrapper.props().placeholder).toEqual(PLACEHOLDER);
  });

  it("Add focus class when focus is true", () => {
    const wrapper = factory({
      focus: true
    });

    expect(wrapper.props().focus).toBeTruthy();
    expect(wrapper.classes()).toContain("datePickerReadonlyInput--focus");
  });
});
