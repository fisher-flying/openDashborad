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
    xAxis: {
      name: '',
      nameGap: '1',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#a4a5c9'
      },
      data: [] // x轴类目名
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#a4a5c9'
      }
    },
    grid: {
      left: '3%',
      right: '8%',
      bottom: '30',
      containLabel: true
    },
    tooltip: {
      trigger: 'item',
      formatter: "{b} : {c}人",
    },
    series: [
      {
        type: 'pictorialBar',
        symbol: 'path://M0,10 L10,10 C6.5,10 7,0 5,0 C3,0 3.5,10 0,10 z',
        data: [], // 对应上面x轴类目名的值
        itemStyle: {
          normal: {
            color: function(params) {
              var colorList = ['#f97b6c','#6484f1','#5ba2f4','#f25dc3','#fa636a','#665feb','#f783f0','#fdbc68','#28c8ac'];
              return colorList[params.dataIndex]
            }
          }
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
    curUserName: String,
    initcode:String
  },
  watch: {
    //菜单切换业务
    'curDataCode'(val) {
      this.drawChart(this.curDataId, val)
    },
    //用户画像切换
    'curUserName'(val) {
      this.curUserName = val
      this.drawChart(this.curDataId, this.curDataCode)
    },
    //时期切换
    'curDataId'(val) {
      this.drawChart(val, this.curDataCode)
    }
  },
  async beforeMount() {
    if(this.curDataId.length > 20){
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
      let resData, option, jsonObj
      const defaultOption = getDefaultOption()
      if (curDataId) {
        if(curDataId.length < 20){
          //内容偏好分析
          resData = await axios.get(`${siteFrontURL}report/userPreference/${curDataCode}?dataType=${curDataId}&userName=${this.curUserName}`)
        }else{
          resData = await axios.get(`${siteFrontURL}report/getData/${curDataId}/${curDataCode}`)
        }
        if(!resData.data.data){
          return
        }
        jsonObj = JSON.parse(resData.data.data)
        option = _.merge(defaultOption, jsonObj.chartOption)
        units = jsonObj.chartOption.xAxis.name
        let returnValue = option.series[0].data
        for(let i = 0; i < returnValue.length; i++){
          if (returnValue[i] == 0) { returnValue[i] = null }
        }
        //单位处理
        option.xAxis.axisLabel={
           interval:0,
           rotate:-42
        }
        if (option.series.length != 0) {
          let max = Math.max(...option.series[0].data)
          let unit = 1
          if(max > 10000) {
            option.yAxis.name = '/万人',
            unit = 10000
          }else if(max > 1000 && max < 10000) {
            option.yAxis.name = '/千人',
            unit = 1000
          }else if(this.curDataId == '669db32a8047492ead91b70dac83c595'){
            //此处判断仅针对  应用跳出率 Y轴坐标单位，一旦此表id变动，请做相应修改
            //zouyu by:2018/12/20
            //早期后台y轴单位配置开发有bug导致
            option.yAxis.name = ''
            option.tooltip={
              trigger: 'item',
              formatter: "{b} : {c}",
            }
          }else {
            option.yAxis.name = '/人'
          }
          option.yAxis.axisLabel = {
            formatter: function (a) {
              a = + a;
              return isFinite(a)? echarts.format.addCommas(+ a / unit): '';
            }
          }
        }
        if(curDataId.length < 20){//内容偏好分析单位处理
          option.yAxis.name = '/次'
          option.tooltip={
            trigger: 'item',
            formatter: "{b} : {c}次",
          }
        }

        //无数据处理
        if(!option.series[0].data.length){
          option.title.show=true
          option.yAxis.name = ''
          option.xAxis.name = ''
        }
      } else {
        option = defaultOption
        option.series[0].data = [111, 111, 111, 111, 111, 111]
        option.xAxis.data = ["0-3", "4-7", "8-11", "12-15", "16-19", "20-23"]
      }
      if(!this.theme){
        option.series[0].type='bar'
        option.series[0].barWidth=20
        option.series[0].itemStyle={
          normal: {
            color: function(params) {
              var colorList = ['#f97b6c','#6484f1','#5ba2f4','#f25dc3','#fa636a','#665feb','#f783f0','#fdbc68','#28c8ac'];
              return colorList[params.dataIndex]
            }
          }
        }
      }else if (this.theme == 'wave') {

      } else if (this.theme == 'cone') {
        option.series[0].symbol = 'path://"M 100 0 L 50 100 L 150 100 z'
      } else if (this.theme == 'cust') {
        option.tooltip.formatter="{b}" + units + "：{c}人"
        option.xAxis.axisLabel={
          rotate:0
        }
        option.series[0].symbol = 'path:// M100,100a12.5,12 0 1 0 25 0a12.5,12 0 1 0 -25 0z M113,122c27,0 0,-10 0,-10c0,0 -28,10 0,10z M101,122h24v120h-24z'
        option.series[0].itemStyle={
          borderColor:'#40e1e9',
          color:'#40e1e9'
        }
        option.series[0].barCategoryGap='54%'
      }
      this.option = option
    }
  }
}
</script>

