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
  </div>
</template>

<script>
export default {
  data: () => ({
    netTimeSync: true,
    blockEnterBarrage: false,
    blockLiveStream: false,
    minimalism: false,
  }),

  watch: {
    netTimeSync (value) {
      this.$store.commit('SET_NET_TIME_SYNC', value);
    },
    blockEnterBarrage (value) {
      this.$store.commit('SET_BLOCK_ENTER_BARRAGE', value);
    },
    blockLiveStream (value) {
      this.$store.commit('SET_BLOCK_LIVE_STREAM', value);
    },
    minimalism (value) {
      this.$store.commit('SET_MINIMALISM', value);
    },
  },

  created () {
    this.netTimeSync = this.$store.state.setting.netTimeSync;
    this.blockEnterBarrage = this.$store.state.setting.blockEnterBarrage;
    this.minimalism = this.$store.state.setting.minimalism;
    this.blockLiveStream = this.$store.state.setting.blockLiveStream;
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
