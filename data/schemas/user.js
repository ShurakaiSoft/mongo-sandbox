/**
 * user schema
 */

var mongoose = require('mongoose');

var emailRegex = /.+\@.+\..+/; // incomplete



var UserSchema = new mongoose.Schema({
	username: { type: String, unique: true },
	name: String,
	password: String,
	email: {
		type: String,
		required: true,
		match: emailRegex
	}
});

module.exports = UserSchema;