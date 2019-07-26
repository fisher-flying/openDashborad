<template>
  <div :style="{width: width+'px', height:height+'px'}"></div>
</template>
<script>
import axios from 'axios'
import mixinChart from './mixins/echarts.js'
import china from './mixins/china.js'
let myseries = ''
// 获取数据-地图
let dataMap, sortDataMap, allDataMap
  allDataMap = [{ "name": "北京", "value": 0 }, { "name": "天津", "value": 0 }, { "name": "上海", "value": 0 }, { "name": "重庆", "value": 0 }, { "name": "河北", "value": 0 }, { "name": "河南", "value": 0 }, { "name": "云南", "value": 0 }, { "name": "辽宁", "value": 0 }, { "name": "黑龙江", "value": 0 }, { "name": "湖南", "value": 0 }, { "name": "安徽", "value": 0 }, { "name": "山东", "value": 0 }, { "name": "新疆", "value": 0 }, { "name": "江苏", "value": 0 }, { "name": "浙江", "value": 0 }, { "name": "江西", "value": 0 }, { "name": "湖北", "value": 0 }, { "name": "广西", "value": 0 }, { "name": "甘肃", "value": 0 }, { "name": "山西", "value": 0 }, { "name": "内蒙古", "value": 0 }, { "name": "陕西", "value": 0 }, { "name": "吉林", "value": 0 }, { "name": "福建", "value": 0 }, { "name": "贵州", "value": 0 }, { "name": "广东", "value": 0 }, { "name": "青海", "value": 0 }, { "name": "西藏", "value": 0 }, { "name": "四川", "value": 0 }, { "name": "宁夏", "value": 0 }, { "name": "海南", "value": 0 }, { "name": "台湾", "value": 0 }, { "name": "香港", "value": 0 }, { "name": "澳门", "value": 0 }]
const getDefaultOption = _ => {
   dataMap = [{ "name": "北京", "value": 100 }, { "name": "天津", "value": 30 }, { "name": "上海", "value": 50 }, { "name": "重庆", "value": 0 }, { "name": "河北", "value": 0 }, { "name": "河南", "value": 0 }, { "name": "云南", "value": 0 }, { "name": "辽宁", "value": 0 }, { "name": "黑龙江", "value": 142 }, { "name": "湖南", "value": 0 }, { "name": "安徽", "value": 0 }, { "name": "山东", "value": 140 }, { "name": "新疆", "value": 120 }, { "name": "江苏", "value": 0 }, { "name": "浙江", "value": 0 }, { "name": "江西", "value": 0 }, { "name": "湖北", "value": 0 }, { "name": "广西", "value": 40 }, { "name": "甘肃", "value": 80 }, { "name": "山西", "value": 0 }, { "name": "内蒙古", "value": 0 }, { "name": "陕西", "value": 0 }, { "name": "吉林", "value": 0 }, { "name": "福建", "value": 0 }, { "name": "贵州", "value": 0 }, { "name": "广东", "value": 0 }, { "name": "青海", "value": 0 }, { "name": "西藏", "value": 0 }, { "name": "四川", "value": 108 }, { "name": "宁夏", "value": 0 }, { "name": "海南", "value": 50 }, { "name": "台湾", "value": 0 }, { "name": "香港", "value": 0 }, { "name": "澳门", "value": 0 }]
  // 排序获取 top 值
  sortDataMap = dataMap.sort(function (a, b) {
    return a.value - b.value;
  });
  for (let i = 0; i < sortDataMap.length; i++) {
    sortDataMap[i].top = i + 1;
  }

  return {
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
          let res = '';
          for (let i = 0; i < myseries.length; i++) {
            // res += params.name + '</br>' + myseries[i].data[j].value + '人'
            if(myseries[i].data==''){
              res += params.name + '</br> top：-' + '</br> - 人'
            }
            for (let j = 0; j < myseries[i].data.length; j++) {
              if (myseries[i].data[j].name == params.name) {
                res += params.name + '</br>共' + myseries[i].data[j].value + '家企业'
              }
            }
          }
          return res;
        }
      },

      // 地图的 visualMap 属性会影响其他图的颜色值,
      visualMap: {
        show: true,
        min: 10,
        max: 150,
        left: 'center',
        top: 'bottom',
        text: ['100000', '0'],
        itemHeight: 140,
        itemWidth: 10,
        textGap: 20,
        inverse: true,
        orient: 'horizontal',
        padding: [5, 10],
        inRange: {
          color: ['#6eb6f5', '#7462ec']
        },
        textStyle: {
          color: '#a4a5c9'
        }
      },

      series: [
        {
          type: 'map',
          map: 'china',
          zoom: 1.2,
          zlevel: 1,
          //roam: true,  // 鼠标缩放
          data: sortDataMap,
          label: {
            normal: {
              show: false   //是否显示标签。
            },
            emphasis: {
              show: false
            }
          },
          showLegendSymbol: true,
          itemStyle: {
            normal: {
              areaColor: '#6c76e9',  //地图背景色
              borderColor: '#5360ab'    //省界线颜色
            },
            emphasis: {
              areaColor: '#a150ef'  //鼠标经过时区块颜色
            }
          }
        },
      ]
  }
}

