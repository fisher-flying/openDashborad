<template>
  <div class="map-body" style="width:600px;height:400px;position:relative;">
    <SvgMapTitle :width="320" :height="25" text="用户总量" class="tit"></SvgMapTitle>
    <p class="current-time">{{ curTime | formatDate }}</p>
    <SvgMapNumberTitle class="num-tit"
      :text="userNumber"
      :width="440" :height="70">
    </SvgMapNumberTitle>
    <p class="people">人</p>

    <chart-map class="map"
      :mapDataId="mapId"
      :mapDataCode="curDataCode"
      :mapInitCode="initMapCode">
    </chart-map>

    <chart-map-bar :width="240" :height="80" class="bar-top"
      :mapBarDataId='mapTopBarId'
      :mapDataCode="curDataCode"
      :mapInitCode="initMapCode">
    </chart-map-bar>

    <chart-map-bar :width="240" :height="160" class="bar-time"
      :mapBarDataId='mapBarId'
      :mapDataCode="curDataCode"
      :mapInitCode="initMapCode"
      optionType="time">
    </chart-map-bar>

    <chart-map-pie class="pie"
      :mapPieDataId='mapPieId'
      :mapDataCode="curDataCode"
      :mapInitCode="initMapCode">
    </chart-map-pie>
  </div>
</template>
<script>
import axios from 'axios'
import SvgSubTitle from './svg-subtitle.vue'
import SvgMapTitle from './svg-map-title.vue'
import SvgMapNumberTitle from './svg-map-number-title.vue'

let padDate = function(value) {
  return value < 10 ? '0' + value: value;
}
export default {
  props: {
    theme: String,
    curDataId: String,
    curDataCode: String,
    initcode:String
  },
   data() {
    return {
      userNumber: '',
      tempUserNumber: 0,
      space: 1,
      mapId: "",
      mapTopBarId: "",
      mapBarId: "",
      mapPieId: "",
      curTime: new Date(),
      initMapCode: "",
      timer: Function,
      interval: Function,
      refreshTimer: Function
    }
  },
  components: {
    SvgSubTitle,
    SvgMapTitle,
    SvgMapNumberTitle
  },
  filters: {
    formatDate:function (value) {
      let date = new Date(value);
      let hours = padDate(date.getHours());
      let minutes = padDate(date.getMinutes());
      let seconds = padDate(date.getSeconds());
      return hours + ':' + minutes + ':' + seconds;
    }
  },
  watch: {
    curDataCode(val, val1) {
      if (val == val1) {
        return;
      }
      this.initMapCode = val;
      this.userNumber = "";
      this.setTimer();
    },
    initcode(val, val1) {
      if (val == val1) {
        return;
      }
      this.initAPPCode();
      this.userNumber = "";
      this.setTimer();
    }
  },
  async beforeMount() {
    this.mapId = this.curDataId  // 地图
    if(this.curDataId){
      this.mapTopBarId = '04e388c47d8e4de9ade79feec4720ae9'  // 环比昨日增长
      this.mapBarId = 'b2e1d795a5364ec89413703f4337af4d'  // 分时用户量
      this.mapPieId = '49182696b62b4ba39b0127d8ac0a421c'  // 省份占比
    }
    this.initAPPCode()
  },
  mounted() {
    this.setTimer()
  },
  beforeDestroy() {
    this.clearTimer()
  },
  methods: {
    //选取配置的第一个维度
    initAPPCode() {
      if(this.initcode){
        this.initMapCode = this.initcode.split(',')[0]
      }else{
        this.initMapCode = this.curDataCode
      }
    },
    async refreshUser() {
      let res = await axios.get(`${siteFrontURL}report/getUserAmount/${this.initMapCode}`);
      if (res.data.code == 0) {
        this.tempUserNumber = res.data.data;
      }
    },
    //定时刷新用户总数
    setTimer() {
      this.clearTimer();
      let _this = this;
      let userNumber = _this.userNumber == "" ? 0 : parseInt(_this.userNumber);
      let mod = 0;
      let counter = 0;
      this.timer = setInterval(async function() {
        _this.curTime = new Date(); //修改数据 curTime
        if (_this.userNumber == "") {
          //初始化
          await _this.refreshUser();
          userNumber = _this.tempUserNumber;
          _this.userNumber =
            "" + parseFloat(_this.tempUserNumber).toLocaleString();
        }
        counter++;
        if (_this.tempUserNumber > userNumber && counter % 2 == 0) {
          if (mod > 0) {
            userNumber =
              userNumber + _this.space > _this.tempUserNumber
                ? _this.tempUserNumber
                : userNumber + _this.space + 1;
            mod--;
          } else {
            userNumber =
              userNumber + _this.space > _this.tempUserNumber
                ? _this.tempUserNumber
                : userNumber + _this.space;
          }
          _this.userNumber = "" + parseFloat(userNumber).toLocaleString();
        }
        if (counter >= 60) {
          counter = 0;
          await _this.refreshUser();
          _this.space = parseInt((_this.tempUserNumber - userNumber) / 20);
          mod = (_this.tempUserNumber - userNumber) % 20;
        }
      }, 1000);
    },
    //在Vue实例销毁前，清除定时器
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer); 
      }
    }
  }
};
</script>
