<template>
	<view v-if="goods_info.goods_name" class="goods-contaIner">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in goods_info.pics" :key="index">
				<image :src="item.pics_big" @click="preFn(index)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息 -->
		<view class="goods-info-box">
			<view class="goods-price">￥{{goods_info.goods_price}}</view>
			<view class="goods-info-body">
				<view class="goods-name">
					{{goods_info.goods_name}}

				</view>
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="yf">
				快递:免运费
			</view>

		</view>
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>



	</view>
</template>

<script>
	import {
		mapMutations,
		mapGetters
	} from 'vuex'

	export default {
		data() {
			return {
				goods_info: {},
				options: [{
					icon: 'shop',
					text: '店铺',

					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		computed: {
			...mapGetters('cart', ['total'])
		},
		watch: {

			total: {
				handler(newval) {
					const findres = this.options.find((x) => x.text === '购物车')
					if (findres) {
						findres.info = newval
					}
				},
				immediate: true
			}
		},

		onLoad(options) {
			const goods_id = options.goods_id
			this.getgoodsFn(goods_id)
		},
		methods: {
			...mapMutations('cart', ['addtoCart']),
			async getgoodsFn(goods_id) {
				const {
					data
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (data.meta.status !== 200) return uni.$showMsg()
				data.message.goods_introduce = data.message.goods_introduce.replace(/<img /g, '<img style="display:block;"').replace(
					/webp/g, 'jpg')
				this.goods_info = data.message
			},
			preFn(i) {
				uni.previewImage({
					current: i, // 预览显示的索引
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			},
			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			buttonClick(e) {
				if (e.content.text === '加入购物车') {
					const goods = {
						goods_id: this.goods_info.goods_id,
						goods_name: this.goods_info.goods_name,
						goods_price: this.goods_info.goods_price,
						goods_count: 1,
						goods_small_logo: this.goods_info.goods_small_logo,
						goods_state: true
					}
					this.addtoCart(goods)
				}

			}
		},


	}
</script>

<style lang="scss">
	swiper {

		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}

	}



	.goods-info-box {
		padding: 10px;
		padding-right: 0px;

		.goods-price {
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 14px;
				margin-right: 10px;
			}

			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		.yf {
			font-size: 12px;
			color: gray;
			margin: 10px 0;
		}

	}

	.goods_nav {
		position: fixed;
		bottom: 0px;
		left: 0px;
		right: 0px;
		width: 100%;
	}

	.goods-contaIner {
		padding-bottom: 50px;
	}
</style>
