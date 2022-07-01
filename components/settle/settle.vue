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
		<view class="settle-btn">结算({{checkednum}})</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				 
			};
		},
		computed:{
			...mapGetters('cart',['checkednum','total','checkedprice']),
			isChecked(){
				return this.checkednum === this.total
			}
		},
		methods:{
			...mapMutations('cart',['updateAllgoodsState']),
			fn(){
				this.updateAllgoodsState(!this.isChecked)
			}
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
