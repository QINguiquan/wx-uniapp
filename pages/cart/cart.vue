<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<!-- 收货地址组件-->
		<myaddress></myaddress>
		
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>

		<!-- 商品列表 -->
		<uni-swipe-action>
			<block v-for="(item,index) in cart" :key="index">
				<uni-swipe-action-item :options="options" @click="deletegoodsFn(item)">
					<goodsList :item="item" :showRadio="true" @radioChecked="radioCheckedFn" :numshow="true" @numchecked="numcheckedFn"></goodsList>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
		<!-- 结算组件 -->
		<view class="settle">
			<settle></settle>
		</view>
		
	</view>	
	<!-- 购物车空白页面 -->
	<view class="emty" v-else>		
		<text>空空如也~</text>
	</view>
</template>

<script>
	import mixin from '@/mixin/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		mixins: [mixin],
		data() {
			return {
				options:[{
					text:'删除',
					style:{
					backgroundColor:'#c00000'
					}					
				}],

			};
		},
		computed: {
			...mapState('cart', ['cart'])
		},
		methods: {
			...mapMutations('cart', ['updateState', 'undateGoodsCount','deleteGoods']),
			radioCheckedFn(e) {
				this.updateState(e)
			},
			numcheckedFn(e) {			
				
				this.undateGoodsCount(e)
			},
			deletegoodsFn(item){
				this.deleteGoods(item.goods_id)
			}
		},
 

	}
</script>

<style lang="scss">
	.cart-container{
		padding-bottom: 51px;
	}
	.cart-title { 
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			font-size: 14px;
			margin-left: 10px;		
		}
	}

</style>
