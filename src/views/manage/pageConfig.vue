<template>
  <div class="wrap deep">
    <div class="panel">
      <svg-subtitle style="margin-top:10px;" text="当前页可用图表部件" :height="20" :width="200" />
      <div class="widgets-selection  block-layout" id="widgets-draggable">
        <div v-for="widget in allWidgets" :key="widget.id" class="block-wrapper block-dropzone" :data-widget-id="widget.id">
          <div class="block-type-hollow">
            <div class='thumb' :class="widget.theme"></div>
            <div class="tit">{{widget.name}}</div>
          </div>
          <div class="block-draggable" :data-widget-id="widget.id">
            <div class='thumb' :class="widget.theme"></div>
          </div>

        </div>
      </div>
    </div>
    <div class="main-area">
      <div class="toolbar">
        <button type="button" class="btn btn-link" @click="saveData()">保存</button>
        <!-- <button type="button" class="btn btn-link">预览</button> -->
      </div>
      <div style="text-align:center; margin: 20px auto;">
        <svg-title :width="600" :height="50" text="大数据平台"></svg-title>
      </div>
      <div class="stage">
        <div class="widgets-placed" id="widgets-placed">
          <div v-for="widget in widgetsInPage" :key="widget.id" :style="{
            position: 'absolute',
            left: widget.position.x+'px',
            top: widget.position.y+'px',
            width: widget.size.w+'px',
            height: widget.size.h+'px'
          }" class="widget-wrapper">
            <!-- <component :is="widget.chartComponent" :width="widget.size.w" :height="widget.size.h" /> -->
            <component :is="chartMap[widget.theme].type" :width="widget.size.w" :height="widget.size.h" :theme="chartMap[widget.theme].theme" />
          </div>
        </div>
        <div class="widgets-layoutarea block-layout" id="widgets-dropzone">
          <div v-for="i in 16" :key="i" class="block-wrapper block-dropzone" :style="{height: cellHeight + 'px'}" :data-col-index="((i-1)%4+1)" :data-cell-index="i" :data-row-index="Math.floor((i-1)/4+1)">
            <div class="block-type-stripes"></div>
          </div>
        </div>
      </div>
    </div>
    <widget-setting :widget="overWidget" :change-layout="changeLayout"></widget-setting>
  </div>
</template>
<script>
import axios from 'axios'
import { Droppable } from '@shopify/draggable'
import widgetSetting from './components/widgetSetting.vue'

const cellWidth = 300
const cellHeight = 200

const chartMap = {
  bar: { type: 'chartBar', theme: '' },
  barWave: { type: 'chartBar', theme: 'wave' },
  barCone: { type: 'chartBar', theme: 'cone' },
  barCust: { type: 'chartBar', theme: 'cust' },
  barMul: { type: 'chartMultiBar', theme: '' },
  barMulCone: { type: 'chartMultiBar', theme: 'cone' },
  barTra: { type: 'chartTransverseBar', theme: '' },
  line: { type: 'chartLine', theme: '' },
  lineFlat: { type: 'chartLine', theme: 'flat' },
  lineMul: { type: 'chartMultiLine', theme: '' },
  lineMulSmooth: { type: 'chartMultiLine', theme: 'smooth' },
  pie: { type: 'chartPie', theme: '' },
  pieRose: { type: 'chartPie', theme: 'rose' },
  pieMul: { type: 'chartMultiPie', theme: '' },
  pieNest: { type: 'chartMultiPie', theme: 'nest' },
  map: { type: 'chartMap', theme: '' }
}

