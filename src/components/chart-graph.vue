<template>
  <div :style="{width: width+'px', height:height+'px'}">
  </div>
</template>
<script>
import axios from 'axios'
import mixinChart from './mixins/echarts.js'

let units = ''   // tooltip 单位
const wordslist = [{
    id:'1',
    name:'煤炭',
    x: 0,
    y: 0,
    value: '8536',
    symbolSize: '100',
    itemStyle:{normal:{color: "#e15d68"}},
    label:{
      fontSize:22,
      position: ['33%', '40%']
    }
  },{
    id:'2',
    name:'焦煤',
    x: 98,
    y: -30,
    value: '7102',
    symbolSize: '50',
    itemStyle:{normal:{color: "#f29961"}},
    label:{
      fontSize:18,
      position: ['13%', '110%']
    }
  },{
    id:'3',
    name:'互联网',
    x: -88,
    y: -60,
    value: '6682',
    symbolSize: '36',
    itemStyle:{normal:{color: "#7461ec"}},
    label:{
      fontSize:14,
      position: ['0%', '120%']
    }
  },{id:'4',name:'远程培训',x: -180, y: -82,value: '8536'},
  {id:'5',name:'矿山机电',x: 10, y: -80,value: '8536'},
  {id:'6',name:'教程通道',x: 115, y: -100,value: '7102'},
  {id:'7',name:'操作技能',x: -178, y: -10,value: '7102'},
  {id:'8',name:'煤矿安监局',x: -100, y: 22,value: '8536'},
  {id:'9',name:'操作手册2',x: -160, y: 81,value: '7102'},
  {id:'10',name:'党政知识',x: -40, y: 120,value: '6682'},
  {id:'11',name:'煤矿智能化',x: 50, y:60,value: '6682'},
  {id:'12',name:'煤炭主体专业',x: 160, y: 90,value: '6682'}
]
const getDefaultOption = _ => {
  return {
    tooltip: {},
    series : [{
      type: 'graph',
      layout: 'none',
      symbolSize: '16',
      label: {
        normal: {
          show: true,
          color:'#eee',
          position: [24, 3]
        }
      },
      itemStyle: {
        normal: {
          color: "#00cccd"
        }
      },
      data:wordslist,
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
      this.option = option
    }
  }
}
</script>

