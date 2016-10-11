const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const multipart = require('connect-multiparty') // needed to handle multipart form data

const multipartMiddleware = multipart()
const app = express()
const port = 3000

var authenticationController = require('./server/controllers/authentication-controller')
var profileController = require('./server/controllers/profile-controller')
var wasteController = require('./server/controllers/waste-controller')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/timewaste')

app.use(bodyParser.json())
app.use(multipartMiddleware)
app.use('/app', express.static(__dirname + '/app'))
app.use('/node_modules', express.static(__dirname + '/node_modules'))
app.use('/uploads', express.static(__dirname + '/uploads'))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

// Authentication
app.post('/api/user/signup', authenticationController.signup)
app.post('/api/user/login', authenticationController.login)

// Profile
app.post('/api/profile/editPhoto', multipartMiddleware, profileController.updatePhoto)
app.post('/api/profile/updateUsername', profileController.updateUsername)

// Waste
app.post('/api/waste/post', wasteController.postWaste)
app.get('/api/waste/get', wasteController.getWastes)

app.listen(port, (err) => {
	console.log(`Listening on port ${port}`)
})