<template>
  <div
    class="draggable"
    ref="draggable"
    :style="{ width: `${width}px`, height: `${height}px`, left: `${left}px`, top: `${top}px` }"
    @mousedown="onMouseDown"
    @touchstart="onMouseDown">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    pos: {
      type: Object,
      default: () => ({
        left: 100,
        top: 100,
        width: 260,
        height: 260,
      }),
    },
    onDragStartHandler: {
      type: Function,
      default: null,
    },
    onDraggingHandler: {
      type: Function,
      default: null,
    },
    playgroundSize: {
      type: Object,
      required: true,
    },
    square: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    dragging: false,
    isClick: false,
    startX: 0,
    startY: 0,
    startPosition: null,
    isToMove: true,
    growX: 1,
    growY: 1,
  }),

  watch: {
    square (value) {
      if (value && this.width !== this.height) {
        const length = Math.min(this.width, this.height);
        this.width = length;
        this.height = length;
      }
    },
  },

  created () {
    this.left = this.pos.left;
    this.top = this.pos.top;
    this.width = this.pos.width;
    this.height = this.pos.height;
  },

  methods: {
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
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.startPosition = this.currentPosition();
      if (this.onDragStartHandler) {
        this.onDragStartHandler(e);
      } else {
        this.defaultDragStartHandler(e);
      }
    },
    defaultDragStartHandler (e) {
      const rect = this.$refs.draggable.getBoundingClientRect();
      const layerX = e.clientX - rect.left;
      const layerY = e.clientY - rect.top;
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
    },
    onDragging (e) {
      if (this.dragging) {
        this.isClick = false;
        if (e.type === 'touchmove') {
          e.clientX = e.touches[0].clientX;
          e.clientY = e.touches[0].clientY;
        }
        if (this.onDraggingHandler) {
          this.onDraggingHandler(e);
        } else {
          this.defaultDraggingHandler(e);
        }
      }
    },
    defaultDraggingHandler (e) {
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
        const realDeltaX = this.square ? delta * Math.sign(deltaX) : deltaX;
        const realDeltaY = this.square ? delta * Math.sign(deltaY) : deltaY;
        if (growX * deltaX * growY * deltaY > 0) {
          newPosition.width = this.startPosition.width + realDeltaX * Math.sign(growX);
          newPosition.height = this.startPosition.height + realDeltaY * Math.sign(growY);          
        }
        if (growX === -1) {
          newPosition.left = this.startPosition.left + realDeltaX;
        }
        if (growY === -1) {
          newPosition.top = this.startPosition.top + realDeltaY;
        }
      }
      if (this.checkPosition(newPosition)) {
        this.left = newPosition.left;
        this.top = newPosition.top;
        this.width = newPosition.width;
        this.height = newPosition.height;
      }
      this.$emit('change', this.currentPosition());
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
    currentPosition () {
      return {
        left: this.left,
        top: this.top,
        width: this.width,
        height: this.height,
      };
    },
    checkPosition (pos) {
      if (pos.width < 80 || pos.height < 80) {
        return false;
      }
      return this.checkInside(pos.left, pos.top) &&
        this.checkInside(pos.left + pos.width, pos.top) &&
        this.checkInside(pos.left, pos.top + pos.height) &&
        this.checkInside(pos.left + pos.width, pos.top + pos.height);
    },
    checkInside (x, y) {
      return x >= 0 && x <= this.playgroundSize.width && y >= 0 && y <= this.playgroundSize.height;
    },
  },
};
</script>

<style scoped>
  .draggable {
    position: absolute;
  }
</style>