export default {
  mixins: [mixinChart],
  props: {
    width: {
      type: Number,
      default: 420,
    },
    height: {
      type: Number,
      default: 390,
    },
    theme: String,
    mapDataId: String,
    mapDataCode: String,
    mapInitCode: String
  },
  watch: {
    //菜单切换业务
    'mapInitCode'(val) {
      this.drawChart(this.mapDataId, val)
    },
    //同业务切换维度，如运营切换维度
    'mapDataCode'(val) {
      this.drawChart(this.mapDataId, val)
    }
  },
  async beforeMount() {
    this.drawChart(this.mapDataId, this.mapInitCode)
  },
  methods: {
    async drawChart(curDataId,mapDataCode) {
      let resData, option, jsonObj
      const defaultOption = getDefaultOption()
      if (curDataId) {
        resData = await axios.get(`${siteFrontURL}report/getData/${curDataId}/${mapDataCode}`)
        jsonObj = JSON.parse(resData.data.data)
        //替换map数据
        for (let i = 0; i < allDataMap.length; i++) {
          for (let j = 0; j < jsonObj.chartOption.series[0].data.length; j++) {
            if(allDataMap[i].name == jsonObj.chartOption.series[0].data[j].name){
              allDataMap[i] = jsonObj.chartOption.series[0].data[j];
            }
          }
        }
        dataMap = allDataMap;//赋值给datamap
        //赋值给sortmap
        sortDataMap = dataMap.sort(function (a, b) {
          return b.value - a.value;
        });
        for (let i = 0; i < sortDataMap.length; i++) {
          sortDataMap[i].top = i + 1;
        }

        jsonObj.chartOption.series[0].data = allDataMap;//赋值给json

        option = _.merge(defaultOption, jsonObj.chartOption)
        myseries = jsonObj.chartOption.series
        dataMap = jsonObj.chartOption.series[0].data
        if(dataMap != ''){
          let max = dataMap[0].value;
          for(let i = 0; i < dataMap.length; i++){
            let cur = dataMap[i].value;
            cur > max ? max = cur : null;
          }
          let base = 1;
          for(let i = 0 ; i<max.toString().length-1; i++){
            base *= 10;
          }
          option.visualMap.max = Math.ceil(max/base)*base;
          option.visualMap.text=[Math.ceil(max/base)*base,'0']
        }
        sortDataMap = dataMap.sort(function (a, b) {
          return b.value - a.value;
        });
        for (let i = 0; i < sortDataMap.length; i++) {
          sortDataMap[i].top = i + 1;
        }
      } else {
        option = defaultOption
        myseries = getDefaultOption().series
      }
      this.option = option
    }
  }
}
</script>
