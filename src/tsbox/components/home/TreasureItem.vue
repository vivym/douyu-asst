<template>
  <div class="item-wrapper">
    <img class="type-icon" :src="getTsConfig(tsbox.rpt).iconUrl" />
    <div class="middle">
      <div class="room-name">{{tsbox.snk}}</div>
      <count-down :num="surplusTime" @timeup="onTimeup" />
    </div>
    <div class="right-btn btn" @click="enter">抢宝箱</div>
  </div>
</template>

<script>
import CountDown from './CountDown.vue';

export default {
  components: { CountDown },

  props: {
    tsbox: {
      type: Object,
      required: true,
    }
  },

  data: () => ({
    tsConfigMap: {
      '100': {
        name: '飞机',
        iconUrl: 'https://static.jiuwozb.com/assets/images/tsbox/ca48b1ef0de55ff18fee19185a3b4772.webp',
      },
      '101': {
        name: '火箭',
        iconUrl: 'https://static.jiuwozb.com/assets/images/tsbox/9d6502a502cbe37507a56611fe54bc71.webp',
      },
      '102': {
        name: '超火',
        iconUrl: 'https://static.jiuwozb.com/assets/images/tsbox/3adbb0c17d9886c1440d55c9711f4c79.webp',
      },
      '103': {
        name: '宇宙飞船',
        iconUrl: 'https://static.jiuwozb.com/assets/images/tsbox/e3c721e141e90298161653753332ef7d.webp',
      },
    },
  }),

  computed: {
    surplusTime () {
      return parseInt((this.tsbox.ot * 1000 - Date.now()) / 1000, 10);
    },
  },

  methods: {
    getTsConfig (rpt) {
      if (rpt === '100') {
        rpt = '100';
      } else if (rpt === '103') {
        rpt = '102';
      } else if (rpt === '127') {
        rpt = '103';
      } else {
        rpt = '101';
      }
      if (this.tsConfigMap[rpt]) {
        return this.tsConfigMap[rpt];
      } else {
        return {
          name: '其他',
          iconUrl: 'https://gfs-op.douyucdn.cn/dygift/2019/01/22/88cc1fe6386fa589c09cfb6de2918f7a.png?x-oss-process=image/format,webp',
        };
      }
    },
    onTimeup () {
      this.$emit('timeup');
    },
    enter () {
      this.$emit('enter');
    },
  },
};
</script>

<style scoped>
  .item-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
  }
  .type-icon {
    width: 40px;
    height: 40px;
    user-select: none;
  }
  .middle {
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 10px;
  }
  .right-btn {
    height: 24px;
    line-height: 24px;
    text-align: center;
    width: 50px;
    color: white;
    background-color: #e14535;
    border-radius: 3px;
    user-select: none;
  }
  .btn:hover {
    cursor: pointer;
  }
  .room-name {
    font-size: 15px;
    color: #4DA5FC;
    user-select: none;
  }
</style>
