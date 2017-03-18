<template>
  <div class='alert alert-danger' role='alert' v-if="status">
    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> {{ message }}
  </div>
</template>
<script>
export default {
  props: {
    status: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: 'Load Error, You can refresh later'
    }
  }
}
</script>
