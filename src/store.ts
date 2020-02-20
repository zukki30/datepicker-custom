import Vue from "vue";
import Vuex, { ActionContext, ActionTree } from "vuex";

Vue.use(Vuex);

export interface RootState {}

const actions = <ActionTree<RootState, RootState>>{};

export default new Vuex.Store<RootState>({
  actions: actions,
  modules: {}
});
