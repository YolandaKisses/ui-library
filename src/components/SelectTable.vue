<template>
  <div>
    <SelectTable
      ref="SelectTable"
      v-model="formQuery.fundCode"
      :data="fundList"
      :Columns="Columns"
      size="small"
      value-field="vcFundCode"
      label-field="vcFundName"
      placeholder="请选择"
      @change="change"
    />
  </div>
</template>

<script>
import SelectTable from "../lib/SelectTable/src/index.vue";
export default {
  components: {
    SelectTable,
  },
  data() {
    return {
      formQuery: {
        fundCode: "SSS2",
      },
      Columns: [
        // { label: "产品代码", prop: "vcFundCode" },
        { label: "产品", prop: "vcFundName" },
        { label: "机构", prop: "organization" },
        { label: "成立日期", prop: "creatDate" },
      ],
      fundList: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      setTimeout(() => {
        for (let i = 0; i < 100; i++) {
          let obj = {
            vcFundCode: `SSS${i + 1}`,
            vcFundName: `SSS${i + 1}_产品${i + 1}`,
            organization: `机构${i + 1}`,
            creatDate: "2022-09-23"
          };
          this.fundList.push(obj);
        }
      }, 500);
    },
    change(data){
      console.log(data);
      console.log(this.formQuery.fundCode);
    }
  },
};
</script>

<style lang="scss"></style>
