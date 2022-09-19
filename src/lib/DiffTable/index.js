import DiffTable from "./src/index.vue"

DiffTable.install = (Vue) => {
  Vue.component(DiffTable.name, DiffTable);
};
export default DiffTable;