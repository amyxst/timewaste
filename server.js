const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

var authenticationController = require('./server/controllers/authentication-controller')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/timewaste')

app.use(bodyParser.json())
app.use('/app', express.static(__dirname + '/app'))
app.use('/node_modules', express.static(__dirname + '/node_modules'))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

// Authentication
app.post('/api/user/signup', authenticationController.signup)
app.post('/api/user/login', authenticationController.login)

app.listen(port, (err) => {
	console.log(`Listening on port ${port}`)
})