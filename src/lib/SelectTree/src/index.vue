<template>
  <div class="select-tree">
    <el-select
      ref="select"
      v-model="names"
      :placeholder="placeholder"
      filterable
      :filter-method="filterMethod"
      @visible-change="visibleChange"
      popper-class="select-tree-popper"
      :size="size"
      :title="names"
      :clearable="clearable"
      :disabled="disabled"
      @clear="selectClear"
    >
      <el-option style="display: none !important" label="item.label" value="item.value"> </el-option>
      <el-tree
        ref="tree"
        :data="treeData"
        :node-key="nodeKey"
        :highlight-current="value || value === 0 ? true : false"
        default-expand-all
        :expand-on-click-node="false"
        :props="defaultProps"
        :filter-node-method="filterNode"
        @node-click="nodeClick"
      >
      </el-tree>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "SelectTree",
  props: {
    // 输入框尺寸
    size: {
      type: String,
      default: ""
    },
    // 是否可以清空选项
    clearable: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 占位文本
    placeholder: {
      type: String,
      default: "请选择"
    },
    // 必填，v-model的值取决于这个字段值
    nodeKey: {
      type: String,
      required: true,
      default: ""
    },
    // tree数据
    treeData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // tree 配置项
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: "children",
          label: "label"
        };
      }
    },
    // v-model 绑定值
    value: {
      default: ""
    }
  },
  // v-model
  model: {
    prop: "value",
    event: "sendData"
  },
  data() {
    return {
      names: "", // input展示文本
      values: "", // value 值
      option: [{ label: "", value: "" }] //tree数据转换后的数据
    };
  },
  created() {
    this.values = JSON.parse(JSON.stringify(this.value));
    this.getOption(); // 获取 option，对 names 赋值
  },
  watch: {
    treeData(data) {
      this.getOption(); // 获取 option，对 names 赋值
    },
    value(data) {
      this.values = data;
      this.getOption();
    }
  },
  methods: {
    // 点击节点
    nodeClick(data, node) {
      if (data) {
        this.names = data[this.defaultProps.label];
        this.values = data[this.nodeKey];
      } else {
        this.names = "";
        this.values = "";
      }
      this.$emit("sendData", this.values);
      let obj = JSON.parse(JSON.stringify(data));
      this.$emit("change", obj);
      this.$refs.select.blur();
    },
    // 节点过滤
    filterMethod(val) {
      this.$refs.tree.filter(val);
    },
    // 节点过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 下拉框显示/隐藏时触发
    visibleChange(flag) {
      if (flag) {
        this.$refs.tree.filter("");
      }
    },
    // 清空
    selectClear() {
      this.values = "";
      this.$emit("sendData", this.values);
      this.$emit("change", {});
      this.$emit("clear");
    },
    // 获取 option，对 names 赋值
    getOption() {
      this.option = [];
      this.abc(this.treeData);
      let obj = this.option.find((item) => {
        return item.value == this.values;
      });
      if (obj) {
        this.names = obj[this.defaultProps.label] || this.values + "";
      } else {
        this.names = this.values + "";
      }
      this.$nextTick(() => {
        if (this.treeData.length && this.$refs.tree) {
          this.$refs.tree.setCurrentKey(this.values);
        }
      });
    },
    // 数据处理
    abc(data) {
      const defaultProps = this.defaultProps;
      data.forEach((item) => {
        let obj = {
          label: item[defaultProps.label],
          value: item[this.nodeKey]
        };
        this.option.push(obj);
        if (item[defaultProps.children]) {
          this.abc(item[defaultProps.children]);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.select-tree-popper {
  .el-select-dropdown__item {
    display: none !important;
  }
  .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    color: #409eff;
    font-weight: 600;
  }
}
</style>