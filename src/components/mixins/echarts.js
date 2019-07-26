import echarts from 'echarts'
import debounce from 'lodash/debounce'
import Vue from 'vue'

// enumerating ECharts events for now
const EVENTS = [
  'legendselectchanged',
  'legendselected',
  'legendunselected',
  'legendunscroll',
  'datazoom',
  'datarangeselected',
  'timelinechanged',
  'timelineplaychanged',
  'restore',
  'dataviewchanged',
  'magictypechanged',
  'geoselectchanged',
  'geoselected',
  'geounselected',
  'pieselectchanged',
  'pieselected',
  'pieunselected',
  'mapselectchanged',
  'mapselected',
  'mapunselected',
  'axisareaselected',
  'focusnodeadjacency',
  'unfocusnodeadjacency',
  'brush',
  'brushselected',
  'rendered',
  'finished',
  'click',
  'dblclick',
  'mouseover',
  'mouseout',
  'mousedown',
  'mouseup',
  'globalout'
]
export default {
  props: {
    width: {
      type: Number,
      default: 320
    },
    height: {
      type: Number,
      default: 240
    },
    watchShallow: Boolean
  },
  watch: {
    width (val) {
      this.refresh()
    },
    height (val) {
      this.refresh()
    }
  },
  data () {
    return {
      option: null
    }
  },
  methods: {
    dispose () {
      this.delegateMethod('dispose')
    },
    delegateMethod (name, ...args) {
      if (!this.chart) {
        Vue.util.warn(`Cannot call [${name}] before the chart is initialized. Set prop [option] first.`, this)
        return
      }
      return this.chart[name](...args)
    },
    init () {
      if (this.chart) {
        return
      }
      let chart = echarts.init(this.$el, 'morning', {
        width: this.width,
        height: this.height
      })
      if (this.group) {
        chart.group = this.group
      }
      chart.setOption(this.option, true)
      // expose ECharts events as custom events
      EVENTS.forEach(event => {
        chart.on(event, params => {
          this.$emit(event, params)
        })
      })
      this.chart = chart
    },
    destroy () {
      this.dispose()
      this.chart = null
    },
    refresh () {
      this.destroy()
      this.init()
    }
  },
  created () {
    this.$watch('option', option => {
      if (!this.chart && option) {
        this.init()
      } else if (option) {
        this.chart.setOption(this.option, true)
      }
    }, { deep: !this.watchShallow })
    let watched = ['watchShallow']
    watched.forEach(prop => {
      this.$watch(prop, () => {
        this.refresh()
      }, { deep: true })
    })
  },
  mounted () {
    // auto init if `option` is already provided
    if (this.option) {
      this.init()
    }
    // this.chart.on('updateAxisPointer', function (event) {})
    //   var xAxisInfo = event.axesInfo[0];
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.destroy()
  }
}
