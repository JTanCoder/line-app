<template>
    <view class="fuled">
        <view class="cu-list menu padding-top-sm" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
        	<view class="cu-item" :class="menuArrow?menuIcon:''">
        		<view class="content">
        			<text class="cuIcon-titles text-fuled"></text>
        			<text class="text-black">{{title}}</text>
        		</view>
        	</view>
            <view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
                <view class="cu-item" @click="navItemClick(item)" v-for="(item,index) in list" :key="index" v-if="index<gridCol*2">
                    <view :class="[item.icon,item.color]">
                        <view class="cu-tag badge" v-if="item.badge!=0">
                            <block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
                        </view>
                    </view>
                    <text class="cu-item name">{{item.name}}</text>
                    <text class="cu-item tag">{{item.tag}}</text>
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
                menuArrow: true,
				gridBorder: false,
			};
		},
		name: 'fuled-group-list',
		computed: {
            
		},
		props: {
            gridCol: {
                type: [Number],
                default: 4
            },
            title: null,
            menuIcon: {
              type: String,
                default:"arrow"
            },
            list: {
                type: Array
            }
		},
		methods: {
            navItemClick(item){
            	uni.navigateTo({
            		url:item.url
            	})
            }
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
