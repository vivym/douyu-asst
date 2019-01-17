<template>
  <div class="misc-wrapper">
    <el-row type="flex" align="middle">
      <el-col :span="10">
        <div class="row-title">同步网络时间</div>
      </el-col>
      <el-col :span="7">
        <el-switch v-model="netTimeSync" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    netTimeSync: true,
  }),

  watch: {
    netTimeSync (value) {
      this.$store.commit('SET_NET_TIME_SYNC', value);
    },
  },

  created () {
    this.netTimeSync = this.$store.state.setting.netTimeSync;
  },
};
</script>

<style scoped>
  .row-title {
    font-size: 14px;
    font-weight: bold;
    color: #555;
  }
</style>
