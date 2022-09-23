import SelectTable from "./src/index.vue"

SelectTable.install = (Vue) => {
  Vue.component(SelectTable.name, SelectTable);
};
export default SelectTable;