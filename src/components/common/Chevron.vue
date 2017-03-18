<style>
.chevron {
  float: right;
}
.panel_toolbox li a {
  color: #fff;
}
.chevron .nav li a {
  padding: 0 15px;
}
</style>
<template>
  <div class="chevron">
    <ul class="nav navbar-right panel_toolbox">
      <li><a class="collapse-link"><i class="glyphicon" :class="glyphicon_class"></i></a></li>
    </ul>
    <div class="clearfix"></div>
  </div>
</template>
<script>
  export default {
    props: [
      'glyphicon_class'
    ]
  }
</script>
