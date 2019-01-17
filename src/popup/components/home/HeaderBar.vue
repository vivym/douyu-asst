<template>
  <div class="header-wrapper">
    <div @click.prevent="goto554559">
      <img class="avatar"
            src="https://apic.douyucdn.cn/upload/avatar_v3/201901/0f7525f2c8e74c3c04c147fd748f60f3_big.jpg" />
    </div>
    <p class="header-title">峰峰三号摸金助手</p>
    <div class="header-extra" @click.prevent="gotoMyHome">定制版</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    version: require('shellChrome/manifest').version,
  }),
  methods: {
    goto554559 () {
      this.createTab({ url: 'https://www.douyu.com/554559', selected: true });
    },
    gotoMyHome () {
      this.createTab({ url: 'https://yuba.douyu.com/user/main/194634764', selected: true });
    },
  },
};
</script>

<style scoped>
  .header-wrapper {
    padding: 5px 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f2f3f4;
  }
  .header-title {
    font-size: 20px;
    font-weight: bold;
  }
  .header-extra {
    font-size: 10px;
    color: white;
    background-color: red;
    padding: 4px;
    border-radius: 4px;
  }
  .header-extra:hover {
    cursor: pointer;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .avatar:hover {
    cursor: pointer;
  }
</style>
