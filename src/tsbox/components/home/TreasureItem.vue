<template>
  <div class="item-wrapper">
    <img class="type-icon" :src="getTsConfig(tsbox.rpt).iconUrl" />
    <div class="middle">
      <div class="room-name">{{tsbox.anchorName}}</div>
      <count-down />
    </div>
    <div class="right-btn btn">抢宝箱</div>
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
        iconUrl: 'https://gfs-op.douyucdn.cn/dygift/2018/11/27/8334562a2f26a0a08a9ab0db82876d9c.png?x-oss-process=image/format,webp',
      },
      '101': {
        name: '火箭',
        iconUrl: 'https://gfs-op.douyucdn.cn/dygift/2018/11/27/7c14cdf737946c2e4ea1f7a2baa2eda1.gif?x-oss-process=image/format,webp',
      },
      '102': {
        name: '超火',
        iconUrl: 'https://gfs-op.douyucdn.cn/dygift/2019/01/22/88cc1fe6386fa589c09cfb6de2918f7a.png?x-oss-process=image/format,webp',
      },
      '105': {
        name: '宇宙飞船',
        iconUrl: 'https://gfs-op.douyucdn.cn/dygift/2019/01/22/88cc1fe6386fa589c09cfb6de2918f7a.png?x-oss-process=image/format,webp',
      },
    },
  }),

  methods: {
    getTsConfig (rpt) {
      if (this.tsConfigMap[rpt]) {
        return this.tsConfigMap[rpt];
      } else {
        return {
          name: '其他',
          iconUrl: 'https://gfs-op.douyucdn.cn/dygift/2019/01/22/88cc1fe6386fa589c09cfb6de2918f7a.png?x-oss-process=image/format,webp',
        };
      }
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
