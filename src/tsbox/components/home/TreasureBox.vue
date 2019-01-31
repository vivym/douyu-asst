<template>
  <div class="treasure-wrapper">
    <div class="btn" @click.stop="close">
      <img class="close-btn" src="https://static.jiuwozb.com/assets/images/icon_close2_16.png" />
    </div>
    <div class="treasure-num">99</div>
    <div class="treasure-title">全平台宝箱</div>
  </div>
</template>

<script>
export default {
  methods: {
    close () {
      this.$emit('close');
    },
  },
};
</script>


<style scoped>
  .treasure-wrapper {
    width: 100px;
    height: 100px;
    background-image: url(https://static.jiuwozb.com/assets/images/treasure_close_48f5364.png);
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
    z-index: 600;
  }
  .treasure-num {
    position: absolute;
    top: 0;
    left: 50%;
    height: 18px;
    padding: 0 5px;
    background-color: #e14535;
    color: #fff;
    border-radius: 3px;
    text-align: center;
    line-height: 18px;
    user-select: none;
  }
  .treasure-title {
    position: absolute;
    top: 85%;
    width: 66px;
    margin-left: 17px;
    height: 20px;
    background-color: #e14535;
    color: #fff;
    border-radius: 3px;
    text-align: center;
    line-height: 20px;
    user-select: none;
  }
  .close-btn {
    position: absolute;
    top: 0;
    right: 0;
    width: 16px;
    height: 16px;
  }
  .btn:hover {
    cursor: pointer;
  }
</style>
