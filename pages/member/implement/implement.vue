<template>
	<view class="page">
		<cu-custom bgColor="bg-fuled" :isBack="true" v-on:onBackClick="$util.onBack">
			<block slot="backText">返回</block>
			<block slot="content">新增施工队</block>
		</cu-custom>
		<view class="cu-form-group">
			<view class="title">负责人姓名</view>
			<m-input placeholder="请输入负责人姓名" v-model="form.userName" name="userName"></m-input>
		</view>
		<view class="cu-form-group">
			<view class="title">负责人电话</view>
			<m-input placeholder="请输入负责人电话" v-model="form.userPhone" name="userPhone" ></m-input>
		</view>
		<view class="cu-form-group">
			<view class="title">施工队别称</view>
			<m-input placeholder="请输入施工队别称" v-model="form.implementName" name="implementName"></m-input>
		</view>
		<view class="cu-form-group">
			<view class="title">施工队地址</view>
			<m-input placeholder="请输入施工队地址" v-model="form.implementAddr" name="implementAddr" ></m-input>
		</view>
		<!-- <view class="cu-form-group">
			<view class="title">施工队账号</view>
			<m-input placeholder="请输入施工队账号" v-model="form.loginName" name="loginName" ></m-input>
		</view>
		<view class="cu-form-group">
			<view class="title">施工队密码</view>
			<m-input type="password"  placeholder="请输入施工队账号密码"  v-model="form.password" name="password"></m-input>
		</view> -->
		 
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
					userPhone:'',
					userName: '',
					password: '',
					userType:'3',
					avatarUrl:"",
					nickName:"",
					loginName:'',
					openid:""
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
			changeInvite(e){
				this.form.userType = e.detail.value
			},
			async bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 */
				if (this.form.userPhone.length  != 11) {
					uni.showToast({
						icon: 'none',
						title: '账号必须为 11 位电话号码'
					});
					return;
				}
				this.form.loginName = this.form.userPhone ;
				if (this.form.userName == '') {
					uni.showToast({
						icon: 'none',
						title: '负责人名称不能为空'
					});
					return;
				}
				
				if (this.form.implementName == '') {
					uni.showToast({
						icon: 'none',
						title: '施工队称不能为空'
					});
					return;
				}
				 this.form['creator'] = this.user._id
				
				uni.showLoading({
					title: '处理中...'
				})
				uniCloud.callFunction({
					name: 'add',
					data: this.form
				}).then((res) => {
					uni.hideLoading()
					/* uni.showModal({
						content: `成功添加一条数据，文档id为：${res.result.id}`,
						showCancel: false
					}) */
					uni.switchTab({
						url:"../member"
					})
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `添加数据失败，错误信息为：${err.message}`,
						showCancel: false
					})
				})
			},
		}
	}
</script>

<style>

</style>
