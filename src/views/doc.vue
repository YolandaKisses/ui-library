<template>
  <div id="doc">
    <main-layout :menuType="menuType">
      <template slot="aside">
        <div class="aside-title">
          <i class="el-icon-menu" @click="handleMenu"></i>
        </div>
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu
            :mode="menuType ? 'horizontal' : 'vertical'"
            :default-active="$route.path"
            router
            class="el-menu-demo"
          >
            <!-- mode="horizontal" -->
            <!-- mode="vertical" -->
            <el-submenu v-for="item in menubar" :key="item.code" :index="item.code">
              <template slot="title">
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item v-for="ite in item.children" :key="ite.path" :index="ite.path">{{
                ite.pathName
              }}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-scrollbar>
      </template>
      <template slot="header">
        <div class="header">头部区域</div>
      </template>
      <template slot="content">
        <div class="main">
          <router-view></router-view>
        </div>
      </template>
    </main-layout>
  </div>
</template>

<script>
import mainLayout from "./layout.vue";
import { menuType } from "../setting";
export default {
  components: { mainLayout },
  data() {
    return {
      menuType,
      menubar: [
        {
          code: "1",
          title: "公共组件",
          children: [
            {
              path: "/test",
              pathName: "test"
            }
          ]
        },
        {
          code: "2",
          title: "业务组件",
          children: [
            {
              path: "/DiffTable",
              pathName: "DiffTable"
            },
            {
              path: "/SelectTable",
              pathName: "SelectTable"
            },
            {
              path: "/MultipleSelectTable",
              pathName: "MultipleSelectTable"
            },
            {
              path: "/MyChart",
              pathName: "MyChart"
            },
            {
              path: "/QueryForm",
              pathName: "QueryForm"
            },
            {
              path: "/SelectTree",
              pathName: "SelectTree"
            },
            {
              path: "/MultipleSelectTree",
              pathName: "MultipleSelectTree"
            }
          ]
        },
        {
          code: "3",
          title: "公共组件",
          children: [
            {
              path: "/a",
              pathName: "a"
            }
          ]
        },
        {
          code: "4",
          title: "公共组件",
          children: [
            {
              path: "/b",
              pathName: "b"
            }
          ]
        },
        {
          code: "5",
          title: "公共组件",
          children: [
            {
              path: "/c",
              pathName: "c"
            }
          ]
        },
        {
          code: "6",
          title: "公共组件",
          children: [
            {
              path: "/d",
              pathName: "d"
            }
          ]
        },
        {
          code: "7",
          title: "公共组件",
          children: [
            {
              path: "/e",
              pathName: "e"
            }
          ]
        },
        {
          code: "8",
          title: "公共组件",
          children: [
            {
              path: "/f",
              pathName: "f"
            }
          ]
        },
        {
          code: "9",
          title: "公共组件",
          children: [
            {
              path: "/g",
              pathName: "g"
            }
          ]
        },
        {
          code: "10",
          title: "公共组件",
          children: [
            {
              path: "/h",
              pathName: "h"
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleMenu() {
      this.menuType = !this.menuType;
    }
  }
};
</script>

<style lang="scss" scoped>
#doc {
  position: relative;
  .aside-title {
    position: absolute;
    top: 0%;
    left: 0%;
    z-index: 9999;
    text-align: center;
    i {
      font-size: 20px;
      cursor: pointer;
    }
  }
  .main {
    padding: 20px 100px;
  }
}
</style>
 