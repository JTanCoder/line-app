<template name="find">
	<view>
       <cu-custom bgColor="bg-fuled" :isBack="false"  >
			<block slot="content">项目</block>
       </cu-custom>
	   <view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
	   	<view class="search-form round">
	   		<text class="cuIcon-search"></text>
	   		<input type="text" placeholder="输入搜索的关键词" v-model="searchInfo" confirm-type="search"></input>
	   	</view>
	   	<view class="action">
	   		<button class="cu-btn bg-gradual-green shadow-blur round" @click="searchPros">搜索</button>
	   	</view>
	   </view>
        <view class="cu-list menu-avatar" style="margin-top: 90rpx;">
        	<view class="cu-item" :style="[{height:'250rpx'}]" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in cardList" :key="index"
        	 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd"  :data-target="'move-box-' + index">
        		<view class="cu-avatar round lg " :style="[{backgroundImage:'url('+defImg+')'}]"></view>
        		<view class="content" @click="toProDetail(item)">
        			<view class="text-grey "><p class="text-cut-v2">专线名称:{{item.clientName}}</p></view>
        			<view class="text-gray text-sm text-cut">
        				<text class="cuIcon-infofill  margin-right-xs ">客户地址:</text> {{item.clientAddr}}
					</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill  margin-right-xs">客户电话:</text> {{item.clientPhone}}
					</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill  margin-right-xs">完成时间:</text> {{item.endDate}}
					</view>
					<!-- <view class="text-gray text-sm">
						<text class="cuIcon-infofill  margin-right-xs"></text> {{item.clientPhone}}
					</view> -->
        		</view>
        		<view class="action ">
        			<view class="text-grey text-xs">状态</view>
        			<view class="cu-tag round bg-grey sm  pr-3">{{getLineProStatus(item.status)}}</view>
        		</view>
        		<view v-if="user.userType=='2' && item.status == 0" class="move">
        			<view class="bg-grey" @click="editLinePro(item)">编辑</view>
        			<view class="bg-red" @click="delLinePro(item)">删除</view>
        		</view>
        	</view>
        </view>
        <!-- <fuled-card v-for="(item,index) in cardList" :key="index" :index="index" :info="item" :url="'../cardLineDetail/cardLineDetail'"></fuled-card> -->
    </view>
</template>

<script>
	var _this;
	const db = uniCloud.database();
	export default {
		name: "find",
        components: {
        },
		data() {
			return {
				CustomBar: this.CustomBar,
				scrollTop: 0,
				cardCur: 0,		
				dotStyle: true,
                cardList: [],
				listTouchStart: 0,
				listTouchDirection: null,
				modalName: null,
				user:{},
				searchInfo:"",
				defImg:'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e19f9691-a059-48d3-92b5-3f37975f1344/3e7a730c-8d81-4cde-aa83-99f04c6e6105.png'
			};
		},
		onShow() {
			this.user = JSON.parse( this.$util.getStorage("user"));
            this.getIndexData("");
		},
		
		onLoad() {
			this.user = JSON.parse( this.$util.getStorage("user"));
			this.getIndexData("");
		},
		
        onPageScroll(obj) {
            _this.scrollTop = parseInt(obj.scrollTop) / 100;
        },
        methods: {
			searchPros(){
				this.getIndexData(this.searchInfo);
			},
			getIndexData(info){
				_this = this;
				let condition = {};
				if(this.user.userType == '2'){
					condition = {
						creator:this.user.loginName
					}
				}else if(this.user.userType == '0'){
					condition = {}
				}else if(this.user.userType == '3'){
					condition = {
						implementId:this.user._id
					}
				}else if(this.user.userType == '1'){
					condition = {
						areaId:this.user.areaId,
						status:{$in:[0,1,2,3]},
					}
				}
				if(info != null && info != "" && info != undefined){
					condition['clientName'] = new RegExp(info, 'i') ;
				}
				const dbCmd = db.command
				var $ = db.command.aggregate
				let res = db.collection("line-app-pro").aggregate()
				.match(condition)
				.lookup({
				  from: 'line-app-user',
				  let: {
				    pro_creator: '$creator'
				  },
				  pipeline: $.pipeline()
				    .match(dbCmd.expr($.and([
						$.eq(['$loginName', '$$pro_creator']),
				    ])))
				    .done(),
				  as: 'jlList',
				})
				.lookup({
				  from: 'line-app-user',
				  let: {
				    pro_implementId: '$implementId'
				  },
				  pipeline: $.pipeline()
				    .match(dbCmd.expr($.and([
				      $.eq(['$_id', '$$pro_implementId'])
				    ])))
				    .done(),
				  as: 'sgList',
				})
				.end()
				.then(res => {
						_this.cardList = res.result.data ;
						console.log(_this.cardList)
						// res.result.data.map((item)=>{
						// 	that.picker.push(item.implementName);
						// 	that.pickerData.push(item);
						// });
					}).catch(err => {
						console.error(err)
					})
					.finally(() => {
						uni.hideLoading()
					})
			},
        	cardSwiper(e) {
        		this.cardCur = e.detail.current
        	},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			toProDetail(item){
				uni.navigateTo({
					url:'../cardLineDetail/cardLineDetail?data='+JSON.stringify(item)
				})
			},
			getLineProStatus(status){
				if(status == 0){
					return "新建-待组网" ;
				}
				if(status == 1){
					return "待分配施工队" ;
				}
				if(status == 2){
					return "施工中" ;
				}
				if(status == 3){
					return "待确认" ;
				}
				if(status == 4){
					return "项目结束" ;
				}
			},
			delLinePro(item){
				let that = this ;
				uni.showLoading({
					title: '处理中...'
				})
				db.collection('line-app-pro').doc(item._id).remove().then(res=>{
					that.getIndexData();
					uni.hideLoading()
				})
			},
			editLinePro(item){
				uni.navigateTo({
					url:'../member/linePro/linePro?data='+JSON.stringify(item)
				})
			},
        }
	}
</script>

<style>
     
</style>
