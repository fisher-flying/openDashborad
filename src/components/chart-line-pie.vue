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
    dataset: {
      source: [
        ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
        ['考试', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
        ['资讯', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
        ['文档', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
        ['视频', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
      ]
    },
    xAxis: {type: 'category'},
    yAxis: {gridIndex: 0},
    grid: {top: '55%'},
    series: [
      {type: 'line', smooth: true, seriesLayoutBy: 'row'},
      {type: 'line', smooth: true, seriesLayoutBy: 'row'},
      {type: 'line', smooth: true, seriesLayoutBy: 'row'},
      {type: 'line', smooth: true, seriesLayoutBy: 'row'},
      {
        type: 'pie',
        id: 'pie',
        radius: '30%',
        center: ['50%', '35%'],
        label: {
          formatter: '{b}: {@2012} ({d}%)'
        },
        encode: {
          itemName: 'product',
          value: '2012',
          tooltip: '2012'
        }
      }
    ]
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
      this.option = option
      console.log(this.option)
    }
  }
}
</script>

