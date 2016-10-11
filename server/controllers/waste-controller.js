var Waste = require('../datasets/wastes')
module.exports.postWaste = function(req, res) {
	var waste = new Waste(req.body)
	waste.save((err) => {
		if (err) {
			console.log(err)			
		}
		else {
			console.log("saved..")
			Waste.find({}, (err, wastes) => {
				console.log("finding...")
				if (err) {
					res.error(err)
				}
				else {
					res.json(wastes)
				}
			}).sort({date: -1})
		}

	})
}


module.exports.getWastes = function(req, res) {
	Waste.find({})
		.sort({date: -1})
		.exec(function(err, allWastes) {
			if (err) {
				res.error(err)
			}
			else {
				res.json(allWastes)
			}
		})
}