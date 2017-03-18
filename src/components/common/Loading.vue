<style>
.spin {
  -webkit-transform-origin: 50% 50%;
  transform-origin:50% 50%;
  -ms-transform-origin:50% 50%; /* IE 9 */
  -webkit-animation: spin .8s infinite linear;
  -moz-animation: spin .8s infinite linear;
  -o-animation: spin .8s infinite linear;
  animation: spin .8s infinite linear;
}
@-webkit-keyframes spin {
  0% {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
  }
  100% {
  -webkit-transform: rotate(359deg);
  transform: rotate(359deg);
  }
  }
  @keyframes spin {
  0% {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
  }
  100% {
  -webkit-transform: rotate(359deg);
  transform: rotate(359deg);
  }
}
</style>
<template>
  <div class="alert alert-success" role="alert" v-if="status">
    <span class='glyphicon glyphicon-refresh spin'></span> &nbsp; {{ message }}
  </div>
</template>
<script>
export default {
  props: {
    status: {
      type: Boolean,
      default: true
    },
    message: {
      type: String,
      default: 'Loading, Please wait a moment'
    }
  }
}
</script>
