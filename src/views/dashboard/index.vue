<template>
  <div style="height: 100%">
    <router-view :key="routerName"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routerName: this.$route.name || '/',
    }
  },
  methods: {
    loadChildApp(index) {
      //window.location.hash = '#/' + this.menusData[index].id
    }
  }
}
</script>
<style>
.sidebar {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1;
  font-size: 14px;
  width: 72px;
  height: 100%;
}
.sidebar.open {
  width: 200px;
  z-index: 1000;
}
.open-menu-button{
  width: 70px;
  color:#fff;
  font-size: 22px;
  text-align: center;
  cursor: pointer;
  padding-top: 20px;
}
.close-menu-button{
  width: 100%;
  color: #fff;
  font-size: 20px;
  text-align: left;
  padding: 0 25px;
  margin-bottom: 20px;
  cursor: pointer;
}
.close-menu-button .fa{width: 35px;}
.menu-button {
  font-size: 18px;
}

.tree-child{padding-left: 31px;
    white-space: nowrap;}
</style>
