<template>
  <div id="dyasst">
    <router-view class="r-box"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style scoped>
#dyasst {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  z-index: 1000;
}
.r-box {
  display: flex;
}
</style>
