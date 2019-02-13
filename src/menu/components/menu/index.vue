<template>
  <div class="menu-wrapper">
    <item
      v-for="(item, idx) in items"
      :key="idx"
      :isFirst="idx === 0"
      :backgroundColor="item.backgroundColor"
      :iconUrl="item.iconUrl">
    </item>
  </div>
</template>

<script>
import Item from './Item.vue';

export default {
  components: { Item },

  data: () => ({
    state: 'closed',
    items: [],
  }),

  mounted () {
    console.log('here');
  },

  methods: {
    appendItem () {
    },
  },
}
</script>


<style scoped>
  .menu-wrapper {
    position: absolute;
    right: 20px;
    top: 600px;
    width: 40px;
    height: 40px;
    background-color: red;
  }
</style>
