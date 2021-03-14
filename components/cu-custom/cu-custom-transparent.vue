<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
            <view class="cu-bar fixed" :style="barStyle"></view>
			<view class="cu-bar fixed" :style="captionStyle">
                <view v-if="isBack" @tap="onBackClick" class="action text-white" >
                    <text class="cuIcon-back"></text>
                    <slot v-if="scrollTop > 0.4" name="backText"></slot>
                </view>
                <view class="content text-white" :style="[{top:StatusBar + 'px'}]">
                    <slot name="content"></slot>
                </view>
                <!-- #ifdef APP-PLUS -->
                <view v-if="isDef" @tap="onDefClick" style="padding-right: 10px;">
                    <slot name="right"></slot>
                </view>
                <!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-custom-transparent',
		computed: {
			barStyle() {
                var minTran = 0.4;
                var rgba = this.rgba;
				var StatusBar= this.StatusBar;
                var transparency = this.scrollTop > 1 ? 1 : this.scrollTop;
                transparency = this.scrollTop < minTran ? minTran : transparency;
                rgba = this.scrollTop < minTran ? "0,0,0" : rgba;
				var style = `background-color: rgba(` + rgba + `,` + transparency + `);height:${StatusBar}px;top:0px;z-index: 999999;`;
				return style
			},
            captionStyle() {
                var minTran = 0;
                var rgba = this.rgba;
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
                var transparency = this.scrollTop > 1 ? 1 : this.scrollTop;
                transparency = this.scrollTop < minTran ? minTran : transparency;
				var	style = `height:${CustomBar}px;padding-top:${StatusBar}px; background-color: rgba(` + rgba + `,` + transparency + `);`;
				return style
			}
		},
		props: {
			rgba: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			isCaption: {
				type: [Boolean, String],
				default: true
			},
			isDef: {
				type: [Boolean, String],
				default: false
			},
			scrollTop: {
				type: [Number],
				default: 0
			}
		},
		methods: {
			onBackClick() {
				if (this.isDef){
					this.$emit("onBackClick");
				}else{
					uni.navigateBack({
						delta: 1
					});
				}
			},			
			onDefClick(){
				this.$emit("onDefClick");
			}
		}
	}
</script>

<style>

</style>
