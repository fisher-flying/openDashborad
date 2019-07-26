<template>
  <svg class="current-user-number" height="150">
    <linearGradient id="linearGradientNumber" x1="0" y1="0" x2="0" y2="100%">
        <stop stop-color="rgb(255,219,77)" offset="0%" />
        <stop stop-color="rgb(255,118,77)" offset="100%" />
    </linearGradient>
    <text text-anchor="left" x="14%" y="50%" dy='.35em' id="currentUserNumber" class="linear-gradient-text" fill="url(#linearGradientNumber)"> {{text}} </text>
    <p>人</p>
  </svg>
</template>
<script>
import _ from 'lodash'

// 实时用户量更新
export default {
  props: {
    width: {
      type: Number,
      default: 400,
      required: true
    },
    height: {
      type: Number,
      default: 70,
      required: true
    },
    text: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.cur-user {
  color:#fff;
  text-align: center;
  font-size: 18px;
  position: absolute;
  top: 2%;
  left: 16%;
  z-index: 3
}
.cur-user p {
  float: left;
  margin: 0;
  line-height: 30px;
}
.current-time {
  font-size: 12px;
  line-height: 30px;
}
.current-user-number {
  font-size: 36px;
  line-height: 30px;
}
</style>

