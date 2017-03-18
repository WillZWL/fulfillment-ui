<template>
  <div class="modal fade" :id="'picklistDetail'+pick_list_no" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
          <h4 class="modal-title">Picklist No: {{ pick_list_no }}</h4>
        </div>
        <div class="modal-body">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title">So No List: </h4>
            </div>
            <div class="panel-body">
              {{ so_no_list }}
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
      'pick_list_no',
      'so_no_list'
    ]
  }
</script>
