<template>
	<view>
        <view class="picker text-999" @tap="selectorVisible=true">
            {{selector.label}}
        </view>
        <fuled-picker
        	:visible.sync="selectorVisible"
        	mode="selector"
        	:value="selector.label"
        	default-type="name"
        	:default-props="defaultProps"
        	:options="options"
        	@confirm="onConfirm($event)"
        	@cancel="onCancel"
        	ref="selector"
        ></fuled-picker>
	</view>
</template>
<script>
	export default {
		name: "fuledFormSelect",
		props: {
			value: {
				type: String,
				default: null
			},
			defaultText: {
				type: String,
				default: '请选择'
			},
            options: {
                type: Array
            }
		},
		data() {
			return {
                selectorVisible: false,
                selector: {
                    value: "",
                    label: ""
                },
                defaultProps:{
                    label: "name",
                    value: "id"
                },
			};
		},
		watch: {
            selectValue(val) {
            	this.$emit("input", val);
            }
		},
        computed: {
            selectValue() {
                return this.selector.value;
            }
        },
		created() {
            var value = this.value;
            if (value != undefined && value != null && value != "") {
                this.selector.value = value;
                this.selector.label = this.getName(value);
            } else {
                this.selector.label = this.defaultText;
            }
		},
		methods: {
            getIndex(){
                 for(let i in this.range){
                     if (this.range[i].id == this.value) {
                         return i;
                     }
                 }
            },
            getName(id){
                for(let i in this.options){
                    if (this.options[i].id == id) {
                        return this.options[i].name;
                    }
                }
            },
            onConfirm(res){
            	this.selector.value = res.obj.id;
            	this.selector.label = res.obj.name;
            },
            onCancel(){
                
            }
		}
	};
</script>
<style scoped>
    
</style>