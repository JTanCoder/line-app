<template>
    <view>
        <view class="padding" :style="background">
        	<view class="cf" :style="'margin-top: '+ StatusBar + 'px;'">
                <view class="flex padding justify-between">
                	<view class="flex align-center">
                        <view @tap="onUserNameClick" class="cu-avatar xl round" :style="headImg"></view>
                        <view class="padding-sm margin-xs">
                            <text @tap="onUserNameClick" class="text-bold text-xl text-white">{{info.fuledId}}</text>
                        </view>
                        <view class="cu-tag round text-gray sm">{{info.fuledRole}}</view>
                    </view>
                	<view class="padding-sm margin-xs">
                        <view class="cu-avatar lg" :style="qrCode"></view>
                    </view>
                </view>
                
                <view class="flex justify-around">
                	<view class="radius">
                        <text class="margin-sm text-white">{{info.fansCount}}</text>
                        <text class="text-white">我关注的人</text>
                    </view>
                    <view class="solids-left radius"></view>
                	<view class="radius">
                        <text class="margin-sm text-white">{{info.followCount}}</text>
                        <text class="text-white">关注我的人</text>
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
                StatusBar : this.StatusBar + 10
			};
		},
		name: 'fuled-user-card',
		computed: {
			background() {
				var img = this.info.photo;
				var style = style = `background-color: ` + this.bgColor + `;`;
				if (img) {
					style = `${style}background-image:url(${img})`;
				}
				return style
			},
            headImg() {
            	var img = this.info.headImg;
            	var	style = ``;
            	style = `${style}background-image:url(${img});`;
            	return style
            },
            qrCode() {
            	var img = this.info.qrCode;
            	var	style = ``;
            	style = `${style}background-image:url(${img});`;
            	return style
            }
		},
		props: {
			bgColor: {
				type: String,
				default: '#58b7e9'
			},
            info: {
                fuledId: null,
                nickName: null,
                headImg: null,
                qrCode: null,
                fuledRole: null,
                fansCount: null,
                followCount: null
            }
		},
		methods: {
			onUserNameClick(){
				this.$emit("onUserNameClick");
			},
            filterBr(str){
                if (str != null && str != "" && str != undefined) {
                    str = str.replace(/<br\/>/g, '\n');
                } else {
                    str = "";
                }
                return str;
            }
		}
	}
</script>

<style>
    .user-bg {
        height: 300upx; 
    }
    .user-concern {
        height: 40px; 
        width: 100%;
    }
    .user-concern-but {
        float: right;
        right: 20upx;
        top: 14upx;
    }
    .user-name {
        font-size: 40upx;
        font-weight: 900;
        color: #333333;
        line-height: 50upx;
        padding: 0 0 0 40upx;
    }
    .user-fuled-no {
        font-size: 28upx;
        color: #999999;
        line-height: 50upx;
        padding: 0 0 0 40upx;
    }
    .user-motto {
        font-size: 28upx;
        color: #333333;
        line-height: 50upx;
        padding: 0 0 0 40upx;
    }
    .user-share {
        padding: 10upx 10upx 10upx 40upx;    
    }
    .user-share-title {
        font-size: 24upx;
    }
    .user-intro {
        padding: 10upx 40upx 10upx 40upx;
        /* text-indent: 30upx; */
    }
</style>
