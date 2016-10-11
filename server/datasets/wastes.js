const mongoose = require('mongoose')

module.exports = mongoose.model('Waste', {
	user: 'string',
	userId: 'string',
	userImage: 'string',
	content: 'String',
	date: {type: Date, default: Date.now}
})