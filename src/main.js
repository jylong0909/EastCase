import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import icon from '@/common/icon/iconfont.css'
import layer from 'vue-layer'
import axios from 'axios'
import qs from 'qs'
import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';

import 'lib-flexible'
 
Vue.use(vuescroll);
Vue.prototype.$qs = qs;
Vue.config.productionTip = false;
import $ from 'jquery'
Vue.prototype.$axios = axios
Vue.prototype.$layer = layer(Vue)
// axios.defaults.baseURL = '/api'
// axios.defaults.headers.post['Content-Type'] = 'application/json';

  


Vue.prototype.resetSetItem = function (key, newVal) {
  if (key === 'watchStorage') {

      // 创建一个StorageEvent事件
      var newStorageEvent = document.createEvent('StorageEvent');
      const storage = {
          setItem: function (k, val) {
              sessionStorage.setItem(k, val);

              // 初始化创建的事件
              newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);

              // 派发对象
              window.dispatchEvent(newStorageEvent)
          }
      }
      return storage.setItem(key, newVal);
  }
}

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
