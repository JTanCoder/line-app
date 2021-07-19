<template>
	<view class="page">
		<cu-custom bgColor="bg-fuled" :isBack="true" v-on:onBackClick="$util.onBack">
			<block slot="backText">返回</block>
			<block slot="content">新增专线项目</block>
		</cu-custom>
		<view class="cu-form-group margin-top">
			<view class="title">客户电话</view>
			<m-input placeholder="请输入客户电话" v-model="form.clientPhone" name="clientPhone" ></m-input>
		</view>
		<view class="cu-form-group">
			<view class="title">专线名称</view>
			<m-input placeholder="请输入专线名称" v-model="form.clientName" name="clientName"></m-input>
		</view>
		<view class="cu-form-group">
			<view class="title">客户地址</view>
			<m-input placeholder="请输入客户地址" v-model="form.clientAddr" name="clientAddr"></m-input>
		</view>
		<view class="cu-form-group">
			<view class="title">客服经理电话</view>
			<m-input placeholder="请输入客服经理电话" v-model="form.servicePhone" name="servicePhone"></m-input>
		</view>
		<view class="cu-form-group">
			<view class="title">预计完工时间</view>
			<picker mode="date" :value="form.endDate" start="2021-01-01" end="2099-01-01" @change="DateChange">
				<view class="picker">
					{{form.endDate}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">选择项目所属区域</view>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					{{index>-1?picker[index]:'超出部分以 ... 显示'}}
				</view>
			</picker>
		</view>
		<!-- 
		<view class="cu-form-group">
			<view class="action">合同附件</view>
			<view class="action">{{form.contractList.length}}/1</view>
		</view>
		<view class="form-image-item" >
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in form.contractList" :key="index" @tap="ViewImage" :data-url="form.contractList[index]">
				 <image :src="form.contractList.length>0 ? form.contractList[index]:'/static/fuled/tupian.png'" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="form.contractList.length<1">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
		 -->
		<view class="main-bg-color rounded p-3 flex align-center justify-center flex-1" hover-class="main-bg-hover-color" @click="doSave">
			<text class="text-white font-md">提 交</text>
		</view>
	</view>
</template>

<script>
	import mInput from '../../../components/m-input.vue'
	import freeDivider from "@/components/free-ui/free-divider.vue"
	const db = uniCloud.database();
	export default {
		components: {
			mInput,
			freeDivider,
		},
		data() {
			return {
				form: {
					clientPhone:'',
					clientName: '',
					clientAddr: '',
					servicePhone:'',
					endDate:this.$time.getFormatDate(),
					areaId:'',
					contractList: [],
					creator:this.$store.state.user.user.loginName,
					implementId:'',
					archive:false,
					okDate:"",
					status:0,//0:新建-->合同签订 -->1:合同签订-->设计院勘察 2:设计院勘察-->方案审批 3:方案审批 -->分配施工队 4 施工中 --> 施工完成  5：完成，
					appraisalInfo: {
						"remark": "",
						"level": "",
						"issubmit":0
					},
					complaintInfo:  {
						"remark": "",
						"issubmit": 0
					},
					constrInfo: [],
					proInfo: {
						"contractInfo": {
							"remark": "",
							"fileList": [],
							"title": "施工组网情况",
							"time": "",
							"issubmit": 0
						},
						"teamInfo": {
							"remark": "",
							"title": "分配施工队",
							"time": "",
							"implementId": "",
							"issubmit": 0
						},
						"conformInfo": {
							"remark": "",
							"fileList": [],
							"title": "项目确认信息",
							"time": "",
							"issubmit": 0
						}
					}
				},
				index:-1,
				picker: [],
				pickerData: [],
				radioItem:[{value:'1',text:'项目经理'},{value:'2',text:'施工队'}],
				prePage:false,
				user:{},
			}
		},
		onShow(){
			this.user = JSON.parse(this.$util.getStorage("user"));
			console.log(this.user)
			this.getUserType2();
		},
		onLoad(e) {
			let that = this ;
			if(!e.data){
				return;
			}
			this.form =  JSON.parse(e.data) ;
			//console.log(this.form)
			
		},
		methods: {
			DateChange(e) {
				this.form.endDate = e.detail.value
			},
			getUserType2(){
				let that = this ;
				db.collection("line-app-conpany").where({userId:this.user._id}).get()
				.then(res => {
					that.picker = [];
					that.pickerData= [];
					res.result.data[0].areaList.map((item)=>{
						that.picker.push(item.areaName);
						that.pickerData.push(item);
					});
					if(that.form.areaId){
						that.setPickerIndex();
					}
				}).catch(err => {
					console.error(err)
				}).finally(() => {
					uni.hideLoading()
				});
			},
			setPickerIndex(){
				this.pickerData.map((item,i)=>{
					if(this.form.areaId == item._id){
						this.index = i ;
					}
				})
			},
			PickerChange(e) {
				this.index = e.detail.value
				this.form.areaId = this.pickerData[this.index]._id
			},
			changeInvite(e){
				this.form.userType = e.detail.value
			},
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
					if (this.form.contractList.length != 0) {
						this.form.contractList.push(res.fileID)
					} else {
						this.form.contractList.push(res.fileID)
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
					urls: this.form.contractList,
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
							this.form.contractList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			async doSave() {
				if (this.form.clientPhone == '') {
					uni.showToast({
						icon: 'none',
						title: '客户电话不能为空'
					});
					return;
				}
				if (this.form.clientName == '') {
					uni.showToast({
						icon: 'none',
						title: '专线名称不能为空'
					});
					return;
				}
				if (this.form.servicePhone == '') {
					uni.showToast({
						icon: 'none',
						title: '客服经理电话不能为空'
					});
					return;
				}
				if (this.form.endDate == '') {
					uni.showToast({
						icon: 'none',
						title: '项目预估完成时间不能为空'
					});
					return;
				}
				if (this.form.areaId == '') {
					uni.showToast({
						icon: 'none',
						title: '项目所属区域不能为空'
					});
					return;
				}
				uni.showLoading({
					title: '处理中...'
				})
				if(this.form._id){
					let newObj = JSON.parse(JSON.stringify(this.form));
					this.$delete(newObj,'_id');
					this.$delete(newObj,'sgList');
					this.$delete(newObj,'jlList');
					db.collection('line-app-pro').doc(this.form._id).update(newObj).then(res=>{
						uni.hideLoading();
						uni.switchTab({
							url:"../../index/index"
						})
					}).catch(err => {
						console.error(err)
					})
					.finally(() => {
						uni.hideLoading()
					})
				}else{
					db.collection('line-app-pro').add(this.form).then(res=>{
						uni.hideLoading();
						uni.switchTab({
							url:"../../index/index"
						})
					}).catch(err => {
						console.error(err)
					})
					.finally(() => {
						uni.hideLoading()
					})
				}
				
			},
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
