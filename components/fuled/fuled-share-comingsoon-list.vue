<template>
	<view class="page">
		<fuled-list-item v-for="item in goods" :key="item.id" coverSize="200" :cover="item.pic"  :title="item.title" @click="open('member/userinfo/userinfo')">
			<view class="flex flex-column" style="width: 100%;">
				<text class="text-secondary font-md font-weight-bold">{{item.title}}</text>
				<text class="text-light-muted font-sm mt-0 cont_text" style="width: 70%;font-size: 25rpx;">{{item.info}}</text>
				<view style="padding-right: 15rpx;">
					<!-- #ifdef MP -->
						<view class="text-light-muted font-sm mt-1">
							<text class="" style="float: left;">时间: </text>
							<text class="footer-box__item" style="float: left;font-size: 25rpx;color: #FF8C00;"> 20:00</text>
							<text class="" style="float: right;color: #007AFF;"> {{item.fan}}</text>
							<text class="" style="float: right;">预约 : </text>
						</view>
					<!-- #endif -->
					<!-- #ifndef MP -->
						<view class="text-light-muted font-sm mt-1">
							<view class="footer-box">
								<view>
									<text class="footer-box__item" style="float: left;font-size: 25rpx;">时间:</text>
									<text class="footer-box__item" style="float: left;font-size: 25rpx;color: #FF8C00;"> 20:00</text>
								</view>
								<view>
									<text class="" style="float: right;color: #007AFF;font-size: 25rpx;"> {{item.fan}}</text>
									<text class="" style="float: right;font-size: 25rpx;">预约 : </text>
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
	export default {
		components:{fuledListItem},
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