<template>
  <div v-show="show" class="home-wrapper">
    <div class="button" @click="close">
      <img class="close-button" :src="closeIconUrl" title="关闭" />
    </div>
    <div class="switch-row">
      <el-switch class="switch"
                  v-model="pcNotificationEnabled"
                  :width="37"
                  active-color="#13ce66"
                  inactive-color="#ff4949"/>
      <p>PC提醒</p>
    </div>
    <img class="qrcode"
          :src="qrcodeUrl"/>
    <div class="footer-1">微信扫码打开</div>
    <div class="footer-2">{{label2_0}}<span style="color: #00FFDD">微信</span>提醒</div>
  </div>
</template>

<script>
const config = require('config');

export default {
  data: () => ({
    closeIconUrl: 'https://static.jiuwozb.com/assets/images/icon_close2_16.png',
    pcNotificationEnabled: true,
    qrcodeUrl: 'https://static.jiuwozb.com/assets/images/notification_qrcode_ff.jpg',
    label2_0: config.notification.label2_0,
    show: true,
  }),

  watch: {
    pcNotificationEnabled (value) {
      window.postMessage({ source: 'set_pc_notification', data: value, target: 'bg' }, '*')
    },
  },

  created () {
    this.pcNotificationEnabled = window.dyasstPcNotificationEnabled;
    window.dyasstShowNotification = show => {
      this.show = show;
    };
  },

  methods: {
    close () {
      this.show = false;
    },
  },
};
</script>

<style scoped>
  .home-wrapper {
    position: fixed;
    top: 180px;
    right: 0;
    width: 103px;
    height: 245px;
    z-index: 3000;
    background-image: url(https://static.jiuwozb.com/assets/images/notification_bg.png);
  }
  .button:hover {
    cursor: pointer;
  }
  .close-button {
    position: absolute;
    right: 5px;
    top: 1px;
    width: 16px;
    height: 16px;
  }
  .switch-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;    
    position: absolute;
    top: 86px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .switch-row p {
    color: white;
    margin-left: 5px;
  }
  .qrcode {
    position: absolute;
    left: 8.4px;
    top: 114.1px;
    width: 85.4px;
    height: 85.4px;
  }
  .footer-1 {
    position: absolute;
    left: 14.8px;
    top: 204.4px;
    height: 16px;
    font-size: 11.2px;
    color: white;
    user-select: none;    
  }
  .footer-2 {
    position: absolute;
    left: 14.8px;
    top: 220px;
    height: 16px;
    font-size: 11.2px;
    color: white;
    user-select: none;
  }
</style>
