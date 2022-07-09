import Vue from 'vue'
import App from './App'

// 导入网络请求的包
import { $http } from '@escook/request-miniprogram'
import store from '@/store/store.js'

uni.$http = $http

// 请求的根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 请求拦截器
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...',	
  })
  // 判断是否需要权限添加身份认证
  if(options.url.indexOf('/my/') !== -1){
	  options.header = {
		  Authorization: store.state.user.token
	  }
  }
}

// 响应拦截器
$http.afterRequest = function() {
  uni.hideLoading()
}

//自定义方法
uni.$showMsg = function (title='数据请求失败',duration=1500){
	uni.showToast({
		title,
		duration,
		icon:"none"
	})
}




Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
  ...App
})
app.$mount()
