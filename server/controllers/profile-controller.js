var User = require('../datasets/users')
var fs = require('fs-extra')
var path = require('path')

module.exports.updatePhoto = function(req, res) {
	var file = req.files.file
	var userId = req.body.userId

	console.log(`User ${userId} is submitting ${JSON.stringify(file)}`)

	var uploadDate = new Date();

	var tempPath = file.path
	var targetPath = path.join(__dirname, "../../uploads/" + userId + uploadDate + file.name)

	var savePath = "../../uploads/" + userId + uploadDate + file.name
	fs.rename(tempPath, targetPath, (err) => {
		if (err) {
			console.log(err)
		}
		else {
			User.findById(userId, function(err, userData) {
				var user = userData;
				user.image = savePath;
				user.save((err) => {
					if (err) {
						console.log("failed to save")
						res.json({status: 500})
					}
					else {
						console.log("save was successful")
						res.json({status: 200})
					}
				})
			})
			// console.log('file moved')
		}
	})
}

module.exports.updateUsername = function(req, res) {
	console.log("trying to update username")
	console.log("updating: " + req.body.userId)
	User.findById(req.body.userId, function(err, userData) {
		var user = userData
		user.username = req.body.username
		user.save((err) => {
			if (err) {
				console.log("failed to save username")
				res.json({status: 500})
			}
			else {
				console.log("saved username")
				res.json({status: 200})
			}
		})
	})

}