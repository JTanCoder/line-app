<template>
	<view :class="['bg-white', 'flex', 'align-stretch',border?'border-bottom':'']" hover-class="bg-light" @click="$emit('click')" >
		<view class="flex align-center justify-center pl-2" v-if="showLeft">
			<slot name="icon">
				<text class="font-md text-dark">{{title}}</text>
			</slot>
		</view>
		<view class="flex-1 pl-3  pt-1 pb-2 pr-3" >
			<slot>
				
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
			showLeft:{
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
</style>
