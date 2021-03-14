<template>
	<view class="goods_list">
		<view class="goods_item" v-for="item in goods" :key="item.id">
			<view>
				<image src="../../static/logo.png"></image>
			</view>
			<view class="price">
				<text>${{item.sell_price}}</text>
				<text>${{item.marcet_price}}</text>
			</view>
			<view class="name">
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['goods']
	}
</script>

<style lang="scss">
.goods_list{
	padding: 0 15rpx;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	.goods_item{
		flex-wrap: cl;
		
		background: #FFFFFF;
		width: 345rpx;
		margin: 10rpx 0;
		padding: 15rpx;
		box-sizing: border-box;
		image{
			width: 80%;
			height: 350rpx;
			display: block;
			margin: auto;
		}
		.price{
			color: $climb-shop-color;
			font-size: 36rpx;
			margin: 10rpx 0;
			margin-left: 45rpx;
			text:nth-child(2){
				color: #ccc;
				font-size: 28rpx;
				margin-left: 45rpx;
				text-decoration: line-through;
			}
		}
		.name{
			font-size: 28rpx;
			line-height: 50rpx;
			padding-bottom: 15rpx;
			padding-top: 10rpx;
		}
	}
}
</style>
