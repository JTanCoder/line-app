<template>
	<view class="page">
		<cu-custom bgColor="bg-fuled" :isBack="true" v-on:onBackClick="$util.onBack">
			<block slot="backText">返回</block>
			<block slot="content">新增区域</block>
		</cu-custom>
		
		<view class="cu-form-group margin-top">
			<view class="title">区域名称</view>
			<m-input placeholder="请输入区域名称" v-on:input="inputChange1" v-model="form.areaInfo.areaName" name="areaName" ></m-input>
		</view>
		<view class="cu-form-group">
			<view class="title">区域负责人</view>
			<m-input placeholder="请输入区域负责人姓名" v-on:input="inputChange2" v-model="form.userInfo.userName" name="userName"></m-input>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">负责人电话</view>
			<m-input placeholder="请输入负责人电话" v-on:input="inputChange3" v-model="form.userInfo.loginName" name="loginName" ></m-input>
		</view>
		 
		<view class="main-bg-color rounded p-3 flex align-center justify-center flex-1" hover-class="main-bg-hover-color" @click="bindLogin">
			<text class="text-white font-md">提 交</text>
		</view>
	</view>
</template>

<script>
	import mInput from '../../../components/m-input.vue'
	import freeDivider from "@/components/free-ui/free-divider.vue"
	const db = uniCloud.database();
	export default {
		components: {
			mInput,
			freeDivider
		},
		data() {
			return {
				form: {
					areaInfo:{
						areaName:'',
					},
					userInfo:{
						userName: '',
						userType:'1',
						loginName:''
					}
				},
				radioItem:[{value:'1',text:'项目经理'},{value:'2',text:'施工队'}],
				prePage:false,
				user:{},
			}
		},
		onShow() {
			this.user = JSON.parse(this.$util.getStorage("user"));
		},
		methods: {
			inputChange1(value){ 
				console.log(value)
				this.form.areaInfo.areaName = value;
			},
			inputChange2(value){
				console.log(value)
				this.form.userInfo.userName = value;
			},
			inputChange3(value){
				console.log(value)
				this.form.userInfo.loginName = value;
			},
			changeInvite(e){
				this.form.userType = e.detail.value
			},
			async bindLogin() {
				let that = this ;
				if (this.form.areaInfo.areaName == '') {
					uni.showToast({
						icon: 'none',
						title: '区域名称不能为空'
					});
					return;
				}
				if (this.form.userInfo.userName == '') {
					uni.showToast({
						icon: 'none',
						title: '负责人姓名不能为空'
					});
					return;
				}
				if (this.form.userInfo.loginName.length  != 11) {
					uni.showToast({
						icon: 'none',
						title: '电话号码必须为 11 位电话号码'
					});
					return;
				}
				
				
				//this.form.loginName = this.form.userPhone ;
				uni.showLoading({
					title: '处理中...'
				})
				let userInfo = {
					userPhone:this.form.userInfo.loginName,
					userName:this.form.userInfo.userName,
					userType:'1',
					loginName:this.form.userInfo.loginName,
					avatarUrl:'',
					nickName:'',
					openid:'',
					creator:that.user._id
				}
				db.collection('line-app-user').add(userInfo).then(res=>{
					let area = {
						areaName:this.form.areaInfo.areaName,
						userId:res.result.id,
						creator:that.user._id
					}
					db.collection('line-app-area').add(area).then(r=>{
						db.collection('line-app-user').doc(res.result.id).update({
							areaId:r.result.id
						}).then(res=>{
							uni.navigateBack({
								delta:1
							});
							uni.hideLoading()
						}); 
					}).catch(err => {
						console.error(err)
					})
				}).catch(err => {
					console.error(err)
				})
				.finally(() => {
					uni.hideLoading()
				})
			},
		}
	}
</script>

<style>

</style>
