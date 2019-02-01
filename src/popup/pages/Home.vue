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
  </div>
</template>

<script>
import HeaderBar from 'src/popup/components/home/HeaderBar.vue';
import TsHunterView from 'src/popup/components/home/TsHunterView.vue';
import AnswerView from 'src/popup/components/home/AnswerView.vue';
import MiscView from 'src/popup/components/home/MiscView.vue';
import UserView from 'src/popup/components/home/UserView.vue';

export default {
  components: { HeaderBar, TsHunterView, AnswerView, MiscView, UserView },
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
</style>
