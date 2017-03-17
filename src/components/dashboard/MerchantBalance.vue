<template>
  <div class="col-md-4 col-sm-12">
    <div class="panel panel-primary">
      <div class="panel-heading">Merchant Balance</div>
      <div class="panel-body">
        <p>{{ loading }}</p>
        <ul class="list-group">
          <li class="list-group-item" v-for="item in itemList">
            <span class="badge" v-if="item.balance > 0" v-bind:style="{ 'background-color': '#5cb85c' }">
            {{ item.currency_id }} {{ item.balance}}
            </span>
            <span class="badge" v-else v-bind:style="{ 'background-color': '#f0ad4e' }">
            {{ item.currency_id }} {{ item.balance}}
            </span>
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
      'loading',
      'itemList'
    ]
  }
</script>
