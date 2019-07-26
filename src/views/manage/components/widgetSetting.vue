<template>
  <el-popover placement="top" width="200" v-model="visible"  trigger="hover">
    <!-- <div v-if="widget && widget.appMap" class="selectbox" id="selectBox">
      <el-checkbox-group v-model="widget.selectedAppCodes" @change="handleChecked">
        <el-checkbox v-for="(name, code) in widget.appMap" :label="code" :key="code">{{name}}</el-checkbox>
      </el-checkbox-group>
      <div style="text-align:center">
        <el-button type="primary" size="mini" plain @click="saveCode()">确定</el-button>
      </div>
    </div> -->

    <div v-if="widget && widget.appMap" class="selectbox" id="selectBox">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="selectAll">全选</el-checkbox>
      <el-checkbox-group v-model="widget.selectedAppCodes" @change="selectAppCode">
        <el-checkbox v-for="(name, code) in widget.appMap" :label="code" :key="code">{{name}}</el-checkbox>
      </el-checkbox-group>
      <div style="text-align:center">
        <el-button type="primary" size="mini" plain @click="saveCode()">确定</el-button>
      </div>
    </div>

    <el-button slot="reference" class="setting-button" @mouseover="clearTimeout" v-show="widget && widget.position" :style="{
      left: widget ? widget.position.x+offsetX+'px' : 0,
      top: widget ? widget.position.y+offsetY+'px' : 0
    }">设置</el-button>
  </el-popover>
</template>

<script>
export default {
  props: {
    widget: Object,
    changeLayout: Function
  },
  data() {
    return {
      checkAll: false,
      isIndeterminate: false,
      visible: false
    }
  },
  computed: {
    offsetX() {
      const placed = document.getElementById('widgets-dropzone')
      return placed.getBoundingClientRect().left
    },
    offsetY() {
      const placed = document.getElementById('widgets-dropzone')
      return placed.getBoundingClientRect().top
    }
  },
  watch: {
    /*‘全部’作为维度，同于全选*/
    /*'widget.selectedAppCodes'(val, oldVal) {
      if (this.widget && this.widget.appDataCodes.length) {
        let appCodes = this.widget.appDataCodes
        if (oldVal && oldVal.length == appCodes.length && val && val.includes('system_all')) {
          // 全选状态下，再取消一个普通项
          this.widget.selectedAppCodes.splice(this.widget.selectedAppCodes.indexOf('system_all'), 1)
        } else if (val && val.length == appCodes.length - 1 && !val.includes('system_all') && (!oldVal || !oldVal.includes('system_all'))) {
          // 所有普通项被勾选中时
          this.widget.selectedAppCodes = appCodes.slice()
        } else if (val && val.includes('system_all') && (!oldVal || !oldVal.includes('system_all')) && val.length < appCodes.length) {
          // 全选被勾选，并且还有没有被勾选的普通项时
          this.widget.selectedAppCodes = appCodes.slice()
        } else if (val && !val.includes('system_all') && oldVal && oldVal.includes('system_all')) {
          // 取消全选
          this.widget.selectedAppCodes = []
        }
      }
    }*/
  },
  methods: {
    clearTimeout() {
      clearTimeout(this.$parent.timer)
    },
    saveCode() {
      this.visible = false
    },
    selectAll(val) {
      let appMap = [];
      for(var key in this.widget.appMap){
        appMap.push(key);
      }
      this.widget.selectedAppCodes = val ? appMap : [];
      this.isIndeterminate = false;
      // this.widget.selectedAppCodes = val ? this.widget.appDataCodes : [];
    },
    selectAppCode(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === appMap.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < appMap.length;
      // this.checkAll = checkedCount === this.widget.appDataCodes.length;
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.widget.appDataCodes.length;
    },
    handleChecked(value) {}
  }
}
</script>
<style scoped>
.el-dropdown-menu__item--divided:before {
  display: inline;
}
.el-dropdown-menu__item--divided {
  border-top: none;
  border-bottom: 1px solid #ebeef5;
}
.selectbox > .el-checkbox {
  z-index: 10;
}
.el-checkbox-group .el-checkbox {
  display: block;
}
.el-checkbox-group .el-checkbox{margin-left: 30px;}
.setting-button {
  position: absolute;
  padding: 10px 15px 8px 13px;
  margin: 10px;
}
.menu-item-layout {
  display: inline-block;
  width: 48%;
  text-align: center;
  padding: 10px 0 0;
}
.menu-item-layout span {
  display: block;
  padding: 5px 0;
}
.menu-item-layout:focus,
.menu-item-layout:not(.is-disabled):hover {
  background-color: #ecf5ff;
  color: #66b1ff;
}
.is-active {
  background-color: #cce4ff;
  color: #66b1ff;
}
.menu-item-layout.is-disabled {
  opacity: 0.3;
}
</style>

