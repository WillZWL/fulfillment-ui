<style>
.dashboard {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin:60px 0;
}
.progress span {
  padding-left: 50px;
}
.alert strong {
  padding-right: 50px;
}
</style>
<template>
  <div>
    <nav-bar></nav-bar>
    <div class="dashboard">
      <a class="btn btn-primary pull-right" href="http://admincentre.eservicesgroup.com/order/integrated_order_fulfillment/iwms_allocation_plan">Allocation Plan</a>
      <h1>Dashboard</h1>
      <div class="panel panel-info">
        <div class="panel-heading">Orders</div>
        <div class="panel-body">
          <p>This part just a demo now, it will comming soon, please wait</p>
          <div class="alert alert-danger" role="alert">
            <strong>Pending Orders  1000 orders</strong> Those orders need to allocate.
          </div>
          <div class="alert alert-success" role="alert">
            <strong>Allocated Orders 800 orders</strong> Those orders has been allocated.
          </div>
        </div>
      </div>
      <div class="panel panel-danger">
        <div class="panel-heading">Pending Orders</div>
        <div class="panel-body">
          <p>This part just a demo now, it will comming soon, please wait</p>
          <div class="progress">
            <span>3 Doodler &nbsp;&nbsp;&nbsp; 150 orders</span>
            <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;"><span class="sr-only">60% Complete</span></div>
          </div>
          <div class="progress">
            <span>AAF &nbsp;&nbsp;&nbsp; 120 orders</span>
            <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 40%;"><span class="sr-only">60% Complete</span></div>
          </div>
          <div class="progress">
            <span>ZUK &nbsp;&nbsp;&nbsp; 100 orders</span>
            <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 30%;"><span class="sr-only">60% Complete</span></div>
          </div>
        </div>
      </div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
  import NavBar from './common/NavBar.vue'
  import FooterBar from './common/FooterBar.vue'
  export default {
    components: {
      NavBar,
      FooterBar
    }
  }
</script>
