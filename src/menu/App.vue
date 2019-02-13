<template>
  <div id="dyasst-menu">
    <router-view class="r-box"></router-view>
  </div>
</template>

<script>
export default {
  name: 'dyasst-menu',
};
</script>

<style scoped>
#dyasst-barrage {
  box-sizing: border-box;
}
.r-box {
  display: flex;
}
</style>
