<template>
  <div :style="{width: width+'px', height:height+'px'}">
  </div>
</template>
<script>
import axios from 'axios'
import mixinChart from './mixins/echarts.js'

let units = ''   // tooltip 单位
const getDefaultOption = _ => {
  return {
    title: {
      show:false,
      left: 'center',
      top:'center',
      text: '~ 暂无数据 ~',
    },
    tooltip: {
      trigger: 'item',
      formatter: "{b} : {c}人<br/>",
    },
    xAxis: {
      type: 'category',
      data: [],
      name: '',
      nameGap: '1',
      axisLine: {show: false},
      axisTick: {show: false},
      axisLabel: {
        textStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: {
      axisLine: {show: false},
      axisTick: {show: false},
      axisLabel: {
        textStyle: {
          color: '#a6a6cc'
        }
      }
    },
    grid: {
      left: '3%',
      right: '8%',
      bottom: '30',
      containLabel: true
    },
    series: [{
      data: [],
      type: 'line',
      lineStyle:{
        width:8
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#ff864d' }, 
          { offset: 1, color: '#ff6b70' }
        ]),
        lineStyle: {
          color: '#00FF00'
        }
      },
    }]
  }
}
export default {
  mixins: [mixinChart],
  props: {
    theme: String,
    curDataId: String,
    curDataCode: String,
    initcode:String
  },
  async beforeMount() {
    this.drawChart(this.curDataId, this.curDataCode)
  },
  methods: {
    async drawChart(curDataId,curDataCode) {
      let resData, option, jsonObj
      const defaultOption = getDefaultOption()
      option = defaultOption
      option.xAxis.data=['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24']
      option.series[0].data=[50, 20, 45, 47, 68, 98, 36, 28, 72, 30, 14, 16]
      if (this.theme == 'flat') {
        option.series[0].itemStyle={
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#6d76e9' }, 
            { offset: 1, color: '#40e2e9' }
          ]),
        }
        option.series[0].areaStyle={
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#6b78ea' }, { offset: 1, color: '#5aa6f2' }])
          }
        }
      }
      if (this.theme == 'line') {
         option.xAxis.axisLabel={
          rotate: -45
        }
      }
      this.option = option
    }
  }
}
</script>

