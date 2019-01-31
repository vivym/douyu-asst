<template>
  <div id="dyasst-barrage">
    <router-view class="r-box"></router-view>
  </div>
</template>

<script>
export default {
  name: 'dyasst-barrage',
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
