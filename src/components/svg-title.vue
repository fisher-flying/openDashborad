<template>
  <svg :viewBox="'0 0 '+width+' '+height" :style="{width: width, height:height}">
    <linearGradient id="linearGradient" x1="0" y1="0" x2="0" y2="100%">
      <stop stop-color="rgb(63,224,232)" offset="0%" />
      <stop stop-color="rgb(97,105,204)" offset="100%" />
    </linearGradient>
    <linearGradient id="linearGradientLeft" x1="0" y1="0" x2="100%" y2="0">
      <stop stop-color="rgba(97,105,204, 0.1)" offset="0%" />
      <stop stop-color="rgb(63,224,232)" offset="100%" />
    </linearGradient>
    <linearGradient id="linearGradientRight" x1="0" y1="0" x2="100%" y2="0">
      <stop stop-color="rgb(63,224,232)" offset="0%" />
      <stop stop-color="rgba(97,105,204, 0.1)" offset="100%" />
    </linearGradient>
    <rect width="100" height="2" :x="(width-text.length*36)/2-120" :y="height/2" class="linear-gradient-left" fill="url(#linearGradientLeft)"/>
    <circle r="4" :cx="(width-text.length*36)/2-20" :cy="height/2+1" fill="rgb(63,224,232)"/>
    <text text-anchor="middle" x="50%" y="50%" dy='.35em' class="linear-gradient-text" fill="url(#linearGradient)"> {{text}} </text>
    <circle r="4" :cx="width/2+text.length*36/2+20" :cy="height/2+1" fill="rgb(63,224,232)"/>
    <rect width="100" height="2"  :x="width/2+text.length*36/2 + 20" :y="height/2" class="linear-gradient-right" fill="url(#linearGradientRight)"/>
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
  font-size: 32px;
  font-weight: 500;
}
.linear-gradient-left{

}
.linear-gradient-right{
}
</style>

