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
  z-index: -1;
}
.r-box {
  display: flex;
}
</style>
