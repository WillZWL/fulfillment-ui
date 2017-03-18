<template>
  <div class="col-md-12 col-sm-12">
    <div class="panel" :class="panelClass">
      <div class="panel-heading">{{ heading }} Group By Merchant</div>
      <div class="panel-body">
        <ul class="list-group">
          <li class="list-group-item" v-for="item in itemList">
             <span class="badge">{{ item.count }}</span>
             {{ item.merchant_id }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: [
      'panelClass',
      'heading',
      'itemList'
    ]
  }
</script>
