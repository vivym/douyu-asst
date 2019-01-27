<template>
  <div class="treasure-panel-wrapper">
    <header-bar />
    <div class="body-wrapper">
      <treasure-item v-for="(box, idx) in tsboxes"
                      :key="box.rpid"
                      :class="idx === 4 ? '' : 'hairline_bottom'"
                      :tsbox="box" />
    </div>
  </div>
</template>

<script>
import HeaderBar from './TreasurePanelHeader.vue';
import TreasureItem from './TreasureItem.vue';

export default {
  components: { HeaderBar, TreasureItem },

  data: () => ({
    tsboxes: [
      { rpid: '0', rpt: '100', anchorName: '旭旭宝宝' },
      { rpid: '1', rpt: '101', anchorName: '旭旭宝宝' },
      { rpid: '2', rpt: '102', anchorName: '旭旭宝宝' },
      { rpid: '3', rpt: '105', anchorName: '旭旭宝宝' },
      { rpid: '4', rpt: '100', anchorName: '旭旭宝宝' },
    ],
  }),

  methods: {
  },
};
</script>

<style scoped>
  .treasure-panel-wrapper {
    position: absolute;
    bottom: -20px;
    right: -9px;
    display: flex;
    flex-direction: column;
    width: 328px;
    border: 3px solid #fcd916;
    background-color: #fffbe8;
  }
  .body-wrapper {
    display: flex;
    flex-direction: column;
  }
  .hairline_bottom {
    border-bottom: 1px solid #f2f3f4;
  }
</style>
