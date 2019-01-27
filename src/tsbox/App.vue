<template>
  <div id="dyasst-tsbox">
    <router-view class="r-box"></router-view>
  </div>
</template>

<script>
export default {
  name: 'dyasst-tsbox',
};
</script>

<style scoped>
#dyasst-tsbox {
  position: absolute;
  bottom: 650px;
  right: 10px;
  display: flex;
  z-index: 600;
}
.r-box {
  display: flex;
}
</style>
