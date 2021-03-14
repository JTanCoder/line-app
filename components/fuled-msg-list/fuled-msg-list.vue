<template>
    <view>
        <view class="cu-list menu-avatar padding-tb-sm">
            <view v-for="(item,index) in list" :key="index" class="cu-item">
                <view class="cu-avatar radius lg" :style="'background-image:url(' + item.headImg + ');'">
                </view>
                <view class="content">
                    <view class="text-grey">
                        <view class="text-cut">{{item.nickName}}</view>
                    </view>
                    <view class="text-gray text-sm flex">
                        <view class="text-cut">
                            {{item.msgText}}
                        </view>
                    </view>
                </view>
                <view class="action">
                    <view class="text-grey text-xs">{{item.msgTime}}</view>
                        <view class="cu-tag round bg-fuled sm">{{item.msgCount}}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
                
			};
		},
		name: 'fuled-msg-list',
		computed: {
            
		},
		props: {
            url: {
                type: String,
                default: null
            },
            list: {
                type: Array
            }
		},
		methods: {
            
		}
	}
</script>

<style>

</style>
