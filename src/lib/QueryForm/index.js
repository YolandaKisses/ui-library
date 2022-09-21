import QueryForm from "./src/index.vue"

QueryForm.install = (Vue) => {
  Vue.component(QueryForm.name, QueryForm);
};
export default QueryForm;