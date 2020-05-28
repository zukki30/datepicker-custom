import Vue, { VueConstructor } from "vue";
import { shallowMount, mount, Wrapper, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import merge from "lodash/merge";

const localVue = createLocalVue();
localVue.use(Vuex);

export function createWrapper(
  component: VueConstructor<Vue>,
  overrideOptions: object = {}
): Wrapper<Vue> {
  const defaultOptions = getDefaultOptions();
  const mergedOptions = merge(defaultOptions, overrideOptions);
  return shallowMount(component, mergedOptions);
}

export function createWrapperMount(
  component: VueConstructor<Vue>,
  overrideOptions: object = {}
): Wrapper<Vue> {
  const defaultOptions = getDefaultOptions();
  const mergedOptions = merge(defaultOptions, overrideOptions);
  return mount(component, mergedOptions);
}

function getDefaultOptions() {
  return {
    mocks: {
      $t: () => {},
      $tc: () => {},
      $te: () => {}
    },
    localVue
  };
}
