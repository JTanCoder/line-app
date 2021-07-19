<template>
	<view class="page">
		<cu-custom bgColor="bg-fuled" :isBack="true" v-on:onBackClick="$util.onBack">
			<block slot="backText">返回</block>
			<block slot="content">新增承包商</block>
		</cu-custom>
		
		<view class="cu-form-group margin-top">
			<view class="title">承包商名称</view>
			<m-input placeholder="请输入承包商名称" v-on:input="inputChange1" v-model="form.conpInfo.conpName" name="areaName" ></m-input>
		</view>
		<view class="cu-form-group">
			<view class="title">承包商负责人</view>
			<m-input placeholder="请输入承包商负责人姓名" v-on:input="inputChange2" v-model="form.userInfo.userName" name="userName"></m-input>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">负责人电话</view>
			<m-input placeholder="请输入负责人电话" v-on:input="inputChange3" v-model="form.userInfo.loginName" name="loginName" ></m-input>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">管理区域</view>
			<view class="action">
				<view class="cu-tag round bg-orange light"  v-for="(item,index) in  form.areaList" :key="index">{{item.areaName}}</view>
			</view>
			<text class='cuIcon-searchlist text-orange' data-target="menuModal" @tap="showModal"></text>
		</view>
		 
		 <view class="cu-modal" :class="modalName=='menuModal'?'show':''" @tap="hideModal">
		 	<view class="cu-dialog" @tap.stop>
		 		<view class="cu-list menu text-left solid-top">
		 			<view class="cu-item" v-for="(item,index) in areas" :key="index">
		 				<view class="content">
		 					<text class="text-grey">{{item.areaName}}</text>
		 				</view>
		 				<view class="action">
		 					<switch @change="changeArea" :id="item._id"  ></switch>
		 				</view>
		 			</view>
					<view class="main-bg-color rounded p-3 flex align-center justify-center flex-1" hover-class="main-bg-hover-color" @click="hideModal">
						<text class="text-white font-md">确 定</text>
					</view>
		 		</view>
		 	</view>
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
					conpInfo:{
						conpName:""
					},
					areaList:[
					],
					userInfo:{
						userName: '',
						userType:'2',
						loginName:'',
					}
				},
				areas:[],
				modalName: null,
				radioItem:[{value:'1',text:'项目经理'},{value:'2',text:'施工队'}],
				prePage:false,
				user:{},
			}
		},
		onShow() {
			let that = this ;
			this.user = JSON.parse(that.$util.getStorage("user"));
			db.collection("line-app-area").where({creator:this.user._id}).get()
			.then(res => {
				that.areas = res.result.data
			}).catch(err => {
				console.error(err)
			}).finally(() => {
				uni.hideLoading()
			});
		},
		methods: {
			changeArea(e){ 
				if(e.target.value){
					this.form.areaList.push(this.getSelectItem(e.target.id))
					console.log(this.form.areaList)
				}else{
					this.delUnSelectItem(e.target.id)
				}
			},
			getSelectItem(id){
				console.log("add")
				for(let i = 0;i<this.areas.length;i++){
					if(id === this.areas[i]._id){
						return this.areas[i] ;
					}
				}
			},
			delUnSelectItem(id){
				console.log("del")
				for(let i = 0;i<this.form.areaList.length;i++){
					if(id === this.form.areaList[i]._id){
						this.form.areaList.splice(i,1);
						i--;
					}
				}
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			inputChange1(value){ 
				console.log(value)
				this.form.conpInfo.conpName = value;
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
				if (this.form.conpInfo.conpName == '') {
					uni.showToast({
						icon: 'none',
						title: '承包商名称不能为空'
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
				if (this.form.areaList.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '承包商管理区域不能为空'
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
					userType:'2',
					loginName:this.form.userInfo.loginName,
					avatarUrl:'',
					nickName:'',
					openid:'',
					creator:this.user._id
				}
				db.collection('line-app-user').add(userInfo).then(res=>{
					let conp = {
						conpName:this.form.conpInfo.conpName,
						userId:res.result.id,
						creator:this.user._id,
						areaList:this.form.areaList
					}
					db.collection('line-app-conpany').add(conp).then(res=>{
						uni.navigateBack({
							delta:1
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
