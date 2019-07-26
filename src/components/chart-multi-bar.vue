<template>
  <div :style="{width: width+'px', height:height+'px'}">
  </div>
</template>
<script>
import axios from 'axios'
import mixinChart from './mixins/echarts.js'

let totleNum = 100
const colorbar = ['#5775df', '#816bff', '#f67a7b']
const symbols = [
        'path://M141.1 331.2c-35 0-63.3 28.3-63.3 63.2v264.7c0 34.9 28.4 63.2 63.3 63.2 35 0 63.3-28.3 63.3-63.2V394.4c0-34.9-28.3-63.2-63.3-63.2zM228.9 753.3c0 37.3 30.3 67.5 67.6 67.5h46.1v140c0 34.9 28.4 63.2 63.3 63.2 35 0 63.3-28.3 63.3-63.2v-140h85.5v140c0 34.9 28.4 63.2 63.3 63.2 35 0 63.3-28.3 63.3-63.2v-140h46.1c37.3 0 67.6-30.2 67.6-67.5V343.1H228.9v410.2zM651.8 93.4L696 13c2.4-4.2 0.8-9.6-3.5-11.9-4.2-2.3-9.6-0.8-11.9 3.5l-44.7 81.2C598.4 69.2 556.4 59.9 512 59.9c-44.4 0-86.4 9.3-123.9 25.8L343.4 4.6c-2.3-4.3-7.7-5.8-11.9-3.5-4.3 2.3-5.9 7.7-3.5 11.9l44.2 80.4c-86.8 44.8-145.5 130-145.5 227.7h570.5c0.1-97.8-58.6-182.9-145.4-227.7zM382.2 218c-13.2 0-23.9-10.7-23.9-23.9s10.7-23.9 23.9-23.9 23.9 10.7 23.9 23.9c-0.1 13.2-10.8 23.9-23.9 23.9z m259.7 0c-13.2 0-23.9-10.7-23.9-23.9s10.7-23.9 23.9-23.9 23.9 10.7 23.9 23.9c-0.1 13.2-10.8 23.9-23.9 23.9zM882.9 331.2c-35 0-63.3 28.3-63.3 63.2v264.7c0 34.9 28.4 63.2 63.3 63.2 35 0 63.3-28.3 63.3-63.2V394.4c0-34.9-28.3-63.2-63.3-63.2z',
        'path://M804.99749 544.146417C806.485912 698.993591 947.424043 750.523774 949.066439 751.242323 947.783317 754.78374 926.48349 824.688231 874.696682 896.902343 829.941384 959.313401 783.595014 1021.365186 710.457055 1022.648308 638.499568 1023.93143 615.454695 981.999 533.232231 981.999 451.061092 981.999 425.347326 1021.365186 357.341855 1023.93143 286.821464 1026.497674 233.032986 956.593183 187.918414 894.438748 95.636273 767.255687 25.218532 535.113238 119.861618 378.418368 166.823886 300.558519 250.842721 251.337956 341.94439 250.003509 411.284307 248.823036 476.774859 294.604832 519.066563 294.604832 561.512242 294.604832 641.014487 239.584557 724.622722 247.642564 759.574968 249.028336 857.862121 261.089683 920.940403 349.060534 915.910564 352.191352 803.663043 414.397111 804.99749 544.146417ZM510.597957 235.991815C502.488626 177.122174 532.872957 115.942912 567.568578 77.500574 606.318865 34.233697 671.706767 2.052995 725.700545 0 732.629404 59.947464 707.274912 120.151553 669.859072 163.521079 632.340582 206.736632 570.853371 240.45708 510.597957 235.991815Z'
        ];
