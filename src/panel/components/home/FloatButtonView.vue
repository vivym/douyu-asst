<template>
  <div class="dyasst-float-button-wrapper">
    <div class="main-button" @click="onMainBtn">
      <img class="avatar" :src="avatarUrl" />
    </div>
    <div class="btn-1 dyasst-btn">
      <img class="avatar" :src="avatarUrl" />
    </div>
    <div class="btn-2 dyasst-btn">
      <img class="avatar" :src="avatarUrl" />
    </div>
    <div class="btn-3 dyasst-btn">
      <img class="avatar" :src="avatarUrl" />
    </div>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';
import { avatarUrl } from 'config';

export default {
  data: () => ({
    avatarUrl,
    animating: false,
    btnShow: false,
  }),
  methods: {
    onMainBtn () {
      if (this.animating) {
        return;
      }
      this.animating = true;
      anime({
        targets: '.dyasst-btn',
        scale: this.btnShow ? 0 : 1,
        complete: anim => {
          if (anim.completed) {
            this.animating = false;
          }
        },
      });
      this.btnShow = !this.btnShow;
    },
  },
};
</script>

<style scoped>
  .dyasst-float-button-wrapper {
    position: fixed;
    bottom: 30px;
    right: 15px;
  }
  .main-button {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 18px;
  }
  .avatar:hover {
    cursor: pointer;
  }
  .btn-1 {
    position: absolute;
    bottom: 0;
    right: 50px;
    transform: scale(0);
  }
  .btn-2 {
    position: absolute;
    bottom: 50px;
    right: 50px;
    transform: scale(0);
  }
  .btn-3 {
    position: absolute;
    bottom: 50px;
    right: 0;
    transform: scale(0);
  }
  .placeholder {
    width: 30px;
    height: 30px;
    background-color: red;
  }
</style>
