<template>
  <div class="header-wrapper">
    <div @click.prevent="gotoRoom">
      <img class="avatar"
           :src="avatarUrl" />
    </div>
    <p class="header-title">{{title}}</p>
    <div class="header-extra" @click.prevent="gotoMyHome">定制版</div>
  </div>
</template>

<script>
const config = require('config');

export default {
  data: () => ({
    title: config.headerTitle,
    avatarUrl: config.avatarUrl,
  }),
  methods: {
    gotoRoom () {
      this.createTab({ url: config.roomUrl, selected: true });
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
