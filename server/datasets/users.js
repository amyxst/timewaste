const mongoose = require('mongoose')
module.exports = mongoose.model('User', {
	email: 'string',
	username: 'string',
	password: 'string',
	image: 'string' // path to file
})