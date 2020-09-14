<template>
  <div
    ref="finderWrapper"
    class="finder-wrapper"
    :style="{ top: `-${playerSize.height}px`, width: `${playerSize.width}px`, height: `${playerSize.height}px` }">
    <div
      ref="finder"
      class="finder"
      :style="{ width: `${width}px`, height: `${height}px`, left: `${left}px`, top: `${top}px` }"
      @mousedown="onMouseDown"
      @touchstart="onMouseDown">
    </div>
    <div class="mask" :style="maskStyle1"></div>
    <div class="mask" :style="maskStyle2"></div>
    <div class="mask" :style="maskStyle3"></div>
    <div class="mask" :style="maskStyle4"></div>
  </div>
</template>

<script>
export default {
  props: {
    playerSize: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    dragging: false,
    isClick: false,
    left: 100,
    top: 100,
    width: 260,
    height: 260,
    isToMove: true,
    growX: 1,
    growY: 1,
    startX: 0,
    startY: 0,
    startPosition: null,
  }),

  computed: {
    maskStyle1 () {
      return { top: 0, left: 0, width: `${this.playerSize.width}px`, height: `${this.top}px` };
    },
    maskStyle2 () {
      return {
        bottom: 0,
        left: 0,
        width: `${this.playerSize.width}px`,
        height: `${Math.max(this.playerSize.height - this.top - this.height, 0)}px`,
      };
    },
    maskStyle3 () {
      return {
        top: `${this.top}px`,
        left: 0,
        width: `${this.left}px`,
        height: `${this.height}px`,
      };
    },
    maskStyle4 () {
      return {
        top: `${this.top}px`,
        right: 0,
        width: `${this.playerSize.width - this.left - this.width}px`,
        height: `${this.height}px`,
      };
    },
  },

  methods: {
    currentPosition () {
      return {
        left: this.left,
        top: this.top,
        width: this.width,
        height: this.height,
      };
    },
    onMouseDown (e) {
      e.preventDefault();
      this.onDragStart(e);
      window.addEventListener('mousemove', this.onDragging);
      window.addEventListener('touchmove', this.onDragging);
      window.addEventListener('mouseup', this.onDragEnd);
      window.addEventListener('touchend', this.onDragEnd);
      window.addEventListener('contextmenu', this.onDragEnd);
    },
    onDragStart (e) {
      this.dragging = true;
      this.isClick = true;
      if (e.type === 'touchstart') {
        e.clientX = e.touches[0].clientX;
        e.clientY = e.touches[0].clientY;
      }
      const finderRect = this.$refs.finder.getBoundingClientRect();
      const layerX = e.clientX - finderRect.left;
      const layerY = e.clientY - finderRect.top;
      if ((layerX < this.width * 0.3 || layerX > this.width * 0.7) &&
        (layerY < this.height * 0.3 || layerY > this.height * 0.7)) {
        if (layerX < this.width * 0.3) {
          this.growX = -1;
        } else if (layerX > this.width * 0.7) {
          this.growX = 1;
        }
        if (layerY < this.height * 0.3) {
          this.growY = -1;
        } else if (layerY > this.height * 0.7) {
          this.growY = 1;
        }
        this.isToMove = false;
      } else {
        this.isToMove = true;
      }
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.startPosition = this.currentPosition();
    },
    onDragging (e) {
      if (this.dragging) {
        this.isClick = false;
        if (e.type === 'touchmove') {
          e.clientX = e.touches[0].clientX;
          e.clientY = e.touches[0].clientY;
        }
        this.currentX = e.clientX;
        const deltaX = this.currentX - this.startX;
        this.currentY = e.clientY;
        const deltaY = this.currentY - this.startY;
        const newPosition = {
          left: this.left,
          top: this.top,
          width: this.width,
          height: this.height,
        };
        if (this.isToMove) {
          newPosition.left = this.startPosition.left + deltaX;
          newPosition.top = this.startPosition.top + deltaY;
        } else {
          const delta = Math.min(Math.abs(deltaX), Math.abs(deltaY));
          const { growX, growY } = this;
          if (growX * deltaX * growY * deltaY > 0) {
            newPosition.width = this.startPosition.width + delta * Math.sign(deltaX) * Math.sign(growX);
            newPosition.height = this.startPosition.height + delta * Math.sign(deltaY) * Math.sign(growY);          
          }
          if (growX === -1) {
            newPosition.left = this.startPosition.left + delta * Math.sign(deltaX);
          }
          if (growY === -1) {
            newPosition.top = this.startPosition.top + delta * Math.sign(deltaY);
          }
        }
        if (this.checkPosition(newPosition)) {
          this.left = newPosition.left;
          this.top = newPosition.top;
          this.width = newPosition.width;
          this.height = newPosition.height;
        }
        console.log(this.currentPosition());
        this.$emit('change', this.currentPosition());
      }
    },
    checkPosition (pos) {
      return this.checkInside(pos.left, pos.top) &&
        this.checkInside(pos.left + pos.width, pos.top) &&
        this.checkInside(pos.left, pos.top + pos.height) &&
        this.checkInside(pos.left + pos.width, pos.top + pos.height);
    },
    checkInside (x, y) {
      return x >= 0 && x <= this.playerSize.width && y >= 0 && y <= this.playerSize.height;
    },
    onDragEnd (e) {
      if (this.dragging) {
        setTimeout(() => {
          this.dragging = false;
          if (!this.isClick) {
            // this.setPosition(this.newPosition);
          }
        }, 0);
        window.removeEventListener('mousemove', this.onDragging);
        window.removeEventListener('touchmove', this.onDragging);
        window.removeEventListener('mouseup', this.onDragEnd);
        window.removeEventListener('touchend', this.onDragEnd);
        window.removeEventListener('contextmenu', this.onDragEnd);
      }
    },
  },
};
</script>

<style scoped>
  .finder-wrapper {
    position: absolute;
    left: 0;
    
  }
  .mask {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .finder {
    position: absolute;
    border: 1px solid white;
  }
  .finder:hover {
    cursor: pointer;
  }
</style>
