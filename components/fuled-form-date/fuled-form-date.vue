<template>
	<view>
        <view class="picker text-999" @tap="dateVisible=true">
            {{dateValue}}
        </view>
        <fuled-picker
        	:visible.sync="dateVisible"
        	:mode="mode" 
        	:startYear="startYear" 
        	:endYear="endYear"
        	:value="dateValue"
        	:current="false"
        	:fields="fields"
        	@confirm="onConfirm($event,'date')"
        	@cancel="onCancel"
        	:disabled-after="false"
            ref="date"
        ></fuled-picker>
	</view>
</template>
<script>
	import dateUtil from "@/common/dateUtil.js"
    
	export default {
		name: "fuledFormDate",
		props: {
			value: {
				type: String,
				default: ""
			},
			mode: {
				type: String,
				default: "date"
			},
			fields: {
				type: String,
				default: "day"
			},
			startYear: {
				type: String,
				default: "2017"
			},
			endYear: {
				type: String,
				default: "2037"
			},
		},
		data() {
			return {
                dateVisible: false,
                selectDate: ""
			};
		},
		watch: {
            selectDate(val) {
            	this.$emit("input", val);
            }
		},
        computed: {
            dateValue() {
                var date = this.value;
                if (date == undefined || date == null || date == "") {
                    if (this.fields == "day") {
                        date = dateUtil.getDate();
                    } else {
                        date = dateUtil.getDate();
                    }
                }
                return date;
            }
        },
		created() {
            
		},
		methods: {
            onConfirm(res){
            	this.selectDate = res.value;
            },
            onCancel(){
                
            }
		}
	};
</script>
<style scoped>
    
</style>