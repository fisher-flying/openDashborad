<template>
<div :style="{width: width+'px', height:height+'px'}">
</div>
</template>
<script>
import axios from 'axios'
import mixinChart from './mixins/echarts.js'

const getDefaultOption = _ => {
return {
  tooltip: {
    trigger: 'item',
    show: true,
    formatter: "{b} : {c}人<br/>{d}%",
    backgroundColor: 'rgba(0,0,0,0.7)', // 背景
    padding: [8, 10], //内边距
    extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
  },
  legend: {
    icon: 'circle',
    left: 22,
    top: 10,
    itemGap:15,
    data: ['机械设计', '采矿工程', '矿山机电'],
    textStyle: {
        color: '#a4a5c9'
    }
  },
  title: [{
    text: '45.2%',
    x: '48%',
    y: '30%',
    textAlign: 'center',
    textStyle: {
      color: '#fff',
      fontSize: 18
    },
  },{
    text: '35%',
    x: '25%',
    y: '66%',
    textAlign: 'center',
    textStyle: {
      color: '#fff',
      fontSize: 18
    },
  },{
    text: '15%',
    x: '70%',
    y: '65%',
    textAlign: 'center',
    textStyle: {
      color: '#fff',
      fontSize: 18
    },
    subtextStyle: {color: '#575757',fontSize: '16'},
  }],
  series: [{
    type: 'pie',
    clockWise: false,
    radius: [46, 58],
    center:['48%','35%'],
    itemStyle: {},
    hoverAnimation: false,
    startAngle: 90,
    label:{
      borderRadius:'10',
    },
    data: [{
      value: 55,
      name: '',
      tooltip: {
        show: false
      },
      itemStyle:{
        normal: {
          color: '#474372'
        }
      }
    },{
      value: 45,
      name: '机械设计',
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
            offset: 0, color: '#fc6a6b'
          },{
            offset: 1, color: '#64466d'
          }])
        }
      }
    }]
  },{
    type: 'pie',
    clockWise: false,
    radius: [46, 58],
    center:['25%','70%'],
    itemStyle: {},
    hoverAnimation: false,
    startAngle: 90,
    label:{
      borderRadius:'10',
    },
    data: [{
      value: 65,
      name: '',
      tooltip: {
        show: false
      },
      itemStyle:{
        normal: {
          color: '#323a6b'
        }
      }
    },{
      value: 35,
      name: '采矿工程',
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
            offset: 0, color: '#48aef2'
          },{
            offset: 1, color: '#5e5f87'
          }])
        }
      }
    }]
  },{
    type: 'pie',
    clockWise: false,
    radius: [46, 58],
    center:['70%','70%'],
    itemStyle: {},
    hoverAnimation: false,
    startAngle: 90,
    label:{
      borderRadius:'10',
    },
    data: [{
      value: 85,
      name: '',
      tooltip: {
          show: false
      },
      itemStyle:{
        color: '#37355c'
      }
    },{
      value: 15,
      name: '矿山机电',
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
            offset: 0, color: '#ccaa3b'
          },{
            offset: 1, color: '#e0954b'
          }])
        }
      }
    }]
  }]
}
}
export default {
  mixins: [mixinChart],
  props: {
    theme: String,
    curDataId: String,//报表id
    curDataCode: String,//所属系统id,知识助手or行水云课
    curUserName: String,//用户画像当前用户名
    initcode:String
  },
  async beforeMount() {
    if(this.curUserName == undefined){
      this.initAPPCode()
    }
  },
  methods: {
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
      let resData,option, jsonObj
      const defaultOption = getDefaultOption()
      if (curDataId) {
        resData = await axios.get(`${siteFrontURL}report/getData/${curDataId}/${curDataCode}?userName=${this.curUserName}`)
        jsonObj = JSON.parse(resData.data.data)
        option = _.merge(defaultOption, jsonObj.chartOption)
        option.title.forEach((i,index) => {
          i.subtext = option.legend.data[index]
          i.text = Number(option.series[index].data[0].value / (option.series[index].data[1].value + option.series[index].data[0].value)*100).toFixed(2) + '%'
        })

        if (jsonObj.chartOption.series.length == 0) {
            option.series.forEach((item, index) => {
                option.series[index].data[0].value = 0
            })
        }
      } else {
        option = defaultOption
      }
      option.series.forEach(i => {
        i.itemStyle={
          normal: {
            label: {show: false},
            labelLine: {show: false},
            shadowBlur: 40,
            borderWidth: 8,
            shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
          }
        }
      })

      if (this.theme == 'nest') {
          option.title.forEach(i => {
            i.show = false
          })
          option.series.forEach(i => {
            i.center = ['35%','50%']
          })
      }
      this.option = option
      console.log(this.option)
    }
  }
}
</script>

