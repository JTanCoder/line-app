<template>
	<view class="page">
		<cu-custom bgColor="bg-fuled" :isBack="false" v-on:onBackClick="$util.onBack">
			<block slot="content">专线信息检索</block>
		</cu-custom>
		 <view class="cu-list menu-avatar" v-show="search">
		 	<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in cardList" :key="index"
		 	 :data-target="'move-box-' + index">
		 		<view class="cu-avatar round lg" :style="[{backgroundImage:'url('+defImg+')'}]"></view>
		 		<view class="content" @click="toProDetail(item)">
		 			<view class="text-grey">专线名称:{{item.clientName}}</view>
		 			<view class="text-gray text-sm">
		 				<text class="cuIcon-infofill  margin-right-xs">客户地址:</text> {{item.clientAddr}}
							</view>
							<view class="text-gray text-sm">
								<text class="cuIcon-infofill  margin-right-xs">客户电话:</text> {{item.clientPhone}}
							</view>
							<!-- <view class="text-gray text-sm">
								<text class="cuIcon-infofill  margin-right-xs"></text> {{item.clientPhone}}
							</view> -->
		 		</view>
		 		<view class="action">
		 			<view class="text-grey text-xs">状态</view>
		 			<view class="cu-tag round bg-grey sm">{{getLineProStatus(item.status)}}</view>
		 		</view>
		 	</view>
		 </view>
		 <view v-show="!search">
			 <view class="flex align-center justify-center" style="height: 330rpx;margin-bottom: 60px;">
			 	<image style="height: 280rpx;" src="../../static/chinamobile.jpg"></image>
			 </view>
			 <view class="px-2">
			 	<m-input type="text" class="bg-light px-3 mb-3 font" placeholder="请输入您的电话号码" style="height: 80rpx;width: 95%;" v-model="form.userPhone"></m-input>
			 	
			 	<view class="main-bg-color rounded p-3 flex align-center justify-center flex-1" hover-class="main-bg-hover-color" @click="bindLogin">
			 		<text class="text-white font-md">查询</text>
			 	</view>
			 </view>
			 <view class="flex align-center justify-center">
			 	<text class="text-light-muted font p-2" @click="toReg">项目经理、施工队?,去登录</text>
			 	<text class="text-light-muted font">|</text>
			 	<text class="text-light-muted font p-2" @click="toHome">返回入口</text>
			 </view>
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
	const db = uniCloud.database();
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
					userPhone: ''
				},
				cardList: [],
				modalName: null,
				user:this.$store.state.user.user,
				prePage:false,
				search:false,
				defImg:'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e19f9691-a059-48d3-92b5-3f37975f1344/3e7a730c-8d81-4cde-aa83-99f04c6e6105.png'
			}
		},
		onShow(){
			this.bindLogin()
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
					url:"../login/login"
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
				let _this = this ;
				// db.collection("line-app-pro")
				// .where({clientPhone:this.form.userPhone})
				// .get().then(res => {
				// 		_this.cardList = res.result.data ;
				// 		if(res.result.data.length <= 0){
				// 			uni.showToast({
				// 				icon:"success",
				// 				title:"没有查询到您的专线信息"
				// 			});
				// 		}else{
				// 			_this.search = true ;
				// 		}
				// 	}).catch(err => {
				// 		console.error(err)
				// 	})
				// 	.finally(() => {
				// 		uni.hideLoading()
				// 	})
				if(!this.form.userPhone){
					return ;
				}
				let condition = {clientPhone:this.form.userPhone};
				
				const dbCmd = db.command
				var $ = db.command.aggregate
				let res = db.collection("line-app-pro").aggregate()
				.match(condition)
				.lookup({
				  from: 'line-app-user',
				  let: {
				    pro_creator: '$creator'
				  },
				  pipeline: $.pipeline()
				    .match(dbCmd.expr($.and([
						$.eq(['$loginName', '$$pro_creator']),
				    ])))
				    .done(),
				  as: 'jlList',
				})
				.lookup({
				  from: 'line-app-user',
				  let: {
				    pro_implementId: '$implementId'
				  },
				  pipeline: $.pipeline()
				    .match(dbCmd.expr($.and([
				      $.eq(['$_id', '$$pro_implementId'])
				    ])))
				    .done(),
				  as: 'sgList',
				})
				.end()
				.then(res => {
						_this.cardList = res.result.data ;
						if(res.result.data.length <= 0){
							uni.showToast({
								icon:"success",
								title:"没有查询到您的专线信息"
							});
						}else{
							_this.search = true ;
							let user = {
								"userPhone": "-1",
								"userName": "-1",
								"userType": "-1",
								"loginName": "-1"
							}
							this.$store.dispatch('login',user)
						}
					}).catch(err => {
						console.error(err)
					})
					.finally(() => {
						uni.hideLoading()
					})	
			},
			toProDetail(item){
				uni.navigateTo({
					url:'../cardLineDetail/cardLineDetail?data='+JSON.stringify(item)
				})
			},
			getLineProStatus(status){
				if(status == 0){
					return "合同签订" ;
				}
				if(status == 1){
					return "设计院勘察" ;
				}
				if(status == 2){
					return "方案审批" ;
				}
				if(status == 3){
					return "分配施工队" ;
				}
				if(status == 4){
					return "施工中" ;
				}
				if(status == 5){
					return "施工完成" ;
				}
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
