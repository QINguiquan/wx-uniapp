export default {
	namespaced:true,
	
	 state:{
		address: JSON.parse(uni.getStorageSync('Address') || '{}'),		
		userinfo:JSON.parse(uni.getStorageSync('USERINFO') || '{}'),
		token: uni.getStorageSync('token') || '',
		redirectinfo: null     //重定向跳前地址
	},
	 mutations:{
		 // 存储跳转前地址
		 updateredirectinfo(state,info){
			state.redirectinfo = info			
		 },
		// 添加收件人信息
		updateAddress(state,address){
			state.address = address
			this.commit('user/setAddressStorage')
		},
		// 持久化存储
		setAddressStorage(state){
			uni.setStorageSync('Address',JSON.stringify(state.address))
		},
		// 存储用户信息
		updateuserinfo(sate,userinfo){
			sate.userinfo = userinfo
			this.commit('user/setuserinfo')
		},
		// 用户信息持久化
		setuserinfo(state){
			uni.setStorageSync('USERINFO',JSON.stringify(state.userinfo))			
		},
		// token管理
		updateToken(state,token){
			state.token = token
			this.commit('user/setToken')
			
		},
		// token持久化
		setToken(state){
			uni.setStorageSync('token',JSON.stringify(state.token))
		},
		removetoken(state){
			uni.removeStorageSync('token')
		}
		
	},
	 actions:{
		
	},
	
	 getters:{
		addressprovinceName(state){
			if(!state.address.provinceName) return ''
			return  state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
			
		}
	},
	
}