<template>
	<view>
		<view class="goods-list">
			<view v-for="(item, index) in goodList" :key="index" @click="gotogoodFn(item)">
				<goodsList :item="item"></goodsList>				
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryobj:{
					query:'',  // 关键字
					cid:'', // 分类id
					pagenum:0, // 	页码
					pagesize:10, // 页容量
					isloding:false,  // 节流阀
				},
				goodList:[], //商品数据列表
				total:0,
				
			};
		},
		onLoad(options) {
			this.queryobj.query=options.query|| ''
			this.queryobj.cid=options.cid|| ''
			this.getgoodListFn()
			
		},
		methods:{
			async getgoodListFn(fn){
				this.isloding = true				
				this.queryobj.pagenum = this.queryobj.pagenum + 1				
				const {data} = await uni.$http.get('/api/public/v1/goods/search',this.queryobj)
				this.isloding = false
				if(data.meta.status !==200) return uni.$showMsg()
				this.goodList=[...this.goodList, ...data.message.goods]
				this.total = data.message.total
				fn && fn()
			},
			gotogoodFn(item){
				uni.navigateTo({
					url:'/subpkg/goods/goods?goods_id=' + item.goods_id
				})
			}
		},
		// 触底加载
		onReachBottom() {
			if (this.queryobj.pagesize * this.queryobj.pagenum > this.total) return  uni.$showMsg('已加载完毕')
			if (this.isloding) return		
			this.getgoodListFn()
		},
		// 下拉刷新
		onPullDownRefresh() {			
			this.total = 0
			this.isloding = false
			this.goodList = []
			this.getgoodListFn(()=>{uni.stopPullDownRefresh()})
			
		}
		
	}
</script>

<style lang="scss">
	.goods-item{
		display: flex;
		justify-content: space-between;
		padding: 5px 10px;
		border-bottom: 1px solid #efefef;
		.goods-item-left{
			margin-right: 5px;
			.goods-pic{
				display: block;
				width: 100px;
				height: 100px;
			}
		}
		.goods-item-right{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.goods-item-right-name{
				font-size: 12px;
			}
			.goods-item-right-info{
				font-size: 16px;
				color: #c00000;
			}
		}
	}

</style>
