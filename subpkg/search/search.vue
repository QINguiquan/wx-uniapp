<template>
	<view>
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancelButton="none">
			</uni-search-bar>			
		</view>
		
		<view class="search-list" v-if="inputText.length!==0">
			<view class="search-item" v-for="(item,index) in searchList " :key="index" @click="gotogoodsFn(item)">
				<view class="search-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
				
			</view>
			
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clearFn"></uni-icons >	
			</view>
			<!-- 列表 -->
			<view class="history-list">
				<uni-tag :text="item" v-for="(item,index) in historyList" :key="index" @click="gotoGoodsFn(item)"></uni-tag>				
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null, //延时器
				inputText:'',  //搜索框输入的文字
				searchList:[], // 搜索结果返回列表
			    historyList:[], //搜索历史列表
				
				
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('searchKey') || [])
		},
		methods:{
			input(e){
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					this.inputText = e.value					
					this.getsearchList(e.value)	
					this.pushhistoryFn(e.value)					
				},500)
				
			},
			async getsearchList(val){
				if(this.inputText.length==0){
				this.searchList=[] 
				return
				}
				const {data}= await uni.$http.get('/api/public/v1/goods/search',{query:val})
				
				if(data.meta.status!==200){return uni.$showMsg()}
				this.searchList = data.message.goods
			
			
			},
			gotogoodsFn(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?goods_id=' + item.goods_id
				})
			},
			pushhistoryFn(val){
				if(val.trim().length!==0){
					const index = this.historyList.indexOf(val)
					if (index === -1){
					   this.historyList.unshift(val)
					   
					} else {
						this.historyList.splice(index,1)
						this.historyList.unshift(val)
					}					
					uni.setStorageSync('searchKey',JSON.stringify(this.historyList))
					return 
				}
					
			},
			clearFn(){
				this.historyList=[]
				uni.removeStorageSync('searchKey')
			},
			gotoGoodsFn(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query=' + item
				})
				
			}
			
		}
	}
</script>

<style lang="scss">
	.search-box{
		position: sticky;
		top: 0;
		z-index: 999;
	}
	.uni-searchbar{
		background-color:#c00000 !important;
	}

	
	.search-list{
		padding: 0 5px;
		.search-item{
			display: flex;
			align-items: center; 
			justify-content: space-between;
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			.search-name{
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				margin-right: 3px;
				
			}
		}
		
	}
	.history-box{
		padding: 0 10px;
		.history-title{
			display: flex;
			justify-content: space-between;
			height: 40px;
			align-items: center;
			border-bottom: 1px solid #efefef;
		}
		.history-list{
			display: flex;
			flex-wrap: wrap;
			.uni-tag{
				margin:  0 5px;
			}
			
		}
		
	}
</style>
