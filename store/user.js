export default {
	namespaced:true,
	
	 state:{
		address: JSON.parse(uni.getStorageSync('Address') || '{}')		
	},
	 mutations:{
		// 添加收件人信息
		updateAddress(state,address){
			state.address = address
			this.commit('user/setAddressStorage')
		},
		// 持久化存储
		setAddressStorage(state){
			uni.setStorageSync('Address',JSON.stringify(state.address))
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