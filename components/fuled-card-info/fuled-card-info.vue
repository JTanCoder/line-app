<template>
    <view>
        <view class="cu-card case margin-top-xs" :class="isCard?'no-card':''">
        	<view class="cu-item shadow">
                <navigator :url="url">
                    <view class="image">
                        <image :src="info.photo" mode="widthFix"></image>
                        <view class="cu-tag bg-blue">{{info.type}}</view>
                        <view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{info.title}}</text></view>
                    </view>
                </navigator>
                <view class="cu-list menu-avatar">
                    <view class="cu-item">
                        <view class="cu-avatar round lg" :style="'background-image:url(' + info.photo + ');'"></view>
                        <view class="content flex-sub">
                            <view class="text-cut text-bold">{{info.nickName}}</view>
                            <view class="text-gray text-sm flex justify-between">
                                {{info.pubDate}}
                                <view class="text-gray text-sm">
                                    <text class="cuIcon-attentionfill margin-lr-xs"></text> {{info.previewCount}}
                                    <text class="cuIcon-appreciatefill margin-lr-xs"></text> {{info.likeCount}}
                                    <text class="cuIcon-messagefill margin-lr-xs"></text> {{info.msgCount}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
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
		name: 'fuled-card-share-finish',
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
</style>