const getDefaultOption = _ => {
  return {
    textStyle: {
      color: '#414957',
    },
    tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    legend: {
      icon: 'rect',
      itemWidth: 10,
      itemHeight: 10,
      top:'5%',
      right: '3%',
      textStyle: {
        color: '#fff',
      },
      data:['视频','文本','试卷']
    },
    xAxis : [{
      type : 'category',
      //axisTickaxisTick: {show: false},
      data: ['12日', '13日', '14日', '15日', '16日'],
    }],
    yAxis : [{
      type : 'value'
    }],
    series : [{
      name: '视频',
      type: 'bar',
      barWidth : 5,
      itemStyle: {
        normal: {
          color: '#5775df',
          textStyle: {
            color: '#7377a6',
          }
        }
      },
      data: [100, 200, 600, 500, 130],
    },{
      name: '文本',
      type: 'bar',
      barWidth : 5,
      itemStyle: {
        normal: {
          color: '#816bff',
          textStyle: {
              color: '#7377a6',
          }
        }
      },
      data: [300, 430, 320,200, 580],
    },{
      name: '试卷',
      type: 'bar',
      barWidth : 5,
      itemStyle: {
        normal: {
          color: '#f67a7b',
          textStyle: {
              color: '#7377a6',
          }
        }
      },
      data: [300, 120, 130, 400, 500],
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
  watch: {
    //菜单切换业务
    'initcode'(val) {
      this.initAPPCode()
    },
    //同业务切换维度，如运营切换维度
    'curDataCode'(val) {
      this.drawChart(this.curDataId, val)
    }
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

          if (this.theme != 'cone') {
             // 操作系统占比  计算 Android 和 iOS 用户总数
            totleNum = jsonObj.chartOption.series[0].data[0] + jsonObj.chartOption.series[0].data[1]
            option.series[0].symbolBoundingData = totleNum
            option.series[0].type='pictorialBar'
            option.series[0].symbolClip=true
            option.series[0].z=10
            option.series[0].data[0]={
              itemStyle: { normal: {color: "#27d1b7"}},
              value: jsonObj.chartOption.series[0].data[0],
              symbol: symbols[0]
            }
            option.series[0].data[1]={
              itemStyle: {normal: {color: "#f97b6c"}},
              value: jsonObj.chartOption.series[0].data[1],
              symbol: symbols[1]
            }
            option.series.push({
              name: 'full',
              type: 'pictorialBar',
              tooltip: {show: false},
              itemStyle: {
                normal: {color: '#e6e6e6'},
                emphasis: {color: '#e6e6e6'}
              },
              data: [{
                  value: totleNum,
                  symbol: symbols[0]
              }, {
                  value: totleNum,
                  symbol: symbols[1]
              }]
            })
          }else{
            let dataListLen = jsonObj.chartOption.series.length
            option.xAxis.data=jsonObj.chartOption.xAxis.data
            for(let i=0;i<dataListLen;i++){
              option.series[i]['type']='bar'
              option.series[i]['itemStyle']={
                normal: {
                  color: colorbar[i],
                }
              }
            }
          }
          //无数据处理
          if(jsonObj.chartOption.series[0].data.length == 0){
              option.title.show=true
              option.xAxis.data = ''
          }
      } else {
        option = defaultOption
        if (this.theme == 'cone') { 
          //多维柱 默认设置               
          // for(let i=0;i<3;i++){
          //   option.series.push({
          //     name: i,
          //     data:[10+i,12+i*2,20-i*4,6+i]
          //   })
          // }
        }else{            
          //苹果安卓默认设置
          option.series.push({
            type: 'pictorialBar',
            symbolClip: true,
            symbolBoundingData: 100,
            data: [{
              value: 53,
              itemStyle: {
                normal: {color: '#27d1b7'}
              },
              symbol: symbols[0]
            }, {
              value: 44,
              itemStyle: {
                normal: {color: '#f97b6c'}
              },
              symbol: symbols[1]
            }],
            z: 10
          },{
            name: 'full',
            type: 'pictorialBar',
            tooltip: {show: false},
            itemStyle: {
                normal: {color: '#e6e6e6'},
                emphasis: {color: '#e6e6e6'}
            },
            data: [{
                value: 100,
                symbol: symbols[0]
            }, {
                value: 100,
                symbol: symbols[1]
            }]
          })
          
        }
      }


      
      if (this.theme == 'cone') {
        //多维柱
        option.grid={
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true
        },
        option.xAxis.axisLine={
          lineStyle: {color: '#e8e8e8'}
        }
        option.yAxis=[{type : 'value'}]
        option.series.forEach((i,index) => {
            i.type='bar',
            i.barGap = 1,
            i.itemStyle={
              normal: {
                color: colorbar[index]
              }
            }
        })
      }else{
        //安卓苹果柱
        option.grid={left:10}
        option.xAxis={
            data: ['安卓', 'ios'],
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {show: true}
        },
        option.yAxis={
          splitLine: {show: false},
          axisTick: {show: false},
          axisLine: {show: false},
          axisLabel: {show: false}
        }
        option.series[0].label={
          normal: {
            show: true,
            position: 'inside',
            offset: [0, 10],
            formatter:function(param) {
              return (param.value / totleNum * 100).toFixed(0) + '%';
            },
            textStyle: {
              fontSize: 22,
              color: '#fff',
              fontFamily: 'Arial'
            }
          }
        }
      }
      this.option = option
    }
  }
}
</script>

