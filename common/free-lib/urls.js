module.exports={
	socketUrl:"ws://192.168.3.5:8088/ws",
	login: "/login" ,//登录
	upload:"/oss/upload",//上传
	smbSpeechDraft:"/app/fl/speech",//提交文稿基础信息
	querySpeechDraftChapters:"/app/fl/speech/query/draft/chapter",//查询演讲稿章节信息
	queryDraftChaptersContent:"/app/fl/speech/query/draft/chapter/content",//查询演讲稿目录主题正文章节信息
	changeSpeechDraftChapterLogo:"/app/fl/speech/change/draft/chapter/logo",//查询演讲稿章节信息
	smbDraftChapter:"/app/fl/speech/sumbimit/draft/chapter",//提交章节
	smbChapterCatalog:"/app/fl/speech/sumbimit/draft/chapter/catalog",//提交章节
	smbChapterTheme:"/app/fl/speech/sumbimit/draft/chapter/catalog/content",//提交章节
	delChapterTheme:"/app/fl/speech/remove/draft/catalog/theme",//删除目录主题
	contactList: "/getContactList" //获取联系人列表
	,leContactList: "/getLeContactList" //获取联系人列表
	,groupList: "/getGroupList" //获取群组列表
	,privateChatMsg: "/getPrivateMsg/"//获取单聊信息
	,groupChatMsg: "/getGroupMsg/"//获取群聊信息
}