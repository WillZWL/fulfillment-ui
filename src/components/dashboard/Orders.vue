<template>
  <div class="panel" :class="panelClass">
    <div class="panel-heading" role="tab" :id="panelId">
      <h4 class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordion" :href="'#'+collapseId" aria-expanded="false" :aria-controls="collapseId">
          {{ heading }} <strong> &nbsp;&nbsp; ( {{ orders_count }} )</strong>
        </a>
        <span class="pull-right">{{ heading_desc }}</span>
      </h4>
    </div>
    <div :id="collapseId" class="panel-collapse collapse" role="tabpanel" :aria-labelledby="panelId">
      <div class="panel-body">
        <list :heading="heading"
            :itemList="itemList"
            :panelClass="panelClass">
        </list>
      </div>
    </div>
  </div>
</template>
<script>
  import List from './List.vue'
  export default {
    components: {
      List
    },
    props: [
      'panelClass',
      'panelId',
      'collapseId',
      'heading',
      'heading_desc',
      'orders_count',
      'itemList',
      'loading'
    ]
  }
</script>
