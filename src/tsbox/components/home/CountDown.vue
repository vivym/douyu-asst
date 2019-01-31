<template>
  <div class="count-down-wrapper">
    <div class="title">倒计时</div>
    <div class="time">00:{{value}}</div>
  </div>
</template>

<script>
export default {
  props: {
    num: {
      type: Number,
      default: 30,
    },
    token: null,
  },
  
  data: () => ({
    value: 0,
  }),

  created () {
    this.value = this.num;
    this.oken = setInterval(() => {
      if (--this.value <= 0) {
        clearInterval(this.token);
        this.$emit('timeup');
      }
    }, 1000);
  },

  beforeDestroy () {
    if (this.token) {
      clearInterval(this.token);
    }
  }
};
</script>

<style scoped>
  .count-down-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    user-select: none;
  }
  .title {
    line-height: 20px;
    font-size: 14px;
    text-align: center;
    color: #666666;
  }
  .time {
    margin-left: 8px;
    font-size: 14px;
    text-align: center;
    color: #e14535;
  }
</style>
