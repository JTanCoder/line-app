'use strict';
exports.main = async (event, context) => { 
	console.log("-------------------------")
	console.log(event)
	let js_code = event.code
	const loginUrl = 'https://api.weixin.qq.com/sns/jscode2session';
	const appid = "wx76b97a2d6e2c6072";
	const secret = "fbb64b3fcd6476864e71266c5beba19e";
	let res = await uniCloud.httpclient.request(loginUrl, {  
	  data: {  
	    appid: appid,  
	    secret: secret,  
	    js_code: js_code,  
	    grant_type: 'authorization_code'  
	  },  
	  dataType: 'json'  
	  })  
	console.log(" ======================= ")
	console.log(res)
	let openid = res.data.openid
	//wx.cloud.login()
	console.log(openid)
	return openid
};
