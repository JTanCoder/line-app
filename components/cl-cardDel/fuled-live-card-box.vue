<template>
	<view class="cardBox">
		<slot name="content"></slot>
	</view>
</template>

<script>
	export default{ 
		props:{
			src:{
				type:String,
				default:''
			},
			number:{
				type:Number,
				default:0
			},
			name:{
				type:String,
				default:''
			},
			sex:{
				type:Number,
				default:0
			},
			constellation:{
				type:String,
				default:''
			},
			address:{
				type:String,
				default:''
			},
			old:{
				type:Number,
				default:18
			}
		},
		data(){
			return{
				loveAnimation:{0:{}},
				loatheAnimation:{0:{}},
				loveAni:null,
				loatheAni:null
			}
		},
		mounted() {
			//touch移动喜欢动画
			this.loveAni = uni.createAnimation({
				duration:0
			});
			//touch移动不喜欢动画
			this.loatheAni = uni.createAnimation({
				duration:0
			});
		},
		methods:{
			clearAnimation(){
				this.loveAnimation[0] = this.loveAni.export()
				this.loatheAnimation[0] = this.loatheAni.export()
			},
			_back(){
				//touch移动喜欢动画
				this.loveAni = uni.createAnimation({
					duration:200
				});
				//touch移动不喜欢动画
				this.loatheAni = uni.createAnimation({
					duration:200
				});
				this.loveAni.opacity( 0 ).step()
				this.loveAnimation[0] = this.loveAni.export()
				this.loatheAni.opacity( 0 ).step()
				this.loatheAnimation[0] = this.loatheAni.export()
			},
			moveRight(ratio){
				this.loveAni.opacity( 0.3 + 0.7*ratio ).step()
				this.loveAnimation[0] = this.loveAni.export()
				this.loatheAni.opacity( 0 ).step()
				this.loatheAnimation[0] = this.loatheAni.export()
			},
			moveLeft(ratio){
				this.loveAni.opacity( 0 ).step()
				this.loveAnimation[0] = this.loveAni.export()
				this.loatheAni.opacity( 0.3 + 0.7*ratio ).step()
				this.loatheAnimation[0] = this.loatheAni.export()
			},
			moveCenter(){
				this.loveAni.opacity( 0.3 ).step()
				this.loveAnimation[0] = this.loveAni.export()
				this.loatheAni.opacity( 0.3 ).step()
				this.loatheAnimation[0] = this.loatheAni.export()
			}
		},
		watch:{
			cardData(newVal){
				console.log(newVal)
				this.item = newVal
			}
		}
	}
</script>

<style lang="scss" scoped>
	@font-face {font-family: "iconfont";
	  src:  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2');
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 12px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	
	.icon-v:before {
	  content: "\e670";
	}
	
	.icon-male:before {
	  content: "\e600";
	}
	
	.icon-wujiaoxing1:before {
	  content: "\e602";
	}
	
	.icon-chacha1:before {
	  content: "\e646";
	}
	
	.icon-genwozou:before {
	  content: "\e61d";
	}
	
	.icon-xinaixin:before {
	  content: "\e601";
	}
	
	.icon-tupian1:before {
	  content: "\e718";
	}
	
	.icon-xingbie-nv:before {
	  content: "\e677";
	}
	
	.cardBox{
		position:relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #fff;
		border-radius: 20rpx;
		border: 1px solid #353848;
		
	}
</style>
