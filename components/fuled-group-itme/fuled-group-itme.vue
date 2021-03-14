<template>
    <view class="fuled">
        <view class="cu-list menu padding-top-sm" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
        	<view v-for="(item,index) in list" :key="index" class="cu-item" :class="menuArrow?menuIcon:''">
        		<view class="content">
        			<text class="text-fuled" :class="item.icon"></text>
        			<text class="text-black">{{item.title}}</text>
        		</view>
        	</view>
        </view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
                menuBorder: true,
                menuCard: false,
                menuArrow: true
			};
		},
		name: 'fuled-group-itme',
		computed: {
            
		},
		props: {
            menuIcon: {
              type: String,
                default:"arrow"
            },
            list: {
                type: Array
            }
		},
		methods: {
            
		}
	}
</script>

<style>
    .fuled .cu-list.grid.no-border {
        padding: 0px;
    }
    .fuled .cu-list.grid>.cu-item [class*=cuIcon] {
        margin-top: 3px;
        font-size: 26px;
    }
    .fuled .cu-list.grid>.cu-item uni-text {
        margin-top: 0px;
    }
    .fuled .cu-item.name {
        color: #333333;
    }
    .fuled .cu-item.tag {
        font-size: 12px !important;
        line-height: 18px !important;
    }
</style>
