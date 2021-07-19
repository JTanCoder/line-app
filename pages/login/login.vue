<template>
	<view class="page">
		<cu-custom bgColor="bg-fuled" :isBack="false" v-on:onBackClick="this.$util.onBack">
			<block slot="content">号码绑定</block>
		</cu-custom>
		<view class="flex align-center justify-center" style="height: 330rpx;margin-bottom: 60px;">
			<image style="height: 280rpx;" src="../../static/chinamobile.jpg"></image>
		</view>
		<view class="px-2">
			<m-input type="text" class="bg-light px-3 mb-3 font" placeholder="请输入您要绑定的电话号码" style="height: 80rpx;width: 95%;" v-model="form.loginName"></m-input>
			
			<view class="main-bg-color rounded p-3 flex align-center justify-center flex-1" hover-class="main-bg-hover-color" @click="bindLogin">
				<text class="text-white font-md">绑定</text>
			</view>
		</view>
		<view class="flex align-center justify-center">
			<text class="text-light-muted font p-2" @click="toReg">专线客户?,去查询</text>
			<text class="text-light-muted font">|</text>
			<text class="text-light-muted font p-2" @click="toHome">返回入口</text> 
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database();
	import mInput from '../../components/m-input.vue'
	import freeDivider from "@/components/free-ui/free-divider.vue" 
	export default {
		components: {
			mInput,
			freeDivider
		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				positionTop: 0,
				isDevtools: false,
				form: {
					loginName: '',
				},
				prePage:false
			}
		},
		onLoad(e) {
			 
		}, 
		methods: {  
			toReg(){
				uni.navigateTo({
					url:"../search/search"
				})
			},
			toHome(){
				uni.navigateTo({
					url:"../home/home"
				})
			},
			
			async bindLogin() {
				let that = this ;
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 */
				if (this.form.loginName === '' ) {
					uni.showToast({
						icon: 'none',
						title: '请输入您要绑定的电话号码'
					});
					return;
				}
				
				uni.showLoading({
					title: '处理中...'
				}); 
				uniCloud.callFunction({
					name: 'get',
					data: this.form
				}).then((res) => {
					uni.hideLoading()
					if(res.result.data.length > 0){
						let user = res.result.data[0] ;
						// 登录
						console.log(res.result.data[0])
						let dbUser = db.collection("line-app-user")
						console.log(that.$util.getStorage('avatarUrl'))
						dbUser.doc(user._id).update({
							openid:that.$util.getStorage('openid'),
							avatarUrl:that.$util.getStorage('avatarUrl'),
							nickName:that.$util.getStorage('nickName')
						}).then(res=>{
							console.log(res)
							user.openid = that.$util.getStorage('openid');
							user.avatarUrl = that.$util.getStorage('avatarUrl');
							user.nickName = that.$util.getStorage('nickName');
							this.$store.dispatch('login',user);
							console.log(user)
							uni.switchTab({
								url:"../index/index"
							})
							uni.hideLoading()
						});
						
						// uni.navigateTo({
						// 	url:"../index/index"
						// })
						// uni.switchTab({
						// 	url:"../index/index"
						// })
					}else{
						uni.showToast({
							icon: 'error',
							title: '系统无此手机号，请检查！'
						});
					}
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `登录失败，错误信息为：${err.message}`,
						showCancel: false
					})
				})
			},
			
		}, 
	}
</script>

<style>
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 10px;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		position: relative;
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		margin: 0 20px;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 30px;
		height: 30px;
		margin: 10px;
	}

	.oauth-image button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>
