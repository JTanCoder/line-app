<template>
	<view class="bg-white flex align-stretch card-index-list" hover-class="bg-light" @click="$emit('click')" >
		<view class="flex align-center justify-center py-2 pl-2" v-if="showLeftIcon">
			<slot name="icon"></slot>
			<image :src="cover" v-if="cover" class="fuled-index-list-item-img" :style="coverStyle"></image>
		</view>
		<view class="flex-1 flex align-center justify-between  py-1 pl-3" >
			<slot>
				<text class="font-md text-dark">{{title}}</text>
			</slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 是否开启下边线
			border:{
				type:Boolean,
				default:true
			},
			// 封面
			cover: {
				type: String,
				default: ""
			},
			// 封面大小
			coverSize:{
				type: [String,Number],
				default:125
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
			}
		},
		computed: {
			coverStyle() {
				// #ifdef APP-PLUS
					return `width:85px;height: ${this.coverSize}rpx;`
				// #endif
				// #ifndef APP-PLUS
					return `width:105px;height: ${this.coverSize}rpx;`
				// #endif
				
			}
		},
	}
</script>

<style lang="scss">
	.fuled-index-list-item-img{
		border-radius: 18rpx;
	}
	.card-index-list{
		border-top: solid 1rpx #E4E4E4;
		border-bottom: solid 1rpx #E4E4E4;
		margin-bottom: 20rpx;
	}
</style>
