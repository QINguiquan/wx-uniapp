<template>
	<view class="my-search-container" @click="onFn">
		<view class="my-search-box">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			onFn(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container{
		height: 50px;
		background-color: #c00000;
		display: flex;		
		align-items: center;
		padding: 0 10px;
		.my-search-box{
			height: 36px;
			background-color: #FFFFFF;
			border-radius: 18px;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.placeholder{
				font-size: 15px;
				margin-left: 10px;
			}
			
		}
		
	}


</style>
