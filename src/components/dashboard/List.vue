<template>
  <div class="col-md-4 col-sm-12">
    <div class="panel" :class="panelClass">
      <div class="panel-heading">{{ heading }}</div>
      <div class="panel-body">
        <p>{{ loading }}</p>
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
      'itemList',
      'loading'
    ]
  }
</script>
