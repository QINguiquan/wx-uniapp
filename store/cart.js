export default {
	namespaced:true,
	state: ()=>({
		cart:JSON.parse(uni.getStorageSync('CART') || '[ ]')
	}),
	mutations:{
		addtoCart(state,goods){
			const findres = state.cart.find(item=>item.goods_id === goods.goods_id)
			if (!findres){state.cart.push(goods)}
			else{findres.goods_count++}
			this.commit('cart/setStorge')
			
		},
		// 将购物车信息存到本地储存
		setStorge(state){
			uni.setStorageSync('CART',JSON.stringify(state.cart))
		},
		// 更新购物车商品的勾选状态
		updateState(state,goods){
			const findres = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findres){
				findres.goods_state = goods.goods_state
			}
			this.commit('cart/setStorge')
		},
		// 更新商品数量
		undateGoodsCount(state,goods){
			const findres = state.cart.find(x =>x.goods_id === goods.goods_id)
			if(findres){
				findres.goods_count = goods.goods_count				
			}
			this.commit('cart/setStorge')
			
		},
		// 删除商品
		deleteGoods(state,goods_id){
			state.cart = state.cart.filter(x =>x.goods_id !== goods_id)
			this.commit('cart/setStorge')			
		},
		// 更改所有购物车商品的勾选状态
		updateAllgoodsState(state,newstate){
			state.cart.forEach( x => x.goods_state = newstate)
			this.commit('cart/setStorge')
		}
		
	},
	actions:{},
	getters:{
		// 购物车中所有商品的总数量
		total(state){
			let c = 0
			state.cart.forEach((item) => {c += item.goods_count})
			return c			
		},
		// 已勾选的商品总数量
		checkednum(state){
			return  state.cart.filter(x => x.goods_state).reduce((total,item)=> total += item.goods_count,0)
		},	
		// 已勾选商品的总价格
		checkedprice(state){
			return 	state.cart.filter(x => x.goods_state).reduce((price,item) => price += item.goods_count * item.goods_price,0).toFixed(2)
		}
	}
	
}