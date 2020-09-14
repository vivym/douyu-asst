<template>
  <div class="result-wrapper" @click="close">
    <img class="img" :src="gif" />
  </div>
</template>

<script>
export default {
  props: {
    gif: {
      type: String,
      required: true,
    },
  },

  methods: {
    close () {
      this.$emit('close');
    },
  },
}
</script>

<style scoped>
  .result-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 320px;
    margin-left: -150px;
    margin-top: -160px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
  }
  .img {
    width: 260px;
    height: 260px;
  }
</style>
