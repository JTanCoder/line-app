import $U from '@/common/free-lib/util.js';
import $H from '@/common/free-lib/request.js';
import $C from '@/common/free-lib/config.js';
import Chat from '@/common/free-lib/chat.js';
export default {
	state:{
		user:null,
		wxUser:false,
		bindUser:false,
		apply:{
			rows: [],
			count: 0
		},
		
		mailList:[],
		
		chat:null,
		
		// 会话列表
		chatList:[],
		
		// 总未读数
		totalNoreadnum:0,
		
		notice:{
			avatar:"",
			user_id:0,
			num:0
		}
	},
	mutations:{
		updateUser(state,{ k,v }){
			if(state.user){
				state.user[k] = v
				$U.setStorage('user',JSON.stringify(state.user))
			}
		}
	},
	actions:{
		// 登录后处理
		login({ state,dispatch },user){
			state.user = user ;
			state.bindUser = true
			// 存储到本地存储中
			$U.setStorage('user',JSON.stringify(user))
			$U.setStorage('userPhone',user.loginName)
			$U.setStorage('userType',user.userType)
			
		},
		// 登录后处理
		loginwx({ state,dispatch },wxUser){
			state.wxUser = true 
			// 存储到本地存储中
			$U.setStorage('avatarUrl',wxUser.wxHead);
			$U.setStorage('openid',wxUser.openid);
			$U.setStorage('nickName',wxUser.nickName);
		},
		// 退出登录处理
		logout({ state }){
			// 清除登录状态
			state.bindUser = false
			state.wxUser = false
			state.user = null
			// 清除本地存储数据
			$U.removeStorage('userType');
			$U.removeStorage('userPhone');
			$U.removeStorage('avatarUrl');
			$U.removeStorage('openid');
			$U.removeStorage('nickName');
			
		},
		// 初始化登录状态
		initLogin({ state,dispatch }){
			// 拿到存储
			let openid = $U.getStorage('openid');
			let wxHead = $U.getStorage('avatarUrl');
			let nickName = $U.getStorage('nickName');
			let userType = $U.getStorage('userType');
			let userPhone = $U.getStorage('userPhone') ; 
			
		},
		// 获取好友申请列表
		getApply({state,dispatch},page = 1){
			
		},
		// 更新通讯录角标提示
		updateMailBadge({ state }){
			
		},
		// 获取通讯录列表
		getMailList({ state }){
			
		},
		// 获取会话列表
		getChatList({ state }){
			
		},
		// 获取朋友圈动态通知
		getNotice({ state }){
			
		},
		// 初始化总未读数角标
		updateBadge({state}){
			
		},
		// 断线自动重连
		reconnect({state}){
			
		}
	}
}