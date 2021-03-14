<template>
	<view style="background-color: #0056B3;height: 100%;">
		<view v-if="showLogo" class="ml-3 mr-5  logo-size"  >
			<view class="add-item-logo logo-size flex align-center justify-center" v-if="!isShowLogo">
				<text style="color: #fff;" @click="clickImageView">LOGO</text>
			</view>
			<view class="logo-size flex align-center justify-center position-relative" v-if="isShowLogo">
				<image :src="catalogs.logoUrl" class="logo-size" @click="clickImageView"></image>
			</view>
			
		</view>
		<view style="margin-top: 10%;" class="align-center justify-center" >
			<manuscriptAddItem v-for="(item,index) in catalogs.chapterThemes" :key="item.id" coverSize="90" :del="(index == catalogs.chapterThemes.length-1 && catalogs.chapterThemes.length>1)?true:false"  
				cover="/static/fuled/xuhao.png" :seq="'0'+Number(index+1)" :showRight="false"  :title="item.theme" >
				<view class="flex flex-column" style="width: 100%;">
					<view style="display: flex;  align-items: center;">
						<text class="text-dark font-lg font-weight-bold" style="color: #fff;" @click="showInput(index)">{{item.theme}}</text>
						<view class="text-dark pr-5 mr-5" style="color: #fff;position: fixed;right: 25rpx;justify-content: center; align-items: center;">
							<image src="/static/fuled/add3.png" style="width: 30rpx;height: 30rpx;"></image>
						</view>
					</view>
					<text class="text-light-muted font-sm cont_text2 text-color" style="float: left;" @click="showInput(index)">{{item.text}}</text>
				</view>
			</manuscriptAddItem>
		</view>
	</view>
</template>

