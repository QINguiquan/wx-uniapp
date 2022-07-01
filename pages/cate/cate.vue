<template>
	<view>
		<my-search @click="gotoFn"></my-search>
		<view class="sroll-view-container">
			<!-- 左侧的滚动区域 -->
			<scroll-view class="left-sroll-view" scroll-y="true" :style="{height: wh + 'px'}">
				<block v-for="(item,i) in catelist" :key="i">
					<view :class="['left-sroll-view-item',i==active? 'active' : '']" @click="activechenge(i)">{{item.cat_name}} </view>
				</block>				
			</scroll-view>
			
			<!-- 右侧的滚动区域 -->
			<scroll-view scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="srollTop">				
				<view class="cate-lv2" v-for="(item2,i2) in cateLevel_2" :key="i2">
					<view class="cate-lv2-title">		
						/{{item2.cat_name}}/		
					</view>	
					<!-- 三级目录盒子 -->
					<view class="view-lv-3-list">
						<view class="view-lv-3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="gotogooslist(item3)">
							<image :src="item3.cat_icon" ></image>
							<text> {{item3.cat_name}}</text>
							
						</view>
						
					</view>
				</view>				
			</scroll-view>
			
		</view>
	</view>
</template>

<script>
	import  mixin from '@/mixin/tabbar-badge.js'
	export default {
		mixins:[mixin],
		data() {
			return {
				wh:0   ,//当前设备的可用高度
				catelist:[] ,//分类列表数据
				active:0, // 当前点击项变量
				cateLevel_2:[], //分类列表的二级目录数据
				srollTop:0,  //右侧滚动头部距离
				
			};
		},
		onLoad() {
			const sysinfo = uni.getSystemInfoSync() 
			this.wh =  sysinfo.windowHeight - 50
			this.getcatelist()
			
		},
		methods:{
			// 获取分类数据列表
			async getcatelist(){
				const {data} = await uni.$http.get('/api/public/v1/categories')
				if (data.meta.status !== 200) return uni.$showMsg()				
				this.catelist = data.message
				this.cateLevel_2 = data.message[0].children
			},
			activechenge(i){
				this.active = i
				this.cateLevel_2 = this.catelist[i].children
				this.srollTop=this.srollTop===0? 1 :0
				
			},
			gotogooslist(item3){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid=' + item3.cat_id
				})
			},
			gotoFn(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.sroll-view-container{
		display: flex;
		.left-sroll-view{			
			width:120px;
			.left-sroll-view-item{
				background-color: #f7f7f7;
				line-height: 60px;
				text-align: center;
				font-size: 12px;
				&.active{
					background-color: #FFFFFF;
					position: relative;
					&::before{
						content: '';
						display: block;
						width: 3px;
						height:30px ;
						background-color:#c00000;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
					}
				}
			}
			
		}
		
	}
	.cate-lv2-title{
		font-size: 12px;
		font-weight: 700;
		text-align: center;
		padding: 15px 0;
		
	}
	.view-lv-3-list{
		display: flex;
		flex-wrap: wrap;  // 换行显示
		.view-lv-3-item{
			width: 33.33%; 
			display: flex;			
			flex-direction: column;   // 盒子里的盒子纵向排列
			justify-content: center;
			align-items: center;
			margin-bottom: 10px;
			
			image {
				width: 60px;
				height: 60px;
			}
			text{
				font-size:12px;
			}
			
			 
		}
	}
		

</style>
