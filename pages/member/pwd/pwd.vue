<template>
	<view class="page">
		<cu-custom bgColor="bg-fuled" :isBack="true" v-on:onBackClick="$util.onBack">
			<block slot="backText">返回</block>
			<block slot="content">密码修改</block>
		</cu-custom>
		<view class="cu-form-group margin-top">
			<view class="title">旧密码</view>
			<m-input placeholder="请输入旧密码" v-model="form.oldpwd" type="password" name="oldpwd" ></m-input>
		</view>
		<view class="cu-form-group">
			<view class="title">新密码</view>
			<m-input placeholder="请输入新密码" v-model="form.newpwd" type="password" name="newpwd"></m-input>
		</view>
		
		<view class="main-bg-color rounded p-3 flex align-center justify-center flex-1" hover-class="main-bg-hover-color" @click="doSave">
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
			freeDivider,
		},
		data() {
			return {
				form: {
					newpwd:'',
					oldpwd: '',
					user:{},
				}
			}
		},
		onShow(){
			this.user = JSON.parse( this.$util.getStorage("user"));
			 
		},
		onLoad(e) { 
			this.user = JSON.parse( this.$util.getStorage("user"));
		},
		methods: {
			async doSave() {
				console.log(this.user)
				if(this.form.oldpwd === ''){
					uni.showToast({
						icon:'none',
						title:'请输入旧密码'
					})
					return ;
				}
				if(this.form.newpwd === ''){
					uni.showToast({
						icon:'none',
						title:'请输入新密码'
					})
					return ;
				}
				if(this.user.password != this.form.oldpwd){
					uni.showToast({
						icon:'none',
						title:'旧密码错误'
					})
					return ;
				}
				
				uni.showLoading({
					title: '处理中...'
				})
				let newObj = JSON.parse(JSON.stringify(this.form));
				db.collection('line-app-user').doc(this.user._id)
				.update({
					password:this.form.newpwd
				}).then(res=>{
					uni.hideLoading();
					this.loginOut();
				}).catch(err => {
					console.error(err)
				})
				.finally(() => {
					uni.hideLoading()
				})
				
			},
			loginOut(){
				this.$store.dispatch('logout',{});
				uni.clearStorageSync();  
				this.$forceUpdate(); 
				uni.navigateTo({
					url:"../../home/home"
				})
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
