const mongoose = require('mongoose')
module.exports = mongoose.model('User', {
	email: 'string',
	password: 'string'
})