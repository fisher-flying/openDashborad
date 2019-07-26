<template>
    <div :style="{width: width+'px', height:height+'px'}"></div>
</template>
<script>
import axios from 'axios'
import mixinChart from './mixins/echarts.js'

const getDefaultOption = _ => {
  return {
    tooltip: {
        trigger: 'item',
        formatter: "{b} : {c}人<br/>",
      },
      title: {
        text: '',
        left: '15px',
        textStyle: {
            color: '#a4a5c9',
            fontSize: 16
        }
    },
      grid: {
        borderWidth: 0,
        top: 30,
        left: 75,
        right: 20,
        bottom: 10,
        textStyle: {
          color: "#fff"
        }
      },
      yAxis: [{
        axisLabel: {
          inside: false,
          textStyle: {
            color: '#a4a5c9',
            fontSize: '10',
          }
        },
        axisTick: { show: false },
        axisLine: { show: false },
        data: [],
      }, {
        type: 'category',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitArea: {
          show: false
        },
        splitLine: {
          show: false
        },
      }],
      xAxis: {
        type: 'value',
        interval: 0,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#2f3640',
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#2f3640 ',
          }
        },
      },
      series: [
        {
          name: '',
          type: 'bar',
          barMaxWidth: '50',
          itemStyle: {
            normal: {
              show: false,
              color: function (params) {
                var colorList = [];
                colorList[0] = new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 1, color: '#15e6f5' },
                    { offset: 0.5, color: '#4cfdd6' },
                    { offset: 0, color: '#5bffab' }
                  ]);
                colorList[1] = new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 1, color: '#bf4bf9' },
                    { offset: 0.5, color: '#9053e9' },
                    { offset: 0, color: '#7259df' }
                  ]);
                colorList[2] = new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 1, color: '#40ddea' },
                    { offset: 0.5, color: '#40b3f3' },
                    { offset: 0, color: '#5493f0' }
                  ]);
                colorList[3] = new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 1, color: '#f37504' },
                    { offset: 0.5, color: '#ffb04d' },
                    { offset: 0, color: '#ffde4d' }
                  ]);
                colorList[4] = new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 1, color: '#fe6d9b' },
                    { offset: 0.5, color: '#fe6d6d' },
                    { offset: 0, color: '#fe896d' }
                  ]);
                return colorList[params.dataIndex];
              },
              barBorderRadius: 50,
              borderWidth: 0,
            },
            emphasis: {
              shadowBlur: 15,
              shadowColor: 'rgba(105,123, 214, 0.7)'
            }
          },
          zlevel: 2,
          barWidth: '24%',
          data: [],
        },
        {
          name: '',
          type: 'bar',
          zlevel: 1,
          itemStyle: {
            normal: {
              color: '#2a234e', // 修改柱状图后面颜色和背景色一致
              borderWidth: 0,
              shadowBlur: {
                shadowColor: 'rgba(255,255,255,0.31)',
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 2,
              },
            }
          },
          barWidth: '24%',
          data: []
        },
      ]
  }
}

export default {
  mixins: [mixinChart],
  props: {
    width: {
      type: Number,
      default: 240,
    },
    height: {
      type: Number,
      default: 135,
    },
    optionType: String,
    mapBarDataId: String,
    mapDataCode: String,
    mapInitCode: String
  },
  watch: {
    //菜单切换业务
    'mapInitCode'(val) {
      this.drawChart(this.mapBarDataId, val)
    },
    //同业务切换维度，如运营切换维度
    'mapDataCode'(val) {
      this.drawChart(this.mapBarDataId, val)
    }
  },
  async beforeMount() {
    this.drawChart(this.mapBarDataId, this.mapInitCode)
  },
  methods: {
    async drawChart(mapBarDataId, mapDataCode) {
      let resData, option, jsonObj
      const defaultOption = getDefaultOption()
      if (mapBarDataId) {
        resData = await axios.get(`${siteFrontURL}report/getData/${mapBarDataId}/${mapDataCode}`)
        jsonObj = JSON.parse(resData.data.data)
        option = _.merge(defaultOption, jsonObj.chartOption)
      } else {
        option = defaultOption
        if (this.optionType == 'time') {  //  分时用户量
          option.title.text = '时段统计'
          option.yAxis[0].data = ['20-24','15-19','10-14','5-9','0-4']
          option.series[0].data = [111, 111, 111, 111, 111]
        } else {
          option.yAxis[0].data = ['今日用户','昨日用户']
          option.title.text = '环比昨日增长 '+((option.series[0].data[0]-option.series[0].data[1])/option.series[0].data[1]*100).toFixed(2)+' %'
          option.title.textStyle.color = '#ffe933'
          option.series[0].data = [111, 222]
        }
      }

      if (this.optionType == 'time') {  //  分时用户量
        if(option.series[0].data != ''){
          option.title.text = '时段统计'
        }
        option.series[1].data = [0, 0, 0, 0, 0, 0]
      } else {
        if(option.series[0].data != ''){
          option.title.text = '环比昨日增长 '+Math.abs(((option.series[0].data[0]-option.series[0].data[1])/option.series[0].data[1]*100).toFixed(2))+' %'
        }
        option.title.textStyle.color = '#ffe933'
        option.series[1].data = [0, 0]
      }
      this.option = option
    }
  }
}
</script>


