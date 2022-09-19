<template>
  <div>
    <SelectTable
      ref="multipleSelectTable"
      v-model="formQuery.vcFundCodes"
      :data="fundList"
      :Columns="Columns"
      id-field="vcFundCode"
      name-field="vcFundName"
      placeholder="请选择"
    />
  </div>
</template>

<script>
import SelectTable from "../lib/MultipleSelectTable/src/index.vue";
export default {
  components: {
    SelectTable,
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
