<template>
	<view class="settle-container">
		<!-- 全选 -->
		<label class="radio">
			<radio color="#c00000" :checked="isChecked" @click="fn"><text>全选</text></radio>
		</label>
		<!-- 合计 -->
		<view class="andsettle">
			合计:<text class="andsettle-text">￥{{checkedprice}}</text>
		</view>
		<!-- 结算 -->
		<view class="settle-btn" @click="settleFn">结算({{checkednum}})</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	export default {
		data() {
			return {
				second:3, // 倒计时秒数
				timer:null //计时器名称
				 
			};
		},
		computed:{
			...mapGetters('cart',['checkednum','total','checkedprice']),
			...mapGetters('user',['addressprovinceName']),
			...mapState('user',['token']),
			...mapState('cart',['cart']),
			
			isChecked(){
				return this.checkednum === this.total
			}
		},
		methods:{
			...mapMutations('cart',['updateAllgoodsState']),
			...mapMutations('user',['updateredirectinfo']),
			fn(){
				this.updateAllgoodsState(!this.isChecked)
			},
			settleFn(){
				if (!this.checkednum) return uni.$showMsg('请勾选要结算的商品')
				if (!this.addressprovinceName) return uni.$showMsg('请选择收货地址')
				if (!this.token) this.delayNavigate() //未登录跳转登录页面
				this.payFn()
			},
			async payFn(){
				// 1.创建订单
				const orderinfo = {
					// order_price:this.checkedprice
					order_price:0.01,  //订单总价 开发写死
					consignee_addr:this.addressprovinceName, //收货地址
					goods:this.cart.filter(x => x.goods_state).map(x => ({
						goods_id: x.goods_is,
						goods_number:x.goods_count,
						goods_price:x.goods_price,
					}))
				}				
				const {data} = await uni.$http.post('/api/public/v1/my/orders/create',orderinfo)
				console.log(data);
				// token 拿不到返回不了订单编号
				if(data.meta.status !==200) return uni.$showMsg('订单创建失败！')
				// 订单编号
				const ordernumber = data.message.order_number
				
				
				
				// 2.订单预支付
				const {data:res} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{
					order_number:ordernumber 
				})
				
				if (res.meta.status !==200) return uni.$showMsg('订单预支付失败')
				const payinfo = res.message.pay
				
				
				
				// 3.发起微信支付
				 const [err,succ] = await uni.requestPayment(payinfo)
				 if (err) return uni.$showMsg('订单未支付')
				 const {data:res3} = await uni.$http.post('/public/v1/my/orders/chkOrder',{order_number:ordernumber})
				 if (res3.meta.status !== 200) return uni.$showMsg('订单支付失败')
				 uni.showToast({
				 	icon:'success',
					title:'支付成功'
				 })
				
				
				
				
				
			},
			delayNavigate() {
				this.second = 3
				this.showTips(this.second)
				this.timer = setInterval(() =>{
					this.second--
					if(this.second<=0){
						clearInterval(this.timer)
						uni.switchTab({
							url:'/pages/my/my',
							// 跳转成功回调函数
							success:()=>{
								this.updateredirectinfo({
									openType: 'switchTab',
									form: '/pages/cart/cart'
								})
							}
						})	
						
						return 
					}
					
					this.showTips(this.second)
				},1000)
				
			},
			
			// 展示倒计时提示消息
			showTips(n) {				
				uni.showToast({
					icon:'none',
					title:'请先登录!'+ n +'后跳转登录',	
					mask:true,  //禁止点击页面
					duration: 1500			
					
				})
			},
		}
	}
</script>

<style lang="scss">
	.settle-container{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;	
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
	}
	.radio{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.andsettle{
		.andsettle-text{
			font-weight: 700;
			color: #c00000;
		}
		
	}
	.settle-btn{
		background-color: #c00000;
		line-height: 50px;
		text-align: center;
		min-width: 100px;
		height: 50px;
		padding: 0 10px;
		color: white;
	}
	
</style>
