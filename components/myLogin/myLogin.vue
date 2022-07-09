<template>
	<view class="login-box">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<view class="login-btn" @click="login">
			一键登录
		</view>
		<text class="tips-text">登录后尽享更多权益</text>
		
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		data() {
			name: 'Mylogin'
			return {
				
			};
		},
		computed:{
			...mapState('user',['redirectinfo'])
		},
		methods:{
			...mapMutations('user',['updateuserinfo','updateToken','updateredirectinfo']),
			// 登录
			async login(){
				const [err,res] = await uni.getUserProfile({desc:'登录'})
				if(err !==null) return uni.$showMsg('获取用户信息失败，请重试')
				this.updateuserinfo(res.userInfo)
				
				// 调用小程序接口
				const [err1,res1] = await uni.login()
				if(err1 !== null)  return uni.$showMsg('登录失败')
				
				// 调用后端接口获取token
				const params = {
					encryptedData: res.encryptedData,
					rawData:res.rawData,
					iv:res.iv,
					signature:res.signature,
					code:res1.code,				
				}
				const {data} = await uni.$http.post('/api/public/v1/users/wxlogin',params)
				// 因为接口问题,无法返回token
				this.updateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
				// 登录成功跳转回原来的页面
				this.reback()
				
			},
			reback(){
				if(this.redirectinfo && this.redirectinfo.openType == 'switchTab') {
					uni.switchTab({
						url: this.redirectinfo.form,
						complete:() => {
							this.updateredirectinfo(null)
						}
					})
				}
			}
			
		},
	}
</script>

<style lang="scss">
	.login-box{		
		padding-top: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
		.contact-filled{
			
		}
		.login-btn{
			width: 90%;
			border-radius: 100px;
			line-height: 50px;
			margin: 15px 0;
			background-color:green;
			text-align: center;
		}
		.tips-text{
			font-size: 12px;
			color: gray;
		
		}
	}
</style>

 
 
 
 
 
 
 
 
 
 

 
 
