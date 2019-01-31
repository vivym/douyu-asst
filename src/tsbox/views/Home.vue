<template>
  <div class="home-wrapper">
    <treasure-box v-if="boxShow" @click.native="showPanel" @close="showBox(false)" />
    <treasure-panel v-if="panelShow" @close="showPanel(false)" />
  </div>
</template>

<script>
import TreasureBox from 'src/tsbox/components/home/TreasureBox.vue';
import TreasurePanel from 'src/tsbox/components/home/TreasurePanel.vue';

export default {
  components: { TreasureBox, TreasurePanel },

  data: () => ({
    boxShow: true,
    panelShow: false,
  }),

  methods: {
    showBox (show = true) {
      this.boxShow = show;
      if (!this.boxShow) {
        const el = document.querySelector('.TreasureWrap');
        if (el) {
          el.style.visibility = 'visible';
        }
      }
    },
    showPanel (show = true) {
      this.panelShow = show;
    },
  },
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
