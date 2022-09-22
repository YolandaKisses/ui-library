import MultipleSelectTree from "./src/index.vue"

MultipleSelectTree.install = (Vue) => {
  Vue.component(MultipleSelectTree.name, MultipleSelectTree);
};
export default MultipleSelectTree;