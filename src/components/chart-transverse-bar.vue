<template>
  <div :style="{width: width+'px', height:height+'px'}">
  </div>
</template>
<script>
import axios from 'axios'
import mixinChart from './mixins/echarts.js'

let totleNum = 100
const colorlist = ['#4ad5ec','#2eb580','#45b7ff','#fda23f','#7461ec']
const getDefaultOption = _ => {
  return {
    title: {
      show: false,
      left: 'center',
      top: 'center',
      text: '~ 暂无数据 ~',
    },
  	tooltip: {},
    grid: {
      top:50,
      left:25,
      bottom:10
    },
    xAxis: {
      type: 'value',
      show:false
    },
    yAxis: [{
      show:false,
      data:['华晋焦煤吉宁矿', '陕西神木煤业石窑店矿业有限公司', '晋能忻州公司', '晋能临汾公司', '华晋焦煤沙曲一矿']
    }],
    series: [{
      name: '',
      type: 'bar',
      label: {
        normal: {
          show: true,
          color: colorlist,
          position: [0, -20],
          fontSize:14,
          formatter: '{b}({c})'
        }
      },
      itemStyle: {
        normal: {
          color:function(idx) {
            var color = colorlist
            return color[idx.dataIndex % color.length]
          },
        },
      },
      barWidth: '30%',
      data: [684,862,1067,1440,2395],
    }]
  }
}
export default {
  mixins: [mixinChart],
  props: {
    theme: String,
    initcode:String,
    curDataId: String,
    curDataCode: String
  },
  async beforeMount() {
    this.initAPPCode()
  },
  methods: {
    //选取配置的第一个维度
    async initAPPCode() {
      let initCode
      if(this.initcode){
        initCode = this.initcode.split(',')[0]
      }else{
        initCode = this.curDataCode
      }
      this.drawChart(this.curDataId, initCode)
    },
    async drawChart(curDataId,curDataCode) {
        let resData, option, jsonObj
        const defaultOption = getDefaultOption()
        if (curDataId) {
          resData = await axios.get(`${siteFrontURL}report/getData/${curDataId}/${curDataCode}`)
          jsonObj = JSON.parse(resData.data.data)
          option = _.merge(defaultOption, jsonObj.chartOption)
        } else {
          option = defaultOption
        }
        if(!this.theme){
          option.series[0].barMaxWidth = 20
        }else if (this.theme == 'wave') {
          option.series[0].type = 'pictorialBar'
          option.series[0].symbol = 'path://M0,10 L10,10 C6.5,10 7,0 5,0 C3,0 3.5,10 0,10 z'
        } else if (this.theme == 'cone') {
          option.series[0].type = 'pictorialBar'
          option.series[0].symbol = 'path://"M 100 0 L 50 100 L 150 100 z'
        }
        this.option = option
    }
  }
}
</script>

