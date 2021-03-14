<template>
	<view class="page">
		<!-- #ifdef APP-PLUS -->
			<!-- 导航栏 -->
			<free-nav-bar> </free-nav-bar>
		<!-- #endif -->
		<view class="uni-bar-body">
			<!-- right-icon="plusempty" -->
			<uni-nav-bar :fixed="false" backgroundColor="#58B7E9" color="#fff" left-icon="arrowleft"  title="我的文稿" right-text="创建"  @clickLeft="back" background-color="#FFFFFF" @clickRight="plusempty">
				<!-- <view class="input-view">
					<uni-icons class="input-uni-icon" type="search" size="22" color="#666666" />
					<text>我的文稿</text>
					<input confirm-type="search" class="nav-bar-input" type="text" placeholder="输入搜索关键词" @confirm="confirm">
				</view> -->
			</uni-nav-bar>
		</view>
		<!-- 稿件 -->
		<view class="pt-2">
			<uni-segmented-control :current="current" :values="items" style-type="text" :active-color="activeColor" @clickItem="onClickItem" />
		</view>
		<view >
			<view v-if="current === 1">
				<manuscript-list :goods="goods1"></manuscript-list>
			</view>
			<view v-if="current === 2">
				<manuscript-list :goods="goods2"></manuscript-list>
			</view>
		</view>
		
		<!-- 上拉加载 -->
		<view class="flex align-center justify-center py-5 bg-light" v-if="list.length >= 10">
			<text class="text-muted font">{{loadmore}}</text>
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
				items: ['施工中', '已完工'],
				current: 0,
				colorIndex: 0,
				activeColor: '#64A8D1',
				goods:[
					{id:1,sell_price:199,marcet_price:299,title:'uniapp',pic:"/static/fuled/wengao-1.png",rate:3,fan:"5000",
					info:"uni-app:一个使用 Vue.js  iOS、Android、H5"},
					{id:2,sell_price:199,marcet_price:299,title:'websocket',pic:"/static/fuled/wengao-1.png",rate:5,fan:"1 万",
					info:"WebSocket是一种在单个TCP连接上进行全双工通信的协议"},
					{id:5,sell_price:199,marcet_price:299,title:'赋领',pic:"/static/fuled/wengao-1.png",rate:4,fan:"5",
					info:"知识赋领-社会大脑的搬运工"}
				],
				goods1:[
					{id:3,sell_price:199,marcet_price:299,title:'Java',pic:"/static/fuled/wengao-1.png",rate:2,fan:"600",
					info:"Java 是一项用于开发应用程序的技术"},
					{id:4,sell_price:199,marcet_price:299,title:'Python',pic:"/static/fuled/wengao-1.png",rate:1,fan:"12.5万",
					info:"Python是一种跨平台的计算机程序设计语言"}
				],
				goods2:[
					{id:1,sell_price:199,marcet_price:299,title:'uniapp',pic:"/static/fuled/wengao-1.png",rate:3,fan:"5000",
					info:"uni-app:一个使用 Vue.js  iOS、Android、H5"},
					{id:2,sell_price:199,marcet_price:299,title:'websocket',pic:"/static/fuled/wengao-1.png",rate:5,fan:"1 万",
					info:"WebSocket是一种在单个TCP连接上进行全双工通信的协议"}
				],
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
			//this.getData()
			
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
			getData(){
				return new Promise((result,reject)=>{
					let page = this.page
					let param = ''
					if(this.params && this.key == 'moment'){
						param = '?user_id='+this.params.id
					}
					/* $H.get(`/${this.key}/${this.page}${param}`).then(res=>{
						this.list = page === 1 ? res : [...this.list,...res]
						this.loadmore = this.list.length === (page * 10) ? '上拉加载更多' : '没有更多了'
						result(res)
					}).catch(err=>{
						reject(err)
					}) */
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
