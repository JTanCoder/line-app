<template>
	<view style="background-color: #0056B3;height: 100%;">
		<view v-if="showLogo" class="ml-3 mr-5  logo-size"  >
			<view class="add-item-logo logo-size flex align-center justify-center" v-if="!isShowLogo">
				<text style="color: #fff;" @click="clickImageView">LOGO</text>
			</view>
			<view class="logo-size flex align-center justify-center position-relative" v-if="isShowLogo">
				<image :src="currTheme.logoUrl" class="logo-size" @click="clickImageView"></image>
			</view>
		</view>
		<view style="margin-top: 30%;" class="align-center justify-center" >
			<free-list-item :border="false" :title="''" style="height: 130px;" :bgColor="'#343A7D'" :showRight="false" @click="showInput">
				<view style="width: 100%;" class="mr-5">
					<view style="" class="flex align-center justify-center">
						<text class="text-dark font-weight-bold" style="color: #fff;font-size: 25px;">{{currTheme.title==''?'单击此处编辑标题':currTheme.title}}</text>
					</view>
					<text class="text-light-muted font-small mt-2" style="color: #fff;float: right;">{{currTheme.subtitle==''?'单击此处编辑副标题':currTheme.subtitle}}</text>
				</view>
			</free-list-item>
		</view>
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
			currTheme:{
				type:Object,
				default:function() {
					return {
						titleName:'',
						subTitleName:'',
						index:''
					}
				}
			}
		},
		
		data() {
			return {
				isShowLogo:false,
				showLeft:false,
			}
		},
		methods: {
			clickImageView(path){
				this.isShowLogo = !this.isShowLogo
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
									this.currTheme.logoUrl = result.data.downloadUrl
									this.$emit('changeLogo',this.currTheme)
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
			showInput(){
				this.showLeft = true;
			},
			hide(){
				this.showLeft = false;
			},
			saveThemeMsg(){
				this.$emit('saveThemeMsg',this.currTheme)
				this.showLeft = false;
			},
		}
	}
</script>

<style lang="scss">
	.logo-size{
		width: 105px;
		height: 45px;
	}
	
	.add-item-logo{
		border:1px dashed #fff;
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
	
</style>
