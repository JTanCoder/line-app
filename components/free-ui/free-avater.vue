<template>
	<image :src="src ? src : '/static/images/userpic.png'" :mode="getMode" :style="getStyle" :class="type" @click="clickEvent"></image>
</template>

<script>
	export default {
		props: {
			size:{
				type:[String,Number],
				default:90
			},
			src: {
				type: String,
				default: ""
			},
			mode: {
				type: String,
				default: ""
			},
			type:{
				type:String,
				default:"rounded"
			},
			clickType:{
				type:String,
				default:"none"
			}
		},
		computed: {
			getStyle() {
				return `width: ${this.size}px;height: ${this.size}px;`
			},
			getMode(){
				console.log(this.mode);
				return `${this.mode}` ;
			}
		},
		methods: {
			clickEvent() {
				switch (this.clickType){
					case 'navigate':
					uni.navigateTo({
						url: '/pages/mail/user-base/user-base'
					});
						break;
					default:
					this.$emit('click')
						break;
				}
			}
		},
	}
</script>

<style>
</style>
