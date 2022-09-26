<template>
  <div>
    <MultipleSelectTable
      ref="multipleSelectTable"
      v-model="formQuery.vcFundCodes"
      :data="fundList"
      :Columns="Columns"
      value-field="vcFundCode"
      label-field="vcFundName"
      placeholder="请选择"
    />
  </div>
</template>

<script>
import MultipleSelectTable from "../lib/MultipleSelectTable/src/index.vue";
export default {
  components: {
    MultipleSelectTable,
  },
  data() {
    return {
      formQuery: {
        vcFundCodes: ["S1", "S3"],
      },
      Columns: [
        { label: "产品代码", prop: "vcFundCode" },
        { label: "产品名称", prop: "vcFundName" },
        { label: "机构", prop: "organization" },
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
            vcFundCode: `S${i + 1}`,
            vcFundName: `产品${i + 1}`,
            organization: `机构${i + 1}`,
          };
          this.fundList.push(obj);
        }
      }, 500);
    },
  },
};
</script>

<style lang="scss"></style>
