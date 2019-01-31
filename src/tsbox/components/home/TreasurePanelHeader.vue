<template>
  <div class="header-wrapper">
    <div class="refresh-time">{{refreshTimeStr}}</div>
    <div class="btn-row">
      <div class="btn" @click="refresh">
        <img src="https://static.jiuwozb.com/assets/images/tsbox/icon_next.png" />
        <i class="margin_left_5">换一批</i>
      </div>
      <div class="btn margin_left_20" @click="openAll">
        <img src="https://static.jiuwozb.com/assets/images/tsbox/icon_next.png" />
        <i class="margin_left_5">全部打开</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    refreshTime: Date.now(),
  }),

  computed: {
    refreshTimeStr () {
      return '2019-01-25 23:22';
    },
  },

  methods: {
    refresh () {
      this.$emit('refresh');
    },
    openAll () {
      this.$emit('openAll');
    },
  },
};
</script>

<style scoped>
  .header-wrapper {
    display: flex;
    height: 20px;
    padding: 15px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .refresh-time {
    color: #A28B1D;
  }
  .btn-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .btn {
    flex-direction: row;
    user-select: none;
  }
  .btn:hover {
    cursor: pointer;
  }
  .btn i {
    color: #E64935;
  }
  .btn img {
    width: 12px;
    height: 12px;
  }
  .margin_left_5 {
    margin-left: 5px;
  }
  .margin_left_20 {
    margin-left: 20px;
  }
</style>
