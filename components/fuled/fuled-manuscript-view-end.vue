<template>
	<view>
		<view style="background-color: #0056B3;">
			<view v-if="showLogo" class="ml-3 mr-5  logo-size"  >
				<view class="add-item-logo logo-size flex align-center justify-center" v-if="!isShowLogo">
					<text style="color: #fff;" @click="clickImageView">LOGO</text>
				</view>
				<view class="logo-size flex align-center justify-center position-relative" v-if="isShowLogo">
					<image src="/static/logo.png" class="logo-size" @click="clickImageView"></image>
					<text @click="changeLogo"  class="item-right-top-text position-absolute" style="background-color: #666;color: #fff; border-radius: 50px;margin: 0 auto;">更改</text>
				</view>
				
			</view>
			<view style="margin-top: 30%;" class="align-center justify-center" >
				<free-list-item :border="false" :title="''" style="height: 130px;" :bgColor="'#343A7D'" :showRight="false" @click="showInput">
					<view style="width: 100%;" class="mr-5">
						<view style="" class="flex align-center justify-center">
							<text class="text-dark font-weight-bold" style="color: #fff;font-size: 25px;">{{speechTitle.titleName==''?'感谢聆听  批评指导':speechTitle.titleName}}</text>
						</view>
					</view>
				</free-list-item>
			</view>
			<view v-if="showBottom" style="margin-top: 30%;" class="flex position-relative ml-5 mr-5 pl-5 pr-5 pt-3 pb-3">
				<view>
					<view @click="showInput">
						<text class="" style="color: #fff;">{{speechTitle.shareUser==''?'单击此处编辑分享人':'分享人 : '+speechTitle.shareUser}}</text>
					</view>
					<view class="bottom-text-width" @click="showInput">
						<text class="" style="color: #fff;float: left;">{{speechTitle.shareDate==''?'单击此处编辑分享日期':'日期 : '+speechTitle.shareDate}}</text>
						<text  style="color: #fff;float: right;">{{speechTitle.shareTime==''?'单击此处编辑分享时间':'时间 : '+speechTitle.shareTime}}</text>
					</view>
					<image src="/static/fuled/jiao-1.png"  class="item-left-top-img position-absolute" ></image>
					<image src="/static/fuled/jiao-3.png"  class="item-right-bottom-img position-absolute" ></image>
				</view>
			</view>
		</view>
		
		<uni-drawer :visible="showLeft" mode="left" >
			<view class="page"  >
				<!-- #ifdef APP-PLUS -->
					<!-- 导航栏 -->
					<free-nav-bar> </free-nav-bar>
				<!-- #endif -->
				<view class="uni-bar-body">
					<uni-nav-bar :fixed="false" :border="false" backgroundColor="#58B7E9" left-icon="arrowleft" color="#fff" left-text="返回" :title="'编辑标题'" @clickLeft="hide" background-color="#FFFFFF" >
					</uni-nav-bar>
				</view>
				<view class="uni-common-mt">
					<form >
						<view class="border-bottom pl-2 pb-2">
							<view class="title pb-1" style="color: #C9C9C9;">标题</view>
							<input placeholder="请输入标题" v-model="speechTitle.titleName"  name="speechTitle.titleName" ></input>
						</view>
						<view class="border-bottom pl-2 pb-2">
							<view class="title pb-1" style="color: #C9C9C9;">分享人</view>
							<input placeholder="请填写分享人" v-model="speechTitle.shareUser"  name="speechTitle.shareUser" ></input>
						</view>
						<view class="border-bottom pl-2 pb-2">
							<view class="title pb-1" style="color: #C9C9C9;">分享日期</view>
							<picker mode="date" :value="speechTitle.shareDate" start="2020-05-10" end="2099-01-01" @change="dateChange">
								<view class="picker">
									{{speechTitle.shareDate}}
								</view>
							</picker>
						</view>
						<view class="border-bottom pl-2 pb-2">
							<view class="title pb-1" style="color: #C9C9C9;">分享时间</view>
							<picker mode="time" :value="speechTitle.shareTime" start="09:01" end="21:01" @change="timeChange">
								<view class="picker">
									{{speechTitle.shareTime}}
								</view>
							</picker>
						</view>
						<view class="uni-btn-v">
							<button style="background-color: #58B7E9;border-radius: 0;" @click="hide">确定</button>
						</view>
					</form>
				</view>
			</view>
		</uni-drawer>
		<uni-drawer :visible="showRightDrawer" mode="right" >
			<view class="page"  >
				<!-- #ifdef APP-PLUS -->
					<!-- 导航栏 -->
					<free-nav-bar> </free-nav-bar>
				<!-- #endif -->
				<view class="uni-bar-body">
					<uni-nav-bar :fixed="false" :border="false" backgroundColor="#58B7E9" left-icon="arrowleft" color="#fff" left-text="返回" :title="'选择嘉宾'" @clickLeft="hideRight" background-color="#FFFFFF" >
					</uni-nav-bar>
				</view>
				<contacts-indexs :listAll="contactsList" @clickItem="selectContactsItem"></contacts-indexs>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	import freeNavBar from "@/components/free-ui/free-nav-bar.vue"
	import uniNavBar from '@/components/uni/uni-nav-bar/uni-nav-bar.vue'
	import uniDrawer from '@/components/uni/uni-drawer/uni-drawer.vue'
	import freeListItem from "@/components/free-ui/free-list-item.vue"
	import contactsIndexs from "@/components/fuled/fuled-contacts-indexs.vue"
	export default {
		components: {
			freeListItem,uniDrawer,freeNavBar,uniNavBar,"contacts-indexs":contactsIndexs
		},
		props: {
			// 是否开启下边线
			border:{
				type:Boolean,
				default:true
			},
			// 是否显示logo,默认显示
			showLogo: {
				type:Boolean,
				default:true
			},
			// 是否显示底部信息,默认显示
			showBottom: {
				type:Boolean,
				default:true
			},
			seq:{
				type: [String,Number],
				default:"01"
			},
			del:{
				type:Boolean,
				default:false
			},
			// 标题
			title:{
				type:String,
				default:""
			},
			// 显示右边
			showRight:{
				type:Boolean,
				default:false
			},
			// 显示左边图标
			showLeftIcon:{
				type:Boolean,
				default:true
			},
			// 是否显示箭头
			showRightIcon:{
				type:Boolean,
				default:true
			},
			speechTitle:{
				type:Object,
				default:function() {
					return {
						shareTime: '20:00',
						shareDate: '2020-05-10',
						titleName:'',
						subTitleName:'',
						shareUser:'',
					}
				}
			}
		},
		
		data() {
			return {
				isShowLogo:false,
				showLeft:false,
				showRightDrawer:false,
				
				contactsList:[
					{title:'A',list:[{user_id:1,name:'uniapp',avatar:"/static/card/1.jpg"},{user_id:1,name:'uniapp',avatar:"/static/card/1.jpg"},{user_id:1,name:'uniapp',avatar:"/static/card/1.jpg"}]},
					{title:'B',list:[{user_id:1,name:'uniapp',avatar:"/static/card/1.jpg"}]},
					{title:'C',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'D',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'E',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'F',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'G',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'H',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'I',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'J',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'K',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'L',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'M',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'N',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'O',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'P',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'Q',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'R',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'S',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'T',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'U',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'V',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'W',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'X',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'Y',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					{title:'Z',list:[{user_id:1,name:'uniapp',avatar:"../../static/card/1.jpg"}]},
					
				],
			}
		},
		methods: {
			clickImageView(path){
				this.isShowLogo = !this.isShowLogo
			},
			changeLogo(){
				uni.chooseImage({
					count:1,
					sizeType: ['compressed'],
					success: (res) => {
						// 上传
						$H.upload('/upload',{
							filePath:res.tempFilePaths[0]
						}).then(url=>{
							$H.post('/user/update',{
								avatar:url,
								nickname:this.user.nickname
							}).then(res=>{
								uni.showToast({
									title: '修改头像成功',
									icon: 'none'
								});
								this.$store.commit('updateUser',{
									k:'avatar',
									v:url
								})
							})
						})
					}
				})
			},
			showInput(){
				this.showLeft = true;
			},
			hide(){
				this.$emit('saveTitleMsg',this.speechTitle)
				this.showLeft = false;
			},
			timeChange(e) {
				this.speechTitle.shareTime = e.detail.value
			},
			dateChange(e) {
				this.speechTitle.shareDate = e.detail.value
			},
			selectContacts(){
				this.showRightDrawer = true
			},
			hideRight(){
				this.showRightDrawer = false
			},
			selectContactsItem(item){
				console.log(JSON.stringify(item))
			}
		}
	}
</script>

<style lang="scss">
	.item-left-top-img{
		/* #ifndef APP-PLUS */
		width: 16px;
		height: 18px;
		/* #endif */
		/* #ifdef APP-PLUS */
		width: 20px;
		height: 20px;
		/* #endif */
		/* #ifdef H5 */
		top:1rpx;
		left:1rpx
		/* #endif */
		/* #ifndef H5 */
		top:0rpx;
		left:15rpx
		/* #endif */
	}
	
	.item-right-bottom-img{
		/* #ifndef APP-PLUS */
		width: 16px;
		height: 18px;
		/* #endif */
		/* #ifdef APP-PLUS */
		width: 20px;
		height: 20px;
		/* #endif */
		/* #ifdef H5 */
		bottom:1rpx;
		right:1rpx
		/* #endif */
		/* #ifndef H5 */
		bottom:1rpx;
		right:1rpx
		/* #endif */
	}
	.item-right-top-text{
		text-align: center;
		justify-items: center;
		/* #ifndef APP-PLUS */
		width: 35px;
		height: 22px;
		/* #endif */
		/* #ifdef APP-PLUS */
		width: 25px;
		height: 15px;
		/* #endif */
		/* #ifdef H5 */
		top:-25rpx;
		right:-5rpx
		/* #endif */
		/* #ifndef H5 */
		top:-25rpx;
		right:-5rpx
		/* #endif */
	}
	
	.logo-size{
		width: 105px;
		height: 45px;
	}
	
	.add-item-logo{
		border:1px dashed #fff;
	}
	
	.bottom-text-width{
		/* #ifdef APP-PLUS */
		width: 240px;
		/* #endif */
		/* #ifndef APP-PLUS */
		width: 285px;
		/* #endif */
	}
</style>
