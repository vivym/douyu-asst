<template>
  <div class="red-wrapper">
    <el-tabs>
      <el-tab-pane label="支付宝口令红包">
        <div class="code-wrapper" v-loading.lock="loading">
          <img class="bg" src="https://static.jiuwozb.com/assets/images/redpacket.jpg">
          <span class="code">{{alipayCode}}</span>
          <span class="tip">支付宝红包不定时发放</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="支付宝二维码红包">
        <div class="alipay-ttlhb-wrapper" v-loading.lock="loading">
          <img :src="alipayTTLHBQrcodeUrl">
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from 'axios';
const baseUrl = 'https://api.jiuwozb.com/dyasst';
// const baseUrl = 'http://127.0.0.1:7001';

export default {
  data: () => ({
    loading: false,
    lastTips: null,
    alipayCode: '',
    alipayTTLHBQrcodeUrl: 'https://static.jiuwozb.com/assets/images/alipay_ttlhb_qrcode_vivym.png',
  }),

  methods: {
    update () {
      this.loading = true;
      axios.get(`${baseUrl}/redPacket?t=${Date.now()}`).then(res => {
        if (res.status === 200 && res.data.code === 0) {
          const { alipayCode, alipayTTLHBQrcodeUrl, tips } = res.data.data;
          this.alipayCode = alipayCode;
          this.alipayTTLHBQrcodeUrl = alipayTTLHBQrcodeUrl;
          if (tips && tips !== this.lastTips) {
            this.$message({
              message: tips,
              type: 'success',
              duration: 3000,
              center: true,
              showClose: true,
              customClass: 'dyasst-message-1',
            });
            this.lastTips = tips;
          }
        } else {
          console.error(res);
        }
        this.loading = false;
      }).catch(err => console.error(err));
    },
  },
};
</script>

<style scoped>
  .code-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }
  .bg {
    width: 280px;
    height: 200px;
  }
  .code {
    position: absolute;
    top: 90px;
    color: white;
    font-size: 26px;
    font-weight: bold;
  }
  .tip {
    position: absolute;
    bottom: -2px;
    font-size: 13px;
    font-weight: bold;
    color: #555555;
  }
  .alipay-ttlhb-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .alipay-ttlhb-wrapper img {
    height: 200px;
  }
</style>

<style>
  .dyasst-message-1 {
    min-width: 300px;
  }
</style>
