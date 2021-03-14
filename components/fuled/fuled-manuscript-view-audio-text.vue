<template>
	<view>
		<form >
			<view class="border-bottom">
				<view class="title pb-1" style="color: #333333;text-align: center;background-color: #E4E4E4;">
					<text>= {{title}} =</text><text style="float: right;" class="pr-1" @click="saveContent">保存</text>
				</view>
				<view class="cu-form-group" style="height: 455rpx;">
					<textarea maxlength="-1" style="height: 455rpx;" v-model="contentMsg.text" placeholder="请输入目录正文内容"></textarea>
				</view>
			</view>
			<view class="border-bottom">
				<view class="title pb-1" style="color: #333333;text-align: center;background-color: #E4E4E4;">= 语音列表 =</view>
				<view class="cu-list menu" style="background-color: #F2F2F2;">
					<view class="cu-item border-bottom" v-for="(item,index) in records2" :key="item.detailNo">
						<view class="content">
							<text class="cuIcon-notification  margin-right-xs"></text>
							<text class="text-grey">{{item.mediaDuration}}"</text>
							<text class="text-black ml-1" @click="toDditRemark(index)">{{item.remark}}</text>
						</view>
						<view class="action">
							<view class="cu-tag round  text-grey" @click="moveItem(item,1,index)">上移</view>
							<view class="cu-tag round  text-grey" @click="moveItem(item,-1,index)">下移</view>
							<view class="cu-tag round bg-blue light" @click="playItem(item,index)">{{isPlayAudio ? '暂停':'播放'}}</view>
							<view class="cu-tag round bg-orange light" @click="delItem(item,index)">删除</view>
						</view>
					</view>
				</view>
				<view class="alertBox" v-if="isEditRemark">
					<view class="alertTitle">修改录音备注</view>
					<view class="inputBox">
						<input type="text" @input='nameInput' :value="editRemark" placeholder="请输入您要修改的备注" />
					</view>
					<view class="btn-box">
						<view class="trueBtn falseBtn" @tap="falseBtnClick">取消</view>
						<view class="trueBtn" @tap="trueBtnClick">确定</view>
					</view>
					
				</view>
				<!-- <view class="mt-2">
					<button style="background-color: #58B7E9;border-radius: 0;color: #fff;" @click="">录音</button>
				</view> -->
				<!-- <view class="rounded flex align-center justify-center" style="height: 80rpx;" :class="isRecording?'bg-hover-light':'bg-white'" @touchstart="voiceTouchStart" @touchend="voiceTouchEnd" @touchcancel="voiceTouchCancel" @touchmove="voiceTouchMove">
					<text class="font">{{isRecording ? '松开 结束':'按住 说话'}}</text>
				</view> -->
			</view>
			
			<view style="position: fixed;bottom: 0rpx; width: 100%;" @touchstart="voiceTouchStart" >
				<button style="background-color: #58B7E9;border-radius: 0;color: #FFFFFF;" >
					<text class="font align-center justify-center" style="text-align: center;" >{{isRecording ? '结束录音':'开始录音'}}</text>
				</button>
			</view>
		</form>
	</view>
</template>

