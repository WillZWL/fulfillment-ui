<template>
  <div>
    <div class="col-md-7 filter-bar">
      <form class="form-inline">
        <div class="form-group">
          <label>Search for:</label>
          <input type="text" v-model="filterText" class="form-control" @keyup.enter="doFilter" placeholder="so no, platform_id">
          <button class="btn btn-primary" @click.prevent="doFilter">Go</button>
          <button class="btn" @click.prevent="resetFilter">Reset</button>
        </div>
      </form>
    </div>
    <div class="col-md-5 filter-bar">
      <div class="form-inline form-group pull-right">
        <button class="btn btn-default" data-toggle="modal" data-target="#settingsModal">
          <span class="glyphicon glyphicon-cog"></span> Settings
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filterText: ''
    }
  },
  methods: {
    doFilter () {
      this.$events.fire('filter-set', this.filterText)
    },
    resetFilter () {
      this.filterText = ''
      this.$events.fire('filter-reset')
    }
  }
}
</script>
<style>
.filter-bar {
  padding: 10px;
}
</style>