export default {
  data() {
    return {
      allWidgets: null,
      widgetsInPage: [],
      overWidget: null, // 鼠标在右侧移动时正处于鼠标下的图表
      cellWidth,
      cellHeight,
      echoArr: [],
      index: []
    }
  },
  watch: {
    widgetsInPage(widgets) {
      // 记录每个格子是否被占用了
      const placedTable = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
      for (let widget of widgets) {
        let x = Number(widget.location.split(',')[0]) - 1
        let y = Number(widget.location.split(',')[1]) - 1
        placedTable[y][x] = widget.id
        let w = Number(widget.layout.split('*')[0])
        if (w == 2) {
          placedTable[y][x + 1] = widget.id
        }
        let h = Number(widget.layout.split('*')[1])
        if (h == 2) {
          placedTable[y + 1][x] = widget.id
        }
        if (w == 2 && h == 2) {
          placedTable[y + 1][x + 1] = widget.id
        }
      }
      this.placedTable = placedTable
    }
  },
  components: {
    widgetSetting
  },
  async created() {
    this.placedTable = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    const pageId = this.$route.params.id
    try {
      var res = await axios({
        method: 'get',
        baseURL: `${siteURL}`,
        url: `report/getReports/${pageId}`,
        headers: { userToken: this.$userToken }
      })
    } catch (e) {
      res = { data: { data: [] } }
    }
    res.data.data.forEach(item => {
      if (typeof item.appDataCodes == 'string') {
        item.appDataCodes = item.appDataCodes.split(',')
      }
      if (typeof item.appDataNames == 'string') {
        item.appDataNames = item.appDataNames.split(',')
      }
      if (!item.appDataCodes && item.appMap) {
        item.appDataCodes = Object.keys(item.appMap)
      }
      if (!item.appDataNames && item.appMap) {
        item.appDataNames = Object.values(item.appMap)
      }
      if (!item.appDataCode) {
        item.appDataCode = item.appDataCodes[0]
      }
      if (!item.appDataName) {
        item.appDataName = item.appDataNames[0]
      }
      if (!item.selectedAppNames) {
        item.selectedAppNames = []
      }
      if (!item.selectedAppCodes) {
        item.selectedAppCodes = []
      }
    })
    this.allWidgets = res.data.data
    console.log(this.allWidgets)
    this.$nextTick(this.sortableInit)
    axios.defaults.headers.post['userToken'] = this.$userToken

    // 回显页面
    var that = this
    try {
      res = await axios.get(`${siteFrontURL}page/getReports/` + pageId, {
        headers: { userToken: this.$userToken }
      })
    } catch (e) {
      res = { data: { data: [] } }
    }
    res.data.data.forEach(item => {
      if (typeof item.appDataCodes == 'string') {
        item.appDataCodes = item.appDataCodes.split(',')
      }
      if (typeof item.appDataNames == 'string') {
        item.appDataNames = item.appDataNames.split(',')
      }
      if (!item.appDataCodes && item.appMap) {
        item.appDataCodes = Object.keys(item.appMap)
      }
      if (!item.appDataNames && item.appMap) {
        item.appDataNames = Object.values(item.appMap)
      }
      if (!item.appDataCode) {
        item.appDataCode = item.appDataCodes[0]
      }
      if (!item.appDataName) {
        item.appDataName = item.appDataNames[0]
      }
      if (!item.selectedAppNames) {
        item.selectedAppNames = []
      }
      if (!item.selectedAppCodes) {
        item.selectedAppCodes = []
      }
    })
    const selection = document.getElementById('widgets-draggable')
    const placed = document.getElementById('widgets-dropzone')
    for (let i = res.data.data.length - 1; i >= 0; i--) {
      const widget = res.data.data[i]
      widget.appMap =  widget.allAppMap
      if (!widget.appDataCodes && widget.appMap) {
        widget.appDataCodes = Object.keys(widget.appMap)
      }
      let selectedAppCodes = widget.dataAppcodes.split(',')
      // console.log(widget.name)
      // console.log(selectedAppCodes);
      let location = widget.location.split(',')
      let position = {
        x: (Number(location[0]) - 1) * cellWidth,
        y: (Number(location[1]) - 1) * cellHeight
      }
      let layout = widget.layout
      let size = {
        w: Number(layout.split('*')[0]) * cellWidth,
        h: Number(layout.split('*')[1]) * cellHeight
      }
      let index = 4 * (Number(location[1]) - 1) + (Number(location[0]) - 1)

      let sourceEl = selection.querySelector('.block-draggable[data-widget-id="' + widget.id + '"]')
      if (sourceEl) {
        let targetEl = placed.querySelectorAll('.block-dropzone')[index]
        targetEl && targetEl.appendChild(sourceEl)
      }

      let widgetConfig = Object.assign({}, widget, {
        selectedAppCodes,
        index: index + 1,
        position,
        size
      })

      that.widgetsInPage.push(widgetConfig)
    }
  },
  beforeMount() {
    this.$root.eventHub.$emit('addclass', 'hide-sidebar')
  },
  beforeDestroy() {
    //const placed = document.getElementById('widgets-dropzone')
    //placed.removeEventListener('mousemove', this.mousemoveHandler)
    this.$root.eventHub.$emit('removeclass', 'hide-sidebar')
  },
  methods: {
    sortableInit() {
      const that = this
      const selection = document.getElementById('widgets-draggable')
      const placed = document.getElementById('widgets-dropzone')

      placed.addEventListener('mousemove', this.mousemoveHandler)

      const containers = [selection, placed]
      // 参考自 https://shopify.github.io/draggable/examples/unique-dropzone.html
      const droppable = new Droppable(containers, {
        draggable: '.block-draggable',
        dropzone: '.block-dropzone',
        mirror: {
          constrainDimensions: true
        }
      })
      let droppableOrigin

      droppable.on('drag:start', function(evt) {
        droppableOrigin = evt.originalSource.dataset.widgetId
      })

      droppable.on('droppable:dropped', function(evt) {
        let dataset = evt.dropzone.dataset
        // 如果从设置拖向部件库，则只能拖到原来的位置(部件库里的div.block-dropzone有data-widget-id属性)
        if (dataset.widgetId && dataset.widgetId != droppableOrigin) {
          evt.cancel()
        }
        // 如果拖向设计区，有些部件宽或高超过2格的，那些格子也要被排除，不响应drop
        if (dataset.cellIndex && that.placedTable[dataset.rowIndex - 1][dataset.colIndex - 1] !== 0) {
          evt.cancel()
        }
      })
      // droppable.on('mirror:destroy', function(evt) {
      //   // 还原拖拽引起的dom变化
      //   let originalSource = droppable.originalSource
      //   originalSource.parentNode.removeChild(originalSource)
      //   let sourceContainer = droppable.sourceContainer.querySelector('[data-widget-id="'+originalSource.dataset.widgetId+'"]')
      //   sourceContainer.appendChild(originalSource)
      // })
      droppable.on('droppable:stop', function(evt) {
        let dataset = evt.dropzone.dataset
        // 如果从部件库拖入设计区(设计区的div.block-dropzone没有data-widget-id属性)
        if (!dataset.widgetId) {
          let colIndex = dataset.colIndex
          let rowIndex = dataset.rowIndex
          let position = {
            x: (Number(colIndex) - 1) * cellWidth,
            y: (Number(rowIndex) - 1) * cellHeight
          }
          const widget = that.allWidgets.find(i => String(i.id) == droppableOrigin)
          let layout = widget.layout
          let size = {
            w: Number(layout.split('*')[0]) * cellWidth,
            h: Number(layout.split('*')[1]) * cellHeight
          }
          let widgetConfig = Object.assign({}, widget, {
            location: colIndex + ',' + rowIndex,
            position,
            size
          })
          delete widgetConfig.thumbnail
          let hasInPage = false
          for (let i = that.widgetsInPage.length - 1; i >= 0; i--) {
            // console.log(that.widgetsInPage[i].id)
            if (String(that.widgetsInPage[i].id) == droppableOrigin) {
              that.widgetsInPage.splice(i, 1, widgetConfig)
              hasInPage = true
            }
          }
          if (!hasInPage) {
            that.widgetsInPage.push(widgetConfig)
          }
        } else {
          // 如果从设计区拖回部件库(部件库里的div.block-dropzone有data-widget-id属性)
          for (let i = that.widgetsInPage.length - 1; i >= 0; i--) {
            if (String(that.widgetsInPage[i].id) == droppableOrigin) {
              that.widgetsInPage.splice(i, 1)
            }
          }
        }
      })
    },
    saveData() {
      let widgetsArr = this.widgetsInPage
      let reports = []
      let $this = this
      if (widgetsArr.length == 0) {
        $this.$message({
          message: '请先配置页面再保存！',
          type: 'warning'
        })
        return
      }
      for (let i = 0; i < widgetsArr.length; i++) {
        // console.log(widgetsArr)
        reports.push({
          reportId: widgetsArr[i].id,
          location: widgetsArr[i].location,
          data_appcodes: widgetsArr[i].selectedAppCodes.join(',')
        })
        let line = reports[i].location.split(',')
        // console.log(line)
        if (reports[i].data_appcodes == '') {
          $this.$message({
            message: '请配置第' + line[1] + '行，第' + line[0] + '列，图表所在维度！',
            type: 'warning'
          })
          return
        }
      }
      axios
        .post(`${siteURL}page/saveData`, {
          pageId: this.$route.params.id,
          reports: reports
        })
        .then(function(res) {
          if (res.data.code == 0) {
            $this.$message({
              message: '保存成功！',
              type: 'success'
            })
          }
        })
        .catch(function(error) {
          // console.log(error);
        })
    },
    mousemoveHandler(evt) {
      if (evt.target.parentNode.dataset.rowIndex && evt.target.parentNode.dataset.colIndex) {
        let dataset = evt.target.parentNode.dataset
        if (dataset.cellIndex && this.placedTable[dataset.rowIndex - 1][dataset.colIndex - 1] !== 0) {
          this.overWidget = this.widgetsInPage.find(i => String(i.id) == this.placedTable[dataset.rowIndex - 1][dataset.colIndex - 1])
        }
      } else {
        this.timer = setTimeout(_ => {
          this.overWidget = null
        }, 400)
      }
    },
    changeLayout(w, h, disable) {
      if (disable) {
        return
      }
      if (this.overWidget && w && h) {
        let size = {
          w: w * this.cellWidth,
          h: h * this.cellHeight
        }
        this.overWidget.layout = w + '*' + h
        this.overWidget.size = size
        // for(let i=this.widgetsInPage.length-1; i>=0;i--){
        //   if(this.overWidget.id === this.widgetsInPage[i].id){
        //     this.widgetsInPage.splice(i,1,this.overWidget)
        //   }
        // }
      }
    }
  },
  hasOccupied(dom) {}
}
</script>
<style>
.wrap.deep .el-button {
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: rgba(255, 255, 255, 0.6);
}
</style>

