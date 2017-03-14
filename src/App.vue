<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<style>
#app {
  margin: 10px;
}
</style>
<script>
export default {
  name: 'app',
  watch: {
    '$route' (to, from) {
      window.location.href = to.path
    }
  }
}
</script>
