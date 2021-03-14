'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('line-app-user')
	const res = await collection.where(event).limit(1).get()
	return res
};
