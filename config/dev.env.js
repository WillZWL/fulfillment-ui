var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://vanguard.dev/api/"',
  ACCESS_TOKEN: '"DjL48nS0ZbMPLzmW8uKIb9d9XiVfIRu6QzqYrNcQ"',
  ORDER_VIEW_URL: '"http://admincentre.eservicesgroup.com/cs/quick_search/view/"'
})
