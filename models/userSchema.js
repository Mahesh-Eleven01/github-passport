const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

// identifying the user from oAuth
	username:String,
	githubId:String
})

const user = module.exports = mongoose.model('user',userSchema);