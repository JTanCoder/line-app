<template>
	<view class="page">
		<scroll-view scroll-y="true" :style="'height:100%;'" :scroll-into-view="scrollInto">
			<free-list-item v-for="(item,index) in topList" :key="item.id" :title="item.title" :cover="item.cover"  
			:border="index != topList.length - 1?true:false" @click="navigate(item.path)">
				<view slot="right">
					<free-badge v-if="applyCount > 0" :value="applyCount"></free-badge>
				</view>
			</free-list-item>
			<view v-for="(item,index) in list" :key="index"
			:id="'item-'+item.title">
				<view v-if="item.list.length" 
				class="py-1 px-2 border-bottom bg-light">
					<text class="text-dark font-sm">{{item.title}}</text>
				</view>
				<free-list-item v-for="(item2,index2) in item.list" 
				:key="index2" :title="item2.name" 
				:cover="item2.avatar ? item2.avatar : '/static/userpic.png'" :border="false"
				@click="navigate('mail/user-base/user-base?user_id='+item2.user_id)"></free-list-item>
			</view>
		</scroll-view>
		
		<!-- 侧边导航条 -->
		<view class="position-fixed right-0 bottom-0 flex flex-column" :style="'top:100px;'" style="width: 50rpx;" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
			<view class="flex-1 flex align-center justify-center"
			v-for="(item,index) in list" :key="index">
				<text class="font-small text-muted">{{item.title}}</text>
			</view>
		</view>

		<view class="position-fixed rounded-circle bg-light border flex align-center justify-center" v-if="current" style="width: 150rpx;height: 150rpx;left: 300rpx;" :style="'top:'+modalTop+'px;'">
			<text class="font-lg">{{current}}</text>
		</view>

	</view>
</template>

<script>
	import freeListItem from "@/components/free-ui/free-list-item.vue"
	import freeBadge from "@/components/free-ui/free-badge.vue"
	import auth from '@/common/mixin/auth.js';
	import { mapState } from 'vuex'
	export default {
		mixins:[auth],
		props:['list'],
		components: {
			freeListItem,
			freeBadge
		},
		data() {
			return {
				topList:[
					{
						id:"friend",
						title:"班",
						cover:"/static/fuled/banji-1.png",
						path:"mail/apply-list/apply-list"
					},
					{
						id:"group",
						title:"课",
						cover:"/static/fuled/banke-1.png",
						path:"mail/group-list/group-list"
					},
					{
						id:"tag",
						title:"群",
						cover:"/static/fuled/shequn-1.png",
						path:"mail/tag-list/tag-list"
					}
				],
				applyCount:1,
				top:0,
				scrollHeight:0,
				scrollInto:'',
				current:''
			}
		},
		onLoad() {
			let res = uni.getSystemInfoSync()
			this.top = res.statusBarHeight + uni.upx2px(90)
			this.scrollHeight = res.windowHeight - this.top
			
			//this.$store.dispatch('getMailList')
		},
		computed: {
			modalTop(){
				return (this.scrollHeight - uni.upx2px(150)) / 2
			},
			// 每个索引的高度
			itemHeight() {
				let count = this.list.length
				if(count < 1){
					return 0
				}
				return this.scrollHeight /  count
			}
		},
		methods: {
			touchstart(e){
				
				this.changeScrollInto(e)
			},
			touchmove(e){
				this.changeScrollInto(e)
			},
			touchend(e){
				this.current = ''
			},
			// 联动
			changeScrollInto(e){
				let Y = e.touches[0].pageY
				// #ifdef MP
				Y = Y - this.top
				// #endif
				let index = Math.floor(Y / this.itemHeight)
				let item = this.list[index]
				if(item){
					this.scrollInto = 'item-'+item.letter
					this.current = item.letter
				}
			}
		}
	}
</script>

<style>

</style>
