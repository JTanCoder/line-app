<template>
	<view class="page">
		<cu-custom bgColor="bg-fuled" :isBack="true" v-on:onBackClick="$util.onBack">
			<block slot="backText">返回</block>
			<block slot="content">{{form.title}}信息</block>
		</cu-custom>
		
		<view class="cu-form-group align-start margin-top" >
			<view class="title">描述</view>
			<textarea maxlength="-1"  @input="textareaBInput" v-model="form.remark" :placeholder="'请输入'+form.title+'描述'"></textarea>
		</view>
		<view class="cu-form-group" >
			<view class="action">附件</view>
			<view class="action">{{form.fileList.length}}/9</view>
		</view>
		<view class="form-image-item" >
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in form.fileList" :key="index" @tap="ViewImage" :data-url="form.fileList[index]">
				 <image :src="form.fileList.length>0 ? form.fileList[index]:'/static/fuled/tupian.png'" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="form.fileList.length < 9">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
		
		<view class="main-bg-color rounded p-3 flex align-center justify-center flex-1 margin-top" hover-class="main-bg-hover-color" @click="doSave">
			<text class="text-white font-md">提 交</text>
		</view>
	</view>
</template>

<script>
	import $time from '../../../common/free-lib/time.js'
	const db = uniCloud.database();
	export default {
		data() {
			return {
				form: {
					remark:'',
					fileList:[],
					title:'',
					time:'',
					issubmit:0,
				}
			}
		},
		onShow(){
			
		},
		onLoad(e) {
			let that = this ;
			if(!e.data){
				return;
			}
			this.form =  JSON.parse(e.data) ;
		},
		methods: {
			ChooseImage() {
				new Promise((resolve, reject) => {
					uni.chooseImage({
						count: 1, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['camera','album'], //从相册选择
						success: (res) => {
							var imageSrc = res.tempFilePaths[0] ;
							uni.getImageInfo({
								src: imageSrc,
								success(info) {
									const options = {
										filePath: imageSrc,
										cloudPath: Date.now() + '.' + info.type.toLowerCase()
									}
									resolve(options)
								},
								fail(err) {
									reject(new Error(err.errMsg || '未能获取图片类型'))
								}
							})
						}
					});
					
				}).then((options) => {
					uni.showLoading({
						title: '文件上传中...'
					})
					return uniCloud.uploadFile({
						...options,
						onUploadProgress(e) {
							console.log(e)
						}
					})
				}).then(res => {
					uni.hideLoading()
					console.log(res.fileID);
					if (this.form.fileList.length != 0) {
						this.form.fileList.push(res.fileID)
					} else {
						this.form.fileList.push(res.fileID)
					}
					
					// uni.showModal({
					// 	content: '图片上传成功，fileId为：' + res.fileID,
					// 	showCancel: false
					// })
				}).catch((err) => {
					uni.hideLoading()
					console.log(err);
					if (err.message !== 'Fail_Cancel') {
						uni.showModal({
							content: `图片上传失败，错误信息为：${err.message}`,
							showCancel: false
						})
					}
				})
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.form.fileList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '温馨提示',
					content: '确定要删除这张图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.form.fileList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			textareaBInput(e) {
				this.form.remark = e.detail.value ;
			},
			async doSave() {
				if(this.form.remark === ''){
					uni.showToast({
						icon:'none',
						title:'请输入描述'
					})
					return ;
				}
				if(this.form.fileList.length <= 0){
					uni.showToast({
						icon:'none',
						title:'请上传您的附件'
					})
					return ;
				}
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				this.form.time = $time.getFormatDate();
				this.form.issubmit = 1 ;
				prevPage.$vm.setData2ProInfo(this.form)
				uni.navigateBack({//返回
					delta: 1
				});
			}
		}
	}
</script>

<style>
	@import "@/common/free.css";
	@import "@/common/common.css";
	@import "@/common/free-icon.css";
	.form-image-item{
		background-color: #ffffff;
		padding: 1upx 30upx;
		display: flex;
		align-items: center;
		min-height: 100upx;
		justify-content: space-between;
	}
</style>
