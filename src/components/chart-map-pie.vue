<template>
    <div :style="{width: width+'px', height:height+'px'}"></div>
</template>
<script>
import axios from 'axios'
import mixinChart from './mixins/echarts.js'

const getDefaultOption = _ => {
  // 省份占比
  let color = ['#fe6f6d', '#fe7f6d', '#9b51ed', '#b64bf2', '#87a2fe', '#6a5de0'];
  let top1Value = 0, top2Value = 0, top3Value = 200;
  let dataStyle = {
    normal: {
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
      shadowBlur: 40,
      borderWidth: 8,
      shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
    }
  };
  let placeHolderStyle = {
      normal: {
        color: '#2c274a',
        label: {
          show: false
        },
        labelLine: {
          show: false
        }
      },
      emphasis: {
        color: '#2c274a'
      }
    };
  // 环行图 tooltip 配置
    let pieToolTip = {
      trigger: 'item',
      show: true,
      formatter: "{b} : {c}人<br/>",
      backgroundColor: 'rgba(0,0,0,0.7)', // 背景
      padding: [8, 10], //内边距
      extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
    }
  return {
    tooltip: {
      trigger: 'item',
    },
    title: [
      {
        subtext: '比昨天增加',
        x: '46%',
        y: '76%',
        itemGap: 5,
        textAlign: 'center',
        subtextStyle: { color: '#9fa0c4', fontSize: '10' },
      }
    ],
    graphic:[{
      type:'text',
      left:'center',
      top:'46%',
      style:{
        text:'64%',
        textAlign:'center',
        fill:'#fff',
        fontSize: 16
      }
    }],
    series: [{
      type: 'pie',
      clockWise: false,
      radius: [36, 44],
      center: ['50%', '50%'],
      itemStyle: dataStyle,
      hoverAnimation: false,
      startAngle: 90,
      label: {
        borderRadius: '10',
      },
      data: [{
        value: top3Value,
        name: '上海',
        tooltip: pieToolTip,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: color[4]
            }, {
              offset: 1,
              color: color[5]
            }])
          }
        }
      },{
        value: 100,
        name: ''
      }]
    }]
  }
}

export default {
  mixins: [mixinChart],
  props: {
    width: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 230,
    },
    theme: String,
    mapPieDataId: String,
    mapDataCode: String,
    mapInitCode: String
  },
  watch: {
    //菜单切换业务
    'mapInitCode'(val) {
      this.drawChart(this.mapPieDataId, val)
    },
    //同业务切换维度，如运营切换维度
    'mapDataCode'(val) {
      this.drawChart(this.mapPieDataId, val)
    }
  },
  async beforeMount() {
    this.drawChart(this.mapPieDataId, this.mapInitCode)
  },
  methods: {
    async drawChart(mapPieDataId,mapDataCode) {
      let resData, option, jsonObj
      const defaultOption = getDefaultOption()
      if (mapPieDataId) {
        resData = await axios.get(`${siteFrontURL}report/getData/${mapPieDataId}/${mapDataCode}`)
        jsonObj = JSON.parse(resData.data.data)
        option = _.merge(defaultOption, jsonObj.chartOption)
        option.graphic.forEach((i,index) => {
          i.style.text = Number(option.series[index].data[0].value /(option.series[index].data[0].value + option.series[index].data[1].value)*100).toFixed(2) + '%'
        })
        option.title.forEach((i,index) => {
          i.subtext = option.legend.data[index]
        })
        option.legend = []
      } else {
        option = defaultOption
      }
      option.series.forEach(i => {
        i.itemStyle={
          normal: {
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            shadowBlur: 40,
            borderWidth: 8,
            shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
          }
        }
        i.data[1].itemStyle={
          normal: {
            color: '#e6e6e6',
            shadowBlur: {
                shadowColor: 'rgba(255,255,255,0.31)',
            },
            label: {
                show: false
            },
            labelLine: {
                show: false
            }
          },
        }
      })
      this.option = option
    }
  }
}
</script>


