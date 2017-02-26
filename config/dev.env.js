var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://vanguard.dev/api/fulfillment-order?access_token=DjL48nS0ZbMPLzmW8uKIb9d9XiVfIRu6QzqYrNcQ&status="'
})
