<template>
  <div class="select-tree">
    <el-select
      v-model="names"
      placeholder="请选择"
      filterable
      :filter-method="filterMethod"
      @visible-change="visibleChange"
      popper-class="multiple-select-tree-popper"
      :size="size"
      :title="names"
      :clearable="clearable"
      :disabled="disabled"
      @clear="clearEvent"
    >
      <!-- multiple
      @remove-tag="removeTag" -->
      <el-option style="display: none !important" label="item.label" value="item.value"> </el-option>
      <el-tree
        ref="tree"
        :data="treeData"
        :node-key="nodeKey"
        show-checkbox
        highlight-current
        default-expand-all
        :props="defaultProps"
        :filter-node-method="filterNode"
        :check-strictly="checkStrictly_"
        :expand-on-click-node="false"
        :check-on-click-node="true"
        @check="check"
      >
      </el-tree>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "MultipleSelectTree",
  props: {
    // 输入框尺寸
    size: {
      type: String,
      default: ""
    },
    // 是否可清空
    clearable: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
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
    // 是否严格的遵循父子不互相关联的做法，默认为 true
    checkStrictly: {
      type: Boolean,
      default: true
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
    value: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  // v-model
  model: {
    prop: "value",
    event: "sendData"
  },
  data() {
    return {
      names: "",
      values: [],
      checkStrictly_: true,
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
    // 当复选框被点击的时候触发
    check(data, node) {
      const defaultProps = this.defaultProps;
      let checkedKeys = node.checkedKeys;
      let checkedNodes = node.checkedNodes;
      let halfCheckedKeys = node.halfCheckedKeys;
      let halfCheckedNodes = node.halfCheckedNodes;
      let namesArr = checkedNodes.map((item) => item[defaultProps.label]) || [];
      let Pidarr = halfCheckedNodes.map((item) => item[defaultProps.label]) || [];
      this.names = [...Pidarr, ...namesArr].join(",");
      this.values = [...halfCheckedKeys, ...checkedKeys];
      this.$emit("sendData", this.values);
      this.$emit("change", { value: this.values, data, node });
    },
    // 节点过滤
    filterMethod(val) {
      this.$refs.tree.filter(val);
    },
    filterNode(value, data) {
      const defaultProps = this.defaultProps;
      if (!value) return true;
      return data[defaultProps.label].indexOf(value) !== -1;
    },
    // 下拉框显示/隐藏时触发
    visibleChange(flag) {
      if (flag) {
        this.checkStrictly_ = true;
        this.$refs.tree.filter("");
        this.$refs.tree.setCheckedKeys([]);
        this.$refs.tree.setCheckedKeys(this.value);
        this.checkStrictly_ = false;
      } else {
        this.checkStrictly_ = true;
      }
      this.checkStrictly ? (this.checkStrictly_ = true) : "";
    },
    // 清空
    clearEvent() {
      this.$refs.tree.setCheckedKeys([]);
      this.values = [];
      this.$emit("sendData", this.values);
      this.$emit("change", { value: this.values, data: [], node: [] });
      this.$emit("clear");
    },
    // removeTag(data) {
    //   console.log(data);
    //   this.$refs.tree.setChecked(data, false, true);
    // },

    // 获取 option，对 names 赋值
    getOption() {
      this.option = [];
      this.abc(this.treeData);
      let nameArr = [];
      this.values.forEach((item) => {
        this.option.forEach((i) => {
          if (item == i.value) {
            nameArr.push(i.label);
          }
        });
      });
      this.names = nameArr.join(" , ");
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
.multiple-select-tree-popper {
  .el-select-dropdown__item {
    display: none !important;
  }
}
</style>