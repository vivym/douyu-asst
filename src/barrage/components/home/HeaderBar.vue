<template>
  <div class="header-wrapper">
    <img class="avatar" :src="avatarUrl" @click="openHomePage" />
    <div class="middle">
      <div class="row">
        <i class="nickname">{{nickName}}</i>
        <i class="userid">({{userId}})</i>
      </div>
      <div class="row margin_top_5"><div ref="level"></div></div>
    </div>
    <div class="btn">TA在其他房间的弹幕</div>
  </div>
</template>

<script>
export default {
  props: {
    avatarUrl: {
      type: String,
      required: true,
    },
    nickName: {
      type: String,
      required: true,
    },
    userId: {
      type: [String, Number],
      required: true,
    },
  },

  data: () => ({}),

  mounted () {
    this.$refs.level.parentElement.appendChild(document.querySelector('.UserCardBage').cloneNode(true));
  },

  methods: {
    openHomePage () {
      window.open(`https://yuba.douyu.com/user/main/${this.userId}`, '_blank');
    },
  },
};
</script>

<style scoped>
  .header-wrapper {
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #f2f3f4;
  }
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid #f2f3f4;
  }
  .avatar:hover {
    cursor: pointer;
  }
  .middle {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 15px;
  }
  .btn {
    border: 1px solid #E04E4F;
    border-radius: 18px;
    height: 36px;
    line-height: 36px;
    color: #E04E4F;
    font-size: 16px;
    text-align: center;
    padding-left: 15px;
    padding-right: 15px;
    user-select: none;
  }
  .btn:hover {
    cursor: pointer;
  }
  .row {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  }
  .nickname {
    font-size: 16px;
    color: #444444;
  }
  .userid {
    font-size: 12px;
    color: #888888;
    margin-left: 10px;
  }
  .margin_top_5 {
    margin-top: 5px;
  }
</style>
