import  Vue from 'vue'
import Vuex  from 'vuex'
import cart from './cart.js'
import user from  './user.js'
 Vue.use(Vuex)
 const store = new Vuex.Store({
 	modules:{
		cart:cart, //模块名:模块对象里面的内容 cart:{}
		user:user,
	}
 })
 export default store