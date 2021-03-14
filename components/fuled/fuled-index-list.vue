<template>
	<view class="goods_list">
		<fuled-list-item v-for="item in goods" :key="item.id" coverSize="220" :cover="item.pic"  :title="item.title" @click="open('member/userinfo/userinfo')">
			<view class="flex flex-column" style="width: 100%;">
				<text class="text-secondary font-md font-weight-bold">{{item.title}}</text>
				<text class="text-light-muted font-sm mt-0 cont_text" >{{item.info}}</text>
				<view style="padding-right: 15rpx;">
					<!-- #ifdef MP -->
						<view class="text-light-muted font-sm mt-1">
							<text class="" style="float: left;">
								赋能指数:
							</text>
							<uni-rate :size="15" :value="item.rate" style="float: left;padding-top: 20rpx;" />
							<text class="" style="float: right;color: #007AFF;"> {{item.fan}}</text>
							<text class="" style="float: right;">粉丝 : </text>
						</view>
					<!-- #endif -->
					<!-- #ifndef MP -->
						<view class="text-light-muted font-sm mt-1">
							<view class="footer-box">
								<view>
									<text class="footer-box__item" style="float: left;font-size: 25rpx;">赋能指数:</text>
									<uni-rate class="footer-box__item" :size="12" :value="item.rate" style="float: left;padding-top: 20rpx;" />
								</view>
								<view>
									<text class="" style="float: right;color: #007AFF;font-size: 25rpx;"> {{item.fan}}</text>
									<text class="" style="float: right;font-size: 25rpx;">粉丝 : </text>
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
	import uniRate from '@/components/uni/uni-rate/uni-rate.vue'
	export default {
		components:{fuledListItem,uniRate},
		props:['goods']
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
	
	.cont_text{
		overflow: hidden;
		word-break: break-all;  /* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;  /* 超出部分省略号 */
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 3; /** 显示的行数 **/
	}
</style>
