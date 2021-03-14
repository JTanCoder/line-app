<template>
    <view>
        <view class="cu-bar bg-white margin-top" style="border-bottom: solid 1px #e1e1e1;">
        	<view class="action" :class="titleBold?'text-bold':''">
        		<text class="cuIcon-titles text-fuled"></text>{{title}}
        	</view>
			<view class="action">
                <view v-if="isDef" @tap="onDefClick" style="padding-right: 10px;">
                	<slot name="right"></slot>
                </view>
			</view>
        </view>
        <view v-for="(item,index) in list" :key="index" class="bg-white " style="padding: 20upx 30upx 20upx 30upx">
            <view style="padding: 20upx; border-left: solid 10rpx #e1e1e1; background-color: #f0f0f0; border-radius: 10upx;">
                <view class="multi-row">{{filterBr(item)}}</view>
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
		name: 'fuled-user-card',
		computed: {
            
		},
		props: {
            title: {
                type: String,
                default: null
            },
			titleBold: {
				type: [Boolean, String],
				default: false
			},
            list: {
                type: Array
            },
			isDef: {
				type: [Boolean, String],
				default: false
			}
		},
		methods: {
			onDefClick(){
				this.$emit("onDefClick");
			},
            filterBr(str){
                if (str != null && str != "" && str != undefined) {
                    str = str.toString().replace(/<br\/>/g, '\n');
                } else {
                    str = "";
                }
                return str;
            }
		}
	}
</script>

<style>

</style>
