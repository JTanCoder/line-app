<template>
    <view>
        <view class="user-bg bg-img" :style="background"></view>
        <view class="cu-card dynamic" :class="isCard?'no-card':''">
        	<view class="cu-item shadow">
        		<view class="cu-list menu-avatar">
        			<view class="cu-item">
        				<view class="cu-avatar round lg" :style="'background-image:url(' + info.headImg + ');'"></view>
        				<view class="content flex-sub-fuled">
        					<view class="text-bold" @click="onShowIntro">{{info.nickName}}</view>
        					<view class="text-gray text-sm flex justify-between">
        						{{info.motto}}
        					</view>
        				</view>
                        <view class="action text-gray">
                            <text class="cuIcon-right"></text>
                        </view>
        			</view>
        		</view>
        		<view v-if="showIntro" class="text-content margin-top text-gray" style="font-size: 26upx;">
                    <view class="multi-row">{{filterBr(info.intro)}}</view>
        		</view>
        	</view>
        </view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
                isCard: true,
                showIntro: this.isShowIntro
			};
		},
		name: 'fuled-user-share-card',
		computed: {
			background() {
				var bgImage = this.info.photo;
				var style = style = `background-color: ` + this.bgColor + `;`;
				if (bgImage) {
					style = `${style}background-image:url(${bgImage})`;
				}
				return style
			},
            userIcon() {
            	var img = this.info.headImg;
            	var	style = ``;
                style = `${style}background-image:url(${img});`;
            	return style
            },
            screenWidth() {
            	var	style = `width:` + this.ScreenWidth - 20 + `px;`;
            	return style
            }
		},
		props: {
			bgColor: {
				type: String,
				default: '#58b7e9'
			},
            info: {
                fuledNo: null,
                nickName: null,
                icon: null,
                motto: null,
                shareCount: null,
                fansCount: null,
                followCount: null,
                intro: null
            },
            isShowIntro: {
                type: Boolean,
                default: false
            }
		},
		methods: {
			onShowIntro() {
			    this.showIntro = !this.showIntro;
			},
			filterBr(str){
                if (str != null && str != "" && str != undefined) {
                    str = str.replace(/<br\/>/g, '\n');
                } else {
                    str = "";
                }
                return str;
			},
		}
	}
</script>

<style>
    .user-bg {
        height: 370upx; 
    }
    .user-icon {
        left: 40upx;
        top: -64upx;
        z-index: 9;
        border:solid 4rpx #FFFFFF;
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
        text-indent: 30upx;
    }
    .cu-list.menu-avatar>.cu-item .content.flex-sub-fuled {
    	width: calc(100% - 96upx - 60upx - 20upx - 50upx);
    }
</style>
