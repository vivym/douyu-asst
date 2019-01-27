<template>
  <div id="dyasst-notification">
    <router-view class="r-box"></router-view>
  </div>
</template>

<script>
export default {
  name: 'dyasst-notification',
};
</script>

<style scoped>
#dyasst-notification {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  z-index: 3000;
  pointer-events: none;
}
.r-box {
  display: flex;
}
</style>
