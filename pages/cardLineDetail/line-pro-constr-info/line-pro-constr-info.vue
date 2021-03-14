<template>
	<view class="page">
		<cu-custom bgColor="bg-fuled" :isBack="true" v-on:onBackClick="$util.onBack">
			<block slot="backText">返回</block>
			<block slot="content">{{form.title}} 信息</block>
		</cu-custom>
		
		<view class="cu-form-group align-start margin-top" >
			<view class="title">描述</view>
			<textarea maxlength="-1"  @input="textareaBInput" v-model="form.remark" :placeholder="'请输入'+form.title+'描述'"></textarea>
		</view>
		
		<view class="cu-form-group">
			<view class="title">选择施工队</view>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					{{index>-1?picker[index]:'超出部分以 ... 显示'}}
				</view>
			</picker>
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
					remark: "",
					title:'',
					implementId:'',
					time:''
				},
				index:-1,
				picker: [],
				pickerData: [],
			}
		},
		onShow(){
			this.getUserType2();
		},
		onLoad(e) {
			let that = this ;
			if(!e.data){
				return;
			}
			this.form =  JSON.parse(e.data) ;
			//console.log(this.form)
			
		},
		methods: {
			getUserType2(){
				let that = this ;
				db.collection("line-app-user").where({userType:'2'}).get()
				.then(res => {
					that.picker = [];
					that.pickerData= [];
					res.result.data.map((item)=>{
						that.picker.push(item.implementName);
						that.pickerData.push(item);
					});
					if(that.form.implementId){
						that.setPickerIndex();
					}
				}).catch(err => {
					console.error(err)
				}).finally(() => {
					uni.hideLoading()
				});
			},
			setPickerIndex(){
				this.pickerData.map((item,i)=>{
					if(this.form.implementId == item._id){
						this.index = i ;
					}
				})
			},
			PickerChange(e) {
				this.index = e.detail.value
				this.form.implementId = this.pickerData[this.index]._id
			},
			textareaBInput(e) {
				this.form.remark = e.detail.value ;
			},
			async doSave() {
				if(this.form.remark === ''){
					uni.showToast({
						icon:'none',
						title:'请输入描述'
					})
					return ;
				}
				if(this.form.implementId === ''){
					uni.showToast({
						icon:'none',
						title:'请选择您要指定的施工队'
					})
					return ;
				}
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				this.form.time = $time.getFormatDate();
				this.form.issubmit = 1 ;
				prevPage.$vm.setData2ProInfo(this.form)
				uni.navigateBack({//返回
					delta: 1
				});
			},
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
