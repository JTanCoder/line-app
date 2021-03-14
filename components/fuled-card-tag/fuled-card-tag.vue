<template>
    <view>
        <view class="cu-card article margin-top-xs" :class="isCard?'no-card':''">
        	<view class="cu-item shadow" :class="index==0?'':'solids-top'">
                <navigator :url="url">
                    <view class="flex justify-between">
                        <view class="title"><view class="text-cut">{{info.title}}</view></view>
                        <view class="fuled-time cuIcon-time">{{info.pubDate}}</view>
                    </view>
                    <view class="content">
                        <image :src="info.photo" mode="aspectFill"></image>
                        <view class="desc">
                            <view class="flex justify-between">
                                <view class="user-name text-cut text-bold" style="width:160px">{{info.nickName}}</view>
                                <view class="cuIcon-people text-gray"><text class="text-yellow">{{info.reservationCount}}</text></view>
                            </view>
                            <view class="text-content-fuled">{{info.intro}}</view>
                            <view>
                                <view v-for="(item,index) in info.tag" :key="index" class="cu-tag light sm round" :class="tag[index]">{{item}}</view>
                            </view>
                        </view>
                    </view>
                </navigator>
        	</view>
        </view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
                tag: [
                    "bg-red",
                    "bg-green",
                    "bg-orange",
                    "bg-blue"
                ]
			};
		},
		name: 'fuled-card-tag',
		computed: {
            
		},
		props: {
            isCard: {
                type: Boolean,
                default: true
            },
            url: {
                type: String,
                default: null
            },
            info: {
                imgUrl: null,
                title: null,
                intro: null,
                tag: []
            },
            index: {
                type: Number,
                default: 0
            }
		},
		methods: {
			
		}
	}
</script>

<style>
.fuled-time {
	font-size: 28upx;
	color: #999999;
	line-height: 100upx;
	padding: 0 30upx;
}
</style>
