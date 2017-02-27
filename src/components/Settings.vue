<template>
  <div class="modal fade" id="settingsModal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
          <h4 class="modal-title">Settings</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Per Page:</label>
            <select class="form-control" v-model="page">
              <option value='10'>10</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
              <option value='200'>200</option>
              <option value='500'>500</option>
            </select>
          </div>
          <div class="form-group">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">Visible fields</h4>
              </div>
              <div class="panel-body">
                <div class="checkbox" v-for="field in fields">
                  <label>
                    <input type="checkbox" v-model="field.visible">
                    {{ field.title == '' ? field.name.replace('__', '') : field.title}}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: [
      'fields'
    ],
    data () {
      return {
        page: 100
      }
    },
    watch: {
      page: function () {
        this.$events.fire('per-page-set', this.page)
      }
    }
  }
</script>
