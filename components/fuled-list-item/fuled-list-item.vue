<template>
    <view class="fuled-list-item" @tap="onClick" :class="{'fuled-list-item--first':isFirstChild}">
    	<view class="fuled-list-item__container">
    		<view v-if="thumb" class="uni-list-item__icon">
    			<image :src="thumb" class="uni-list-item__icon-img" />
    		</view>
    		<view v-else-if="showExtraIcon" class="uni-list-item__icon">
    			<fuled-icons :color="extraIcon.color" :size="extraIcon.size" :type="extraIcon.type" class="uni-icon-wrapper" />
    		</view>
    		<view class="fuled-list-item__content">
    			<slot />
    			<text class="fuled-list-item__content-title">{{ title }}</text>
    			<text v-if="note" class="fuled-list-item__content-note">{{ note }}</text>
    		</view>
    		<view v-if="type=='text'" class="fuled-list-item__extra">
    			<text v-if="rightText" class="fuled-list-item__extra-text text-cut" style="width: 200px;">{{rightText}}</text>
    			<fuled-badge v-if="showBadge" :type="badgeType" :text="badgeText" />
    			<switch v-if="showSwitch" :disabled="disabled" :checked="switchChecked" @change="onSwitchChange" />
    			<slot name="right"></slot>
    			<fuled-icons v-if="showArrow" class="fuled-icon-wrapper" color="#bbb" type="arrowright" />
    		</view>
    		<view v-else class="fuled-list-item__extra">
                <text class="text-999 multi-row" style="width: 200px;">
                    {{rightText}}
                </text>
                <fuled-icons v-if="showArrow" class="fuled-icon-wrapper" color="#bbb" type="arrowright" />
    		</view>
    	</view>
    </view>
</template>

<script>
	export default {
        name:"fuledNumberBox",
        props: {
            title: {
                // 列表标题
            	type: String,
            	default: ''
            },
            note: {
                // 列表描述
            	type: String,
            	default: ''
            },
            name: {
                // 属性名称
                type: String,
                default: null
            },
            type: {
                // 数据类型
                type: String,
                default: "text"
            },
            maxlength: {
                // 数据长度
                type: [Number,String],
                default: 50
            },
            placeholder: {
                // 占位符
                type: String,
                default: "请输入"
            },
            tag: {
                // 标签
                type: String,
                default: ""
            },
            checkType: {
                // 检查类型
                type: String,
                default: "notnull"
            },
			checkRule: {
                // 规则
			    type: String,
			    default: ""
			},
			errorMsg: {
                // 消息
			    type: String,
			    default: ""
			},
            disabled: {
            	// 是否禁用
            	type: [Boolean, String],
            	default: false
            },
            showArrow: {
            	// 是否显示箭头
            	type: [Boolean, String],
            	default: true
            },
            showBadge: {
            	// 是否显示数字角标
            	type: [Boolean, String],
            	default: false
            },
            showSwitch: {
            	// 是否显示Switch
            	type: [Boolean, String],
            	default: false
            },
            switchChecked: {
            	// Switch是否被选中
            	type: [Boolean, String],
            	default: false
            },
            badgeText: {
            	// badge内容
            	type: String,
            	default: ''
            },
            badgeType: {
            	// badge类型
            	type: String,
            	default: 'success'
            },
            // value: {
            // 	// 右侧文字内容
            // 	type: String,
            // 	default: ''
            // },
            rightText: {
            	// 右侧文字内容
            	type: String,
            	default: ''
            },
            thumb: {
            	// 缩略图
            	type: String,
            	default: ''
            },
            showExtraIcon: {
            	// 是否显示扩展图标
            	type: [Boolean, String],
            	default: false
            },
            editable: {
            	// 可编辑
            	type: [Boolean, String],
            	default: true
            },
            extraIcon: {
            	type: Object,
            	default () {
            		return {
            			type: 'contact',
            			color: '#000000',
            			size: 20
            		}
            	}
            }
        },
		inject: ['list'],
		data() {
			return {
                isFirstChild: false,
                editInfo: {
                    title: "",
                    name: "",
                    value: "",
                    type: "",
                    maxlength: 50,
                    placeholder: "",
                    tag: "",
                    checkType: "",
                    checkRule: "",
                }
			};
		},
		mounted() {
			if (!this.list.firstChildAppend) {
				this.list.firstChildAppend = true
				this.isFirstChild = true
			}
		},
		methods: {
            onClick() { //自定义事件
                if (this.editable) {
                    this.editInfo.title = this.title;
                    this.editInfo.name = this.name;
                    this.editInfo.value = this.rightText;
                    this.editInfo.maxlength = this.maxlength;
                    this.editInfo.placeholder = this.placeholder;
                    this.editInfo.tag = this.tag;
                    this.editInfo.type = this.type;
                    this.editInfo.checkType = this.checkType;
                    this.editInfo.checkRule = this.checkRule;
                    let info = JSON.stringify(this.editInfo);
                    this.$emit("onClick", info);
                }
            }
		}
	}
</script>

<style>
    .fuled-list-item {
        background-color: #ffffff;
        display: flex;
        position: relative;
        align-items: center;
        min-height: 100upx;
        justify-content: space-between;
		border-top-color: #e5e5e5;
		border-top-style: solid;
		border-top-width: 0.5px;
    }
    .fuled-list-item--first {
    	border-top-width: 0px;
    }
    
    .fuled-list-item__icon {
    	margin-right: 18rpx;
    	/* #ifndef APP-NVUE */
    	display: flex;
    	/* #endif */
    	align-items: center;
    	height: 100%;
    	justify-content: center;
    	max-width: 100%;
    }
    
    .fuled-list-item__icon-img {
    	height: 26px;
    	width: 26px;
    }
    
    .fuled-list-item__container {
    	position: relative;
    	/* #ifndef APP-NVUE */
    	display: flex;
    	/* #endif */
    	flex: 1;
    	flex-direction: row;
    	justify-content: space-between;
    	align-items: center;
        padding-left: 15px;
        padding-right: 15px;
    }
    
    .fuled-list-item__content {
    	/* #ifndef APP-NVUE */
    	display: flex;
    	/* #endif */
    	flex: 1;
    	overflow: hidden;
    	flex-direction: column;
    	color: #3b4144;
    }
    .fuled-list-item__content-title {
    	font-size: 14px;
    	color: #3b4144;
    	overflow: hidden;
    }
    
    .fuled-list-item__content-note {
    	margin-top: 6rpx;
    	color: #999;
    	font-size: 12px;
    	overflow: hidden;
    }
    
    .fuled-list-item__extra {
    	/* #ifndef APP-NVUE */
    	display: flex;
    	/* #endif */
    	flex-direction: row;
    	justify-content: flex-end;
    	align-items: center;
    }
    .fuled-list-item__icon {
    	margin-right: 18rpx;
    	flex-direction: row;
    	justify-content: center;
    	align-items: center;
    }
    
    .fuled-list-item__icon-img {
    	height: 26px;
    	width: 26px;
    }
    .fuled-list-item__extra-text {
    	color: #999;
    	font-size: 14px;
    }
    
    /* 文字截断 */
    .text-cut {
        /* width:calc(100% - 180upx) !important; */
    	text-overflow: ellipsis;
    	white-space: nowrap;
    	overflow: hidden;
        text-align: right;
    }
    
</style>
