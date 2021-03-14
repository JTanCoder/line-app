<template>
	<view class="page">
		<cu-custom bgColor="bg-fuled" :isBack="true" v-on:onBackClick="$util.onBack">
			<block slot="backText">返回</block>
			<block slot="content">投诉信息</block>
		</cu-custom>
		
		<view class="cu-form-group align-start margin-top" >
			<view class="title">投诉信息</view>
			<textarea maxlength="-1"  @input="textareaBInput" v-model="form.remark" :placeholder="请输入投诉信息"></textarea>
		</view>
		
		<view class="main-bg-color rounded p-3 flex align-center justify-center flex-1 margin-top" hover-class="main-bg-hover-color" @click="doSave">
			<text class="text-white font-md">提 交</text>
		</view>
	</view>
</template>

<script>
	import $time from '../../../common/free-lib/time.js'
	const db = uniCloud.database();
	export default {
		data() {
			return {
				form: {
					remark:'',
					time:''
				}
			}
		},
		onShow(){},
		onLoad(e) {
			let that = this ;
			if(!e.data){
				return;
			}
			this.form =  JSON.parse(e.data) ;
		},
		methods: {
			textareaBInput(e) {
				this.form.remark = e.detail.value ;
			},
			async doSave() {
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				this.form.time = $time.getFormatDate();
				prevPage.$vm.setData2ProInfo(this.form)
				uni.navigateBack({//返回
					delta: 1
				});
			}
		}
	}
</script>

<style>
	@import "@/common/free.css";
	@import "@/common/common.css";
	@import "@/common/free-icon.css";
	.form-image-item{
		background-color: #ffffff;
		padding: 1upx 30upx;
		display: flex;
		align-items: center;
		min-height: 100upx;
		justify-content: space-between;
	}
</style>
