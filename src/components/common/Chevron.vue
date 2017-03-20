<style>
.chevron {
  float: right;
}
.chevron ul li {
  float: right;
}
.chevron .nav li a {
  color: #fff;
  padding: 0 10px;
}
</style>
<template>
  <div class="chevron">
    <ul class="nav navbar-right panel_toolbox">
      <li><a class="collapse-link"><i class="glyphicon" :class="glyphicon_class"></i></a></li>
      <li v-if="download_url"><a :href="download_url+'&access_token='+access_token" target="_blank"><i class="glyphicon glyphicon-download-alt"></i></a></li>
    </ul>
    <div class="clearfix"></div>
  </div>
</template>
<script>
  let ACCESS_TOKEN = process.env.ACCESS_TOKEN
  export default {
    props: {
      glyphicon_class: {
        type: String,
        default: 'glyphicon-chevron-up'
      },
      download_url: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        access_token: ACCESS_TOKEN
      }
    }
  }
</script>
