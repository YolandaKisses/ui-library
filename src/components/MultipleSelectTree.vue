<template>
  <div>
    <MultipleSelectTree
      v-model="values"
      size="small"
      nodeKey="id"
      :treeData="treeData"
      :defaultProps="defaultProps"
      clearable
      @change="change"
    ></MultipleSelectTree>
  </div>
</template>

<script>
import MultipleSelectTree from "../lib/MultipleSelectTree/index";
export default {
  components: { MultipleSelectTree },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      },
      values: [1, 4, 9],
      treeData: [],
      treeData2: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      setTimeout(() => {
        this.treeData = this.treeData2;
      }, 500);
    },
    change(data){
      console.log(data);
    }
  }
};
</script>

<style>
</style>