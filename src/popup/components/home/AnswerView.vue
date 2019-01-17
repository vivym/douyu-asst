<template>
  <div class="answer-wrapper">
    <el-row type="flex" align="middle">
      <el-col :span="7">
        <div class="row-title">自动答题</div>
      </el-col>
      <el-col :span="7">
        <el-switch v-model="autoAnswerEnabled" :width="50" />
      </el-col>
    </el-row>
    <el-row type="flex" align="middle" class="margin_top_15">
      <el-col :span="7">
        <div class="row-title">自动刷新</div>
      </el-col>
      <el-col :span="10">
        <el-select v-model="autoRefreshFreq" size="small">
          <el-option label="不自动刷新" value="0" />
          <el-option label="1分钟" value="60" />
          <el-option label="3分钟" value="180" />
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    autoAnswerEnabled: false,
    autoRefreshFreq: '0',
  }),

  watch: {
    autoAnswerEnabled (value) {
      this.$store.commit('SET_AUTO_ANSWER_ENABLED', value);
    },
    autoRefreshFreq (value) {
      this.$store.commit('SET_AUTO_REFRESH_FREQ', value);
    },
  },

  created () {
    this.autoAnswerEnabled = this.$store.state.setting.autoAnswerEnabled;
    this.autoRefreshFreq = this.$store.state.setting.autoRefreshFreq;
  },
};
</script>

<style scoped>
  .row-title {
    font-size: 14px;
    font-weight: bold;
    color: #555;
  }

  .margin_top_15 {
    margin-top: 15px;
  }
</style>
