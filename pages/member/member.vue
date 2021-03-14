<template>
	<view class="page">
		<cu-custom bgColor="bg-fuled" :isBack="false"  >
			<block slot="content"></block>
		</cu-custom>
		<!-- 头部 start -->
		<free-list-item :cover="'/static/userpic.png'" :border="false" coverSize="120" :title="'JayTan'" :bgColor="'#58B7E9'" showRight  >
			<view class="flex flex-column">
				<view style="display: flex; justify-content: center; align-items: center;">
					<text class="text-dark font-lg font-weight-bold" style="color: #fff;">{{user.userName}}</text>
					<text class="text-dark font-sm ml-3 pb-1 pt-1 pl-2 pr-2" style="background-color: #ccc;color: #fff; border-radius: 50px;">项目经理</text>
				</view>
				<text class="text-light-muted font mt-2 ml-4" style="color: #fff;">电话号码：{{user.userPhone}}</text>
			</view>
		</free-list-item>
		<!-- 头部 end -->
		<free-divider></free-divider>
		
		
		<!-- 用户信息 -->
		<!-- <fuled-user-info :info="userInfo" v-on:onUserNameClick="gotoUserInfo"></fuled-user-info> -->
		
		<!-- 列表项 -->
		<free-list-item title="我的项目" v-show="user.userType !='3' " showRight @click="open('member/myFuling/myFuling')">
			<text slot="icon" class="iconfont font-lg py-1">&#xea2d;</text>
		</free-list-item>
		<free-list-item v-show="user.userType =='3' " title="新建账号" showRight @click="open('member/user/user')">
			<text slot="icon" class="iconfont font-lg py-1">&#xea2d;</text>
		</free-list-item>
		<free-list-item v-show="user.userType =='1' " title="新增施工队" showRight @click="open('member/implement/implement')">
			<text slot="icon" class="iconfont font-lg py-1">&#xea2d;</text>
		</free-list-item>
		<free-list-item v-show="user.userType =='1' " title="新增专线项目" showRight @click="open('member/linePro/linePro')">
			<text slot="icon" class="iconfont font-lg py-1">&#xea2d;</text>
		</free-list-item>
		<!-- <fuled-group-itme :list="admin.list" ></fuled-group-itme>
		<fuled-group-itme :list="more.list" ></fuled-group-itme>
		 -->
		 <free-list-item title="修改密码" showRight @click="open('member/pwd/pwd')">
		 	<text slot="icon" class="iconfont font-lg py-1">&#xea2d;</text>
		 </free-list-item>
		 <view class="main-bg-color rounded p-1 flex align-center justify-center flex-1 margin-top" hover-class="main-bg-hover-color" @click="loginOut">
		 	<text class="text-white font-md">退出小程序</text>
		 </view>
		 
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import freeNavBar from "@/components/free-ui/free-nav-bar.vue"
	import freeIconButton from "@/components/free-ui/free-icon-button.vue"
	import freeListItem from "@/components/free-ui/free-list-item.vue"
	import freeDivider from "@/components/free-ui/free-divider.vue"
	//import auth from '@/common/mixin/auth.js';
	export default {
		//mixins:[auth],
		components: {
			freeNavBar,
			freeIconButton,
			freeListItem,
			freeDivider
		},
		data() {
			return {
				more: {
				    list: [
				        {
				            title: "给点建议",
				            icon: "",
				            color: "text-gray",
				            url: "",
				            badge: ""
				        }
				    ]
				},
				admin: {
				    list: [
				        {
				            title: "新建账号",
				            icon: "",
				            color: "text-gray",
				            url: "member/user/user",
				            badge: ""
				        },{
				            title: "新增施工队",
				            icon: "",
				            color: "text-gray",
				            url: "member/user/user",
				            badge: ""
				        }
				    ]
				},
				userInfo: {
				    fuledId: this.$store.state.user.user.userPhone,
				    nickName: this.$store.state.user.user.userName,
				    headImg: "https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg",
				    qrCode: "https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg",
				    fuledRole: this.$store.state.user.user.userType =='1'?"项目经理":"施工队",
				    fansCount: 90,
				    followCount: 100,
				},
				user:{}
			}
		},
		onShow() {
			 this.user = JSON.parse( this.$util.getStorage("user"));
		},
		onLoad() {
			 this.user = JSON.parse( this.$util.getStorage("user"));
		},
		methods: {
			...mapMutations(['logout']),
			open(path){
				uni.navigateTo({
					url: '/pages/'+path
				});
			},
			navItemClick(item){
				uni.navigateTo({
					url:item.path
				})
			},
			loginOut(){
				this.$store.dispatch('logout',{});
				uni.clearStorageSync();  
				this.$forceUpdate(); 
				uni.navigateTo({
					url:"../home/home"
				})
			}
		}
	}
</script>

<style lang="scss">
	.nav{
		display: flex;
		/* border-top: solid 1rpx #E4E4E4;
		border-bottom: solid 1rpx #E4E4E4; */
		/* margin-top: 15rpx;
		margin-bottom: 15rpx; */
		.nav-item{
			width: 25%;
			text-align: center;
			/* padding-bottom: 10rpx; */
			view{
				width: 120rpx;
				height: 60rpx;
				/* background: $climb-shop-color; */
				border-radius: 60rpx;
				margin: 10rpx auto;
				margin-bottom: -15rpx;
				line-height: 60rpx;
				color: #FFFFFF;
				font-size: 50rpx;
				image{
					width: 55rpx;
					height: 55rpx;
				}
			}
			.icon-tupian{
				font-size: 45rpx;
			}
			text{
				font-size: 25rpx;
			}
		}
	}
</style>
