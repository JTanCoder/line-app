<template>
	<view class="goods_list">
		<fuled-list-item v-for="item in goods" :key="item.id" coverSize="90" :cover="item.pic"  :title="item.title" @click="open('member/userinfo/userinfo')">
			<view class="flex flex-column" style="width: 100%;">
				<text class="text-secondary font cont_text">{{item.title}}</text>
				<text class="text-light-muted font-sm cont_text2" style="float: left;">{{item.info}}</text>
				<view style="padding-right: 2rpx;">
					<view class="text-light-muted font-sm ">
						<view class="footer-box" style="float: right;">
							<view style="float: right;">
								<text class="font-sm" style="float: right;"> 发表</text>
								<text class="ml-3" style="float: right;font-size: 25rpx;"> {{item.fan}} </text>
								<text class="font-sm" style="float: right;"> 分享</text>
								<text class="" style="float: right;font-size: 25rpx;"> {{item.fan}} </text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</fuled-list-item>
	</view>
</template>

<script>
	import fuledListItem from "@/components/fuled/fuled-member-manuscript-list-item.vue"
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
		color: #000;
		overflow: hidden;
		word-break: break-all;  /* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;  /* 超出部分省略号 */
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 1; /** 显示的行数 **/
	}
	
	.cont_text2{
		overflow: hidden;
		word-break: break-all;  /* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;  /* 超出部分省略号 */
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 1; /** 显示的行数 **/
	}
</style>
