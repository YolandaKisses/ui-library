<template>
  <div>
    <QueryForm
      ref="QueryForm"
      :model="formQuery"
      :formList="formList"
      :rules="rules"
      :buttonList="buttonList"
      labelWidth="auto"
    >
      <template slot="form">
        <el-form-item label="自定义插槽form" >
          <el-input v-model="formQuery.fff"></el-input>
        </el-form-item>
      </template>
      <template slot="button">
        <el-button size="small">自定义插槽button</el-button>
      </template>
    </QueryForm>
  </div>
</template>

<script>
import QueryForm from "../lib/QueryForm";
export default {
  components: { QueryForm },
  data() {
    return {
      formQuery: {
        aaa: "",
        bbb: "",
        bbb1: "",
        ccc: "",
        fff: ""
      },
      formList: [
        { prop: "aaa", label: "日期框", type: "date" },
        {
          prop: "bbb",
          label: "下拉框",
          type: "select",
          filterable: true,
          clearable: true,
          options: [{ dimCde: "01", dimNme: "选项一" }],
          optionProps: { value: "dimCde", label: "dimNme" }
        },
        {
          prop: "bbb1",
          label: "下拉框-多选",
          type: "select",
          multiple: true,
          filterable: true,
          clearable: true,
          options: [
            { dimCde: "01", dimNme: "选项一" },
            { dimCde: "02", dimNme: "选项二" }
          ],
          optionProps: { value: "dimCde", label: "dimNme" }
        },
        { prop: "ccc", label: "input", clearable: true }
      ],
      buttonList: [
        { name: "查询", type: "primary", size: "small", icon: "el-icon-search", loading: false, click: this.onQuery },
        { name: "重置", size: "small", click: this.chongzhi }
      ],
      rules: {
        aaa: { required: true, message: "请选择日期", trigger: "change" }
      }
    };
  },
  methods: {
    onQuery() {
      this.$refs.QueryForm.Form().validate((valid) => {
        if (valid) {
          console.log(this.formQuery);
          console.log("查询");
          this.buttonList[0].loading = true;
          setTimeout(() => {
            this.buttonList[0].loading = false;
          }, 1000);
        } else {
        }
      });
    },
    chongzhi() {
      this.$refs.QueryForm.Form().resetFields()
    }
  }
};
</script>

<style>
</style>