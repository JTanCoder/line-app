<template>
	<view class="page">
		<fuled-list-item v-for="item in goods" :key="item.id" coverSize="200" :cover="item.pic"  :title="item.title" @click="open('member/userinfo/userinfo')">
			<view class="flex flex-column" style="width: 100%;">
				<text class="text-secondary font-md font-weight-bold">{{item.title}}</text>
				<text class="text-light-muted font-sm mt-0">赋领人 : Eva</text>
				<text-scroll :msg="msg" ></text-scroll>
				<view style="padding-right: 15rpx;">
					<!-- #ifndef APP-PLUS -->
						<view class="text-light-muted font-sm mt-2">
							<text class="" style="float: right;color: #007AFF;"> {{item.fan}}</text>
							<text class="" style="float: right;">在线 : </text>
							<text class="" style="float: left;">
								进度:
							</text>
							<fuled-progress :percentage="60"  percentBackground="#FF8C00"></fuled-progress>
							
						</view>
					<!-- #endif -->
					<!-- #ifdef APP-PLUS -->
						<view class="text-light-muted font-sm mt-3">
							<view class="footer-box">
								<view>
									<text class="footer-box__item" style="float: left;font-size: 25rpx;">进度:</text>
									<fuled-progress class="footer-box__item" style="float: left;" :percentage="60"  percentBackground="#FF8C00"></fuled-progress>
								</view>
								<view></view>
								<view>
									<text class="footer-box__item" style="float: right;color: #007AFF;font-size: 25rpx;"> {{item.fan}}</text>
									<text class="footer-box__item" style="float: right;font-size: 25rpx;">在线 :</text>
								</view>
							</view>
						</view>
					<!-- #endif -->
					
				</view>
			</view>
		</fuled-list-item>
	</view>
</template>

<script>
	import fuledListItem from "@/components/fuled/fuled-list-item.vue"
	import fuledProgress from '@/components/fuled/fuled-progress.vue'
	import textScroll from "@/components/fuled/text-scroll.vue"
	export default {
		components:{fuledListItem,textScroll,fuledProgress},
		props:['goods'],
		data() {
			return {
				msg: ['老师讲的真好,太棒了','实在讲得太好了,要好好学习了','好好学习,天天向上','学习是最好的老师','欢饮新加入的同学','双击666666']
			}
		},
	}
</script>

<style lang="scss">
	
</style>
