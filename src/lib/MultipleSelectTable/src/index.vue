<template>
  <div class="multiple_select_table">
    <!-- style="width: 100%" -->
    <vxe-pulldown ref="xDown3" destroy-on-close>
      <template slot="default" slot-scope="">
        <!-- style="width: 100% !important" -->
        <el-input
          size="small"
          class="cursor_pointer"
          :placeholder="placeholder"
          :disabled="disabled"
          readonly
          v-model="names"
          :title="names"
          :suffix-icon="isShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
          @click.native="deptogglePanel($event)"
        ></el-input>
      </template>
      <template slot="dropdown" slot-scope="">
        <div ref="tableList">
          <div class="treeDiv" :style="{ width: `${width}` }">
            <vxe-table
              border
              auto-resize
              size="mini"
              ref="xTable"
              max-height="250"
              :filter-config="{ showIcon: false }"
              :data="data"
              @checkbox-all="selectAllEvent"
              @checkbox-change="selectChangeEvent"
              :checkbox-config="{
                checkMethod: checCheckboxkMethod,
                checkStrictly: checkStrictly,
                trigger: 'row',
                highlight: true
              }"
            >
              <vxe-table-column type="checkbox" width="40" align="center"></vxe-table-column>
              <vxe-table-column
                v-for="(item, index) in Columns"
                :key="index"
                :field="item.prop"
                :title="item.label"
                :width="item.width"
                :filters="[{ data: '' }]"
                :filter-method="customStringFilterMethod"
                show-overflow
              >
                <template slot="header" slot-scope="{ column }">
                  <vxe-input
                    type="text"
                    v-for="(option, index) in column.filters"
                    :key="index"
                    v-model="option.data"
                    @change="filterEvent(option)"
                    :placeholder="item.label"
                    clearable
                  ></vxe-input>
                </template>
              </vxe-table-column>
            </vxe-table>
          </div>
        </div>
      </template>
    </vxe-pulldown>
  </div>
</template>

<script>
export default {
  name: "MultipleSelectTable",
  // checkboxAll
  // checkboxChange
  props: {
    // ????????????-??????
    data: {
      type: Array,
      default: () => {
        return [];
      },
      required: true
    },
    // ????????????-??????
    Columns: {
      type: Array,
      required: true
    },
    // v-model ?????????????????????(??????????????????)
    valueField: {
      type: String,
      default: "id"
    },
    // ???????????????????????????(??????????????????)
    labelField: {
      type: String,
      default: "Name"
    },
    // ?????????(?????????)
    placeholder: {
      type: String,
      default: ""
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    // ????????????
    disabled: {
      type: Boolean,
      default: false
    },
    // ????????????
    checCheckboxkMethod: {
      type: Function,
      default: ({ row }) => {
        return row;
      }
    },
    /* ???????????????
    :checCheckboxkMethod="checCheckboxkMethod"
    ...
    methods:{
      ...
      checCheckboxkMethod({row}){
        //???????????????????????? email?????? ?????????
        return row.email
      }
    }

    */

    width: {
      type: String,
      default: "650px"
    },
    value: {}
  },
  // v-model
  model: {
    prop: "value",
    event: "sendData"
  },
  data() {
    return {
      names: "", //input ???
      values: [],
      tableRoleMultipleSelection: [], //??????????????????
      isShow: false
    };
  },
  watch: {
    value(data) {
      this.values = data || [];
      this.getNames();
    },
    // ???????????? ??????, ??????input????????????
    data(data) {
      this.getNames();
    }
  },
  mounted() {
    this.values = JSON.parse(JSON.stringify(this.value));
    this.getNames();
  },
  methods: {
    // ??????input ??????table????????????
    deptogglePanel(event) {
      if (this.disabled) return;
      this.$refs.xDown3.togglePanel();
      // ??????????????????
      this.$nextTick(() => {
        this.data.forEach((row) => {
          if (this.values.includes(row[this.valueField])) {
            this.$refs.xTable.setCheckboxRow(row, true);
          }
        });
      });
    },
    // ????????????
    selectAllEvent({ checked, records }) {
      this.$emit("checkboxAll", { checked, records });
      this.tableRoleMultipleSelection = records;
      this.sureRoleData();
    },
    // ????????????
    selectChangeEvent({ checked, records }) {
      this.$emit("checkboxChange", { checked, records });
      this.tableRoleMultipleSelection = records;
      this.sureRoleData();
    },
    // ????????????
    sureRoleData() {
      this.values = [];
      this.names = "";

      if (this.tableRoleMultipleSelection.length == 0) {
        this.$emit("sendData", this.values);
        return;
      }
      let Selects = this.tableRoleMultipleSelection;
      let Name = "";
      for (let i = 0; i < Selects.length; i++) {
        // ?????????????????? -- ?????? this.valueField ???????????????
        this.values.push(Selects[i][this.valueField]);
        Name += Selects[i][this.labelField] + ",";
      }
      // input?????????
      this.names = Name.slice(0, Name.length - 1);
      // ??????v-model ????????????
      this.$emit("sendData", this.values);
    },
    getNames() {
      let Selects = [];
      this.values.forEach((item) => {
        this.data.forEach((ite) => {
          if (ite[this.valueField] == item) {
            Selects.push(ite);
          }
        });
      });
      let Name = "";
      for (let i = 0; i < Selects.length; i++) {
        Name += Selects[i][this.labelField] + ",";
      }
      this.names = Name.slice(0, Name.length - 1);
    },
    // ??????
    customStringFilterMethod({ option, row, column }) {
      if (option.data) {
        return row[column.property] && row[column.property].toLowerCase().indexOf(option.data) > -1;
      }
      return true;
    },
    // ??????
    filterEvent(option) {
      // console.log(option);
      const xTable = this.$refs.xTable;
      // // ?????????????????????
      option.checked = true;
      // // ??????????????????????????????????????? updateData ??????????????????
      xTable.updateData();
    }
  }
};
</script>

<style lang="scss">
.multiple_select_table {
  .cursor_pointer {
    .el-input__inner {
      cursor: pointer;
    }
  }
  .treeDiv {
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
    position: absolute;
    // top:80px;
    left: -1px;
    z-index: 9999 !important;
    width: 650px;
    //  overflow: auto;
    // max-height: 230px;
    .el-table {
      border: 1px solid #ccc;
      border-radius: 6px;
      overflow: auto;
    }
    .el-table td {
      padding: 4px 0;
    }
    background-color: rgb(241, 239, 239);
  }
}
</style>

<style lang="scss" scoped>
::v-deep .vxe-table--render-default .vxe-body--row.row--checked,
.vxe-table--render-default .vxe-body--row.row--radio {
  background-color: #ffffff !important;
  color: #409eff !important;
}
</style>
