import PaginationSelect from "./src/index.vue"

PaginationSelect.install = (Vue) => {
  Vue.component(PaginationSelect.name, PaginationSelect);
};
export default PaginationSelect;