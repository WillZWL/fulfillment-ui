<template>
  <div>
    <div class="inline field">
      <label>Merchant Balance:&nbsp; {{ rowData.currency_id }}&nbsp;{{ rowData.balance }}</label>
      <span></span>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      rowData: {
        type: Object,
        required: true
      }
    }
  }
</script>
