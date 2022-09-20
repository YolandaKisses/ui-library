import MyChart from "./src/index.vue"

MyChart.install = (Vue) => {
  Vue.component(MyChart.name, MyChart);
};
export default MyChart;