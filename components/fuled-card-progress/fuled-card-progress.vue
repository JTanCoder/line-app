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
                                <view class="cuIcon-people text-gray"><text class="text-yellow">{{info.onLine}}</text></view>
                            </view>
                            <view class="text-content-fuled">{{info.intro}}</view>
                            <view class="flex">
                                <view class="cu-progress round sm">
                                    <view class="bg-fuled" :style="[{ width: info.progress + '%'}]"></view>
                                </view>
                                <text class="margin-left text-gray" style="font-size: 11px;">{{info.progress}}%</text>
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
		name: 'fuled-card-share-now',
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
                type: null,
                flId: null,
                nickName: null,
                headImg: null,
                logo: null,
                photo: null,
                title: null,
                intro: null,
                tag: [],
                pubDate: "",
                reservationCount: 0,
                previewCount: 0,
                likeCount: 0,
                msgCount: 0,
                progress: 0
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
