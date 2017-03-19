<template>
  <div class="input-group col-md-6 col-sm-12">
    <input type="text" name="so_no" required="required" class="form-control" :placeholder="placeholder" v-model="so_no" @keyup.enter="quickSearch">
    <span class="input-group-btn">
      <button class="btn btn-primary" type="button" @click="quickSearch">
      <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
      Quick Search!
      </button>
    </span>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        so_no: '',
        placeholder: 'so no'
      }
    },
    methods: {
      quickSearch () {
        if (this.so_no) {
          var url = 'http://admincentre.eservicesgroup.com/cs/quick_search/view/' + this.so_no
          window.open(url)
        } else {
          this.placeholder = 'Please input correct so_no'
        }
      }
    }
  }
</script>
