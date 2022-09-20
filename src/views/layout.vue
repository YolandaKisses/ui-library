<template>
  <div class="ui-library-main">
    <div class="main-aside">
      <slot name="aside"></slot>
    </div>
    <div class="main-content" v-loading="contentLoading">
      <slot name="content" ></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "MainLayout",
  props: {
    contentLoading: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss" scoped>
.ui-library-main {
  height: 100vh;
  display: flex;
  overflow-y: scroll;
  overflow-x: hidden;
  .main-aside {
    width: 250px;
    padding-top: 20px;
  }
  .main-content {
    flex: 1;
  }
}
</style>