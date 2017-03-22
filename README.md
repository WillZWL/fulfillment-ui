# order-fulfillment-system

> ESG New Order Fulfillment UI

## Build Setup

``` bash
# clone code && cd dir
git clone http://gitlab.eservicesgroup.com/esg-systems/fulfillment-ui.git
cd fulfillment-ui
```

# install dependencies
```
npm install
OR yarn install
```
If you use yarn, make sure that you have installed it

# config API_URL && ACCESS_TOKEN
```
vim config/dev.env.js
```
use a correct api url && access token to get data

# serve with hot reload at localhost:8080
```
npm run dev
```

# build for production with minification
```
npm run build
```

# build for production and view the bundle analyzer report
```
npm run build --report
```

# run unit tests
```
npm run unit
```

# run e2e tests
```
npm run e2e
```

# run all tests
```
npm test
```

## NOTICE
When you need to put the builded code on Live, Follow those steps
# 1st Step
remove all builded file on `shop.eservicesgroup.com/admincentre/fulfillment`
```
rm -rf shop.eservicesgroup.com/admincentre/fulfillment
```

# 2nd
copy the builded folder `dist/fulfillment` to `shop.eservicesgroup.com/admincentre/fulfillment`
```
cp -R dist/fulfillment/ ../project/shop.eservicesgroup.com/admincentre/fulfillment/
```

# 3rd
copy the entry file `dist/index.html` to `shop.eservicesgroup.com/app/views/order_fulfillment.php`
```
cp dist/index.html ../project/shop.eservicesgroup.com/app/views/order_fulfillment.php
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader) and [docs for vuetable-2](https://github.com/ratiw/vuetable-2).
