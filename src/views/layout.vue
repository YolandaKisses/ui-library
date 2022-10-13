<template>
  <div :class="menuType ? 'ui-library-main-horizontal' : 'ui-library-main-vertical'">
    <div :class="menuType ? 'main-aside-horizontal' : 'main-aside-vertical'">
      <slot name="aside"></slot>
    </div>
    <div class="main-container">
      <div class="main-header">
        <slot name="header"></slot>
      </div>
      <div class="main-content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MainLayout",
  props: {
    menuType: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.ui-library-main-horizontal {
  height: 100vh;
  .main-aside-horizontal {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main-container-horizontal {
    flex: 1;
  }
}
.ui-library-main-vertical {
  height: 100vh;
  display: flex;
  overflow-y: scroll;
  overflow-x: hidden;
  .main-aside-vertical {
    padding-top: 30px;
    width: 200px;
  }
  .main-container {
    flex: 1;
  }
}
</style>