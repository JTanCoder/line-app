import $C from './config.js'
export default {
    // 获取存储列表数据
    getStorage(key){
        let data = null;
		// #ifdef H5
		if($C.env === 'dev'){
		    data = window.sessionStorage.getItem(key)
		} else {
		    data = uni.getStorageSync(key)
		}
		// #endif
        // #ifndef H5
        data = uni.getStorageSync(key)
        // #endif
        return data
    },
    // 设置存储
    setStorage(key,data){
        // #ifdef H5
        if($C.env === 'dev'){
            return window.sessionStorage.setItem(key,data)
        } else {
            return uni.setStorageSync(key,data)
        }
        // #endif
		// #ifndef H5
		return uni.setStorageSync(key,data)
		// #endif
    },
    // 删除存储
    removeStorage(key){
        // #ifdef H5
        if($C.env === 'dev'){
            return window.sessionStorage.removeItem(key);
        } else {
            return uni.removeStorageSync(key)
        }
        // #endif
		// #ifndef H5
		return uni.removeStorageSync(key)
		// #endif
    },
	toLoginPage(isRetPre){
		if(isRetPre){
			uni.navigateTo({
				url:"/pages/login/login?prePage=true"
			});
		}else{
			uni.navigateTo({
				url:"/pages/login/login?prePage=false"
			});
		}
	},
	sortBykey(ary, key) {
	  return ary.sort(function (a, b) {
	    let x = a[key]
	    let y = b[key]
	    return ((x < y) ? -1 : (x > y) ? 1 : 0)
	  })
	},
	 onBack(){
		 console.log("======back=====")
		uni.navigateBack({
			delta: 1
		});
	}
	
}