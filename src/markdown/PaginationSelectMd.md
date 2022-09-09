```javascript
<template>
  <div>
    <PaginationSelect
      :selectOptions="selectOptions"
      @getSelectVal="getSelectVal"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @remoteMethod="remoteMethod"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectOptions: {
        filterable: true,
        clearable: true,
        placeholder: "请选择",
        size: "small",
        multiple: false,
        collapseTags: false,
        currentPage: 1,
        pageSize: 2,
        remote: true,
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
    }
  },
   methods: {
    remoteMethod(val) {
      console.log(val, "远程搜索");
    },
    getSelectVal(val) {
      console.log(val, "选中值");
    },
    handleSizeChange(val) {
      this.selectOptions.pageSize = val;
    },
    handleCurrentChange(val) {
      this.selectOptions.currentPage = val;
    }
  }
}
</script>
```
