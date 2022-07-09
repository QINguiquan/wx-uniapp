<template>
	<view class="my-container">
		<myLogin v-if="!token"></myLogin>
		<myUserInfo v-else></myUserInfo>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import  mixin from '@/mixin/tabbar-badge.js'
	export default {
		mixins:[mixin],
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('user',['token']),
		},
	}
</script>

<style lang="scss"> 

</style>