<style scoped>
.wrap.deep {
  position: relative;
  color: #7a7dab;
  background: #262741;
  min-height: 100%;
}
.panel {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 230px;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.2);
}
.main-area {
  margin-left: 230px;
}
.widgets-selection {
  margin: 8px 0 0 8px;
  width: 212px;
}
.widgets-selection::after {
  content: ' ';
  display: table;
  clear: both;
  height: 0;
}
.widgets-selection .block-wrapper {
  position: relative;
  width: 100px;
  height: 73px;
  float: left;
  margin: 3px 3px 25px;
}
.stage,
.widgets-layoutarea,
.widgets-placed {
  position: relative;
  width: 1200px;
  height: 1000px;
  margin: 0 auto;
}
.widgets-placed,
.block-type-hollow,
.block-type-stripes,
.block-cover-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.block-cover-image {
  background-color: rgba(250, 250, 255, 0.01);
  user-select: none;
}
.block-type-hollow {
  opacity: 0.3;
}
#widgets-dropzone .block-draggable {
  display: block !important;
}
.block-draggable {
  width: 100%;
  height: 100%;
  position: relative;
  border: 1px solid rgba(250, 250, 255, 0.1);
}
.widgets-selection .block-draggable:hover {
  border: solid 1px rgba(250, 250, 255, 0.5);
}
.block-dropzone {
  position: relative;
}

.widgets-layoutarea > div {
  width: 300px;
  height: 250px;
  float: left;
  border: 1px solid rgba(250, 250, 255, 0.1);
}

.block-draggable.draggable-source--is-dragging {
  outline: solid 2px #0042ff;
}
/* 把左侧widget拖到设计区时，widget的缩略图移到了设计区，为了防止遮挡图表，所以隐藏缩略图 */
.widgets-layoutarea .draggable-dropzone--occupied .block-draggable img {
  visibility: hidden;
}
</style>
