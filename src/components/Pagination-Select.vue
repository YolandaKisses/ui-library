<template>
  <div class="PaginationSelect">
    <h2>Pagination-Select 带分页的下拉框</h2>
    <PaginationSelect
      :selectOptions="selectOptions"
      @getSelectVal="getSelectVal"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    />
  </div>
</template>

<script>
import PaginationSelect from "../lib/Pagination-Select";
export default {
  components: { PaginationSelect },
  data() {
    return {
      // select组件配置项
      selectOptions: {
        filterable: true,
        clearable: true,
        placeholder: "请选择",
        size: "small",
        multiple: false,
        collapseTags: false,
        currentPage: 1,
        pageSize: 2,
        selectData: [
          {
            value: "1",
            label: "黄金糕"
          },
          {
            value: "2",
            label: "双皮奶"
          },
          {
            value: "3",
            label: "蚵仔煎"
          },
          {
            value: "4",
            label: "龙须面"
          },
          {
            value: "5",
            label: "北京烤鸭"
          }
        ]
      }
    };
  },
  methods: {
    getSelectVal(val) {
      console.log(val);
    },
    handleSizeChange(val) {
      this.selectOptions.pageSize = val;
    },
    handleCurrentChange(val) {
      this.selectOptions.currentPage = val;
    }
  }
};
</script>

<style lang="scss">
.PaginationSelect {
  h2 {
    margin-bottom: 20px;
  }
}
</style>