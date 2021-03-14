<template>
	<view class="scroll-content">
		<view class="" style="text-align: center;background-color: #D7D7D7;">= {{title}} =</view>
		<scroll-view scroll-x="true" class="scroll py-2 ">
			<view class="box " v-for="(item,index) in items">
				<view class="flex align-center justify-center" style="height: 100%;" @click="clickItem(item)">
					{{item.text}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			// 项数组
			items:{
				type:Array,
				default:function() {
					return []
				}
			},
			// 标题名称
			title: {
				type:String,
				default:''
			},
		},
		methods:{
			clickItem(item){
				this.$emit('clickMenusItem',this.title,item)
			}
		}
	}
</script>

<style lang="scss">
	.scroll-content {
		text-align: center;
	}
	 
	.scroll {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		background-color: #63646C;
		opacity:1;
	}
	 
	.box {
		display: inline-block;
		width: 125upx;
		height: 125upx;
		background: #fff;
		border-radius: 15rpx;
		margin-right: 10px;
	}
	 
	.box:last-child {
		margin-right: 0;
	}
</style>
