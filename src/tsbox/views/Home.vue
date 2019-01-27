<template>
  <div class="home-wrapper">
    <treasure-box />
    <treasure-panel v-if="panelShow" />
  </div>
</template>

<script>
import TreasureBox from 'src/tsbox/components/home/TreasureBox.vue';
import TreasurePanel from 'src/tsbox/components/home/TreasurePanel.vue';

export default {
  components: { TreasureBox, TreasurePanel },

  data: () => ({
    panelShow: false,
  }),
};
</script>


<style scoped>
  .home-wrapper {
    display: flex;
    position: absolute;
    top: 484px;
    right: 0;
    width: 100px;
    height: 100px;
  }
</style>
