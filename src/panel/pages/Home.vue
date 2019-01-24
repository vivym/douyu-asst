<template>
  <div class="dyasst-home-wrapper">
    <float-button-view />
    <barrage-view />
    <capture-view />
    <treasure-view />
  </div>
</template>

<script>
import FloatButtonView from 'src/panel/components/home/FloatButtonView.vue';
import BarrageView from 'src/panel/components/home/BarrageView.vue';
import CaptureView from 'src/panel/components/home/CaptureView.vue';
import TreasureView from 'src/panel/components/home/TreasureView.vue';

export default {
  components: { FloatButtonView, BarrageView, CaptureView, TreasureView },
};
</script>

<style scoped>

</style>
