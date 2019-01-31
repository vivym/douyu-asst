<template>
  <div class="treasure-panel-wrapper">
    <div class="btn" @click="close">
      <img src="https://static.jiuwozb.com/assets/images/tsbox/close.png" class="close-btn" />
    </div>
    <header-bar @refresh="refresh" @openAll="openAll" />
    <div ref="body" class="body-wrapper">
      <treasure-item
        v-for="(box, idx) in curTsboxes"
        :key="box.rpid"
        :class="idx === 4 ? '' : 'hairline_bottom'"
        :tsbox="box"
        @timeup="deleteItem(box.rpid, 'timeup')"
        @enter="deleteItem(box.rpid, 'enter')">
      </treasure-item>
    </div>
  </div>
</template>

<script>
import HeaderBar from './TreasurePanelHeader.vue';
import TreasureItem from './TreasureItem.vue';

const isProduction = process && process.env && process.env.NODE_ENV === 'production';

export default {
  components: { HeaderBar, TreasureItem },

  data: () => ({
    tsboxes: [],
    subscriber: null,
    token: null,
    loading: null,
  }),

  computed: {
    curTsboxes () {
      return this.tsboxes.slice(0, 5);
    },
  },

  mounted () {
    this.setLoading();
    if (window.dyasstTsboxSubject) {
      this.subscriber = window.dyasstTsboxSubject.subscribe((box) => {
        if (this.token) {
          clearTimeout(this.token);
          this.token = null;
        }
        if (this.loading) {
          this.loading.close();
          this.loading = null;
        }
        if (box.surplusTime * 1000 - Date.now() > 1000) {
          this.tsboxes.push({
            rid: box.roomId,
            rpid: box.treasureId,
            rpt: box.treasureType,
            snk: box.snk,
            ot: box.surplusTime,
          });
        }
        isProduction || console.log('subscribe', box);
      });
    }
    this.requestBox();
  },

  beforeDestroy () {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
    if (this.token) {
      clearTimeout(this.token);
    }
  },

  methods: {
    close () {
      this.$emit('close');
    },
    refresh () {
      this.tsboxes = [];
      this.requestBox();
    },
    openAll () {
      this.curTsboxes.forEach(box => this.deleteItem(box.rpid, 'enter'));
    },
    setLoading () {
      if (!this.loading) {
        this.loading = this.$loading({
          target: this.$refs.body,
          background: 'rgba(0,0,0,0)',
          text: '加载中，请稍等',
        });
      }
    },
    requestBox () {
      const msg = { source: 'req_box', data: { limit: parseInt(Date.now() / 1000, 10) + 5, count: 20 }, target: 'bg' };
      window.postMessage(msg);
      if (this.token) {
        clearTimeout(this.token);
        this.token = null;
      }
      this.token = setTimeout(() => {
        this.requestBox();
      }, 2000);
    },
    deleteItem (rpid, type) {
      for (let i = 0; i < this.tsboxes.length; ++i) {
        const box = this.tsboxes[i];
        if (box.rpid === rpid) {
          this.tsboxes.splice(i, 1);
          isProduction || console.log(box, type);
          if (type === 'enter') {
            window.postMessage({ source: 'delete_box', data: { rpid }, target: 'bg' });
            window.open(`https://www.douyu.com/${box.rid}`, '_blank');
          }
          break;
        }
      }
      if (this.tsboxes.length === 0) {
        this.requestBox();
        this.setLoading();
      }
    },
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
    z-index: 610;
  }
  .body-wrapper {
    display: flex;
    flex-direction: column;
    height: 319px;
  }
  .hairline_bottom {
    border-bottom: 1px solid #f2f3f4;
  }
  .close-btn {
    width: 28px;
    height: 28px;
    position: absolute;
    top: -34px;
    right: 0;
  }
  .btn:hover {
    cursor: pointer;
  }
</style>
