import Vue from 'vue'
// import App from './App.vue'
// import Form from './components/form/index.vue'
import Table from './components/table/index.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Table),
}).$mount('#app')
