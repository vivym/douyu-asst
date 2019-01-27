<template>
  <div class="treasure-wrapper">
    <div class="treasure-num">99</div>
    <div class="treasure-title">全平台宝箱</div>
  </div>
</template>

<style scoped>
  .treasure-wrapper {
    width: 100px;
    height: 100px;
    background-image: url(https://static.jiuwozb.com/assets/images/treasure_close_48f5364.png);
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
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
  }
</style>
