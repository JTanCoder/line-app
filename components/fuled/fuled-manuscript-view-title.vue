<template>
	<view>
		<view style="background-color: #0056B3;">
			<view v-if="isShowLogo" class="ml-3 mr-5  logo-size"  >
				<view class="add-item-logo logo-size flex align-center justify-center" v-if="speechTitle.isShowLogo != 1">
					<text style="color: #fff;" @click="clickImageView">LOGO</text>
				</view>
				<view class="logo-size flex align-center justify-center position-relative" v-if="speechTitle.isShowLogo == 1">
					<image :src="speechTitle.logoUrl" class="logo-size" @click="clickImageView"></image>
					<text @click="changeLogo"  class="item-right-top-text position-absolute" style="background-color: #666;color: #fff; border-radius: 50px;margin: 0 auto;">更改</text>
				</view>
			</view>
			<view style="margin-top: 30%;" class="align-center justify-center" >
				<free-list-item :border="false" :title="''" style="height: 130px;" :bgColor="'#343A7D'" :showRight="false" @click="showInput">
					<view style="width: 100%;" class="mr-5">
						<view style="" class="flex align-center justify-center">
							<text class="text-dark font-weight-bold" style="color: #fff;font-size: 25px;">{{speechTitle.title==''?'单击此处编辑标题':speechTitle.title}}</text>
						</view>
						<text class="text-light-muted font-small mt-2" style="color: #fff;float: right;">{{speechTitle.subtitle==''?'单击此处编辑副标题':speechTitle.subtitle}}</text>
					</view>
				</free-list-item>
			</view>
			<view v-if="showBottom" style="margin-top: 30%;" class="flex position-relative ml-5 mr-5 pl-5 pr-5 pt-3 pb-3">
				<view>
					<view @click="showInput">
						<text class="" style="color: #fff;">{{speechTitle.speechmaker==''?'单击此处编辑分享人':'分享人 : '+speechTitle.speechmaker}}</text>
					</view>
					<view class="bottom-text-width" @click="showInput">
						<text class="" style="color: #fff;float: left;">{{speechTitle.speechDate==''?'单击此处编辑分享日期':'日期 : '+speechTitle.speechDate}}</text>
						<text  style="color: #fff;float: right;">{{speechTitle.speechTime==''?'单击此处编辑分享时间':'时间 : '+speechTitle.speechTime}}</text>
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
					<uni-nav-bar :fixed="false" :border="false" backgroundColor="#58B7E9" left-icon="arrowleft" color="#fff" left-text="返回" :title="'编辑标题'" @clickLeft="back" background-color="#FFFFFF" >
					</uni-nav-bar>
				</view>
				<view class="uni-common-mt">
					<form >
						<view class="border-bottom pl-2 pb-2">
							<view class="title pb-1" style="color: #C9C9C9;">标题</view>
							<input placeholder="请输入标题" v-model="speechTitle.title"  name="speechTitle.title" ></input>
						</view>
						<view class="border-bottom pl-2 pb-2">
							<view class="title pb-1" style="color: #C9C9C9;">副标题</view>
							<input placeholder="请输入副标题"  v-model="speechTitle.subtitle" name="speechTitle.subtitle"></input>
						</view>
						<view class="cu-form-group border-bottom ">
							<view class="title pb-1">演讲时长(分钟)</view>
							<uniNumberBox :value="speechTitle.speechDuration"  style="float: right;" @change="changeTotalTime"/>
						</view>
						<!-- <view class="cu-form-group border-bottom">
							<view class="title">是否邀请嘉宾</view>
							<view>
								<radio-group class="uni-input"  @change="changeInvite">
									<label v-for="(item,index) in radioItem" :key="index" class="">
										<radio :value="item.value" /><text>{{item.text}}</text> 
									</label>
								</radio-group>
							</view>
						</view> -->
						<view style="position: fixed;bottom: 0rpx; width: 100%;">
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
	var  graceChecker = require("@/common/graceChecker.js");
	import freeNavBar from "@/components/free-ui/free-nav-bar.vue"
	import uniNavBar from '@/components/uni/uni-nav-bar/uni-nav-bar.vue'
	import uniDrawer from '@/components/uni/uni-drawer/uni-drawer.vue'
	import freeListItem from "@/components/free-ui/free-list-item.vue"
	import contactsIndexs from "@/components/fuled/fuled-contacts-indexs.vue"
	import uniNumberBox from '@/components/uni/uni-number-box/uni-number-box.vue'
	export default {
		components: {
			freeListItem,uniDrawer,freeNavBar,uniNavBar,"contacts-indexs":contactsIndexs,uniNumberBox
		},
		props: {
			// 是否开启下边线
			border:{
				type:Boolean,
				default:true
			},
			isShowLogo: {
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
						id:'',showTitle:'标题',type:'1',
						dicChapterType:1,dicStyle:1,dicFormat:1,
						dicswitch:1,chapterNo:1,title:'',
						subtitle:'',speechDuration:'',isGuests:'',
						fkGuestsUserId:'',isShowLogo: 0,
						logoUrl:'/static/logo.png',detail:{}
					}
				}
			}
		},
		
		data() {
			return {
				showLeft:false,
				showRightDrawer:false,
				radioItem:[{value:'1',text:'是'},{value:'0',text:'否'}],
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
				if(this.speechTitle.isShowLogo == 1){
					this.speechTitle.isShowLogo = 0
				}else{
					this.speechTitle.isShowLogo = 1
				}
				this.$emit('saveTitleMsg',this.speechTitle)
			},
			changeLogo(){
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						var imageSrc = res.tempFilePaths[0] ;
						uni.uploadFile({
							url: this.$c.baseUrl+this.$urls.upload,
							filePath: imageSrc,
							name: 'file',
							formData: {
								'pathType': 0
							},
							success: (res) => {
								var result = JSON.parse(res.data) ;
								if(result.code == 1){
									uni.hideLoading()
									uni.showToast({
										title: '图片上传成功',
										icon: 'success',
										duration: 1000
									});
									this.speechTitle.logoUrl = result.data.downloadUrl
									this.$emit('changeLogo',this.speechTitle)
								}else{
									uni.hideLoading()
									uni.showToast({
										title: '图片上传失败',
										icon: 'fail',
										duration: 1000
									})
								}
							},
							fail: (err) => {
								console.log('头像上传失败', err);
								uni.showModal({
									content: err.errMsg,
									showCancel: false
								});
							}
						});
					}
				});
			},
			changeInvite(e){
				this.speechTitle.isGuests=e.detail.value
			},
			showInput(){
				this.showLeft = true;
			},
			back(){
				this.showLeft = false;
			},
			hide(){
				//定义表单规则
				var rule = [
				    {name:"title", checkType : "string", checkRule:"1,15",  errorMsg:"标题应为1-15个字符"},
				    {name:"subtitle", checkType : "notnull", checkRule:"",  errorMsg:"副标题不能为空"}
				];
				//进行表单检查
				//console.log('进行表单检查，携带数据为：' + JSON.stringify(this.speechTitle))
				var checkRes = graceChecker.check(this.speechTitle, rule);
				if(!checkRes){
					uni.showToast({ title: graceChecker.error+",若不需要编辑数据,请返回", icon: "none" });
				}else{
					this.$emit('saveTitleMsg',this.speechTitle)
					this.showLeft = false;
				}
			},
			changeTotalTime(value){
				this.speechTitle.speechDuration=value
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
