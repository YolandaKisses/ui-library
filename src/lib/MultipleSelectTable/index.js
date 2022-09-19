import MultipleSelectTable from "./src/index.vue"

MultipleSelectTable.install = (Vue) => {
  Vue.component(MultipleSelectTable.name, MultipleSelectTable);
};
export default MultipleSelectTable;