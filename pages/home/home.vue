<template>
	<view class="page"> 
		<scroll-view scroll-y >
			<cu-custom bgColor="bg-fuled">
				<block slot="content">
					欢迎使用专线小程序
				</block>
			</cu-custom>
			<!-- <svg style="width:60px;height:60px">
			    <use xlink:href="../../static/logo.svg" fill="red"> </use>
			</svg> -->
			<view style="text-align: center;">
				<image src="../../static/logo-2.png"  mode="widthFix" style="width:55%;margin: 0 auto;" class="response"></image>
			</view>
			
			<button type="default"   @click="getUserInfo(1)" plain="true"  class="home-btn">
				<view class="" >
					<view  class="cu-item bg-img shadow-blur" :style="[{backgroundImage:'url(https://image.weilanwl.com/color2.0/plugin/qpczdh2307.jpg)'}]"   >
						<view class="cardTitle"> 
						项目经理/施工队 
						</view>
					</view>
				</view>
			</button>
			<button type="default"     @click="getUserInfo(2)" plain="true"  class="home-btn">
				<view class="" >
					<view  class="cu-item bg-img shadow-blur" :style="[{backgroundImage:'url(https://image.weilanwl.com/color2.0/plugin/wdh2236.jpg)'}]"   >
						<view class="cardTitle"> 
						专线客户 
						</view>
					</view>
				</view>
			</button>
			
			
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	const db = uniCloud.database();
	export default {
		data() {
			return {
				wxUser:{
					openid:'',
					nickName:'',
					wxHead:'',
				}
			}
		},
		onShow() {
			this.oauth() ;
		},
		onLoad() {
			this.oauth() ;
		},
		methods: { 
			getUserInfo(type){
			    let _this = this;
			    _this.wxUser.wxHead = '';
				_this.wxUser.nickName = '';
				
			    uni.getUserProfile({
			        desc:'Wexin', 
			        success: function(infoRes) {
			            console.log('信息',infoRes)
			            let {avatarUrl,nickName} = infoRes.userInfo;
			            _this.wxUser.wxHead = avatarUrl;
			            _this.wxUser.nickName = nickName;
			            console.log(_this.wxUser)
						_this.$store.dispatch('loginwx',_this.wxUser)
						if(!_this.wxUser.openid){
							uni.showToast({
								title:"微信信息获取失败"
							});
							return ;
						}
						//查询是否绑定账号
						db.collection("line-app-user").where({openid:_this.wxUser.openid}).get()
						.then(res => {
							if(!res.result.data || res.result.data.length <= 0){
								if(type == 1){
									uni.navigateTo({
										url: '../login/login'
									})
								}
								if(type == 2){
									uni.navigateTo({
										url: '../search/search?search=false'
									})
								}
							}else{
								let user = res.result.data[0] ;
								console.log(user)
								if(user.userType == -1){
									uni.navigateTo({
										url: '../search/search?search=true'
									})
								}else{
									// 登录
									console.log(res.result.data[0])
									let dbUser = db.collection("line-app-user")
									console.log(_this.$util.getStorage('avatarUrl'))
									dbUser.doc(user._id).update({
										avatarUrl:_this.$util.getStorage('avatarUrl'),
										nickName:_this.$util.getStorage('nickName')
									}).then(res=>{
										user.avatarUrl = _this.$util.getStorage('avatarUrl');
										user.nickName = _this.$util.getStorage('nickName');
										_this.$store.dispatch('login',user);
										console.log(user)
										uni.switchTab({
											url:"../index/index"
										})
										uni.hideLoading()
									});
								}
							}
						}).catch(err => {
							console.error(err)
						}).finally(() => {
							uni.hideLoading()
						});
						
			        },
			        fail(res) {
			            //console.log(res)
			            uni.showToast({
			                title: '您已拒绝授权',
			                icon: 'none',
			                duration: 1500
			            })
			        }
			    });
			},
			oauth(){ 
				let _self = this;  
				uni.login({
				    provider: 'weixin',
				    success: function(loginRes) {
				        console.log('weixin return code : ',loginRes.code);
						uniCloud.callFunction({
							name: 'getOpenid',
							data: {code:loginRes.code}
						}).then((res) => {
							console.log("获取openid")
							console.log(res)
							_self.wxUser.openid = res.result;
						}).catch((err) => {
							uni.hideLoading()
							uni.showModal({
								content: `请求openid失败，错误信息为：${err.message}`,
								showCancel: false
							})
						});
						//_self.wxUser.openid = openid;
				        // let url = 'https://api.weixin.qq.com/sns/jscode2session?appid='+_self.$c.appid+'&secret='+_self.$c.secret+'&js_code='+loginRes.code+'&grant_type=authorization_code'; 
				        // uni.request({
				        //     method: 'get',
				        //     url: url,
				        //     data:'',
				        //     header: {
				        //         "Content-Type": "application/x-www-form-urlencoded"
				        //     },
				        //     success:(res) => {
				        //         console.log(res)
				        //         _self.wxUser.openid = res.data.openid;
				        //     },
				        //     fail:(err) => {
				        //         //也可以写code判断
				        //         console.log(err);
				        //     },
				        //     complete:() => {
				                
				        //     }
				        // })
				    },
				})
			}
		}
	}
</script>

<style>
	.cardTitle {
		color: #fff;
		padding: 90upx 60upx;
		font-size: 40upx;
		font-weight: 300;
		transform: skew(-10deg, 0deg);
		position: relative;
		text-shadow: 0px 0px 6upx rgba(0, 0, 0, 0.3)
	}

	.cardTitle::before {
		content: "";
		position: absolute;
		width: 60upx;
		height: 6upx;
		border-radius: 20upx;
		background-color: #fff;
		display: block;
		top: 60upx;
		left: 50upx;
		transform: skew(10deg, 0deg);
	}

	.cardTitle::after {
		content: "";
		position: absolute;
		width: 140upx;
		border-radius: 6upx;
		height: 24upx;
		background-color: #fff;
		display: block;
		bottom: 76upx;
		left: 90upx;
		transform: skew(10deg, 0deg);
		opacity: 0.1;
	}
	.home-btn{
		padding: unset;
		text-align: start;
		margin: 32upx 20upx;
	}
</style>
