<template>
	<view class="flex align-stretch border-bottom-item" >
		<view class="flex align-center justify-center py-2 pl-0" v-if="showLeftIcon">
			<slot name="icon"></slot>
			<view class="flex align-center justify-center position-relative" style="width: 145rpx;">
				<image :src="cover" v-if="cover" class="fuled-index-list-item-img" :style="coverStyle"></image>
				
				<free-badge badgeClass="position-absolute item-index-seq" :badgeStyle="badgeStyle"  :value="seq"></free-badge>
				
				<image @click="delClick" src="../../static/fuled/del.png" v-if="del" class="item-del-img position-absolute" ></image>
			</view>
		</view>
		<view class="flex-1 flex align-center justify-between  py-1 pl-3"  @click="$emit('click')" >
			<slot>
				<text class="font-md text-dark">{{title}}</text>
			</slot>
			<view class="flex align-center" v-if="showRight">
				<slot name="right"></slot>
				<!-- 右箭头 -->
				<uni-icons type="arrowright" class="text-light-muted font-md"/>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni/uni-icons/uni-icons.vue'
	import freeBadge from "@/components/free-ui/free-badge.vue"
	export default {
		components: {
			uniIcons,freeBadge
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
				default:125
			},
			seq:{
				type: [String,Number],
				default:"01"
			},
			del:{
				type:Boolean,
				default:false
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
					return `width:55px;height: 120rpx;`
				// #endif
				// #ifndef APP-PLUS
					return `width:65px;height: 120rpx;`
				// #endif
				
			},
			badgeStyle(){
				// #ifndef MP-WEIXIN
				return `margin:0 auto;`
				//#endif
				// #ifdef MP-WEIXIN
				return `top:45rpx;right:45rpx`
				//#endif
				
			}
		},
		methods: {
			delClick() {
				this.$emit('delClick',this.seq)
			},
		}
	}
</script>

<style lang="scss">
	.border-bottom-item{
		border-bottom: solid 1rpx #fff;
	}
	
	.item-del-img{
		/* #ifndef APP-PLUS */
		width: 22px;
		height: 25px;
		/* #endif */
		/* #ifdef APP-PLUS */
		width: 20px;
		height: 20px;
		/* #endif */
		/* #ifdef H5 */
		top:1rpx;
		left:20rpx
		/* #endif */
		/* #ifndef H5 */
		top:0rpx;
		left:15rpx
		/* #endif */
	}
	
	.item-index-seq{
		/* #ifdef MP */
		padding-right: 100px;
		/* #endif */
	}
</style>