<script>
	var  graceChecker = require("@/common/graceChecker.js")
	import $H from '@/common/free-lib/request.js';
	import freeNavBar from "@/components/free-ui/free-nav-bar.vue"
	import uniNavBar from '@/components/uni/uni-nav-bar/uni-nav-bar.vue'
	import uniDrawer from '@/components/uni/uni-drawer/uni-drawer.vue'
	import freeListItem from "@/components/free-ui/free-list-item.vue"
	import manuscriptAddItem from "@/components/fuled/fuled-manuscript-add-item.vue"
	import manuscriptAudioText from "@/components/fuled/fuled-manuscript-view-audio-text.vue"
	export default {
		components: {
			freeListItem,uniDrawer,freeNavBar,uniNavBar,manuscriptAddItem,manuscriptAudioText
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
			/* catalogs:{
				type:Array,
				default:function() {
					return []
				}
			}, */
			catalogs:{
				type:Object,
				default:function() {
					return {}
				}
			},
		},
		data() {
			return {
				isShowLogo:false,
				showLeft:false,
				showRightDrawer:false,
				catalog:{titleName:'',subTitleName:''},
				catalogContent:{},
				catalogIndex:0,
				currContentMsg:"",
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
									this.catalogs.logoUrl = result.data.downloadUrl
									this.$emit('changeLogo',this.catalogs)
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
			showInput(index){
				this.catalogIndex = index 
				if(this.catalogs.chapterThemes[index].themeId != ''){
					this.catalog.titleName=this.catalogs.chapterThemes[index].theme
					this.catalog.subTitleName=this.catalogs.chapterThemes[index].text
				}
				this.showLeft = true;
			},
			showRightInput(index){
				this.catalogIndex = index 
				console.log(this.catalogs.chapterThemes[index])
				if(this.catalogs.chapterThemes[index].themeId == null || this.catalogs.chapterThemes[index].themeId == ''){
					uni.showToast({
						title:'请先编辑目录',
						icon:'none'
					})
				}else{
					//根据当前演讲稿和章节序号查找该目录主题正文的章节
					$H.post(this.$urls.queryDraftChaptersContent,{draftId:this.catalogs.fkDraftId,chapterId:this.catalogs.chapterId,chapterNo:this.catalogs.chapterNo+this.catalogs.chapterThemes[index].detailNo+this.catalogs.chapterThemes[index].detailNo},{
						token:false
					}).then(res=>{
						// 登录
						if(res.code == -5000){
							uni.showModal({
								title: '未登录',
								content: '您未登录，需要登录后才能继续',
								showCancel: true,
								success: (res) => {
									if (res.confirm) {
										$U.toLoginPage(true)
									}
								}
							});
						}else if(res.code == 1){
							if(res.data != null && res.data.length > 0){
								this.catalogContent = res.data[0]
							}
							if(this.catalogContent.chapterThemes != undefined && this.catalogContent.chapterThemes != null && this.catalogContent.chapterThemes.length > 0){
								//console.log(this.catalogContent.chapterThemes[0])
								this.currContentMsg = this.catalogContent.chapterThemes[0].text
							}else{
								this.currContentMsg = '';
								this.catalogContent.chapterThemes=[]
							}
							if(this.catalogContent.chapterMedias == undefined || this.catalogContent.chapterMedias == null){
								this.catalogContent.chapterMedias=[]
							}
							this.showRightDrawer = true;
						}
					})
					
				}
			},
			addMedia(media){
				console.log(media)
				this.catalogContent.chapterMedias.push(media)
			},
			back(){
				this.showLeft = false;
				this.catalog={}
			},
			saveCatalogTheme(){
				//定义表单规则
				var rule = [
				    {name:"titleName", checkType : "string", checkRule:"1,15",  errorMsg:"标题应为1-15个字符"},
				    {name:"subTitleName", checkType : "notnull", checkRule:"",  errorMsg:"副标题不能为空"}
				];
				//进行表单检查
				//console.log('进行表单检查，携带数据为：' + JSON.stringify(this.speechTitle))
				var checkRes = graceChecker.check(this.catalog, rule);
				if(!checkRes){
					uni.showToast({ title: graceChecker.error+",若不需要编辑数据,请返回", icon: "none" });
				}else{
					this.catalogs.chapterThemes[this.catalogIndex].theme=this.catalog.titleName
					this.catalogs.chapterThemes[this.catalogIndex].text=this.catalog.subTitleName
					this.catalogs.chapterThemes[this.catalogIndex].type = "0"
					this.$emit('saveCatalogTheme',this.catalogs.chapterThemes[this.catalogIndex],this.catalogIndex)
					this.showLeft = false;
					this.catalog={}
				}
			},
			hideRightDrawer(){
				this.showRightDrawer = false;
			},
			saveCatalogContent(){
				if(this.currContentMsg == null || this.currContentMsg == ''){
					uni.showToast({ title: "正文内容不能为空,若不需要编辑请点返回", icon: "none" });
				}
				if(this.catalogContent.chapterThemes != undefined && this.catalogContent.chapterThemes != null && this.catalogContent.chapterThemes.length > 0){
					this.catalogContent.chapterThemes[0].text = this.currContentMsg
					this.catalogContent.chapterThemes[0].theme = '目录主题正文'
				}else{
					let chapterThemes = []
					chapterThemes.push(
						{
							themeId:'',fkChapterId:this.catalogContent.chapterId,theme:'目录主题正文',text:this.currContentMsg,
							dicAnimation:1,duration:1,sequence:1,detailNo:1
						}
					)
					this.catalogContent.chapterThemes = chapterThemes ;
				}
				this.$emit('saveCatalogContent',this.catalogContent)
				this.showRightDrawer = false;
			},
			delCatalog(index){
				this.$emit('delCatalog',index)
			},
			textareaAInput(e) {
				//this.catalogs[this.catalogIndex].content.msg = e.detail.value
			},
			
		}
	}
</script>

<style lang="scss">
	
	.logo-size{
		width: 105px;
		height: 45px;
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
	
	.add-item-logo{
		border:1px dashed #fff;
	}
	
</style>
