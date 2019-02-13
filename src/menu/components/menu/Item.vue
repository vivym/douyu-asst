<template>
  <div class="item-wrapper"></div>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: '#FF5C5C',
    },
    iconUrl: {
      type: String,
      default: '',
    },
  },

  methods: {
  },
};
</script>

<style scoped>
  .item-wrapper {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
</style>
