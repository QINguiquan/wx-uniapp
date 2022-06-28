<template>

	<view class="goods-item">
		<!-- 左侧图片大盒子 -->
		<view class="goods-item-left">
			<image :src="item.goods_small_logo" class="goods-pic"></image>
		</view>
		<!-- 右侧盒子 -->
		<view class="goods-item-right">

			<view class="goods-item-right-name">{{item.goods_name}}</view>

			<view class="goods-item-right-info">
				<view class="right-price">￥{{item.goods_price | tofixed2}}</view>
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
			}
		},
		filters:{
			tofixed2(val){
				return  Number(val).toFixed(2)
			}
		}
		
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		justify-content: space-between;
		padding: 5px 10px;
		border-bottom: 1px solid #efefef;

		.goods-item-left {
			margin-right: 5px;

			.goods-pic {
				display: block;
				width: 100px;
				height: 100px;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goods-item-right-name {
				font-size: 12px;
			}

			.goods-item-right-info {
				font-size: 16px;
				color: #c00000;
			}
		}
	}
</style>
