<template>
  <div class="home">
    <div class="topnavAndBanner">
      <div class="banner">
        <div class="actions">
          <p class="title">@YolandaKisses / ui-library</p>
          <router-link to="/doc">begin -></router-link>
        </div>
      </div>
    </div>
    <div class="content">
      <div>
        <h2>基于VUE</h2>
        <p>一套基于Vue的UI组件库</p>
      </div>
      <div>
        <h2>二次封装</h2>
        <p>基于elementUI二次封装</p>
      </div>
      <div>
        <h2>简明优先</h2>
        <p>公共组件 / 业务组件</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style lang="less" scoped>
.topnavAndBanner {
  background: linear-gradient(145deg, rgba(227, 255, 253, 1) 0%, rgba(183, 233, 230, 1) 100%);
}

.content {
  height: 200px;
  width: 1600px;
  margin: 100px auto;
  display: flex;
  justify-content: space-around;
  div {
    width: 300px;
    padding-top: 50px;
    text-align: center;
    p {
      margin-top: 10px;
    }
    h2 {
      font-weight: 600;
      opacity: 0.7;
    }
  }
}
.banner {
  color: #007974;
  padding: 200px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > .actions {
    padding: 8px 0;
    font-size: 30px;
    .title {
      padding: 20px;
      display: inline-block;
    }
    a {
      margin: 0 8px;
      background: #02bcb0;
      color: white;
      display: inline-block;
      padding: 8px 24px;
      border-radius: 4px;

      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
