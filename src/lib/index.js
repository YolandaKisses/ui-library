import DiffTable from "./DiffTable";
import SelectTable from "./SelectTable";
import MultipleSelectTable from "./MultipleSelectTable";
import MyChart from "./MyChart";
import QueryForm from "./QueryForm";
import SelectTree from "./SelectTree";
import MultipleSelectTree from "./MultipleSelectTree";

// 所有组件列表
const components = [
  DiffTable,
  SelectTable,
  MultipleSelectTable,
  MyChart,
  QueryForm,
  SelectTree,
  MultipleSelectTree,
];

// 定义 install 方法，接收 Vue 作为参数
const install = function (Vue) {
  // 遍历注册所有组件
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

// 检测到 Vue 才执行，毕竟我们是基于 Vue 的
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ...components,
};
