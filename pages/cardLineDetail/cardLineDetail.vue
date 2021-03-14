<template>
	<view>
        <cu-custom bgColor="bg-fuled" :isBack="true" v-on:onBackClick="$util.onBack">
        	<block slot="backText">返回</block>
        	<block slot="content">{{title}}</block>
        </cu-custom>
        <fuled-user-intro :info="item" v-on:onDefClick="onSubscibe"></fuled-user-intro>
		
		<fuled-china-mobile-line-pro :title="proInfo.title" :info="item" v-on:onDefClick="saveProInfo">
			<button v-if="item.status < 4 && user.userType == 1" class="cu-btn bg-gradual-blue shadow-blur round">更新项目信息</button>
		</fuled-china-mobile-line-pro>
		
		<fuled-china-mobile-line-constr-info :title="sgInfo.title" :info="item" v-on:onDefClick="saveConstrInfo">
			<button v-if="item.status < 5 && user.userType == 2" class="cu-btn bg-gradual-blue shadow-blur round">更新施工信息</button>
		</fuled-china-mobile-line-constr-info>
		 
		<fuled-china-mobile-line :title="pjInfo.title" :domType="2" :info="item" v-on:onDefClick="saveappraisalInfo">
			<button v-if="pjInfo.slot" class="cu-btn bg-gradual-blue shadow-blur round">保存</button>
		</fuled-china-mobile-line>
		
		<fuled-china-mobile-line   :domType="3" :title="tsInfo.title" :info="item" v-on:onDefClick="savecomplaintInfo"> 
			<button v-if="tsInfo.slot" class="cu-btn bg-gradual-blue shadow-blur round">提交</button>
		</fuled-china-mobile-line>
		
		<fuled-china-mobile-line v-if="user.userType == -1"   :domType="4" :title="'投诉电话'" :info="item" >
		</fuled-china-mobile-line>
    </view>
</template>

<script>
	const db = uniCloud.database();
	var _this;
	export default {
        components: {
        },
		data() {
			return {
				title: "",
				item:{},
				proInfo:{
					title:"项目信息"
				},
                sgInfo: {
                    title: "施工信息",
					slot:false
                },
                pjInfo: {
                    title: "项目经理评价",
					slot:false
                },
                tsInfo: {
                    title: "客户评价",
					slot:false
                },
				user:this.$store.state.user.user,
			};
		},
		onShow() { 
		},
		onLoad(e) {
			_this = this;
			this.item = JSON.parse(e.data) ;
			console.log(this.item)
			this.title = "专线:"+this.item.clientName
		},
		
        methods: {
			saveProInfo(){
				this.getProInfoTitle() ;
			},
			getProInfoTitle(){
				if(this.item.status == 0){//去合同审批
					uni.navigateTo({
						url:'./line-pro-info/line-pro-info?data='+JSON.stringify(this.item.proInfo.contractInfo)
					});
				}else if(this.item.status == 1){//去设计院勘察
					uni.navigateTo({
						url:'./line-pro-info/line-pro-info?data='+JSON.stringify(this.item.proInfo.designInfo)
					});
				}else if(this.item.status == 2){//去方案审批
					uni.navigateTo({
						url:'./line-pro-info/line-pro-info?data='+JSON.stringify(this.item.proInfo.programlInfo)
					});
				}else if(this.item.status == 3){//去分配施工队
					uni.navigateTo({
						url:'./line-pro-constr-info/line-pro-constr-info?data='+JSON.stringify(this.item.proInfo.teamInfo)
					});
				}
			},
			setData2ProInfo(info){
				let dbPro = db.collection("line-app-pro")
				if(this.item.status == 0){
					this.item.proInfo['contractInfo'] = info ;
					dbPro.doc(this.item._id).update({
						status:1,
						proInfo:this.item.proInfo
					}).then(res=>{
						this.item.status = 1;
						uni.hideLoading()
					});
				}else if(this.item.status == 1){
					this.item.proInfo['designInfo'] = info ;
					dbPro.doc(this.item._id).update({
						status:2,
						proInfo:this.item.proInfo
					}).then(res=>{
						this.item.status = 2;
						uni.hideLoading()
					});
				}else if(this.item.status == 2){
					this.item.proInfo['programlInfo'] = info ;
					dbPro.doc(this.item._id).update({
						status:3,
						proInfo:this.item.proInfo
					}).then(res=>{
						this.item.status = 3;
						uni.hideLoading()
					});
				}else if(this.item.status == 3){
					this.item.proInfo['teamInfo'] = info ; 
					dbPro.doc(this.item._id).update({
						implementId:info.implementId,
						status:4,
						proInfo:this.item.proInfo
					}).then(res=>{
						this.item.status = 4;
						uni.hideLoading()
					});
				}
			},
			saveConstrInfo(){
				this.getConstrInfoTitle() ;
			},
            
			getConstrInfoTitle(){
				let constrInfo = {
					remark:'',
					fileList:[],
					constrTitle:'',
					time:'',
					constrStatus:1
				}
				uni.navigateTo({
					url:'./line-constr-info/line-constr-info?data='+JSON.stringify(constrInfo)
				});
			},
			setData2ConstrInfo(info){
				let dbPro = db.collection("line-app-pro")
				this.item.constrInfo.push(info) ; 
				dbPro.doc(this.item._id).update({
					implementId:info.implementId,
					status:info.constrStatus == '2'?5:4,
					constrInfo:this.item.constrInfo
				}).then(res=>{
					this.item.status = info.constrStatus == '2'?5:4;
					uni.hideLoading()
				});
			},
			saveappraisalInfo(info){
				info.appraisalInfo['issubmit']=1;
				uni.showLoading({mask: false});
				let dbPro = db.collection("line-app-pro")
				dbPro.doc(this.item._id).update({
					appraisalInfo:info.appraisalInfo
				}).then(res=>{
					uni.hideLoading()
				});
				this.item.appraisalInfo = info.appraisalInfo ;
				this.pjInfo.slot = false ;
			},
			onSubscibe(type) {
			    if(type == 1){
					this.sgInfo.slot = true ;
				}
				if(type == 2){
					this.pjInfo.slot = true ;
				}
				if(type == 3){
					this.tsInfo.slot = true ;
				}
			},
			savecomplaintInfo(info){
				info.complaintInfo['issubmit']=1;
				uni.showLoading({mask: false});
				let dbPro = db.collection("line-app-pro")
				dbPro.doc(this.item._id).update({
					complaintInfo:info.complaintInfo
				}).then(res=>{
					uni.hideLoading()
				});
				this.item.complaintInfo = info.complaintInfo ;
				this.tsInfo.slot = false ;
			}
        }
	}
</script>

<style>
	.page {
		height: 100vh;
	}
	.fixed {
		position: fixed;
		z-index: 99;
	}
</style>
