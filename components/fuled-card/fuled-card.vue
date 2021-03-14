<template>
    <view>
        <view class="cu-card article" :class="isCard?'no-card':''">
            <view class="cu-item shadow" :class="index==0?'':'solids-top'">
                <navigator :url="url">
                    <view class="content margin-top">
                        <image :src="info.imgUrl" mode="aspectFill"></image>
                        <view class="desc">
                            <view class="title-fuled text-cut" style="width:220px">{{info.title}}</view>
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
		name: 'fuled-user-card',
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

</style>
