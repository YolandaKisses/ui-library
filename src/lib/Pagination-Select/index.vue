<template>
  <div id="PaginationSelect">
    <el-select
      v-model="value"
      :placeholder="selectOptions.placeholder"
      :filterable="selectOptions.filterable"
      :size="selectOptions.size"
      :collapse-tags="selectOptions.collapseTags"
      :multiple="selectOptions.multiple"
      :clearable="selectOptions.clearable"
      @change="selectChange"
    >
      <el-option
        v-for="item in selectOptions.selectData.slice(
          (selectOptions.currentPage - 1) * selectOptions.pageSize,
          selectOptions.currentPage * selectOptions.pageSize
        )"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="selectOptions.currentPage"
        layout="prev, pager, next"
        :page-size="selectOptions.pageSize"
        :total="selectOptions.selectData.length"
      >
      </el-pagination>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "PaginationSelect",
  props: {
    selectOptions: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      value: ""
    };
  },
  methods: {
    selectChange(val) {
      this.$emit("getSelectVal", val);
    },
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    }
  }
};
</script>

<style lang="scss">
.el-pagination {
  display: flex;
  justify-content: center;
}
</style>
