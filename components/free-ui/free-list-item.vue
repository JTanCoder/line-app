<template>
	<view class="bg-white flex align-stretch" :style="backgroundColor" hover-class="bg-light" @click="$emit('click')">
		<view class="flex align-center justify-center py-2 pl-3"
		v-if="showLeftIcon">
			<slot name="icon"></slot>
			<image :src="cover" v-if="cover" mode="widthFix" :style="coverStyle"></image>
		</view>
		<view class="flex-1 flex align-center justify-between pr-3  pl-3" :class="border ? 'border-bottom' : ''">
			<slot>
				<text class="font-md text-dark">{{title}}</text>
			</slot>
			<view class="flex align-center" v-if="showRight">
				<slot name="right"></slot>
				<!-- 右箭头 -->
				<uni-icons type="arrowright" v-if="showRightIcon" class="text-light-muted font-md"/>
				<!-- <text v-if="showRightIcon" class="iconfont text-light-muted font-md">&#xe636;</text> -->
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni/uni-icons/uni-icons.vue'
	export default {
		components: {
			uniIcons
		},
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
				default:75
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
			},
			bgColor:{
				type:String,
				default:""
			}
		},
		computed: {
			coverStyle() {
				return `width: ${this.coverSize}rpx;height: ${this.coverSize}rpx;`
			},
			backgroundColor() {
				return `background-color: ${this.bgColor}` 
			}
		},
	}
</script>

<style>
</style>
