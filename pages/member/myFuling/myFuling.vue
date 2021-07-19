<template>
	<view class="page">
		<cu-custom bgColor="bg-fuled" :isBack="true" v-on:onBackClick="$util.onBack">
			<block slot="backText">返回</block>
			<block slot="content">我的项目</block>
		</cu-custom>
		<view class="pt-2">
			<uni-segmented-control :current="current" :values="items" style-type="text" :active-color="activeColor" @clickItem="onClickItem" />
		</view>
		<view >
			<view v-if="current === 0">
				<view class="cu-list menu-avatar">
					<view class="cu-item" :style="[{height:'250rpx'}]" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in listing" :key="index"
					 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd"  :data-target="'move-box-' + index">
						<view class="cu-avatar round lg" :style="[{backgroundImage:'url(/static/line-pro.png)'}]"></view>
						<view class="content" @click="toProDetail(item)">
							<view class="text-grey"><p class="text-cut-v2">专线名称:{{item.clientName}}</p></view>
							<view class="text-gray text-sm text-cut">
								<text class="cuIcon-infofill  margin-right-xs">客户地址:</text> {{item.clientAddr}}
							</view>
							<view class="text-gray text-sm">
								<text class="cuIcon-infofill  margin-right-xs">客户电话:</text> {{item.clientPhone}}
							</view>
							<!-- <view class="text-gray text-sm">
								<text class="cuIcon-infofill  margin-right-xs"></text> {{item.clientPhone}}
							</view> -->
						</view>
						<view class="action">
							<view class="text-grey text-xs">状态</view>
							<view class="cu-tag round bg-grey sm">{{getLineProStatus(item.status)}}</view>
						</view>
						<view v-if="user.userType=='2' && item.status == 0" class="move">
							<view class="bg-grey" @click="editLinePro(item)">编辑</view>
							<view class="bg-red" @click="delLinePro(item)">删除</view>
						</view>
						<view v-if="user.userType=='1' && item.status == 4" class="move">
							<view class="bg-grey" @click="archiveLinePro(item)">归档</view>
						</view>
					</view>
				</view>
				<!-- 上拉加载 -->
				<view class="flex align-center justify-center py-5 bg-light" v-if="listing.length >= 10">
					<text class="text-muted font">{{loadmore}}</text>
				</view>
			</view>
			<view v-if="current === 1">
				<view class="cu-list menu-avatar">
					<view class="cu-item" :style="[{height:'250rpx'}]" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in listover" :key="index"
					 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd"  :data-target="'move-box-' + index">
						<view class="cu-avatar round lg" :style="[{backgroundImage:'url(/static/line-pro.png)'}]"></view>
						<view class="content" @click="toProDetail(item)">
							<view class="text-grey"><p class="text-cut-v2">专线名称:{{item.clientName}}</p></view>
							<view class="text-gray text-sm text-cut">
								<text class="cuIcon-infofill  margin-right-xs">客户地址:</text> {{item.clientAddr}}
							</view>
							<view class="text-gray text-sm">
								<text class="cuIcon-infofill  margin-right-xs">客户电话:</text> {{item.clientPhone}}
							</view>
							<!-- <view class="text-gray text-sm">
								<text class="cuIcon-infofill  margin-right-xs"></text> {{item.clientPhone}}
							</view> -->
						</view>
						<view class="action">
							<view class="text-grey text-xs">状态</view>
							<view class="cu-tag round bg-grey sm">{{getLineProStatus(item.status)}}</view>
						</view>
						<!-- <view v-show="user.userType=='1' && item.status == 0" class="move">
							<view class="bg-grey">编辑</view>
							<view class="bg-red">删除</view>
						</view> -->
					</view>
				</view>
				<!-- 上拉加载 -->
				<view class="flex align-center justify-center py-5 bg-light" v-if="listover.length >= 10">
					<text class="text-muted font">{{loadmore}}</text>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import freeNavBar from "@/components/free-ui/free-nav-bar.vue"
	import freeDivider from "@/components/free-ui/free-divider.vue"
	import uniCard from '@/components/uni/uni-card/uni-card.vue'
	import uniList from '@/components/uni/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni/uni-list-item/uni-list-item.vue'
	import uniNavBar from '@/components/uni/uni-nav-bar/uni-nav-bar.vue'
	import uniIcons from '@/components/uni/uni-icons/uni-icons.vue'
	import uniSegmentedControl from '@/components/uni/uni-segmented-control/uni-segmented-control.vue'
	import manuscriptList from "@/components/fuled/fuled-member-manuscript-list.vue"
	import { mapState } from 'vuex'
	import $H from '@/common/free-lib/request.js';
	const db = uniCloud.database();
	export default {
		components: {
			freeDivider,
			uniCard,
			uniList,
			uniListItem,
			uniNavBar,
			uniIcons,
			uniSegmentedControl,
			freeNavBar,
			"manuscript-list":manuscriptList
		},
		data() {
			return {
				list:[],
				scrollTop:0,
				page:1,
				loadmore:"上拉加载更多",
				params:false,
				items: ['未完成', '已完成'],
				current: 0,
				colorIndex: 0,
				activeColor: '#64A8D1',
				listing:[],
				listover:[],
				listTouchStart: 0,
				listTouchDirection: null,
				modalName: null,
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
		},
		computed: {
			...mapState({
				user:state=>state.user.user
			}),
			nickname(){
				if(!this.params){
					return this.user.nickname || this.user.username
				}
				return this.params.name
			},
			avatar(){
				let avatar = ''
				avatar = !this.params ? this.user.avatar : this.params.avatar
				return avatar || '/static/images/userpic.png'
			}
		},
		onLoad(e) {
			this.page = 1
			this.getListingData();
			this.getListoverData();
		},
		onShow(e) {
			if(this.user.userType == '1'){
				this.items = ["未归档","已归档"];
			}else{
				this.items = ['未完成', '已完成'];
			}
			this.page = 1
			this.getListingData();
			this.getListoverData();
		},
		onPullDownRefresh() {
			this.page = 1
			this.getData().then(res=>{
				uni.showToast({
					title: '刷新成功',
					icon: 'none'
				});
				uni.stopPullDownRefresh()
			}).catch(err=>{
				uni.showToast({
					title: '刷新失败',
					icon: 'none'
				});
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			if(this.loadmore !== '上拉加载更多'){
				return
			}
			this.page += 1
			this.loadmore = '加载中...'
			this.getData().catch(err=>{
				this.page -= 1
				uni.showToast({
					title: '加载失败',
					icon: 'none'
				});
				this.loadmore = '上拉加载更多'
			})
		},
		methods: {
			momentNotice(){
				this.page = 1
				this.getData().then(res=>{
					uni.showToast({
						title: '刷新成功',
						icon: 'none'
					});
				})
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			toProDetail(item){
				uni.navigateTo({
					url:'../../cardLineDetail/cardLineDetail?data='+JSON.stringify(item)
				})
			},
			getLineProStatus(status){
				if(status == 0){
					return "新建-待组网" ;
				}
				if(status == 1){
					return "待分配施工队" ;
				}
				if(status == 2){
					return "施工中" ;
				}
				if(status == 3){
					return "待确认" ;
				}
				if(status == 4){
					return "项目结束" ;
				}
			},
			getListingData(){
				let _this = this;
				let condition = {};
				if(this.user.userType == '0'){
					 condition = {
					 	status:{$in:[0,1,2,3]},
					 }
				}else if(this.user.userType == '1'){
					condition = {
						archive:false,
						areaId:this.user.areaId,
						status:{$in:[4]},
					}
				}else if(this.user.userType == '2'){
					condition = {
						creator:this.user.loginName,
						status:{$in:[0,1,2,3]},
					}
				}else if(this.user.userType == '3'){
					condition = {
						implementId:this.user._id,
						status:{$in:[0,1,2,3]},
					}
				}
				const dbCmd = db.command
				var $ = db.command.aggregate
				let res = db.collection("line-app-pro").aggregate()
				.match(condition)
				.lookup({
				  from: 'line-app-user',
				  let: {
				    pro_creator: '$creator'
				  },
				  pipeline: $.pipeline()
				    .match(dbCmd.expr($.and([
						$.eq(['$loginName', '$$pro_creator']),
				    ])))
				    .done(),
				  as: 'jlList',
				})
				.lookup({
				  from: 'line-app-user',
				  let: {
				    pro_implementId: '$implementId'
				  },
				  pipeline: $.pipeline()
				    .match(dbCmd.expr($.and([
				      $.eq(['$_id', '$$pro_implementId'])
				    ])))
				    .done(),
				  as: 'sgList',
				})
				.end()
				.then(res => {
						_this.listing = res.result.data ;
					}).catch(err => {
						console.error(err)
					})
					.finally(() => {
						uni.hideLoading()
					})
			},
			getListoverData(){
				let _this = this;
				let condition = {};
				if(this.user.userType == '0'){
					 condition = {
					 	status:{$in:[4]},
					 }
				}else if(this.user.userType == '1'){
					condition = {
						archive:true,
						areaId:this.user.areaId,
						status:{$in:[4]},
					}
				}else if(this.user.userType == '2'){
					condition = {
						creator:this.user.loginName,
						status:{$in:[4]},
					}
				}else if(this.user.userType == '3'){
					condition = {
						implementId:this.user._id,
						status:{$in:[4]},
					}
				}
				const dbCmd = db.command
				var $ = db.command.aggregate
				let res = db.collection("line-app-pro").aggregate()
				.match(condition)
				.lookup({
				  from: 'line-app-user',
				  let: {
				    pro_creator: '$creator'
				  },
				  pipeline: $.pipeline()
				    .match(dbCmd.expr($.and([
						$.eq(['$loginName', '$$pro_creator']),
				    ])))
				    .done(),
				  as: 'jlList',
				})
				.lookup({
				  from: 'line-app-user',
				  let: {
				    pro_implementId: '$implementId'
				  },
				  pipeline: $.pipeline()
				    .match(dbCmd.expr($.and([
				      $.eq(['$_id', '$$pro_implementId'])
				    ])))
				    .done(),
				  as: 'sgList',
				})
				.end()
				.then(res => {
						_this.listover = res.result.data ;
					}).catch(err => {
						console.error(err)
					})
					.finally(() => {
						uni.hideLoading()
					})
			},
			archiveLinePro(item){
				let that = this ;
				uni.showLoading({
					title: '处理中...'
				})
				 
				db.collection("line-app-pro").doc(item._id).update({
					archive:true,
					archiveTime:that.$time.getFormatDate(),
				}).then(res=>{
					console.log(res)
					that.getListingData();
					that.getListoverData();
					uni.hideLoading()
				}); 
			},
			delLinePro(item){
				let that = this ;
				uni.showLoading({
					title: '处理中...'
				})
				db.collection('line-app-pro').doc(item._id).remove().then(res=>{
					that.getListingData();
					that.getListoverData();
					uni.hideLoading()
				})
			},
			editLinePro(item){
				uni.navigateTo({
					url:'../linePro/linePro?data='+JSON.stringify(item)
				})
			},
			clickCard() {
				uni.showToast({
					title: '点击卡片',
					icon: 'none'
				})
			},
			// 点击操作菜单
			doAction(e){
				uni.showActionSheet({
					itemList: ['点赞','评论'],
					success: res => {
						if(res.tapIndex === 0){
							this.doSupport(e)
						} else {
							this.content = ''
							this.faceModal = false
							this.commentIndex = e.index
							this.reply_user = false
							this.$refs.action.show()
						}
					},
				});
			},
			// 点赞
			doSupport(e){
				console.log(e);
				$H.post('/moment/like',{
					id:e.item.moment_id
				}).then(res=>{
					let i = e.item.likes.findIndex(item=>item.id === this.user.id)
					if(i !== -1){ // 取消点赞
						e.item.likes.splice(i,1)
					} else { // 点赞
						e.item.likes.push({
							id:this.user.id,
							name:this.user.nickname || this.user.username
						})
					}
					uni.showToast({
						title: i !== -1 ? '取消点赞成功' : '点赞成功',
						icon: 'none'
					});
				})
			},
			// 发送
			send(){
				let item = this.list[this.commentIndex]
				$H.post('/moment/comment',{
					id:item.moment_id,
					content:this.content,
					reply_id:this.reply_user ? this.reply_user.id : 0
				}).then(res=>{
					item.comments.push({
						content:this.content,
						user:{
							id:this.user.id,
							name:this.user.nickname || this.user.username
						},
						reply:this.reply ? this.reply : null
					})
					uni.showToast({
						title: '评论成功',
						icon: 'none'
					});
				})
				this.$refs.action.hide()
			},
			
			hide() {
				this.showLeft = false
			},
			closeDrawer(e) {
				this.showLeft = false
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			search() {
				uni.showToast({
					title: '搜索'
				})
			},
			plusempty() {
				uni.navigateTo({
					url: './manuscriptDesc/manuscriptDesc'
				});
			},
			confirm() {
				uni.showToast({
					title: '搜索'
				})
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
		}
	}
</script>

<style>
	.card-box{
		height: 100%;
	}
	.image-box {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		height:150rpx;
		overflow: hidden;
	}

	.image {
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		/* #endif */
		flex: 1;
	}

	.content-box {
		padding-top: 20rpx;
	}

	.content-box-text {
		font-size: 14px;
		line-height: 20px;
	}

	.footer-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: space-between;
		flex-direction: row;

	}

	.footer-box__item {
		align-items: center;
		padding: 10rpx 0;
		font-size: 30rpx;
		color: #666;
	}
		
	
	
	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}
	
	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}
	
	.word-btn--hover {
		background-color: #4ca2ff;
	}
	
	.input-uni-icon {
		line-height: 30px;
	}
	
	.input-view {
			/* #ifndef APP-PLUS-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			/* width: 500rpx;
	*/
			flex: 1;
			background-color: #f8f8f8;
			height: 30px;
			border-radius: 15px;
			padding: 0 15px;
			flex-wrap: nowrap;
			margin: 7px 0;
			line-height: 30px;
		}
	
	.nav-bar-input {
		height: 30px;
		line-height: 30px;
		/* #ifdef APP-PLUS-NVUE */
		width: 370rpx;
		/* #endif */
		padding: 0 5px;
		font-size: 28rpx;
		background-color: #f8f8f8;
	}
	
	.uni-bar-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}
</style>
