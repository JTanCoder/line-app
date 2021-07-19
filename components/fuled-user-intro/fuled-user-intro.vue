<template>
    <view>
        <view class="user-bg" :style="background"></view>
        <view class="bg-white">
            <view class="user-concern">
                <view class="cu-avatar xl round user-icon" :style="userIcon"></view>
				<button @tap="onDefClick2" v-if="user.userType == -1 && info.appraisalInfo.issubmit == 0 && info.status=='4' "  class="cu-btn round sm bg-yellow user-concern-but text-white">去评价</button>
            </view>
            <view class="user-name " :style="screenWidth">{{info.clientName}}</view>
            <view class="user-fuled-no text-cut" :style="screenWidth">客户电话：{{info.clientPhone}}</view>
            <view class="user-motto" :style="screenWidth">客户地址：{{info.clientAddr}}</view>
			<view class="user-motto text-cut" :style="screenWidth">预计完成时间：{{info.endDate}}</view>
			<view class="user-motto text-cut" :style="screenWidth" v-if=" info.status=='4' ">实际完成时间：{{info.okDate}}</view>
            <view class="user-share">
                <text class="text-gray margin-left-sm user-share-title">项目经理:{{info.jlList[0].userName}}</text>
                <text class="text-gray margin-left-sm user-share-title">施工队:{{info.sgList[0].userName?info.sgList[0].userName:'未分配'}}</text>
                <text class="text-gray margin-left-sm user-share-title">状态:{{getLineProStatus(info.status)}}</text>
            </view>
        </view>
        <!-- <view class="user-intro bg-gray margin-top">
        	<view class="multi-row">{{filterBr(info.intro)}}</view>
        </view> -->
    </view>
</template>

<script>
	export default {
		data() {
			return {
                btnsg:false,
				btnjl:false,
				btnts:false,
				user:this.$store.state.user.user,
				dataInfo:{},
				defImg:'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e19f9691-a059-48d3-92b5-3f37975f1344/3e7a730c-8d81-4cde-aa83-99f04c6e6105.png'
			};
		},
		name: 'fuled-user-info-card',
		computed: {
			background() {
				var img = this.info.photo;
				var style = style = `background-color: ` + this.bgColor + `;`;
				if (img) {
					style = `${style}background-image:url(`+this.defImg+`)`;
				}
				return style
			},
            userIcon() {
				if(!this.info || !this.info.contractList){
					return ;
				}
            	var img = this.info.contractList[0];
            	var	style = ``;
            	style = `${style}background-image:url(`+this.defImg+`);`;
            	return style
            },
            screenWidth() {
            	var	style = `width:` + this.ScreenWidth - 20 + `px;`;
            	return style
            }
		},
		watch:{
			info:function(newVal,oldVal){
				this.dataInfo = newVal;
			}
		},
		props: {
			bgColor: {
				type: String,
				default: '#58b7e9'
			},
            info: {}
		},
		methods: {
			onDefClick(){
				this.$emit("onDefClick",1);
			},
			onDefClick1(){
				this.$emit("onDefClick",2);
			},
			onDefClick2(){
				this.$emit("onDefClick",3);
			},
            filterBr(str){
                if (str != null && str != "" && str != undefined) {
                    str = str.replace(/<br\/>/g, '\n');
                } else {
                    str = "";
                }
                return str;
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
					return "施工完成-待确认" ;
				}
				if(status == 4){
					return "项目结束" ;
				}
			},
			getBtnText(item){
				console.log("_----")
				console.log(item)
				if(this.user.userType == '1' && item.status == 5){
					this.btnjl = true ;
					return "去评价";
				}else if(this.user.userType == '-1' && item.complaintInfo && item.complaintInfo.issubmit == 0){
					this.btnts = true ;
					return "去投诉";
				}
			}
		}
	}
</script>

<style>
    .user-bg {
        height: 240upx; 
    }
    .user-icon {
        left: 40upx;
        top: -64upx;
        z-index: 999;
        border:solid 4rpx #FFFFFF;
    }
    .user-concern {
        height: 40px; 
        width: 100%;
    }
    .user-concern-but {
        float: right;
        right: 20upx;
        top: 14upx;
    }
    .user-name {
        font-size: 40upx;
        font-weight: 900;
        color: #333333;
        line-height: 50upx;
        padding: 0 0 0 40upx;
    }
    .user-fuled-no {
        font-size: 28upx;
        color: #999999;
        line-height: 50upx;
        padding: 0 0 0 40upx;
    }
    .user-motto {
        font-size: 28upx;
        color: #333333;
        line-height: 50upx;
        padding: 0 0 0 40upx;
    }
    .user-share {
        padding: 10upx 10upx 10upx 40upx;    
    }
    .user-share-title {
        font-size: 24upx;
    }
    .user-intro {
        padding: 10upx 40upx 10upx 40upx;
        /* text-indent: 30upx; */
    }
</style>
