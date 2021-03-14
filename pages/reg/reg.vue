<template>
	<view class="page">
		<view class="flex align-center justify-center" style="height: 230rpx;"><text style="font-size: 50rpx;">FU LING-LOGO</text></view>
		<view class="px-3">
			<m-input type="text" class="bg-light px-3 mb-3 font" placeholder="请输入用户名" style="height: 80rpx;width: 95%;" v-model="form.username"></m-input>
			<m-input type="password" class="bg-light px-3 mb-3 font" placeholder="请输入密码" style="height: 80rpx;width: 95%;" v-model="form.password"></m-input>
			<m-input type="password" class="bg-light px-3 mb-3 font" placeholder="请输入确认密码" style="height: 80rpx;width: 95%;" v-model="form.repassword"></m-input>
			<m-input type="text" clearable v-model="form.phone" class="bg-light px-3 mb-3 font" style="height: 80rpx;width: 95%;" placeholder="请输入电话号码"></m-input>
			<m-input type="text" clearable v-model="form.email" class="bg-light px-3 mb-3 font" style="height: 80rpx;width: 95%;" placeholder="请输入邮箱"></m-input>
		</view>
		<view class="p-3 flex align-center justify-center">
			<view class="main-bg-color rounded p-3 flex align-center justify-center flex-1" hover-class="main-bg-hover-color" @click="submit">
				<text class="text-white font-md">注 册</text>
			</view>
		</view>
		<view class="flex align-center justify-center">
			<text class="text-light-muted font p-2" @click="toLogin">已有账号,去登录</text>
			<text class="text-light-muted font">|</text>
			<text class="text-light-muted font p-2">忘记密码</text>
		</view>
	</view>
</template>

<script>
import mInput from '../../components/m-input.vue';
import $H from '@/common/free-lib/request.js';
export default {
	components: {
		mInput
	},
	data() {
		return {
			form: {
				username: '',
				password: '',
				repassword: '',
				phone: '',
				email: ''
			}
		};
	},
	methods: {
		toLogin() {
			uni.navigateTo({
				url: '../login/login'
			});
		},
		submit() {
			/**
			 * 客户端对账号信息进行一些必要的校验。
			 * 实际开发中，根据业务需要进行处理，这里仅做示例。
			 */
			if (this.form.username.length < 5) {
				uni.showToast({
					icon: 'none',
					title: '账号最短为 5 个字符'
				});
				return;
			}
			if (this.form.password.length < 6) {
				uni.showToast({
					icon: 'none',
					title: '密码最短为 6 个字符'
				});
				return;
			}

			if (this.form.password != this.form.repassword) {
				uni.showToast({
					icon: 'none',
					title: '两次密码不一致'
				});
				return;
			}
			$H.post('/api/chat/user/reg', this.form, {
				token: false
			}).then(res => {
				uni.showToast({
					title: '注册成功，去登陆',
					icon: 'none'
				});
				this.toLogin();
			});
		}
	}
};
</script>

<style></style>
