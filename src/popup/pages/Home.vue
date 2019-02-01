<template>
  <div class="home-wrapper">
    <header-bar />
    <el-tabs>
      <el-tab-pane label="摸金">
        <ts-hunter-view />
      </el-tab-pane>
      <el-tab-pane label="答题">
        <answer-view />
      </el-tab-pane>
      <el-tab-pane label="其他">
        <misc-view />
      </el-tab-pane>
      <el-tab-pane label="我的">
        <user-view />
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="请安装最新版: 1.1.0"
      :visible.sync="updateDialogShow"
      fullscreen
      :close-on-click-modal="false"
      :before-close="beforeDialogClose">
      <div class="update-wrapper">
        <el-button @click="gotoDownload" type="success" icon="el-icon-download">戳我下载最新版</el-button>
        <img class="zan" src="https://static.jiuwozb.com/assets/images/zan_vivyn.png">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import HeaderBar from 'src/popup/components/home/HeaderBar.vue';
import TsHunterView from 'src/popup/components/home/TsHunterView.vue';
import AnswerView from 'src/popup/components/home/AnswerView.vue';
import MiscView from 'src/popup/components/home/MiscView.vue';
import UserView from 'src/popup/components/home/UserView.vue';
import config from 'config';

export default {
  components: { HeaderBar, TsHunterView, AnswerView, MiscView, UserView },

  data: () => ({
    updateDialogShow: false,
  }),

  created () {
    const ver = window.localStorage.dyasstVer;
    if (ver !== config.version) {
      console.log('new version');
      this.updateDialogShow = true;
    }
  },

  methods: {
    beforeDialogClose () {
      // do thing
    },
    gotoDownload () {
      this.createTab({ url: 'https://yuba.douyu.com/user/main/194634764', selected: true });
    }
  },
};
</script>

<style scoped>
  .home-wrapper {
    display: flex;
    flex-direction: column;
    padding-left: 15px;
    padding-right: 15px;
    width: 310px;
    box-sizing: border-box;
    height: 395px;
  }
  .update-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .zan {
    width: 240px;
    margin-top: 25px;
  }
</style>
