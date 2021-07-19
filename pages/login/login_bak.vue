<template>
	<view class="page">
		<cu-custom bgColor="bg-fuled" :isBack="false" v-on:onBackClick="$util.onBack">
			<block slot="content">登录</block>
		</cu-custom>
		<view class="flex align-center justify-center" style="height: 330rpx;margin-bottom: 60px;">
			<image style="height: 280rpx;" src="../../static/chinamobile.jpg"></image>
		</view>
		<view class="px-2">
			<m-input type="text" class="bg-light px-3 mb-3 font" placeholder="请输入用户名" style="height: 80rpx;width: 95%;" v-model="form.loginName"></m-input>
			<m-input type="password" class="bg-light px-3 mb-3 font" placeholder="请输入密码" style="height: 80rpx;width: 95%;" v-model="form.password"></m-input>
			
			<view class="main-bg-color rounded p-3 flex align-center justify-center flex-1" hover-class="main-bg-hover-color" @click="bindLogin">
				<text class="text-white font-md">登 录</text>
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
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'
	import freeDivider from "@/components/free-ui/free-divider.vue"
    import $H from '@/common/free-lib/request.js';
	import $U from '@/common/free-lib/util.js';
	
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
					password: ''
				},
				prePage:false
			}
		},
		onLoad(e) {
			if(e.prePage != undefined && e.prePage != null && e.prePage != ''){
				this.prePage = e.prePage ;
			}
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login']),
			initProvider() {
				const filters = ['weixin', 'qq', 'sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '../../static/img/' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
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
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			async bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 */
				if (this.form.loginName === '' ) {
					uni.showToast({
						icon: 'none',
						title: '请输入您的账号'
					});
					return;
				}
				if (this.form.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
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
						// 登录
						this.$store.dispatch('login',res.result.data[0])
						// uni.navigateTo({
						// 	url:"../index/index"
						// })
						uni.switchTab({
							url:"../index/index"
						})
					}else{
						uni.showToast({
							icon: 'error',
							title: '账号或密码错误'
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
			oauth(value) {
				uni.login({
					provider: value,
					success: (res) => {
						uni.getUserInfo({
							provider: value,
							success: (infoRes) => {
								/**
								 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
								 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
								 */
								this.toMain(infoRes.userInfo.nickName);
							},
							fail() {
								uni.showToast({
									icon: 'none',
									title: '登陆失败'
								});
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
			},
			getUserInfo({
				detail
			}) {
				if (detail.userInfo) {
					this.toMain(detail.userInfo.nickName);
				} else {
					uni.showToast({
						icon: 'none',
						title: '登陆失败'
					});
				}
			},
			toMain(userName) {
				this.login(userName);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				if (this.forcedLogin) {
					/* uni.reLaunch({
						url: '../main/main',
					}); */
				} else {
					uni.navigateBack();
				}

			}
		},
		onReady() {
			this.initPosition();
			this.initProvider();
			// #ifdef MP-WEIXIN
			this.isDevtools = uni.getSystemInfoSync().platform === 'devtools';
			// #endif
		}
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
