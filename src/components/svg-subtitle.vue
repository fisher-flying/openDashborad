<template>
  <svg :viewBox="'0 0 '+width+' '+height" :width="width" :height="height">
    <linearGradient id="linearGradient" x1="0" y1="0" x2="0" y2="100%">
      <stop stop-color="rgb(63,224,232)" offset="0%" />
      <stop stop-color="rgb(97,105,204)" offset="100%" />
    </linearGradient>
    <rect width="3" height="30" :x="8" :y="height/10" class="linear-gradient-left" fill="url(#linearGradient)"/>
    <text text-anchor="left" x="20" y="50%" dy='.35em' class="linear-gradient-text" fill="url(#linearGradient)"> {{text}} </text>
  </svg>
</template>
<script>
import _ from 'lodash'

export default {
  props: {
    width: {
      type: Number,
      default: 200,
      required: true
    },
    height: {
      type: Number,
      default: 50,
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
.linear-gradient-left{

}
.linear-gradient-right{
}
</style>

