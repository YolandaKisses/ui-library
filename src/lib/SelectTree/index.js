import SelectTree from "./src/index.vue"

SelectTree.install = (Vue) => {
  Vue.component(SelectTree.name, SelectTree);
};
export default SelectTree;