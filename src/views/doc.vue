<template>
  <div id="doc">
    <main-layout>
      <template slot="aside">
        <div class="aside-title">UI-LIBRARY-MENU</div>
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu mode="vertical" :default-active="$route.path" class="el-menu-vertical-demo" router>
            <el-submenu v-for="item in menubar" :key="item.code" :index="item.code">
              <template slot="title">
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item :index="item.path">{{ item.pathName }}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-scrollbar>
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
export default {
  components: { mainLayout },
  data() {
    return {
      menubar: [
        {
          code: "1",
          title: "公共组件",
          path: "/test",
          pathName: "test"
        },
        {
          code: "2",
          title: "业务组件",
          path: "/Pagination-Select",
          pathName: "Pagination-Select"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
#doc {
  .aside-title {
    text-align: center;
    margin-bottom: 20px;
  }
  .main {
    padding: 20px 150px;
  }
}
</style>