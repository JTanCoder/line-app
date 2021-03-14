<template>
	<view>
		<view style="background-color: #0056B3;">
			<view class=""  >
				<view class=" flex align-center justify-center position-relative" >
					<image src="/static/fuled/xuhao-1.png" class="logo-size" ></image>
					<view class="flex flex-column" style="width: 100%;">
						<view style="display: flex;  align-items: center;">
							<text class="text-dark font-md font-weight" style="color: #fff;" >{{currItem.title}}</text>
						</view>
						<text class="text-light-white font-sm font-weight" style="float: left;" >{{currItem.subtitle}}</text>
					</view>
				</view>
				<view style="width: 100%;" v-if="mode==1" class="flex justify-center align-center" >
					<text style="color: #fff;word-break:break-all;width: 80%;" class="">{{currItem.chapterThemes[0].text}}</text>
				</view>
				
				<view style="margin-top: 10%;" v-if="mode==2" class="align-center justify-center" >
					<manuscriptAddItem v-for="(item,index) in currItem.chapterThemes" :key="item.id" coverSize="90" :del="(index == currItem.chapterThemes.length-1 && currItem.chapterThemes.length>1)?true:false" @delClick="delCatalog"
						:cover="item.pic" :seq="'0'+Number(index+1)" :showRight="false"  :title="item.title" >
						<view class="flex flex-column" style="width: 100%;">
							<view style="display: flex;  align-items: center;">
								<text class="text-dark font-lg font-weight-bold" style="color: #fff;" @click="showInput(index)">{{item.theme}}</text>
								<view class="text-dark pr-5 mr-5" style="color: #fff;position: fixed;right: 25rpx;justify-content: center; align-items: center;">
									<!-- <image src="/static/fuled/add3.png" style="width: 30rpx;height: 30rpx;"></image> -->
									<text class="ml-1 item-contents-text" style="font-size: 10px;position: fixed" @click="showRightInput(index)">文录</text>
								</view>
							</view>
							<text class="text-light-muted font-sm cont_text2 text-color" style="float: left;" @click="showInput(index)">{{item.text}}</text>
						</view>
					</manuscriptAddItem>
				</view>
				<view class="uni-btn-v mt-2" v-if="mode==2 && currItem.chapterThemes.length < 4">
					<button style="background-color: #58B7E9;border-radius: 0;color: #fff;" @click="addCatalog">添加主题</button>
				</view>
				
				<view style="margin-top: 10%;text-align: center;" v-if="mode==3" class="align-center justify-center" >
					<image :src="currItem.chapterThemes[0].text" @click="showLeftDrawer"></image>
				</view>
				
				<uni-drawer :visible="showLeft" mode="left" >
					<view class="page"  >
						<!-- #ifdef APP-PLUS -->
							<!-- 导航栏 -->
							<free-nav-bar> </free-nav-bar>
						<!-- #endif -->
						<view class="uni-bar-body">
							<uni-nav-bar :fixed="false" :border="false" backgroundColor="#58B7E9" left-icon="arrowleft" color="#fff" left-text="返回" :title="'修改主题'" @clickLeft="hide" background-color="#FFFFFF" >
							</uni-nav-bar>
						</view>
						<view class="uni-common-mt">
							<form >
								<view class="border-bottom pl-2 pb-2" style="height: 420px;" v-if="mode==3">
									<view class="title pb-1" style="color: #C9C9C9;">图片</view>
									<view style="text-align: center;">
										<image src="/static/fuled/tupian.png" style="width: 70%;height: 380px;"></image>
									</view>
								</view>
								<view class="border-bottom pl-2 pb-2" v-if="mode==2">
									<view class="title pb-1" style="color: #C9C9C9;">主题</view>
									<input placeholder="请输入主题" v-model="catalog.titleName"  name="catalog.titleName" ></input>
								</view>
								<view class="border-bottom pl-2 pb-2" v-if="mode==2">
									<view class="title pb-1" style="color: #C9C9C9;">文本</view>
									<textarea maxlength="-1"  @input="textareaAInput" v-model="catalogs[catalogIndex].content.msg" placeholder="请输入文本内容"></textarea>
								</view>
								<view class="cu-form-group">
									<view class="title">动画效果</view>
									<input style="text-align: right;"  value="无" name="catalog.titleName" ></input>
									<uni-icons type="arrowright" @click="showPopupMenus"  class="text-light-muted font-md"/>
								</view>
								<view class="cu-form-group">
									<view class="title">动画时长(秒)</view>
									<uniNumberBox :value="1"  style="float: right;" @change="changeTotalTime"/>
								</view>
								<view class="cu-form-group border-bottom">
									<view class="title">入场次序</view>
									<view>
										<radio-group class=""  @change="changeInvite">
											<label v-for="(item,index) in radioItem" :key="index" class="">
												<radio :value="item.value" /><text>{{item.text}}</text> 
											</label>
										</radio-group>
									</view>
								</view>
								<view style="position: fixed;bottom: 0rpx; width: 100%;">
									<button style="background-color: #58B7E9;border-radius: 0;" @click="hide">确定</button>
								</view>
							</form>
							<uni-popup ref="showmenus" type="bottom" @change="popupChange">
								<manuscriptViewScrollX :items="items" :title="'选择动画效果'" @clickMenusItem="clickMenusItem"></manuscriptViewScrollX>
							</uni-popup>
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
							<uni-nav-bar :fixed="false" :border="false" backgroundColor="#58B7E9" left-icon="arrowleft" color="#fff" left-text="返回" :title="'编辑目录正文内容'" @clickLeft="hideRightDrawer" background-color="#FFFFFF" >
							</uni-nav-bar>
						</view>
						<view class="">
							<form >
								<view class="border-bottom">
									<view class="title pb-1" style="color: #333333;text-align: center;background-color: #E4E4E4;">= 逐字稿 =</view>
									<textarea maxlength="-1"  @input="textareaAInput" v-model="catalogs[catalogIndex].content.msg" placeholder="请输入文本内容"></textarea>
								</view>
								<view class="border-bottom">
									<view class="title pb-1" style="color: #333333;text-align: center;background-color: #E4E4E4;">= 语音列表 =</view>
									<view class="cu-list menu" style="background-color: #F2F2F2;">
										<view class="cu-item border-bottom" v-for="(item,index) in records">
											<view class="content">
												<text class="cuIcon-notification  margin-right-xs"></text>
												<text class="text-grey">{{item.value}}"</text>
												<text class="text-black ml-1">{{item.text}}</text>
											</view>
											<view class="action">
												<view class="cu-tag round  text-grey" @click="moveItem(item,1,index)">上移</view>
												<view class="cu-tag round  text-grey" @click="moveItem(item,-1,index)">下移</view>
												<view class="cu-tag round bg-blue light" @click="playItem(item,index)">播放</view>
												<view class="cu-tag round bg-orange light" @click="delItem(item,index)">删除</view>
											</view>
										</view>
									</view>
									<!-- <view class="mt-2">
										<button style="background-color: #58B7E9;border-radius: 0;color: #fff;" @click="">录音</button>
									</view> -->
									<view class="rounded flex align-center justify-center" style="height: 80rpx;" :class="isRecording?'bg-hover-light':'bg-white'" @touchstart="voiceTouchStart" @touchend="voiceTouchEnd" @touchcancel="voiceTouchCancel" @touchmove="voiceTouchMove">
										<text class="font">{{isRecording ? '松开 结束':'按住 说话'}}</text>
									</view>
								</view>
								
								<view style="position: fixed;bottom: 0rpx; width: 100%;">
									<button style="background-color: #58B7E9;border-radius: 0;" @click="hideRightDrawer">确定</button>
								</view>
							</form>
						</view>
					</view>
				</uni-drawer>
				
			</view>
		</view>
	</view>
