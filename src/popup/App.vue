<template>
  <div id="app">
    <router-view class="r-box"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style scoped>
#app {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.r-box {
  display: flex;
  height: 100%;
}
</style>