<script>
	import { mapState,mapMutations,mapActions } from 'vuex'
	export default {
		props: {
			// 标题
			title:{
				type:String,
				default:""
			},
			contentMsg:{
				type:Object,
				default:function() {
					return {text:''}
				}
			},
			records:{
				type:Array,
				default:function() {
					return []
				}
			},
			currItem:{
				type:Object,
				default:function() {
					return {}
				}
			},
		},
		
		data() {
			return {
				innerAudioContext:null,
				audioPlaying:false,
				// 音频录制状态
				isRecording:false,
				RecordingStartY:0,
				// 取消录音
				unRecord:false,
				currContentMsg:'',
				isPlayAudio:false,
				isEditRemark:false,
				editRemark:'',
				editIndex:0,
				state:false,
				records2:[
				]
			}
		},
		mounted() {
			// 注册发送音频事件
			this.regSendVoiceEvent((url)=>{
				if (!this.unRecord) {
					this.send('audio',url,{
						time:this.RecordTime
					})
				}
			}),
			this.audioOn(this.onPlayAudio)
		},
		computed: {
			...mapActions(['audioOn','audioEmit','audioOff']),
			...mapState({
				RECORD:state=>state.audio.RECORD,
				RecordTime:state=>state.audio.RecordTime,
				chat:state=>state.user.chat,
			}),
		},
		// 组件销毁
		destroyed() {
			this.audioOff(this.onPlayAudio)
			// 销毁音频
			if (this.innerAudioContext) {
				this.innerAudioContext.destroy()
				this.innerAudioContext = null
			}
		},
		methods: {
			...mapMutations(['regSendVoiceEvent']),
			saveContent(){
				this.$emit('saveContent',{})
			},
			moveItem(item,step,index){
				console.log(index+"   =====  "+step)
				if(index == 0 && step > 0){
					uni.showToast({
						title:"已经是第一项了"
					})
					return ;
				}
				if(index == this.records.length - 1 && step < 0){
					uni.showToast({
						title:"已是最后一项了"
					})
					return ;
				}
				if(step > 0){//上移,当前减一,上一个加一
					this.records[index].detailNo = this.records[index].detailNo - 1
					this.records[index-1].detailNo = this.records[index-1].detailNo + 1
				}
				if(step < 0){//下移,当前加一,下一个减一
					this.records[index].detailNo = this.records[index].detailNo + 1
					this.records[index+1].detailNo = this.records[index+1].detailNo - 1
				}
				
				this.$util.sortBykey(this.records,"detailNo")
			},
			// 监听播放音频全局事件
			onPlayAudio(index){
				if (this.innerAudioContext) {
					//if (this.index !== index) {
						this.innerAudioContext.pause()
					//}
				}
			},
			toDditRemark(index){
				this.isEditRemark = !this.isEditRemark
				this.editRemark = this.records[index].remark
				this.editIndex = index;
			},
			falseBtnClick(){
				this.isEditRemark = !this.isEditRemark
			},
			trueBtnClick(){
				this.isEditRemark = !this.isEditRemark
				this.records[this.editIndex].remark = this.editRemark
			},
			/* 获取昵称 */
			nameInput: function(event) {
				this.editRemark = event.detail.value;
			},
			playItem(item,index){
				console.log(item)
				console.log(index)
				this.isPlayAudio = !this.isPlayAudio
				// 通知停止其他音频
				//this.audioEmit(index)
				if (!this.innerAudioContext) {
					this.innerAudioContext = uni.createInnerAudioContext();
					this.innerAudioContext.src = item.mediaUrl
					this.innerAudioContext.play()
					// 监听播放
					this.innerAudioContext.onPlay(()=>{
						this.audioPlaying = true
					})
					// 监听暂停
					this.innerAudioContext.onPause(()=>{
						this.audioPlaying = false
					})
					// 监听停止
					this.innerAudioContext.onStop(()=>{
						this.audioPlaying = false
					})
					// 监听错误
					this.innerAudioContext.onError(()=>{
						this.audioPlaying = false
					})
				} else {
					this.innerAudioContext.stop()
					this.innerAudioContext.play()
				}
			},
			delItem(item,index){
				this.$delete(this.records,index)
			},
			// 录音相关
			// 录音开始
			voiceTouchStart(e){ 
				console.log(e)
				// 初始化
				this.isRecording = !this.isRecording
				if(this.isRecording){
					this.RecordingStartY = e.changedTouches[0].screenY
					this.unRecord = false
					// 开始录音
					this.RECORD.start({
						format:"mp3"
					})
				}else{
					// 停止录音
					this.voiceTouchEnd()
				}
				
			},
			// 录音结束
			voiceTouchEnd(){
				this.isRecording = false
				// 停止录音
				this.RECORD.stop()
			},
			// 录音被打断
			voiceTouchCancel(){
				this.isRecording = false
				this.unRecord = true
				// 停止录音
				this.RECORD.stop()
			},
			voiceTouchMove(e){
				let Y = Math.abs(e.changedTouches[0].screenY - this.RecordingStartY)
				this.unRecord = (Y >= 50)
			},
			// 发送
			send(type, data = '',options = {}){
				// 组织数据格式
				console.log("type="+type);
				console.log("data="+data);
				console.log("options="+options);
				uni.uploadFile({
					url: this.$c.baseUrl+this.$urls.upload,
					filePath: data,
					name: 'file',
					formData: {
						'pathType': 0
					},
					success: (res) => {
						var result = JSON.parse(res.data) ;
						if(result.code == 1){
							uni.hideLoading()
							uni.showToast({
								title: '录音上传成功',
								icon: 'success',
								duration: 1000
							});
							let media = {
									mediaId:'',fkChapterId:this.currItem.fkChapterId,detailNo:this.records.length+1,
									dicMediaType:1,mediaDuration:this.RecordTime,mediaUrl:result.data.downloadUrl,remark:'录音文件'+this.records.length+1
								}
							this.records2.push(media)
							this.state = !this.state
							this.$emit('addMedia',media)
						}else{
							uni.hideLoading()
							uni.showToast({
								title: '录音上传失败',
								icon: 'fail',
								duration: 1000
							})
						}
					},
					fail: (err) => {
						console.log('录音上传失败', err);
						uni.showModal({
							content: err.errMsg,
							showCancel: false
						});
					}
				});
				
				// 渲染到页面
				//let index = this.list.length
				//this.list.push(message)
				// 监听上传进度
				/* let onProgress = false
				if(message.type !== 'text' && message.type !== 'emoticon' && message.type !== 'card' && !message.data.startsWith('http')){
					onProgress = (progress)=>{
						// console.log('上传进度：',progress);
					}
				}
				// 发送到服务端
				this.chat.send(message,onProgress).then(res=>{
					// console.log(res);
					// 发送成功
					this.list[index].id = res.id
					this.list[index].sendStatus = 'success'
				}).catch(err=>{
					// 发送失败
					this.list[index].sendStatus = 'fail'
					// console.log(err);
				})
				// 发送文字成功，清空输入框
				if (type === 'text') {
					this.text = ''
				}
				// 置于底部
				this.pageToBottom() */
			},
		}
	}
</script>

<style lang="scss">
	.alertBox {
		position: fixed;
		top: 25%;
		width: 94%;
		left: 3%;
		background-color: #fff;
		border-radius: 10px;
		padding: 30px 0;
		box-sizing: border-box;
	}
	.alertTitle {
		width: 100%;
		background-color: #588BED;
		color: #fff;
		height: 35px;
		line-height: 35px;
		text-align: center;
		font-size: 15px;
	}
	.inputBox {
		width: 80%;
		margin: 8% auto;
		border-bottom: 1px solid #3CDBC1;
	}
	.inputBox input {
		padding: 5px 0;
	}
	.btn-box{
		display: flex;
	}
	.trueBtn {
		width: 30%;
		color: #fff;
		text-align: center;
		line-height: 40px;
		background-color: #02E3C1;
		border-radius: 25px;
		margin: 0 auto;
		font-size: 15px;
		/* display: inline-block; */
		/* margin: 0 30px; */
	}
	.falseBtn{
		background-color: #FFC107;
	}
</style>
