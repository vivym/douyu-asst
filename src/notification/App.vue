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
  display: flex;
}
.r-box {
  display: flex;
}
</style>
