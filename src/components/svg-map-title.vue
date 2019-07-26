<template>
  <svg :viewBox="'0 0 '+width+' '+height" :width="width" :height="height">
    <linearGradient id="linearGradientMapTitle" x1="0" y1="0" x2="0" y2="100%">
      <stop stop-color="rgb(63,224,232)" offset="0%" />
      <stop stop-color="rgb(97,105,204)" offset="100%" />
    </linearGradient>
    <text text-anchor="center" x="68%" y="50%" dy='.35em' id="linearGradientMapTitle" class="linear-gradient-text" fill="url(#linearGradientMapTitle)"> {{text}} </text>
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
.linear-gradient-text{
  font-size: 16px;
  font-weight: 400;
}
</style>

