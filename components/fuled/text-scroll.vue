<template>
	<view class="uni-swiper-msg">
		<swiper class="swiper " vertical="true" autoplay="false" duration="500" interval="4000" >
			<swiper-item v-for="(item, index) in msg" :key="index">
				<view>{{ item }}</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props:['msg']
	}
</script>

<style lang="scss">
	.swiper{
		 font-size: 10rpx;
		 justify-content: center;
		 swiper-item{
			line-height: 40upx !important;
			color: #000 !important;
			view{
				overflow: hidden !important;
				white-space: nowrap !important;
				text-overflow: ellipsis !important;
			}
		 }
	}
	.uni-swiper-msg{
		justify-content: center;
		height: 40rpx !important;
		background-color: #F2F2F2;
		width: 98%;
		font-size: 12rpx;
		flex-wrap: nowrap !important;
		display: flex !important;
	}
</style>
