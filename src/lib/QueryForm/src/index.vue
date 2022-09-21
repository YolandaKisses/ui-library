<template>
  <div class="el-query_form">
    <el-form
      ref="elQueryForm"
      :model="model"
      :rules="rules"
      :label-width="labelWidth"
      :label-position="labelPosition"
      :inline="true"
      size="small"
      class="elQueryForm"
    >
      <div class="form_box">
        <div class="form_conent">
          <el-form-item
            v-for="(item, index) in formList"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            :label-width="item.labelWidth"
          >
            <el-date-picker
              v-if="item.type === 'date'"
              v-model="model[item.prop]"
              type="date"
              :size="item.size"
              value-format="yyyy-MM-dd"
              :placeholder="item.placeholder || '选择日期'"
              :disabled="item.disabled ? true : false"
            >
            </el-date-picker>
            <el-select
              v-else-if="item.type === 'select'"
              v-model="model[item.prop]"
              :size="item.size"
              :multiple="item.multiple ? true : false"
              :collapse-tags="item.collapseTags ? true : false"
              :placeholder="item.placeholder || '请选择'"
              :clearable="item.clearable ? true : false"
              :filterable="item.filterable ? true : false"
              :disabled="item.disabled ? true : false"
            >
              <el-option
                v-for="ite in item.options"
                :key="item.optionProps ? ite[item.optionProps['value']] : ite.value"
                :label="item.optionProps ? ite[item.optionProps['label']] : ite.label"
                :value="item.optionProps ? ite[item.optionProps['value']] : ite.value"
              >
              </el-option>
            </el-select>
            <el-input
              v-else
              v-model="model[item.prop]"
              :size="item.size"
              :placeholder="item.placeholder || '请输入'"
              :clearable="item.clearable ? true : false"
              :disabled="item.disabled ? true : false"
            ></el-input>
          </el-form-item>
          <slot name="form"></slot>
        </div>
        <div class="form_button">
          <el-button
            v-for="(item, index) in buttonList"
            :key="index"
            @click="item['click']"
            :type="item.type"
            :plain="item.plain"
            :icon="item.icon"
            :size="item.size"
            :loading="item.loading"
            :disabled="item.loading"
            >{{ item.name }}</el-button
          >
          <slot name="button"></slot>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "QueryForm",
  props: {
    // 表单数据对象
    model: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 表单验证规则
    rules: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 表单域标签的宽度
    labelWidth: {
      default: ""
    },
    // 表单域标签的位置
    labelPosition: {
      type: String,
      default: "right"
    },
    // 表单项数据
    formList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 按钮组
    buttonList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    // //校验
    // validate() {
    //   return new Promise((resolve, reject) => {
    //     this.$refs["elQueryForm"].validate((valid) => {
    //       if (valid) {
    //         resolve(true);
    //       } else {
    //         resolve(false);
    //       }
    //     });
    //   });
    // },
    // //重置
    // resetForm() {
    //   this.$refs["elQueryForm"].resetFields();
    // },

    // 表单对象
    Form(){
      return this.$refs["elQueryForm"]
    },
  }
};
</script>

<style lang="scss" scoped>
.form_box {
  display: flex;
  justify-content: space-between;
  .form_button {
    white-space: nowrap;
  }
}

.el-query_form{
  .elQueryForm{
    ::v-deep .el-input{
      width: 200px;
    }
  }
}
</style>