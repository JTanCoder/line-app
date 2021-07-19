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
		
		<view class="cu-form-group" v-if="domType =='2'">
			<view class="title">评价等级</view>
			<view>
				<radio-group class="uni-input"   @change="changeInvite">
					<label v-for="(item,index) in radioItem" :key="index" class="">
						<radio :value="item.value" :disabled="(user.userType =='-1' && dataInfo.appraisalInfo.issubmit==0 && dataInfo.status==4)?false:true" :checked="getcheck(item)" /><text>{{item.text}}</text> 
					</label>
				</radio-group>
			</view>
		</view>
		<view class="cu-form-group align-start" v-if="domType =='2' && dataInfo.appraisalInfo.issubmit == 0">
			<view class="title">评价描述</view>
			<textarea maxlength="-1"   @input="textareaBInput1" v-model="dataInfo.appraisalInfo.remark" placeholder="未填写"></textarea>
		</view>
		<view  class="cu-form-group align-start" v-if="domType =='2' && dataInfo.appraisalInfo.issubmit == 1">
			<view class="pl-2" >{{dataInfo.appraisalInfo.remark}}</view>
		</view> 
		
		<view class="cu-form-group" v-if="showPhone &&  domType =='4' && dataInfo.status != '4' ">
			<view class="title">项目经理电话</view>
			<input v-model="dataInfo.jlList[0].userPhone" name="input" @click="toCallPhone(dataInfo.jlList[0].userPhone)"></input>
			<text class='cuIcon-phone text-green' @click="toCallPhone(dataInfo.jlList[0].userPhone)"></text>
		</view>
		<view class="cu-form-group" v-if="showPhone &&  domType =='4' && dataInfo.status != '4' && dataInfo.sgList.length > 0">
			<view class="title">施工队电话</view>
			<input v-model="dataInfo.sgList[0].userPhone" name="input" @click="toCallPhone(dataInfo.sgList[0].userPhone)"></input>
			<text class='cuIcon-phone text-green' @click="toCallPhone(dataInfo.sgList[0].userPhone)"></text>
		</view>
		<view class="cu-form-group" v-if="showPhone && domType =='4' && dataInfo.status == '4' ">
			<view class="title">客服经理电话</view>
			<input v-model="dataInfo.servicePhone" name="input" @click="toCallPhone(dataInfo.servicePhone)"></input>
			<text class='cuIcon-phone text-green' @click="toCallPhone(dataInfo.servicePhone)"></text>
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
				console.log(this.dataInfo)
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
				if(this.domType == '3'){
					this.showPhone = true ;
				}
				this.$emit("onDefClick",this.dataInfo);
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
					urls: this.dataInfo.constrInfo.fileList,
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
