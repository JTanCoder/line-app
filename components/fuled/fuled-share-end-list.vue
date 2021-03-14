<template>
	<view class="page">
		<fuled-list-item v-for="item in goods" :key="item.id" coverSize="200" :cover="item.pic"  :title="item.title" @click="open('member/userinfo/userinfo')">
			<view class="flex flex-column" style="width: 100%;">
				<text class="text-secondary font-md font-weight-bold">{{item.title}}</text>
				<view>
					<text class="text-light-muted font-sm mt-0">赋领人 : Eva</text>
					<uni-rate :size="15" :value="item.rate" style="float: right;padding-top: 20rpx;" />
					<text class="text-light-muted font-sm mt-0" style="float: right;">赋能指数:</text>
				</view>
				<text-scroll :msg="msg" class="mr-3"></text-scroll>
				<view style="padding-right: 15rpx;">
					<!-- #ifndef APP-PLUS -->
						<view class="text-light-muted font-sm mt-1">
							<view class="footer-box">
								<view class="footer-font" >
									<text class="footer-box__item"> 预约 :</text>
									<text class="footer-box__item" style="color: #007AFF;">{{item.fan}}</text>
								</view>
								<view class="footer-font" >
									<text class="footer-box__item"> 在线 :</text>
									<text class="footer-box__item" style="color: #007AFF;">{{item.fan}}</text>
								</view>
								<view class="footer-font" >
									<text class="footer-box__item"> 浏览 :</text>
									<text class="footer-box__item" style="color: #007AFF;">{{item.fan}}</text>
								</view>
							</view>
						</view>
					<!-- #endif -->
					<!-- #ifdef APP-PLUS -->
						<view class="text-light-muted font-sm mt-1">
							<view class="footer-box">
								<view class="footer-font" >
									<text class="footer-box__item"> 预约 :</text>
									<text class="footer-box__item" style="color: #007AFF;">{{item.fan}}</text>
								</view>
								<view class="footer-font" >
									<text class="footer-box__item"> 在线 :</text>
									<text class="footer-box__item" style="color: #007AFF;">{{item.fan}}</text>
								</view>
								<view class="footer-font" >
									<text class="footer-box__item"> 浏览 :</text>
									<text class="footer-box__item" style="color: #007AFF;">{{item.fan}}</text>
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
	import uniRate from '@/components/uni/uni-rate/uni-rate.vue'
	export default {
		components:{fuledListItem,textScroll,fuledProgress,uniRate},
		props:['goods'],
		data() {
			return {
				msg: ['老师讲的真好,太棒了','实在讲得太好了,要好好学习了','好好学习,天天向上','学习是最好的老师','欢饮新加入的同学','双击666666']
			}
		},
	}
</script>

<style lang="scss">
	.footer-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: space-between;
		flex-direction: row;
	
	}
	
	.footer-box__item {
		align-items: center;
		font-size: 30rpx;
		color: #666;
	}
	
	.footer-font{
		text{
			font-size: 20rpx;
		}
	}
</style>