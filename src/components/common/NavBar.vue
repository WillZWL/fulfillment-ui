<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand"><img src="./../../assets/logo.png"></a>
      </div>
      <div id="navbar" class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <router-link tag="li" active-class="active" to="/" exact>
            <a>Dashboard</a>
          </router-link>
          <router-link tag="li" active-class="active" to="/paid-orders">
            <a>Paid Order List</a>
          </router-link>
          <router-link tag="li" active-class="active" to="/pending-paid-orders">
            <a>Pending Paid Order List</a>
          </router-link>
          <router-link tag="li" active-class="active" to="/allocated-orders">
            <a>Allocated Order List</a>
          </router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style scoped>
  .navbar-brand {
    padding: 5px 25px;
  }
  img {
    height: 40px;
  }
</style>
