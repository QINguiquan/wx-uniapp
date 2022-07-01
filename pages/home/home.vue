<template>
	<view>
		<!-- 搜索组件 -->
		<view class="search-box">
			<my-search @click="onFn"></my-search>			
		</view>
		<!-- /搜索组件 -->
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="ture">
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="'/subpkg/goods/goods?goods_id='+item.goods_id">
					<image :src="item.image_src" ></image>
				</navigator>
			</swiper-item>			
		</swiper>
		<!-- /轮播图 -->
		
		<!-- 分类导航 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navlist" :key="i" @click="navFn(item)">
				<image :src="item.image_src" class="nav-img"></image>			
			</view>
		</view>
		<!-- /分类导航 -->
		
		
		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in foorlist" :key="i">	
				<!-- 标题 -->
				<image :src="item.floor_title.image_src" class="floor-title" ></image>	
				<!-- 内容盒子 -->
				<view class="floor-img-box">
					<!-- 左侧大图 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" mode="widthFix" :style="{width:item.product_list[0].image_width+'rpx'}"></image>
						
					</navigator> 
					<!-- 右侧图片 -->
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2!==0" :url="item2.url">
							<image :src="item2.image_src" mode="widthFix" :style="{width:item2.image_width+ 'rpx'}"></image>							
						</navigator>
					</view>
								
				</view>
			</view>
			
		</view>
		<!-- /楼层区域 -->
	</view>  
</template>

<script>
	import  mixin from '@/mixin/tabbar-badge.js'
	export default {
		mixins:[mixin],
    data() {
      return {
        
        swiperList: [],  // 这是轮播图的数据列表
		navlist:[],  // 首页分类的导航列表
		foorlist:[],   // 楼层数据列表
		}
  
    },
    onLoad() {
      // 调用方法，获取轮播图的数据
      this.getSwiperList()
	  this.getnavlist()
	  this.getfoorlist()
     
    },
    methods: {
		async getSwiperList() {
        const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')	
        // 请求失败
        if (res.meta.status !== 200) return uni.$showMsg()		
	    this.swiperList = res.message		
		},  
		async getnavlist(){
		const {data} = await uni.$http.get('/api/public/v1/home/catitems')
		if (data.meta.status !== 200) return uni.$showMsg()
		this.navlist = data.message
		},
		navFn(item){
			if(item.name=='分类'){
				uni.switchTab({
					url:'/pages/cate/cate'
				})
			}
		},
		// 获取楼层数据
		async getfoorlist(){
			const {data} =  await uni.$http.get('/api/public/v1/home/floordata')
			
			if (data.meta.status !== 200) return uni.$showMsg()
			
			data.message.forEach(floor => {
				floor.product_list.forEach(prod => {
				prod.url='/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
				})
				
			})
			this.foorlist= data.message
		},
		onFn(){
			uni.navigateTo({
				url:'/subpkg/search/search'
			})
		}
		
     
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-title {
    width: 100%;
    height: 60rpx;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }
  .search-box{
	  position:sticky;
	  top:0;
	  z-index: 999;
  }
</style>
