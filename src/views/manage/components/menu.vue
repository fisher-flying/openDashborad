<template>
  <div class='menus-container' id='menus-container'>
    <ul class='menu'>
      <li v-for='menu in data' v-if="menu.meta && menu.meta.title" :key="menu.path" class="menu-item level1">
        <router-link :to="menu.path">
          <i :class="menu.meta.icon" class="menu-icon"></i>
          <span class="menu-title">{{menu.meta.title}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    let routePath = window.location.hash.substr(1)
    routePath = routePath.split('?')[0]
    return {
      routePath
    }
  },
  created() {
    window.addEventListener('hashchange', e => {
      let routePath = window.location.hash.substr(1)
      this.routePath = routePath.split('?')[0]
    })
  }
}
</script>
