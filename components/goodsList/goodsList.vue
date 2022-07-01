<template>

	<view class="goods-item">
		<!-- 左侧图片大盒子 -->		
		<view class="goods-item-left">
			<radio :checked="item.goods_state" color="#C00000" v-if="showRadio" @click="fn"></radio>
			<image :src="item.goods_small_logo" class="goods-pic"></image>
		</view>
		<!-- 右侧盒子 -->
		<view class="goods-item-right">

			<view class="goods-item-right-name">{{item.goods_name}}</view>
			<view class="goods-item-right-info">
				<view class="right-price">￥{{item.goods_price | tofixed2}}</view>
				<uni-number-box :min="1" :value="item.goods_count" v-if="numshow" @change="numFn"></uni-number-box>
			</view>

		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			item: {
				type: Object,
				default: {}
			},
			showRadio:{
				type:Boolean,
				default:false
			},
			numshow:{
				type:Boolean,
				default:false
			}
		},
		filters:{
			tofixed2(val){
				return  Number(val).toFixed(2)
			}
		},
		methods:{
			fn(){
				this.$emit('radioChecked',{
					goods_id:this.item.goods_id,
					goods_state:!this.item.goods_state
				})
			},
			numFn(val){
				this.$emit('numchecked', {
					goods_id:this.item.goods_id,
					goods_count:val-0
				})
			}
			
		}
		 
	}
</script>

<style lang="scss">
	.goods-item {
		width: 750rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		padding: 5px 10px;
		border-bottom: 1px solid #efefef;

		.goods-item-left {
			display: flex;
			justify-content:center;
			align-items: center;
			margin-right: 5px;

			.goods-pic {
				display: block;
				width: 100px;
				height: 100px;
			}
		}

		.goods-item-right {
			display: flex;		
				flex: 1;
			flex-direction: column;
			justify-content: space-between;

			.goods-item-right-name {
				font-size: 12px;
			}

			.goods-item-right-info {
				display: flex;
				
				justify-content: space-between;
				align-items: center;
				font-size: 16px;
				color: #c00000;
			}
		}
	}
</style>
