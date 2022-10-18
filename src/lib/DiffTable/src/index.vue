<template>
  <div class="diff-table-container">
    <el-table
      ref="tableRef"
      v-for="(data, i) in completedData"
      :key="i"
      :data="data"
      :border="border"
      :height="tableHeight"
      :stripe="stripe"
      :row-style="markRowStyles"
      :cell-style="markCellStyles"
      :header-cell-style="headerCellStyle"
    >
      <el-table-column
        v-for="col in columns"
        :key="`${i}${col.prop}`"
        :prop="col.prop"
        :label="col.label"
        :min-width="col.minWidth || '100'"
        :width="col.width"
        :header-align="col.headerAlign || 'center'"
        :align="col.align || 'center'"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  name: "DiffTable",
  props: {
    // 对比唯一key
    uniqueKey: {
      type: String,
      default: "id"
    },
    // 需对比表格数据源
    dataGroup: {
      type: Array,
      validator: (val) => val.length === 2
    },
    // 需对比表格的列
    columns: {
      type: Array,
      required: true
    },
    // 新增行背景色
    addRowColor: {
      type: String,
      default: "#E1F3D8"
    },
    // 新增行字体颜色
    addRowTxtColor: {
      type: String,
      default: "red"
    },
    // 差异单元格背景色
    diffCellColor: {
      type: String,
      default: "rgba(254, 250, 207)"
    },
    // 差异单元格字体颜色
    diffCellTxtColor: {
      type: String,
      default: "red"
    },
    // 表格高度
    tableHeight: {
      type: String,
      default: "auto"
    },
    // 是否斑马纹
    stripe: {
      type: Boolean,
      default: true
    },
    // 是否需要边框
    border: {
      type: Boolean,
      default: true
    },
    // 自定义表头
    headerCellStyle: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    // Symbol 的值是唯一的，用来解决命名冲突的问题，即使参数相同
    return {
      // 一个数组，存储有差异的cell属性名
      DIFF_CELL_KEY: Symbol("diffCells"),
      // 标记已完成处理
      COMPLETED_KEY: Symbol("completed")
    };
  },
  computed: {
    /**
     * 处理完成的数据
     * @param { Array } dataGroup 需对比表格数据源
     * @param { String } uniqueKey 根据唯一key进行对比
     * @param { Array } columns 需对比表格列
     * @param { Symbol } DIFF_CELL_KEY 存储有差异的cell属性名
     * @param { Symbol } COMPLETED_KEY 标记已完成处理
     */
    completedData({ dataGroup, uniqueKey, columns, DIFF_CELL_KEY, COMPLETED_KEY }) {
      const cacheMap = new Map();
      // 先遍历一次第一组数据，初始化DIFF_CELL_KEY数组，然后存进map中
      for (const _row of dataGroup[0]) {
        _row[DIFF_CELL_KEY] = [];
        cacheMap.set(_row[uniqueKey], _row);
      }
      // 遍历第二组数据，里面还有一次循环，因为只处理columns里面定义的属性，其他属性不做对比
      for (const _row of dataGroup[1]) {
        for (const { prop } of columns) {
          // 如果是唯一key就直接跳过
          if (prop === uniqueKey) continue;
          // 从缓存中查找相同的一条数据
          const original = cacheMap.get(_row[uniqueKey]);
          // 如果找不到就说明这条数据是新增的，直接跳过
          if (!original) continue;
          // 否则就在两组数据中打一个标识表示已处理过，不是新增的
          _row[COMPLETED_KEY] = true;
          original[COMPLETED_KEY] = true;
          // 最后对比两个属性值，如果相同就push进DIFF_CELL_KEY数组中
          // 注意这里DIFF_CELL_KEY数组只存在于第一组数据当中
          // 因为只要有差异就会在所有表格中显示，所以不用每一组数据都存
          _row[prop] !== original[prop] && original[DIFF_CELL_KEY].push(prop);
        }
      }
      // 将map存一份到this中，因为会在处理样式的时候用到
      this.$_cacheMap = cacheMap;
      return dataGroup;
    }
  },
  methods: {
    /**
     * 完成处理之后没有标记的，就表示只在一组数据中出现，也就是新增数据
     */
    markRowStyles({ row }) {
      return (
        !row[this.COMPLETED_KEY] && {
          backgroundColor: this.addRowColor,
          color: this.addRowTxtColor
        }
      );
    },
    /**
     * 根据当前行的唯一key，找到map中缓存的行数据
     * 然后判断DIFF_CELL_KEY数组中是否包含当前列的属性名
     */
    markCellStyles({ row, column }) {
      const { $_cacheMap, uniqueKey, DIFF_CELL_KEY } = this;
      const _cacheRow = $_cacheMap.get(row[uniqueKey]);
      return (
        _cacheRow &&
        _cacheRow[DIFF_CELL_KEY].includes(column.property) && {
          backgroundColor: this.diffCellColor,
          color: this.diffCellTxtColor
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.diff-table-container {
  display: flex;
  align-items: flex-start;
  .el-table + .el-table {
    margin-left: 20px;
  }
}
</style>
