<template>
  <div class="ts-hunter-wrapper">
    <el-row type="flex" align="middle">
      <el-col :span="7">
        <div class="row-title">开启摸金</div>
      </el-col>
      <el-col :span="7">
        <el-switch v-model="ghoulEnabled" :width="50" />
      </el-col>
      <el-col :span="7">
        <i class="icon-button el-icon-setting" @click="showSetting" />
      </el-col>
    </el-row>
    <el-row type="flex" align="middle" class="margin_top_15">
      <el-col :span="7">
        <div class="row-title">摸金模式</div>
      </el-col>
      <el-col :span="9">
        <el-select v-model="ghoulMode" size="small">
          <el-option label="普通模式" value="normal" />
          <el-option label="高级模式" value="pro" />
        </el-select>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle" class="margin_top_10">
      <el-col :span="7">
        <div class="row-title">提示音量</div>
      </el-col>
      <el-col :span="16">
        <el-slider v-model="vol"></el-slider>
      </el-col>
    </el-row>
    <el-card :body-style="{ padding: '10px' }" class="margin_top_10">
      <div slot="header" class="clearfix">
        <span class="card-title">{{statTitle}}</span>
        <span class="card-title float_right">{{totalValue > 0 ? `总价值${totalValue}鱼丸` : ''}}</span>
      </div>
      <div class="card-body">
        <el-row class="card-body-row" type="flex" justify="space-between">
          <el-col :span="6" class="card-col">
            <div class="pic-wrapper">
              <img class="pic" src="https://gfs-op.douyucdn.cn/dygift/1606/ecb0d4c424ff0bafbf4ba52a3284268b.png" />
              <div class="count">{{zan}}</div>
            </div>
          </el-col>
          <el-col :span="6" class="card-col">
            <div class="pic-wrapper">
              <img class="pic" src="https://gfs-op.douyucdn.cn/dygift/1612/9e8e5a8a3c442933926d877d62b08b1b.png" />
              <div class="count">{{wen}}</div>
            </div>
          </el-col>
          <el-col :span="6" class="card-col">
            <div class="pic-wrapper">
              <img class="pic" src="https://gfs-op.douyucdn.cn/dygift/1704/2f2d56c74487baaffd52e5c21c62b65e.png" />
              <div class="count">{{song}}</div>
            </div>
          </el-col>
          <el-col :span="6" class="card-col">
            <div class="pic-wrapper">
              <div class="no-pic"><span>丸</span></div>
              <div class="count">{{silver}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-dialog title="摸金设置" :visible.sync="settingModalShow" fullscreen>
      <el-row type="flex" align="middle">
        <el-col :span="7">
          <div class="row-title">宝箱延迟</div>
        </el-col>
        <el-col :span="16">
          <el-slider v-model="delayRange" range :max="2000" :step="10" :format-tooltip="sliderFormat"></el-slider>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle" class="margin_top_10">
        <el-col :span="20">
          <div class="row-title">自动开宝箱</div>
        </el-col>
        <el-col :span="4">
          <el-switch v-model="autoOpenBox" :width="50" />
        </el-col>
      </el-row>
      <el-row type="flex" align="middle" class="margin_top_10">
        <el-col :span="20">
          <div class="row-title">自动关网页</div>
        </el-col>
        <el-col :span="4">
          <el-switch v-model="autoClose" :width="50" />
        </el-col>
      </el-row>
      <el-row type="flex" align="middle" class="margin_top_10">
        <el-col :span="20">
          <div class="row-title">只要火箭及以上</div>
        </el-col>
        <el-col :span="4">
          <el-switch v-model="rocketOnly" :width="50" />
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { proModeEnabled } from 'config';

export default {
  data: () => ({
    ghoulEnabled: true,
    vol: 30,
    ghoulMode: 'normal',
    delayRange: [1000, 2000],
    autoClose: false,
    autoOpenBox: true,
    rocketOnly: false,
    autoSendBarrageEnabled: true,
    settingModalShow: false,
  }),

  computed: {
    ...mapState({
      box: state => state.stat.box,
      zan: state => state.stat.zan,
      wen: state => state.stat.wen,
      song: state => state.stat.song,
      silver: state => state.stat.silver,
      day: state => state.stat.day,
    }),
    statTitle () {
      const { box } = this;
      return box > 0 ? `今日已开${box}个宝箱` : '今天还没开张';
    },
    totalValue () {
      const { zan, wen, song, silver } = this;
      return (zan + wen + song) * 100 + silver;
    },
  },

  watch: {
    ghoulEnabled (value) {
      this.$store.commit('SET_GHOUL_ENABLED', value);
    },
    vol (value) {
      this.$store.commit('SET_VOL', value);
    },
    delayRange (value) {
      this.$store.commit('SET_DELAY_RANGE', value);
    },
    autoClose (value) {
      this.$store.commit('SET_AUTO_CLOSE', value);
    },
    autoOpenBox (value) {
      this.$store.commit('SET_AUTO_OPEN_BOX', value);
    },
    rocketOnly (value) {
      this.$store.commit('SET_ROCKET_ONLY', value);
    },
    ghoulMode (value, prev) {
      if (proModeEnabled) {
        this.$store.commit('SET_GHOUL_MODE', value);
      } else {
        if (value === 'pro') {
          this.$message({ message: '暂不支持高级模式', type: 'warning' });
          this.ghoulMode = 'normal';
        } else {
          this.$store.commit('SET_GHOUL_MODE', value);
        }
      }
    },
    autoSendBarrageEnabled (value) {
      this.$store.commit('SET_AUTO_SEND_BARRAGE_ENABLED', value);
    },
  },

  created () {
    this.ghoulEnabled = this.$store.state.setting.ghoulEnabled;
    this.vol = this.$store.state.setting.vol;
    this.delayRange = this.$store.state.setting.delayRange;
    this.autoClose = this.$store.state.setting.autoClose;
    this.autoOpenBox = this.$store.state.setting.autoOpenBox;
    this.rocketOnly = this.$store.state.setting.rocketOnly;
    this.ghoulMode = this.$store.state.setting.ghoulMode;
    this.autoSendBarrageEnabled = this.$store.state.setting.autoSendBarrageEnabled;
  },

  methods: {
    showSetting () {
      this.settingModalShow = true;
    },
    sliderFormat (value) {
      return `${value}毫秒`;
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
  .icon-button {
    font-size: 20px;
  }
  .icon-button:hover {
    cursor: pointer;
  }
  .card-title {
    font-size: 14px;
    color: #17233d;
    font-weight: 700;
  }
  .card-col {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pic-wrapper {
    position: relative;
    width: 52px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pic {
    width: 52px;
    height: 52px;
  }
  .no-pic {
    width: 52px;
    height: 52px;
    background-color: #f2f3f4;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    border: 1px solid #d2d3d4;
  }
  .count {
    position: absolute;
    padding: 0 4px;
    right: 0;
    bottom: 0;
    background: #f60;
    color: #fff;
    border-radius: 4px 0 4px 0;
    font-size: 10px;
    text-align: center;
    min-width: 14px;
    line-height: 12px;
  }

  .margin_top_10 {
    margin-top: 10px;
  }
  .margin_top_15 {
    margin-top: 15px;
  }
  .float_right {
    float: right;
  }
</style>
