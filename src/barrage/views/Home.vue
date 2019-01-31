<template>
  <div :class="['home-wrapper', panelShow ? 'mask' : '']" @click="onMaskClick">
    <div v-if="panelShow" class="panel-wrapper">
      <header-bar :avatarUrl="avatarUrl" :nickName="nickName" :userId="userId" />
      <div class="table-header">
        <el-date-picker
          class="date-picker"
          v-model="selectedDate"
          type="date"
          placeholder="请选择日期"
          size="small"
          popper-class="date-picker-popper"
          align="center"
          @change="onDateChanged">
        </el-date-picker>
        <div class="stats">在本房间总共发送 <i class="red">{{count}}</i> 条弹幕</div>
      </div>
      <el-table :height="260" class="table" :v-loading="tableLoading" :data="data" :show-header="false">
        <el-table-column
          prop="time"
          label="时间"
          width="100">
          <template slot-scope="scope">
            <code>{{scope.row.time}}</code>
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="弹幕">
          <template slot-scope="scope">
            <span v-if="scope.row.content" class="chat-bubble">{{scope.row.content}}</span>
            <a v-else-if="scope.row.loadmore" class="loadmore" @click="scope.row.loadmore">点我加载更多</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import HeaderBar from 'src/barrage/components/home/HeaderBar.vue';

export default {
  components: { HeaderBar },

  data: () => ({
    panelShow: false,
    avatarUrl: '',
    nickName: '',
    userId: '',
    tableLoading: true,
    selectedDate: new Date(),
    data: [],
    count: 0,
  }),

  created () {
    window.dyasstShowBarragePanel = (userInfo) => {
      this.reset(userInfo);
    }
  },

  methods: {
    onMaskClick (evt) {
      if (evt.currentTarget === evt.target) {
        this.panelShow = false;
      }
    },
    reset (userInfo) {
      this.selectedDate = new Date();
      this.avatarUrl = userInfo.avatar;
      this.nickName = userInfo.nickName;
      this.userId = userInfo.rel;
      this.panelShow = true;
      this.data = [];
      this.count = 0;
      this.fetchBarrages();
    },
    fetchBarrages (from) {
      this.tableLoading = true;
      from = from || this.tomorrow();
      this.$api.queryBarrageInOneRoom(this.userId, this.getRoomId(), from).then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.count = res.data.data.total;
          this.data.push(...this.dataMap(res.data.data.barrages || []));
          if (this.data.length < this.count) {
            this.data.push({
              loadmore: (e) => {
                e.preventDefault();
                let from = null;
                this.data.pop();
                if (this.data.length > 0) {
                  const last = this.data[this.data.length - 1];
                  from = new Date(last.cst);
                }
                this.fetchBarrages(from.getTime());
              }
            });
          }
          this.tableLoading = false;
        }
      });
    },
    getRoomId () {
      try {
        return socketProxy.info.room.roomId.toString();
      } catch (err) {
        return '99999';
      }
    },
    tomorrow () {
      const tomorrow = new Date(this.selectedDate.getTime() + 24 * 60 * 60 * 1000);
      tomorrow.setHours(0, 0, 0, 0);
      return tomorrow.getTime();
    },
    dataMap (data) {
      return data.map(data => {
        return {
          time: this.formatTime(new Date(data.cst)),
          content: data.txt,
          cst: data.cst,
        };
      });
    },
    formatTime (date) {
      return `${this.prefixInt(date.getHours(), 2)}:${this.prefixInt(date.getMinutes(), 2)}:${this.prefixInt(date.getSeconds(), 2)}`;
    },
    prefixInt (num, length) {
      return (Array(length).join('0') + num).slice(-length);
    },
    onDateChanged () {
      this.data = [];
      this.fetchBarrages();
    },
  },
};
</script>

<style scoped>
  .home-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 4000;
    pointer-events: none;
  }
  .mask {
    background-color: rgba(0, 0, 0, .6);
    pointer-events: auto;
  }
  .panel-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -350px;
    margin-top: -225px;
    width: 700px;
    height: 450px;
    background-color: white;
    z-index: 200;
    pointer-events: auto;
  }
  .red {
    color: #E04E4F;
  }
  .table-header {
    padding: 20px;
    font-size: 16px;
    color: #444444;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .table-header .stats {
    margin-left: 30px;
  }
  .date-picker {
    width: 140px !important;
  }
  .chat-bubble {
    line-height: 32px;
    height: 32px;
    font-size: 16px;
  }
  .chat-bubble_ {
    background-image: url(https://static.jiuwozb.com/assets/images/barrage/image_dmbg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    line-height: 38px;
    height: 38px;
    font-size: 16px;
    padding-left: 12px;
    padding-right: 12px;
  }
  .loadmore {
    color: #E04E4F;
    line-height: 32px;
    height: 32px;
    font-size: 16px;
  }
</style>

<style>
  .date-picker-popper {
    z-index: 5000 !important;
  }
  .NormalCard-btn:last-child {
    color: white;
    background-image: url(https://static.jiuwozb.com/assets/images/barrage/button_dm_off.png) !important;
    border: none;
  }
  .NormalCard-btn:last-child:hover {
    color: white;
    background-image: url(https://static.jiuwozb.com/assets/images/barrage/button_dm_on.png) !important;
    border: none;
  }
  .NobleCard-btn:last-child {
    color: white;
    background-image: url(https://static.jiuwozb.com/assets/images/barrage/button_dm_off.png) !important;
    border: none;
  }
  .NobleCard-btn:last-child:hover {
    color: white;
    background-image: url(https://static.jiuwozb.com/assets/images/barrage/button_dm_on.png) !important;
    border: none;
  }
</style>