</template>

<script>
	import freeNavBar from "@/components/free-ui/free-nav-bar.vue"
	import uniNavBar from '@/components/uni/uni-nav-bar/uni-nav-bar.vue'
	import uniDrawer from '@/components/uni/uni-drawer/uni-drawer.vue'
	import freeListItem from "@/components/free-ui/free-list-item.vue"
	import manuscriptAddItem from "@/components/fuled/fuled-manuscript-add-item.vue"
	import uniNumberBox from '@/components/uni/uni-number-box/uni-number-box.vue'
	import uniIcons from '@/components/uni/uni-icons/uni-icons.vue'
	import uniPopup from '@/components/uni/uni-popup/uni-popup.vue'
	import manuscriptViewScrollX from '@/components/fuled/fuled-manuscript-view-scroll-x.vue'
	import freeUploadImage from '@/components/free-ui/free-upload-image.vue'
	import { mapState,mapMutations,mapActions } from 'vuex'
	export default {
		components: {
			freeListItem,uniDrawer,freeNavBar,uniNavBar,manuscriptAddItem,uniNumberBox,uniIcons,uniPopup,manuscriptViewScrollX,freeUploadImage
		},
		props: {
			// 版式
			mode:{
				type:Number,
				default:1
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
				showLeft:false,
				showRightDrawer:false,
				catalog:{titleName:'',subTitleName:''},
				catalogIndex:0,
				// 音频录制状态
				isRecording:false,
				RecordingStartY:0,
				// 取消录音
				unRecord:false,
				catalogs:[
					{
						id:1,titleName:'单击此处编辑标题',pic:"/static/fuled/xuhao.png",isEdit:false,subTitleName:"单击此处编辑副标题",
						content:{type:1,msg:''}
					},
				],
				radioItem:[{value:'1',text:'与上一动画同时'},{value:'2',text:'上一动画之后'}],
				items:[
					{text:'无',type:'format',value:1},
					{text:'出现',type:'format',value:2},
					{text:'淡出',type:'format',value:3},
					{text:'飞入',type:'format',value:4},
					{text:'浮入',type:'format',value:4}
				],
				records:[
					{text:'测试录音1',seq:1,value:11,data:''},
					{text:'测试录音2',seq:2,value:21,data:''},
					{text:'测试录音3',seq:3,value:31,data:''},
					{text:'测试录音4',seq:4,value:41,data:''},
					{text:'测试录音5',seq:5,value:41,data:''}
				],
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
			showInput(index){
				this.catalogIndex = index 
				if(this.currItem.chapterThemes[index].isEdit){
					this.catalog.titleName=this.chapterThemes[index].theme
					this.catalog.subTitleName=this.chapterThemes[index].text
				}
				this.showLeft = true;
			},
			showLeftDrawer(){
				this.showLeft = true;
			},
			showRightInput(index){
				this.catalogIndex = index 
				this.showRightDrawer = true;
			},
			hide(){
				this.catalog.content = this.catalogs[this.catalogIndex].content
				this.catalog.type = "0"
				this.$emit('saveCatalogMsg',this.catalog,this.catalogIndex)
				this.showLeft = false;
				this.catalog={}
			},
			hideRightDrawer(){
				this.catalog = this.catalogs[this.catalogIndex]
				this.catalog.type = "1"
				this.$emit('saveCatalogMsg',this.catalog,this.catalogIndex)
				this.catalog={}
				this.showRightDrawer = false;
			},
			delCatalog(index){
				this.currItem.chapterThemes.pop()
			},
			textareaAInput(e) {
				this.catalogs[this.catalogIndex].content.msg=e.detail.value
			},
			addCatalog(){
				this.currItem.chapterThemes.push(
					{
						themeId:'',fkChapterId:this.currItem.chapterId,theme:'单击此处编辑标题',text:"单击此处编辑副标题",pic:"/static/fuled/xuhao.png",isEdit:false,
						dicAnimation:1,duration:1,sequence:1,detailNo:this.currItem.chapterThemes.length+1,content:{type:1,msg:'',chapterNo:0,themeId:''}
					}
				)
			},
			changeInvite(e){
				console.log(e)
				//this.form.isGuests=e.detail.value
			},
			changeTotalTime(value){
				//this.form.speechDuration=value
			},
			showPopupMenus(){
				this.$refs['showmenus'].open()
			},
			popupChange(e) {
				console.log('是否打开:' + e.show)
			},
			cancel(type) {
				this.$refs['show' + type].close()
			},
			clickMenusItem(title,item){
				this.cancel('menus')
				console.log(JSON.stringify(item))
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
						title:"已经是最后一项了"
					})
					return ;
				}
				if(step > 0){//上移,当前减一,上一个加一
					this.records[index].seq = this.records[index].seq - 1
					this.records[index-1].seq = this.records[index-1].seq + 1
				}
				if(step < 0){//下移,当前加一,下一个减一
					this.records[index].seq = this.records[index].seq + 1
					this.records[index+1].seq = this.records[index+1].seq - 1
				}
				
				this.$util.sortBykey(this.records,"seq")
			},
			// 监听播放音频全局事件
			onPlayAudio(index){
				if (this.innerAudioContext) {
					//if (this.index !== index) {
						this.innerAudioContext.pause()
					//}
				}
			},
			playItem(item,index){
				console.log(item)
				console.log(index)
				// 通知停止其他音频
				//this.audioEmit(index)
				if (!this.innerAudioContext) {
					this.innerAudioContext = uni.createInnerAudioContext();
					this.innerAudioContext.src = item.data
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
				this.isRecording = true
				this.RecordingStartY = e.changedTouches[0].screenY
				this.unRecord = false
				// 开始录音
				this.RECORD.start({
					format:"mp3"
				})
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
				this.records.push({text:'测试录音',seq:this.records.length+1,value:this.RecordTime,data:data})
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
	
	.logo-size{
		width: 68px;
		height: 78px;
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
