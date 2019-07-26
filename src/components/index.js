import svgTitle from './svg-title.vue'
import svgSubtitle from './svg-subtitle.vue'
import chartBar from './chart-bar.vue'
import chartMultiBar from './chart-multi-bar.vue'
import chartTransverseBar from './chart-transverse-bar.vue'
import chartGraph from './chart-graph.vue'
import chartLine from './chart-line.vue'
import chartLinePie from './chart-line-pie.vue'
import chartPie from './chart-pie.vue'
import chartMultiLine from './chart-multi-line.vue'
import chartMultiPie from './chart-multi-pie.vue'
import chartMap from './chart-map.vue'
import chartMapBar from './chart-map-bar.vue'
import chartMapPie from './chart-map-pie.vue'
import svgMapTitle from './svg-map-title.vue'
import chartMapGroup from './chart-map-group.vue'

const components = {
  install: Vue => {
    Vue.component('svgSubtitle', svgSubtitle)
    Vue.component('svgTitle', svgTitle)
    Vue.component('chartBar', chartBar)
    Vue.component('chartMultiBar', chartMultiBar)
    Vue.component('chartTransverseBar', chartTransverseBar)
    Vue.component('chartGraph', chartGraph)
    Vue.component('chartLine', chartLine)
    Vue.component('chartLinePie', chartLinePie)
    Vue.component('chartPie', chartPie)
    Vue.component('chartMultiLine', chartMultiLine)
    Vue.component('chartMultiPie', chartMultiPie)
    Vue.component('chartMap', chartMap)
    Vue.component('chartMapBar', chartMapBar)
    Vue.component('chartMapPie', chartMapPie)
    Vue.component('svgMapTitle', svgMapTitle)
    Vue.component('chartMapGroup', chartMapGroup)
  }
}

// 导出组件
export default components
