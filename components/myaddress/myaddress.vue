<template>
	<view>
		<!-- 选择地址盒子 -->
		<view class="address-chose-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" class="address-btn" @click="choseaddressFn">请选择收货地址+</button>			
		</view>
		
		
		<!-- 详细地址信息盒子 -->
		<view class="address-info-box" v-else @click="choseaddressFn">
			<view class="row1">
				<view class="row1-left">
					<view class="row1-left-name">收货人:{{address.userName}}</view>					
				</view>
				<view class="row1-right">
					<view class="row1-right-info">电话:{{address.telNumber}}</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>				
			</view>
			
			<view class="row2">
				<view class="row2-left">
					收货地址:{{addressprovinceName}}
				</view>
				<view class="row2-right">
					
				</view>
				
				
				
				
			</view>
			
		</view>
		
		<!-- 底部边框 -->
		<image src="/static/cart_border@2x.png" class="address-box"></image>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('user',['updateAddress']),
			// 选择收件人信息
			async choseaddressFn(){
				const [err,succ] = await uni.chooseAddress().catch(err => err)			
				// 用户成功选择收货地址
				if(err=== null  && succ.errMsg==='chooseAddress:ok'){				
					// 存到vuex里
				this.updateAddress(succ)
				}
				
				// 判断是否需要重新地理授权
				if(err && (err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response')){
					this.reAuth()
				}
				
			},
			// 地理授权
			async reAuth(){
				const [err2,confirmres] = await uni.showModal({
					content:'检测到你尚未打开地理授权,是否去设置打开',
					confirmColor:'去设置',
					cancelText:'取消'
				})
				if(err2) return 
				if (confirmres.cancel) return  uni.$showMsg('您取消了地理授权')
				if (confirmres.confirm) return  uni.openSetting({
					success:(settingres)=>{
						if(!settingres.authSetting['scope.address']) return uni.$showMsg('您取消了授权')
						if(settingres.authSetting['scope.address']) return uni.$showMsg('授权成功,请选择收货地址')
						
					}
				})
				
				
				
			}
			
			
			
		},
		computed:{
			...mapState('user',['address']),
			...mapGetters('user',['addressprovinceName'])
			
		}
	}
</script>

<style lang="scss">
	.address-box{
		display: block;
		width: 100%;
		height: 5px;
	}
	.address-chose-box{
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.address-info-box{
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;
		
		.row1{
			display: flex;
			justify-content: space-between;
			.row1-left{
				.row1-left-name{
					
				}
					
			}
			.row1-right{
				display: flex;
				justify-content: space-between;
				.row1-right-info{
					
				}
				
			}
		}
		.row2{
			display: flex;
			// justify-content: space-between;
			margin-top: 10px;
			.row2-left{
				white-space: nowrap;
				
			}
			.row2-right{
				
			}
		}
	}
	
	
	
	

</style>
