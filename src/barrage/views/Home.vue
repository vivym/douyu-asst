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
          raw: data,
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
    renderElements (e, t) {
      const r = [];
      const $b = {
        identity (e) {
          const t = e.showSuperIdentity;
          const r = e.platformGroup;
          const i = e.roomGroup;
          let n = e.identityName || '';
          if (n === '') {
            if (5 !== r && 2 !== r || 1 !== t) {
              if (4 !== i) {
                return '';
              } else {
                n = 'roomAdmin';
              }
            } else {
              n = 'superAdmin';
            }
          }
          return '<span class="Barrage-icon Barrage-icon--' + n + '"></span>';
        },
        noble (e) {
          const r = e.nobleLevel || 0;
          const i = e.nobleConfig; // TODO
          const n = r ? i[r] : null;
          return n ?
            '\n        <span class="Barrage-icon Barrage-noble">\n            <img class="Barrage-nobleImg" src="//res.douyucdn.cn//resource/' +
              n.symbol.web_symbol_pic1 + '" title="' + n.symbol.name + '"/>\n        </span>\n    ' :
            '';
        },
        medal (e) {
          const r = e.chatMedal || []; // TODO
          let i = '';
          if (r && r.length > 0) {
            r.forEach(e => {
              i += '\n                <a class="Medal" ' +
                (e.link ? 'href=' + e.link : '') + ' data-id=' + e.eid + ' ' +
                (e.link ? 'target="_blank"' : '') +
                ' >\n                    <img class="Medal-image ' + (e.achievementId ? 'is-achievement' : '') +
                '" src="' + e.img + '" title="' + (e.title || "") + '" data-achievementId="' +e.achievementId +
                '" />\n                </a>\n            ';
            });
          }
          return i;
        },
        reward (e) {
          const t = e.roomPayLevel
          const r = e.roomPayCount
          const i = e.platformPayLevel
          const n = e.roomPayTitle;
          if (t > 0 && r) {
            return '\n            <span class="Reward"}\n                title="' + n +
              '"\n            >\n                <span class="Reward-image Reward-image--level' + t +
              '"></span>\n                <em class="Reward-level Reward-level--level' + t +
              '">x' + r + '</em>\n            </span>\n        ';
          } else if (i > 0) {
            return '\n            <span class="Reward">\n                <span class="Reward-image Reward-image--other" title="\u916c\u52e4\u7528\u6237"></span>\n            </span>\n        ';
          } else {
            return '';
          }
        },
        anchorLevel (e) {
          const t = e.anchorLevel;
          return t ?
            '\n        <span\n            class="AnchorLevel AnchorLevel-' + t +
              '" style="margin-right:4px"\n            title="\u4e3b\u64ad\u7b49\u7ea7\uff1a' + t +
              '">\n        </span>\n    ' :
            null;
        },
        level (e) {
          const t = e.userLevel;
          const i = e.isNext || '';
          const n = e.isShowUserLevel;
          if (t && (void 0 === n || n)) {
            return '\n        <span\n            class="UserLevel UserLevel--' + (i ? 'next-' : '') + t +
              '"\n            title="\u7528\u6237\u7b49\u7ea7\uff1a' + t + '">\n        </span>\n    ';
          } else {
            return null;
          }
        },
        fans (e) {
          const t = e.fansMedal || {};
          const i = t.lev || 0;
          const a = t.name || '';
          const l = t.medalBgOptions || {};
          const s = t.medalId;
          const c = l.isBest;
          const u = l.url;
          const f = e.checkCode || '';
          const b = e.curRoomId || '';
          const m = e.fansIsDys;
          const h = void 0 !== m && m;
          if (i) {
            if (u) {
              if (b !== s) {
                return '\n                <a class="FansMedal ' + (c ? 'is-best' : 'is-made') +
                  ' Barrage-icon ' + (f ? 'js-fans-hover' : '') + ' ' + (h ? 'js-fans-dysclick' : '') +
                  '" \n                href="/' + s + '" target="_blank" data-rid="' + s +
                  '" ' + (f ? 'data-hc="' + f + '"' : "") +
                  '\n                style="display:inline-block;background-image: url(' + u +
                  ')">\n                    <span class="FansMedal-name ' + (f ? 'js-fans-hover' : '') + ' ' +
                  (h ? 'js-fans-dysclick' : '') + '" data-rid="' + s + '" ' +
                  (f ? 'data-hc="' + f + '"' : '') + '>' + a + '</span>\n                </a>\n            ';
              } else {
                return '\n            <div class="FansMedal ' + (c ? 'is-best' : 'is-made') + ' ' +
                  (h ? 'js-fans-dysclick' : '') + ' Barrage-icon" style="background-image: url(' + u +
                  ')" data-rid="' + s + '">\n                <span class="FansMedal-name ' +
                  (h ? 'js-fans-dysclick' : '') + '" data-rid="' + s + '">' + a + '</span>\n            </div>\n        ';
              }
            } else {
              if (b !== s) {
                return '\n            <a class="FansMedal level-' + i + ' ' + (f ? 'js-fans-hover' : '') + ' ' +
                  (h ? 'js-fans-dysclick' : '') + ' Barrage-icon" href="/' + s + '" target="_blank" data-rid="' + s +
                  '" ' + (f ? 'data-hc="' + f + '"' : '') + '>\n                <span class="FansMedal-name ' +
                  (f ? 'js-fans-hover' : '') + ' ' + (h ? 'js-fans-dysclick' : '') + '" data-rid="' + s + '" ' +
                  (f ? 'data-hc="' + f + '"' : '') + '>' + a + '</span>\n            </a>\n        ';
              } else {
                return '\n        <div class="FansMedal level-' + i + ' ' + (h ? 'js-fans-dysclick' : '') +
                  ' Barrage-icon" data-rid="' + s + '">\n            <span class="FansMedal-name ' +
                  (h ? 'js-fans-dysclick' : '') + '" data-rid="' + s + '">' + a + '</span>\n        </div>\n    ';
              }
            }
          } else {
            return '';
          }
        },
        name (e) {
          const t = e.isSelf;
          const r = e.senderNick;
          const n = e.senderId || '';
          const a = e.hasColon;
          const l = e.senderNickPre ||  '';
          const s = e.roleInfo;
          const c = [
            'Barrage-nickName',
            'Barrage-nickName--' + (e.senderNickColor || 'blue'),
            t ? "is-self" : '',
            e.hasCard ? 'js-nick' : ''
          ].filter(Boolean).join(' ');
          const u = (s ? s.name : r) + (a ? '\uff1a' : '');
          const p = e.senderNickTitle || r;
          const renderPre = (e) => {
            return e ? '<span class="Barrage-nickName Barrage-nickName--blue">' + e + '</span>' : '';
          }
          if (r) {
            return '\n            ' + renderPre(l) + '\n            <span class="' + c + '" title="' + p +
              '" data-uid="' + n + '">' + u + '</span>\n        ';
          } else {
            return '';
          }
        },
        emot (e) {
          const t = e.emotCode || '';
          const n = e.repUrl || '';
          return n && r ? '\n            <img class="Emot-image" rel="dy' + r + '" src="' + n + '" />\n    ' : '';
        },
        content (e) {
          const t = e.barrageColor;
          const r = e.chatId;
          const i = e.chatCampColor;
          const n = t >= 0 ? ' Barrage-content--color' + t : '';
          let a = e.barrageContent;
          const o = this.replaceFace(a);
          if (o && o.length > 0) {
            o.forEach(e => {
              const r = e.emotCode || '';
              const i = e.repUrl || '';
              const n = $b.emot({ emotCode: r, repUrl: i });
              a = a.replace(new RegExp('\\[emot:dy" + r + "\\]', 'g'), n);
            });
          }
          return a ? 
            '\n        <span class="Barrage-content' + n + '" data-chatId="' + r + '" ' +
              (i ? 'style="color:' + i + '"' : '') + '>\n            ' + a + '\n        </span>\n    ' :
            '';
        },
        link (e) {
          const r = e.superLink || {};
          return '\n        <a class="HyperLink js-link-dysclick" data-msg-type="' + r.type +
            '" href="' + r.link + '" target="_blank">\n            <span class="HyperLink-brace">\u3010</span>\n            ' +
            $b.content(e) + '\n            <span class="HyperLink-brace">\u3011</span>\n        </a>\n    ';
        },
        baby (e) {
          const r = (e.chatBaby || [])[0];
          let i = '';
          if (r) {
            i += '\n            <a class="Baby" ' +
              (r.link ? 'href="' + r.link + '"' : '') + ' data-id=' + r.eid + ' ' +
              (r.link ? 'target="_blank"' : '') + '>\n                <img class="Baby-image ' +
              (r.achievementId ? 'is-achievement' : '') + '" src="' + r.img + '" title="' +
              (r.title || '') + '" data-achievementId="' + r.achievementId + '" />\n            </a>\n        ';
          }
          return i;
        },
        motor (e) {
          const r = e.motorcadeFlag || '';
          const n = e.motorcadeBg || '';
          if (r) {
            return '\n            <span class="Motor" title="' + r + '" data-motorcade="' + r +
              '" \n            ' + (n ? 'style="background-image:url(' + n + ')"' : '') +
              '"\n            >\n                <span class="Motor-flag">' + r +
              '</span>\n            </span>\n        ';
          } else {
            return '';
          }
        },
        chatAchievement (e) {
          const r = e.chatAchievement || [];
          let i = '';
          if (r && r.length > 0) {
            r.forEach(e => {
              i += '\n                <a class="ChatAchievement">\n                    <img class="ChatAchievement-image is-achievement ' +
                (2 === +e.imgType ? 'is-small2Img' : '') + '" src="' + e.img +
                '"  data-achievementId="' + e.achievementId + '" />\n                </a>\n            ';
            });
          }
          return i;
        },
        roleAvatar (e) {
          const t = e.roleInfo;
          if (t) {
            return '\n            <span class="RoleAvatar-wrapper" title="' + t.name +
              '">\n                <img src="' + t.img +
              '" />\n            </span>\n        ';
          } else {
            return null;
          }
        },
      };
      (e instanceof Array ? e : [e]).forEach(e => {
        const i = $b[e];
        i && r.push(i(t));
      });
      return r.join('');
    },
    renderNormalBarrage (data) {
      const model = this.modelNormalBarrage(data);
      const roleInfo = model.roleInfo();
      let n = '';
      let a = '';
      if (model.nobleBarrage() === 1) {
        n = 'js-noblefloating-barragecont Barrage-notice--noble';
        a = model.nobleColor() ? `background-color: ${model.nobleColor}` : '';
      } else {
        n = model.isFansFloatingBarrage() === 1 ?
          'js-fansfloating-barragecont Barrage--paddedBarrage' :
          'Barrage-notice--normalBarrage';
      }
      return '\n            <div class="' + n + '"' + (a ? ' style="' + a + '"' : '') + '>\n                ' +
        this.renderElements(['identity', 'noble', 'reward', 'medal'], Object.assign({}, model, { hasColon: true })) +
        '\n                ' +
        (e.loveDayMedal ? '<span class="ActLoveDay-medal"><img src=' + e.loveDayMedal + ' /></span>' : '') +
        '\n                ' +
        this.renderElements([
          'fans',
          // 'summerMedal', // TODO
          model.anchorLevel() !== 0 ? 'anchorLevel' : 'level',
          'motor',
          'chatAchievement',
          roleInfo ? 'roleAvatar' : '',
          'name',
          model.superLink() && model.superLink().open ? 'link' : 'content',
          'emot',
          'baby'
        ]) +
        '\n            </div>\n        ';
    },
    modelNormalBarrage (e) {
      if (!this.checkRoomLink(e.txt)) {
        return null;
      }
      const roleInfo = e.roleid ? null : null; // TODO
      const { nicknamePre, nickname } = this.nicknameHandle(e);
      return {
        senderNickPre: () => nicknamePre,
        senderNick: () => nickname,
        senderNickColor: () => this.getChargeNameObj(e.el).color,
        senderNickTitle: () => this.getChargeNameObj(e.el).title,
        userLevel: () => this.getNumberValue(e.level, 0),
        roomGroup: () => this.getNumberValue(e.rg, 1),
        anchorLevel: () => this.getNumberValue(e.ol, 0),
        roomPayLevel: () => this.getNumberValue(e.dlv, 0),
        roomPayCount: () => this.getNumberValue(e.dc, 0),
        platformPayLevel: () => this.getNumberValue(e.bdlv, 0),
        roomPayTitle: () => this.getIsShowSuperIcon(e.dlv),
        chatMedal: 'chatMedal',
        chatAchievement: 'chatAchievement',
        chatBaby: 'chatBaby',
        motorcadeFlag: 'motorcadeFlag',
        motorcadeBg: 'motorcadeBg',
        barrageContent: () => this.htmlEscape(e.txt),
        chatId: 'cid',
        barrageColor: () => this.getNumberValue(e.col, 0) - 1,
        nobleLevel: () => this.getNumberValue(e.nl, 0),
        nobleBarrage: () => this.getNumberValue(e.nc, 0),
        fansMedal: 'fansMedal',
        summerMedal: () => { // TODO
          console.assert(0, 'not implemented');
        },
        isFansFloatingBarrage: () => this.getNumberValue(e.hl, 0),
        checkCode: 'hc',
        superLink: () =>  this.handleLinkBarrage(e.lk || '', e.linkMsgConfig),
        hasCard: () => true,
        clientType: () => this.getNumberValue(e.ct, 0),
        senderId: 'uid',
        senderAvatar: 'ic',
        platformGroup: () => this.getNumberValue(e.pg, 0),
        showSuperIdentity: () => this.getIsShowSuperIcon(e.sahf),
        curRoomId: 'curRoomId',
        nobleConfig: 'nobleConfig',
        fansIsDys: () => true,
        chatCampColor: 'chatCampColor',
        isShowUserLevel: 'isShowUserLevel',
        nobleColor: 'nobleColor',
        pid: 'pid',
        roleInfo: () => roleInfo,
        selector: () => {
          if (this.getNumberValue(e.nc, 0) === 1) {
            return 'js-floating-barrage js-noblefloating-barrage';
          } else if (this.getNumberValue(e.hl, 0) === 1) {
            return 'js-floating-barrage js-fansfloating-barrage';
          } else {
            return '';
          }
        },
        loveDayMedal: () => this.getBarrageConfig({ list: e.el, config: e.actLoveDayConfig }),
      };
    },
    handleLinkBarrage (e, t = {}) {
      const r = e.toString();
      const obj = { open: 0, type: '', link: '' };
      if (!r || r.indexOf('_') <= 0) {
        return obj;
      }
      const i = r.split('_');
      const o = t[i[0]];
      if (i.length >= 2 && t[i[0]] && i[1]) {
        obj.open = 1;
        obj.type = i[0];
        if (i.length === 2) {
          obj.link = o + i[1];
        } else {
          i.shift();
          obj.type = o + i.join('_');
        }
      }
      return obj;
    },
    getBarrageConfig (e = {}) {
      const { list = [], config = {} } = e;
      const { medal = {} } = config;
      let o = '';
      list.forEach(e => {
        if (+e.eid === +medal.medal_id) {
          o = medal.w_pic;
        }
      });
      return o;
    },
    nicknameHandle (e) {
      return e.isAnchor && 16 === +e.ct && 45447946 === +e.pid ? {
          nicknamePre: '[\u7edd\u5730\u6c42\u751f\u5b98\u65b9APP]',
          nickname: e.nn.replace('\u7ad9\u5916_', ''),
        } : {
          nicknamePre: '',
          nickname: e.nn,
        };
    },
    checkRoomLink (e) {
      return typeof e !== 'string' || !e.length || e.match(/\[room=(([\da-z]*?[^\da-z]+[\da-z]*?)|([^\da-z]+[\da-z]*?[^\da-z]+))\]/gi) ? 0 : 1;
    },
    htmlEscape (e) {
      return typeof e === 'string' && e.length ?
        e.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '&nbsp;').
          replace(/'/g, '&#39;').replace(/"/g, '&quot;').replace(/\s/g, ' ') :
        ''
    },
    replaceFace () {

    },
    getNumberValue (e, t) {
      return parseInt(e, 10) || t
    },
    getIsShowSuperIcon (e) {
      return parseInt(isNaN(e) ? 1 : e, 10);
    },
    handleEL (e, t) {
      if (t && t.length) {
        for (let r = t.length, n = 0; n < r; n++) {
          if (e === 'namered' && t[n].eid && t[n].eid === '1500000004') {
            return e;
          }
          if (e === 'namegold' && t[n].eid && t[n].eid === '1500000082') {
            return e;
          }
        }
      }
      return false;
    },
    checkGirlPri (e, t) {
      for (let r = 0, n = e.length; r < n; r++) {
        if (parseInt(e[r].eid, 10) === t) {
          return true;
        }
      }
      return false;
    },
    getChargeNameObj (e) {
      const obj = {};
      if (this.handleEL('namegold', e) === 'namegold') {
        obj.color = 'gold';
        obj.title = '\u91d1\u8272\u6635\u79f0';
      } else if (this.handleEL('namered', e) === 'namered') {
        obj.color = 'red';
        obj.title = '\u7ea2\u8272\u6635\u79f0\uff1a\u7d2f\u8ba1\u5145\u503c\u8d85\u8fc71000\u9c7c\u7fc5\u53ef\u83b7\u5f97\u3002';
      } else if (!this.checkGirlPri(e, 1500000173)) {
        obj.color = 'blue';
        obj.title = '';
      } else {
        obj.color = 'red';
        obj.title = '';
      }
      return obj;
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
