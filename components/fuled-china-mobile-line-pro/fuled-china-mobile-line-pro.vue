<template>
    <view>
        <view class="cu-bar bg-white margin-top" style="border-bottom: solid 1px #e1e1e1;">
        	<view class="action" :class="titleBold?'text-bold':''">
        		<text class="cuIcon-titles text-fuled"></text>{{title}}
        	</view>
			<view class="action">
                <view v-if="isDef" @tap="onDefClick" style="padding-right: 10px;">
                	<slot></slot>
                </view>
			</view>
        </view>
		<view>
			<view class="cu-timeline ">
				<view class="cu-time" v-if="dataInfo.proInfo.contractInfo.issubmit != 0">{{dataInfo.proInfo.contractInfo.title}}:{{dataInfo.proInfo.contractInfo.time}}</view>
				<view class="cu-item" v-if="dataInfo.proInfo.contractInfo.issubmit != 0">
					<view class="content bg-white">
						<view >{{dataInfo.proInfo.contractInfo.remark}}</view>
						<view class="cu-list menu-avatar radius margin-top">
							<view class="cu-item">
								<view class="grid col-4 grid-square flex-sub">
									<view class="bg-img" v-for="(item,index) in dataInfo.proInfo.contractInfo.fileList" :key="index" @tap="ViewImage" :data-list="dataInfo.proInfo.contractInfo.fileList" :data-url="dataInfo.proInfo.contractInfo.fileList[index]">
									 <image :src="dataInfo.proInfo.contractInfo.fileList.length>0 ? dataInfo.proInfo.contractInfo.fileList[index]:'/static/fuled/tupian.png'" mode="aspectFill"></image>
										<!-- <view class="cu-tag bg-red"   @tap.stop="DelImg" :data-index="index">
											<text class='cuIcon-close'></text>
										</view> -->
									</view>
									<!-- <view class="solids" @tap="ChooseImage"  >
										<text class='cuIcon-cameraadd'></text>
									</view> -->
								</view>
							</view> 
						</view>
					</view>
				</view>
				<view class="cu-time" v-if="dataInfo.proInfo.designInfo.issubmit != 0">{{dataInfo.proInfo.designInfo.title}}:{{dataInfo.proInfo.designInfo.time}}</view>
				<view class="cu-item" v-if="dataInfo.proInfo.designInfo.issubmit != 0">
					<view class="content bg-white">
						<view >{{dataInfo.proInfo.designInfo.remark}}</view>
						<view class="cu-list menu-avatar radius margin-top">
							<view class="cu-item">
								<view class="grid col-4 grid-square flex-sub">
									<view class="bg-img" v-for="(item,index) in dataInfo.proInfo.designInfo.fileList" :key="index" @tap="ViewImage" :data-list="dataInfo.proInfo.designInfo.fileList" :data-url="dataInfo.proInfo.designInfo.fileList[index]">
									 <image :src="dataInfo.proInfo.designInfo.fileList.length>0 ? dataInfo.proInfo.designInfo.fileList[index]:'/static/fuled/tupian.png'" mode="aspectFill"></image>
										<!-- <view class="cu-tag bg-red"   @tap.stop="DelImg" :data-index="index">
											<text class='cuIcon-close'></text>
										</view> -->
									</view>
									<!-- <view class="solids" @tap="ChooseImage"  >
										<text class='cuIcon-cameraadd'></text>
									</view> -->
								</view>
							</view> 
						</view>
					</view>
				</view>
				
				<view class="cu-time" v-if="dataInfo.proInfo.programlInfo.issubmit != 0">{{dataInfo.proInfo.programlInfo.title}}:{{dataInfo.proInfo.programlInfo.time}}</view>
				<view class="cu-item" v-if="dataInfo.proInfo.programlInfo.issubmit != 0">
					<view class="content bg-white">
						<view >{{dataInfo.proInfo.programlInfo.remark}}</view>
						<view class="cu-list menu-avatar radius margin-top">
							<view class="cu-item">
								<view class="grid col-4 grid-square flex-sub">
									<view class="bg-img" v-for="(item,index) in dataInfo.proInfo.programlInfo.fileList" :key="index" @tap="ViewImage" :data-list="dataInfo.proInfo.programlInfo.fileList" :data-url="dataInfo.proInfo.programlInfo.fileList[index]">
									 <image :src="dataInfo.proInfo.programlInfo.fileList.length>0 ? dataInfo.proInfo.programlInfo.fileList[index]:'/static/fuled/tupian.png'" mode="aspectFill"></image>
										<!-- <view class="cu-tag bg-red"   @tap.stop="DelImg" :data-index="index">
											<text class='cuIcon-close'></text>
										</view> -->
									</view>
									<!-- <view class="solids" @tap="ChooseImage"  >
										<text class='cuIcon-cameraadd'></text>
									</view> -->
								</view>
							</view> 
						</view>
					</view>
				</view>
				
				<view class="cu-time" v-if="dataInfo.proInfo.teamInfo.issubmit != 0">{{dataInfo.proInfo.teamInfo.title}}:{{dataInfo.proInfo.teamInfo.time}}</view>
				<view class="cu-item" v-if="dataInfo.proInfo.teamInfo.issubmit != 0">
					<view class="content bg-white">
						<view >{{dataInfo.proInfo.teamInfo.remark}}</view>
						<view class="cu-list radius margin-top">
							<view class="cu-item">
								<view class="content">
									<view class="text-grey">{{dataInfo.sgList[0].implementName}}</view>
									<view class="text-gray text-sm">
									<text class=""></text>负责人：{{dataInfo.sgList[0].userName}}</view>
									<text class=""></text>电话：{{dataInfo.sgList[0].userPhone}}</view>
									<text class=""></text>地址：{{dataInfo.sgList[0].implementAddr}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
    </view>
</template>

<script>
	const db = uniCloud.database();
	export default {
		data() {
			return {
                dataInfo:{},
				radioItem:[{value:'1',text:'优秀'},{value:'2',text:'良好'},{value:'3',text:'合格'},{value:'4',text:'不合格'}],
				showPhone:true,
				user:this.$store.state.user.user,
			};
		},
		name: 'fuled-user-card',
		watch:{
			info:function(newVal,oldVal){
				this.dataInfo = newVal;
				console.log(this.dataInfo.proInfo.programlInfo.issubmit)
			}
		},
		props: {
            title: {
                type: String,
                default: null
            },
			domType: {
			    type: String,
			    default: null
			},
			jlPhone: {
			    type: String,
			    default: null
			},
			sgPhone: {
			    type: String,
			    default: null
			},
			titleBold: {
				type: [Boolean, String],
				default: false
			},
            info: {
                
            },
			isDef: {
				type: [Boolean, String],
				default: true
			}
		},
		 
		methods: {
			getcheck(item){
				if(!this.dataInfo || !this.dataInfo.appraisalInfo || !this.dataInfo.appraisalInfo.level){
					return false ;
				}
				
				if(item.text == this.dataInfo.appraisalInfo.level){
					return true;
				}else{
					return false;
				}
			},
			changeInvite(e){
				//console.log(e.detail.value)
				this.dataInfo.appraisalInfo.level = this.radioItem[e.detail.value-1].text
			},
			onDefClick(){
				this.$emit("onDefClick");
			},
            filterBr(str){
                if (str != null && str != "" && str != undefined) {
                    str = str.toString().replace(/<br\/>/g, '\n');
                } else {
                    str = "";
                }
                return str;
            },
			ChooseImage() {
				new Promise((resolve, reject) => {
					uni.chooseImage({
						count: 5, //默认9
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
					console.log(res);
					if (this.dataInfo.constrInfo.fileList.length != 0) {
						this.dataInfo.constrInfo.fileList.push(res.fileID)
					} else {
						this.dataInfo.constrInfo.fileList.push(res.fileID)
					}
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
					urls: e.currentTarget.dataset.list,
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
							this.dataInfo.constrInfo.fileList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			textareaBInput0(e) {
				this.dataInfo.constrInfo.remark = e.detail.value
			},
			textareaBInput1(e) {
				this.dataInfo.appraisalInfo.remark = e.detail.value
			},
			textareaBInput2(e) {
				this.dataInfo.complaintInfo.remark = e.detail.value
			},
			toCallPhone(phone){
				console.log(phone);
				uni.makePhoneCall({
				    phoneNumber: phone 
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
