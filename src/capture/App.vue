<template>
  <div id="dyasst-capture">
    <router-view class="r-box"></router-view>
  </div>
</template>

<script>
export default {
  name: 'dyasst-capture',
};
</script>

<style scoped>
#dyasst-capture {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  z-index: 3000;
  pointer-events: none;
  box-sizing: border-box;
}
.r-box {
  display: flex;
}
</style>
