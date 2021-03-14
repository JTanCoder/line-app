<template>
    <view>
        <view class="cu-list grid margin-top-sm" :class="['col-' + gridCol]">
        	<view class="cu-item" v-for="(item,index) in list" :key="index">
                <view class="text-left text-sm text-gray" style="padding-left: 20upx;">{{item.title}}</view>
                <view v-if="item.type=='number'" class="text-center text-bold" style="font-size: 60upx;color: #666666;">{{item.value}}</view>
                <view v-if="item.type=='star'" class="flex  justify-center">
                	<view v-for="(item,index) in item.value" :key="index" class="cuIcon-favorfill text-fuled" style="font-size: 48upx; padding: 6upx; margin: 3upx; width: 46upx;"></view>
                </view>
                <view class="text-right text-sm text-gray margin-left" style="padding-right: 20upx;">{{item.unit}}</view>
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
		name: 'fuled-grid-card',
		computed: {
            
		},
		props: {
            gridCol: {
                type: Number,
                default: 2
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
