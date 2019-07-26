<template>
  <div :style="{width: width+'px', height:height+'px'}">
  </div>
</template>
<script>
import axios from 'axios'
import mixinChart from './mixins/echarts.js'

const colorList = ['#33db74','#40b3f3','#8855e6','#fe6d71','#ffa14d','#4efdd4','#fff100','#2eb580']
const getDefaultOption = _ => {
  return {
    title: {
      show:false,
      left: 'center',
      top:'center',
      text: '~ 暂无数据 ~',
    },
    textStyle: {
      color: '#818997'
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '8%',
      bottom: '30',
      containLabel: true
    },
    legend: {
      icon: 'rect',
      itemWidth: 10,
      itemHeight: 10,
      top: '0',
      right: '1%',
      textStyle: {
        color: '#818997',
        fontSize: '12'
      },
      data: []
    },
    xAxis:{
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value',
      axisLine: {show: false}
    },
    series: []
  }
}
export default {
  mixins: [mixinChart],
  props: {
    theme: String,
    curDataId: Number
  },
  async beforeMount() {
    this.drawChart(this.curDataId)
  },
  methods: {
    async drawChart(curDataId) {
      let resData,option,jsonObj
      const defaultOption = getDefaultOption()
      if (curDataId) {
        //resData = await axios.get(`${siteFrontURL}report/getData/${curDataId}`)
        //jsonObj = JSON.parse(resData.data.data)
        // option = _.merge(defaultOption, jsonObj.chartOption)
        jsonObj = await axios.get('/api/operation/clickrate')
        let length = jsonObj.data.data.length
        option = defaultOption
        for(let i=0;i<length;i++){
          option.legend.data[i]=jsonObj.data.data[i].name
          option.series[i]=jsonObj.data.data[i]
        }
        //记录无数据条数，无数据处理
        let noData = 0
        option.series.forEach(i => {
          if(i.data == 0){
            noData++
          }
        })
        if(noData == option.series.length) {
          option.title.show = true
          option.yAxis.name = ''
          option.xAxis.name = ''
        }
      } else {
        option = defaultOption
        option.legend.data=['类目一', '类目二', '类目三','类目四']
        option.xAxis.data=['2','4', '6', '8', '10', '12', '14', '16', '18', '20', '22']
        for(let i=0;i<5;i++){
          option.series.push({
            symbol:'none',
            type:'line',
            itemStyle:{
              normal: {
                color: colorList[i],
              }
            },
          })
        }
        option.series[0].name='类目一'
        option.series[1].name='类目二'
        option.series[2].name='类目三'
        option.series[3].name='类目四'
        option.series[0].data=[100,200,600,500,130,320,100,200,600,500,130,320]
        option.series[1].data=[300,130,320,500,800,100,400,300,160,150,130,220]
        option.series[2].data=[300,120,130,400,500,600,140,230,350,550,270,310]
        option.series[3].data=[400,120,150,300,500,600,500,400,300,440,250,140]

      }
      if (this.theme == 'smooth') {
        option.series.forEach(i => {
          i.smooth = true
          i.areaStyle = {}
        })
      }
      this.option = option
      console.log(this.option)
    }
  }
}
</script>