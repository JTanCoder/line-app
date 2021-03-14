<template>
	<view class="uni-progress-box">
        <!-- 进度条底层 -->
        <view class="progress-bottom">
            <!-- 进度条实际 -->
            <view class="progress" :style="{width:percentage+'%', background:percentBackground}"></view>
        </view>
        <!-- 实际进度条占比 -->
        <view v-if="showPercentage" class="percentage"> {{ percentage }} % </view>
        <!-- 如果是投票模式，显示投票总数 -->
        <view v-if="showExplain">{{ explain }}</view>
    </view> 
</template>

<script>
	export default {
        props:{
            // 进度条占比
            percentage:{
                type: Number,
                default: 0
            },
			showPercentage:{
                type: [Boolean],
                default: false
            },
            // 如果是投票模式，已投得票数
            explain:{
                type: [Number,String],
                default: '0票'
            },
			showExplain:{
                type: [Boolean],
                default: false
            },
            // 进度条占比的颜色设置
            percentBackground:{
                type: String,
                default: null
            }
        },
        data() {
            return {
                
            };
        }
    }
</script>

<style lang="scss">
	/* #ifndef APP-PLUS */
	.uni-progress-box{
		display: flex;
		width: 50%;
		.progress-bottom{
			/* #ifdef H5 */
				margin-top:13upx;
			/* #endif */
			/* #ifndef H5 */
				margin-top:10upx;
			/* #endif */
			margin-left:5upx;
			height: 20upx; 
			width: 85%; 
			background: #fff;
			border: solid 1rpx #000;
			.progress{
				height: 20upx;
				margin-top: 0rpx;
				margin-left: 0rpx;
			}
		}
	}
	/* #endif */
	
	/* #ifdef APP-PLUS */
	.uni-progress-box{
		display: flex;
		width: 260rpx;
		.progress-bottom{
			margin-top:8upx;
			margin-left:5upx;
			height: 20rpx; 
			width:90%; 
			background: #fff;
			border: solid 1rpx #000;
			.progress{
				height: 20rpx;
			}
		}
	}
	/* #endif */
</style>
