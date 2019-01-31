<template>
  <div class="misc-wrapper">
    <el-row type="flex" align="middle">
      <el-col :span="11">
        <div class="row-title">同步网络时间</div>
      </el-col>
      <el-col :span="6">
        <el-switch v-model="netTimeSync" />
      </el-col>
    </el-row>
    <el-row type="flex" align="middle" class="margin_top_10">
      <el-col :span="11">
        <div class="row-title">屏蔽进场欢迎弹幕</div>
      </el-col>
      <el-col :span="6">
        <el-switch v-model="blockEnterBarrage" />
      </el-col>
    </el-row>
    <el-row type="flex" align="middle" class="margin_top_10">
      <el-col :span="11">
        <div class="row-title">屏蔽播放器</div>
      </el-col>
      <el-col :span="6">
        <el-switch v-model="blockLiveStream" />
      </el-col>
    </el-row>
    <el-row type="flex" align="middle" class="margin_top_10">
      <el-col :span="11">
        <div class="row-title">极简模式</div>
      </el-col>
      <el-col :span="6">
        <el-switch v-model="minimalism" />
      </el-col>
    </el-row>
    <el-row type="flex" align="middle" class="margin_top_10">
      <el-col :span="11">
        <div class="row-title">显示开播提醒窗口</div>
      </el-col>
      <el-col :span="6">
        <el-switch v-model="notificationShow" />
      </el-col>
    </el-row>
    <el-row type="flex" align="middle" class="margin_top_10">
      <el-col :span="11">
        <div class="row-title">屏蔽直播间广告</div>
      </el-col>
      <el-col :span="6">
        <el-switch v-model="blockRoomAd" />
      </el-col>
    </el-row>
    <el-row type="flex" align="middle" class="margin_top_10">
      <el-col :span="11">
        <div class="row-title">体验贵族弹幕</div>
      </el-col>
      <el-col :span="10">
        <el-select v-model="nobleBarrageExp" size="small">
          <el-option label="关闭" value="off" />
          <el-option label="伯爵" value="3" />
          <el-option label="公爵" value="4" />
          <el-option label="国王" value="5" />
          <el-option label="皇帝" value="6" />
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    netTimeSync: true,
    blockEnterBarrage: false,
    blockLiveStream: false,
    minimalism: false,
    notificationShow: true,
    blockRoomAd: false,
    nobleBarrageExp: 'off',
  }),

  watch: {
    netTimeSync (value) {
      this.$store.commit('SET_NET_TIME_SYNC', value);
      this.updateSetting();
    },
    blockEnterBarrage (value) {
      this.$store.commit('SET_BLOCK_ENTER_BARRAGE', value);
      this.updateSetting();
    },
    blockLiveStream (value) {
      this.$store.commit('SET_BLOCK_LIVE_STREAM', value);
      this.updateSetting();
    },
    minimalism (value) {
      this.$store.commit('SET_MINIMALISM', value);
      this.updateSetting();
    },
    notificationShow (value) {
      this.$store.commit('SET_NOTIFICATION_SHOW', value);
      this.updateSetting();
    },
    blockRoomAd (value) {
      this.$store.commit('SET_BLOCK_ROOM_AD', value);
      this.updateSetting();
    },
    nobleBarrageExp (value) {
      this.$store.commit('SET_NOBLE_BARRAGE_EXP', value);
      this.updateSetting();
    },
  },

  created () {
    this.netTimeSync = this.$store.state.setting.netTimeSync;
    this.blockEnterBarrage = this.$store.state.setting.blockEnterBarrage;
    this.minimalism = this.$store.state.setting.minimalism;
    this.blockLiveStream = this.$store.state.setting.blockLiveStream;
    this.autoSendBarrageEnabled = this.$store.state.setting.autoSendBarrageEnabled;
    this.notificationShow = this.$store.state.setting.notificationShow;
    this.blockRoomAd = this.$store.state.setting.blockRoomAd;
    this.nobleBarrageExp = this.$store.state.setting.nobleBarrageExp;
  },

  methods: {
    updateSetting () {
      const bg = chrome.extension.getBackgroundPage();
      bg && bg.updateSetting && bg.updateSetting();
    },
  },
};
</script>

<style scoped>
  .row-title {
    font-size: 14px;
    font-weight: bold;
    color: #555;
  }
  .margin_top_10 {
    margin-top: 10px;
  }
</style>
